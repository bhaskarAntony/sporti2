const servicesData = {
    sporti1: {
        id: 1,
        title: "SPORTI-1",
        image: './images/sporti1/sport1_cover.jpg',
        services: [
            {
                id: 1,
                title: 'Conference Hall',
                title_kn: 'ಸಮ್ಮೇಳನ ಹಾಲು',
                desc: 'The Conference Hall at SPORTI is a spacious and well-designed room, tailored to accommodate large gatherings. Upon entering, you are greeted by an expansive area with high ceilings, allowing ample room for guests to move around comfortably. The walls are adorned with tasteful décor, perhaps featuring elegant artwork or muted colours that evoke a sense of sophistication. It is the perfect choice for hosting government conferences and discussions, providing a professional and accommodating space for all your event needs.',
                desc_kn: 'ಸ್ಪೋರ್ಟಿಯ ಸಮ್ಮೇಳನ ಹಾಲು ವಿಶಾಲವಾದ ಹಾಲು, ವಿಶೇಷವಾಗಿ ದೊಡ್ಡ ಸಭೆಗಳನ್ನು ಅನುಕೂಲಿತಗೊಳಿಸಲಾಗಿದೆ. ನಿರ್ವಾಹಕರು ಆಗಮಿಸುವ ತಕ್ಷಣದಲ್ಲಿ, ನಿಮ್ಮ ಹೆಚ್ಚಿನ ಇರಬೇಕಿದ್ದ ವಿಸ್ತಾರವಾದ ಪ್ರದೇಶವನ್ನು ನೀವು ಸ್ವಾಗತಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತದೆ. ಕಲಾಕೃತಿಗಳಿಂದ ಅಥವಾ ಮಂಜುಗಾಲಿಯಿಂದ ಕೂಡಿದ ಅಲಂಕಾರವಿರುವ ಗೋಡೆಗಳು, ಸಮರ್ಥತೆಯ ಭಾವನೆಯನ್ನು ಪ್ರಕಟಿಸುವ ಮಿಲಿತ ಬಣ್ಣಗಳು ಇರಬಹುದು. ಸರ್ಕಾರಿ ಸಮ್ಮೇಳನಗಳು ಮತ್ತು ಚರ್ಚೆಗಳನ್ನು ನಡೆಸಲು ಸರಿಯಾದ ಆಯೋಜನೆ ಆಗಲು ಇದು ಉತ್ತಮ ಆಯ್ಕೆಯಾಗಿದೆ, ಎಲ್ಲಾ ನಿಮ್ಮ ಈವೆಂಟ್ ಅಗತ್ಯಗಳಿಗೆ ಸರಿಯಾದ ಮತ್ತು ಅನುಕೂಲವಾದ ಹಾಳಾಗಿದೆ',
                image: '/images/facilities/Event_Conference_corosel_2.jpg',
                isBook: true,
                link: '/services/book/sport-1'
            },
            {
                id: 2,
                title: 'Main Event Hall',
                title_kn: 'ಮುಖ್ಯ ಈವೆಂಟ್ ಹಾಲ್',
                desc: 'Welcome to Sporti\'s Main Event Hall, ideal for private gatherings and government conferences. With a capacity for 200+ guests, our spacious and comfortable hall guarantees a seamless and memorable event experience.',
                desc_kn: 'ಸ್ಪೋರ್ಟಿಗೆ ಸುಸಂಘಟಿತ ಮುಖ್ಯ ಈವೆಂಟ್ ಹಾಲಿಗೆ ಸ್ವಾಗತಿಸಿ, ಖಾಸಗಿ ಸಭೆಗಳು ಮತ್ತು ಸರ್ಕಾರದ ಸಮ್ಮೇಳನಗಳಿಗಾಗಿ ಸರಿಯಾದ ಸ್ಥಳ. 200+ ಅತಿಥಿಗಳಿಗೆ ಸ್ಥಳೀಯ ಮತ್ತು ಆರಾಮದ ಹಾಲಿನಲ್ಲಿ ಸರಿಯಾದ ಮತ್ತು ನೆನಪಿನಿಂದ ಪೂರ್ವವಿಗ್ರಹಾನುಭವವನ್ನು ಖಚಿತಪಡಿಸಲಾಗುತ್ತದೆ.',
                image: '/images/facilities/smmmfh_carousal_2.jpg',
                isBook: true,
                link: '/services/book/sport-1'
            },
            {
                id: 4,
                title: 'Accomodation',
                title_kn: 'ವಸತಿ',
                desc: 'Sporti offers a variety of comfortable A/C rooms, including Standard, Family, and VIP options. Each room is well-appointed with modern amenities, ensuring a pleasant and relaxing stay. Guests can enjoy additional perks like complimentary breakfast, high-speed Wi-Fi, and access to our fitness centre.',
                desc_kn: 'ಸ್ಪೋರ್ಟಿ ವಿವಿಧ ವಿಧದ ಆರಾಮದಾಯಕ ಎ/ಸಿ ಕೋಣೆಗಳನ್ನು ನೀಡುತ್ತದೆ, ಸ್ಟ್ಯಾಂಡರ್ಡ್, ಫ್ಯಾಮಿಲಿ ಮತ್ತು ವಿಐಪಿ ಆಯ್ಕೆಗಳು ಒಳಗೊಂಡಿವೆ. ಪ್ರತಿಯೊಂದು ಕೋಣೆ ಆಧುನಿಕ ಸೌಲಭ್ಯಗಳಿಂದ ಸಜ್ಜಿತವಾಗಿದೆ, ಇಂಪತ್ತಾದ ಮತ್ತು ವಿಶ್ರಾಂತಿ ಗೊಳ್ಳುವ ವಾಸ್ತವ್ಯದ ಖಾತರಿಯಾಗಿಸುತ್ತವೆ. ಅತಿಥಿಗಳು ಉಚಿತ ಉಪಾಹಾರ, ಹೈ-ಸ್ಪೀಡ್ ವೈ-ಫೈ ಮತ್ತು ನಮ್ಮ ಫಿಟ್‌ನೆಸ್ ಕೇಂದ್ರದ ಪ್ರವೇಶವನ್ನು ಆನಂದಿಸಬಹುದು.',
                image: '/images/facilities/smsr_vip_1.jpg',
                isBook: true,
                link: '/room/sport-1'
            },
            {
                id: 6,
                title: 'Barbeque',
                title_kn: 'ಬಾರ್ಬೆಕ್ವ್ಯೂ',
                desc: 'The BBQ area at Sporti is a versatile rooftop dining venue that boasts mesmerising lighting and ambiance, perfect for hosting government, private, and professional ceremonies or functions. With a scenic backdrop and top-notch facilities, it\'s an ideal choice for your special events.',
                desc_kn: 'ಸ್ಪೋರ್ಟಿಯ ಬಿಬಿಕ್ಯೂ ಪ್ರದೇಶವು ವಿಶಾಲವಾದ ಮೇಲೆರವು ತಿಂಡಿ ಸ್ಥಳ, ಮೆಸ್ಸಮರೈಸಿಂಗ್ ಲೈಟಿಂಗ್ ಮತ್ತು ವಾತಾವರಣದಿಂದ ಕೂಡಿದ್ದು, ಸರ್ಕಾರಿ, ಖಾಸಗಿ, ಮತ್ತು ವೃತ್ತಿಪರ ಸಮಾರಂಭಗಳು ಅಥವಾ ಕಾರ್ಯಗಳನ್ನು ಆಯೋಜಿಸಲು ಸಂಪೂರ್ಣವಾಗಿ ಹೊಂದಿದೆ. ದೃಶ್ಯಶ್ರೀಯ ವಾತಾವರಣ ಮತ್ತು ಶ್ರೇಷ್ಟ ಸೌಲಭ್ಯಗಳೊಂದಿಗೆ, ಇದು ನಿಮ್ಮ ವಿಶೇಷ ಈವೆಂಟ್ಗಳಿಗೆ ಉಚಿತ ಆಯ್ಕೆಯಾಗಿದೆ.',
                image: '/images/facilities/smmb_banner_1.jpg',
                isBook: true,
                link: '/services/book'
            },
            {
                id: 5,
                title: 'Dining',
                title_kn: 'ಭೋಜನ',
                desc: 'The dining hall at Sporti, offers a delightful dining experience. Guests can choose from a diverse menu or request customised dishes. Impeccable service and a comfortable ambiance await you.',
                desc_kn: 'ಸ್ಪೋರ್ಟಿಯ ಭೋಜನ ಹಾಲು, ಮನೋರಂಜನಾ ಭೋಜನ ಅನುಭವವನ್ನು ನೀಡುತ್ತದೆ. ಅತಿಥಿಗಳು ವಿಭಿನ್ನ ಮೆನುಗಳಿಂದ ಆಯ್ಕೆ ಮಾಡಬಹುದು ಅಥವಾ ಕಸ್ಟಮೈಸ್ಡ್ ಬಡುತ್ತಿಗಳನ್ನು ಕೇಳಬಹುದು. ತ್ರುಟಿಯಾತ್ಮಕ ಸೇವೆ ಮತ್ತು ಆರಾಮದ ವಾತಾವರಣ ನಿಮ್ಮನ್ನು ನಿರೀಕ್ಷಿಸುತ್ತದೆ.',
                image: '/images/facilities/smmr_carousal_1.jpg',
                isBook: false,
                link: '/food'
            },
            {
                id: 8,
                title: 'Badminton',
                title_kn: 'ಬ್ಯಾಡ್ಮಿಂಟನ್',
                desc: 'The Badminton Court at our Sporti is a premier facility designed to provide enthusiasts with an exceptional sporting experience. Equipped with top-notch amenities and maintained to the highest standards, our court offers a perfect setting for players to enjoy thrilling badminton matches in a comfortable and welcoming environment.',
                desc_kn: 'ನಮ್ಮ ಸ್ಪೋರ್ಟಿಯ ಬ್ಯಾಡ್ಮಿಂಟನ್ ಕೋರ್ಟ್ ಉತ್ಸಾಹಿಗಳಿಗಾಗಿ ವಿಶೇಷ ಕ್ರೀಡಾ ಅನುಭವವನ್ನು ನೀಡಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ಉನ್ನತಮಾದ ಸೌಲಭ್ಯಗಳಿಂದ ಮತ್ತು ಅತ್ಯುನ್ನತ ಮಾನದಂಡಗಳನ್ನು ಉಳಿಸಿಕೊಂಡು, ನಮ್ಮ ಕೋರ್ಟ್ ಆಟಗಾರರು ಆರಾಮದಾಯಕ ಮತ್ತು ಸ್ವಾಗತಾಯಕ ವಾತಾವರಣದಲ್ಲಿ ರೋಚಕ ಬ್ಯಾಡ್ಮಿಂಟನ್ ಪಂದ್ಯಗಳನ್ನು ಆನಂದಿಸಲು ಪೂರಕ ವಾತಾವರಣವನ್ನು ನೀಡುತ್ತದೆ.',
                image: '/images/facilities/badminton.jpg',
                isBook: false,
                link: '/services/book'
            },
            {
                id: 9,
                title: 'Table Tennis',
                title_kn: 'ಟೇಬಲ್ ಟೆನ್ನಿಸ್',
                desc: 'The Table Tennis Court at our Sporti is a premier facility designed to provide enthusiasts with an exceptional sporting experience. Equipped with top-notch amenities and maintained to the highest standards, our court offers a perfect setting for players to enjoy thrilling table tennis matches in a comfortable and welcoming environment.',
                desc_kn: 'ನಮ್ಮ ಸ್ಪೋರ್ಟಿಯ ಟೇಬಲ್ ಟೆನ್ನಿಸ್ ಕೋರ್ಟ್ ಉತ್ಸಾಹಿಗಳಿಗಾಗಿ ವಿಶೇಷ ಕ್ರೀಡಾ ಅನುಭವವನ್ನು ನೀಡಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ಉನ್ನತಮಾದ ಸೌಲಭ್ಯಗಳಿಂದ ಮತ್ತು ಅತ್ಯುನ್ನತ ಮಾನದಂಡಗಳನ್ನು ಉಳಿಸಿಕೊಂಡು, ನಮ್ಮ ಕೋರ್ಟ್ ಆಟಗಾರರು ಆರಾಮದಾಯಕ ಮತ್ತು ಸ್ವಾಗತಾಯಕ ವಾತಾವರಣದಲ್ಲಿ ರೋಚಕ ಟೇಬಲ್ ಟೆನ್ನಿಸ್ ಪಂದ್ಯಗಳನ್ನು ಆನಂದಿಸಲು ಪೂರಕ ವಾತಾವರಣವನ್ನು ನೀಡುತ್ತದೆ.',
                image: '/images/facilities/tabletennis.jpg',
                isBook: false,
                link: '/services/book'
            },
            {
                id: 7,
                title: 'GYM',
                title_kn: 'ಜಿಮ್',
                desc: 'At Sporti, we are proud to offer top-notch facilities, including a well-equipped gym, for police officers and their families. Our gym provides a perfect space for fitness needs, ensuring a comfortable and enjoyable stay. We are committed to serving those who protect our communities.',
                desc_kn: 'ಸ್ಪೋರ್ಟಿಯಲ್ಲಿ, ನಾವು ಶ್ರೇಷ್ಟ ಸೌಲಭ್ಯಗಳನ್ನು ನೀಡುವುದಕ್ಕೆ ಹೆಮ್ಮೆ ಪಡುತ್ತೇವೆ, ಇದರಲ್ಲಿ ಉತ್ತಮವಾಗಿ ಸಜ್ಜಿತವಾದ ಜಿಮ್, ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳು ಮತ್ತು ಅವರ ಕುಟುಂಬಗಳಿಗೆ. ನಮ್ಮ ಜಿಮ್ ಆರೋಗ್ಯ ಅಗತ್ಯಗಳಿಗಾಗಿ ಪೂರಕ ಸ್ಥಳವನ್ನು ಒದಗಿಸುತ್ತದೆ, ಆರಾಮದಾಯಕ ಮತ್ತು ಆನಂದದಾಯಕ ವಾಸ್ತವ್ಯವನ್ನು ಖಾತರಿಸುತ್ತಿದೆ. ನಮ್ಮ ಸಮುದಾಯಗಳನ್ನು ರಕ್ಷಿಸುವವರಿಗೆ ಸೇವೆ ನೀಡಲು ನಾವು ಬದ್ಧರಾಗಿದ್ದೇವೆ.',
                image: '/images/facilities/smwh_banner_7.jpg',
                isBook: false,
                link: '/services/book'
            },
            {
                id: 3,
                title: 'Mini Theatre',
                title_kn: 'ಮಿನಿ ಥಿಯೇಟರ್',
                desc: 'Sporti Guest House offers a unique cinematic experience with its Mini Theatre. Equipped with luxurious seating for over 30 guests, it\'s the perfect venue for documentaries and movie screenings. Explore the world of cinema in style and comfort at Sporti.',
                desc_kn: 'ಸ್ಪೋರ್ಟಿ ಗೇಸ್ಟ್ ಹೌಸ್ ಅದರ ಮಿನಿ ಥಿಯೇಟರ್‌ನಲ್ಲಿ ವಿಶಿಷ್ಟ ಸಿನೆಮಾ ಅನುಭವವನ್ನು ನೀಡುತ್ತದೆ. 30 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಅತಿಥಿಗಳಿಗೆ ಆರಾಮದಾಯಕ ಆಸನಗಳೊಂದಿಗೆ ಸಜ್ಜಿತವಾಗಿದೆ, ಇದು ಡಾಕ್ಯುಮೆಂಟರಿಗಳು ಮತ್ತು ಚಲನಚಿತ್ರ ಪ್ರದರ್ಶನಗಳಿಗಾಗಿ ಪರಿಪೂರ್ಣ ಸ್ಥಳವಾಗಿದೆ. ಸ್ಪೋರ್ಟಿಯಲ್ಲಿ ಶೈಲಿ ಮತ್ತು ಆರಾಮದಲ್ಲಿ ಸಿನೆಮಾ ಜಗತ್ತನ್ನು ಅನ್ವೇಷಿಸಿ.',
                image: '/images/facilities/Event_MiniTheatre_Inaguration_107.jpg',
                isBook: false,
                link: '/services/book'
            },
            {
                id: 10,
                title: 'Billiards',
                title_kn: 'ಬಿಲಿಯರ್ಡ್ಸ್',
                desc: 'Billiards is a popular indoor sport enjoyed by officers/guests at Sporti. Our well-equipped game room offers a relaxing atmosphere for players to showcase their skills and enjoy friendly competition.',
                desc_kn: 'ಬಿಲಿಯರ್ಡ್ಸ್ ಎನ್ನುವುದು ಸ್ಪೋರ್ಟಿಯಲ್ಲಿ ಅಧಿಕಾರಿಗಳು/ಅತಿಥಿಗಳು ಆನಂದಿಸುವ ಜನಪ್ರಿಯ ಒಳಾಂಗಣ ಕ್ರೀಡೆಯಾಗಿದೆ. ನಮ್ಮ ಉತ್ತಮವಾಗಿ ಸಜ್ಜಿತವಾದ ಆಟದ ಕೋಣೆ ಆಟಗಾರರು ತಮ್ಮ ಕೌಶಲ್ಯವನ್ನು ಪ್ರದರ್ಶಿಸಲು ಮತ್ತು ಸ್ನೇಹಪರ ಸ್ಪರ್ಧೆಯನ್ನು ಆನಂದಿಸಲು ಆರಾಮದಾಯಕ ವಾತಾವರಣವನ್ನು ನೀಡುತ್ತದೆ.',
                image: '/images/facilities/billiards.jpg',
                isBook: false,
                link: '/services/book'
            },
            {
                id: 11,
                title: 'Parking',
                title_kn: 'ಪಾರ್ಕಿಂಗ್',
                desc: 'Sporti Guest House offers a spacious and convenient parking facility, accommodating up to 100 cars. Our extensive parking area ensures a hassle-free experience for visitors, making it an ideal choice for those seeking comfortable accommodation with ample parking space.',
                desc_kn: 'ಸ್ಪೋರ್ಟಿ ಗೇಸ್ಟ್ ಹೌಸ್ ವಿಶಾಲ ಮತ್ತು ಅನುಕೂಲಕರ ಪಾರ್ಕಿಂಗ್ ಸೌಲಭ್ಯವನ್ನು ನೀಡುತ್ತದೆ, 100 ಕಾರುಗಳನ್ನು ಹೊಂದಿಸಬಹುದು. ನಮ್ಮ ವಿಶಾಲವಾದ ಪಾರ್ಕಿಂಗ್ ಪ್ರದೇಶವು ಅತಿಥಿಗಳಿಗೆ ಸುಲಭ ಅನುಭವವನ್ನು ಖಾತರಿಸುತ್ತದೆ, ಇದು ಅನುಕೂಲಕರ ವಾಸ್ತವ್ಯವನ್ನು ಹುಡುಕುತ್ತಿರುವವರಿಗೆ ಅನುಕೂಲಕರ ಪಾರ್ಕಿಂಗ್ ಸ್ಥಳದೊಂದಿಗೆ ಪರಿಪೂರ್ಣ ಆಯ್ಕೆಯಾಗುತ್ತದೆ.',
                image: '/images/facilities/parking.jpg',
                isBook: false,
                link: '/services/book'
            },
        ]
    },
    sporti2: {
        id: 2,
        title: "SPORTI-2",
        services: [
            {
                id: 4,
                title: 'Conference room',
                title_kn: 'ಸಮ್ಮೇಳನ ಕೊಠಡಿ',
                desc: 'This designated area within SPORTI 2 is specifically set up to accommodate meetings, presentations, workshops, and other group gatherings. The layout of the conference room is designed to facilitate interaction and communication among participants. Comfortable seating and climate control are essential aspects of a conference room to ensure that participants can focus on the meeting without distractions. It also provides a professional functional space for collaborative discussions, equipped with the necessary amenities to support productive and engaging interactions among participants.',
                desc_kn: 'SPORTI 2 ಒಳಗಿನ ಈ ನಿಶ್ಚಿತ ಪ್ರದೇಶವು ವಿಶೇಷವಾಗಿ ಸಭೆಗಳು, ಪ್ರಸ್ತಾವನೆಗಳು, ಕಾರ್ಯಾಗಾರಗಳು, ಮತ್ತು ಇತರ ಗುಂಪು ಸಮಾಗಮಗಳನ್ನು ಅನುಕೂಲಪಡಿಸಲು ಹೊಂದಿಸಲಾಗಿದೆ. ಸಮ್ಮೇಳನ ಕೊಠಡಿಯ ವಿನ್ಯಾಸವು ಭಾಗವಹಿಸುವವರ ಮಧ್ಯೆ ಸಂವಹನ ಮತ್ತು ಸಂವಹನವನ್ನು ಸುಲಭಗೊಳಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ಆರಾಮದಾಯಕ ಆಸನಗಳು ಮತ್ತು ಹವಾಮಾನ ನಿಯಂತ್ರಣವು ಸಮ್ಮೇಳನ ಕೊಠಡಿಯ ಅವಶ್ಯಕ ಅಂಶಗಳಾಗಿದ್ದು, ಭಾಗವಹಿಸುವವರು ತೊಂದರೆಗಳಿಂದ ಸ್ವತಃ ವಿನಾ ಸಭೆಯ ಮೇಲೆ ಒತ್ತುಹಾಕಲು ಖಾತರಿಸುತ್ತದೆ. ಇದು ಉತ್ಪಾದಕ ಮತ್ತು ಆಕರ್ಷಕ ಸಂವಹನಗಳಿಗೆ ಬೆಂಬಲಿಸುವ ಅಗತ್ಯ ಸೌಲಭ್ಯಗಳೊಂದಿಗೆ ವೃತ್ತಿಪರ ಕಾರ್ಯನಿರತ ಸ್ಥಳವನ್ನು ಒದಗಿಸುತ್ತದೆ.',
                image: '/images/sporti2_gallery/image3.jpg',
                isBook: true,
                link: '/services/book/sport-2'
            },
            {
                id: 6,
                title: 'Training room',
                title_kn: 'ತರಬೇತಿ ಕೊಠಡಿ',
                desc: 'The training room at SPORTI 2 provides a professional and functional space for conducting training sessions, workshops, and educational programs, equipped with the necessary technologies to support effective learning and development initiatives. The training room is equipped with modern audio-visual equipment to support presentations, demonstrations, and interactive learning activities. The training room is designed to be versatile and adaptable to accommodate different types of training programs and learning objectives and is easily accessible to participants, with convenient proximity to other facilities such as restrooms, break areas, and refreshment stations.',
                desc_kn: 'SPORTI 2 ನಲ್ಲಿ ತರಬೇತಿ ಕೊಠಡಿ ತರಬೇತಿ ಅಧಿವೇಶನಗಳು, ಕಾರ್ಯಾಗಾರಗಳು, ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ನಡೆಸಲು ವೃತ್ತಿಪರ ಮತ್ತು ಕಾರ್ಯನಿರತ ಸ್ಥಳವನ್ನು ಒದಗಿಸುತ್ತದೆ, ಪರಿಣಾಮಕಾರಿಯಾಗಿ ಕಲಿಕೆ ಮತ್ತು ಅಭಿವೃದ್ಧಿ ಉದ್ದೇಶಗಳನ್ನು ಬೆಂಬಲಿಸಲು ಅಗತ್ಯವಾದ ತಂತ್ರಜ್ಞಾನಗಳೊಂದಿಗೆ. ತರಬೇತಿ ಕೊಠಡಿ ಪ್ರಸ್ತಾವನೆಗಳು, ಪ್ರಾತ್ಯಕ್ಷಿಕೆಗಳು, ಮತ್ತು ಆಕರ್ಷಕ ಕಲಿಕೆ ಚಟುವಟಿಕೆಗಳನ್ನು ಬೆಂಬಲಿಸಲು ಆಧುನಿಕ ಧ್ವನಿ-ದೃಶ್ಯ ಸಲಕರಣೆಗಳಿಂದ ಸಜ್ಜಿತವಾಗಿದೆ. ತರಬೇತಿ ಕೊಠಡಿ ವಿಭಿನ್ನ ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಕಲಿಕೆಯ ಉದ್ದೇಶಗಳನ್ನು ಹೊಂದಿಸಲು ವ್ಯಾಪಕವಾಗಿದ್ದು, ಭಾಗವಹಿಸುವವರಿಗೆ ಸುಲಭವಾಗಿ ಪ್ರವೇಶಿಸಲು ಹತ್ತಿರವಿರುವ ಇತರ ಸೌಲಭ್ಯಗಳಂತಹ ಶೌಚಾಲಯಗಳು, ವಿರಾಮ ಪ್ರದೇಶಗಳು, ಮತ್ತು ತಾಜಾ ಪಾನೀಯ ಸ್ಥಳಗಳಿಗೆ ಸುಲಭವಾಗಿ ಪ್ರವೇಶಿಸಬಹುದಾಗಿದೆ.',
                image: '/images/sporti2_gallery/image3.jpg',
                isBook: true,
                link: '/services/book/sport-2'
            },
            {
                id: 1,
                title: 'Accommodation',
                title_kn: 'ವಸತಿ',
                desc: 'Rooms are spacious and equipped with all amenities to enhance the guest experience, such as a comfortable bed, seating area, work desk, wardrobe, and en-suite bathroom with toiletries and towels. The rooms are well-lit, with large windows allowing plenty of natural light to enter, creating a bright and welcoming ambiance. The VIP rooms are typically larger in size and include a separate living area and provide a serene and comfortable environment for guests to unwind and rejuvenate.',
                desc_kn: 'ಕೋಣೆಗಳು ವಿಶಾಲವಾಗಿದ್ದು, ಅತಿಥಿಯ ಅನುಭವವನ್ನು ಸುಧಾರಿಸಲು ಎಲ್ಲಾ ಸೌಲಭ್ಯಗಳಿಂದ ಕೂಡಿವೆ, ಆರಾಮದಯಕ ಹಾಸಿಗೆ, ಕುಳಿತುಕೊಳ್ಳುವ ಪ್ರದೇಶ, ಕೆಲಸದ ಮೇಜು, ವಾರ್ಡ್ರೋಬ್, ಮತ್ತು ಶೌಚಾಲಯದೊಂದಿಗೆ ಅಂಟಿಕೊಂಡಿರುವ ಬಾತ್ ರೂಮ್ ಸೇರಿದಂತೆ. ಕೋಣೆಗಳು ಚೆನ್ನಾಗಿ ಬೆಳಗಲ್ಪಟ್ಟಿದ್ದು, ದೊಡ್ಡ ಕಿಟಕಿಗಳು ಬಿಸಾಡುವ ಪ್ರಕಾಶವನ್ನು ಒಳಕ್ಕೆ ಅನುಮತಿಸುತ್ತವೆ, ಪ್ರಕಾಶಮಾನ ಮತ್ತು ಸ್ವಾಗತಾಯಕ ವಾತಾವರಣವನ್ನು ರಚಿಸುತ್ತವೆ. ವಿಐಪಿ ಕೋಣೆಗಳು ಸಾಮಾನ್ಯವಾಗಿ ದೊಡ್ಡ ಗಾತ್ರದಲ್ಲಿದ್ದು, ವಿಭಜಿತ ಲಿವಿಂಗ್ ಪ್ರದೇಶವನ್ನು ಒಳಗೊಂಡಿವೆ ಮತ್ತು ಅತಿಥಿಗಳು ವಿಶ್ರಾಂತಿ ಪಡೆಯಲು ಮತ್ತು ಪುನರುಜ್ಜೀವನಗೊಳ್ಳಲು ಸಿರಿಯಾಣ ಮತ್ತು ಆರಾಮದಾಯಕ ವಾತಾವರಣವನ್ನು ಒದಗಿಸುತ್ತವೆ.',
                image: '/images/sporti2_gallery/image9.jpg',
                isBook: true,
                link: '/room/sport-2'
            },
            {
                id: 2,
                title: 'Central lawn',
                title_kn: 'ಕೇಂದ್ರ Lawನ',
                desc: 'This outdoor space hosts manicured grass, flower beds, shrubbery and trees. Its greenery and open expanse offer a refreshing contrast to the indoor facilities, providing a serene and inviting atmosphere for guests to enjoy. Overall, the lawn at SPORTI 2 serves as a dynamic outdoor space that enhances the institute\'s offerings, providing opportunities for relaxation, recreation, and social interaction amidst its well-appointed facilities.',
                desc_kn: 'ಈ ಹೊರಾಂಗಣ ಸ್ಥಳವು ಕತ್ತರಿಸಲಾಗಿದ ಹುಲ್ಲು, ಹೂದೊಡ್ಡೆಗಳು, ಪೆಳಲಗಳು ಮತ್ತು ಮರಗಳನ್ನು ಹೊಂದಿದೆ. ಅದರ ಹಸಿರುಮನೆ ಮತ್ತು ಮುಕ್ತ ವಿಸ್ತಾರವು ಒಳಾಂಗಣ ಸೌಲಭ್ಯಗಳಿಗೆ ನವೀಕರಿಸುವ ವಿರೋಧವನ್ನು ನೀಡುತ್ತದೆ, ಅತಿಥಿಗಳು ಆನಂದಿಸಲು ಸಿರಿಯಾಣ ಮತ್ತು ಸ್ವಾಗತಾಯಕ ವಾತಾವರಣವನ್ನು ಒದಗಿಸುತ್ತದೆ. ಒಟ್ಟಿನಲ್ಲಿ, SPORTI 2 ನಲ್ಲಿ ಲಾನ್ ಸಂಸ್ಥೆಯ ಆಫರ್‌ಗಳನ್ನು ಉತ್ತಮಗೊಳಿಸುವ ಸಕ್ರಿಯ ಹೊರಾಂಗಣ ಸ್ಥಳವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ, ಅದರ ಚೆನ್ನಾಗಿ-ನಿಯಮಿತ ಸೌಲಭ್ಯಗಳ ಮಧ್ಯೆ ವಿಶ್ರಾಂತಿ, ಮನರಂಜನೆ, ಮತ್ತು ಸಾಮಾಜಿಕ ಸಮಾಗಮದ ಅವಕಾಶಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.',
                image: '/images/sporti2/CENTRAL_LAWN_SPORTI2.jpg',
                isBook: false,
                link: '/services/book'
            },
            {
                id: 3,
                title: 'Lounge',
                title_kn: 'ಲಾಂಜ್',
                desc: 'A spacious waiting lounge at SPORTI 2 serves as a comfortable and inviting area for individuals to relax, socialize and wait for various purposes. The ambiance of the waiting lounge is designed to be welcoming and calming. Being a central area, the lounge may also serve as a socializing area where individuals can interact with one another while waiting. It could be a place for casual conversations, networking opportunities, or simply a spot to unwind before proceeding with their activities.',
                desc_kn: 'SPORTI 2 ನಲ್ಲಿ ವಿಶಾಲವಾದ ವೇಟಿಂಗ್ ಲಾಂಜ್, ಜನರು ವಿಶ್ರಾಂತಿ ಪಡೆಯಲು, ಸಾಮಾಜಿಕ ಸಂಬಂಧಗಳನ್ನು ನಿರ್ಮಿಸಲು ಮತ್ತು ವಿವಿಧ ಉದ್ದೇಶಗಳಿಗಾಗಿ ನಿರೀಕ್ಷಿಸಲು ಆರಾಮದಾಯಕ ಮತ್ತು ಸ್ವಾಗತಾಯಕ ಪ್ರದೇಶವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ. ವೇಟಿಂಗ್ ಲಾಂಜ್‌ನ ವಾತಾವರಣವು ಸ್ವಾಗತಾಯಕ ಮತ್ತು ಶಾಂತಿಯುತವಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ಕೇಂದ್ರ ಪ್ರದೇಶವಾಗಿದ್ದು, ಲಾಂಜ್ ನಿರೀಕ್ಷಿಸುವಾಗ ಜನರು ಪರಸ್ಪರ ಸಂವಹನ ನಡೆಸಬಹುದಾದ ಸಾಮಾಜಿಕ ಸ್ಥಳವಾಗಿಯೂ ಕಾರ್ಯನಿರ್ವಹಿಸಬಹುದು. ಇದು ಸಾಮಾನ್ಯ ಚರ್ಚೆಗಳ, ನೆಟ್‌ವರ್ಕಿಂಗ್ ಅವಕಾಶಗಳ, ಅಥವಾ ಅವರ ಚಟುವಟಿಕೆಗಳನ್ನು ಮುಂದುವರಿಸುವ ಮೊದಲು ವಿಶ್ರಾಂತಿ ಪಡೆಯಲು ಸ್ಥಳವಾಗಬಹುದು.',
                image: '/images/sporti2/LOUNGE_SPORTI2.jpg',
                isBook: false,
                link: '/services/book'
            },
           
            {
                id: 5,
                title: 'In-house Restaurant',
                title_kn: 'ಇನ್-ಹೌಸ್ ರೆಸ್ಟೋರೆಂಟ್',
                desc: 'The dining facility at SPORTI 2 provides a welcoming and enjoyable culinary destination where guests can indulge in delicious meals, socialize with others, and experience exceptional service in a comfortable and inviting setting. The restaurant offers a variety of seating options to accommodate different dining preferences and group sizes. Also, it offers a diverse menu featuring a mix of local and regional cuisines, as well as options for vegetarians, vegans, and individuals with dietary restrictions or allergies. The in-house chefs’ menu is curated with an emphasis on fresh, high-quality ingredients and flavourful dishes.',
                desc_kn: 'SPORTI 2 ನಲ್ಲಿ ಇರುವ ಭೋಜನ ಸೌಲಭ್ಯವು ಅತಿಥಿಗಳು ರುಚಿಕರವಾದ ಊಟಗಳಲ್ಲಿ ತೊಡಗಿಸಲು, ಇತರರೊಂದಿಗೆ ಸಾಮಾಜಿಕ ಸಂಬಂಧಗಳನ್ನು ನಿರ್ಮಿಸಲು, ಮತ್ತು ಆರಾಮದಾಯಕ ಮತ್ತು ಸ್ವಾಗತಾಯಕ ವಾತಾವರಣದಲ್ಲಿ ವಿಶೇಷ ಸೇವೆಯನ್ನು ಅನುಭವಿಸಲು ಸ್ವಾಗತಾಯಕ ಮತ್ತು ಆನಂದಕರ ಸಾಂಸ್ಕೃತಿಕ ತಾಣವನ್ನು ಒದಗಿಸುತ್ತದೆ. ರೆಸ್ಟೋರೆಂಟ್ ವಿವಿಧ ಭೋಜನ ಆದ್ಯತೆಗಳು ಮತ್ತು ಗುಂಪು ಗಾತ್ರಗಳನ್ನು ಹೊಂದಿಸಲು ವಿವಿಧ ಆಸನ ಆಯ್ಕೆಗಳನ್ನೂ ಒದಗಿಸುತ್ತದೆ. ಇದಲ್ಲದೆ, ಇದು ಸ್ಥಳೀಯ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಆಹಾರಗಳ ಮಿಶ್ರಣವನ್ನು ಒಳಗೊಂಡಂತೆ ವೈವಿಧ್ಯಮಯ ಮೆನುವನ್ನು ಒದಗಿಸುತ್ತದೆ, ಮತ್ತು ಸಸ್ಯಾಹಾರಿ, ಶಾಕಾಹಾರಿ, ಮತ್ತು ಆಹಾರ ನಿರ್ಬಂಧಗಳು ಅಥವಾ ಅಲರ್ಜಿಗಳನ್ನು ಹೊಂದಿದ ವ್ಯಕ್ತಿಗಳಿಗಾಗಿ ಆಯ್ಕೆಗಳನ್ನೂ ಒದಗಿಸುತ್ತದೆ. ಇನ್-ಹೌಸ್ ಶೆಫ್ಸ್ ಮೆನು ಹೊಸದಾಗಿ, ಉತ್ತಮ-ಮಟ್ಟದ ಸಾಮಗ್ರಿಗಳನ್ನು ಮತ್ತು ರುಚಿಕರವಾದ ಆಹಾರಗಳನ್ನು ಒತ್ತಿ ಕುರಿತಾದ ಮೆನು ಪರಿಪೂರ್ಣವಾಗಿದೆ.',
                image: '/images/sporti2/DINING_HALL_SPORTI.jpg',
                isBook: false,
                link: '/services/book'
            },
           
            {
                id: 7,
                title: 'Sullivan Police Hockey ground',
                title_kn: 'ಸುಲ್ಲಿವಾನ್ ಪೊಲೀಸ್ ಹಾಕಿ ಮೈದಾನ',
                desc: 'The ground is typically located within the premises of SPORTI 2, easily accessible to participants and visitors. This open field provides a dedicated outdoor space for sporting activities, fostering physical fitness, teamwork, and camaraderie among participants while promoting a healthy and active lifestyle. The ground is used for a variety of purposes related to hockey and football, including training sessions, friendly matches, competitive tournaments, and recreational games. It serves as a hub for sportsmanship and teamwork among the participants. The ground is spacious and well-maintained, providing ample space for hockey and football games and practice sessions. It features markings and goalposts specific to each sport, ensuring compliance with official regulations and standards.',
                desc_kn: 'ಈ ಮೈದಾನವು ಸಾಮಾನ್ಯವಾಗಿ SPORTI 2 ಆವರಣದ ಒಳಗೆ, ಭಾಗವಹಿಸುವವರು ಮತ್ತು ಅತಿಥಿಗಳು ಸುಲಭವಾಗಿ ಪ್ರವೇಶಿಸಬಹುದಾದ ಸ್ಥಳದಲ್ಲಿ ಇದೆ. ಈ ಮುಕ್ತ ಕ್ಷೇತ್ರವು ಕ್ರೀಡಾ ಚಟುವಟಿಕೆಗಳಿಗೆ ನಿಶ್ಚಿತ ಹೊರಾಂಗಣ ಸ್ಥಳವನ್ನು ಒದಗಿಸುತ್ತದೆ, ಭಾಗವಹಿಸುವವರ ನಡುವೆ ದೈಹಿಕ ತೇರ್ಗಡೆ, ತಂಡದ ಕಾರ್ಯಪಟನೆ, ಮತ್ತು ಸ್ನೇಹದ ಮೂಲಕ ಆರೋಗ್ಯಕರ ಮತ್ತು ಸಕ್ರಿಯ ಜೀವನಶೈಲಿಯನ್ನು ಉತ್ತೇಜಿಸುತ್ತದೆ. ಮೈದಾನವು ಹಾಕಿ ಮತ್ತು ಫುಟ್ಬಾಲ್ ಸಂಬಂಧಿತ ವಿವಿಧ ಉದ್ದೇಶಗಳಿಗೆ ಬಳಸಲಾಗುತ್ತದೆ, ತರಬೇತಿ ಅಧಿವೇಶನಗಳು, ಸ್ನೇಹಪರ ಪಂದ್ಯಗಳು, ಸ್ಪರ್ಧಾತ್ಮಕ ಟೂರ್ನಮೆಂಟ್‌ಗಳು, ಮತ್ತು ಮನರಂಜನಾ ಆಟಗಳು ಸೇರಿ. ಇದು ಭಾಗವಹಿಸುವವರ ನಡುವೆ ಕ್ರೀಡಾಸ್ಪರ್ಧೆ ಮತ್ತು ತಂಡದ ಕಾರ್ಯಪಟುವಿಗಾಗಿ ಕೇಂದ್ರವಾಗಿರುತ್ತದೆ. ಮೈದಾನವು ವಿಶಾಲವಾಗಿದ್ದು, ಹಾಕಿ ಮತ್ತು ಫುಟ್ಬಾಲ್ ಆಟಗಳು ಮತ್ತು ಅಭ್ಯಾಸ ಅಧಿವೇಶನಗಳಿಗೆ ಸಾಕಷ್ಟು ಸ್ಥಳವನ್ನು ಒದಗಿಸುತ್ತದೆ. ಇದು ಪ್ರತಿ ಕ್ರೀಡೆಯ ಅಧಿಕೃತ ನಿಯಮಗಳು ಮತ್ತು ಮಾನದಂಡಗಳಿಗೆ ಅನುಗುಣವಾಗಿರುವ ಗುರುತುಗಳು ಮತ್ತು ಗೋಲ್‌ಪೋಸ್ಟ್‌ಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.',
                image: '/images/sporti2/SPORTI2_TAB_GROUND.jpg',
                isBook: false,
                link: '/services/book'
            },
        ]
    }
};

export default servicesData
