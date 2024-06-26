import React from 'react'
import Hero from '../../components/carousel/Hero'
import './style.css'
import About from '../../components/about/About'
import { Link } from 'react-router-dom'
import Recents from '../../components/Recents/Recents'
import { useLanguage } from '../../context/LangaugeContext'
import Benefits from '../../data/Benefits'

const roomBookingFAQs = [
    {
        question: "How can I book a room?",
        answer: "You can book a room by visiting our website and selecting the 'Book Now' option. Alternatively, you can call our reservation desk at [reservation phone number]."
    },
    {
        question: "What types of rooms do you offer?",
        answer: "We offer a variety of room types to suit different needs, including standard rooms, deluxe rooms, suites, and family rooms."
    },
    {
        question: "What amenities are included with the room?",
        answer: "Our rooms come with standard amenities such as complimentary Wi-Fi, air conditioning, TV, and toiletries. Additional amenities may vary depending on the room type."
    },
    {
        question: "Can I cancel or modify my booking?",
        answer: "Yes, you can cancel or modify your booking by contacting our reservation desk at least 24 hours before your scheduled arrival."
    },
    {
        question: "Is breakfast included in the room rate?",
        answer: "It depends on the room package you select. Some packages include complimentary breakfast, while others may offer it as an optional add-on."
    },
    {
        question: "Do you offer discounts for group bookings?",
        answer: "Yes, we offer discounts for group bookings. Please contact our reservation desk for more information on group rates and discounts."
    },
    {
        question: "What is your check-in/check-out policy?",
        answer: "Our standard check-in time is [check-in time], and check-out time is [check-out time]. Early check-in and late check-out may be available upon request, subject to availability and additional charges."
    },
    {
        question: "Do you have parking facilities?",
        answer: "Yes, we offer complimentary parking facilities for guests. Please let us know in advance if you require parking space."
    },
    {
        question: "Are pets allowed in the rooms?",
        answer: "We have limited pet-friendly rooms available. Please inform us in advance if you plan to bring your pet, as additional charges and restrictions may apply."
    },
    {
        question: "How can I contact the front desk for assistance?",
        answer: "You can contact our front desk 24/7 for assistance by dialing [front desk phone number] or visiting the reception area."
    }
];


