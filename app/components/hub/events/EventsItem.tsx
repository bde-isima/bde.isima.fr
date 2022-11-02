import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Event } from 'db';

import Image from 'next/image';

import { useRouter } from 'app/core/lib/router';

type EventsItemProps = {
  event?: Event & { club: { image: string | null; name: string } };
  isLoading?: boolean;
};

export default function EventsItem({ event, isLoading }: EventsItemProps) {
  const { pushRoute } = useRouter();

  return (
    <Grid container item justifyContent="center" xs={12} md={6} lg={3}>
      <Card className="flex flex-col w-full m-2" variant="outlined">
        <CardHeader
          classes={{ content: 'overflow-hidden' }}
          avatar={
            isLoading ? (
              <Skeleton variant="circular" width={40} height={40} animation="wave" />
            ) : event?.club?.image ? (
              <Image
                className="rounded-full"
                src={event?.club.image}
                width={40}
                height={40}
                alt={`Club ${event?.club.name}`}
              />
            ) : (
              <Avatar alt="Photo du club" />
            )
          }
          title={isLoading ? <Skeleton width="100%" animation="wave" /> : event?.name}
          titleTypographyProps={{ variant: 'subtitle2', noWrap: true }}
          subheader={isLoading ? <Skeleton width="100%" animation="wave" /> : event?.description}
          subheaderTypographyProps={{ variant: 'caption', noWrap: true }}
        />
        <CardActions className="px-4" disableSpacing>
          <Grid container alignContent="flex-start" direction="column">
            <Typography variant="caption">
              {!isLoading && format(event?.takes_place_at!, "'Le' EEEE d MMMM yyyy à HH:mm", { locale: fr })}
            </Typography>

            <Grid container item className="mt-4">
              {event && event!.subscriptions_end_at!.getTime() > Date.now() ? (
                <>
                  <Alert variant="outlined" severity="info">
                    {format(event?.subscriptions_end_at!, "'Les inscriptions expirent le' EEEE d MMMM yyyy à HH:mm", {
                      locale: fr
                    })}
                  </Alert>
                  <Grid container item alignContent="end" direction="column" className="mt-2">
                    <Button
                      onClick={pushRoute(`/hub/events/${event?.id}`)}
                      variant="contained"
                      size="small"
                      disabled={isLoading}
                    >
                      Voir
                    </Button>
                  </Grid>
                </>
              ) : event ? (
                <Alert variant="outlined" severity="error">
                  {format(
                    event?.subscriptions_end_at!,
                    "'Les inscriptions sont fermées depuis le' EEEE d MMMM yyyy à HH:mm",
                    { locale: fr }
                  )}
                </Alert>
              ) : (
                <Skeleton></Skeleton>
              )}
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
