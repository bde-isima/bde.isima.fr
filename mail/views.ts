import { render } from "mjml-react"
import Handlebars from "handlebars"

import templates from "./templates"

export const compileView = ({
  subject,
  view,
  variables,
}: {
  subject: string
  view: string
  variables: object
}) => {
  const viewContent = render(templates[view].generate())

  console.log(viewContent.errors)

  return Handlebars.compile(viewContent.html)({
    subject,
    ...variables,
  })
}
