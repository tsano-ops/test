**Vault (PlanOwner)**

**Type:** Platform-level inventory of all document entries  
**Location:** Platform Sidebar \> Vault 

---

**1\. PURPOSE & UX PRINCIPLES**

The **Vault** is the platform’s **single, global library** for every document entry and credentials created anywhere in PlanAfter.  
It does not replace the original context of a file — it **centralises access** to it.

The Vault consolidates:

* **All document entries** (uploaded files \+ “location-only” entries where no file is uploaded)  
* Documents linked across:  
  * Categories, sections, sub-sections, and individual items (e.g., Accounts, Properties, Policies, Legal, Health)  
* **Proof and storage metadata** (digital file, physical location, notes, timestamps)  
* **Stored credentials** for various accounts, including logins and passwords (if provided OR just location of credentials)

This section directly powers:

* **Fast retrieval & stress-free access**  
  One place to search across the whole plan when something urgent is needed.  
* **Continuity for loved ones & executors**  
  Reduces “where is it?” friction by keeping documents, credentials and their respective origin context together.  
* **Cross-link integrity**  
  A document entry or credential remains one shared record: update once → reflected everywhere it’s linked.  
* **Compliance & trust signals**  
  Clear encryption and permission-based access language reinforces safety.

**UX Roles of the Vault**

* **Global Document Index**  
  A predictable “documents home” that mirrors how people think: search first, then confirm context.  
* **Context Preservation**  
  Every file keeps its original meaning by showing where it belongs (breadcrumb and linked record).  
* **Operational Readiness**  
  Encourages “scan now or at least record location,” so documents are findable even without uploads.

---

**2\. STATES OF THE VAULT**

**2.1. DEFAULT STATE (READ MODE)**

1. **Header**

The Vault opens with a visual summary header that gives the user an immediate sense of what is stored here, how it is distributed across the plan, and how much storage has been used. It functions as a high-level dashboard for the Vault, combining record visibility, storage awareness, and completion cues in one place.

**It includes:**

* Vault title and summary area  
* A tabbed view that lets the user switch between Document Entries and Storage  
* A headline metric for the selected tab  
* A horizontal visual bar showing distribution across plan areas  
* A category-level breakdown for the selected view  
* Contextual prompts that highlight what has been added, what may still be missing, and whether storage or upgrade attention may be needed

In Document Entries, the header shows the total number of document records stored in the Vault and how those records are distributed across categories. This gives the user a quick overview of plan coverage and reinforces that the Vault is a structured, global index of all document entries and credentials captured across the platform.

In Storage, the header shows total storage used, available plan storage, and how uploaded file volume is distributed across categories. This helps the user understand where storage is concentrated, how much capacity remains, and whether a plan upgrade may soon be needed.

Together, these two tabs reinforce that the Vault is not just a storage list — it is both a structured access layer for important records and a clear overview of storage usage across the plan.

2. **Document Entries tab**

**Title:** All document entries in one place.  
**Subtitle (narrative):**  
PlanAfter stores document entry information and digital copies securely in your Vault and guides you to keep originals well-ordered outside the platform. Centralising documents this way keeps you organised in daily life, makes retrieval simple when official papers are required, and reduces stress, delays, or uncertainty.

**Primary actions (top area):**

* **Add Document** ( \+ button, centered and placed at top below below subtitle)  
* **Search bar** (full-width, platform standard) \- the search bar allows the user to search by entry titles, location in platform (by card, record, sub-category), entry description, notes & instructions, people & contacts.  
* **Multi-select controls** (checkbox \+ trash/archive icons where permitted)  
* **Tabs** \- two tabs for Document Entries and Credential

**Grouping (section headers):**  
Vault displays documents in predictable groups and sub-groups that match platform taxonomy. At minimum:

* **Assets & Liabilities**  
  * **Assets:**   
    * **Financial Accounts & Instruments**  
    * **Crypto & Blockchain**  
    * **Real Estate**  
    * **Vehicles**  
    * **Personal Property**  
    * **Digital & Online**  
    * **Business**   
    * **Intellectual Property**  
    * **Other Assets**  
  * **Liabilities:**  
    * **Financial Debts & Loans:**  
      * **Mortgage**  
      * **Consumer / Personal Loan**  
      * **Business Loan**  
      * **Credit Card Debt**  
      * **Leasing Agreement**  
      * **Private Loan**  
      * **Lines of Credit**  
      * **Co-signed Loans or Guarantees**  
      * **Other Financial Liability**  
    * **Outstanding Bills & Ongoing Expenses**  
      * **Medical Bills**  
      * **Utility Bills**  
      * **Rent**  
      * **Subscriptions & Memberships**  
      * **Insurance Payments**  
      * **Elder or Home Care Services**  
      * **Service Provider Fees**  
      * **Other Recurring or Unpaid Expenses**  
    * **Legal & Tax Liabilities**  
      * **Unpaid Taxes**  
      * **Tax Repayment Plans**  
      * **Court Judgments and Fines**  
      * **Alimony or Child Support**  
      * **Liens, Seizures or Freeze Orders**  
      * **Other Legal Liability**  
    * **Other Liabilities**  
* **My, My Family & My Network**  
  * **\[Name\]’s Profile**  
* **Will & Legal Actions**   
  * **Will**  
  * **Trust**  
  * **PoA**  
  * **Guardianship Directive**  
  * **Advance Directive**  
* **Emotional Legacy**  
  * Life Reflection  
    * Year In Review  
    * Ethical Will  
  * Letters to Loved Ones  
* **Body & Health**  
  * In Case of Emergency  
  * Getting Old  
  * When I’m Gone  
* **Goals & Aspirations**  
  * Annual Goals   
  * Dreams & Aspirations

*(Sections appear only when at least one entry exists in that group.)*

**Entry Row Card (Collapsed Summary) shows:**

* Document name (primary)  
* Document type label (secondary)  
* “Updated X days ago by You” (tertiary)  
* Storage indicator: **Digital File**, **Location**, or **Digital File & Location**  
* 3-dot entry actions menu (⋯) (alighed to the right) with options for:  
  * **Open Record (option only for PlanOwner)**  
  * **Edit**  
  * **Archive (or Unarchive if already archived)**  
  * **Delete**

**Rules:**

* Actions respect role permissions (PlanOwner vs read-only users).  
* Delete requires confirmation modal (platform standard).

**Sorting (default):**

* Most recently updated first  
* Secondary sort inside groups: Document type → newest → oldest

**Archived Entries:**

* Archiving puts the card last in the list and opacity is reduced to 50%  
* The file remains in the vault under an “Archived” filter  
* Executor access rules remain the same unless document is deleted  
* Archived docs do not trigger expiry reminders

3. **Credentials Tab**

**Title:** All credentials in one place.  
**Subtitle (narrative):**  
PlanAfter stores digital access details securely in your Vault so important accounts, systems, and entry points can be found when needed. Centralising credentials this way helps you stay organised in daily life, reduces the risk of forgotten or scattered access information, and makes retrieval simpler in urgent, administrative, or transitional moments. The Vault is designed to support secure visibility of what exists, where it belongs, and how it connects to the broader plan.

**Primary actions (top area):**

* **Add Credential** ( \+ button, centered and placed at top below subtitle)  
* **Search bar** (full-width, platform standard) — the search bar allows the user to search by credential title, linked platform location (by card, record, sub-category), credential type, notes & instructions, related people & contacts  
* **Multi-select controls** (checkbox \+ trash/archive icons where permitted)  
* **Tabs** — two tabs for Document Entries and Credentials

**Entry Row Card (Collapsed Summary) shows:**

* Credential name (primary)  
* Document type label (secondary)  
* “Updated X days ago by You” (tertiary)  
* Storage indicator: **Password Manager**, **Stored Directly** or **Offline Record**  
* 3-dot entry actions menu (⋯) (alighed to the right) with options for:  
  * **Open Record (option only for PlanOwner)**  
  * **Edit**  
  * **Archive (or Unarchive if already archived)**  
  * **Delete**

**Rules:**

* Actions respect role permissions (PlanOwner vs read-only users).  
* Delete requires confirmation modal (platform standard).

**Sorting (default):**

* Most recently updated first  
* Secondary sort inside groups: Credential type → newest → oldest

**Archived Entries:**

* Archiving puts the card last in the list and opacity is reduced to 50%  
* The file remains in the vault under an “Archived” filter  
* Executor access rules remain the same unless document is deleted  
* Archived docs do not trigger expiry reminders

---

### **2.2. EXPANDED STATE (READ MODE)**

1. **Document Entries tab**

When a user clicks an entry row, it expands **inline** (never in a modal).

#### **i. Header Area (within the expanded card)**

Shows:

* Document name \+ type  
* Updated timestamp  
* Storage mode indicator (Digital / Location / Both)

  #### **ii. Location in Platform (Breadcrumb Navigation)**

  A breadcrumb with label ‘Location in Platform’ appears at the very top of the expanded content to preserve provenance.

  **Format (exact structure):**  
  **Category** (e.g., *Assets & Liabilities*)  
  **\> Sub-Category** (e.g., *Assets*)  
  **\> Section** (e.g., *Financial Accounts & Instruments*)  
  **\> Sub-Section** (e.g., *Bank Accounts*)  
  **\> Individual Item** (e.g., *Bank Account 1*)  
  **\> Item Card** (e.g., *Basic Info*)

  **Rules:**

