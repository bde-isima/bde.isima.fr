import Image from "next/image"
import Card from "@material-ui/core/Card"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import CardActionArea from "@material-ui/core/CardActionArea"

export default function Guzlr() {
  return (
    <div className="flex flex-col mb-4">
      <Typography align="left" variant="h6">
        Nouveauté !
      </Typography>

      <Divider className="m-4" />

      <CardActionArea
        href="https://guzlr.fr"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "inherit" }}
      >
        <Card className="flex">
          <div className="flex flex-col">
            <CardContent className="flex-auto">
              <Typography component="h5" variant="h5" gutterBottom>
                Guzlr
              </Typography>
              <Typography variant="caption" color="textSecondary" paragraph>
                Guzlr c’est l’application 100% Clermontoise qui te permet de profiter de verres
                offerts dans de nombreux bars de Clermont-Ferrand.
              </Typography>

              <div className="text-right">
                <Typography variant="subtitle1">
                  Code promo <b>ISIMAGUZLR</b>
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  17 SEPT. AU 17 OCT. : 1 MOIS GRATUIT + 20% DE RÉDUCTION
                </Typography>
              </div>
            </CardContent>
          </div>
          <div className="flex items-center bg-yellow-300 p-2">
            <Image src="/static/images/logos/guzlr.png" width="190" height="65" alt="Guzlr" />
          </div>
        </Card>
      </CardActionArea>
    </div>
  )
}
