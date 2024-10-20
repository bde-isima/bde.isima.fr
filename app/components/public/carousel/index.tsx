import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MultiCarousel from 'react-multi-carousel';

import Facebook from '@mui/icons-material/Facebook';
import Instagram from '@mui/icons-material/Instagram';
import Public from '@mui/icons-material/PublicTwoTone';
import Twitter from '@mui/icons-material/Twitter';

import Image from 'next/image';

import { useQuery } from '@blitzjs/rpc';

import { useMediaQuery } from 'app/core/styles/theme';

import CarouselDialog from './CarouselDialog';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export interface CarouselItemType {
  id: string;
  name: string;
  image: string | null;
  email?: string | null;
  description: string | null;
  twitterURL?: string | null;
  facebookURL?: string | null;
  instagramURL?: string | null;
  customURL?: string | null;
}

interface CarouselProps {
  getQuery: any;
  queryKey: string;
}

const Carousel = <ItemType extends CarouselItemType>({ getQuery, queryKey }: CarouselProps) => {
  const fullScreen = useMediaQuery('md');
  const [isMoving, setIsMoving] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ItemType>();

  const [data] = useQuery(getQuery, {}, { refetchOnWindowFocus: false });

  const onOpen = (item: ItemType) => () => {
    if (!isMoving) {
      setOpen(true);
      setSelected(item);
    }
  };

  const aProps = (target) => ({
    target: '_blank',
    rel: 'noopener noreferrer',
    'aria-label': `Lien ${target}`
  });

  const onClose = () => setOpen(false);

  const handleChange = (value) => () => setIsMoving(value);

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <>
      <MultiCarousel
        additionalTransfrom={0}
        autoPlaySpeed={3000}
        minimumTouchDrag={80}
        containerClass="my-4 py-1"
        dotListClass=""
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        responsive={responsive}
        showDots={false}
        sliderClass=""
        slidesToSlide={fullScreen ? 2 : 3}
        autoPlay={fullScreen ? false : true}
        swipeable
        centerMode
        beforeChange={handleChange(true)}
        afterChange={handleChange(false)}
        removeArrowOnDeviceType={['tablet', 'mobile']}
      >
        {data[queryKey].map((item: ItemType) => (
          <Card elevation={1} key={item.id} className="mx-2 h-full">
            <CardActionArea className="flex flex-col h-full justify-start p-4" onClick={onOpen(item)}>
              {item.image ? (
                <Image src={item.image} alt={`Logo ${item.name}`} width={160} height={160} />
              ) : (
                <Avatar alt={`Logo ${item.name}`} sx={{ width: 160, height: 160 }}>
                  {item.name}
                </Avatar>
              )}

              <CardContent className="h-24">
                <Typography gutterBottom variant="subtitle1" component="h2">
                  {item.name.toUpperCase()}
                </Typography>
              </CardContent>

              <CardActions className="flex flex-wrap justify-center" disableSpacing>
                {item.facebookURL && (
                  <a href={item.facebookURL} onClick={stopPropagation} {...aProps('Facebook')}>
                    <Facebook className="m-2" />
                  </a>
                )}
                {item.twitterURL && (
                  <a href={item.twitterURL} onClick={stopPropagation} {...aProps('Twitter')}>
                    <Twitter className="m-2" />
                  </a>
                )}
                {item.instagramURL && (
                  <a href={item.instagramURL} onClick={stopPropagation} {...aProps('Instagram')}>
                    <Instagram className="m-2" />
                  </a>
                )}
                {item.customURL && (
                  <a href={item.customURL} onClick={stopPropagation} {...aProps('personnalisé')}>
                    <Public className="m-2" />
                  </a>
                )}
              </CardActions>
            </CardActionArea>
          </Card>
        ))}
      </MultiCarousel>

      <CarouselDialog<ItemType> open={open} item={selected} onClose={onClose} />
    </>
  );
};

export default Carousel;
