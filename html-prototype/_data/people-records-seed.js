// People Records — comprehensive seed for non-Sarah persons.
//
// Each entry is owned by a Person Record and uses the CANONICAL ANEF_CONDITIONAL
// labels exactly (so the entry's About-This-Entry section renders all fields,
// allows edit, and saves with the correct schema). Mismatched labels cause the
// renderer to drop fields silently — see _shared.js → buildEntryExpandBodyHTML.
//
// Canonical labels by category:
//   Allergies                : Allergen / Severity
//   Medical Conditions       : Condition / Medications
//   Medications & Supplements: Medication / Supplement, Intake, Dosage, Purpose / Reason
//   Educational Qualification: Education Level, Degree / Specialisation, Institution Name, Country, City / Town
//   Professional Certification: Certificate Name, Issuing Organisation, Country
//   Employment Entry         : Job Title, Company / Organisation, Country, City
//   Membership / Affiliation : Organisation Name, Organisation Type, Role / Position, Membership ID
//   Belief                   : Belief Type, Affiliation / Description, Level of Observance
//   Hobby                    : Hobby Name, Skill Level, Details
//   Interest                 : Interest Category, Name, Description
//
// Idempotent: skips entry ids already in store (so localStorage preservation
// works — once persisted, the seeds don't duplicate).
//
// Load order: peopleStore.js → entriesStore.js → persistence.js (loads from
// localStorage) → THIS file (seeds missing) → _shared.js
(function() {
    'use strict';

    const SAMPLES = [
        // ─────────────────────────────────────────────────────────────────
        // ESSENTIAL IDENTITY DOCUMENTS — every living immediate-family
        // member gets a Birth Certificate, Passport, and National ID Card
        // entry on their OWN record's Essential Info card. Per Violetka
        // 2026-05-12. ownerId is the family member's id (not 'sj'), so they
        // only show on that person's record.
        // ─────────────────────────────────────────────────────────────────
        // ── John Johnson (jj) — Husband ──
        { id: 'rec-jj-essential-passport',  ownerId: 'jj', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Passport',           title: "John's Passport — United Kingdom",
            dateLabel: 'Expiry Date', date: 'Aug 22, 2031', expiry: 'Aug 22, 2031',
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'Passport Number',   value: '561234567' },
                { label: 'Issuing Authority', value: 'HM Passport Office' }
            ] },
        { id: 'rec-jj-essential-id',        ownerId: 'jj', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'National ID Card',   title: "John's National ID Card",
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'ID Number',         value: 'JOHNS780704UK01' }
            ] },
        { id: 'rec-jj-essential-birth',     ownerId: 'jj', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Birth Certificate',  title: "John's Birth Certificate",
            dateLabel: 'Issued', date: 'Jul 12, 1978',
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'Issuing Authority', value: 'General Register Office, England & Wales' }
            ] },

        // ── Emma Johnson (em) — Daughter ──
        { id: 'rec-em-essential-passport',  ownerId: 'em', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Passport',           title: "Emma's Passport — United Kingdom",
            dateLabel: 'Expiry Date', date: 'Apr 15, 2033', expiry: 'Apr 15, 2033',
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'Passport Number',   value: '562345678' },
                { label: 'Issuing Authority', value: 'HM Passport Office' }
            ] },
        { id: 'rec-em-essential-id',        ownerId: 'em', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'National ID Card',   title: "Emma's National ID Card",
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'ID Number',         value: 'JOHNS050410UK01' }
            ] },
        { id: 'rec-em-essential-birth',     ownerId: 'em', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Birth Certificate',  title: "Emma's Birth Certificate",
            dateLabel: 'Issued', date: 'Apr 18, 2005',
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'Issuing Authority', value: 'General Register Office, England & Wales' }
            ] },

        // ── Liam Johnson (li) — Son ──
        { id: 'rec-li-essential-passport',  ownerId: 'li', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Passport',           title: "Liam's Passport — United Kingdom",
            dateLabel: 'Expiry Date', date: 'Sep 10, 2032', expiry: 'Sep 10, 2032',
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'Passport Number',   value: '563456789' },
                { label: 'Issuing Authority', value: 'HM Passport Office' }
            ] },
        { id: 'rec-li-essential-id',        ownerId: 'li', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'National ID Card',   title: "Liam's National ID Card",
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'ID Number',         value: 'JOHNS080615UK01' }
            ] },
        { id: 'rec-li-essential-birth',     ownerId: 'li', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Birth Certificate',  title: "Liam's Birth Certificate",
            dateLabel: 'Issued', date: 'Jun 20, 2008',
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'Issuing Authority', value: 'General Register Office, England & Wales' }
            ] },

        // ── Lyla Johnson (ls) — Daughter ──
        { id: 'rec-ls-essential-passport',  ownerId: 'ls', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Passport',           title: "Lyla's Passport — United Kingdom",
            dateLabel: 'Expiry Date', date: 'Nov 03, 2034', expiry: 'Nov 03, 2034',
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'Passport Number',   value: '564567890' },
                { label: 'Issuing Authority', value: 'HM Passport Office' }
            ] },
        { id: 'rec-ls-essential-id',        ownerId: 'ls', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'National ID Card',   title: "Lyla's National ID Card",
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'ID Number',         value: 'JOHNS101108UK01' }
            ] },
        { id: 'rec-ls-essential-birth',     ownerId: 'ls', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Birth Certificate',  title: "Lyla's Birth Certificate",
            dateLabel: 'Issued', date: 'Nov 12, 2010',
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'Issuing Authority', value: 'General Register Office, England & Wales' }
            ] },

        // ── Noah Johnson (no) — Son ──
        { id: 'rec-no-essential-passport',  ownerId: 'no', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Passport',           title: "Noah's Passport — United Kingdom",
            dateLabel: 'Expiry Date', date: 'May 28, 2030', expiry: 'May 28, 2030',
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'Passport Number',   value: '565678901' },
                { label: 'Issuing Authority', value: 'HM Passport Office' }
            ] },
        { id: 'rec-no-essential-id',        ownerId: 'no', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'National ID Card',   title: "Noah's National ID Card",
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'ID Number',         value: 'JOHNS130522UK01' }
            ] },
        { id: 'rec-no-essential-birth',     ownerId: 'no', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Birth Certificate',  title: "Noah's Birth Certificate",
            dateLabel: 'Issued', date: 'May 30, 2013',
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'Issuing Authority', value: 'General Register Office, England & Wales' }
            ] },

        // ── Mary Smith (ms) — Mother ──
        { id: 'rec-ms-essential-passport',  ownerId: 'ms', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Passport',           title: "Mary's Passport — United Kingdom",
            dateLabel: 'Expiry Date', date: 'Feb 14, 2029', expiry: 'Feb 14, 2029',
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'Passport Number',   value: '566789012' },
                { label: 'Issuing Authority', value: 'HM Passport Office' }
            ] },
        { id: 'rec-ms-essential-id',        ownerId: 'ms', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'National ID Card',   title: "Mary's National ID Card",
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'ID Number',         value: 'SMITH521003UK01' }
            ] },
        { id: 'rec-ms-essential-birth',     ownerId: 'ms', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Birth Certificate',  title: "Mary's Birth Certificate",
            dateLabel: 'Issued', date: 'Oct 03, 1952',
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'Issuing Authority', value: 'General Register Office, England & Wales' }
            ] },

        // ── Robert Smith (rs) — Father ──
        { id: 'rec-rs-essential-passport',  ownerId: 'rs', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Passport',           title: "Robert's Passport — United Kingdom",
            dateLabel: 'Expiry Date', date: 'Jul 09, 2028', expiry: 'Jul 09, 2028',
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'Passport Number',   value: '567890123' },
                { label: 'Issuing Authority', value: 'HM Passport Office' }
            ] },
        { id: 'rec-rs-essential-id',        ownerId: 'rs', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'National ID Card',   title: "Robert's National ID Card",
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'ID Number',         value: 'SMITH500715UK01' }
            ] },
        { id: 'rec-rs-essential-birth',     ownerId: 'rs', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Birth Certificate',  title: "Robert's Birth Certificate",
            dateLabel: 'Issued', date: 'Jul 15, 1950',
            fields: [
                { label: 'Country of Issue',  value: 'United Kingdom' },
                { label: 'Issuing Authority', value: 'General Register Office, England & Wales' }
            ] },

        // ── John Johnson (jj) — Spouse, Executor + Beneficiary ──
        { id: 'rec-jj-edu-1',   ownerId: 'jj', cardKey: 'education',  groupTitle: 'Educational Qualifications', subcategory: 'Educational Qualification', title: "Bachelor's in Mechanical Engineering",
            fields: [
                { label: 'Education Level',         value: "Bachelor’s" },
                { label: 'Degree / Specialisation', value: 'Mechanical Engineering' },
                { label: 'Institution Name',        value: 'Imperial College London' },
                { label: 'Country',                 value: 'United Kingdom' },
                { label: 'City / Town',             value: 'London' }
            ] },
        { id: 'rec-jj-emp-1',   ownerId: 'jj', cardKey: 'employment', groupTitle: 'Employment Entries',         subcategory: 'Employment Entry',           title: 'Service Manager · BMW London',
            fields: [
                { label: 'Job Title',              value: 'Service Manager' },
                { label: 'Company / Organisation', value: 'BMW London' },
                { label: 'Country',                value: 'United Kingdom' },
                { label: 'City',                   value: 'London' }
            ] },
        { id: 'rec-jj-med-1',   ownerId: 'jj', cardKey: 'medical',    groupTitle: 'Allergies',                  subcategory: 'Allergies',                  title: 'Penicillin allergy',
            fields: [
                { label: 'Allergen', value: 'Penicillin' },
                { label: 'Severity', value: 'Severe' }
            ] },
        { id: 'rec-jj-bel-1',   ownerId: 'jj', cardKey: 'beliefs',    groupTitle: 'Beliefs',                    subcategory: 'Belief',                     title: 'Family-first values',
            fields: [
                { label: 'Belief Type',                value: 'Core Values' },
                { label: 'Affiliation / Description',  value: 'Family-first, integrity, hard work' },
                { label: 'Level of Observance',        value: 'Practicing' }
            ] },

        // ── Emma Johnson (em) — Daughter, Beneficiary, Living, age 21 ──
        { id: 'rec-em-edu-1',   ownerId: 'em', cardKey: 'education',  groupTitle: 'Educational Qualifications', subcategory: 'Educational Qualification', title: "Bachelor's in Computer Science (in progress)",
            fields: [
                { label: 'Education Level',         value: "Bachelor’s" },
                { label: 'Degree / Specialisation', value: 'Computer Science' },
                { label: 'Institution Name',        value: 'University of Cambridge' },
                { label: 'Country',                 value: 'United Kingdom' },
                { label: 'City / Town',             value: 'Cambridge' }
            ] },
        { id: 'rec-em-emp-1',   ownerId: 'em', cardKey: 'employment', groupTitle: 'Employment Entries',         subcategory: 'Employment Entry',           title: 'Part-time barista · Costa Coffee',
            fields: [
                { label: 'Job Title',              value: 'Barista (part-time)' },
                { label: 'Company / Organisation', value: 'Costa Coffee' },
                { label: 'Country',                value: 'United Kingdom' },
                { label: 'City',                   value: 'Cambridge' }
            ] },
        { id: 'rec-em-bel-1',   ownerId: 'em', cardKey: 'beliefs',    groupTitle: 'Hobbies',                    subcategory: 'Hobby',                      title: 'Photography',
            fields: [
                { label: 'Hobby Name',  value: 'Photography' },
                { label: 'Skill Level', value: 'Intermediate' },
                { label: 'Details',     value: 'Film + digital landscape photography' }
            ] },

        // ── Liam Johnson (li) — Son, Beneficiary, Minor (17) ──
        { id: 'rec-li-edu-1',   ownerId: 'li', cardKey: 'education',  groupTitle: 'Educational Qualifications', subcategory: 'Educational Qualification', title: 'A-Levels at St. Paul’s School',
            fields: [
                { label: 'Education Level',  value: 'Secondary school' },
                { label: 'Institution Name', value: "St. Paul’s School" },
                { label: 'Country',          value: 'United Kingdom' },
                { label: 'City / Town',      value: 'London' }
            ] },

        // ── Lisa Johnson (ls) — Daughter, Beneficiary, Minor (14) ──
        { id: 'rec-ls-edu-1',   ownerId: 'ls', cardKey: 'education',  groupTitle: 'Educational Qualifications', subcategory: 'Educational Qualification', title: 'Secondary school · Highgate School',
            fields: [
                { label: 'Education Level',  value: 'Secondary school' },
                { label: 'Institution Name', value: 'Highgate School' },
                { label: 'Country',          value: 'United Kingdom' },
                { label: 'City / Town',      value: 'London' }
            ] },
        { id: 'rec-ls-med-1',   ownerId: 'ls', cardKey: 'medical',    groupTitle: 'Allergies',                  subcategory: 'Allergies',                  title: 'Tree nut allergy',
            fields: [
                { label: 'Allergen', value: 'Tree nuts' },
                { label: 'Severity', value: 'Moderate' }
            ] },

        // ── Noah Johnson (no) — Son, Beneficiary, Minor (10) ──
        { id: 'rec-no-med-1',   ownerId: 'no', cardKey: 'medical',    groupTitle: 'Allergies',                  subcategory: 'Allergies',                  title: 'Peanut allergy',
            fields: [
                { label: 'Allergen', value: 'Peanuts' },
                { label: 'Severity', value: 'Severe' }
            ] },
        { id: 'rec-no-edu-1',   ownerId: 'no', cardKey: 'education',  groupTitle: 'Educational Qualifications', subcategory: 'Educational Qualification', title: 'Primary school · Holland Park',
            fields: [
                { label: 'Education Level',  value: 'Primary school' },
                { label: 'Institution Name', value: 'Holland Park Primary School' },
                { label: 'Country',          value: 'United Kingdom' },
                { label: 'City / Town',      value: 'London' }
            ] },

        // ── Mary Smith (ms) — Mother, Backup Executor + Beneficiary, age 76 ──
        { id: 'rec-ms-cond-1',  ownerId: 'ms', cardKey: 'medical',    groupTitle: 'Medical Conditions',         subcategory: 'Medical Conditions',         title: 'Hypertension',
            fields: [
                { label: 'Condition',   value: 'Hypertension' },
                { label: 'Medications', value: 'Lisinopril · Once daily · 10 mg' }
            ] },
        { id: 'rec-ms-cond-2',  ownerId: 'ms', cardKey: 'medical',    groupTitle: 'Medical Conditions',         subcategory: 'Medical Conditions',         title: 'Hypothyroidism',
            fields: [
                { label: 'Condition',   value: 'Hypothyroidism' },
                { label: 'Medications', value: 'Levothyroxine · Once daily · 50 mcg' }
            ] },
        { id: 'rec-ms-bel-1',   ownerId: 'ms', cardKey: 'beliefs',    groupTitle: 'Beliefs',                    subcategory: 'Belief',                     title: 'Anglican Christianity',
            fields: [
                { label: 'Belief Type',                value: 'Spiritual / Religious Affiliation' },
                { label: 'Affiliation / Description',  value: 'Anglican Church of England' },
                { label: 'Level of Observance',        value: 'Practicing' }
            ] },

        // ── Robert Smith (rs) — Father, Backup Executor + Beneficiary, age 78 ──
        { id: 'rec-rs-emp-1',   ownerId: 'rs', cardKey: 'employment', groupTitle: 'Employment Entries',         subcategory: 'Employment Entry',           title: 'Retired Civil Engineer',
            fields: [
                { label: 'Job Title',              value: 'Civil Engineer (retired)' },
                { label: 'Company / Organisation', value: 'Smith Engineering Ltd.' },
                { label: 'Country',                value: 'United Kingdom' },
                { label: 'City',                   value: 'Brighton' }
            ] },
        { id: 'rec-rs-cond-1',  ownerId: 'rs', cardKey: 'medical',    groupTitle: 'Medical Conditions',         subcategory: 'Medical Conditions',         title: 'Coronary artery disease',
            fields: [
                { label: 'Condition',   value: 'Coronary artery disease' },
                { label: 'Medications', value: 'Aspirin · Once daily · 75 mg, Atorvastatin · Once daily · 40 mg' }
            ] },

        // ── Jack Daniel (jd) — Ex-husband ──
        { id: 'rec-jd-emp-1',   ownerId: 'jd', cardKey: 'employment', groupTitle: 'Employment Entries',         subcategory: 'Employment Entry',           title: 'Independent Marketing Consultant',
            fields: [
                { label: 'Job Title',              value: 'Marketing Consultant' },
                { label: 'Company / Organisation', value: 'Self-employed' },
                { label: 'Country',                value: 'United Kingdom' },
                { label: 'City',                   value: 'Manchester' }
            ] },

        // ── Jane Doe Smith (jds) — Maternal Grandmother, Deceased 2000 ──
        { id: 'rec-jds-edu-1',  ownerId: 'jds',cardKey: 'education',  groupTitle: 'Educational Qualifications', subcategory: 'Educational Qualification', title: 'Teacher Training Diploma',
            fields: [
                { label: 'Education Level',         value: 'Other' },
                { label: 'Degree / Specialisation', value: 'Primary School Teaching' },
                { label: 'Institution Name',        value: 'Brighton College of Education' },
                { label: 'Country',                 value: 'United Kingdom' },
                { label: 'City / Town',             value: 'Brighton' }
            ] },
        { id: 'rec-jds-emp-1',  ownerId: 'jds',cardKey: 'employment', groupTitle: 'Employment Entries',         subcategory: 'Employment Entry',           title: 'Primary School Teacher (1955–1985)',
            fields: [
                { label: 'Job Title',              value: 'Primary School Teacher' },
                { label: 'Company / Organisation', value: 'Brighton Primary School' },
                { label: 'Country',                value: 'United Kingdom' },
                { label: 'City',                   value: 'Brighton' }
            ] },

        // ── John Smith (jsm) — Maternal Grandfather, Deceased 1998 ──
        { id: 'rec-jsm-emp-1',  ownerId: 'jsm',cardKey: 'employment', groupTitle: 'Employment Entries',         subcategory: 'Employment Entry',           title: 'Royal Navy · Lieutenant (retired)',
            fields: [
                { label: 'Job Title',              value: 'Lieutenant (Royal Navy, retired)' },
                { label: 'Company / Organisation', value: 'Royal Navy' },
                { label: 'Country',                value: 'United Kingdom' },
                { label: 'City',                   value: 'Portsmouth' }
            ] },

        // ── Ben White (bw) — Paternal Grandfather, Deceased 2007 ──
        { id: 'rec-bw-bel-1',   ownerId: 'bw', cardKey: 'beliefs',    groupTitle: 'Traditions',                 subcategory: 'Belief',                     title: 'Sunday family lunch tradition',
            fields: [
                { label: 'Belief Type',                value: 'Traditions' },
                { label: 'Affiliation / Description',  value: 'Hosted weekly Sunday family lunch for over 40 years.' },
                { label: 'Level of Observance',        value: 'Practicing' }
            ] },
        { id: 'rec-bw-emp-1',   ownerId: 'bw', cardKey: 'employment', groupTitle: 'Employment Entries',         subcategory: 'Employment Entry',           title: 'Carpenter (1947–1992)',
            fields: [
                { label: 'Job Title',              value: 'Master Carpenter' },
                { label: 'Company / Organisation', value: 'White & Sons Carpentry' },
                { label: 'Country',                value: 'United Kingdom' },
                { label: 'City',                   value: 'Brighton' }
            ] },

        // ── Dr. Emily White (drwhite) — Primary Executor, Network ──
        { id: 'rec-drw-edu-1',  ownerId: 'drwhite', cardKey: 'education',  groupTitle: 'Educational Qualifications', subcategory: 'Educational Qualification', title: 'PhD in Estate Law',
            fields: [
                { label: 'Education Level',         value: 'PhD/Doctorate' },
                { label: 'Degree / Specialisation', value: 'Estate & Succession Law' },
                { label: 'Institution Name',        value: 'University of Oxford' },
                { label: 'Country',                 value: 'United Kingdom' },
                { label: 'City / Town',             value: 'Oxford' }
            ] },
        { id: 'rec-drw-emp-1',  ownerId: 'drwhite', cardKey: 'employment', groupTitle: 'Employment Entries',         subcategory: 'Employment Entry',           title: 'Senior Partner · White & Associates',
            fields: [
                { label: 'Job Title',              value: 'Senior Partner' },
                { label: 'Company / Organisation', value: 'White & Associates Estate Solicitors' },
                { label: 'Country',                value: 'United Kingdom' },
                { label: 'City',                   value: 'London' }
            ] },
        { id: 'rec-drw-mem-1',  ownerId: 'drwhite', cardKey: 'employment', groupTitle: 'Memberships & Affiliations', subcategory: 'Membership / Affiliation',   title: 'Law Society of England & Wales',
            fields: [
                { label: 'Organisation Name', value: 'Law Society of England & Wales' },
                { label: 'Organisation Type', value: 'Professional' },
                { label: 'Role / Position',   value: 'Member' },
                { label: 'Membership ID',     value: 'LSO-2002-7841' }
            ] },

        // ── Attorney Mark Davis (mdavis) — Lawyer / Contributor, Network ──
        { id: 'rec-md-edu-1',   ownerId: 'mdavis', cardKey: 'education',  groupTitle: 'Educational Qualifications', subcategory: 'Educational Qualification', title: 'Master of Laws (LL.M.)',
            fields: [
                { label: 'Education Level',         value: "Master’s" },
                { label: 'Degree / Specialisation', value: 'Estate Planning' },
                { label: 'Institution Name',        value: 'King’s College London' },
                { label: 'Country',                 value: 'United Kingdom' },
                { label: 'City / Town',             value: 'London' }
            ] },
        { id: 'rec-md-mem-1',   ownerId: 'mdavis', cardKey: 'employment', groupTitle: 'Memberships & Affiliations', subcategory: 'Membership / Affiliation',   title: 'Solicitors Regulation Authority (SRA)',
            fields: [
                { label: 'Organisation Name', value: 'Solicitors Regulation Authority' },
                { label: 'Organisation Type', value: 'Professional' },
                { label: 'Role / Position',   value: 'Member' },
                { label: 'Membership ID',     value: 'SRA-554823' }
            ] },

        // ── Liam (extra hobby) ──
        { id: 'rec-li-bel-1', ownerId: 'li', cardKey: 'beliefs', groupTitle: 'Hobbies', subcategory: 'Hobby', title: 'Football (Arsenal supporter, school team)',
            fields: [
                { label: 'Hobby Name',  value: 'Football' },
                { label: 'Skill Level', value: 'Advanced' },
                { label: 'Details',     value: 'Plays for St. Paul\'s 1st XI; lifelong Arsenal supporter' }
            ] },

        // ── Lisa (extra hobby) ──
        { id: 'rec-ls-bel-1', ownerId: 'ls', cardKey: 'beliefs', groupTitle: 'Hobbies', subcategory: 'Hobby', title: 'Ballet',
            fields: [
                { label: 'Hobby Name',  value: 'Ballet' },
                { label: 'Skill Level', value: 'Intermediate' },
                { label: 'Details',     value: 'Royal Academy of Dance Grade 5; classes since age 5' }
            ] },

        // ── Noah (extra hobby) ──
        { id: 'rec-no-bel-1', ownerId: 'no', cardKey: 'beliefs', groupTitle: 'Hobbies', subcategory: 'Hobby', title: 'Lego building',
            fields: [
                { label: 'Hobby Name',  value: 'Lego' },
                { label: 'Skill Level', value: 'Intermediate' },
                { label: 'Details',     value: 'Loves Star Wars and Technic sets; building daily' }
            ] },

        // ── Jack Daniel (extra education) ──
        { id: 'rec-jd-edu-1', ownerId: 'jd', cardKey: 'education', groupTitle: 'Educational Qualifications', subcategory: 'Educational Qualification', title: "Bachelor's in Marketing",
            fields: [
                { label: 'Education Level',         value: "Bachelor’s" },
                { label: 'Degree / Specialisation', value: 'Marketing' },
                { label: 'Institution Name',        value: 'University of Manchester' },
                { label: 'Country',                 value: 'United Kingdom' },
                { label: 'City / Town',             value: 'Manchester' }
            ] },

        // ── John Smith (extra — Marriage Certificate to Jane) ──
        { id: 'rec-jsm-essential-marriage', ownerId: 'jsm', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Marriage Certificate', title: 'Marriage Certificate — John Smith & Jane Doe',
            linkedContactIds: ['jds'],
            fields: [{ label: 'Country of Issue', value: 'United Kingdom' }],
            notes: 'Married 1948 (post-WWII). Filed at Brighton civil registry.' },

        // ── Mary (extra — recent vaccination renewal task) ──
        { id: 'rec-ms-med-1', ownerId: 'ms', cardKey: 'medical', groupTitle: 'Medications & Supplements', subcategory: 'Medications & Supplements', title: 'Vitamin D3 daily supplement',
            fields: [
                { label: 'Medication / Supplement', value: 'Vitamin D3' },
                { label: 'Intake',                  value: 'Once daily' },
                { label: 'Dosage',                  value: '1000 IU' },
                { label: 'Purpose / Reason',        value: 'Bone health (post-menopausal)' }
            ] },

        // ── Robert (extra — daily aspirin) ──
        { id: 'rec-rs-med-1', ownerId: 'rs', cardKey: 'medical', groupTitle: 'Medications & Supplements', subcategory: 'Medications & Supplements', title: 'Aspirin (daily, preventive)',
            fields: [
                { label: 'Medication / Supplement', value: 'Aspirin (daily, preventive)' },
                { label: 'Intake',                  value: 'Once daily' },
                { label: 'Dosage',                  value: '75 mg' },
                { label: 'Purpose / Reason',        value: 'Heart attack / stroke prevention' }
            ] },

        // ── Enzo (Pet) — vaccinations, microchip, food (3 entries) ──
        { id: 'rec-enzo-med-1', ownerId: 'enzo', cardKey: 'medical', groupTitle: 'Medical Conditions', subcategory: 'Medical Conditions', title: 'Annual rabies vaccination (current)',
            fields: [
                { label: 'Condition',   value: 'Rabies vaccination' },
                { label: 'Medications', value: 'Last booster: Mar 2026; next due Mar 2027' }
            ],
            notes: 'Done at London Veterinary Clinic. Certificate stored at home + cloud backup.' },

        { id: 'rec-enzo-essential-1', ownerId: 'enzo', cardKey: 'essential', groupTitle: 'Identity & Vital Documents', subcategory: 'Pet Microchip Certificate', title: 'Microchip Registration Certificate',
            fields: [
                { label: 'Microchip ID', value: '985112004567890' },
                { label: 'Registry',     value: 'Petlog UK' }
            ],
            notes: 'Registered with Petlog UK. Up to date contact info: Sarah + Mary as backup.' },

        { id: 'rec-enzo-med-2', ownerId: 'enzo', cardKey: 'medical', groupTitle: 'Medical Conditions', subcategory: 'Medical Conditions', title: 'Hip dysplasia (under monitoring)',
            fields: [
                { label: 'Condition',   value: 'Hip dysplasia (mild)' },
                { label: 'Medications', value: 'Glucosamine 500mg + Omega-3, daily; physiotherapy 2×/week' }
            ],
            notes: 'Diagnosed 2024. Vet recommends weight management + low-impact exercise.' },

        // ─────────────────────────────────────────────────────────────────
        // Sarah-owned cross-record entries REMOVED 2026-05-12 per Violetka.
        // The Plan Owner's 3 canonical essential entries (Passport / DL /
        // Birth Certificate) live in entriesStore.js — this seed file is
        // for entries that BELONG to other people (rec-jj-*, rec-em-*, ...).
        // ─────────────────────────────────────────────────────────────────
    ];

    function seedSampleEntries() {
        if (!Array.isArray(window.entriesStore)) return;

        // ── One-time migration: drop legacy sample-* entries (mismatched labels)
        // AND drop all Sarah-owned cross-record seed entries (rec-sj-*) per
        // Violetka 2026-05-12 — Sarah's canonical essentials are seeded by
        // entriesStore.js only; the seeded marriage/birth/death certificates
        // for relatives were noise and have been removed.
        let removed = 0;
        for (let i = window.entriesStore.length - 1; i >= 0; i--) {
            const e = window.entriesStore[i];
            if (!e || typeof e.id !== 'string') continue;
            if (e.id.indexOf('sample-') === 0 || e.id.indexOf('rec-sj-') === 0) {
                window.entriesStore.splice(i, 1);
                removed++;
            }
        }
        if (removed > 0) {
            console.log('[people-records-seed] removed', removed, 'legacy / sj-cross-record entries');
            // Persist the cleaned store so the localStorage cache is updated too.
            if (typeof window.paAutoSave === 'function') window.paAutoSave();
        }

        let added = 0;
        SAMPLES.forEach(function(s) {
            // Skip if id already in store (preserved from localStorage)
            if (window.entriesStore.some(e => e.id === s.id)) return;
            window.entriesStore.push(Object.assign({
                hasFile: false,
                hasLocation: false,
                relatedTo: [],
                linkedContactIds: [],
                category: s.subcategory,    // _shared.js sometimes reads .category
                fields: []
            }, s));
            added++;
        });
        if (added > 0 || removed > 0) {
            console.log('[people-records-seed] seeded', added, 'realistic entries with canonical labels');
            if (typeof window.paAutoSave === 'function') window.paAutoSave();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(seedSampleEntries, 100);
        });
    } else {
        setTimeout(seedSampleEntries, 100);
    }
})();
