import Typography from '@material-ui/core/Typography'
import TimelineDot from '@material-ui/lab/TimelineDot'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'

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
