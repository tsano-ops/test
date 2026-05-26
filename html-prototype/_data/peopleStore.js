// Auto-extracted from session JSONL (latest snapshot before catastrophe)
// Source: c7a03782_000294_edit__shared_js.json
// Timestamp: 2026-04-26T19:28:51.270Z

window.peopleStore = window.peopleStore || [
    {
        id: 'sj', firstName: 'Sarah', familyName: 'Johnson', name: 'Sarah Johnson',
        role: 'Plan Owner', roleLayer1: 'Plan Owner', roleLayer2: '',
        photo: 'img/Profile_img.png',
        dob: '1980-07-22', alive: true, lifeStatus: 'Living', gender: 'Female',
        placeOfBirth: 'New York, United States',
        citizenships: ['United States', 'Canada', 'United Kingdom'],
        countryOfResidence: 'United Kingdom',
        relationships: [
            // Layer 3 timeline dates stored on edges per spec 2.2.3.2 §1 (same dates both sides).
            { toId: 'jj', type: 'spouse', specificRole: 'Husband',
              dates: {
                  relationshipStart:      '2004-10-01',
                  relationshipStartNotes: 'The first kiss in Central Park.',
                  marriageDate:           '2005-09-28',
                  marriageDateNotes:      'Wedding celebration at the Plaza Hotel in New York, Manhattan.',
                  // Test custom milestones (Violetka 2026-05-15 — seed examples to
                  // verify canonical .tl-milestone-custom render works in View +
                  // Edit + Essential Info Timeline & Milestones on John's record).
                  custom_1700000000000:        '2018-07-04',
                  custom_1700000000000Notes:  'First trip to Italy together — Lake Como, two weeks of pasta + sun.',
                  custom_1700000000000Label:  'Italy Anniversary Trip',
                  custom_1710000000000:        '2010-05-15',
                  custom_1710000000000Notes:  'Bought our first house together in Hampstead — bay window over the garden.',
                  custom_1710000000000Label:  'First Home Purchase',
                  custom_1720000000000:        '2008-11-22',
                  custom_1720000000000Notes:  'Adopted Bruno from the shelter — a 2-year-old beagle, full of mischief.',
                  custom_1720000000000Label:  'Bruno Joined Our Family'
              } },
            { toId: 'em', type: 'child' }, { toId: 'li', type: 'child' },
            { toId: 'ls', type: 'child' }, { toId: 'no', type: 'child' },
            { toId: 'ms', type: 'parent' }, { toId: 'rs', type: 'parent' },
            { toId: 'enzo', type: 'pet-of', dates: { joinedOurFamily: '2015-06-15' } },
            { toId: 'jd', type: 'former-spouse', dates: { marriageDate: '2002-06-15', separationDate: '2003-01-10', divorceDate: '2003-08-22' } },
            { toId: 'jds', type: 'grandparent' }, { toId: 'jsm', type: 'grandparent' }, { toId: 'bw', type: 'grandparent' }
        ],
        categories: ['family'], sharedTo: [],
        emails: [
            { value: 'sarah.johnson@gmail.com', primary: true, label: 'Personal' },
            { value: 's.johnson@johnson-johnson.co.uk', primary: false, label: 'Work — Founder & CEO' },
            { value: 'sarah@johnson.family', primary: false, label: 'Family domain' }
        ],
        phones: [
            { code: '+44', value: '+44 7700 900111', primary: true, label: 'Mobile' },
            { code: '+44', value: '+44 20 7946 0210', primary: false, label: 'Home (shared with John)' },
            { code: '+44', value: '+44 20 3950 0100', primary: false, label: 'Work — Johnson & Johnson office' }
        ],
        address: { city: 'London', country: 'United Kingdom', street: '12 Oak Avenue, Hampstead', postal: 'NW3 6QY', label: 'Home' },
        socials: [
            { platform: 'LinkedIn', handle: 'sarahjohnson', url: 'https://linkedin.com/in/sarahjohnson' },
            { platform: 'Instagram', handle: '@sarahj_official', url: 'https://instagram.com/sarahj_official' },
            { platform: 'X', handle: '@sarahjohnson', url: 'https://x.com/sarahjohnson' }
        ],
        notes: 'Plan Owner — primary account holder.'
    },
    {
        id: 'jj', firstName: 'John', familyName: 'Johnson', name: 'John Johnson',
        role: 'Husband', roleLayer1: 'Partner / Spouse', roleLayer2: 'Husband',
        photo: 'img/Profile_jj.png',
        dob: '1978-07-04', alive: true, lifeStatus: 'Living', gender: 'Male',
        placeOfBirth: 'Liverpool, United Kingdom',
        citizenships: ['United Kingdom'],
        relationships: [
            { toId: 'sj', type: 'spouse', specificRole: 'Wife',
              dates: {
                  relationshipStart:      '2004-10-01',
                  relationshipStartNotes: 'The first kiss in Central Park.',
                  marriageDate:           '2005-09-28',
                  marriageDateNotes:      'Wedding celebration at the Plaza Hotel in New York, Manhattan.',
                  // Custom milestones mirrored from Sarah's side (spec 2.2.3.2 §1:
                  // Layer 3 timeline dates stored on edges — same dates both sides).
                  // frSaveMember.js does this mirror at runtime; seed mirrors it
                  // here so John's Essential Info Timeline & Milestones shows
                  // these immediately without needing a save action first.
                  custom_1700000000000:        '2018-07-04',
                  custom_1700000000000Notes:  'First trip to Italy together — Lake Como, two weeks of pasta + sun.',
                  custom_1700000000000Label:  'Italy Anniversary Trip',
                  custom_1710000000000:        '2010-05-15',
                  custom_1710000000000Notes:  'Bought our first house together in Hampstead — bay window over the garden.',
                  custom_1710000000000Label:  'First Home Purchase',
                  custom_1720000000000:        '2008-11-22',
                  custom_1720000000000Notes:  'Adopted Bruno from the shelter — a 2-year-old beagle, full of mischief.',
                  custom_1720000000000Label:  'Bruno Joined Our Family'
              } },
            // Emma is Sarah's daughter from her previous marriage with Jack Daniel.
            // John is Emma's Step-Father (not biological). Step-relationship started
            // when John married Sarah.
            { toId: 'em', type: 'step-child', dates: { relationshipStart: '2005-09-28' } },
            { toId: 'li', type: 'child' },
            { toId: 'ls', type: 'child' }, { toId: 'no', type: 'child' }
        ],
        categories: ['family'], sharedTo: ['executor', 'beneficiary'],
        emails: [
            { value: 'john.johnson@email.com', primary: true, label: 'Personal' },
            { value: 'j.johnson@bmw-london.co.uk', primary: false, label: 'Work — BMW Service Manager' }
        ],
        phones: [
            { code: '+44', value: '+44 7700 900222', primary: true, label: 'Mobile' },
            { code: '+44', value: '+44 20 7946 0240', primary: false, label: 'Work — direct line' },
            { code: '+44', value: '+44 20 7946 0210', primary: false, label: 'Home (shared with Sarah)' }
        ],
        address: { city: 'London', country: 'United Kingdom', street: '12 Oak Avenue, Hampstead', postal: 'NW3 6QY', label: 'Home' },
        socials: [
            { platform: 'LinkedIn', handle: 'johnjohnson', url: 'https://linkedin.com/in/johnjohnson' },
            { platform: 'Facebook', handle: 'john.j.johnson', url: 'https://facebook.com/john.j.johnson' }
        ],
        notes: 'Spouse since 2003 — designated Executor and Beneficiary. Service Manager at BMW London. Severe penicillin allergy — must be flagged on all medical contacts.'
    },
    {
        id: 'em', firstName: 'Emma', familyName: 'Johnson', name: 'Emma Johnson',
        role: 'Biological Daughter', roleLayer1: 'Child', roleLayer2: 'Biological Daughter',
        photo: 'img/Profile_em.png',
        dob: '2005-04-10', alive: true, lifeStatus: 'Living', gender: 'Female',
        placeOfBirth: 'London, United Kingdom',
        citizenships: ['United Kingdom', 'United States'],
        // Emma is Sarah's daughter from her previous marriage with Jack Daniel.
        // Sarah is Emma's biological mother; Jack is Emma's biological father;
        // John (Sarah's current husband) is Emma's STEP-FATHER.
        relationships: [
            { toId: 'sj', type: 'parent' },        // Sarah is Emma's biological mother
            { toId: 'jd', type: 'parent' },        // Jack is Emma's biological father
            { toId: 'jj', type: 'step-parent' }    // John is Emma's step-father (married to Sarah)
        ],
        categories: ['family'], sharedTo: ['beneficiary'],
        emails: [
            { value: 'emma.johnson@cantab.ac.uk', primary: true, label: 'University' },
            { value: 'emma.j@gmail.com', primary: false, label: 'Personal' }
        ],
        phones: [
            { code: '+44', value: '+44 7700 900333', primary: true, label: 'Mobile' }
        ],
        address: { city: 'Cambridge', country: 'United Kingdom', street: 'Christ’s College', postal: 'CB2 3BU', label: 'Term-time' },
        socials: [
            { platform: 'Instagram', handle: '@emmaj_05', url: 'https://instagram.com/emmaj_05' },
            { platform: 'LinkedIn', handle: 'emmajohnson', url: 'https://linkedin.com/in/emmajohnson' },
            { platform: 'TikTok', handle: '@emma.j', url: 'https://tiktok.com/@emma.j' }
        ],
        notes: 'University student at Cambridge — financial support beneficiary.'
    },
    {
        id: 'li', firstName: 'Liam', familyName: 'Johnson', name: 'Liam Johnson',
        role: 'Biological Son', roleLayer1: 'Child', roleLayer2: 'Biological Son',
        photo: 'img/Profile_li.png',
        dob: '2008-09-05', alive: true, lifeStatus: 'Living', gender: 'Male',
        placeOfBirth: 'London, United Kingdom',
        citizenships: ['United Kingdom', 'United States'],
        relationships: [
            { toId: 'sj', type: 'parent' }, { toId: 'jj', type: 'parent' }
        ],
        categories: ['family'], sharedTo: ['beneficiary'],
        emails: [
            { value: 'liam.johnson@stpauls.school', primary: true, label: 'School' }
        ],
        phones: [
            { code: '+44', value: '+44 7700 900444', primary: true, label: 'Mobile' },
            { code: '+44', value: '+44 20 7748 9162', primary: false, label: 'School Office (St. Paul’s)' }
        ],
        address: { city: 'London', country: 'United Kingdom', street: '12 Oak Avenue, Hampstead', postal: 'NW3 6QY', label: 'Home' },
        socials: [
            { platform: 'Instagram', handle: '@liamj.08', url: 'https://instagram.com/liamj.08' }
        ],
        notes: 'Minor (17) — guardianship covered under Will. Currently studying at St. Paul’s School.'
    },
    {
        id: 'ls', firstName: 'Lisa', familyName: 'Johnson', name: 'Lisa Johnson',
        role: 'Biological Daughter', roleLayer1: 'Child', roleLayer2: 'Biological Daughter',
        photo: 'img/Profile_ls.png',
        dob: '2012-02-28', alive: true, lifeStatus: 'Living', gender: 'Female',
        placeOfBirth: 'London, United Kingdom',
        citizenships: ['United Kingdom', 'United States'],
        relationships: [
            { toId: 'sj', type: 'parent' }, { toId: 'jj', type: 'parent' }
        ],
        categories: ['family'], sharedTo: ['beneficiary'],
        emails: [
            { value: 'lisa.j@highgate.school.uk', primary: true, label: 'School' }
        ],
        phones: [
            { code: '+44', value: '+44 7700 900111', primary: true, label: "Mum's mobile (emergency)" },
            { code: '+44', value: '+44 20 8347 3564', primary: false, label: 'Highgate School office' }
        ],
        address: { city: 'London', country: 'United Kingdom', street: '12 Oak Avenue, Hampstead', postal: 'NW3 6QY', label: 'Home' },
        socials: [],
        notes: 'Minor (14) — guardianship covered under Will. Attends Highgate School. Tree nut allergy — note in school nurse file.'
    },
    {
        id: 'no', firstName: 'Noah', familyName: 'Johnson', name: 'Noah Johnson',
        role: 'Biological Son', roleLayer1: 'Child', roleLayer2: 'Biological Son',
        photo: 'img/Profile_no.png',
        dob: '2015-11-11', alive: true, lifeStatus: 'Living', gender: 'Male',
        placeOfBirth: 'London, United Kingdom',
        citizenships: ['United Kingdom', 'United States'],
        relationships: [
            { toId: 'sj', type: 'parent' }, { toId: 'jj', type: 'parent' }
        ],
        categories: ['family'], sharedTo: ['beneficiary'],
        emails: [
            { value: 'noah.j@hollandparkprimary.uk', primary: true, label: 'School' }
        ],
        phones: [
            { code: '+44', value: '+44 7700 900222', primary: true, label: "Dad's mobile (emergency)" },
            { code: '+44', value: '+44 20 7727 9747', primary: false, label: 'Holland Park Primary office' }
        ],
        address: { city: 'London', country: 'United Kingdom', street: '12 Oak Avenue, Hampstead', postal: 'NW3 6QY', label: 'Home' },
        socials: [],
        notes: 'Minor (10) — guardianship covered under Will. Severe peanut allergy — EpiPen always at school. Class 5B at Holland Park Primary.'
    },
    {
        id: 'ms', firstName: 'Mary', familyName: 'Smith', name: 'Mary Smith',
        role: 'Biological Mother', roleLayer1: 'Parent', roleLayer2: 'Biological Mother',
        photo: 'img/Profile_ms.png',
        dob: '1950-03-15', alive: true, lifeStatus: 'Living', gender: 'Female',
        placeOfBirth: 'Brighton, United Kingdom',
        citizenships: ['United Kingdom'],
        relationships: [
            { toId: 'rs', type: 'spouse', dates: { marriageDate: '1973-04-12' } },       // Robert is Mary's husband (married 1973)
            { toId: 'sj', type: 'child' },        // Sarah is Mary's daughter
            { toId: 'bw', type: 'parent' }        // Ben White is Mary's father — Violetka 2026-05-18 corrected
        ],
        categories: ['family'], sharedTo: ['executor', 'beneficiary'],
        emails: [
            { value: 'mary.smith@gmail.com', primary: true, label: 'Personal' }
        ],
        phones: [
            { code: '+44', value: '+44 7700 901001', primary: true, label: 'Mobile' },
            { code: '+44', value: '+44 1273 772 555', primary: false, label: 'Home — Brighton' }
        ],
        address: { city: 'Brighton', country: 'United Kingdom', street: '5 Sea Lane', postal: 'BN1 1AA', label: 'Home' },
        socials: [
            { platform: 'Facebook', handle: 'mary.smith.brighton', url: 'https://facebook.com/mary.smith.brighton' }
        ],
        notes: 'Backup Executor — call before contacting solicitor. Hypertension + hypothyroidism on regular medication.'
    },
    {
        id: 'rs', firstName: 'Robert', familyName: 'Smith', name: 'Robert Smith',
        role: 'Biological Father', roleLayer1: 'Parent', roleLayer2: 'Biological Father',
        photo: 'img/Profile_rs.png',
        dob: '1948-11-20', alive: true, lifeStatus: 'Living', gender: 'Male',
        placeOfBirth: 'Brighton, United Kingdom',
        citizenships: ['United Kingdom'],
        relationships: [
            { toId: 'ms', type: 'spouse', dates: { marriageDate: '1973-04-12' } },       // Mary is Robert's wife (married 1973)
            { toId: 'sj', type: 'child' },        // Sarah is Robert's daughter
            { toId: 'jds', type: 'parent' },      // Jane Doe Smith is Robert's mother — Violetka 2026-05-18 corrected
            { toId: 'jsm', type: 'parent' }       // John Smith is Robert's father — Violetka 2026-05-18 corrected
        ],
        categories: ['family'], sharedTo: ['executor', 'beneficiary'],
        emails: [
            { value: 'robert.smith@gmail.com', primary: true, label: 'Personal' }
        ],
        phones: [
            { code: '+44', value: '+44 7700 901002', primary: true, label: 'Mobile' },
            { code: '+44', value: '+44 1273 772 555', primary: false, label: 'Home — Brighton (shared)' }
        ],
        address: { city: 'Brighton', country: 'United Kingdom', street: '5 Sea Lane', postal: 'BN1 1AA', label: 'Home' },
        socials: [
            { platform: 'LinkedIn', handle: 'robertsmithaccountant', url: 'https://linkedin.com/in/robertsmithaccountant' }
        ],
        notes: 'Backup Executor. Retired civil engineer. Coronary artery disease — on aspirin + statin.'
    },
    {
        id: 'enzo', firstName: 'Enzo', familyName: '', name: 'Enzo',
        role: 'Pet (Golden Retriever)', roleLayer1: 'Pet', roleLayer2: 'Dog',
        photo: 'img/Profile_enzo.png',
        dob: '2015-04-30', alive: true, lifeStatus: 'Living', gender: 'Male',
        // Pet-specific fields (per Pet spec 2.3.2 — Species + Breed are
        // separate. Species is the biological classification (Dog/Cat/etc.),
        // Breed is the specific type within the species (Golden Retriever).
        species: 'Dog',
        breed: 'Golden Retriever',
        microchipId: '985112004567890',
        primaryVet: 'London Veterinary Clinic',
        vetPhone: '+44 20 7946 0345',
        guardianContact: 'Mary Smith',
        // Edge.type semantics: "the OTHER person's role to ME (this record)".
        // From Enzo's perspective, Sarah is his guardian/owner; Mary is his guardian.
        relationships: [
            { toId: 'sj', type: 'guardian', dates: { joinedOurFamily: '2015-06-15' } },     // Sarah is Enzo's owner/guardian
            { toId: 'ms', type: 'guardian' }      // Mary is Enzo's secondary guardian
        ],
        categories: ['family', 'pet'], sharedTo: [],
        emails: [],
        phones: [],
        address: { city: 'London', country: 'United Kingdom', street: '12 Oak Avenue, Hampstead', postal: 'NW3 6QY' },
        socials: [],
        notes: 'Family pet — guardianship arranged with Mary Smith. Vaccinations up to date. Hip dysplasia under monitoring.'
    },
    {
        id: 'jd', firstName: 'Jack', familyName: 'Daniel', name: 'Jack Daniel',
        role: 'Ex-husband', roleLayer1: 'Former Partner / Spouse', roleLayer2: 'Ex-husband',
        photo: 'img/Profile_jd.png',
        dob: '1968-09-19', alive: true, lifeStatus: 'Living', gender: 'Male',
        placeOfBirth: 'Manchester, United Kingdom',
        citizenships: ['United Kingdom'],
        // Jack is Emma's biological father (Emma is from Sarah's previous marriage).
        relationships: [
            { toId: 'sj', type: 'former-spouse', dates: { marriageDate: '2002-06-15', separationDate: '2003-01-10', divorceDate: '2003-08-22' } },
            { toId: 'em', type: 'child' }          // Emma is Jack's biological daughter
        ],
        categories: ['family'], sharedTo: [],
        emails: [
            { value: 'jack.daniel@gmail.com', primary: true, label: 'Personal' },
            { value: 'jack.daniel@daniel-co.uk', primary: false, label: 'Work — Daniel & Co.' }
        ],
        phones: [
            { code: '+44', value: '+44 7700 900666', primary: true, label: 'Mobile' },
            { code: '+44', value: '+44 161 446 8920', primary: false, label: 'Office — Manchester' }
        ],
        address: { city: 'Manchester', country: 'United Kingdom', street: '12 Pine Road', postal: 'M1 2AB', label: 'Home' },
        socials: [
            { platform: 'LinkedIn', handle: 'jackdaniel', url: 'https://linkedin.com/in/jackdaniel' }
        ],
        notes: 'Former spouse of Sarah; Emma\'s biological father. Independent marketing consultant.'
    },
    {
        id: 'jds', firstName: 'Jane', familyName: 'Doe Smith', name: 'Jane Doe Smith',
        role: 'Biological Grandmother', roleLayer1: 'Grandparent', roleLayer2: 'Biological Grandmother',
        photo: 'img/Profile_jds.png',
        dob: '1920-01-01', dod: '2000-12-06',
        alive: false, lifeStatus: 'Deceased', gender: 'Female',
        placeOfBirth: 'Brighton, United Kingdom',
        citizenships: ['United Kingdom'],
        // Per spec 3.9.1 — Unified Death Information Block fields
        placeOfDeath: 'Brighton, United Kingdom',
        causeOfDeath: 'Natural Causes',
        burialLocation: 'Brighton Borough Cemetery',
        deathNotes: 'Beloved grandmother and primary school teacher for 30 years. Remembered for her kindness and her tea-and-biscuit Sunday tradition.',
        // From Jane's perspective: John Smith was her husband, Robert is her son,
        // Sarah is her granddaughter (via Robert). Violetka 2026-05-18 corrected
        // — Jane + John Smith are Robert's parents (paternal grandparents), NOT Mary's.
        relationships: [
            { toId: 'jsm', type: 'spouse', dates: { marriageDate: '1948-05-22' } },      // Married 1948 (post-WWII)
            { toId: 'sj', type: 'grandchild' },   // Sarah is Jane's granddaughter
            { toId: 'rs', type: 'child' }         // Robert is Jane's son
        ],
        categories: ['family'], sharedTo: [],
        emails: [], phones: [], address: { city: 'Brighton', country: 'United Kingdom', street: '8 Marine Parade', postal: 'BN2 1TJ' }, socials: [],
        notes: 'Maternal grandmother. Passed away Dec 6, 2000 (age 80). Lived in Brighton with husband John Smith for 50+ years.'
    },
    {
        id: 'jsm', firstName: 'John', familyName: 'Smith', name: 'John Smith',
        role: 'Biological Grandfather', roleLayer1: 'Grandparent', roleLayer2: 'Biological Grandfather',
        photo: 'img/Profile_jsm.png',
        dob: '1918-02-05', dod: '1998-11-02',
        alive: false, lifeStatus: 'Deceased', gender: 'Male',
        placeOfBirth: 'Portsmouth, United Kingdom',
        citizenships: ['United Kingdom'],
        placeOfDeath: 'Brighton, United Kingdom',
        causeOfDeath: 'Heart Failure',
        burialLocation: 'Brighton Borough Cemetery',
        deathNotes: 'Royal Navy Lieutenant, retired. Served in WWII. Devoted husband to Jane for 50+ years.',
        // From John Smith's perspective: Sarah is his grandchild, Robert is his son, Jane is his spouse.
        // Violetka 2026-05-18 corrected — John Smith + Jane Doe Smith are Robert's parents
        // (Sarah's PATERNAL grandparents), NOT Mary's.
        relationships: [
            { toId: 'sj', type: 'grandchild' },   // Sarah is John Smith's granddaughter
            { toId: 'rs', type: 'child' },        // Robert is John Smith's son
            { toId: 'jds', type: 'spouse', dates: { marriageDate: '1948-05-22' } }      // Married 1948
        ],
        categories: ['family'], sharedTo: [],
        emails: [], phones: [], address: { city: 'Brighton', country: 'United Kingdom', street: '8 Marine Parade', postal: 'BN2 1TJ', label: 'Last residence' }, socials: [],
        notes: 'Maternal grandfather. Passed away Nov 2, 1998 (age 80).'
    },
    {
        id: 'bw', firstName: 'Ben', familyName: 'White', name: 'Ben White',
        role: 'Biological Grandfather', roleLayer1: 'Grandparent', roleLayer2: 'Biological Grandfather',
        photo: 'img/Profile_bw.png',
        dob: '1927-10-17', dod: '2007-06-08',
        alive: false, lifeStatus: 'Deceased', gender: 'Male',
        placeOfBirth: 'Brighton, United Kingdom',
        citizenships: ['United Kingdom', 'Bulgaria'],
        // Per spec 3.9.1 — Unified Death Information Block fields
        placeOfDeath: 'Sofia, Bulgaria',
        causeOfDeath: 'Natural Causes',
        burialLocation: 'Central Sofia Cemetery',
        deathNotes: 'Passed peacefully at home, surrounded by family. Remembered for his warmth, his stories, and the Sunday family lunch tradition he kept alive for 40+ years.',
        // From Ben's perspective: Sarah is his grandchild, Mary is his child.
        // Violetka 2026-05-18 corrected — Ben White is Mary's father (Sarah's
        // MATERNAL grandfather), NOT Robert's father.
        relationships: [
            { toId: 'sj', type: 'grandchild' },   // Sarah is Ben's granddaughter
            { toId: 'ms', type: 'child' }         // Mary is Ben's daughter
        ],
        categories: ['family'], sharedTo: [],
        emails: [], phones: [], address: { city: 'Sofia', country: 'Bulgaria', street: 'ul. Vitosha 28', postal: '1000', label: 'Last residence' }, socials: [],
        notes: 'Paternal grandfather. Passed away June 8, 2007 (age 79). Master carpenter for over 45 years.'
    },
    {
        id: 'drwhite', firstName: 'Emily', familyName: 'White', name: 'Dr. Emily White',
        role: 'Executor', roleLayer1: 'Executor', roleLayer2: 'Designated Primary Executor',
        photo: 'img/Profile_drwhite.png',
        dob: '1972-06-18', alive: true, lifeStatus: 'Living', gender: 'Female',
        placeOfBirth: 'Oxford, United Kingdom',
        citizenships: ['United Kingdom'],
        relationships: [],
        categories: ['network'], sharedTo: ['executor'],
        accessLevel: 'Full Record Access',
        organisation: 'White & Associates Estate Solicitors',
        professionalTitle: 'Senior Partner, PhD Estate Law',
        emails: [
            { value: 'emily.white@executors.co.uk', primary: true, label: 'Work — White & Partners' },
            { value: 'emily.white@gmail.com', primary: false, label: 'Personal' }
        ],
        phones: [
            { code: '+44', value: '+44 20 7946 0123', primary: true, label: 'Office direct line' },
            { code: '+44', value: '+44 7700 902100', primary: false, label: 'Mobile (emergency only)' }
        ],
        address: { city: 'London', country: 'United Kingdom', street: '40 Chancery Lane', postal: 'WC2A 1JA', label: 'Office — White & Partners Solicitors' },
        socials: [
            { platform: 'LinkedIn', handle: 'emilywhite', url: 'https://linkedin.com/in/emilywhite' }
        ],
        notes: 'Primary Executor — full record access on activation. Long-trusted estate solicitor — first point of contact post-mortem.'
    },
    {
        id: 'mdavis', firstName: 'Mark', familyName: 'Davis', name: 'Attorney Mark Davis',
        role: 'Lawyer', roleLayer1: 'Lawyer', roleLayer2: 'Estate Planning Solicitor',
        photo: 'img/Profile_mdavis.png',
        dob: '1968-09-12', alive: true, lifeStatus: 'Living', gender: 'Male',
        placeOfBirth: 'London, United Kingdom',
        citizenships: ['United Kingdom'],
        relationships: [],
        categories: ['network'], sharedTo: ['contributor'],
        accessLevel: 'Contributor Suggestive Access',
        organisation: 'Davis & Co. Solicitors',
        professionalTitle: 'Partner, LL.M. Estate Planning',
        emails: [
            { value: 'mark.davis@daviswillsestates.co.uk', primary: true, label: 'Work \u2014 Davis Wills & Estates' }
        ],
        phones: [
            { code: '+44', value: '+44 20 7405 0555', primary: true, label: 'Office direct line' },
            { code: '+44', value: '+44 7946 0555', primary: false, label: 'Mobile' }
        ],
        address: { city: 'London', country: 'United Kingdom', street: '21 Lincoln\u2019s Inn Fields', postal: 'WC2A 3PE', label: 'Office \u2014 Davis Wills & Estates' },
        socials: [
            { platform: 'LinkedIn', handle: 'markdavislaw', url: 'https://linkedin.com/in/markdavislaw' }
        ],
        notes: 'Pre-mortem contributor — drafts updates to Will + assists with periodic estate review. Office hours only.'
    },
    {
        id: 'ghouse', firstName: 'Gregory', familyName: 'House', name: 'Gregory House',
        role: 'Doctor', roleLayer1: 'Doctor', roleLayer2: 'Primary Doctor',
        photo: '',                                          // No photo — show GH initials until user uploads.
        dob: '', alive: true, lifeStatus: 'Living', gender: 'Male',
        placeOfBirth: '',
        citizenships: [],
        relationships: [],
        categories: ['network'], sharedTo: [],
        accessLevel: '',
        organisation: '',
        professionalTitle: 'Primary Doctor',
        emails: [
            { value: 'g.house@harleystreetclinic.co.uk', primary: true, label: 'Work — Harley Street Clinic' }
        ],
        phones: [
            { code: '+44', value: '+44 20 7935 7700', primary: true, label: 'Clinic reception' },
            { code: '+44', value: '+44 7700 904455', primary: false, label: 'On-call mobile (verified patients)' }
        ],
        address: { city: 'London', country: 'United Kingdom', street: '109 Harley Street', postal: 'W1G 6AN', label: 'Office — Harley Street Clinic' },
        socials: [],
        notes: 'Primary doctor — referenced from Contact Info > Primary Doctor.'
    }
];

