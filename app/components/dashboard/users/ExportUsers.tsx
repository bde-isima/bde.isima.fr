import xlsx from 'xlsx'
import { useQuery } from 'blitz'
import Button from '@mui/material/Button'

import TableChartIcon from '@mui/icons-material/TableChart'

import getUsers from 'app/entities/users/queries/getUsers'
import CircularProgress from '@mui/material/CircularProgress'
import { Promotion, User } from '@prisma/client'
import Box from '@mui/material/Box'

export default function ExportUsers() {
  const [{ users }] = useQuery(getUsers, {
    include: {
      promotion: {
        select: {
          year: true,
        },
      },
    },
    where: {
      is_enabled: true,
    },
    orderBy: {
      card: 'asc',
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

    workBook.SheetNames.push('Utilisateurs')

    const workSheetData = [
      ['Numéro carte', 'Prénom', 'Nom', 'Courriel', 'Promotion', 'Solde', 'Cotisant'],
      ...users.map((user: User & { promotion: Promotion }) => [
        user.card,
        user.firstname,
        user.lastname,
        user.email,
        user.promotion ? user.promotion.year : 'N/A',
        user.balance,
        user.is_member ? 'Oui' : 'Non',
      ]),
    ]

    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData)
    workBook.Sheets['Utilisateurs'] = workSheet

    workSheet['!autofilter'] = { ref: 'A1:G1' }

    xlsx.writeFile(
      workBook,
      `bde_isima_utilisateurs-${date.getFullYear()}-${
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

export function ExportUserFallback() {
  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button disabled endIcon={<TableChartIcon />} variant={'contained'}>
        Exporter vers Excel
      </Button>
      <CircularProgress
        size={25}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-12px',
          marginLeft: '-12px',
        }}
      />
    </Box>
  );
}
