import { BlitzPage, Routes } from 'blitz'

import Table from 'app/components/dashboard/data/Table'
import getPromotions from 'app/entities/promotions/queries/getPromotions'
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav'
import PromotionForm from 'app/components/dashboard/promotions/PromotionForm'
import upsertPromotion from 'app/entities/promotions/mutations/upsertPromotion'
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config'
import deleteManyPromotions from 'app/entities/promotions/mutations/deleteManyPromotions'
import ExportPromotions, { ExportPromotionsFallback } from '../../components/dashboard/promotions/ExportPromotions'
import { Suspense } from 'react'

const Promotions: BlitzPage = () => {
  return (
    <>
      <Table
        title="Promotions"
        columns={columns}
        queryKey="promotions"
        getQuery={getPromotions}
        upsertQuery={upsertPromotion}
        deleteQuery={deleteManyPromotions}
        FormComponent={PromotionForm}
      />

      <Suspense fallback={<ExportPromotionsFallback/>}>
        <ExportPromotions />
      </Suspense>
    </>
  )
}

Promotions.suppressFirstRenderFlicker = true
Promotions.authenticate = { redirectTo: Routes.Login() }
Promotions.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Promotions())
Promotions.getLayout = (page) => getDashboardNav(page, 'Gestion des promotions')

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

export default Promotions
