// SSOT for all entries across all records.
// Documents tab, Vault, and linked-person cards all read from this.
// Auto-extracted from profile.html on 2026-04-28 (Sarah Johnson, Plan Owner — 20 entries)
// Enriched 2026-05-11 with canonical fields/timeline/notes + relatedTo links per print docs.

window.entriesStore = window.entriesStore || [
  // ── ESSENTIAL INFO — Identity & Vital Documents ─────────────────────────
  // Per Violetka 2026-05-11: only these 3 entries exist in Sarah's Essential
  // Info. Titles, dates, file/location flags and linked records match the
  // screenshot 1:1. John (jj) is linked ONLY on the Passport.
  {
    "id": "us-passport-sarah-johnson",
    "ownerId": "sj",
    "title": "US Passport - Sarah Johnson",
    "subcategory": "Passport",
    "cardKey": "essential",
    "groupTitle": "Identity & Vital Documents",
    "dateLabel": "Expiry Date",
    "date": "Oct 14, 2028",
    "expiry": "Oct 14, 2028",
    "hasFile": true,
    "hasLocation": true,
    "location": "Home Safe",
    "locationDetails": "Bedroom safe, top drawer — folder labeled “IDs & Passports”.",
    "files": [
      {
        "name": "us_passport_sarah_johnson.pdf",
        "type": "PDF",
        "size": "1.2 MB",
        "uploaded": "Oct 16, 2018",
        "previewUrl": "img/preview-passport.png"
      }
    ],
    "fields": [
      { "label": "Country of Issue", "value": "United States", "required": true },
      { "label": "Passport Number", "value": "569123456", "required": true },
      { "label": "Issuing Authority", "value": "U.S. Department of State — Passport Services" }
    ],
    "timeline": [
      { "label": "Issue Date", "year": "2018", "month": "October", "day": "15",
        "notes": "Renewed at U.S. Embassy London — standard 10-year adult passport." },
      { "label": "Expiry Date", "year": "2028", "month": "October", "day": "14",
        "notes": "Start renewal 6 months early (Apr 2028) — takes 8–12 weeks." }
    ],
    "notes": "Primary travel document. Schengen visa-free up to 90 days. Always carry a photocopy when abroad — kept separate from the original.",
    "relatedTo": ["jj"]
  },
  {
    "id": "my-driver-s-license",
    "ownerId": "sj",
    "title": "My Driver’s License",
    "subcategory": "Driver’s License",
    "cardKey": "essential",
    "groupTitle": "Identity & Vital Documents",
    "dateLabel": "Expiry Date",
    "date": "Jan 26, 2030",
    "expiry": "Jan 26, 2030",
    "hasFile": true,
    "hasLocation": false,
    "location": "",
    "locationDetails": "",
    "files": [
      {
        "name": "uk_driving_licence_sarah_johnson.pdf",
        "type": "PDF",
        "size": "850 KB",
        "uploaded": "Jan 27, 2020",
        "previewUrl": "img/preview-driver-license.png"
      }
    ],
    "fields": [
      { "label": "Country of Issue", "value": "United Kingdom", "required": true },
      { "label": "Licence Number", "value": "JOHNS801227SJ9AB", "required": true },
      { "label": "Categories", "value": "AM, A, B, B1, BE" },
      { "label": "Issuing Authority", "value": "DVLA — Driver and Vehicle Licensing Agency, Swansea" }
    ],
    "timeline": [
      { "label": "Issue Date", "year": "2020", "month": "January", "day": "26",
        "notes": "Full transfer from US license after moving to the UK." },
      { "label": "Expiry Date", "year": "2030", "month": "January", "day": "26",
        "notes": "Photocard renewal every 10 years (aligned to birthday)." }
    ],
    "notes": "Photocard licence. Carry when driving in the UK and EU. International Driving Permit (1968 Convention) recommended for non-EU trips.",
    "relatedTo": []
  },
  {
    "id": "my-birth-certificate",
    "ownerId": "sj",
    "title": "My Birth Certificate",
    "subcategory": "Birth Certificate",
    "cardKey": "essential",
    "groupTitle": "Identity & Vital Documents",
    "dateLabel": "Updated",
    "date": "Dec 30, 2024",
    "dateUpdated": "2024-12-30T12:00:00.000Z",
    "updatedBy": "You",
    "expiry": "",
    "hasFile": false,
    "hasLocation": true,
    "location": "Lawyer’s Office",
    "locationDetails": "Original certified copy held by Davis & Co. Solicitors, 14 Lincoln’s Inn Fields, London — estate planning file #SJ-2024-007.",
    "files": [],
    "fields": [
      { "label": "Country of Issue", "value": "United States", "required": true },
      { "label": "Certificate Number", "value": "NYC-1980-072245" },
      { "label": "Issuing Authority", "value": "NYC Department of Health and Mental Hygiene — Office of Vital Records" }
    ],
    "timeline": [
      { "label": "Date of Birth", "year": "1980", "month": "July", "day": "22",
        "notes": "Mount Sinai Hospital, Manhattan, New York City." },
      { "label": "Issue Date", "year": "1980", "month": "August", "day": "5",
        "notes": "Long-form certified copy issued shortly after birth registration." }
    ],
    "notes": "Long-form (not short certificate of birth). Required for US passport renewal, marriage certificate, UK indefinite-leave applications, and dual-citizenship documentation. Original is at the lawyer's office — no digital scan yet.",
    "relatedTo": []
  },

  // ── FAMILY DOCS — Marriage / Divorce / Prenup ──────────────────────────
  {
    "id": "marriage-certificate-john",
    "ownerId": "sj",
    "title": "Marriage Certificate – John",
    "subcategory": "Marriage Certificate",
    "cardKey": "family",
    "groupTitle": "Family Documents",
    "dateLabel": "Issued",
    "date": "Jun 12, 2010",
    "expiry": "",
    "hasFile": true,
    "hasLocation": true,
    "location": "Lawyer’s Office",
    "locationDetails": "Certified copy held by Davis & Co. Solicitors — estate planning file #SJ-2024-007.",
    "files": [
      { "name": "marriage_cert_johnson_johnson.pdf", "type": "PDF", "uploaded": "Jun 18, 2010" }
    ],
    "fields": [
      { "label": "Spouse Name", "value": "John Johnson", "required": true },
      { "label": "Country of Issue", "value": "United Kingdom", "required": true },
      { "label": "Place of Marriage", "value": "Marylebone Town Hall, London" },
      { "label": "Certificate Number", "value": "UK-MAR-2010-019442" },
      { "label": "Issuing Authority", "value": "General Register Office, England & Wales" }
    ],
    "timeline": [
      { "label": "Marriage Date", "year": "2010", "month": "June", "day": "12",
        "notes": "Civil ceremony at Marylebone Town Hall; reception at The Savoy." },
      { "label": "Issue Date", "year": "2010", "month": "June", "day": "12",
        "notes": "Certified copy issued same day." }
    ],
    "notes": "Required for: dependent visa applications, joint property documents, pension nominations, beneficiary changes. Mark Davis (Attorney) holds certified copy.",
    "relatedTo": ["jj"]
  },
  {
    "id": "divorce-papers-jack",
    "ownerId": "sj",
    "title": "Divorce Papers – Jack",
    "subcategory": "Divorce Papers",
    "cardKey": "family",
    "groupTitle": "Family Documents",
    "dateLabel": "Issued",
    "date": "Mar 8, 2008",
    "expiry": "",
    "hasFile": true,
    "hasLocation": true,
    "location": "Lawyer’s Office",
    "locationDetails": "Original decree absolute held by Davis & Co. Solicitors — historical file #SJ-2008-DIV.",
    "files": [
      { "name": "decree_absolute_johnson_doe.pdf", "type": "PDF", "uploaded": "Mar 10, 2008" }
    ],
    "fields": [
      { "label": "Former Spouse", "value": "Jack Doe", "required": true },
      { "label": "Country of Issue", "value": "United States", "required": true },
      { "label": "Case Number", "value": "NY-2007-FAM-44218" },
      { "label": "Issuing Court", "value": "New York County Supreme Court — Matrimonial Division" }
    ],
    "timeline": [
      { "label": "Filing Date", "year": "2007", "month": "September", "day": "14",
        "notes": "No-fault divorce, mutually agreed." },
      { "label": "Decree Absolute", "year": "2008", "month": "March", "day": "8",
        "notes": "Final decree issued — marital settlement agreement attached." }
    ],
    "notes": "Decree absolute terminates first marriage. Required as supporting document for second marriage to John Johnson (2010). Settlement agreement specifies no ongoing financial obligations.",
    "relatedTo": ["jd"]
  },
  {
    "id": "prenuptial-agreement-john",
    "ownerId": "sj",
    "title": "Prenuptial Agreement – John",
    "subcategory": "Prenuptial Agreement",
    "cardKey": "family",
    "groupTitle": "Family Documents",
    "dateLabel": "Signed",
    "date": "May 28, 2010",
    "expiry": "",
    "hasFile": true,
    "hasLocation": true,
    "location": "Lawyer’s Office",
    "locationDetails": "Signed originals held by Davis & Co. Solicitors — estate planning file #SJ-2024-007.",
    "files": [
      { "name": "prenup_johnson_johnson_signed.pdf", "type": "PDF", "uploaded": "May 28, 2010" }
    ],
    "fields": [
      { "label": "Other Party", "value": "John Johnson", "required": true },
      { "label": "Country of Jurisdiction", "value": "United Kingdom", "required": true },
      { "label": "Notarised By", "value": "Mark Davis, Davis & Co. Solicitors" },
      { "label": "Type", "value": "Pre-marital separation of assets" }
    ],
    "timeline": [
      { "label": "Date Signed", "year": "2010", "month": "May", "day": "28",
        "notes": "Signed in presence of both parties’ solicitors and notary." },
      { "label": "Effective Date", "year": "2010", "month": "June", "day": "12",
        "notes": "Took effect on marriage day." }
    ],
    "notes": "Defines separation of pre-marital assets. Company shares (Johnson & Johnson) ringfenced as Sarah’s separate property. Joint property thereafter held in equal share. Mark Davis advised both parties.",
    "relatedTo": ["jj", "mdavis"]
  },

  // ── MEDICAL ─────────────────────────────────────────────────────────────
  {
    "id": "ab",
    "ownerId": "sj",
    "title": "AB+",
    "subcategory": "Blood Type",
    "cardKey": "medical",
    "groupTitle": "Blood Type",
    "expiry": "",
    "hasFile": true,
    "hasLocation": true,
    "location": "Doctor’s Office",
    "locationDetails": "On file with Dr. Gregory House — NYU Langone Internal Medicine.",
    "files": [
      { "name": "blood_type_card_AB_positive.pdf", "type": "PDF", "uploaded": "Nov 14, 2024" }
    ],
    "fields": [
      { "label": "Blood Type", "value": "AB+", "required": true }
    ],
    "timeline": [
      { "label": "Recorded On", "year": "2024", "month": "November", "day": "12",
        "notes": "Confirmed at annual checkup with Dr. House." }
    ],
    "notes": "Universal plasma donor; rare blood type. Mark Davis (Attorney) and John Johnson (Husband) aware in case of emergency.",
    "relatedTo": ["ghouse"]
  },
  {
    "id": "peanuts",
    "ownerId": "sj",
    "title": "Peanuts",
    "subcategory": "Allergy",
    "cardKey": "medical",
    "groupTitle": "Allergies",
    "expiry": "",
    "hasFile": false,
    "hasLocation": true,
    "location": "Handbag",
    "locationDetails": "EpiPen kept in handbag (always), kitchen cabinet, office desk, and car glove compartment.",
    "fields": [
      { "label": "Allergen", "value": "Peanuts", "required": true },
      { "label": "Severity", "value": "Severe", "required": true },
      { "label": "Reaction", "value": "Anaphylaxis — respiratory distress within 5 min", "required": false }
    ],
    "timeline": [
      { "label": "Diagnosis Date", "year": "2008", "month": "May", "day": "14",
        "notes": "Anaphylactic reaction at restaurant; carries EpiPen at all times since." }
    ],
    "notes": "CRITICAL — anaphylactic risk. EpiPen kept in handbag (always), kitchen cabinet, office desk, and car glove compartment. Children Emma and Liam trained on injection. John (husband) and Dr. House aware.",
    "relatedTo": ["ghouse", "jj"]
  },
  {
    "id": "milk",
    "ownerId": "sj",
    "title": "Milk",
    "subcategory": "Allergy",
    "cardKey": "medical",
    "groupTitle": "Allergies",
    "expiry": "",
    "hasFile": true,
    "hasLocation": false,
    "files": [
      { "name": "lactose_intolerance_panel_2012.pdf", "type": "PDF", "uploaded": "Mar 10, 2012" }
    ],
    "fields": [
      { "label": "Allergen", "value": "Milk", "required": true },
      { "label": "Severity", "value": "Mild", "required": true },
      { "label": "Reaction", "value": "Bloating and discomfort with large quantities", "required": false }
    ],
    "timeline": [
      { "label": "Diagnosis Date", "year": "2012", "month": "March", "day": "3",
        "notes": "Mild lactose intolerance confirmed by hydrogen breath test." }
    ],
    "notes": "Mild — uncomfortable bloating with large quantities. Lactose-free alternatives preferred.",
    "relatedTo": ["ghouse"]
  },
  {
    "id": "asthma",
    "ownerId": "sj",
    "title": "Asthma",
    "subcategory": "Medical Condition",
    "cardKey": "medical",
    "groupTitle": "Medical Conditions",
    "expiry": "",
    "hasFile": true,
    "hasLocation": true,
    "location": "Handbag",
    "locationDetails": "Albuterol rescue inhaler in handbag; Symbicort maintenance kept at home.",
    "files": [
      { "name": "asthma_action_plan_dr_house.pdf", "type": "PDF", "uploaded": "Sep 22, 2024" }
    ],
    "fields": [
      { "label": "Condition", "value": "Asthma", "required": true },
      { "label": "Status", "value": "Ongoing", "required": false },
      { "label": "Medications", "value": "Albuterol inhaler (rescue) + Symbicort (maintenance)", "required": false }
    ],
    "timeline": [
      { "label": "Diagnosis Date", "year": "1995", "month": "September", "day": "20",
        "notes": "Diagnosed during teenage years." }
    ],
    "notes": "Triggers: cold air, exercise, dust. Carries Albuterol inhaler. Annual pulmonary review with Dr. House.",
    "relatedTo": ["ghouse"]
  },
  {
    "id": "epilepsy",
    "ownerId": "sj",
    "title": "Epilepsy",
    "subcategory": "Medical Condition",
    "cardKey": "medical",
    "groupTitle": "Medical Conditions",
    "expiry": "",
    "hasFile": false,
    "hasLocation": true,
    "location": "Doctor’s Office",
    "locationDetails": "Full neurology workup and seizure history on file with Dr. House.",
    "fields": [
      { "label": "Condition", "value": "Epilepsy", "required": true },
      { "label": "Status", "value": "Ongoing", "required": false },
      { "label": "Medications", "value": "Levetiracetam (Keppra) 500mg twice daily", "required": false }
    ],
    "timeline": [
      { "label": "Diagnosis Date", "year": "2018", "month": "June", "day": "7",
        "notes": "Diagnosed after first seizure; neurology workup at NYU." }
    ],
    "notes": "Seizure-controlled on Levetiracetam since 2018. Annual neurological review with Dr. House. John (husband) trained on seizure first-aid protocol. Children aware.",
    "relatedTo": ["ghouse"]
  },
  {
    "id": "pacemaker-icd",
    "ownerId": "sj",
    "title": "Pacemaker/ICD",
    "subcategory": "Medical Device",
    "cardKey": "medical",
    "groupTitle": "Medical Devices & Implants",
    "expiry": "",
    "hasFile": true,
    "hasLocation": true,
    "location": "Body",
    "locationDetails": "Implanted left upper chest, subcutaneous. Device card carried in wallet.",
    "files": [
      { "name": "icd_implant_card_medtronic.pdf", "type": "PDF", "uploaded": "Aug 16, 2022" }
    ],
    "fields": [
      { "label": "Device Type", "value": "Pacemaker/ICD", "required": true },
      { "label": "Location on Body", "value": "Left upper chest (subcutaneous)", "required": false },
      { "label": "Manufacturer", "value": "Medtronic Visia AF MRI", "required": false },
      { "label": "Serial Number", "value": "MDT-VAF-2022-44781", "required": false }
    ],
    "timeline": [
      { "label": "Implantation Date", "year": "2022", "month": "August", "day": "15",
        "notes": "Implanted at NYU Langone Cardiology by Dr. Emily White." },
      { "label": "Battery Replacement Due", "year": "2030", "month": "August", "day": "15",
        "notes": "Typical battery life 7-10 years; routine replacement." }
    ],
    "notes": "MRI-compatible up to 1.5T. Must inform any medical professional before scans. Routine cardiology follow-up every 6 months with Dr. House. Magnetic shielding required at airport security.",
    "relatedTo": ["ghouse", "drwhite"]
  },

  // ── EDUCATION ───────────────────────────────────────────────────────────
  {
    "id": "harvard-university",
    "ownerId": "sj",
    "title": "Harvard University",
    "subcategory": "Educational Qualification",
    "cardKey": "education",
    "groupTitle": "Educational Qualifications",
    "expiry": "",
    "hasFile": true,
    "hasLocation": true,
    "location": "Home Safe",
    "locationDetails": "Original diploma in bedroom safe; certified transcript with Davis & Co. Solicitors.",
    "files": [
      { "name": "harvard_diploma_2002.pdf", "type": "PDF", "uploaded": "May 26, 2002" }
    ],
    "fields": [
      { "label": "Education Level", "value": "Bachelor's", "required": true },
      { "label": "Degree / Specialisation", "value": "Computer Science", "required": false },
      { "label": "Institution Name", "value": "Harvard University", "required": true },
      { "label": "Country", "value": "United States", "required": false },
      { "label": "City / Town", "value": "Cambridge, MA", "required": false }
    ],
    "timeline": [
      { "label": "Start Date", "year": "1998", "month": "September", "day": "1",
        "notes": "Entered Harvard at 18 — full-tuition merit scholarship." },
      { "label": "Graduation Date", "year": "2002", "month": "May", "day": "24",
        "notes": "Bachelor's with Honors in Computer Science." }
    ],
    "notes": "Cum Laude graduate. Thesis on early machine learning applications. Parents Mary and Robert attended graduation.",
    "relatedTo": ["ms", "rs"]
  },
  {
    "id": "graphic-design",
    "ownerId": "sj",
    "title": "Graphic Design",
    "subcategory": "Professional Certification",
    "cardKey": "education",
    "groupTitle": "Professional Certifications",
    "expiry": "",
    "hasFile": false,
    "hasLocation": true,
    "location": "Home Office",
    "locationDetails": "Certificate framed on home office wall.",
    "fields": [
      { "label": "Certification Name", "value": "Graphic Design Foundations", "required": true },
      { "label": "Issuing Body", "value": "RCA — Royal College of Art, Short Courses", "required": true },
      { "label": "Country", "value": "United Kingdom", "required": false },
      { "label": "City / Town", "value": "London", "required": false }
    ],
    "timeline": [
      { "label": "Issue Date", "year": "2015", "month": "June", "day": "20",
        "notes": "Completed 12-week evening course at RCA." }
    ],
    "notes": "Hobby-related certification — supports design taste and product judgment at Johnson & Johnson. Non-credit, non-degree.",
    "relatedTo": []
  },
  {
    "id": "coding-bootcamp",
    "ownerId": "sj",
    "title": "Coding Bootcamp",
    "subcategory": "Other Education",
    "cardKey": "education",
    "groupTitle": "Other Education",
    "expiry": "",
    "hasFile": true,
    "hasLocation": true,
    "location": "Home Safe",
    "locationDetails": "Original certificate in bedroom safe; digital copy on laptop.",
    "files": [
      { "name": "general_assembly_full_stack_cert.pdf", "type": "PDF", "uploaded": "Sep 5, 2014" }
    ],
    "fields": [
      { "label": "Programme / Course", "value": "Full-Stack Web Development Immersive", "required": true },
      { "label": "Provider", "value": "General Assembly", "required": true },
      { "label": "Country", "value": "United Kingdom", "required": false },
      { "label": "City / Town", "value": "London", "required": false }
    ],
    "timeline": [
      { "label": "Start Date", "year": "2014", "month": "June", "day": "2",
        "notes": "Began intensive 12-week program — JS / React / Node." },
      { "label": "Completion Date", "year": "2014", "month": "August", "day": "29",
        "notes": "Graduated with capstone project; informed technical decisions at Johnson & Johnson." }
    ],
    "notes": "Refresher and modernization of CS foundation. Capstone project deployed as internal tool. Reinforced ability to oversee technical teams.",
    "relatedTo": []
  },

  // ── EMPLOYMENT ──────────────────────────────────────────────────────────
  {
    "id": "founder-ceo",
    "ownerId": "sj",
    "title": "Founder & CEO",
    "subcategory": "Employment",
    "cardKey": "employment",
    "groupTitle": "Employment Entries",
    "expiry": "",
    "hasFile": true,
    "hasLocation": true,
    "location": "Lawyer’s Office",
    "locationDetails": "Founding documents, shareholder agreement, and articles of association held by Davis & Co. Solicitors.",
    "files": [
      { "name": "johnson_johnson_articles_of_association.pdf", "type": "PDF", "uploaded": "Oct 20, 2000" }
    ],
    "fields": [
      { "label": "Job Title", "value": "Founder & CEO", "required": true },
      { "label": "Company", "value": "Johnson & Johnson", "required": true },
      { "label": "Location", "value": "London, United Kingdom", "required": false },
      { "label": "Employment Type", "value": "Full-time — Founder", "required": false }
    ],
    "timeline": [
      { "label": "Start Date", "year": "2000", "month": "October", "day": "14",
        "notes": "Founded Johnson & Johnson — UK private holding company." }
    ],
    "notes": "Active role: strategic direction, board chair, key client relationships. Day-to-day operations delegated to COO (Jane Bromley). Attorney Mark Davis handles legal matters and succession planning.",
    "relatedTo": ["mdavis"]
  },
  {
    "id": "rotary-club",
    "ownerId": "sj",
    "title": "Rotary Club",
    "subcategory": "Membership",
    "cardKey": "employment",
    "groupTitle": "Memberships & Affiliations",
    "expiry": "",
    "hasFile": false,
    "hasLocation": true,
    "location": "Home Office",
    "locationDetails": "Membership card in desk drawer; renewal receipts on file.",
    "fields": [
      { "label": "Organisation Name", "value": "Rotary Club of London Westminster", "required": true },
      { "label": "Membership ID", "value": "RC-LW-2004-117", "required": false },
      { "label": "Role/Position", "value": "Member, Past President 2018-2019", "required": false }
    ],
    "timeline": [
      { "label": "Joined", "year": "2004", "month": "November", "day": "19",
        "notes": "Joined for community service and networking." }
    ],
    "notes": "Active in fundraising for local literacy programs. Past President. Annual dues paid by company.",
    "relatedTo": []
  },

  // ── BELIEFS / HOBBIES / INTERESTS ───────────────────────────────────────
  {
    "id": "christian-catholic",
    "ownerId": "sj",
    "title": "Christian — Catholic",
    "subcategory": "Belief",
    "cardKey": "beliefs",
    "groupTitle": "Beliefs",
    "expiry": "",
    "hasFile": true,
    "hasLocation": true,
    "location": "Home Safe",
    "locationDetails": "Original baptism certificate in bedroom safe.",
    "files": [
      { "name": "baptism_certificate_sarah_1980.pdf", "type": "PDF", "uploaded": "Aug 15, 1980" }
    ],
    "fields": [
      { "label": "Belief Type", "value": "Christian — Catholic", "required": true },
      { "label": "Observance Level", "value": "Practising", "required": false },
      { "label": "Parish", "value": "Westminster Cathedral, London", "required": false }
    ],
    "timeline": [
      { "label": "Baptism Date", "year": "1980", "month": "August", "day": "15",
        "notes": "Baptised as infant at Mount Sinai Hospital chapel." }
    ],
    "notes": "Attends mass at Westminster Cathedral (London) regularly. Mother Mary is a devout Catholic; passes faith to children. Children all baptised Catholic.",
    "relatedTo": ["ms"]
  },
  {
    "id": "oil-painting",
    "ownerId": "sj",
    "title": "Oil Painting",
    "subcategory": "Hobby",
    "cardKey": "beliefs",
    "groupTitle": "Hobbies",
    "expiry": "",
    "hasFile": false,
    "hasLocation": true,
    "location": "Home Studio",
    "locationDetails": "Studio set up in garden conservatory — easel, canvases, oils, brushes.",
    "fields": [
      { "label": "Hobby", "value": "Oil Painting", "required": true },
      { "label": "Style / Focus", "value": "Landscapes and still life", "required": false },
      { "label": "Frequency", "value": "Weekly — mostly Sunday afternoons", "required": false }
    ],
    "timeline": [
      { "label": "Started", "year": "2012", "month": "January", "day": "10",
        "notes": "Began as a creative outlet after stressful product launch." }
    ],
    "notes": "Therapeutic and meditative. Several pieces gifted to family. One painting hangs in the office reception.",
    "relatedTo": []
  },
  {
    "id": "travel",
    "ownerId": "sj",
    "title": "Travel",
    "subcategory": "Interest",
    "cardKey": "beliefs",
    "groupTitle": "Interests",
    "expiry": "",
    "hasFile": true,
    "hasLocation": false,
    "files": [
      { "name": "travel_wishlist_2026.pdf", "type": "PDF", "uploaded": "Jan 1, 2026" }
    ],
    "fields": [
      { "label": "Interest", "value": "International Travel", "required": true },
      { "label": "Favourite Destinations", "value": "Italy, Japan, Greece, New Zealand", "required": false },
      { "label": "Travel Companion", "value": "John Johnson (Husband)", "required": false }
    ],
    "timeline": [
      { "label": "Honeymoon Trip", "year": "2010", "month": "July", "day": "5",
        "notes": "Three weeks in Italy and Greece with John." },
      { "label": "Family Tour Japan", "year": "2019", "month": "April", "day": "10",
        "notes": "Cherry blossom season with John, Emma, and Liam." }
    ],
    "notes": "Travels with John several times a year. Bucket list: Patagonia, Iceland, Antarctica. Travel insurance through company policy.",
    "relatedTo": ["jj"]
  }
];

