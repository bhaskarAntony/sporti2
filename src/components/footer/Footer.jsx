import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../assets/images/logoDark.svg';
import { useLanguage } from '../../context/LangaugeContext';

function Footer() {
    const { isKannada } = useLanguage();
    return (
        <footer className='p-2 p-md-5'>
            <section className="footer_container d-flex flex-column justify-content-between container-fluid bg-texture" id="footer">
                <div className="row">
                    <div className="col-md-8">
                        <div className="left">
                            <h2 className=''>{isKannada ? 'SPORTI' : 'SPORTI'}</h2>
                            <hr />
                            <p className=''>
                                {isKannada
                                    ? 'SPORTI ಸಮಾವೇಶಗಳು ಮತ್ತು ತರಬೇತಿ, ವಸತಿ, ಖಾಸಗಿ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಹಮ್ಮಿಕೊಳ್ಳಲು ಅಗತ್ಯವನ್ನು ಪೂರೈಸುತ್ತದೆ. ಇದು ಎಲೆಗಂಟ್ ಕಾನ್ಫರೆನ್ಸ್ ರೂಮ್‌ಗಳು, ತರಬೇತಿ ಕೊಠಡಿ, ವಿಶಾಲವಾದ ಕಾರ್ಯಕ್ರಮ ಸಭಾಂಗಣ, ಚಲನಚಿತ್ರಗಳು ಮತ್ತು ಡಾಕ್ಯುಮೆಂಟ್‌ಗಳನ್ನು ಪ್ರದರ್ಶನ ಮಾಡಲು ಮಿನಿ ಥಿಯೇಟರ್, ಆಧುನಿಕ ಮತ್ತು ಗುಣಮಟ್ಟದ ಸೌಕರ್ಯಗಳೊಂದಿಗೆ ಸಂಪೂರ್ಣ ಉನ್ನತ ಗುಣಮಟ್ಟದ ಕೊಠಡಿಗಳನ್ನು ಹೊಂದಿದೆ.'
                                    : 'SPORTI fulfills the requirement of organizing conferences and training, accommodation, hosting private and public events, celebrations, and dining. It also boasts superior and quality infrastructure featuring elegant Conference rooms, Training room, extensive Event hall, state of the art Mini Theatre for screening movies and documentaries, luxurious accommodation - VIP, Family and Executive rooms, impressive indoor Dining hall and outdoor Barbecue, well equipped Gym for maintaining fitness, sporting avenues like Badminton, Table Tennis and Billiards and also a vast Hockey ground. SPORTI’s central location enables our guests to reach important official destinations with reduced travel time and also experience Bengaluru’s cosmopolitan culture post work hours. Both institutes are committed to providing high-quality experience and impeccable service to enhance the living experience.'}
                            </p>
                            <p className=''>
                                {isKannada
                                    ? 'SPORTI - ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳ ಸಂಶೋಧನೆ ಮತ್ತು ತರಬೇತಿ ಸಂಸ್ಥೆ 1973ರಲ್ಲಿ ಸ್ಥಾಪನೆಯಾಯಿತು ಮತ್ತು ಪೊಲೀಸ್ ಇಲಾಖೆಯ ಅಗತ್ಯಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರೈಸುತ್ತಿದೆ. ಇದನ್ನು ಮೊದಲು ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳ ಮೆಸ್ ಎಂದು ಕರೆಯಲಾಗುತ್ತಿತ್ತು ಮತ್ತು 2019ರಲ್ಲಿ SPORTI ಎಂದು ಮರುನಾಮಕರಣ ಮಾಡಲಾಯಿತು.'
                                    : 'SPORTI - Senior Police Officers Research and Training Institute was established in the year 1973 and has been successfully catering to the needs of the Police department. It was prior known as Senior Police Officer Mess and renamed to SPORTI in 2019 to enhance the quality of services being provided. Similarly, to expand the scope of services and offerings to more officers, KSRP Research and Training Institute was established in 2014 and was renamed as SPORTI-2 subsequently. This evolution reflects the institute\'s dedication to advancing knowledge and expertise in its field while adapting to meet the evolving needs of its stakeholders. Both SPORTI 1 and SPORTI 2 are all exclusive facilities for serving and retired senior police officials only.'}
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h1 className="">{isKannada ? 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು' : 'Quick Links'}</h1>
                        <hr />
                        <ul>
                            <li><Link to="/services/sporti1">{isKannada ? 'ಸ್ಪೋರ್ಟಿ-1' : 'SPORTI-1'}</Link></li><hr />
                            <li><Link to="/services/sporti2">{isKannada ? 'ಸ್ಪೋರ್ಟಿ-2' : 'SPORTI-2'}</Link></li><hr />
                            <li><Link to="/login">{isKannada ? 'ಲಾಗಿನ್' : 'Login'}</Link></li><hr />
                            <li><Link to="/events&gallery">{isKannada ? 'ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಗ್ಯಾಲರಿ' : 'Events & Gallery'}</Link></li><hr />
                            <li><Link to="/faqs">{isKannada ? 'FAQ\'s' : 'FAQ\'s'}</Link></li><hr />
                            <li><Link to="/privacy_policy">{isKannada ? 'ಗೌಪ್ಯತಾ ನೀತಿ' : 'Privacy Policy'}</Link></li><hr />
                            <li><Link to="/terms_and-conditions">{isKannada ? 'ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು' : 'Terms and Conditions'}</Link></li><hr />
                            <li><Link to="/site_map">{isKannada ? 'ಸೈಟ್ ಮ್ಯಾಪ್' : 'Site Map'}</Link></li><hr />
                            <li><Link to="/help">{isKannada ? 'ಸಹಾಯ' : 'Help'}</Link></li><hr />
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="fs-6 p-2 text-center alert alert-warning">
                    <b>{isKannada ? 'ಅಸಮಂಜಸತೆ:' : 'Disclaimer:'}</b> 
                    {isKannada 
                        ? 'SPORTI ಕಾರ್ಯಕ್ರಮಗಳು ಕರ್ನಾಟಕದ ಪೊಲೀಸ್ ಇಲಾಖೆಯ ಆಯ್ಕೆಯ ಅಧಿಕಾರಿ ACP ಮತ್ತು ಹೆಚ್ಚಿನ ಅಧಿಕಾರಿಗಳಿಗೆ ಲಭ್ಯವಿದೆ. ಸಾಮಾನ್ಯ ಜನರಿಗೆ ಉಲ್ಲೇಖಿತ ಸೇವೆಗಳು ಲಭ್ಯವಿಲ್ಲ.' 
                        : 'SPORTI events are accessible for police sector of Karnataka designated ACP and above higher Officials. General public has no access for the mentioned services.'}
                </div>
                <div className="text-center">
                    <span className="fs-6">Copyrights@2024</span>
                </div>
            </section>
        </footer>
    );
}

export default Footer;