* Always shown when the document is linked to a structured item.  
* If linked to multiple places, show:  
  * The **primary breadcrumb** (platform-defined primary where it first originated), and  
  * A “+ X more links” control that expands into additional breadcrumbs.  
* Breadcrumb segments are **tap targets** (navigate to that level) where permissions allow.  
* If the document is only in Vault (not linked yet), breadcrumb shows:  
  * **Unlinked document** (single label) \+ “Link to a record” CTA.

    #### **iii. Details Blocks (Read Mode)**

    Expanded content mirrors the calm, structured layout (input data in bold black colour, labels below in grey):  
    **1\) Location of the Original Document or File**  
* e.g., *Home Safe*  
  **Location details** (if available)  
* e.g., *Red folder.*

  **2\) Notes & instructions** (if available)

* Short free text, no empty placeholders.

  **3\) Attached files (if any)**

* File row card(s) showing:  
  * File icon  
  * File name  
  * Upload timestamp (e.g., “Uploaded 2 days ago”)  
    **Collapse control:**  
* “Hide details” or clicking on the entry header area collapses the entry back to the row card.

  #### **iv. Entry Actions (⋯)**

  In expanded read mode, the actions menu appears aligned to the right:

* **Open Record (option only for PlanOwner)**  
* **Edit**  
* **Archive (or Unarchive if already archived)**  
* **Delete**  
    
2. **Credentials tab**

When a user clicks an entry row, it expands **inline** (never in a modal).

#### **i. Header Area (within the expanded card)**

Shows:

* Credential name \+ type  
* Updated timestamp  
* Credential storage method indicator (e.g., Password Manager / Stored Directly / Offline Record / Location-based access note)

  #### **ii. Location in Platform (Breadcrumb Navigation)**

  A breadcrumb with label ‘Location in Platform’ appears at the very top of the expanded content to preserve provenance.

  **Format (exact structure):**  
  **Category** (e.g., *Assets & Liabilities*)  
  **\> Sub-Category** (e.g., *Assets*)  
  **\> Section** (e.g., *Financial Accounts & Instruments*)  
  **\> Sub-Section** (e.g., *Bank Accounts*)  
  **\> Individual Item** (e.g., *Bank Account 1*)  
  **\> Item Card** (e.g., *Basic Info*)

  **Rules:**

* Always shown when the document is linked to a structured item.  
* If linked to multiple places, show:  
  * The **primary breadcrumb** (platform-defined primary where it first originated), and  
  * A “+ X more links” control that expands into additional breadcrumbs.  
* Breadcrumb segments are **tap targets** (navigate to that level) where permissions allow.  
* If the document is only in Vault (not linked yet), breadcrumb shows:  
  * **Unlinked document** (single label) \+ “Link to a record” CTA.

    #### **iii. Details Blocks (Read Mode)**

    Expanded content mirrors the calm, structured layout (input data in bold black colour, labels below in grey):  
    **1\) Credential Storage Method**  
* e.g., Password Manager  
  **Storage method details (if available)**  
* e.g., LastPass

  **2\)  Access Reference / Credential Details**

* Shows the relevant stored access information according to the credential type. Examples may include:  
  * Password manager name  
    * Stored login reference  
      * Offline access note  
      * Location-based access reminder  
      * Other secure access metadata  
    * Sensitive values should only be shown according to role permissions and visibility rules.

    **3\) Notes & Instructions (if available)**

* Short free text, no empty placeholders.  
* e.g., Master key is written on the back of my passport.

  **Collapse control:**

* “Hide details” or clicking on the entry header area collapses the entry back to the row card.

  #### **iv. Entry Actions (⋯)**

  In expanded read mode, the actions menu appears aligned to the right:

* **Open Record (option only for PlanOwner)**  
* **Edit**  
* **Archive (or Unarchive if already archived)**  
* **Delete**

---

### **2.3. ‘+Add..’ Flows (Inline Form Expansion)**

1. **Document Entries tab**

Tapping ‘+**Add Document’** transforms the area into an inline form (no navigation, no modal).

**Form behaviour:**

* The Add button disappears  
* A full-width rounded form expands in-place  
* Close (X) collapses form and restores Add button

**Form fields (Vault version):**

---

**3\. \+ ADD NEW ENTRY MODAL**  
When the user clicks **“+ Add Document”**, the button does not remain on screen.  
 Instead, the entire area transitions into the full Document Entry Form.  
1\. Button → Form Transformation

* The **“+ Add Document”** button disappears.  
* In its place, the **Document Entry Form** expands downward.  
* The form occupies a full-width, rounded container.  
* The list of documents below is pushed further down to make room.


  2\. Close Interaction

* A **small “X” button** appears in the **top-right corner** of the form.  
* This “X” allows the user to **collapse and close the form**.  
* When the user clicks “X”, the form collapses and the **“+ Add Document”** button reappears in its original position.

  3\. User Stays in Context  
* No modal is used.  
* No navigation is triggered.  
* The user remains on the **Files** tab of the record.

  4\. Smooth Animation  
* The transition should feel like the form is *unfolding downward* from the place where the Add button was.  
* The rest of the page shifts downward in a smooth motion.

**Entry Form sections \-** each entry is divided in three separate sections:

* **About This Entry:** includes all the fields that provide entry details, including all the timeline milestones.  
* **Documentation & Storage:** shows upload/drag and drop component and a list of Documents attached.  
* **People & Contacts:** allows user to link existing or new contacts to the entry for reference. 

---

**Form Fields (detailed)**

**3.1 About This Entry:** includes all the fields that provide entry details, including all the timeline milestones.

***3.1.1. Document Entry Name (Required)*****\***  
**Type:** Text input  
 **Placeholder:**  
 “e.g. Marriage certificate  — John Johnson”  
Rules:

* Required  
* Max 120 chars  
* Free text but must not be blank

  Hover:  
  “Choose a name that helps you easily recognise this document later.”

  **Notes for developers:**  
   Document Name becomes the primary label shown in:

* Document Row Card  
* Vault  
* Document Entries Tab  
* Linked cards across the platform

  **Rules:** 

