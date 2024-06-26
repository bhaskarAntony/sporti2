import React from 'react'
import './style.css'

function UpcomingEvents() {
  return (
    <div className='upcoming-events'>
        <div className="card p-2 text-center py-5">
            <i className="bi bi bi-ban display-1 mb-3 text-secondary"></i>
            <h1 className="fs-3 text-secondary">No Upcoming Events Available</h1>
        </div>
    </div>
  )
}

export default UpcomingEvents