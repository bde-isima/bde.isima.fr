import frLocale from 'date-fns/locale/fr'
import { Dispatch, SetStateAction } from 'react'
import TextField from '@mui/material/TextField'
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import DateTimePicker from '@mui/lab/DateTimePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import ChevronUp from 'mdi-material-ui/ChevronUp'

type HistoryFilterProps = {
  minDate: Date
  setMinDate: Dispatch<SetStateAction<Date | null>>
  maxDate: Date
  setMaxDate: Dispatch<SetStateAction<Date | null>>
}

export default function HistoryFilter({
  minDate,
  setMinDate,
  maxDate,
  setMaxDate,
}: HistoryFilterProps) {
  return (
    <Accordion className="w-full" variant="outlined">
      <AccordionSummary
        expandIcon={<ChevronUp />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="caption">Filtrer par date</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
          <div className="flex flex-col md:flex-row">
            <DateTimePicker
              renderInput={(props) => <TextField className="m-2" {...props} />}
              label="De"
              value={minDate}
              onChange={setMinDate}
              minDateTime={new Date('01-01-2021')}
            />
            <DateTimePicker
              renderInput={(props) => <TextField className="m-2" {...props} />}
              label="À"
              value={maxDate}
              onChange={setMaxDate}
              maxDateTime={new Date()}
            />
          </div>
        </LocalizationProvider>
      </AccordionDetails>
    </Accordion>
  )
}