* Added a check so that when the **Document Type** is selected, if the **Document Name** field is currently empty, it automatically populates with the selected type.  
* Added logic to extract the filename (removing the extension) and populate the **Document Name** field when a file  is uploaded.  
  ---

  ***3.1.2. Location in PlanAfter (Required)*****\***

  **Type:** Dropdown  
  **Options:**   
  * **Assets & Liabilities:**  
    * Assets  
      * Financial Accounts & Instruments  
        * Bank Accounts  
          * Bank Account A  
            * Ownership  
              * Related Services  
          * Bank Account B  
        * Investments  
          * Investment A  
            * Ownership  
              * Related Services  
          * Investment B  
        * Retirement Accounts  
          * Retirement Account A  
            * Ownership  
              * Related Services  
          * Retirement Account B  
        * Life Insurance  
          * Life Insurance A  
            * Ownership  
              * Related Services  
          * Life Insurance B  
        * Cash at Home / Safe  
          * Cash A  
          * Cash B  
        * Other Financial Assets  
          * Other Financial Asset A  
            * Ownership  
              * Related Services  
          * Other Financial Asset B  
      * Crypto & Blockchain  
        * Crypto & Blockchain A   
          * Ownership  
            * Related Services  
        * Crypto & Blockchain B  
      * Real Estate  
        * Real Estate A  
          * Ownership  
            * Mortgage Details  
            * Insurance Details  
            * Utilities  
            * Related Services  
        * Real Estate B  
      * Vehicles  
        * Vehicles A   
          * Ownership  
            * Insurance  
            * Warranty  
            * Related Services  
        * Vehicles B  
      * Digital & Online   
        * Domains  
          * Domain/Online A  
            * Ownership  
              * Services  
          * Domain/Online B  
              
        * Loyalty Points & Gift Cards  
          * Points/Gift Card A  
            * Ownership  
          * Points/Gift Card B  
              
        * In-app Credits  
          * In-app Credits A  
            * Ownership  
          * In-app Credits B

        * Online Accounts  
          * Online Account A  
            * Ownership  
              * Related Services  
          * Online Account B

      * Personal Property  
        * Personal Property A  
          * Ownership  
            * Insurance  
            * Related Services  
            * Warranty  
        * Personal Property B  
            
      * Business   
        * Business A  
          * Ownership  
            * Insurance  
            * Related Services  
        * Business B  
            
      * Intellectual Property  
        * Intellectual Property A  
          * Ownership  
            * Related Services  
        * Intellectual Property B  
      * Other Assets  
        * Other Asset A  
          * Ownership  
            * Insurance  
            * Warranty  
            * Mortgage  
            * Utilities   
            * Related Services  
        * Other Asset B  
    * Liabilities   
      * Financial Debts and Loans  
        * Mortgage  
          * Mortgage A  
            * Ownership  
              * Collateral  
              * Servicer Info  
              * Related Services  
          * Mortgage B  
        * Consumer / Personal Loan  
          * Consumer/Personal Loan A  
            * Borrower & Other Parties  
              * Terms & Payments  
              * Collateral  
              * Insurance  
              * Servicer Info  
              * Online Access  
          * Consumer/Personal Loan B  
        * Business Loan  
          * Business Loan A  
            * Borrower & Other Parties  
              * Terms & Payments  
              * Collateral   
              * Covenants  
              * Servicer Info  
              * Online Access  
          * Business Loan B  
        * Credit Card Debt  
          * Credit Card A  
            * Terms & Payments  
              * Rates & Fees  
              * Balance & Limits  
              * Rewards  
              * Online Access  
              * Disputes & Chargebacks  
          * Credit Card B  
        * Leasing Agreement  
          * Leasing Agreement A  
            * Parties   
              * Asset Details  
              * Terms & Payments  
              * Insurance   
              * Fees & Penalties  
              * Online Access  
          * Leasing Agreement B  
        * Private Loan  
          * Private Loan A  
            * Parties  
              * Terms & Payments  
              * Collateral  
              * Online Access  
          * Private Loan B  
        * Lines of Credit  
          * Line of Credit A  
            * Parties  
              * Terms & Payments  
              * Rates & Limits  
              * Collateral  
              * Servicer Info  
              * Online Access  
          * Line of Credit B  
        * Co-signed Loans or Guarantees  
          * Co-signed Loan/Guarantee A  
            * Parties  
              * Underlying Loan  
              * Guarantee / Co-sign Terms  
              * Collateral & Liens  
              * Notifications & Defaults  
              * Online Access  
          * Co-signed Loan/Guarantee B  
        * Other Financial Liability  
          * Other Financial Liability A  
            * Parties  
              * Terms & Amounts  
              * Rates & Fees  
              * Collateral  
              * Online Access  
          * Other Financial Liability B  
      * Outstanding Bills & Ongoing Expenses  
        * Medical Bills  
          * Medical Bills A  
            * Patient & Providers  
              * Bill Details  
              * Insurance & Claims  
              * Payment Info  
              * Online Access  
          * Medical Bills B  
        * Utility Bills  
          * Utility Bills A  
            * Service Provider  
              * Billing  
              * Current Charges & Balance  
              * Payment Plan  
              * Online Access  
          * Utility Bills B  
        * Rent  
          * Rent A  
            * Parties  
              * Terms  
              * Rent & Payments  
              * Online Access  
          * Rent B  
        * Subscriptions & Memberships  
          * Subscriptions/Membership A  
            * Provider & Plan  
              * Billing & Cycle  
              * Payment Info  
              * Access & Authentication  
              * Cancellation & Renewal  
          * Subscriptions/Membership B  
        * Insurance Payments  
          * Insurance Payments A  
            * Policy & Provider  
              * Coverage & Beneficiaries  
              * Premiums & Payment Schedule  
              * Claims & Support  
              * Renewal & Cancellation  
              * Online Access  
          * Insurance Payments B  
        * Elder or Home Care Services  
          * Elder/Home Care Service A  
            * Provider Info  
              * Service Details  
              * Costs & Billing  
              * Payment Info  
              * Insurance/Benefits  
              * Online Access  
          * Elder/Home Care Service B  
        * Service Provider Fees  
          * Service Provider Fees A  
            * Provider Info  
              * Billing & Invoicing   
              * Payments Info  
              * Renewal & Cancellation  
              * Online Access  
          * Service Provider Fees B  
        * Other Recurring or Unpaid Expenses  
          * Other Recurring/Unpaid Expenses A  
            * Provider/Payee Info  
              * Payments Info  
              * Online Access  
          * Other Recurring/Unpaid Expenses B  
      * Legal & Tax Liabilities   
        * Unpaid Taxes  
          * Unpaid Taxes A  
            * Tax Authority & Details  
              * Tax Period & Assessment  
              * Payment Info  
              * Contacts & Representation  
          * Unpaid Taxes B  
        * Tax Repayment Plans  
          * Tax Repayment Plan A  
            * Tax Authority & Details  
              * Plan Terms  
              * Repayment Info  
              * Contacts & Representations  
          * Tax Repayment Plan B  
        * Court Judgments and Fines  
          * Court Judgments/Fines A  
            * Case & Court Details  
              * Parties & Representation  
              * Payment Info  
          * Court Judgments/Fines B  
        * Alimony or Child Support  
          * Alimony/Child Support A  
            * Court Order Info  
              * Parties & Beneficiaries  
              * Payments Info  
          * Alimony/Child Support B  
        * Liens, Seizures or Freeze Orders  
          * Lien/Seizure/Freeze Orders A  
            * Issuing Authority  
              * Affected Assets  
              * Amounts & Secured Claims  
              * Enforcement Actions & Restrictions  
              * Contacts & Representation  
          * Lien/Seizure/Freeze Orders B  
        * Other Legal Liability  
          * Other Legal Liability A  
            * Legal Basis & Details  
              * Parties & Representation  
              * Payment Info  
          * Other Legal Liability B  
      * Other Liabilities  
        * Other Liability A  
          * Parties  
            * Payment Info  
            * Collateral  
        * Other Liability B  
  * **My, My Family & My Network**  
    * My Profile  
      * Essential Info  
        * Contact Info  
        * Family & Relationships  
        * Medical Info  
        * Education  
        * Employment & Affiliations  
        * Beliefs, Hobbies & Interest   
      * Album (all marked ones)  
      * Life Story   
      * Memorial (whole tab) ???  
    * My Family   
      * Profile A  
        * Essential Info  
        * Contact Info  
        * Family & Relationships  
        * Medical Info  
        * Education  
        * Employment & Affiliations  
        * Beliefs, Hobbies & Interest   
      * Profile B   
      * Pets  
        * Pet A  
          * Essential Info  
          * Contact Info  
          * Medical Info  
          * Routines & Care Instructions  
        * Pet B  
    * My Network  
      * Profile A  
        * Essential Info  
        * Contact Info  
      * Profile B    
  * **Emotional Legacy**  
    * Life Reflection  
      * Year In Review  
      * Ethical Will  
    * Letters to Loved Ones  
      * Letter to Loved Ones A  
      * Letter to Loved Ones B  
  * **Body & Health**  
    * In Case of Emergency  
    * Getting Old  
    * When I’m Gone  
  * **Goals & Aspirations**  
    * Annual Goals   
      * Annual Goal A  
      * Annual Goal B  
    * Dreams & Aspirations  
      * Dream & Aspiration A  
      * Dream & Aspiration B  
  * **Will & Legal Actions**  
    * Will   
    * Trust   
      * Trust A  
      * Trust B  
    * Power Of Attorney  
      * PoA A  
      * PoA B  
    * Guardianship Declaration  
    * Advanced Directive

    

    Rules:

* Required  
* Each of the options list is comprised of collapsible sections that reveal the next layer of options only once the respective one is selected.

  Hover:  
   “Choose the location in the platform where the document entry will be stored.”


  ---

  ***3.1.3. Document Type (Required)*****\***

  **Type:** Dropdown  
  **Options:** *Each respective grouping has a different document type, which is determined by the location in the platform and the card that the document is attached to. Last option in every possible list is always is ‘Other’.*

  Rules:

* Required  
* Selecting “Other” opens a new field:  
   **Describe Document Type** (text input, max 80 chars)

  Hover:  
   “Choose the type of document, so it's displayed correctly across your plan.”


  

1. **Adaptive Timeline Builder \-Timeline & Milestones**

Every entry includes a dedicated Timeline section with the following logic:

* **Milestone Structure:** \* **Event Label:** Contextual or custom name.  
  * **Date Selection:** Unified YYYY (Required) → Month (Optional) → Day (Optional).  
  * **Details & Notes:** A multi-line field specific to that milestone to capture free text

  Rules:

* Partial dates allowed (Year-only is valid)  
* If Day is selected, Month must exist (platform rule if enforced)  
* All date fields validate calendar correctness (e.g., 31 Feb invalid)  
* Dates are optional unless stated otherwise.


  

   **Issue Date (Optional)**

  Label: Issue date  
  Purpose: When the document was issued


  **Expiry Date (Optional)**

  Label: Expiry date  
  Purpose: When the certificate expires (if applicable)

  Validation (if both exist):

* Expiry Date cannot be earlier than Issue Date


  Display Rules


* Collapsed entry summary shows:  
* Issue Date  
* Expiry Date (if set)  
* If no dates are set → entry remains valid with no timeline label  
    
  **Custom Date (Optional)**

  Label: Custom date  
  Purpose:   
  Validation 

  Display Rules

    
* Collapsed entry summary shows:  
* Start Date  
* Custom Date (if set)  
* If no dates are set → entry remains valid with no timeline label

  **Custom date milestone**  
  When the user selects **\+ Custom date**, the milestone becomes user-defined and the UI shows an **Event label** field (instead of a static system label) so the user can name the moment ). Each milestone (including Custom) also includes a **Details & notes** multi-line field, allowing the user to add context specific to that milestone.

  

  ---


  
**3.2. Documentation Upload & Storage (subtitle of Section)**

This section allows the user to:

* collect all documents so they are a click away if user needs them, upload digital copies (diplomas, transcripts, certificates)  
* and/or specify where the physical originals are stored

**Dynamic Tooltip (i):** Adapts to category chosen above in the form.

**A. Location of the Original Document or File (Optional)**

Type: Dropdown

Options (platform standard):

* Home safe  
* Lawyer’s office  
* Bank deposit  
* Cloud  
* Other

  Rules:  
   Optional  
  If “Other” → show field “Please specify” (required)

  If “Cloud” → show field “Add link” 

  Hover tooltip (i):  
   “Use this to record where the original paper documents are stored. This may be especially useful for your loved ones if no digital scan is uploaded.”

