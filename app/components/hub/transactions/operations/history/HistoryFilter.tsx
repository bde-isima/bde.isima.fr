import frLocale from "date-fns/locale/fr"
import { Dispatch, SetStateAction } from "react"
import TextField from "@material-ui/core/TextField"
import Accordion from "@material-ui/core/Accordion"
import Typography from "@material-ui/core/Typography"
import DateTimePicker from "@material-ui/lab/DateTimePicker"
import AdapterDateFns from "@material-ui/lab/AdapterDateFns"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import LocalizationProvider from "@material-ui/lab/LocalizationProvider"

import ChevronUp from "mdi-material-ui/ChevronUp"

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
              minDateTime={new Date("01-01-2021")}
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