// Helper: lookup a person record by id. Used by save handlers (saveAnefEntry
// pushes Medical entries onto sarah.entries.medical[]) and any cross-record
// renderer that needs name/photo for a personId from entriesStore.relatedTo[].
window.peopleById = window.peopleById || function(id) {
    return (window.peopleStore || []).find(function(p) { return p.id === id; }) || null;
};

// Mutate a person record in place by shallow-merging `patch` onto it,
// then trigger persistence + sync. Used by saveEssentialInfo (record-view)
// to write the viewed person's photo / name / DoB / etc. back to the
// store so it persists across page reloads + propagates to family.html
// summary cards. Returns the updated person record (or null if not found).
window.peopleStoreUpdate = window.peopleStoreUpdate || function(id, patch) {
    if (!id || !patch || typeof patch !== 'object') return null;
    var p = window.peopleById(id);
    if (!p) return null;
    Object.keys(patch).forEach(function(k) { p[k] = patch[k]; });
    if (typeof window.paAutoSave === 'function') {
        try { window.paAutoSave(); } catch(e) {}
    }
    return p;
};

// Returns the personId that should own newly-created entries on the current page.
//   profile.html  → 'sj'                       (Sarah / Plan Owner)
//   record.html   → window.__paViewedPersonRealId (the person whose record is open)
// Used by entry-save handlers so entries created on John's record are correctly
// stored with ownerId: 'jj' (not 'sj' under the overlay).
window.paGetCurrentOwnerId = window.paGetCurrentOwnerId || function() {
    if (typeof window !== 'undefined' && window.__paIsRecordView && window.__paViewedPersonRealId) {
        return window.__paViewedPersonRealId;
    }
    return 'sj';
};

