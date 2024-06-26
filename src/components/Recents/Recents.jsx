import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import PastEvents from './PastEvents'
import UpcomingEvents from './UpcomingEvents'
import './style.css'
import Updates from './Updates'
import Notifications from './Notifications'

function Recents() {
  return (
    <Tabs
    defaultActiveKey="recent"
    id="uncontrolled-tab-example"
    className="mb-3 recent-tabs"
    // Handle tab selection
>
    <Tab eventKey="recent" title="Recent Events">
    <PastEvents/>
    </Tab>
    <Tab eventKey="upcoming" title="Upcoming Events">
    <UpcomingEvents/>
    </Tab>
    <Tab eventKey="updates" title="Updates">
    <Updates/>
    </Tab>
    <Tab eventKey="notifications" title="Notifications">
    <Notifications/>
    </Tab>
</Tabs>
  )
}

export default Recents