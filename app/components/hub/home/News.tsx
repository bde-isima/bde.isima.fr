import Image from "next/image"
import Card from "@material-ui/core/Card"
import { useTheme } from "@material-ui/core"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import CardActionArea from "@material-ui/core/CardActionArea"

export default function News() {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  const size = fullScreen ? 64 : 128

  return (
    <div className="flex flex-col">
      <Typography align="left" variant="h6">
        Nouveautés !
      </Typography>

      <Divider className="m-4" />

      <CardActionArea
        className="mb-4"
        href="https://guzlr.fr"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "inherit" }}
      >
        <Card className="flex">
          <div className="flex flex-col flex-grow">
            <CardContent className="flex-auto">
              <Typography variant="subtitle1" gutterBottom>
                Partenariat Guzlr
              </Typography>

              <div className="text-right">
                <Typography variant="subtitle2">
                  Code promo <b>ISIMAGUZLR</b>
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  1 mois gratuit + 20% de réduction
                </Typography>
              </div>
            </CardContent>
          </div>
          <div
            className="flex justify-center items-center bg-yellow-300"
            style={{ width: size, minWidth: size }}
          >
            <Image
              src="/static/images/logos/guzlr.png"
              width={fullScreen ? 48 : 112}
              height={fullScreen ? 16 : 44}
              quality={100}
              alt="Guzlr"
            />
          </div>
        </Card>
      </CardActionArea>

      <CardActionArea
        className="mb-4"
        href="https://www.ubereats.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "inherit" }}
      >
        <Card className="flex">
          <div className="flex flex-col flex-grow">
            <CardContent className="flex-auto">
              <Typography variant="subtitle1" gutterBottom>
                Partenariat Uber Eats
              </Typography>

              <div className="text-right">
                <Typography variant="subtitle2">Pleins d'avantages et de réductions</Typography>
                <Typography variant="caption" color="textSecondary">
                  Si tu es cotisant, consulte ta boîte mail pour plus de détails
                </Typography>
              </div>
            </CardContent>
          </div>
          <div
            className="flex justify-center items-center"
            style={{ backgroundColor: "#132326", width: size, minWidth: size }}
          >
            <Image
              src="/static/images/logos/uber_eats.jpg"
              width={114}
              height={114}
              quality={100}
              alt="Uber Eats"
            />
          </div>
        </Card>
      </CardActionArea>
    </div>
  )
}
