import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './style.css'
import logo from  '../../assets/images/logoDark.svg'
function Footer() {
 
  return (
    <footer className='p-2 p-md-5'>
   
    <section className="footer_container d-flex flex-column justify-content-between container-fluid bg-texture" id="footer">
    <div className="row">
      
        <div className="col-md-8">
           <div className="left">
          <h1 className="fs-2"></h1>
          <hr />
          <p>      
        SPORTI fulfils the requirement of organising conferences and training, accommodation, host private and public events, celebrations and dining. It also boasts superior and quality infrastructure featuring elegant Conference rooms, Training room, extensive Event hall, state of art Mini Theatre for screening of movies and documentaries, luxurious accommodation - VIP, Family and Executive rooms, impressive indoor Dining hall and outdoor Barbecue, well equipped Gym for maintaining fitness, sporting avenues like Badminton, Table Tennis and Billiards and also a vast Hockey ground. SPORTI’s central location enables our guests to reach important official destinations with reduced travel time and also experience Bengaluru’s cosmopolitan culture post work hours. Both institutes are committed to providing high-quality experience and impeccable service to enhance the living experience.
          </p>
         
          <p>      
          SPORTI - Senior Police Officers Research and Training Institute was established in the year 1973 and has been successfully catering to the needs of Police department. It was prior known as Senior Police Officer Mess and renamed to SPORTI in 2019 to enhance the quality of services being provided. Similarly to expand scope of services and offerings to more officers, KSRP Research and Training Institute was established in 2014 and was renamed as SPORTI-2 subsequently. This evolution reflects the institute's dedication to advancing knowledge and expertise in its field while adapting to meet the evolving needs of its stakeholders. Both SPORTI 1 and SPORTI 2 are an all exclusive facility for serving and retired senior police officials only.
          </p>
   
           </div>

        </div>
        <div className="col-md-4">
            <h1 className="fs-2">Quick links</h1>
            <hr />
            <ul>
            <li><Link to="/services/sporti1">SPORTI-1</Link></li> <hr />
            <li><Link to="/services/sporti2">SPORTI-2</Link></li><hr />
            <li><Link to="/login">Login</Link></li><hr />
            <li><Link to="/events&gallery">Events & Gallery</Link></li><hr />
            <li><Link to="/faqs">FAQ's</Link></li><hr />
                <li><Link to='/privacy_policy'>Privacy Policy</Link></li><hr />
                <li><Link to='/terms_and-conditions'>Terms and Conditions</Link></li><hr />
                <li><Link to='site_map'>Site map</Link></li><hr />
                <li><Link to='/help'>Help</Link></li><hr />
            </ul>
        </div>

        {/* <div className="col-12 col-md-4">

            <div className="right">
                <h2 className='fs-2 text-left'>
                    Get in Touch
                </h2>
               <ul>
                   <li><a href=''>sportikarnataka@gmail.com</a></li>
                   <li><a href=''>+91 8277945903</a></li>
                   <li><a href=''>+91 8277945903</a></li>
                   <li><a href=''>
                   <address>#01, Prim Rose Road, Ashok Nagar, Bengaluru - 560025 Karnataka</address></a></li>
                  
               </ul> 
            </div>
            
        </div> */}
    </div>
    <hr />
    <div className=" fs-6 p-2 text-center alert alert-warning"><b>Disclaimer:</b> SPORTI events are accessible for police sector of karnataka designated ACP and above higher Officials. General public has no access for the mentioned services</div>
   
    <div className="text-center">
        <span className="fs-6">Copyrights@2024</span>
    </div>
</section>
</footer>

// cc 
  )
}

export default Footer
