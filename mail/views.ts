import fs from "fs"
import path from "path"
import Handlebars from "handlebars"

const resolveView = (viewPath: string) => {
  const viewResolvedPath = path.resolve(viewPath)

  if (!fs.existsSync(viewResolvedPath)) {
    throw new Error(`Template "${viewResolvedPath}" doesn't exist.`)
  }

  return fs.readFileSync(viewResolvedPath, "utf8")
}

export const compileView = ({
  subject,
  view,
  variables,
}: {
  subject: string
  view: string
  variables: object
}) => {
  const publicPath = path.join(
    process.cwd(),
    process.env.NODE_ENV === "development" ? "public" : ""
  )
  const content = resolveView(path.join(publicPath, `mails/${view}`))
  const layout = resolveView(path.join(publicPath, "mails/layout.html"))

  const formattedContent = Handlebars.compile(content)(variables)

  return Handlebars.compile(layout)({
    subject,
    content: formattedContent,
  })
}