---

**B. Specific Storage/ Location Details (Conditional)**

Type: Text input  
Label: Location Details  
Placeholder: “Drawer, safe, folder name…”

Rules:  
Shown when Location is selected (recommended) OR when “Other” requires explanation  
Optional unless Location requires it (e.g., Other)  
---

**C. Upload / Drag & Drop File Component (Optional)**

The user can either manually upload the document by clicking ‘Upload File’ or the user can also drag and drop the file in the designated upload area.

**![][image1]**

**![][image2]**

**![][image3]**

**![][image4]**

Component Specification  
File Upload Dropzone (Dual Action – Upload / Drag & Drop)  
---

Component Name  
**File Upload Dropzone**  
---

Purpose  
This component allows the user to upload files either by:

* clicking **Upload File**, or  
* dragging and dropping files into the dropzone.

It communicates:

* supported formats  
* file size limits  
* security guarantees

in a calm, trust-building, non-intrusive way.  
---

Visual Structure  
1\. Container (Dropzone)

* Shape: Rounded rectangle (large radius, pill-like but taller)  
* Border:  
  * Dashed line  
  * Light grey color  
  * Uniform dash spacing  
* Background:  
  * Very light grey / translucent  
  * No gradient  
* Shadow: none  
* Width: full container width  
* Height: fixed, enough to comfortably fit icon \+ text

The container is **one unified interactive surface**, visually split into two logical actions.  
---

2\. Internal Layout  
The dropzone is horizontally divided into **two equal zones**, separated by a subtle vertical divider:  
\[ Upload File \]  |  \[ Drag and Drop File Here \]

* Divider:  
  * Thin vertical line  
  * Light grey  
  * Centered vertically  
  * Does not animate

---

Left Zone — “Upload File”  
Default State  
Icon

* Upload arrow icon  
* Black / dark grey  
* Centered inside an **invisible circular hit area**  
* No background by default

Text

* “Upload File”  
* Black / primary text color  
* Regular or medium weight  
* Aligned horizontally with the icon  
* Positioned slightly to the right of the icon

---

Hover State (CRITICAL – EXACT BEHAVIOR)  
When the **hover is over the Upload File zone only**:

1. **Icon background**  
   * A **white circular background appears behind the icon**  
   * Circle fades in smoothly  
   * Circle is centered perfectly on the icon  
   * No border on the circle

2. **Text movement**  
   * The text “Upload File” shifts **slightly to the right**  
   * Movement is subtle (micro-interaction, not noticeable jump)  
   * No change in font size or weight

3. **Border**  
   * Dashed border of the whole container becomes slightly more visible  
   * Still dashed, no solid border

4. **Animation**  
   * Duration: short (≈120–150ms)  
   * Easing: ease-out  
   * No bounce  
   * No scale animation

Important:  
 The right zone does **not** react when hovering the left zone.  
---

---

Text Below the Dropzone  
Supported Formats Text

* Small, secondary text  
* Grey color

Example:

 Accepted formats: PDF, JPG, PNG, GIF, DOCX, RTF, TXT, XLSX, MP3, WAV, MOV, MP4.  
Max size: 25 Mb.

* Left-aligned  
* No animation  
---

Security Notice (“Important\!”)  
Icon

* Small circular “i” icon  
* Black outline  
* No fill

Text

* “Important\!” in bold or semi-bold  
* Followed by explanatory sentence:  
   “All files are encrypted with AES-256.

**Rules:**.

* The upload component must support: Empty → Uploading → Uploaded → Error states.  
* Validate file type and size **before** starting upload.  
* Show encryption message (“AES-256”) below the upload box.  
* If error occurs, keep the user in context and show a retry option.


  

  **D. Uploaded Files row cards (if any, appears in list one under other )**


  **![][image5]**


  


  Each file appears as a **File Row Card** with:

* **File Type Icon**  
* **File Name**  
   Example: *Investment Portfolio Q4*  
* **Upload Timestamp**  
   Example: **Uploaded Right Now**  
   After saving → becomes:  
   **Uploaded 2 days ago**  
   or  
   **Updated on Jan 15, 2025**  
* **Trash Icon (Delete File)**  
   Always visible on the right.


  When user taps the Trash icon → show confirmation modal:  
  **Title:**  
   Delete File?  
  **Body:**  
   Are you sure you want to delete this file? This action cannot be undone?”  
  **Button:**  
* Delete (red)

  After delete →  
   File Row disappears → Only Location \+ Notes remain if provided.

* If the user uploads → shows thumbnail \+ “Delete” action Icon .

  **Hover:**  
   “Upload a digital copy for quick access. Optional — you may also just describe where the original is stored.”


  **Actions**: Clicking the **file name** or the **file icon** opens a **full-screen document preview modal** opens


**E. Important note (Security Message)**

Design:

* Info icon (ⓘ)  
* Bold title: **Important\!**  
* Light paragraph text below

  Exact text (FINAL):

  **Important\!**  
  All uploaded files are encrypted using AES-256 and stored securely. Access is limited strictly to individuals explicitly authorised by you, in accordance with your sharing and permission settings.

**3.3.  People & Contacts (Subtitle of the section)**

This section enables the PlanOwner to **link existing people records** or **create new ones**, selecting from **My Family** and **My Network**, and associate them with the current entry while preserving a **single authoritative Person Record** across the platform.

**Simple cross-record rule**   
If the PlanOwner links a person (or creates a new person) inside this Document Entry, the same Document Entry appears in that person’s Record as well.  
It is one shared entry — not a copy.  
So editing it in either place updates it everywhere, and deleting it removes it everywhere.

**Field: Add Contact (Optional)**  
**Label**: Add Contact   
**Type:** Searchable Dropdown Selector  
**Description:**

The **Add Contact** field behaves as a standard input field in its default state.  
 On click (or focus), the field **transforms into an active search bar**, allowing the user to immediately start typing to find an existing Person Record or create a new one.

This pattern minimizes friction and follows native contact-search behavior.

Default State (Before Interaction)

* Appears as a single-line input field  
* Placeholder text example:  
   *“Search or add a contact…”*  
* No dropdown visible  
* No icons required  
* Cursor is not active  
  ---

  Active State (On Click / Focus)  
  Behavior  
* The field becomes an active **search bar**  
* Text cursor is placed inside the input  
* A dropdown panel opens **immediately below the field**  
* The dropdown updates in real time as the user types

  ---

Search Behavior (Critical)

* A **search input is always visible at the top** of the dropdown  
* Placeholder text example:  
   *“Start typing a name…”*  
* Search is **instant and client-side**  
* Filters results in real time while typing  
* Search matches:

  * First Name  
  * Family Name  
  * Full Name (combined)

Rules:

* Case-insensitive  
* Trims leading/trailing whitespace  
* No minimum character requirement  
* Empty input shows the full list

---

List Content & Ordering

The dropdown displays an aggregated list of **existing Person Records** from:

* **My Family**  
* **My Network**

Sorting

* All records are sorted **alphabetically by Full Name (A–Z)**  
* Sorting is applied **before** filtering  
* The order remains stable during search (filtered subset keeps alphabetical order)

List Item Structure

Each list item contains:

1. **Full Name**  
   * Primary text  
   * Black / primary text color  
   * Uses system-generated Full Name

2. **Role in Your Life**  
   * Secondary text  
   * Smaller font size  
   * Grey / secondary text color  
   * Examples:

     * “Sister”  
     * “Executor”  
     * “Professor”  
     * “External Contact”

---

* The **last option** in the list is always: **Create new**  
* Selecting **Create new** opens the standard **Person Record Quick creation flow**  
  


**Purpose:**

* Link a relevant person to the current entry  
* Reuse already created records from My Family or My Network without duplication  
* Securely reference people through permission-based access  
* Preserve a single source of truth for all people across the platform  
* Allow the same person's record to be linked across multiple entries and domains (Education, Employment, Health, Legal, Family Tree, etc.)

**Linked Records Display**  
Each linked contact is rendered as an Expanded Linked Summary Card.  
**Principles**

* The card is a read-only projection of the authoritative record  
* It reflects the current state of the underlying record at all times  
* The card never owns or edits data- Expanded Linked Summary Card


**![][image6]**

**Behaviour**  
A.1. Selecting an Existing Contact  
A.2.Creating a New Contact (Person Record Quick Creation Flow)

**A.1. Selecting an Existing Contact**

* When a contact is selected from the dropdown:

  * The system resolves the record source automatically (My Family or My Network)  
  * An **Expanded Linked Summary Card** of that person appears immediately below the Add contact field  
  * The Add contact field remains visible, allowing additional people to be added  
* If multiple contacts are added:

  * Each appears as its own **Expanded Linked Summary Card**  
  * Cards are stacked vertically in the order added  
  * Order follows the sequence in which contacts were added

**3.3.1. Expanded Linked summary card of a Person record**   
(Read-Only Projection – Medium+ Density)

The Expanded Linked Summary Card is the standard, expandable, medium-density representation of a Person Record used throughout the PlanAfter platform whenever a person is referenced outside their own record.

The card:

* Never owns data  
* Never edits data  
* Always reflects the authoritative record state

  **Collapsed View- Elements, Data Sources & States** 

