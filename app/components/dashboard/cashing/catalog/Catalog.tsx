import { useQuery } from "blitz"
import { useTheme } from "@material-ui/core"
import { VariableSizeGrid } from "react-window"
import TextField from "@material-ui/core/TextField"
import AutoSizer from "react-virtualized-auto-sizer"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useState, forwardRef, ForwardedRef, PropsWithoutRef } from "react"

import Article from "./Article"
import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import getArticles from "app/entities/articles/queries/getArticles"

const GUTTER_SIZE = 16

function smartSearch(a, b) {
  a = a
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
  b = b
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
  return a.includes(b)
}

// @see https://codesandbox.io/s/2w8wmlm89p
const innerElementType = forwardRef(
  ({ style, ...rest }: PropsWithoutRef<any>, ref: ForwardedRef<any>) => (
    <div
      ref={ref}
      style={{
        ...style,
        paddingTop: GUTTER_SIZE,
      }}
      {...rest}
    />
  )
)

export default function Catalog({ user, updateBalance }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  const [loading, setLoading] = useState(false)
  const [searchArticleInput, setSearchArticleInput] = useState("")
  const { open, message, severity, onShow, onClose } = useSnackbar()

  const [data, { isFetching }] = useQuery(
    getArticles,
    { where: { is_enabled: true } },
    { refetchOnWindowFocus: false }
  )

  const articles = data?.articles ?? []
  const itemsPerRow = 4
  const filtered = articles.filter((article) => smartSearch(article.name, searchArticleInput))

  const onChange = (event) => setSearchArticleInput(event.target.value)

  const onTransaction = async (mutation, article) => {
    if (!loading) {
      setLoading(true)
      onShow("info", "Vente en cours ...")

      await mutation()
        .then(() => {
          onShow("success", "Article vendu")
          updateBalance(user.is_member ? article.member_price : article.price)
        })
        .catch((err) => onShow("error", err.message))
        .finally(() => setLoading(false))
    }
  }

  const Cell = ({ key, columnIndex, rowIndex, style }) => {
    const article = filtered[rowIndex * itemsPerRow + columnIndex]

    if (!article) {
      return null
    }

    return (
      <Article
        key={key}
        user={user}
        article={article}
        onClick={onTransaction}
        isFetching={isFetching}
        style={style}
      />
    )
  }

  return (
    <>
      <TextField
        className="mb-4"
        label="Recherche un article"
        value={searchArticleInput}
        onChange={onChange}
        variant="standard"
      />

      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeGrid
            innerElementType={innerElementType}
            columnCount={itemsPerRow}
            columnWidth={(index) => Math.floor(width / itemsPerRow)}
            rowCount={Math.ceil(filtered.length / itemsPerRow)}
            rowHeight={(index) => Math.floor(width / itemsPerRow) + GUTTER_SIZE}
            height={height}
            width={width}
          >
            {Cell}
          </VariableSizeGrid>
        )}
      </AutoSizer>

      <Snackbar
        className={fullScreen ? "bottom-16" : ""}
        open={open}
        loading={loading}
        message={message}
        severity={severity}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: fullScreen ? "center" : "right" }}
      />
    </>
  )
}
