const membersData = [
    {
        name_en: 'Dr Alok Mohan, IPS',
        name_ka: 'ಡಾ. ಆಲೋಕ್ ಮೊಹನ್, ಐಪಿಎಸ್',
        role_en: 'DG & IGP Karnataka State',
        role_ka: 'ಡಿ.ಜಿ ಮತ್ತು ಐ.ಜಿ.ಪಿ ಕರ್ನಾಟಕ ರಾಜ್ಯ',
        desc_en: 'President',
        desc_ka: 'ಅಧ್ಯಕ್ಷ'
    },
    {
        name_en: 'Sri B Dayananda, IPS',
        name_ka: 'ಶ್ರೀ ಬಿ ದಯಾನಂದ, ಐಪಿಎಸ್',
        role_en: 'Commissioner of Police, Bengaluru City',
        role_ka: 'ಪೊಲೀಸ್ ಆಯುಕ್ತರು, ಬೆಂಗಳೂರು ನಗರ',
        desc_en: 'Vice President',
        desc_ka: 'ಉಪಾಧ್ಯಕ್ಷ'
    },
    {
        name_en: 'Sri Soumendu Mukherjee, IPS',
        name_ka: 'ಶ್ರೀ ಸೌಮೇಂದು ಮುಖರ್ಜಿ, ಐಪಿಎಸ್',
        role_en: 'ADGP, Admin Bengaluru City',
        role_ka: 'ಎ.ಡಿ.ಜಿ.ಪಿ, ಆಡಳಿತ, ಬೆಂಗಳೂರು ನಗರ',
        desc_en: 'Member',
        desc_ka: 'ಸದಸ್ಯ'
    },
    {
        name_en: 'Dr A Subramanyeswara Rao, IPS',
        name_ka: 'ಡಾ. ಎ ಸುಬ್ರಮನ್ಯೇಶ್ವರ ರಾವ್, ಐಪಿಎಸ್',
        role_en: 'IGP, Lokayuktha',
        role_ka: 'ಐ.ಜಿ.ಪಿ, ಲೋಕಾಯುಕ್ತ',
        desc_en: 'Member',
        desc_ka: 'ಸದಸ್ಯ'
    },
    {
        name_en: 'Sri Sandeep Patil, IPS',
        name_ka: 'ಶ್ರೀ ಸಂದೀಪ್ ಪಾಟೀಲ್, ಐಪಿಎಸ್',
        role_en: 'IGP, KSRP',
        role_ka: 'ಐ.ಜಿ.ಪಿ, ಕೆ.ಎಸ್.ಆರ್.ಪಿ',
        desc_en: 'Member',
        desc_ka: 'ಸದಸ್ಯ'
    },
    {
        name_en: 'Sri Raman Guptha, IPS',
        name_ka: 'ಶ್ರೀ ರಾಮನ್ ಗುಪ್ತಾ, ಐಪಿಎಸ್',
        role_en: 'IGP & Addl Commissioner of Police (East) Bengaluru City',
        role_ka: 'ಐ.ಜಿ.ಪಿ ಮತ್ತು ಹೆಚ್ಚುವರಿ ಪೊಲೀಸ್ ಆಯುಕ್ತರು (ಪೂರ್ವ) ಬೆಂಗಳೂರು ನಗರ',
        desc_en: 'Member',
        desc_ka: 'ಸದಸ್ಯ'
    },
    {
        name_en: 'Sri K Santhosh Babu, IPS',
        name_ka: 'ಶ್ರೀ ಕೆ ಸಂತೋಷ್ ಬಾಬು, ಐಪಿಎಸ್',
        role_en: 'DCP, Admin Bengaluru City',
        role_ka: 'ಡಿ.ಸಿ.ಪಿ, ಆಡಳಿತ, ಬೆಂಗಳೂರು ನಗರ',
        desc_en: 'Member',
        desc_ka: 'ಸದಸ್ಯ'
    },
    {
        name_en: 'Sri Arunangshu Giri, IPS',
        name_ka: 'ಶ್ರೀ ಅರುಣಂಗ್ಷು ಗಿರಿ, ಐಪಿಎಸ್',
        role_en: 'DCP CAR HQ, Bengaluru city',
        role_ka: 'ಡಿ.ಸಿ.ಪಿ ಸಿ.ಎ.ಆರ್ ಹೆಚ್.ಕ್ಯೂ, ಬೆಂಗಳೂರು ನಗರ',
        desc_en: 'Member',
        desc_ka: 'ಸದಸ್ಯ'
    },
    {
        name_en: 'Sri Shekar H Tekkannavar, IPS',
        name_ka: 'ಶ್ರೀ ಶೇಕರ್ ಎಚ್ ತೇಕಣ್ಣಾವರ್, ಐಪಿಎಸ್',
        role_en: 'DCP Central Range, Bengaluru City',
        role_ka: 'ಡಿ.ಸಿ.ಪಿ ಸೆಂಟ್ರಲ್ ರೇಂಜ್, ಬೆಂಗಳೂರು ನಗರ',
        desc_en: 'Member',
        desc_ka: 'ಸದಸ್ಯ'
    },
    {
        name_en: 'Sri R Srinivas Gowda, IPS',
        name_ka: 'ಶ್ರೀ ಆರ್ ಶ್ರೀನಿವಾಸ ಗೌಡ, ಐಪಿಎಸ್',
        role_en: 'DCP CCB-2, Bengaluru City',
        role_ka: 'ಡಿ.ಸಿ.ಪಿ ಸಿ.ಸಿ.ಬಿ-2, ಬೆಂಗಳೂರು ನಗರ',
        desc_en: 'Member',
        desc_ka: 'ಸದಸ್ಯ'
    },
    {
        name_en: 'Sri Gunjan Arya, IPS',
        name_ka: 'ಶ್ರೀ ಗುಂಜನ್ ಆರ್ಯ, ಐಪಿಎಸ್',
        role_en: 'SP Intelligence',
        role_ka: 'ಎಸ್.ಪಿ ಇಂಟೆಲಿಜೆನ್ಸ್',
        desc_en: 'Member',
        desc_ka: 'ಸದಸ್ಯ'
    },
    {
        name_en: 'Sri Mallikarjun Baladandi, IPS',
        name_ka: 'ಶ್ರೀ ಮಲ್ಲಿಕಾರ್ಜುನ ಬಾಲದಂಡಿ, ಐಪಿಎಸ್',
        role_en: 'SP, Bengaluru Rural',
        role_ka: 'ಎಸ್.ಪಿ, ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ',
        desc_en: 'Member',
        desc_ka: 'ಸದಸ್ಯ'
    },
    {
        name_en: 'DR S K Soumyalatha, IPS',
        name_ka: 'ಡಾ. ಎಸ್ ಕೆ ಸೌಮ್ಯಲತಾ, ಐಪಿಎಸ್',
        role_en: 'SP Railways, Bengaluru City',
        role_ka: 'ಎಸ್.ಪಿ ರೈಲ್ವೇಸ್, ಬೆಂಗಳೂರು ನಗರ',
        desc_en: 'Member',
        desc_ka: 'ಸದಸ್ಯ'
    },
    {
        name_en: 'Sri Prithvik Shankar, IPS',
        name_ka: 'ಶ್ರೀ ಪೃಥ್ವಿಕ್ ಶಂಕರ್, ಐಪಿಎಸ್',
        role_en: 'SP CID, Bengaluru City',
        role_ka: 'ಎಸ್.ಪಿ ಸಿಐಡಿ, ಬೆಂಗಳೂರು ನಗರ',
        desc_en: 'Member',
        desc_ka: 'ಸದಸ್ಯ'
    },
    {
        name_en: 'Sri Deepan MN, IPS',
        name_ka: 'ಶ್ರೀ ದೀಪನ್ ಎಂಎನ್, ಐಪಿಎಸ್',
        role_en: 'Commandant 1st Battalion KSRP',
        role_ka: 'ಕಮಾಂಡಂಟ್ 1ನೇ ಬ್ಯಾಟಾಲಿಯನ್ ಕೆ.ಎಸ್.ಆರ್.ಪಿ',
        desc_en: 'Secretary',
        desc_ka: 'ಕಾರ್ಯದರ್ಶಿ'
    }
];

export default membersData;