| Element | Description | Data Source | States | Displayed |
| ----- | ----- | ----- | ----- | ----- |
| Avatar | Photo or initials | Essential Info Input Card | Empty / With photo | Yes |
| Life Status Dot | Visual life indicator | Essential Info Input Card (green by default if not marked other   | Living / Deceased / Unknown | Yes |
| Full Name | First \+ Last name | Essential Info Input Card | — | Yes |
| Specific Role (Role in Your Life) | User-facing relationship term | Essential Info → Role in Your Life → Specific Role | Varies | Yes |
| Relationship Timeline | Duration of relationship | Essential Info → Role Dates | Present / Absent | Conditional |
| Date of Birth \+ Age | Dynamic age calculation | Essential Info Input Card | Minor / Adult | Yes |
| Date of Death | Shown only if deceased | Essential Info Input Card | Present / Hidden | Conditional |
| Role in Your Plan Indicator | Executor / Beneficiary / etc. | Roles & Access | Assigned / Not assigned | Yes if role assigned  |


  **Expanded View  (Inline) — Additional Contact Information**

These elements appear only when the card is expanded inline.

| Element | Description | Data Source | Display |
| ----- | ----- | ----- | ----- |
| Primary Email | Main email (masked if needed) | Contact Info  Card | Conditional |
| Additional Emails | Secondary emails | Contact Info Card | Conditional |
| Primary Phone Number | Main phone | Contact Info Card | Conditional |
| Additional Phone Numbers | Secondary numbers | Contact Info Card | Conditional |
| Primary Address | City / Country (short format) | Contact Info Card | Conditional |
| Social Media Profiles | Linked platforms with icons | Contact Info → Social Media | Conditional |
| Empty State | “No contact information available” | Contact Info Card | Conditional |

**Display Rules:**

* Only populated fields are shown  
* No empty placeholders  
* No edit icons inside expanded content  
* Masking applies based on permissions

---

**Actions  (⋯) \- Each card includes an action menu:** 

**Dynamic Editing of a Linked Contact (Inline Edit Transformation)**

This section defines the interaction logic that allows a user to modify the details of an already linked contact **directly within the Entry Form**, without leaving the current card or triggering navigation.  
---

**A. Access to the Function**  
**Location:**  
 Each **Expanded Linked Summary Card** (linked contact card) includes an **action menu**, represented by a three-dot icon (**…**) located in the top-right corner of the card.  
**Available actions:**

* **Edit**  
   Activates inline editing mode for the linked contact.

  * **Remove**  
     Removes the association between the contact and the current entry.  
     **Important:** This action does **not** delete the contact record from *My Network*.

  ---

  **B. Behaviour When Selecting “Edit” (Inline Transformation)**

  To preserve user context and avoid unnecessary navigation, the platform applies an **inline transformation pattern**.

    State transformation

* When the user selects **Edit**, the existing **Expanded Linked Summary Card** is **replaced in place** by the **Contact Creation / Edit Form**.

* The form appears **in the exact position** of the original card, maintaining visual and spatial continuity.

  Pre-population (Edit Mode)


The form is loaded in **edit mode**, with all existing data from the authoritative contact record automatically populated into the relevant fields   
**Visual distinction**  
To clearly indicate that an existing element is being edited (as opposed to creating a new contact), the form container may receive a **subtle visual accent** (e.g. soft shadow or focus ring).  
---

**C. Actions Within the Edit Form**  
“Save updates” button  
**Location:** Bottom of the form.  
**On click:**

* All changes are saved to the **authoritative contact record**.  
* The form closes and transforms back into an **Expanded Linked Summary Card**.  
* Updated data is immediately reflected **globally** across the platform wherever this contact is referenced.

  ---

  “X” (Cancel) button

**Location:** Top-right corner of the form.  
**On click:**

* The form closes **without saving changes**.  
* The original Expanded Linked Summary Card is restored with its previous data intact.

  ---

  D. UX Rules & Styling  
* **Text casing**  
   All field labels and button texts use **Sentence case**  
   (e.g. “Save updates”, not “SAVE UPDATES”).

* **Repeatable fields**  
   During editing, users may:

  * Add new email addresses or phone numbers  
  * Remove existing ones  
     using the **“+”** and **trash** icons.

* **Animation**  
   The transition between card and form must be smooth (fade-in / unfold animation) to clearly communicate that the interaction occurs **within the same container**, not as a navigation event.

  ---

  **System Principles**   
  The contact record remains the **single source of truth**.  
* Inline editing modifies the **authoritative record**, not a local copy.  
* All updates propagate automatically to:

  * Other entries  
  * Linked Summary Cards  
  * Directories and references

* Permission-based visibility and masking rules always apply.  
* All fields pre-populated from the authoritative record

---

**A.2. Creating a New Contact**  
**(Person Record Quick Creation Flow)**

* Choosing **Create New from the dropdown option of Field: Add Contact** :

  * Opens the standard contact creation flow  
  * On save:

    * A new record is created. The system assigns it to:  
* **My Family**, **if the relationship type is a family relationship**  
* **My Network**, **if the relationship is external**  
  * The new record is automatically linked to the current entry  
    * The new record becomes the single source of truth  
    * Its **Expanded Linked Summary Card** is displayed immediately

Purpose  
The **Create New Contact Record** form allows the user to create a **new person record** when the needed contact does not already exist.  
 The created record becomes a **single source of truth** and can be securely linked to one or more entries (e.g. Education, Health, Legal) without duplicating data.

---

**PERSON RECORD CREATION — TWO TYPES**

**0\. Directory Selection (PRIMARY CONTROL)**  
0.1 Directory Type Selector (Required)  
**Label:** Add this person to  
 **Type:** Segmented control (pill-style, exactly as provided reference image)  
 **Placement:** At the top of the form, immediately under the form title  
**Options (text-only, no icons):**

* My Family  
* My Network

**Default State:**

* My Network (preselected)

**Behavior:**

* Acts as the **primary mode switch** for the entire form  
* Switching the selection **immediately changes the visible fields below**  
* The form never reloads; fields update in-place

**Visual Rules:**

* Rounded pill container  
* Active option: filled background  
* Inactive option: transparent background  
* No icons  
* No animation beyond standard state change (instant or subtle fade)

**Logic:**

* If **My Network** → activates **TYPE A: Person Record — My Network**  
* If **My Family** → activates **TYPE B: Person Record — My Family**

Options:

* Cancel  
* Continue (resets conditional fields only)

**TYPE A: Person Record — My Network (External Contact)**

**1\. Identity Information**

**1.1 Avatar / Photo (Optional)**  
**Purpose:** Visual identification across the platform.  
**Behavior:**

* Empty state shows a neutral circle with auto-generated initials.  
* Supports click-to-upload or drag-and-drop.  
* On upload, the image is auto-resized, compressed, and center-cropped.

**Rules:**

* Supported formats: JPG, PNG, WEBP  
* Max size: 10 MB  
* Hovering over an uploaded avatar shows an **“X”** to remove it and revert to initials.

---

**1.2 First Name (Required)**  
**Type:** Text input  
 **Rules:**

* Required  
* 1–80 characters  
* Leading/trailing whitespace trimmed

---

**1.3 Family Name (Required)**  
**Type:** Text input  
 **Rules:**

* Required  
* 1–80 characters  
* Leading/trailing whitespace trimmed

**1.4 Full Name (System-Generated)**  
**Logic:**

* Automatically composed as **First Name \+ Family Name**  
* Used consistently across:

  * Record headers  
  * Linked Summary Cards  
  * Directories

---

**2\. Relationship Role (Contextual)**

**2.1. Directory Type**  
**Type:** dropdown  
**Options**:

* My Family  
* **My Network**( preselected ) if changes the fields are changed as **TYPE B: Person Record — My Family** 

**2.2 Relationship Type – Layer 1 (Required)**  
**Type:** Dropdown  
**Context:** card (people only)  
**Options if Entry Type is Employment:**  
Friend  
Neighbour  
Colleague/Professional contact  
Mentor/Coach  
Doctor  
Lawyer  
Other → free text

**Rules:**

* Required  
* If **Other** is selected → Layer 2 becomes mandatory


---

**2.3 Specific Role Details – Layer 2 (Conditional)**  
**Type:** Free-text input  
**Purpose:** Clarify or specialize the selected role.  
**Rules:**

* Optional for all predefined roles  
* **Required** if Layer 1 \= “Other”  
* Max 120 characters

**Examples:**

* “Lab assistant”  
* “Thesis committee member”

---

**3\. Contact Information (Optional, Repeatable)**  
Only populated fields are shown later in Linked Summary Cards.  
Empty fields are never displayed.  
---

**3.1 Email Addresses**  
**Fields:**

* Email address input  
* Primary toggle

**Behavior & Rules:**

* First added email is Primary by default  
* Multiple emails allowed  
* Each email must be unique  
* Format validation enforced

---

**3.2 Phone Numbers**  
**Fields:**

* Country code selector (flag \+ code, searchable)  
* Phone number input  
* Primary toggle

**Rules:**

* Multiple numbers allowed  
* Only one Primary number permitted  
* Format validation per country

---

**3.3 Social Media Profiles (Optional)**  
**Fields:**

* Platform dropdown (e.g. LinkedIn, Facebook, X, Instagram)  
* Handle / profile URL

**Rules:**

* Multiple profiles allowed  
* Displayed with platform icons in summary views

---

**3.4. Notes & Instructions (Optional)**  
**Purpose:** Capture human nuance and context that doesn’t belong in structured fields.  
**Type:** Multi-line free-text area  
**Examples:**

* “Prefers email over phone”  
* “Main academic contact during Master’s program”  
* “Available only during office hours”

---

**Actions & Controls**  
Save Button  
**State:**

* Disabled until all required fields are valid

**On Save:**

* Creates a new **Person Record** in *My Network*  
* Automatically links the record to the originating entry  
* Displays the **Expanded Linked Summary Card** immediately

---

Cancel / Close (X)  
**Behavior:**

* If no data entered → closes immediately  
* If unsaved data exists → shows **Unsaved Changes** modal:  
  * **Don’t Save**  
  * **Save**

---

Validation Rules (Summary)

* First Name → required  
* Family Name → required  
* Relationship Type (Layer 1\) → required  
* Layer 2 → required only if Layer 1 \= “Other”  
* Email format validation  
* Phone number validation  
* No silent data loss

---

Post-Creation Behavior

* The new contact appears:  
  * In **My Network**  
  * As an **Expanded Linked Summary Card** under the current entry

* The record becomes reusable across the platform  
* Any future edits to the record propagate everywhere it is referenced

---

System Principles (Locked)

* The Contact Record is the **single source of truth**  
* Linked Summary Cards are **read-only projections**  
* No duplication of people across entries  
* Permission-aware visibility applies at all times

   
---

**TYPE B: Person Record — My Family**

This flow is used to create a **Family Member Record** that participates in **family structure, legal logic, inheritance, guardianship, and emergency access**.  
It supports **adults, minors, children, partners, extended family, and pets**, and enforces structural consistency across the platform.  
---

**1\. Identity Information**

**1.1 Avatar / Photo (Optional**)  
**Purpose:**  
 Visual identification across the platform.  
**Behavior:**

* Empty state shows a neutral circle with auto-generated initials  
* Supports click-to-upload or drag-and-drop  
* On upload, the image is auto-resized, compressed, and center-cropped

**Rules:**

* Supported formats: JPG, PNG, WEBP  
* Max size: 10 MB  
* Hovering over an uploaded avatar shows an “X” to remove it and revert to initials

---

**1.2 First Name (Required)**  
**Type:** Text input  
**Rules:**

* Required  
* 1–80 characters  
* Leading/trailing whitespace trimmed

---

**1.3 Family Name (Required)**  
**Type:** Text input  
**Rules:**

* Required  
* 1–80 characters  
* Leading/trailing whitespace trimmed

---

**1.4 Full Name (System-Generated)**  
**Logic:**

* Automatically composed as **First Name \+ Family Name**  
* Used consistently across:

  * Record headers  
  * Linked Summary Cards  
  * My Family directory  
  * Family Tree

**1.5 Date of Birth\***

**Type:** Three-number inputs or date picker:

* Day (DD) – numeric, 1–31 (with validation by month)  
* Month (MM) – dropdown with month names written in full words  
  * January  
  * February  
  * March  
  * April  
  * May  
  * June  
  * July  
  * August  
  * September  
  * October  
  * November  
  * December  
    

✔ Display Logic (Header \+ Cards)  
Although the user selects a **full month name** when entering the date,  
 the **display everywhere** (header, linked cards, tree) uses the standard:  
**Jan 05, 1991**  
**Feb 14, 2003**  
**Dec 29, 1978**  
Format \= **MM, DD, YYYY** (3-letter abbreviation)

 **Validation:**

* Required  
* Must be a valid calendar date.  
* Cannot be in the future.  
* Reasonable range check (e.g. 1900 ≤ year ≤ current year).  
* Combined DOB powers the header display:  
  Date of Birth: Jan 05, 1991 (Age 34\)  
   (header uses 3-letter month format).

**Logic:**

* DOB is used for:  
  * Calculating current age  
  * Determining minor vs adult status of PlanOwner in the logic (rare, but needed if user becomes incapacitated early)  
  * Legal jurisdiction checks in some workflows  
  * Automated death verification in supported jurisdictions  
  * Context for family story and timeline

**2\. Relationship & Directory Control**

**2.1 Relationship Type — Layer 1 (Required)**

**Type:** Dropdown  
**Context:** Family relationships only

**Options:**

* Partner / Spouse  
* Former Partner / Former Spouse  
* Child  
* Parent  
* Sibling  
  

---

**2.2 Specific Role — Layer 2 (Conditional)**

**Type:** Dropdown or free-text (platform standard)

**Purpose:**  
 Clarifies the nature of the family relationship.

**Examples:**

A. Partner / Spouse

* Husband  
* Wife  
* Partner (Non-registered)  
* Civil Partner (Registered)  
* Fiancé / Fiancée

  ---

  B. Former Partner / Former Spouse  
* Ex-Husband  
* Ex-Wife  
* Former Partner

  ---

  C. Child  
* Biological Son  
* Biological Daughter  
* Adopted Son  
* Adopted Daughter  
* Step-Son  
* Step-Daughter  
    
  D. Parent  
* Biological Mother  
* Biological Father  
* Adoptive Mother  
* Adoptive Father  
* Step-Mother  
* Step-Father

  ---

  E. Sibling  
* Biological Brother  
* Biological Sister  
* Half-Brother  
* Half-Sister  
* Step-Brother  
* Step-Sister


**Rules:**

* Optional for predefined roles  
* Required if Relationship Type \= Extended Family or Other  
* Max 120 characters

**3\. Contact Information (Optional, Repeatable)**  
Only populated fields are shown later in Linked Summary Cards.  
Empty fields are never displayed.  
---

**3.1 Email Addresses**  
**Fields:**

* Email address input  
  

**Behavior & Rules:**

* Multiple emails allowed  
* Each email must be unique  
* Format validation enforced

---

**3.2 Phone Numbers**  
**Fields:**

* Country code selector (flag \+ code, searchable)  
* Phone number input


**Rules:**

* Multiple numbers allowed  
* Format validation per country  
* Validation of the input of numbers ( no symbols or etc

---

**3.3 Social Media Profiles (Optional)**  
**Fields:**

* Platform dropdown (e.g. LinkedIn, Facebook, X, Instagram)  
* Handle / profile URL

**Rules:**

* Multiple profiles allowed  
* Displayed with platform icons in summary views

---

**3.4. Notes & Instructions (Optional)**  
**Purpose:** Capture human nuance and context that doesn’t belong in structured fields.  
**Type:** Multi-line free-text area  
**Examples:**

* Adequate as per the chosen option above 

---

**Actions & Controls**  
Save Button  
**State:**

* Disabled until all required fields are valid

**On Save:**

* Creates a new **Person Record** in *My Family*  
* Automatically links the record to the originating entry  
* Displays the **Expanded Linked Summary Card** immediately

---

Cancel / Close (X)  
**Behavior:**

* If no data entered → closes immediately  
* If unsaved data exists → shows **Unsaved Changes** modal:  
  * **Don’t Save**  
  * **Save**

---

Validation Rules (Summary)

* First Name → required  
* Family Name → required  
* Relationship Type (Layer 1\) → required  
* Layer 2 → required   
* Email format validation  
* Phone number validation  
* No silent data loss

---

Post-Creation Behavior

* The new contact appears:  
  * In **My Family**  
  * As an **Expanded Linked Summary Card** under the current entry

* The record becomes reusable across the platform  
* Any future edits to the record propagate everywhere it is referenced

---

System Principles (Locked)

* The Contact Record is the **single source of truth**  
* Linked Summary Cards are **read-only projections**  
* No duplication of people across entries  
* Permission-aware visibility applies at all times

**F. Notes & Instructions**

**Type:** Text input  
**Label:** Notes & Instructions

**Rules:**

* Optional

**B. Credentials tab**

2. **Document Entries tab**

Tapping ‘+**Add Document’** transforms the area into an inline form (no navigation, no modal).

**Form behaviour:**

* The Add button disappears  
* A full-width rounded form expands in-place  
* Close (X) collapses form and restores Add button

**Form fields (Vault version):**

---

**4\. \+ ADD NEW ENTRY MODAL**  
When the user clicks **“+ Add Credentials ”**, the button does not remain on screen.  
 Instead, the entire area transitions into the full Document Entry Form.  
1\. Button → Form Transformation

* The **“+ Add Credentialst”** button disappears.  
* In its place, the **Entry Form** expands downward.  
* The form occupies a full-width, rounded container.  
* The list of documents below is pushed further down to make room.


  2\. Close Interaction

* A **small “X” button** appears in the **top-right corner** of the form.  
* This “X” allows the user to **collapse and close the form**.  
* When the user clicks “X”, the form collapses and the **“+ Add Credentials”** button reappears in its original position.

  3\. User Stays in Context  
* No modal is used.  
* No navigation is triggered.

  4\. Smooth Animation  
* The transition should feel like the form is *unfolding downward* from the place where the Add button was.  
* The rest of the page shifts downward in a smooth motion.

**Form Fields (detailed)**

***4.1.1. Location in PlanAfter (Required)\****  
**Type:** Progressive dropdown / hierarchical selector  
**Purpose:** Defines where in the platform this credential belongs so it remains connected to the relevant record, account, policy, service, or life area. The user selects the credential’s location step by step, using a structured hierarchy that reveals one layer at a time.

**Hierarchy shown in the flow:**

* Category  
* Sub-Category  
* Section  
* Sub-Section  
* Individual Item

  **Rules:** 

* Required  
* Each level remains collapsed until the previous level is selected  
* The selected path is shown as a breadcrumb summary in later read views

  **Hover:**  
  “Choose the location in the platform where this credential record will be stored.”


  ***4.1.2. Credential Name (Required)\****

  **Type:** Text input  
  **Placeholder:** “e.g. LastPass Vault Access”

  **Rules:** 

* Required  
* Max 120 chars  
* Free text but must not be blank

  **Hover:**  
  “Choose a name that helps you easily recognise this credential later.”


  **Notes for developers:**

  Credential Name becomes the primary label shown in:

* Credential Row Card  
* Vault Credentials Tab  
* Expanded credential card  
* Linked records across the platform

  ***4.1.3. Storage Method (Required)\****

  **Type:** Dropdown  
  **Options:**

* Password Manager  
* Save Login Info Directly  
* Physical or Digital Location

  **Rules:** 

* Required  
* Selecting a storage method immediately changes the form fields shown below  
* Only one storage method can be selected per credential entry during creation

  **Hover:**  
  “Choose how this credential is stored or referenced.”


  **Notes for developers:**

  Credential Name becomes the primary label shown in:

* Credential Row Card  
* Vault Credentials Tab  
* Expanded credential card  
* Linked records across the platform

  ***4.1.4. Adaptive Credential Builder — storage method logic***


  Every credential includes a required storage-method path that determines which fields appear next.


1. **Password Manager**

   This option is used when the credential is stored inside an external password manager and the Vault is used to point to it.

		**Fields Shown:**

1) **Select Password Manager (Required)**

   **Type:** Dropdown

   **Examples:**

* LastPass  
* 1Password  
* Bitwarden  
* Dashlane  
* Other

			**Rules:**

* Required  
* If **Other** is selected → show a free-text field: **Password Manager Name**  
* Max 80 chars

			**Hover:**  
			“Select the password manager where this credential is stored.”

2) **Password Manager Details (Required)**

   **Type:** Multi-line text area

   **Purpose:** Allows the user to specify how to find the item inside the manager.

   **Placeholder:** “Add password manager details (Vault name, item tag).”

   **Examples:** 

