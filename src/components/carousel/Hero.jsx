import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import heroImages from '../../data/hero'
import './style.css'
import Aos from 'aos';
import { useLanguage } from '../../context/LangaugeContext';

function Hero() {
  useEffect(()=>{
    Aos.init();
  }, []);

  const {isKannada} = useLanguage();
  return (
    <div className=''>
      <Carousel className=' overflow-hidden' fade >
    {
      heroImages.map((item, index)=>(
        <Carousel.Item data-aos="zoom-out">
        <img
          className="d-block w-100"
          src={item.url}
          alt="First slide"
          
        />
        <Carousel.Caption >
          <h3 className='fs-1'>{isKannada?item.caption_ka:item.caption_en}</h3>
          <p className='fs-5'>{isKannada?item.description_ka:item.description_en}</p>
        </Carousel.Caption>
      </Carousel.Item>
      ))
    }

    </Carousel>
    </div>
  
  );
}

export default Hero;