// ─────────────────────────────────────────────────────────────────────────
// RELATIONSHIP ENGINE (per spec 2.2.3 — perspective-aware Layer 1/2/3)
// ─────────────────────────────────────────────────────────────────────────
//
// Layer 1 (Relationship Type) is stored as edge.type on the relationship edge.
// Layer 2 (Specific Role) is DERIVED at render time, never stored — depends
//   on the perspective (which record is being viewed) AND on the gender of
//   the OTHER person.
// Layer 3 (Timeline Conditional Dates) lives on the relationship edge so
//   both sides see identical dates.
//
// Edge type vocabulary (Layer 1 internal):
//   spouse, former-spouse, child, parent, sibling, grandparent, grandchild,
//   pet-of, guardian, in-law (derived only — never stored)

// Derive the visible Layer 2 (specific role) for `otherPerson` when shown
// from `viewedPerson`'s perspective, given the edge type.
window.paDeriveLayer2 = window.paDeriveLayer2 || function(viewedPerson, otherPerson, edgeType) {
    if (!otherPerson) return '';
    var g = (otherPerson.gender || '').toLowerCase();
    var byG = function(female, male, neutral) {
        if (g === 'female') return female;
        if (g === 'male')   return male;
        return neutral;
    };
    switch (edgeType) {
        case 'spouse':         return byG('Wife', 'Husband', 'Spouse');
        case 'former-spouse':  return byG('Ex-Wife', 'Ex-Husband', 'Former Spouse');
        case 'civil-partner':  return 'Civil Partner';
        case 'fiance':         return 'Fiancé / Fiancée';
        case 'child':          return byG('Biological Daughter', 'Biological Son', 'Child');
        case 'step-child':     return byG('Step-Daughter', 'Step-Son', 'Step-Child');
        case 'adopted-child':  return byG('Adopted Daughter', 'Adopted Son', 'Adopted Child');
        case 'parent':         return byG('Biological Mother', 'Biological Father', 'Parent');
        case 'step-parent':    return byG('Step-Mother', 'Step-Father', 'Step-Parent');
        case 'adoptive-parent':return byG('Adoptive Mother', 'Adoptive Father', 'Adoptive Parent');
        case 'sibling':        return byG('Biological Sister', 'Biological Brother', 'Biological Sibling');
        case 'half-sibling':   return byG('Half-Sister', 'Half-Brother', 'Half-Sibling');
        case 'step-sibling':   return byG('Step-Sister', 'Step-Brother', 'Step-Sibling');
        case 'grandparent':       return byG('Biological Grandmother', 'Biological Grandfather', 'Grandparent');
        case 'grandchild':        return byG('Biological Granddaughter', 'Biological Grandson', 'Grandchild');
        case 'great-grandparent': return byG('Great-Grandmother', 'Great-Grandfather', 'Great-Grandparent');
        case 'great-grandchild':  return byG('Great-Granddaughter', 'Great-Grandson', 'Great-Grandchild');
        case 'family-pet':        return otherPerson.breed || otherPerson.roleLayer2 || 'Family Pet';
        // edge.type = the OTHER person's role to ME (the viewed record).
        // 'pet-of' on viewed's record means "the other is my pet" → derive the
        // pet's species/breed (or fall back to "Pet"). 'guardian' on viewed's
        // record means "the other is my guardian/owner".
        case 'pet-of':         return otherPerson.breed || otherPerson.roleLayer2 || 'Pet';
        case 'guardian':       return 'Guardian / Owner';
        case 'aunt-uncle':     return byG('Aunt', 'Uncle', 'Aunt / Uncle');
        case 'niece-nephew':   return byG('Niece', 'Nephew', 'Niece / Nephew');
        case 'cousin':         return 'Cousin';
        case 'in-law-parent':  return byG('Mother-in-Law', 'Father-in-Law', 'Parent-in-Law');
        case 'in-law-sibling': return byG('Sister-in-Law', 'Brother-in-Law', 'Sibling-in-Law');
        case 'in-law-child':   return byG('Daughter-in-Law', 'Son-in-Law', 'Child-in-Law');
        default: return otherPerson.role || otherPerson.roleLayer2 || '';
    }
};