* Shared Family Vault  
* Personal \> Banking  
* Emergency Access Vault \> Chase Login

			**Rules:**

* **Required**  
* **Max 300 chars**

			**Hover:**  
			“Describe where this item can be found inside the password manager.”

3) **Notes & Instructions (Optional)**

   **Type:** Multi-line text area

   **Placeholder:** “Add notes and instructions about this credential.”

   **Purpose:** Captures contextual instructions that do not belong in the structured fields.

   **Example:**

   “Master key is written on the back of my passport.”

   

	      
      	     **B. Save Login Info Directly**  
This option is used when the PlanOwner wants to store login details directly inside Vault.

**Fields shown:**

1) **Username / Email (Required)**

   **Type:** Text input

   **Placeholder:** “Username / Email”

   **Rules:**

* Required  
* Max 150 chars

			**Hover:**  
“Enter the username or email used to access this account.”

2) **Password (Required)**

   **Type:** Password input

   **Behaviour:**

* Masked by default  
* Includes show / hide visibility toggle

			**Rules:**

* Required  
* Stored securely using platform encryption  
* Visibility respects user role and permission rules

			**Hover:**   
“Enter the password for this account.”

3) **Login URL (Optional)**

   **Type:** Text input

   **Rules:**

* Optional  
* Must validate as a URL if entered

			**Hover:**  
