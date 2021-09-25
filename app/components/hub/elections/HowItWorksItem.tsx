import Typography from '@mui/material/Typography'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'

export default function HowItWorksItem({ leftText, ItemIcon, title, rightText }) {
  return (
    <TimelineItem>
      <TimelineOppositeContent
        className="my-auto mx-0"
        align="right"
        variant="subtitle1"
        color="textSecondary"
      >
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
  )
}
