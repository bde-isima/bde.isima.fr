import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Typography from '@mui/material/Typography';

export default function HowItWorksItem({ leftText, ItemIcon, title, rightText }) {
  return (
    <TimelineItem>
      <TimelineOppositeContent className="my-auto mx-0" align="right" variant="subtitle1">
        {leftText}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot>{ItemIcon}</TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent className="py-3 px-4">
        <Typography variant="h6">{title}</Typography>
        <Typography variant="caption">{rightText}</Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