“Add the website or sign-in page used for this credential.”

4) **Notes & Instructions (Optional)**

   **Type:** Multi-line text area

   **Placeholder:** “Add notes and instructions about this credential.”

   **Purpose:** Used for recovery hints, access context, or handling instructions.

   

         **C. Physical or Digital Location**

   Use this option when the credential is not stored directly in Vault but the user wants to record where it can be found.

   

   **Fields shown:**

   

1) **Select Location Type (Required)**

			**Type:** Dropdown  
			**Examples:**

* Home safe  
* Lawyer’s office  
* Bank deposit box  
* Cloud drive  
* Notebook  
* Other

			**Rules:**

* Required  
* If Other is selected → additional explanation is required

			**Hover:**  
			“Choose where this credential or access information is stored.”

2) **Location Details (Required)**

   **Type:** Multi-line text area

   **Placeholder:** “Add location details (description, access instructions) how to find this item.”

   **Examples:**

* “Written inside black notebook in office desk drawer.”  
* “Stored in Google Drive under Family \> Emergency Access.”  
* “Printed and sealed in red folder in home safe.”

			**Rules:**

* Required  
* Max 300 chars

			**Hover:**  
“Describe exactly where this credential can be found and how to access it.”

3) **Notes & Instructions (Optional)**

   **Type:** Multi-line text area

   **Placeholder:** “Add notes and instructions about this credential.”

   **Purpose:** Used for additional access guidance or warnings.

   

   

   ***4.2. Inline summary of the selected platform location***

   

   Once the location path is chosen, the form displays it as a breadcrumb block under **Location in Platform**.

   

   **Format:**  
    Assets & Liabilities  
    • Assets  
    • Financial Accounts & Instruments  
    • Bank Accounts  
    • My Main Bank Account

   This preserves provenance and confirms where the credential will live before saving.

   ***4.3. Save / Continue behaviour***

   

   ### **Step 1 — Set location in platform**

   The first state of the form is dedicated to choosing the credential’s location in the platform. Once all required levels are selected, the user taps **Continue**.

   ### **Step 2 — Complete credential details**

The form then reveals the credential-specific fields:

* Credential Name  
* Storage Method  
* Method-specific fields  
* Notes & Instructions

The primary action changes from **Continue** to **Save**.

***4.4. Save / Continue behaviour***

**State:** Disabled until all required fields are valid  
**On Save:**

* Creates a new Credential Entry in Vault  
* Links it to the selected record in the platform  
* Displays it immediately as a Credential Row Card in the Credentials list  
* Uses the selected storage method label in the collapsed summary  
    
  ***4.5. Cancel / Close (X)***  
    
  **Behaviour:**  
  If no data has been entered → closes immediately  
  If unsaved data exists → should use the platform-standard unsaved changes confirmation pattern  
    
  ***4.6. Validation Rules (Summary)***  
    
* Location in PlanAfter → required  
* Credential Name → required  
* Storage Method → required  
* Password Manager Details → required when storage method \= Password Manager  
* Username / Email → required when storage method \= Save Login Info Directly  
* Password → required when storage method \= Save Login Info Directly  
* Location Type → required when storage method \= Physical or Digital Location  
* Location Details → required when storage method \= Physical or Digital Location  
* Login URL → optional, but must validate if entered  
* No silent data loss

  ***4.7. Post-Creation Behavior***

The new credential appears:

* In the **Credentials** tab of the Vault  
* As a linked credential under its selected platform location  
* The credential becomes one shared record across the platform.  
* Editing it later updates the same record everywhere it is linked.

---

**5\. EMPTY STATE BEHAVIOUR (VAULT HAS NO ENTRIES)** 

If no documents exist in Vault:

* Narrative header is shown  
* Divider  
* **Add Document/Add Credentials** CTA is shown  
* Text ‘No Entry Added’ displayed 

---

## **6\. SYSTEM PRINCIPLES (LOCKED)**

* **One Document Entry/One Credential \= one source of truth**  
  If a document/credential is linked in multiple places, it is never duplicated.  
* **Edit once, reflect everywhere**  
  Updates propagate across all linked records and views.  
* **Inline-first interaction**  
  Expand, edit, and manage entries without leaving context.  
* **Permission-aware visibility**  
  What a user can see/do in Vault matches their access rules across the platform.

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,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>

[image4]: <data:image/png;base64,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>

[image5]: <data:image/png;base64,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>

