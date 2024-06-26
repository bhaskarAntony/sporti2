import React from 'react'
import gallerydata from '../../data/gallery'
import './style.css'
import { Link } from 'react-router-dom'
import eventData from '../../data/event'

function PastEvents() {
  return (
    <div className=' p-3 p-md-5'>
       <div className="row">
       {
                    eventData.map((eventItem, eventIndex)=>(
                        <div className="col-12 col-md-4 mb-3" key={eventIndex}>
                        <div className="event-card rounded-2 h-100 overflow-hidden bg-white">
                            <div className="event-card-top">
                                <img src={eventItem.image} alt={eventItem.title} className='w-100 mb-2'/>
                            </div>
                            <div className="event-card-body p-3">
                                <p className=" fs-4">{eventItem.title}</p>
                                <Link to={`/gallery/${eventItem.id}`} className="blue-btn rounded-1">View Images</Link>
                            </div>
                            <div className="event card-footer d-flex justify-content-between">
                                
                            </div>
                        </div>
                    </div>
                    ))
                   }
       </div>
    </div>
  )
}

export default PastEvents