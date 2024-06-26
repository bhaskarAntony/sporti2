import React from 'react'
import './style.css'
import HelpData from '../../data/help'
function Help() {
  return (
    <div className=''>
         <div className="contact-banner">
            {/* <h1 className='fs-1 fw-bold text-center'>About us</h1>
            <p className="fs-6 text-center">
            SPORTI consists of a team of Senior Officers from various units of the Police Department. It also has a Working Committee who conduct various Conferences and Workshops to discuss the operations and functioning of the Institute. The team hosts periodic meetings every last Friday of the month for effective improvements of the Institute.
            </p> */}
             <div className="skew-container">
        <div className="skew-left">
            <h1 className="fs-2 fw-bold">Help</h1>
        </div>
        <div className="skew-right d-flex align-items-center">
        <h1 className="fs-2 fw-bold"></h1>
        </div>
    </div>

           
        </div>
       <div className="p-3 p-md-5">
       <p className='fs-6'>Viewing Information in Various File Formats This website includes some content that is available in non-HTML format. They might not be visible properly if your browser does not have the required plug-ins.
 <br /> <br />
        For example, Acrobat Reader software is required to view Adobe Acrobat PDF files. If you do not have this software installed on your computer, you can download it for free. The following table lists some plug-ins that you will require.</p>

        <div className="help-table">
            <table className='table'>
                <tr>
                    <th>Document Type</th>
                    <th>Download</th>
                </tr>
                {
                    HelpData.map((item, index)=>(
                        <tr>
                            <td className='fs-6'>{item.type}</td>
                            <td>
                                {
                                    item.download.map((subItem, subIndex)=>(
                                        <span className="fs-6 bg-transparent d-block">{subItem}</span>
                                    ))
                                }
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
       </div>
    </div>
  )
}

export default Help