// Inverse Layer 1 type — when adding a Husband on John's record, Sarah's record
// should auto-have a 'spouse' edge to John (same type both sides for symmetric
// relationships). Some types invert (parent ↔ child).
window.paInverseEdgeType = window.paInverseEdgeType || function(edgeType) {
    switch (edgeType) {
        case 'parent':          return 'child';
        case 'child':           return 'parent';
        case 'step-parent':     return 'step-child';
        case 'step-child':      return 'step-parent';
        case 'adoptive-parent': return 'adopted-child';
        case 'adopted-child':   return 'adoptive-parent';
        case 'grandparent':       return 'grandchild';
        case 'grandchild':        return 'grandparent';
        case 'great-grandparent': return 'great-grandchild';
        case 'great-grandchild':  return 'great-grandparent';
        case 'pet-of':          return 'guardian';
        case 'guardian':        return 'pet-of';
        case 'aunt-uncle':      return 'niece-nephew';
        case 'niece-nephew':    return 'aunt-uncle';
        // Extended Family expansion (Violetka 2026-05-15) — generation-skipping
        case 'great-aunt-uncle':     return 'great-niece-nephew';
        case 'great-niece-nephew':   return 'great-aunt-uncle';
        // No-biological-link (chosen family)
        case 'godparent':       return 'godchild';
        case 'godchild':        return 'godparent';
        // In-Law variants
        case 'in-law-parent':   return 'in-law-child';
        case 'in-law-child':    return 'in-law-parent';
        // Step relations beyond immediate
        case 'step-aunt-uncle':      return 'step-niece-nephew';
        case 'step-niece-nephew':    return 'step-aunt-uncle';
        // Foster (legal placement, asymmetric parent↔child)
        case 'foster-parent':   return 'foster-child';
        case 'foster-child':    return 'foster-parent';
        // Symmetric relationships invert to themselves
        case 'spouse': case 'former-spouse': case 'civil-partner': case 'fiance':
        case 'sibling': case 'half-sibling': case 'step-sibling':
        case 'cousin':
        case 'in-law-sibling':      // brother/sister-in-law ↔ brother/sister-in-law
        case 'step-cousin':         // step-cousin ↔ step-cousin
        case 'foster-sibling':      // foster-sibling ↔ foster-sibling
        case 'extended':            // generic Extended Family ('Other custom') ↔ itself
            return edgeType;
        default: return edgeType;
    }
};

