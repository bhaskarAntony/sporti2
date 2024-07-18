import React from 'react';
import './style.css';
import HelpData from '../../data/help';
import { useLanguage } from '../../context/LangaugeContext';

function Help() {
    const { isKannada } = useLanguage();

    return (
        <div className=''>
            <div className="contact-banner">
                <div className="skew-container">
                    <div className="skew-left">
                        <h1 className="fs-2 fw-bold">{isKannada ? 'ಸಹಾಯ' : 'Help'}</h1>
                    </div>
                    <div className="skew-right d-flex align-items-center">
                        <h1 className="fs-2 fw-bold"></h1>
                    </div>
                </div>
            </div>

            <div className="p-3 p-md-5">
                <p>
                    {isKannada ? 'ವಿವಿಧ ಫೈಲ್ ಸ್ವರೂಪಗಳಲ್ಲಿ ಮಾಹಿತಿ ವೀಕ್ಷಿಸುವುದು ಈ ವೆಬ್‌ಸೈಟ್ ನಲ್ಲಿ ಲಭ್ಯವಿರುವ ಕೆಲವು ವಿಷಯಗಳನ್ನು ಹೊಂದಿದೆ. ನಿಮ್ಮ ಬ್ರೌಸರ್‌ಗೆ ಅಗತ್ಯವಿರುವ ಪ್ಲಗಿನ್‌ಗಳಿಲ್ಲದಿದ್ದರೆ ಅವು ಯಥಾರ್ಥವಾಗಿ ವೀಕ್ಷಿಸಲು ಸಾಧ್ಯವಾಗದಿರಬಹುದು.' : 'Viewing Information in Various File Formats This website includes some content that is available in non-HTML format. They might not be visible properly if your browser does not have the required plug-ins.'}
                    <br /><br />
                    {isKannada ? 'ಉದಾಹರಣೆಗೆ, ಅಕ್ರೋಬ್ಯಾಟ್ ರೀಡರ್ ಸಾಫ್ಟ್‌ವೇರ್ ಅಡ್ಡಾರಿಸಲ್ಪಡುತ್ತದೆ ಅಡೋಬ್ ಅಕ್ರೋಬ್ಯಾಟ್ PDF ಫೈಲ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಲು. ನಿಮ್ಮ ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ ಈ ಸಾಫ್ಟ್‌ವೇರ್ ಅನ್ನು ಇನ್ಸ್ಟಾಲ್ ಮಾಡಿರದಿದ್ದರೆ, ಅದನ್ನು ಉಚಿತವಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಬಹುದು.' : 'For example, Acrobat Reader software is required to view Adobe Acrobat PDF files. If you do not have this software installed on your computer, you can download it for free.'}
                </p>

                <div className="help-table">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>{isKannada ? 'ಆವೃತ್ತಿ ಪ್ರಕಾರ' : 'Document Type'}</th>
                                <th>{isKannada ? 'ಡೌನ್‌ಲೋಡ್' : 'Download'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                HelpData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{isKannada ? item.kn_type : item.en_type}</td>
                                        <td>
                                            {
                                                item[isKannada ? 'kn_download' : 'en_download'].map((subItem, subIndex) => (
                                                    <span key={subIndex} className="bg-transparent d-block">{subItem}</span>
                                                ))
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Help;
