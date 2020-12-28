import sanitizeHtml from "sanitize-html"
import Dialog from "@material-ui/core/Dialog"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import { useTheme, useMediaQuery } from "@material-ui/core"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"

import Close from "mdi-material-ui/Close"

export default function CarouselDialog({ selected, onClose }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    selected && (
      <Dialog
        open={Boolean(selected)}
        fullScreen={fullScreen}
        onClose={onClose}
        PaperProps={{ className: "w-full md:w-64" }}
        aria-labelledby="carousel-dialog-title"
      >
        <DialogActions id="carousel-dialog-title" className="text-right">
          <IconButton className="mt-4 ml-4" onClick={onClose} aria-label="Fermer">
            <Close />
          </IconButton>
        </DialogActions>

        <img
          className="object-contain h-32 w-auto max-w-64 mx-auto mt-4 p-4"
          src={selected.image}
          alt={`Logo ${selected.name}`}
        />

        <DialogTitle id="responsive-dialog-title">{selected.name.toUpperCase()}</DialogTitle>

        <DialogContent>
          <DialogContentText component="div">
            <Typography
              variant="body2"
              component="div"
              align="justify"
              paragraph
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(selected.description, {
                  allowedTags: [
                    "h1",
                    "h2",
                    "h3",
                    "h4",
                    "h5",
                    "h6",
                    "blockquote",
                    "p",
                    "a",
                    "ul",
                    "ol",
                    "nl",
                    "li",
                    "b",
                    "i",
                    "strong",
                    "em",
                    "strike",
                    "code",
                    "hr",
                    "br",
                    "div",
                    "table",
                    "thead",
                    "caption",
                    "tbody",
                    "tr",
                    "th",
                    "td",
                    "pre",
                    "iframe",
                    "img",
                  ],
                  allowedAttributes: {
                    a: ["href", "target"],
                    img: ["src", "alt", "style"],
                    iframe: [
                      "width",
                      "height",
                      "src",
                      "frameborder",
                      "allow",
                      "allowfullscreen",
                      "style",
                    ],
                  },
                  allowedIframeHostnames: ["www.youtube.com"],
                }),
              }}
            />
          </DialogContentText>
          <Typography variant="caption" component="h2">
            {selected.email}
          </Typography>
        </DialogContent>
      </Dialog>
    )
  )
}
