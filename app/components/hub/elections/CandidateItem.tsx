import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { Candidate } from 'db';

import Image from 'next/image';

type CandidateItemProps = {
  candidate?: Partial<Candidate>;
  onSelect?: (open, value) => () => void;
  isLoading?: boolean;
};
// TODO: Improve design
export default function CandidateItem({ candidate, onSelect, isLoading }: CandidateItemProps) {
  return (
    <Grid container item xs={12} md={6}>
      <CardActionArea className="w-full my-4" onClick={onSelect && onSelect(true, candidate)}>
        <Card className="p-3 flex gap-3">
          {candidate?.image && (
            <Image
              src={candidate?.image}
              width={100}
              height={100}
              alt={`Liste ${candidate?.name}`}
              style={{
                flex: '0 0 100px'
              }}
            />
          )}
          <CardContent className="flex-1">
            <Typography variant="h3">
              {isLoading ? <Skeleton width="80%" animation="wave" /> : <i>{candidate?.name}</i>}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
