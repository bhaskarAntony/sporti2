import React from 'react'
import './style.css'
import sitemapdata from '../../data/sitemap'

function SiteMap() {
  return (
    <div className='sitemap'>
     <div className="contact-banner about-banner">
            {/* <h1 className='fs-1 fw-bold text-center'>About us</h1>
            <p className="fs-6 text-center">
            SPORTI consists of a team of Senior Officers from various units of the Police Department. It also has a Working Committee who conduct various Conferences and Workshops to discuss the operations and functioning of the Institute. The team hosts periodic meetings every last Friday of the month for effective improvements of the Institute.
            </p> */}
             <div className="skew-container">
        <div className="skew-left">
            <h1 className="fs-2 fw-bold">Sitemap</h1>
        </div>
        <div className="skew-right d-flex align-items-center">
        <h1 className="fs-2 fw-bold"></h1>
        </div>
    </div>

           
        </div>
  

    <div className="help-table p-3 p-md-5">
        <table className='table'>
            <tr>
                <th>Document Type</th>
                <th>Download</th>
            </tr>
            {
                sitemapdata.map((item, index)=>(
                    <tr>
                        <td className='lead'>{item.title}</td>
                        <td>
                        <a href={item.link} className="lead bg-transparent d-block">Visit to {item.title}</a>
                            
                        </td>
                    </tr>
                ))
            }
        </table>
    </div>
</div>
  )
}

export default SiteMap