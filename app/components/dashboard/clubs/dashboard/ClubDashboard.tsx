import Tab from "@material-ui/core/Tab"
import Paper from "@material-ui/core/Paper"
import AppBar from "@material-ui/core/AppBar"
import TabList from "@material-ui/lab/TabList"
import TabPanel from "@material-ui/lab/TabPanel"
import { useState, SyntheticEvent } from "react"
import TabContext from "@material-ui/lab/TabContext"

import EventsTable from "app/components/dashboard/clubs/dashboard/event/EventsTable"

export default function ClubDashboard({ club }) {
  const [value, setValue] = useState("0")

  const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue)

  return (
    <Paper className="w-full mb-4">
      <TabContext value={value}>
        <AppBar position="static" color="inherit" elevation={0}>
          <TabList
            onChange={handleChange}
            textColor="primary"
            variant="fullWidth"
            indicatorColor="primary"
            aria-label="Club Nav"
          >
            <Tab label="Gestion des événements" value="0" />
            <Tab label="Gestion des news" value="1" disabled />
          </TabList>
        </AppBar>

        <TabPanel value="0">
          <EventsTable club={club} />
        </TabPanel>

        <TabPanel value="1" />
      </TabContext>
    </Paper>
  )
}