// Walk peopleStore and return all relationships of `personId` from THEIR
// perspective. Returns array of:
//   { person: <peopleStore entry>, edgeType, derivedLayer2, isInLaw, dates }
//
// Uses TWO sources:
//   1. `peopleStore[X].relationships` array on the viewed person itself
//   2. REVERSE LOOKUP — every other person's relationships array that points
//      to this person (so Sarah's relationship to John 'spouse' shows up on
//      John's record too)
//
// Plus: derives in-laws from spouse's parents/siblings (per spec rule —
// in-laws are not stored, computed dynamically).
window.paGetRelationshipsForPerson = window.paGetRelationshipsForPerson || function(personId) {
    if (!personId || !Array.isArray(window.peopleStore)) return [];
    var people = window.peopleStore;
    var viewed = people.find(function(p) { return p.id === personId; });
    if (!viewed) return [];

    var seen = {}; // de-dupe by other person's id + edgeType
    var out = [];

    function add(other, edgeType, isInLaw, dates, isDerived) {
        if (!other || other.id === personId) return;
        var key = other.id + '|' + edgeType;
        // Honor user's rejected suggestions — skip if user previously dismissed
        // this exact (otherId, edgeType) pair.
        if (isDerived && Array.isArray(viewed.rejectedSuggestions) && viewed.rejectedSuggestions.indexOf(key) !== -1) {
            return;
        }
        // Honor user's CONFIRMED derived suggestions — flip isDerived → false
        // so the renderer treats it as a confirmed card, not a suggested one.
        // (Violetka 2026-05-16: clicking Confirm on a derived in-law was a
        // no-op because the rel never gets stored on the viewer's side —
        // in-law-* types are derived-only per spec. The viewer's
        // confirmedDerivedSuggestions array lets us mark these as accepted
        // without storing a sentinel rel that paGetRelationshipsForPerson
        // would just skip again.)
        if (isDerived && Array.isArray(viewed.confirmedDerivedSuggestions) && viewed.confirmedDerivedSuggestions.indexOf(key) !== -1) {
            isDerived = false;
        }
        if (seen[key]) {
            // If we're upgrading a derived to non-derived, override the flag
            var existing = out.find(function(r) { return r.person.id === other.id && r.edgeType === edgeType; });
            if (existing && existing.isDerived && !isDerived) existing.isDerived = false;
            return;
        }
        seen[key] = true;
        out.push({
            person: other,
            edgeType: edgeType,
            derivedLayer2: window.paDeriveLayer2(viewed, other, edgeType),
            isInLaw: !!isInLaw,
            dates: dates || {},
            isDerived: !!isDerived  // true = system-suggested (per spec Tier B), needs user confirmation
        });
    }

    // 1. Viewed person's OWN relationships
    //    SKIP in-law-* types here too (Violetka 2026-05-15) — same reason as
    //    step 2: in-laws are derived-only per spec. Stored in-law edges from
    //    legacy seed/persistence data cause WRONG-DIRECTION derivations
    //    (e.g. Mary has stored {toId:'jj', type:'in-law-parent'} saying "John
    //    is Mary's in-law-parent" — nonsense, John is Mary's son-in-law).
    //    Step 6b correctly derives in-laws from spouse → spouse's parents.
    (viewed.relationships || []).forEach(function(rel) {
        if (/^in-law-/.test(rel.type || '')) return;
        var other = people.find(function(p) { return p.id === rel.toId; });
        if (other) add(other, rel.type, false, rel.dates || {});
    });

    // 2. Reverse lookup — every OTHER person's relationships pointing back to viewed
    //    SKIP in-law-* types (Violetka 2026-05-15): per data-model spec line 512,
    //    "in-law (derived only — never stored)". If seed data contains stored
    //    in-law edges (e.g. Mary stored {toId:jj, type:'in-law-parent'}), reverse-
    //    looking them up double-counts in-laws AND inverts wrong direction
    //    (in-law-parent stored on Mary becomes in-law-child from John's POV →
    //    Mary appears as John's Daughter-in-Law, which is nonsense). The in-law
    //    derivation in step 6b handles this dynamically from spouse → spouse's
    //    parents (correct direction).
    people.forEach(function(p) {
        if (p.id === personId) return;
        (p.relationships || []).forEach(function(rel) {
            if (rel.toId !== personId) return;
            if (/^in-law-/.test(rel.type || '')) return;   // skip stored in-laws — derived dynamically below
            // The edge stored on p says "p has relation `rel.type` to viewed".
            // From viewed's perspective, the edge type is the inverse.
            var inv = window.paInverseEdgeType(rel.type);
            add(p, inv, false, rel.dates || {});
        });
    });

    // 3. Sibling derivation — anyone who shares a parent with me is a sibling
    //    (per spec 2.2.3.2 §4 — generic Sibling type until user confirms biological/half/step).
    //    Walk all my parents → for each parent, find their other children.
    var myParentIds = (viewed.relationships || []).filter(function(r){ return r.type === 'parent'; }).map(function(r){ return r.toId; });
    // Also include parents found via reverse lookup (people who have me as 'child')
    people.forEach(function(p) {
        (p.relationships || []).forEach(function(r) {
            if (r.toId === personId && r.type === 'child' && myParentIds.indexOf(p.id) === -1) {
                myParentIds.push(p.id);
            }
        });
    });
    // Helper: list of biological parent ids of a given person (own 'parent' edges
    // + reverse 'child' edges). Step / adoptive parents excluded — only biological.
    function biologicalParentIdsOf(person) {
        if (!person) return [];
        var ids = (person.relationships || []).filter(function(r){ return r.type === 'parent'; }).map(function(r){ return r.toId; });
        people.forEach(function(p) {
            (p.relationships || []).forEach(function(r) {
                if (r.toId === person.id && r.type === 'child' && ids.indexOf(p.id) === -1) {
                    ids.push(p.id);
                }
            });
        });
        return ids;
    }
    // For sibling derivation, only consider BIOLOGICAL parents (not step / adoptive).
    var myBioParentIds = biologicalParentIdsOf(viewed);

    // Collect candidate siblings (anyone sharing at least one bio parent with me),
    // then determine sibling type per spec 2.2.3.2 §4 (auto-upgrade Unknown → Half → Full).
    var siblingCandidates = {};
    myBioParentIds.forEach(function(parentId) {
        var parent = people.find(function(p) { return p.id === parentId; });
        if (!parent) return;
        (parent.relationships || []).forEach(function(r) {
            if (r.type === 'child' && r.toId !== personId) {
                siblingCandidates[r.toId] = true;
            }
        });
        people.forEach(function(p) {
            if (p.id === personId || p.id === parentId) return;
            var hasSameParent = (p.relationships || []).some(function(r) {
                return r.type === 'parent' && r.toId === parentId;
            });
            if (hasSameParent) siblingCandidates[p.id] = true;
        });
    });

    Object.keys(siblingCandidates).forEach(function(candidateId) {
        var sibling = people.find(function(p) { return p.id === candidateId; });
        if (!sibling) return;
        var theirBioParents = biologicalParentIdsOf(sibling);
        var sharedBioParents = myBioParentIds.filter(function(pid) {
            return theirBioParents.indexOf(pid) !== -1;
        });
        var siblingEdgeType;
        if (sharedBioParents.length >= 2) {
            siblingEdgeType = 'sibling';            // full biological sibling
        } else if (sharedBioParents.length === 1) {
            siblingEdgeType = 'half-sibling';       // share one biological parent only
        } else {
            return;
        }
        // Sibling is derived (computed from shared parents) → suggested per spec
        add(sibling, siblingEdgeType, false, {}, true);
    });

    // 4. Grandparent + Great-grandparent derivation — 2-level traversal.
    //    Per user decision: kids see grandparents AND great-grandparents.
    var collectedGrandparentIds = [];
    myParentIds.forEach(function(parentId) {
        var parent = people.find(function(p) { return p.id === parentId; });
        if (!parent) return;
        var grandparentIds = (parent.relationships || []).filter(function(r){ return r.type === 'parent'; }).map(function(r){ return r.toId; });
        // Reverse: anyone whose 'child' edge points to my parent = my grandparent
        people.forEach(function(p) {
            (p.relationships || []).forEach(function(r) {
                if (r.toId === parentId && r.type === 'child' && grandparentIds.indexOf(p.id) === -1) {
                    grandparentIds.push(p.id);
                }
            });
        });
        grandparentIds.forEach(function(gpId) {
            var gp = people.find(function(p) { return p.id === gpId; });
            if (!gp) return;
            add(gp, 'grandparent', false, {}, true);  // derived from parent's parent
            if (collectedGrandparentIds.indexOf(gpId) === -1) collectedGrandparentIds.push(gpId);
        });
    });
    // Great-grandparents = my grandparents' parents (one more level)
    collectedGrandparentIds.forEach(function(gpId) {
        var gp = people.find(function(p) { return p.id === gpId; });
        if (!gp) return;
        var ggParentIds = (gp.relationships || []).filter(function(r){ return r.type === 'parent'; }).map(function(r){ return r.toId; });
        people.forEach(function(p) {
            (p.relationships || []).forEach(function(r) {
                if (r.toId === gpId && r.type === 'child' && ggParentIds.indexOf(p.id) === -1) {
                    ggParentIds.push(p.id);
                }
            });
        });
        ggParentIds.forEach(function(ggpId) {
            var ggp = people.find(function(p) { return p.id === ggpId; });
            if (ggp) add(ggp, 'great-grandparent', false, {}, true);  // derived 2 levels up
        });
    });

    // 5. Grandchild derivation — my children's children = my grandchildren
    var myChildIds = (viewed.relationships || []).filter(function(r){ return r.type === 'child'; }).map(function(r){ return r.toId; });
    people.forEach(function(p) {
        (p.relationships || []).forEach(function(r) {
            if (r.toId === personId && r.type === 'parent' && myChildIds.indexOf(p.id) === -1) {
                myChildIds.push(p.id);
            }
        });
    });
    myChildIds.forEach(function(childId) {
        var child = people.find(function(p) { return p.id === childId; });
        if (!child) return;
        var grandchildIds = (child.relationships || []).filter(function(r){ return r.type === 'child'; }).map(function(r){ return r.toId; });
        people.forEach(function(p) {
            (p.relationships || []).forEach(function(r) {
                if (r.toId === childId && r.type === 'parent' && grandchildIds.indexOf(p.id) === -1) {
                    grandchildIds.push(p.id);
                }
            });
        });
        grandchildIds.forEach(function(gcId) {
            var gc = people.find(function(p) { return p.id === gcId; });
            if (gc) add(gc, 'grandchild', false, {}, true);  // derived from child's child
        });
    });

    // 6a. Household pet derivation — pets owned by my parent OR my current spouse
    //     show up on my record as "Family Pet". Per user decision: Emma sees Enzo
    //     as Family Pet (her mother Sarah owns Enzo); John sees Enzo as Family Pet
    //     (his wife Sarah owns Enzo).
    (function() {
        var spouseIdsForPet = (viewed.relationships || [])
            .filter(function(r) { return r.type === 'spouse' || r.type === 'civil-partner'; })
            .map(function(r) { return r.toId; });
        var householdMemberIds = myParentIds.concat(spouseIdsForPet);
        householdMemberIds.forEach(function(mid) {
            var member = people.find(function(p) { return p.id === mid; });
            if (!member) return;
            (member.relationships || []).forEach(function(r) {
                if (r.type === 'pet-of') {
                    var pet = people.find(function(p) { return p.id === r.toId; });
                    // Derived (suggested) — Family Pet via household member
                    if (pet) add(pet, 'family-pet', false, {}, true);
                }
            });
        });
    })();

    // 6b. In-law derivation — ONLY for current spouses (not former). Per user decision:
    //     former in-laws are not shown (Jack's record won't show Mary/Robert as in-laws).
    var spouses = (viewed.relationships || []).filter(function(r) { return r.type === 'spouse' || r.type === 'civil-partner'; });
    spouses.forEach(function(spouseRel) {
        var spouse = people.find(function(p) { return p.id === spouseRel.toId; });
        if (!spouse) return;
        // Spouse's parents → in-law parents
        (spouse.relationships || []).forEach(function(srel) {
            if (srel.type !== 'parent') return;
            var inLawParent = people.find(function(p) { return p.id === srel.toId; });
            if (inLawParent) add(inLawParent, 'in-law-parent', true, {}, true);  // derived
        });
        // Reverse: people whose relationship to spouse is 'child' = also could be in-laws
        // (skipped to avoid double-derivation noise)
    });
    // 6c. CHILD-IN-LAW derivation — viewed's children's spouses are viewed's
    //     in-law-children (Son-in-Law / Daughter-in-Law). Walks viewed's own
    //     children + reverse-lookup children, then for each child finds their
    //     current spouse. Violetka 2026-05-15: "правилната логика за семейните
    //     връзки" — Mary should see John as Son-in-Law (Sarah's husband, who
    //     IS Mary's daughter).
    var myChildIds = (viewed.relationships || [])
        .filter(function(r) { return r.type === 'child' || r.type === 'step-child' || r.type === 'adopted-child' || r.type === 'foster-child'; })
        .map(function(r) { return r.toId; });
    // Reverse: people who have me as parent (their 'parent' edge points to me)
    people.forEach(function(p) {
        (p.relationships || []).forEach(function(r) {
            if (r.toId === personId && r.type === 'parent' && myChildIds.indexOf(p.id) === -1) {
                myChildIds.push(p.id);
            }
        });
    });
    myChildIds.forEach(function(childId) {
        var child = people.find(function(p) { return p.id === childId; });
        if (!child) return;
        // Find child's current spouse(s)
        (child.relationships || []).forEach(function(crel) {
            if (crel.type !== 'spouse' && crel.type !== 'civil-partner') return;
            var spouseOfChild = people.find(function(p) { return p.id === crel.toId; });
            if (spouseOfChild && spouseOfChild.id !== personId) {
                add(spouseOfChild, 'in-law-child', true, {}, true);  // derived
            }
        });
        // Reverse: people who have child as spouse
        people.forEach(function(p) {
            if (p.id === childId || p.id === personId) return;
            var isSpouseOfChild = (p.relationships || []).some(function(r) {
                return r.toId === childId && (r.type === 'spouse' || r.type === 'civil-partner');
            });
            if (isSpouseOfChild) add(p, 'in-law-child', true, {}, true);
        });
    });

    // 6d. SIBLING-IN-LAW derivation — viewed's siblings' spouses + viewed's
    //     spouse's siblings. Both directions are 'in-law-sibling' (symmetric).
    var mySiblingIds = (viewed.relationships || [])
        .filter(function(r) { return /^(sibling|half-sibling|step-sibling|foster-sibling)$/.test(r.type || ''); })
        .map(function(r) { return r.toId; });
    people.forEach(function(p) {
        (p.relationships || []).forEach(function(r) {
            if (r.toId === personId && /^(sibling|half-sibling|step-sibling|foster-sibling)$/.test(r.type || '') && mySiblingIds.indexOf(p.id) === -1) {
                mySiblingIds.push(p.id);
            }
        });
    });
    mySiblingIds.forEach(function(siblingId) {
        var sibling = people.find(function(p) { return p.id === siblingId; });
        if (!sibling) return;
        (sibling.relationships || []).forEach(function(srel) {
            if (srel.type !== 'spouse' && srel.type !== 'civil-partner') return;
            var sIL = people.find(function(p) { return p.id === srel.toId; });
            if (sIL && sIL.id !== personId) add(sIL, 'in-law-sibling', true, {}, true);
        });
    });
    spouses.forEach(function(spouseRel) {
        var spouse = people.find(function(p) { return p.id === spouseRel.toId; });
        if (!spouse) return;
        var spouseSiblings = (spouse.relationships || [])
            .filter(function(r) { return /^(sibling|half-sibling|step-sibling|foster-sibling)$/.test(r.type || ''); })
            .map(function(r) { return r.toId; });
        people.forEach(function(p) {
            (p.relationships || []).forEach(function(r) {
                if (r.toId === spouse.id && /^(sibling|half-sibling|step-sibling|foster-sibling)$/.test(r.type || '') && spouseSiblings.indexOf(p.id) === -1) {
                    spouseSiblings.push(p.id);
                }
            });
        });
        spouseSiblings.forEach(function(sId) {
            if (sId === personId) return;
            var s = people.find(function(p) { return p.id === sId; });
            if (s) add(s, 'in-law-sibling', true, {}, true);
        });
    });

    // Reverse spouse lookup — current spouses only (not former).
    people.forEach(function(p) {
        if (p.id === personId) return;
        var hasUsAsSpouse = (p.relationships || []).some(function(r) {
            return r.toId === personId && (r.type === 'spouse' || r.type === 'civil-partner');
        });
        if (!hasUsAsSpouse) return;
        // p is our spouse — their parents are our in-laws
        (p.relationships || []).forEach(function(srel) {
            if (srel.type !== 'parent') return;
            var inLawParent = people.find(function(pp) { return pp.id === srel.toId; });
            if (inLawParent) add(inLawParent, 'in-law-parent', true, {}, true);  // derived
        });
    });

    // ─── Merge in Tier B suggestions from viewed.suggestedRelationships[] ───
    // paRelationshipEngine populates this array with cross-record suggestions
    // (e.g. Sarah's spouse John gets Victor as a suggested Child, since Victor
    // is Sarah's child and John is Sarah's current spouse — could be step /
    // adopted / biological). Without this merge, those suggestions never reach
    // the per-record F&R card on record.html.
    // Skip if the suggested person is already in `out` (via direct edge or via
    // earlier sibling/in-law derivation) — those are more specific.
    (viewed.suggestedRelationships || []).forEach(function(sug) {
        if (!sug || !sug.fromId || sug.rejected) return;
        var other = people.find(function(p) { return p.id === sug.fromId; });
        if (!other) return;
        var alreadyInOut = out.some(function(r) { return r.person.id === other.id; });
        if (alreadyInOut) return;  // de-dup — keep the more specific entry
        var canon = (typeof window.paNormalizeRelType === 'function')
            ? window.paNormalizeRelType(sug.type) : sug.type;
        add(other, canon, false, {}, true);  // isDerived=true → Suggested pill
    });

    return out;
};

