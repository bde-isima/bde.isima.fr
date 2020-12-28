import { useQuery } from 'blitz'
import { useTheme } from '@material-ui/core'
import { VariableSizeGrid } from 'react-window'
import TextField from '@material-ui/core/TextField'
import AutoSizer from "react-virtualized-auto-sizer"
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useState, forwardRef, ForwardedRef, PropsWithoutRef, SyntheticEvent } from 'react'

import Article from './Article'
import Snackbar from 'app/layouts/Snackbar'
import useSnackbar from 'app/hooks/useSnackbar'
import getArticles from 'app/entities/articles/queries/getArticles'

const GUTTER_SIZE = 16

function smartSearch(a, b) {
    a = a.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    b = b.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return a.includes(b)
}

// @see https://codesandbox.io/s/2w8wmlm89p
const innerElementType = forwardRef(({ style, ...rest }: PropsWithoutRef<any>, ref: ForwardedRef<any>) => (
    <div
        ref={ref}
        style={{
            ...style,
            paddingTop: GUTTER_SIZE
        }}
        {...rest}
    />
));

export default function Catalog({ user, updateBalance }) {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    const [loading, setLoading] = useState(false)
    const [searchArticleInput, setSearchArticleInput] = useState('')
    const { open: snackOpen, message, severity } = useSnackbar()

    const [result, { isFetching }] = useQuery(getArticles, { where: { is_enabled: true } }, { suspense: false, refetchOnWindowFocus: false })

    const articles = result?.articles ?? []
    const itemsPerRow = 4
    const filtered = articles.filter(article => smartSearch(article.name, searchArticleInput))

    const onChange = event => setSearchArticleInput(event.target.value)

    const onTransaction = async (mutation, article) => {
        if(!loading) {
            setLoading(true)
            message.set("Vente en cours ...")
            severity.set("info")
            await mutation()
                .then(() => {
                    message.set("Article vendu")
                    severity.set("success")
                    updateBalance(-(user?.is_member ? article?.member_price : article?.price))
                })
                .catch((err) => {
                    message.set(err.message)
                    severity.set("error")
                })
                .finally(() => {
                    snackOpen.set(true)
                    setLoading(false)
                })
        }
    }

    const Cell = ({ key, columnIndex, rowIndex, style }) => {
        const article = filtered[rowIndex * itemsPerRow + columnIndex]

        if (!article) {
            return null
        }

        return (
            <Article key={key} user={user} article={article} onClick={onTransaction} isFetching={isFetching} style={style} />
        )
    }

    const onSnackClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
        if (reason === "clickaway") return
        snackOpen.set(false)
    }

    return (
        <>
            <TextField className="mb-4" label="Recherche un article" value={searchArticleInput} onChange={onChange} variant="standard" />

            <AutoSizer>
                {({ height, width }) => (
                    <VariableSizeGrid
                        innerElementType={innerElementType}
                        columnCount={itemsPerRow}
                        columnWidth={index => Math.floor(width / itemsPerRow)}
                        rowCount={Math.ceil(filtered.length / itemsPerRow)}
                        rowHeight={index => Math.floor(width / itemsPerRow) + GUTTER_SIZE}
                        height={height}
                        width={width}
                    >
                        {Cell}
                    </VariableSizeGrid>
                )}
            </AutoSizer>

            <Snackbar
                className={fullScreen ? "bottom-16" : ""}
                open={snackOpen.value}
                loading={loading}
                message={message.value}
                severity={severity.value}
                onClose={onSnackClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: fullScreen ? 'center' : 'right' }}
            />
        </>
    )
}
