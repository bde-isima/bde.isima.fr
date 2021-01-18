import NoSsr from "@material-ui/core/NoSsr"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"

export default function Discord() {
  return (
    <div className="flex flex-col mb-4">
      <Typography align="right" variant="h6">
        Discord BDE
      </Typography>

      <Divider className="m-4" />

      <NoSsr>
        <div className="w-full h-52">
          <iframe
            title="discord"
            src="https://discord.com/widget?id=790595180897239040&theme=dark"
            width="100%"
            height="208"
            allowTransparency={true}
            frameBorder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </NoSsr>
    </div>
  )
}