// ─────────────────────────────────────────────────────────────────────────
// BIDIRECTIONAL SYNC (per spec 2.2.3.2 §1 — relationships are always two-way)
// ─────────────────────────────────────────────────────────────────────────
// When user mutates an edge on `viewedId` pointing to `otherId` with type
// `edgeType`, this helper writes the inverse edge on `otherId`'s relationships
// array using paInverseEdgeType(). Idempotent — won't add duplicates; updates
// in place if an existing edge to viewedId is found.
//
// Tier A auto-create per spec: when adding Husband on John's record →
// automatically creates the spouse edge on Sarah's record.
//
// Returns true if a change was made.
window.paWriteBidirectionalEdge = window.paWriteBidirectionalEdge || function(viewedId, otherId, edgeType, dates) {
    if (!viewedId || !otherId || !edgeType) return false;
    if (!Array.isArray(window.peopleStore)) return false;
    var viewed = window.peopleStore.find(function(p) { return p.id === viewedId; });
    var other  = window.peopleStore.find(function(p) { return p.id === otherId; });
    if (!viewed || !other) return false;
    var changed = false;

    // 1. Forward edge on viewed → other (insert or update)
    viewed.relationships = viewed.relationships || [];
    var fwd = viewed.relationships.find(function(r) { return r.toId === otherId; });
    if (fwd) {
        if (fwd.type !== edgeType) { fwd.type = edgeType; changed = true; }
        if (dates && Object.keys(dates).length) {
            fwd.dates = Object.assign(fwd.dates || {}, dates);
            changed = true;
        }
    } else {
        viewed.relationships.push({ toId: otherId, type: edgeType, dates: dates || {} });
        changed = true;
    }

    // 2. Inverse edge on other → viewed (insert or update)
    var inverseType = window.paInverseEdgeType(edgeType);
    other.relationships = other.relationships || [];
    var inv = other.relationships.find(function(r) { return r.toId === viewedId; });
    if (inv) {
        if (inv.type !== inverseType) { inv.type = inverseType; changed = true; }
        if (dates && Object.keys(dates).length) {
            // Same dates on both sides (per spec §1 — dates live on the link)
            inv.dates = Object.assign(inv.dates || {}, dates);
            changed = true;
        }
    } else {
        other.relationships.push({ toId: viewedId, type: inverseType, dates: dates || {} });
        changed = true;
    }

    if (changed && typeof window.paAutoSave === 'function') window.paAutoSave();
    return changed;
};

