import PageTitle from 'app/core/layouts/PageTitle'
import Table from 'app/components/dashboard/data/Table'
import getPromotions from 'app/entities/promotions/queries/getPromotions'
import PromotionForm from 'app/components/dashboard/promotions/PromotionForm'
import upsertPromotion from 'app/entities/promotions/mutations/upsertPromotion'
import deleteManyPromotions from 'app/entities/promotions/mutations/deleteManyPromotions'

export default function Promotions() {
  return (
    <>
      <PageTitle title="Gestion des promotions" />

      <Table
        title="Promotions"
        columns={columns}
        queryKey="promotions"
        getQuery={getPromotions}
        upsertQuery={upsertPromotion}
        deleteQuery={deleteManyPromotions}
        FormComponent={PromotionForm}
      />
    </>
  )
}

const columns = [
  {
    id: 'year',
    headerName: 'Année',
    searchCriteria: 'equals',
  },
  {
    id: 'fb_group_id',
    headerName: 'ID groupe Facebook',
  },
  {
    id: 'list_email',
    headerName: 'Liste de diffusion',
  },
]
