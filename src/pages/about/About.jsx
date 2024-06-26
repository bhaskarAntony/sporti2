import React from 'react';
import './style.css';
import i1 from '../../assets/images/aboutus/smwaus_2.jpg';
import team from '../../data/team';
import membersData from '../../data/members';
import { useLanguage } from '../../context/LangaugeContext';

function About() {
  const { isKannada } = useLanguage();

  return (
    <div>
      <div className="contact-banner about-banner">
        <div className="skew-container">
          <div className="skew-left">
            <h1 className="fs-2 fw-bold">{isKannada ? 'ನಮ್ಮ ಬಗ್ಗೆ' : 'ABOUT US'}</h1>
          </div>
          <div className="skew-right d-flex align-items-center">
            <h1 className="fs-2 fw-bold"></h1>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="text-center">
          <i className="bi bi-stars fs-2 text-warning"></i>
          <span className="fs-6 subtitle d-block text-center">SPORTI</span>
          <h1 className="fs-2 fw-bold title">
            {isKannada ? 'ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳ ಸಂಶೋಧನೆ ಮತ್ತು ತರಬೇತಿ ಸಂಸ್ಥೆ' : 'Senior Police Officers Research and Training Institute'}
          </h1>
        </div>
        <div className="row align-items-center">
          <div className="col-12 col-md-9 mb-3">
            <div className="about-left">
              <p className="fs-6 text-secondary mt-4">
                {isKannada ? 
                  `SPORTI - ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳ ಸಂಶೋಧನೆ ಮತ್ತು ತರಬೇತಿ ಸಂಸ್ಥೆ 1973ರಲ್ಲಿ ಸ್ಥಾಪಿತವಾಗಿದ್ದು, ಪೊಲೀಸ್ ಇಲಾಖೆಯ ಅಗತ್ಯಗಳಿಗೆ ಯಶಸ್ವಿಯಾಗಿ ಸ್ಪಂದಿಸುತ್ತಿದೆ. 2019ರಲ್ಲಿ SPORTI ಎಂದು ಮರುಹೆಸರಿಸಲಾಯಿತು. ಇದು ಸೇವೆಯ ಗುಣಮಟ್ಟವನ್ನು ಸುಧಾರಿಸಲು ಮಾಡಲಾಗಿದೆ.`
                  : 
                  `SPORTI - Senior Police Officers Research and Training Institute was established in the year 1973 and has been successfully catering to the needs of the Police department. It was previously known as the Senior Police Officer Mess and renamed to SPORTI in 2019 to enhance the quality of services being provided.`
                }
              </p>
              <p className="fs-6 text-secondary mt-4">
                {isKannada ? 
                  `SPORTI ಮುಖ್ಯಸ್ಥರ ಭೇಟಿಗಳು, ತರಬೇತಿ, ವಸತಿ, ಖಾಸಗಿ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮಗಳು, ಆಚರಣೆಗಳು ಮತ್ತು ಭೋಜನವನ್ನು ಆಯೋಜಿಸುವ ಅಗತ್ಯವನ್ನು ಪೂರೈಸುತ್ತದೆ. ಇದು ಆಧುನಿಕ ಸೌಲಭ್ಯಗಳನ್ನು ಹೊಂದಿದ್ದು, ಹಾಸ್ಟೆಲ್, ಟೇಬಲ್ ಟೆನಿಸ್, ಬ್ಯಾಡ್ಮಿಂಟನ್ ಮುಂತಾದ ಆಟಗಳ ಮೈದಾನವನ್ನು ಹೊಂದಿದೆ. SPORTI ರನ್ನು ಬೆಂಗಳೂರು ನಗರದಲ್ಲಿ ಸ್ಥಳೀಕರಿಸಿದ್ದು, ವೃತ್ತಿಪರವಾಗಿ ಸುಧಾರಿತ ಅನುಭವವನ್ನು ನೀಡುತ್ತದೆ.` 
                  : 
                  `SPORTI fulfills the requirement of organizing conferences and training, accommodation, hosting private and public events, celebrations, and dining. It boasts superior and quality infrastructure featuring elegant conference rooms, a state-of-the-art mini-theater, luxurious accommodation, a well-equipped gym, sporting avenues like Badminton and Table Tennis, and a vast Hockey ground. SPORTI's central location enables our guests to reach important official destinations with reduced travel time and also experience Bangalore’s cosmopolitan culture post work hours.`
                }
              </p>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-3">
            <div className="about-left">
              <img src={i1} alt="" className="w-100 mt-3" />
              <img src='./images/sporti2/About_Us_SPORTI_2.jpg' alt="" className="w-100 mt-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light p-3">
        <div className="ourteam container">
          <div className="text-center">
            <i className="bi bi-stars fs-2 text-warning"></i>
            <h1 className="fs-2 fw-bold title">{isKannada ? 'SPORTI ಕೋರ್ ಸಮಿತಿ' : 'Core Committee of SPORTI'}</h1>
            <span className="fs-6 subtitle d-block">
              {isKannada ? 
                'SPORTI ಅನ್ನು ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ ವಿವಿಧ ಘಟಕಗಳಿಂದ ಹಿರಿಯ ಅಧಿಕಾರಿಗಳು ಒಳಗೊಂಡ ಕಾರ್ಯಕಾರಿ ಸಮಿತಿಯು ಹೊಂದಿದೆ. ಸೇವೆ ಸುಧಾರಿಸಲು ಮಾಸಾಂತ್ಯದಲ್ಲಿ ಸಭೆಗಳನ್ನು ಏರ್ಪಡಿಸುತ್ತದೆ.' 
                : 
                'SPORTI has a working committee comprising senior officers from various units of Karnataka State Police. They strive to provide quality facilities and services to all senior members of Karnataka State Police. The team meets on the last Friday of every month to discuss various activities of SPORTI, assess feedback, and take measures to enhance the services.'
              }
            </span>
          </div>
          <div className="row">
            {team.map((item, index) => (
              <div key={index} className="col-12 col-md-3 mb-4">
                <div className="profile-card p-2 rounded-3 h-100">
                  <img src={item.profile} alt={item.name} className="w-100 mb-3 rounded-3" />
                  <div className="card-body">
                    <h5 className="card-title fs-6 mt-3">{isKannada ? item.name_ka : item.name_en}</h5>
                    <p className="card-text fs-6 text-secondary">{isKannada ? item.role_ka : item.role_en}</p>
                    <p className="card-text fs-6">{isKannada ? item.desc_ka : item.desc_en}</p>
                    {item.contact && <p className="card-text fs-6">Contact: {item.contact}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="commity-members p-3 p-md-5">
        <div className="text-center py-4">
          <h3 className="fs-4 subtitle">SPORTI</h3>
          <h1 className="title fs-2 fw-bold">
            {isKannada ? 'ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳ ಸಂಶೋಧನೆ ಮತ್ತು ತರಬೇತಿ ಸಂಸ್ಥೆ ಸಮಿತಿಯ ಸದಸ್ಯರ ವಿವರಗಳು' : 'Senior Police Officers Research and Training Institute Committee Members Details'}
          </h1>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>SI.No</th>
              <th>{isKannada ? 'ಹೆಸರು' : 'Name'}</th>
              <th>{isKannada ? 'SPORTI' : 'SPORTI'}</th>
            </tr>
          </thead>
          <tbody>
            {membersData.map((item, index) => (
              <tr key={index}>
                <td className="lead">{index + 1}</td>
                <td className="lead" title={`${isKannada ? item.name_ka : item.name_en}, ${isKannada ? item.role_ka : item.role_en}`}>
                  {isKannada ? item.name_ka : item.name_en}
                  <br />
                  {isKannada ? item.role_ka : item.role_en}
                </td>
                <td className="lead" title={isKannada ? item.desc_ka : item.desc_en}>
                  {isKannada ? item.desc_ka : item.desc_en}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default About;
