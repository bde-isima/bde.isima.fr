import { useState } from "react"
import { useQuery } from "blitz"
import Card from "@material-ui/core/Card"
import Earth from "mdi-material-ui/Earth"
import Twitter from "mdi-material-ui/Twitter"
import Facebook from "mdi-material-ui/Facebook"
import MultiCarousel from "react-multi-carousel"
import Instagram from "mdi-material-ui/Instagram"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import { useTheme, useMediaQuery } from "@material-ui/core"
import CardActionArea from "@material-ui/core/CardActionArea"

import CarouselDialog from "./CarouselDialog"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
}

export default function Carousel({ getQuery, queryKey }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const [isMoving, setIsMoving] = useState(false)
  const [selected, setSelected] = useState(null)

  const [data] = useQuery(getQuery, {}, { refetchOnWindowFocus: false })

  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  const handleSelectionChange = (selected, open) => () => {
    if (!isMoving) {
      setSelected(selected)
    }
  }

  const handleChange = (value) => () => setIsMoving(value)

  return (
    <MultiCarousel
      additionalTransfrom={0}
      autoPlaySpeed={3000}
      minimumTouchDrag={80}
      centerMode
      containerClass="w-full mt-8"
      dotListClass=""
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      responsive={responsive}
      showDots={false}
      sliderClass=""
      slidesToSlide={fullScreen ? 2 : 3}
      swipeable
      beforeChange={handleChange(true)}
      afterChange={handleChange(false)}
    >
      {data[queryKey].map((item) => (
        <Card key={item.id} className="mx-2 h-full">
          <CardActionArea className="flex flex-col" onClick={handleSelectionChange(item, true)}>
            <div className="h-40 flex justify-center align-center">
              {item.image && (
                <img
                  className="object-contain max-h-full p-4"
                  src={item.image}
                  alt={`Logo ${item.name}`}
                />
              )}
            </div>

            <CardContent className="h-24">
              <Typography gutterBottom variant="subtitle1" component="h2">
                {item.name.toUpperCase()}
              </Typography>
            </CardContent>

            <CardActions className="flex flex-wrap justify-center" disableSpacing>
              {item.facebookURL && (
                <a
                  href={item.facebookURL}
                  onClick={stopPropagation}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Lien Facebook"
                >
                  <Facebook className="m-2" />
                </a>
              )}
              {item.twitterURL && (
                <a
                  href={item.twitterURL}
                  onClick={stopPropagation}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Lien Twitter"
                >
                  <Twitter className="m-2" />
                </a>
              )}
              {item.instagramURL && (
                <a
                  href={item.instagramURL}
                  onClick={stopPropagation}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Lien Instagram"
                >
                  <Instagram className="m-2" />
                </a>
              )}
              {item.customURL && (
                <a
                  href={item.customURL}
                  onClick={stopPropagation}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Lien personnalisé"
                >
                  <Earth className="m-2" />
                </a>
              )}
            </CardActions>
          </CardActionArea>
        </Card>
      ))}

      <CarouselDialog selected={selected} onClose={handleSelectionChange(null, false)} />
    </MultiCarousel>
  )
}