// Remove a relationship edge between two persons (both directions).
window.paRemoveBidirectionalEdge = window.paRemoveBidirectionalEdge || function(viewedId, otherId) {
    if (!viewedId || !otherId) return false;
    if (!Array.isArray(window.peopleStore)) return false;
    var viewed = window.peopleStore.find(function(p) { return p.id === viewedId; });
    var other  = window.peopleStore.find(function(p) { return p.id === otherId; });
    var changed = false;
    if (viewed && Array.isArray(viewed.relationships)) {
        var before = viewed.relationships.length;
        viewed.relationships = viewed.relationships.filter(function(r) { return r.toId !== otherId; });
        if (viewed.relationships.length !== before) changed = true;
    }
    if (other && Array.isArray(other.relationships)) {
        var before2 = other.relationships.length;
        other.relationships = other.relationships.filter(function(r) { return r.toId !== viewedId; });
        if (other.relationships.length !== before2) changed = true;
    }
    if (changed && typeof window.paAutoSave === 'function') window.paAutoSave();
    return changed;
};

// ─────────────────────────────────────────────────────────────────────────
// LAYER 3 — Conditional Timeline Date schema per relationship role.
// Per spec 2.2.3.1 table — each Specific Role has prescribed dates that are
// required (*) or optional. Returns array of { key, label, required }.
// ─────────────────────────────────────────────────────────────────────────
window.paTimelineFieldsForRole = window.paTimelineFieldsForRole || function(edgeType, layer2Label) {
    var L = String(layer2Label || '').toLowerCase();
    switch (edgeType) {
        case 'spouse':
            if (L.indexOf('civil') !== -1) return [
                { key: 'civilPartnershipDate', label: 'Civil Partnership Date', required: true }
            ];
            if (L.indexOf('fianc') !== -1) return [
                { key: 'relationshipStart', label: 'Relationship Start Date', required: false },
                { key: 'engagementDate',    label: 'Engagement Date',         required: false }
            ];
            // Husband / Wife / Spouse → Marriage Date required
            return [
                { key: 'relationshipStart', label: 'Relationship Start Date', required: false },
                { key: 'marriageDate',      label: 'Marriage Date',           required: true }
            ];
        case 'former-spouse':
            return [
                { key: 'relationshipStart', label: 'Relationship Start Date', required: false },
                { key: 'marriageDate',      label: 'Marriage Date',           required: false },
                { key: 'separationDate',    label: 'Separation Date',         required: false },
                { key: 'divorceDate',       label: 'Divorce / Dissolution Date', required: true }
            ];
        case 'civil-partner':
            return [{ key: 'civilPartnershipDate', label: 'Civil Partnership Date', required: true }];
        case 'fiance':
            return [
                { key: 'relationshipStart', label: 'Relationship Start Date', required: false },
                { key: 'engagementDate',    label: 'Engagement Date',         required: false }
            ];
        case 'step-child':
        case 'step-parent':
            return [{ key: 'relationshipStart', label: 'Relationship Start Date', required: false }];
        case 'adopted-child':
        case 'adoptive-parent':
            return [{ key: 'adoptionDate', label: 'Adoption Date', required: true }];
        case 'step-sibling':
            return [{ key: 'relationshipStart', label: 'Relationship Start Date', required: false }];
        case 'pet-of':
        case 'guardian':
        case 'family-pet':
            return [{ key: 'joinedOurFamily', label: 'Joined Our Family', required: true }];
        // Biological parent/child/sibling/grandparent/grandchild → no dates needed
        default:
            return [];
    }
};

