import xlsx from 'xlsx'
import { useQuery } from 'blitz'
import Button from '@mui/material/Button'

import TableChartIcon from '@mui/icons-material/TableChart'

import getArticlesWithStats from 'app/entities/articles/queries/getArticlesWithStats'

export default function ExportArticles() {
  const [{ articles }] = useQuery(getArticlesWithStats, {})

  const exportToExcel = () => {
    const date = new Date()

    const workBook = xlsx.utils.book_new()

    workBook.Props = {
      Title: 'BDE ISIMA - Utilisateurs',
      Subject: 'Liste des utilisateurs',
      CreatedDate: date,
    }

    workBook.SheetNames.push('Articles')

    const workSheetData = [
      [
        'Nom',
        'Prix',
        'Prix cotisants',
        'Visible',
        'Ajouté le',
        'Total ventes (semaine)',
        'Total ventes (mois)',
        'Total ventes (année)',
        'Total ventes',
      ],
      ...articles.map((article) => [
        article.name,
        article.price,
        article.member_price ?? article.price,
        article.is_enabled ? 'Oui' : 'Non',
        new Date(article.createdAt).toLocaleDateString('fr'),
        article.weekCount ?? 0,
        article.monthCount ?? 0,
        article.yearCount ?? 0,
        article.totalCount ?? 0,
      ]),
    ]

    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData)
    workBook.Sheets['Articles'] = workSheet

    workSheet['!autofilter'] = { ref: 'A1:I1' }

    xlsx.writeFile(
      workBook,
      `bde_isima_articles-${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}_${date.getHours()}-${date.getMinutes()}.xlsx`
    )
  }

  return (
    <Button endIcon={<TableChartIcon />} variant="contained" onClick={exportToExcel}>
      Exporter vers Excel
    </Button>
  )
}
