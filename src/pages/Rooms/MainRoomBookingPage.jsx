import React, { useState } from 'react'
import './style.css'
import { Tabs, Tab } from 'react-bootstrap'
import Room from './Room';
import roomsdata from '../../data/rooms';

function MainRoomBookingPage() {


    return (
        <Tabs
            defaultActiveKey="veg"
            id="uncontrolled-tab-example"
            className="mb-3 food-tabs"
            // Handle tab selection
        >
            <Tab eventKey="veg" title="Sporti 1">
                {/* <FoodItems type={type} /> */}
                <Room data={roomsdata.sporti1}/>
            </Tab>
            <Tab eventKey="nonveg" title="Sporti 2">
            <Room data={roomsdata.sporti2}/>
            </Tab>
        </Tabs>
    );
}

export default MainRoomBookingPage;
