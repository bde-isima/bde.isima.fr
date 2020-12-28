import Table from "../data/Table"
import PromotionForm from "./PromotionForm"
import getPromotions from "app/entities/promotions/queries/getPromotions"
import upsertPromotion from "app/entities/promotions/mutations/upsertPromotion"
import deleteManyPromotions from "app/entities/promotions/mutations/deleteManyPromotions"

const columns = [
  {
    id: "year",
    headerName: "Année",
    searchCriteria: "equals",
    format: (value) => parseInt(value),
  },
  {
    id: "fb_group_id",
    headerName: "ID groupe Facebook",
    format: (value) => parseInt(value),
  },
  {
    id: "list_email",
    headerName: "Liste de diffusion",
  },
]

export default function PromotionsTable() {
  return (
    <Table
      title="Promotions"
      columns={columns}
      queryKey="promotions"
      getQuery={getPromotions}
      upsertQuery={upsertPromotion}
      deleteQuery={deleteManyPromotions}
      FormComponent={PromotionForm}
    />
  )
}