function Home() {
    const  isAuthenticated  =true;
    const {isKannada} = useLanguage()
  return (
    <div>
        <Hero/>
      {/* <div className="p-3 p-md-5">
      <div className="start p-3 p-md-5 rounded-4">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="start-left">
                        <h1 className="fs-1 fw-bold">Start Your Booking <br /> Journey Today</h1>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="start-right">
                        <p className="fs-5">Discover a wide range of rooms and venues for your next stay or event.</p>
                        <div className="btns mt-4 d-flex gap-3">
                            <a href='/login' className='main-btn'>Book</a>
                            <a href='/login' className=' btn-outline text-white '>Sign up</a>
                           </div>
                    </div>
                </div>
            </div>
        </div>
      </div> */}
      {/* <div className="main  p-3 p-md-5 mx-auto">
        <div className="row">
            <div className="col-12 col-md-3">
                <div className="main-left">
               <div className="main-card shadow p-3 bg-warning ">
               <img src='./images/image.png' alt="" className='w-100' /> 
             
               <h1 className="fs-3 fw-bold">Shri. Alok Mohan, IPS</h1>
                <p className="fs-5">Director General & Inspector General of Police</p>
               </div>
                </div>
            </div>
            <div className="col-12 col-md-6 mb-3">
                <div className="main-middle h-100">
                    <h1 className="fs-2">Recent Events</h1>
                    <div className="card w-100 h-100 shadow bg-light ">
                        {
                            gallerydata.map((item, index)=>(
                                <div className="mb-3">
                                <i className='bi bi-calandar'></i>
                                <a href={`/gallery/${item.id}`} className="fs-5">{item.title}</a>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-3">
                <div className="main-right">
             <div className="main-card shadow p-3 bg-warning">
             <img src={p2} alt="" className='w-100' /> 
             <h1 className="fs-3 fw-bold">Shri. B Dayanand, IPS</h1>
               <p className="fs-5">Commisioner of Police Bangalore City</p>
             </div>
                </div>
            </div>
        </div>
      </div> */}
        

      

        {/* <div className="services p-3 p-md-5 bg-light ">
            <h1 className="fs-1 fw-bold py-5 text-center">Discover Our Additional Services</h1>
            <div className="row">
               <div className="col-12 col-md-4">
                <div className="service-card p-2">
                <img src={i2} alt="" className='w-100' />
                <h2 className="fs-3 fw-bold">Enhance Your Stay with Us</h2>
                <p className="fs-5">Indulge in our laundry services, diverse dining options, and exciting recreational facilities.</p>
                <button className="btn btn-primary">Learn more</button>
                </div>
               </div>
               <div className="col-12 col-md-4">
                <div className="service-card p-2">
                <img src={i2} alt="" className='w-100' />
                <h2 className="fs-3 fw-bold">Experience Our Dining Options</h2>
                <p className="fs-5">Savor a variety of delicious cuisines prepared by our talented chefs.</p>
                <button className="btn btn-primary">Explore</button>
                </div>
               </div>

               <div className="col-12 col-md-4">
                <div className="service-card p-2">
                <img src={i2} alt="" className='w-100' />
                <h2 className="fs-3 fw-bold">Enjoy Our Recreational Facilities</h2>
                <p className="fs-5">Stay active and entertained with our state-of-the-art amenities.</p>
                <button className="btn btn-primary">Discover</button>
                </div>
               </div>
            </div>
        </div>

        <div className="welcome p-3 p-md-5">
            <div className="row align-items-center">
                <div className="col-12 col-md-6">
                        <div className="welcome-left">
                            <img src={i1} alt="" className="w-100" />
                        </div>
                </div>
                <div className="col-12 col-md-6">
                        <div className="welcome-right">
                           <span className="tag fs-3">Simplifying Room Bookings</span>
                           <h1 className="fs-1 fw-bold">Welcome to Our Home</h1>
                           <p className="fs-5">At our organization, we are dedicated to providing convenient and hassle-free room bookings for police officers. Our mission is to ensure that every officer has a comfortable and secure place to stay during their assignments. With our user-friendly platform, you can easily search for available rooms, select your desired dates, and complete the booking process.</p>
                           <div className="btns">
                            <button className='btn btn-outline-dark btn rounded-1 '>Learn more</button>
                            <button className='btn  btn rounded-1 '>Sign up</button>
                           </div>
                        </div>
                </div>
            </div>
        </div>

        <div className="welcome p-3 p-md-5 bg-light">
            <div className="row align-items-center">
                <div className="col-12 col-md-6">
                        <div className="welcome-left">
                            <img src={i1} alt="" className="w-100" />
                        </div>
                </div>
                <div className="col-12 col-md-6">
                        <div className="welcome-right">
                           <h1 className="fs-1 fw-bold">Empowering Police Officers Through Seamless Room Bookings</h1>
                           <p className="fs-5">Join thousands of officers who have experienced our convenient booking process and exceptional service.</p>
                           <div className="btns d-flex flex-nowrap mt-4">
                            <div className='w-100'>
                                <h1 className="fs-1 fw-bold">50%</h1>
                                <p className="fs-6">Officers Served: 10,000+</p>
                            </div>
                            <div className='w-100'>
                                <h1 className="fs-1 fw-bold">50%</h1>
                                <p className="fs-6">Positive Feedback: 98% Satisfaction Rate</p>
                            </div>
                           </div>
                        </div>
                </div>
            </div>
        </div>
        <div className="start p-3 p-md-5">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="start-left">
                        <h1 className="fs-1 fw-bold">Start Your Booking <br /> Journey Today</h1>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="start-right">
                        <p className="fs-5">Discover a wide range of rooms and venues for your next stay or event.</p>
                        <div className="btns mt-4 d-flex gap-3">
                            <button className='btn btn-dark btn rounded-1 fs-4'>Book</button>
                            <button className='btn  btn btn-outline-dark rounded-1 fs-4 '>Sign up</button>
                           </div>
                    </div>
                </div>
            </div>
        </div>
        <div className=" p-3 p-md-5 ">
            <div className="row shadow-sm p-2 p-md-5 rounded-4 bg-primary text-white">
                <div className="col-12 col-md-6">
                    <div className="start-left">
                        <h1 className="fs-1 fw-bold">Stay Updated with Exclusive Offers</h1>
                        <p className="fs-6">Subscribe to our newsletter for the latest updates</p>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="start-right d-flex flex-column align-items-md-end">
                        <p className="fs-6">Discover a wide range of rooms and venues for your next stay or event.</p>
                        <div className="btns mt-4 d-flex gap-3">
                           <input type="text" className='form-control w-100'  placeholder='Enter Email'/>
                            <button className='btn btn-dark   btn rounded-1 nowrap w-50'>Sign up</button>
                           </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="contact p-3 p-md-5">
           <div className=" p-3 bg-black rounded-5 text-white py-5 ">
           <div className="row mb-4">
                <div className="col-12 col-md-6">
                    <div className="conatct-left">
                        <p className="fs-3">Bookings</p>
                        <h1 className="fs-1 fw-bold">Contact Us</h1>
                        <p className="fs-5">We're here to assist you. Contact us for any inquiries or support.</p>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className='d-flex gap-2 mb-3'>
                    <i class="bi bi-envelope-fill fs-4 text-primary"></i>
                        <div>
                            <span className="fw-bold fs-4 d-block">Email</span>
                            <span className="fw-bold fs-6 text-secondary">sportikarnataka@gmail.com</span>
                        </div>
                    </div>
                    <div className='d-flex gap-2 mb-3'>
                    <i class="bi bi-phone fs-4 text-primary"></i>
                        <div>
                            <span className="fw-bold fs-4 d-block">Phone</span>
                            <span className="fw-bold fs-6 text-secondary">+91 8277945903</span>
                        </div>
                    </div>
                    <div className='d-flex gap-2 mb-3'>
                    <i class="bi-building fs-4 text-primary"></i>
                        <div>
                            <span className="fw-bold fs-4 d-block">Office</span>
                            <span className="fw-bold fs-6 text-secondary">#01, Prim Rose Road, Ashok Nagar Bengaluru - 560025 Karnataka </span>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3888.0273609615388!2d77.612095!3d12.970101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1715a47fbf91%3A0x105bdbe2d51128a2!2sSenior%20Police%20Officer&#39;s%20Research%20and%20Training%20Institute%20(SPORTI)!5e0!3m2!1sen!2sbe!4v1713247899969!5m2!1sen!2sbe" width="600" height="500" className='rounded-3 w-100' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
           </div>
        </div> */}
       {
        isAuthenticated ?(
            null
        ):(
            <div className="text-center p-3 p-md-5 login-banner bg-light">
            <i class="bi bi-stars fs-2 text-warning"></i>
            <p className="subtitle fs-6 text-secondary text-center">SPORTI</p>
           <h1 className="fs-2 fw-bold title">Login for room booking/Event Booking </h1>
         
           <Link to='/login' className="blue-btn">Login Now</Link>
       </div>
        )
       }
        <Recents/>

        

      

        {/* <Services/> */}
        <About/>

        <div className="container-fluid s1 p-3 p-md-5 py-5 overflow-hidden">
            <div className="row align-items-center">
                <div className="col-12 col-md-6 mb-4">
                    <h1 className="fs-3 fw-bold title">{isKannada?Benefits.heading_ka:Benefits.heading_en}</h1>
                    <p className="fs-6 text-secondary">{isKannada?Benefits.desc_ka:Benefits.desc_en}</p>
                    <ul>
                        {
                            Benefits.points.map((item, index)=>(
                                <li><i class="bi bi-check2 text-success"></i> {isKannada?item.kannada:item.english}</li>
                            ))
                        }

                      
                    </ul>
                    <div className="d-flex gap-2 mt-4">
                        {/* <a href='/signup' className="main-btn p-2 px-5">Sign up</a> */}
                        {/* <a href='/services' className="btn-outline p-2 text-dark">Learn more</a> */}
                    </div>
                </div>
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="./images/home-image.jpg" alt="" className="w-100 rounded-3 m-auto" />
                </div>
            </div>
        </div>


        {/* <div className="book-now p-3 p-md-5">
           <h1 className="display-4 fw-bold"> Why You are Still <br /> Waiting Explore Our Services</h1>
           <button className="btn p-2 btn-light mt-4 px-5">Explore</button>
        </div>
            <div className="steps container-fluid  p-2 p-md-4">
            <div className="text-center">
      <div className="btn-tag">steps</div>
      </div>
      <h1 className="banner-heading display-3 fw-bold text-center">Easyto access sporti</h1>

            <div className="row mt-4">
                <div className="col-12 col-md-4 mb-3">
                    <div className="step-card text-center h-100 p-3 bg-white rounded-4">
                    <i class="bi bi-box-seam-fill display-1"></i>
                        <h1 className="fs-2 fw-bold">Step-by-Step Guide</h1>
                        <p className="fs-6 text-secondary">Searching for available rooms, selecting dates, and completing the booking process is quick and easy.</p>
                        <div className="d-flex gap-2 mt-4 justify-content-center">
                        <button className=" main-btn p-2 px-5">Search</button>
                        <button className="btn-outline p-2">Book now</button>
                    </div>
                    </div>
                </div>
                <div className="col-12 col-md-4 mb-3">
                    <div className="step-card text-center p-3 bg-white rounded-4 h-100">
                    <i class="bi bi-box-seam-fill display-1"></i>
                        <h1 className="fs-2 fw-bold">Choose Your Dates</h1>
                        <p className="fs-6 text-secondary">Searching for available rooms, selecting dates, and completing the booking process is quick and easy.</p>
                        <div className="d-flex gap-2 mt-4 justify-content-center">
                        <button className="  main-btn p-2 px-5">Check</button>
                        <button className=" btn-outline p-2">Book now</button>
                    </div>
                    </div>
                </div>
                <div className="col-12 col-md-4 mb-3">
                    <div className="step-card text-center bg-white rounded-4 h-100 p-3">
                    <i class="bi bi-box-seam-fill display-1"></i>
                        <h1 className="fs-2 fw-bold">Complete Your Booking</h1>
                        <p className="fs-6 text-secondary">Searching for available rooms, selecting dates, and completing the booking process is quick and easy.</p>
                        <div className="d-flex gap-2 mt-4 justify-content-center">
                        <button className="  main-btn p-2 px-5">Confirm</button>
                        <button className=" btn-outline p-2 px-5">Book now</button>
                    </div>
                    </div>
                </div>
            </div>
        </div> */}
        {/* <Room/>
        <Food/>
        <Events/>
        <Recents/> */}
        {/* <div className="faqs p-3 p-md-5 bg-light">
  <h1 className="fs-1 fw-bold text-center">Faqs</h1>

  <div className="accordion" id="accordionExample">
    <div className="row">
      {faqs.map((item, index) => (
        <div className="col-12 col-md-6" key={index}>
          <div className="accordion-item mb-3">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index + 1}`} aria-expanded="true" aria-controls={`collapse${index + 1}`}>
                {item.query_en}
              </button>
            </h2>
            <div id={`collapse${index + 1}`} className="accordion-collapse collapse" aria-labelledby={`heading${index + 1}`} data-bs-parent="#accordionExample">
              <div className="accordion-body">
                {item.answer_en}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div> */}

    </div>
  )
}

export default Home