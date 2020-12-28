import Grid from "@material-ui/core/Grid"
import MuiCard from "@material-ui/core/Card"
import Skeleton from "@material-ui/lab/Skeleton"
import CardMedia from "@material-ui/core/CardMedia"
import CardHeader from "@material-ui/core/CardHeader"

export default function Card({ article, isLoading }) {
  return (
    <Grid container item justifyContent="center" xs={6} md={3} lg={2}>
      <MuiCard className="w-full m-2 flex flex-col">
        <CardHeader
          className="flex-grow items-start"
          classes={{
            content: "flex flex-col h-full",
          }}
          title={
            isLoading ? (
              <Skeleton className="mb-2" animation="wave" height={10} width="80%" />
            ) : (
              `${article.name} • ${article.member_price}€`
            )
          }
          titleTypographyProps={{ variant: "subtitle2" }}
          subheader={
            isLoading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              `Non-cotisant • ${article.price}€`
            )
          }
          subheaderTypographyProps={{ className: "flex flex-grow items-end", variant: "caption" }}
        />

        {isLoading ? (
          <Skeleton className="h-48" animation="wave" variant="rectangular" />
        ) : (
          <CardMedia className="h-48" image={article.image || "\0"} title={article.name} />
        )}
      </MuiCard>
    </Grid>
  )
}