// ── Helper API ──────────────────────────────────────────────────────────

// Helper: get entries owned by person + optional cardKey filter
window.getEntriesFor = function(ownerId, cardKey) {
    return (window.entriesStore || []).filter(function(e) {
        return e.ownerId === ownerId && (cardKey ? e.cardKey === cardKey : true);
    });
};

// Helper: get entries that REFERENCE this person (cross-record sync)
window.getEntriesReferencing = function(personId) {
    return (window.entriesStore || []).filter(function(e) {
        return (e.relatedTo || []).indexOf(personId) !== -1;
    });
};

// Helper: get all entries that should appear on a person's record —
// entries they OWN plus entries that REFERENCE them via relatedTo[].
// Canonical SSOT for Documents tab + record card aggregators.
window.getEntriesForRecord = function(personId) {
    return (window.entriesStore || []).filter(function(e) {
        return e.ownerId === personId
            || (e.relatedTo || []).indexOf(personId) !== -1;
    });
};

// Generate a stable, collision-resistant entry id.
window.generateEntryId = window.generateEntryId || function(prefix) {
    return (prefix || 'entry') + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
};

// Push a new entry to the SSOT and return it. Fills in id/archived/dateAdded
// defaults; callers provide ownerId, cardKey, title, fields, etc.
// Used by saveCanonicalEntry (Essential/Education/Employment/Beliefs) and
// saveAnefEntry (Medical) — never modify entriesStore directly.
window.addEntry = window.addEntry || function(partial) {
    var entry = Object.assign({
        id: window.generateEntryId(),
        archived: false,
        dateAdded: new Date().toISOString(),
        dateUpdated: new Date().toISOString(),
        relatedTo: [],
        hasFile: !!(partial && (partial.file || (partial.files && partial.files.length))),
        hasLocation: !!(partial && partial.location)
    }, partial || {});
    // Map linkedContactIds → relatedTo[] (canonical name in entriesStore)
    if (Array.isArray(entry.linkedContactIds) && entry.linkedContactIds.length && (!entry.relatedTo || !entry.relatedTo.length)) {
        entry.relatedTo = entry.linkedContactIds.slice();
    }
    (window.entriesStore = window.entriesStore || []).push(entry);
    return entry;
};

// Update an existing entry by id; merges partial fields and bumps dateUpdated.
window.updateEntry = window.updateEntry || function(id, partial) {
    var arr = window.entriesStore || [];
    var idx = arr.findIndex(function(e) { return e.id === id; });
    if (idx === -1) return null;
    arr[idx] = Object.assign({}, arr[idx], partial || {}, { dateUpdated: new Date().toISOString() });
    return arr[idx];
};

// Remove an entry from the SSOT by id. Returns true if removed.
window.removeEntry = window.removeEntry || function(id) {
    var arr = window.entriesStore || [];
    var idx = arr.findIndex(function(e) { return e.id === id; });
    if (idx === -1) return false;
    arr.splice(idx, 1);
    return true;
};
