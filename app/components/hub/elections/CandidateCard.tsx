import { Palette } from "react-palette"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import CardActionArea from "@material-ui/core/CardActionArea"

import { Candidate } from "db"

type CandidateCardProps = {
  candidate: Candidate
  onSelect: (value) => () => void
}

export default function CandidateCard({ candidate, onSelect }: CandidateCardProps) {
  return (
    <CardActionArea className="w-full rounded-full my-4" onClick={onSelect(candidate)}>
      <Palette src={candidate.image}>
        {({ data }) => (
          <Card className="flex h-52 rounded-full" style={{ backgroundColor: data.lightMuted }}>
            <div
              className="w-52 bg-contain bg-no-repeat bg-center relative"
              style={{ backgroundImage: `url(${candidate.image})` }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to right, ${data.lightMuted} 5%, ${data.lightMuted}00)`,
                }}
              />
            </div>
            <CardContent className="flex items-center">
              <Typography variant="h3" color="textSecondary">
                <i>{candidate.name}</i>
              </Typography>
            </CardContent>
          </Card>
        )}
      </Palette>
    </CardActionArea>
  )
}
