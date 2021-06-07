import { Palette } from 'react-palette'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/core/Skeleton'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'

import { Candidate } from 'db'

type CandidateItemProps = {
  candidate?: Partial<Candidate>
  onSelect?: (open, value) => () => void
  isLoading?: boolean
}

export default function CandidateItem({ candidate, onSelect, isLoading }: CandidateItemProps) {
  return (
    <Grid container item xs={12} md={6}>
      <CardActionArea
        className="w-full rounded-full my-4"
        onClick={onSelect && onSelect(true, candidate)}
      >
        <Palette src={candidate?.image || ''}>
          {({ data }) => (
            <Card
              className="flex h-28 md:h-52 rounded-full"
              style={{ backgroundColor: data.lightMuted }}
            >
              <div
                className="w-28 md:w-52 bg-contain bg-no-repeat bg-center relative"
                style={{ backgroundImage: `url(${candidate?.image})` }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, ${data.lightMuted} 5%, ${data.lightMuted}00)`,
                  }}
                />
              </div>
              <CardContent className="flex flex-grow items-center">
                <Typography className="flex flex-grow" variant="h3" color="textSecondary">
                  {isLoading ? <Skeleton width="80%" animation="wave" /> : <i>{candidate?.name}</i>}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Palette>
      </CardActionArea>
    </Grid>
  )
}
