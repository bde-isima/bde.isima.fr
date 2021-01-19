import { useQuery, useMutation } from "blitz"
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
import deleteTransaction from "app/entities/transactions/mutations/deleteTransaction"

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
        paddingLeft: GUTTER_SIZE,
        paddingTop: GUTTER_SIZE,
      }}
      {...rest}
    />
  )
)

export default function Catalog({ user, onTransactionComplete }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  const [loading, setLoading] = useState(false)
  const [previousTransaction, setPreviousTransaction] = useState<string | null>(null)
  const [searchArticleInput, setSearchArticleInput] = useState("")
  const { open, message, severity, onShow, onClose } = useSnackbar()

  const [deleteT] = useMutation(deleteTransaction)

  const [{ articles }] = useQuery(
    getArticles,
    { where: { is_enabled: true } },
    { refetchOnWindowFocus: false }
  )

  const itemsPerRow = fullScreen ? 3 : 4
  const filtered = articles.filter((article) => smartSearch(article.name, searchArticleInput))

  const onChange = (event) => setSearchArticleInput(event.target.value)

  const onUndo = () => {
    deleteT({ where: { id: previousTransaction as string } }).then(() => {
      setPreviousTransaction(null)
      onShow("warning", "Vente annulée")
      onTransactionComplete()
    })
  }

  const onSnackClose = () => {
    setPreviousTransaction(null)
    onClose(undefined, undefined)
  }

  const onTransaction = async (mutation) => {
    if (!loading) {
      setLoading(true)
      onShow("info", "Vente en cours ...")

      await mutation()
        .then((res) => {
          if (res[0]) {
            setPreviousTransaction(res[0].id)
          }
          onShow("success", "Article vendu")
          onTransactionComplete()
        })
        .catch((err) => onShow("error", err.message))
        .finally(() => setLoading(false))
    }
  }

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const article = filtered[rowIndex * itemsPerRow + columnIndex]

    if (!article) {
      return null
    }

    return <Article user={user} article={article} onClick={onTransaction} style={style} />
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
            columnWidth={(index) => (width - (GUTTER_SIZE / 2) * itemsPerRow) / itemsPerRow}
            rowCount={Math.ceil(filtered.length / itemsPerRow)}
            rowHeight={(index) => (width - (GUTTER_SIZE / 2) * itemsPerRow) / itemsPerRow}
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
        onClose={onSnackClose}
        anchorOrigin={{ vertical: "bottom", horizontal: fullScreen ? "center" : "right" }}
        onUndo={previousTransaction ? onUndo : undefined}
      />
    </>
  )
}
