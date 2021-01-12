import fs from "fs"
import path from "path"
import getConfig from "next/config"
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
  const { publicRuntimeConfig } = getConfig()
  const content = resolveView(path.join(publicRuntimeConfig.staticFolder, `mails/${view}`))
  const layout = resolveView(path.join(publicRuntimeConfig.staticFolder, "mails/layout.html"))

  const formattedContent = Handlebars.compile(content)(variables)

  return Handlebars.compile(layout)({
    subject,
    content: formattedContent,
  })
}