// Format a yyyy-mm-dd date for display ("Sep 28, 2005")
window.paFormatDateShort = window.paFormatDateShort || function(s) {
    if (!s) return '';
    var parts = String(s).split('-');
    if (parts.length !== 3) return s;
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var m = parseInt(parts[1], 10) - 1;
    return (months[m] || parts[1]) + ' ' + parseInt(parts[2], 10) + ', ' + parts[0];
};

// Group relationships into the spec's family-group buckets for rendering.
window.paGroupRelationships = window.paGroupRelationships || function(rels) {
    var groups = {
        spouses:        { title: 'Spouses & Partners',      rels: [] },
        formerSpouses:  { title: 'Former Spouses & Partners', rels: [] },
        children:       { title: 'Children',                rels: [] },
        parents:        { title: 'Parents',                 rels: [] },
        siblings:       { title: 'Siblings',                rels: [] },
        grandparents:   { title: 'Grandparents',            rels: [] },
        grandchildren:  { title: 'Grandchildren',           rels: [] },
        // In-laws split into fine-grained sub-groups (Violetka
        // 2026-05-14): on John's record Mary/Robert must appear
        // under "Parents-in-Law", not the generic "In-Laws" bucket.
        // Routed by edgeType. Generic `inLaws` kept as a safety net
        // for any in-law edgeType we haven't enumerated.
        inLawParents:   { title: 'Parents-in-Law',          rels: [] },
        inLawSiblings:  { title: 'Siblings-in-Law',         rels: [] },
        inLawChildren:  { title: 'Children-in-Law',         rels: [] },
        inLaws:         { title: 'In-Laws',                 rels: [] },
        extended:       { title: 'Extended Family',         rels: [] },
        pets:           { title: 'Pets',                    rels: [] }
    };
    rels.forEach(function(r) {
        // Route in-laws by edgeType (not r.isInLaw — that flag is set
        // inconsistently in older derivation paths). Any edgeType that
        // starts with "in-law-" is an in-law regardless of the flag.
        if (typeof r.edgeType === 'string' && r.edgeType.indexOf('in-law-') === 0) {
            if (r.edgeType === 'in-law-parent')       groups.inLawParents.rels.push(r);
            else if (r.edgeType === 'in-law-sibling') groups.inLawSiblings.rels.push(r);
            else if (r.edgeType === 'in-law-child')   groups.inLawChildren.rels.push(r);
            else                                       groups.inLaws.rels.push(r);
            return;
        }
        if (r.isInLaw) { groups.inLaws.rels.push(r); return; }
        switch (r.edgeType) {
            case 'spouse': case 'civil-partner': case 'fiance':
                groups.spouses.rels.push(r); break;
            case 'former-spouse':
                groups.formerSpouses.rels.push(r); break;
            // Children: bio + adopted + step + FOSTER (foster was missing —
            // Violetka 2026-05-16 audit fix C4).
            case 'child': case 'step-child': case 'adopted-child': case 'foster-child':
                groups.children.rels.push(r); break;
            case 'parent': case 'step-parent': case 'adoptive-parent': case 'foster-parent':
                groups.parents.rels.push(r); break;
            case 'sibling': case 'half-sibling': case 'step-sibling':
                groups.siblings.rels.push(r); break;
            case 'grandparent':
                groups.grandparents.rels.push(r); break;
            case 'grandchild':
                groups.grandchildren.rels.push(r); break;
            case 'pet-of': case 'guardian': case 'family-pet':
                groups.pets.rels.push(r); break;
            case 'great-grandparent': case 'great-grandchild':
                groups.extended.rels.push(r); break;
            case 'aunt-uncle': case 'niece-nephew': case 'cousin':
                groups.extended.rels.push(r); break;
            default:
                groups.extended.rels.push(r);
        }
    });
    return groups;
};

// Resolve the photo URL for a person. Returns empty string when no photo —
// callers should fall back to peopleInitials() rendering. Centralised so any
// future "default avatar" logic (e.g. inherit from related family) lives in
// one place. Plan Owner photo follows the global window.planOwnerPhoto sync.
window.peoplePhoto = window.peoplePhoto || function(person) {
    if (!person) return '';
    if (person.id === 'sj' && typeof window.planOwnerPhoto === 'string') {
        return window.planOwnerPhoto || person.photo || '';
    }
    return person.photo || '';
};

// CANONICAL initials fallback (locked pattern — see DESIGN_SYSTEM_LIVE.md →
// Plan Owner Avatar). Rule: first letter of first name + first letter of
// family name, UPPERCASE, no dots, no spaces. e.g. "Mark Davis" → "MD".
// If only one name token, return just that single letter.
// Used everywhere a person record renders without a photo (linked summary
// cards, header avatars, sidebar avatars, profile cards, family tree, print
// document, contact pickers, dashboard poster — all share the same output).
window.peopleInitials = window.peopleInitials || function(person) {
    if (!person) return '';
    var first = (person.firstName || '').trim();
    var family = (person.familyName || '').trim();
    // Fallback: split person.name when firstName/familyName missing
    if (!first && !family && person.name) {
        var parts = String(person.name).trim().split(/\s+/);
        first = parts[0] || '';
        family = parts.length > 1 ? parts[parts.length - 1] : '';
    }
    var f = first ? first.charAt(0) : '';
    var l = family ? family.charAt(0) : '';
    return (f + l).toUpperCase();
};
