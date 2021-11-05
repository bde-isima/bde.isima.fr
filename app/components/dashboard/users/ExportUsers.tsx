import { useQuery } from 'blitz'

import getUsers from '../../../entities/users/queries/getUsers'
import { Button } from '@mui/material'
import xlsx from 'xlsx'

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
    const workBook = xlsx.utils.book_new()

    workBook.Props = {
      Title: 'BDE ISIMA - Utilisateurs',
      Subject: 'Liste des utilisateurs',
      CreatedDate: new Date(Date.now()),
    }

    workBook.SheetNames.push('Utilisateurs')

    const workSheetData = [
      ['Numéro carte', 'Prénom', 'Nom', 'Courriel', 'Promotion', 'Solde', 'Cotisant'],
      ...users.map((user) => [
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

    xlsx.writeFile(workBook, 'bde_isima_utilisateurs.xlsx')
  }

  return (
    <Button variant={'contained'} onClick={exportToExcel}>
      Exporter vers Excel
    </Button>
  )
}
