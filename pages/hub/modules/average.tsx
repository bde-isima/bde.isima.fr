import Paper from "@material-ui/core/Paper"
import PageTitle from "app/layouts/PageTitle"

import AverageForm from "app/components/hub/modules/average/AverageForm"

export default function Average() {
  return (
    <>
      <PageTitle title="Calculateur de moyenne" />

      <Paper className="p-4">
        <AverageForm />
      </Paper>
    </>
  )
}