[image6]: <data:image/png;base64,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PdStt9567tvf/rbbZZdd3Lbbbuv+93//133zm990G264oRenRx991IvgRRdd5CUQgSMLZ+3kssggmsB99atfLZZx3CgLBY5jy7p8j+uuu6647n777efb8u26664+0xgK3K9//Wt3yCGHJDqKsE74/Fe/+pUbOHCgF1te+853vuOPE69xrg466CC34447FrOBdO7gc5HbHXbYobhNE7iDDz7YSxvHieWXXnrJ7zv7ZTc935Ft8H04T4cddpjfz/iPgxBCiNalRODydBTELU3iMsnC1UhW0TyBKwMCFrZ5C8vTSBPAegQuFot6QLCo5hw7dqx7+OGH3bBhw9wvTj3Vbbzxxm7llVZySy21lNtss83cpptu6qsOv/a1r/ks1Nprr+1FDmnZfPPNvdAhI1/60pfcmmuu6b7//e97Cdxqq628vPXv39+3k0N4yMTF+1EriA3SyGdRzUsZGUGTKRO4xRdf3H8+Va6U830pN9FDSjvyN4oJHJLF8syZMxOfSTnfM26DyPZ57YQTTvDHkvNDdSjHiGplXkPGbNvsE1lM26YJ3LLLLusFDgmknONLG0LWRwK56RHWpZde2pevttpq/jlCH/9xEEII0bogcFC2LVwgbwhVLHBZ9DStRFbRPIGrIGD1Uo3AxfLmBW7ChMyqIdk2mTLajb3xxhtuyBNP+IwOWbYtttjC/fu//7v74he/6GUEuaCKFGFC5sgs/eQnP/EiQfXoaaed5v77v//bff7zn3f/9m//5vbcc0931FFHuWuuucb1y8sU67IeHRxuvPFG/754f2rBBO7KK690K664oi9DepC5UOAMhkL5+te/7g444IDiuhx3e53nZLX4juPGjUt8HiCeq6++elH+kFdEL65CHZaXYNs+rLDCCj7jZgJ38cUXl3yuF7j8DR0KHGLGPnOjX3LJJV74yI6yPhlDyufPn+/PjQROCCHaC/6Ox9WoHR3v+UcTOmXguhlpGbVyGbjukCZvceeFWODIvk3IC1wWGTj24Y477vBSguxsv/32Pmu2xhpreGn73Oc+VxQ4xGennXZy+++/vxcx2p1deumlvtqVarzhw4d7OaOBPxk72sMhI4jckUce6TNbCN1aa63lqweRNyTu+uuvT+xXtZjAsYzs/OxnP/OZQZ6HAscykseQJ8svv7yvfrTyUIRNylZddVXfSSP+PIjbHiJmZNli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hBA9iwbybVBUW4U6QVWo7U1O8iaEEKLnqTcDV7YKtfA8Fr1ayCqaInDxLAzlBK5V28DNmjXLXXfddYnynuTiiy/2+3Heeef54xW/3h1+9rOfJcq6y8CBA92o11+XuAkhhOhx6hU4I86elSVet/A83l6vELhJQTu4UOBKqlBpA9eCVahTpkxxu+++e6Icpk2b5lZddVW3+uqrux122MEts8wy7tlnn02sFzJnzhy3yy67JMorsfnmm/v9+OUvf+mlN369Oyy++OKJsm6Rv3nYrwcffDBxUwkhhBCNpscFrgtsW20vcNVWoTYiA/fWW2+5uXPnulGjRvnnM2fOdC+++KL/bFuHfRo5cqT/bCvjYmAfX3311YTAcYHwyOubbrqp32b4mSeeeKK77777is/5juPGjSs+Hz16tNt6663d+PHj/fP58+e7l19+2Y0dO7a4Dq+x36+//rp/3QSOC5JyLliOz+TJk93zzz/vX7P3IpUvvPCC/47sY7hvIaHALViwwL300kvF72a8/fbb7pVXXvH7YPtr5a+99pqX0UoCZ/vCDROWjxkzxn8e77cyts85YLsLFy70n8k6fI94u0IIIYSRlcBVlDheC8Qs7qxg5TFZRZ8TuCWXXNLttddebtttt3V77rmn+973vufOOftst/TSSxe3v8Yaa7hzzz3XrbLKKu62227zZcsvv7zbcsstfZVlKHA33HBDUcY22WQTv7/z5s1z3//+993tt9/uPwP5+Na3vuUfH3/8cbfFFlu4448/3u24447+fcjOWmut5T8TGfvmN7/pjjvuOLfzzju7E044objfbJP3IYgmcHwPLk4+c8MNN3R77LGHOzv/fZZbbjn/vqlTp7oVVljBnXTSSW6nnXZye++9t9+P+LiACdzs2bPdsssu637+85/7z+FmoPzyyy93a665pt/frbbaqrj+D3/4Q7fvvvv6fVtppZUqChzH8cwzz3Qbb7yxF1vK3njjDfejH/3If2cylzNmzPDlSyyxhDv22GPdrrvu6g466CB/fDn+fDdENd62EEIIAbHAmcQhcKHExQJnEldJ6Oolq+hzAvfVr361KDAIiC0jT/379y9Zl4vgO9/5jl9GPKzcBO7mm2/2UmTla6+9tn9ENBCnfv36uXXXXdeX7b///r7N2vbbb+8zfuHnkHWinGXa1t1yyy3F17773e/6Y4DA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Dz/8cOLEtyLf+973EmXLLLNMoqw7bLfddv6ijsu7y/rrr58oMwYOHJgoa3dWWGEF/7jffvslXquWGTNmuPXWW8/NmTMn8Zqx9dZbJ8qq4Zvf/KZ/fP311/0ftPj1VuGZZ57x939cHjJ69OhEWTUsvvjiibJmw3dhqIO4vJV56KGH3Lx58xLlPc1vf/vbRFmr8vjjjyfKquHVV19NlPGb2b9//0Q5fzvisnLstNNObuzYsYnyNJZaain/OGLECLftttsmXq+WhQsXugEDBhSfH3jggYl1sia7DFxSwOolq2iKwMWZt3JVqJmNA5dblHmzC/Lwww93zz33XOKktyrtJHCV2GijjRJl7Y4JXKPprsAZF1xwgbv11lsT5a3CAQcc4J5//vlEecjFF1+cKKuGVhS4Sy65xN1www2J8lZmyy239P9sxOU9TTsJHMIUl1XDOeeckyjj93KVVVbxQmRlnI/FFlsssW45uiNw9UIGj320/e4JgatnHDhbtuexgJmX2Gux9HVFVtH7BS5X2tvULkgev/71ryd+EJZbbrni8pJLLukf+U9o2WWX9a898sgjvuz88893L730kl/mD7EtG2T4yMhwsy299NLFVPSLL77ot4V88X0o4wZkf77xjW+4P/zhD76MC511KPva175WUeDOPvts/12WX355d+211/qyBQsW+NdXXnlld9JJJxW/C/8NkoVkHywbliZwRx99tBcTtjtt2jRfdvDBB7tVV13Vl11xxRW+bPXVV3cbb7yxPzbcJJStttpq/pF111lnHf9ZZH/4o8sP6ZprrulfP/7444ufYceH/d155539cbN95j/+tdZay7/Gd3r55Zd9+R577OFWXHFF/9nDhw8v2f/LLrvM/epXv/Lbfu211/x1xrocy8cee8yvM3fuXL8/7MOzzz7rjjnmGF9+5JFHJr4735PjxDY4N0sssYQ/N9/97neLAmd/lL7//e+7yy+/3B9nzivXM+/hx8+2y7XBMbH95XyZZHAOf/7zn/vvy/qWldtss818No1jwHVEGftn146dz7333tuLAe/lDxZ/OB999FH/Po7VmWee6dfj/PB9eOT5Cy+84PbZZx//Pr4fVS2U88eNa5jPuOeee3wZ9yrnle/IualUJbPLLrv49/LZfAZl3C9kDSjj2PPfud2TnBeOAdcz+8f1xXt23HFH/5mHHHKI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FmuscD18LaGlwk4BXCxwURRFURSdVu2/UOsZuH8YAFz7L9Qe3gJwg9AD3OhFvuWJwc3KxKLkvpCiKIqiKIparXuNSMFbD3AjiOvha1Ybjm3jXCqcCcD1lrce4AriAnBRFEVRFB1XiwNcB2j9cUPYO9zXH7dUOBOAmyxwhwD3L2sArn+RbwAuiqIoiqJNWhzgRmp+33Rs/X4uAK4scOsALha40+lPf/rTwc9//vMr9kdRFEXRedYuAVwf51LhTADuLJdQb7rppoPf//730/bnPve5g1//+tdXHENf/epXJ3+p/f5N+sIXvnDw9a997eCzn/3sFb998pOf3DrOe++994p920raf/WrX0164oknrvg9iqIois6rGC9OBXDNZw9jPZT1263P0x7czgXAtRa4dQB3NZZQAdzdd989bbcAB3Tuv//+gx//+MfTdcHWt7/97ek3VizbfvMdAPrO0b2KUnGDs9tvv336dH5/7QI496ZiffOb35wgy2/2feMb35i+u/7FixcPHnzwwem373znO1Pa/vCHPxx873vfm/b97Gc/m/LD9R999NGDBx54YErnT37yk+k6ly5dOnjyySenSut4efqtb31rcvDru/3y1jX9I8c+afJdXvdpj6IoiqJ9kHF9DuDaf6DOAlyjHtx6iOv3DdXEtfcAB4T614gUxLUA10LcUgB36623Hnz/+98/+OMf/3gEcOAHBIGnT33qUxMosaD5DrjsA0P2+Q2kFSypHG38YAtA+b0HoQK4xx57bPpdRfriF794BH6/+93vprS5xmc+85mD3/zmN9N5YM71f/vb307H2cc6CfC+/vWvH/yPVTy//OUvp3S6rzvuuGPKV3nsd/dx2223TZ8AEPTZb9t5N9988xSn8yoNfb5FURRF0T7I+HcZvB3XArclwJ1US4WdAbj2Rb40Arh/WgjgfFrqLIADS/X7fffdN32CGWD1i1/84uDChQsTfAEpli+AafsrX/nK0XIsSSeoevzxxydLFjBsr90CnO/OrWvfc889Bxc/8YmjZ9YK1Mi1fI4A7pZbbrnMCkh33nnnlO4COJX0kUcemX6zH6TZL+/t+/SnPz2lBeTJH5W8jS+KoiiK9kXArbe+zVngyjgUgNsytO+Bm+BtzRLqZZ4YVpkMPvrCOo4K4DwnBswA3Je//OUpHfbXs2sFcGVxsy19LFzS5DsQ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>