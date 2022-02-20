import xlsx from 'xlsx'
import { useQuery } from 'blitz'
import Button from '@mui/material/Button'

import TableChartIcon from '@mui/icons-material/TableChart'

import getPromotions from 'app/entities/promotions/queries/getPromotions'

export default function ExportPromotions() {
  const [{ promotions }] = useQuery(getPromotions, {
    include: {
      _count: {
        select: {
          User: true,
        },
      },
    },
    orderBy: {
      year: 'asc',
    },
  })

  const exportToExcel = () => {
    const date = new Date()

    const workBook = xlsx.utils.book_new()

    workBook.Props = {
      Title: 'BDE ISIMA - Utilisateurs',
      Subject: 'Liste des utilisateurs',
      CreatedDate: date,
    }

    workBook.SheetNames.push('Promotions')

    const workSheetData = [
      ['Année', 'ID Groupe Facebook', 'Liste de diffusion', "Nombre d'utilisateurs"],
      ...promotions.map((promotion) => [
        promotion.year,
        promotion.fb_group_id,
        promotion.list_email,
        promotion._count.User,
      ]),
    ]

    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData)
    workBook.Sheets['Promotions'] = workSheet

    workSheet['!autofilter'] = { ref: 'A1:D1' }

    xlsx.writeFile(
      workBook,
      `bde_isima_promotions-${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}_${date.getHours()}-${date.getMinutes()}.xlsx`
    )
  }

  return (
    <Button endIcon={<TableChartIcon />} variant={'contained'} onClick={exportToExcel}>
      Exporter vers Excel
    </Button>
  )
}
