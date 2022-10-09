import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { Candidate } from 'db';
import { Palette } from 'react-palette';

type CandidateItemProps = {
  candidate?: Partial<Candidate>;
  onSelect?: (open, value) => () => void;
  isLoading?: boolean;
};

export default function CandidateItem({ candidate, onSelect, isLoading }: CandidateItemProps) {
  return (
    <Grid container item xs={12} md={6}>
      <CardActionArea className="w-full rounded-full my-4" onClick={onSelect && onSelect(true, candidate)}>
        <Palette src={candidate?.image || ''}>
          {({ data }) => (
            <Card className="flex h-28 md:h-52 rounded-full" style={{ backgroundColor: data.lightMuted }}>
              <div
                className="w-28 md:w-52 bg-contain bg-no-repeat bg-center relative"
                style={{ backgroundImage: `url(${candidate?.image})` }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, ${data.lightMuted} 5%, ${data.lightMuted}00)`
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
  );
}
