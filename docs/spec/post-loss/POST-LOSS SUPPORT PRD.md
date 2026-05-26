**POST-LOSS SUPPORT**  
SECTION SPECIFICATION (FINAL — SECTIONS 1–4)  
---

### **1\. CONTEXT AND POSITION IN THE PLATFORM**

PlanAfter is built around three interconnected pillars: life organization and legacy planning during life, secure transfer of information and intentions, and post-loss support.

**Post-Loss Support** is a core pillar of the platform, not a secondary feature. It is designed to support users in two distinct contexts:

* **During life**, when a **Plan Owner** experiences the loss of someone in their personal network and needs emotional, practical, and administrative guidance.  
* **After death**, when the **Plan Owner’s plan is activated** and trusted users, such as **Executors, Beneficiaries, and Contributors**, enter a structured support environment designed to help them navigate the period after the Plan Owner’s death.

Post-Loss Support is positioned as a **top-level section in the main sidebar**, alongside **My Family & Network, My Plan, Vault, Tasks & Reminders,** and **Plans Shared With Me**.

When accessed, the section opens its own **dedicated directory page** and activates a **local navigation structure**, similarly to other major sections such as **Assets & Liabilities**. It is not nested under My Plan. Instead, it operates as a **parallel, event-driven environment**, triggered either by a personal loss experienced by the Plan Owner or by the activation of the Plan Owner’s post-death experience.

The section is designed to:

* orient the user during a sensitive and emotionally difficult moment,  
* provide clear and relevant next steps without overwhelming them,  
* and offer immediate access to personalized plans, guidance systems, and practical tools.

The **dashboard itself does not contain deep content**. It functions as a **routing, orientation, and prioritization layer**, guiding the user toward the most relevant internal flows.

### **2\. CORE FUNCTION OF THE SECTION**

Post-Loss Support combines five tightly integrated product layers into a single unified experience:

1. **Loss Planner Tool (Top Module)- Hero Card — Personalized Care Plan Tool**  
2. **Active Loss Plans (Dynamic List)**  
3. **Support & Guidance**   
   * Emotional Support  
   * Practical Support  
   * Legal & Administrative Support  
4. **Quick Actions (Tools)**  
   * Obituary  
   * Memorialization Page  
5. **Resources & Learning Hub (Bottom Section)**

---

###  **3\. ACCESS PATHS AND ACTIVATION LOGIC**

### 

**3.1. Post-Loss Support can be accessed through two primary product paths:**

**Path A — Personal Loss Support (Plan Owner)**

The **Plan Owner** can access Post-Loss Support at any time, without requiring plan activation.

This mode is used when:

* the user has experienced a loss in their personal life;  
* and they need guidance, structure, support, and tools to navigate that loss.

In this mode, the user:

* selects an existing person record or creates a new one,  
* marks the person as deceased,  
* adds the date of death and other relevant context,  
* and initiates a personalized support plan.

A Plan Owner may maintain **multiple Personalized Post-Loss Plans in parallel**, each corresponding to a different deceased person.

---

**Path B — Activated Plan (Post-Death Experience)**

After the **Plan Owner’s death** and **plan activation**, selected users, such as:

* **Executors**  
* **Beneficiaries**  
* **Contributors**

are granted **role-based access** to the Post-Loss environment.

In this mode, the experience is **initially pre-configured by the Plan Owner**, but may be further **tailored by the Executor**, who can answer a short contextual questionnaire so the system can understand **when and how the Plan Owner died** and adapt the support plan accordingly.

This ensures that the post-loss experience is not only pre-planned, but also adjusted to the real context of the loss.

In this mode:

* access is restricted by permissions,  
* users see only what is relevant to their role,  
* and the environment reflects both the Plan Owner’s preparation and the contextual updates made after activation.

**3.2. Key System Rule**

Every **Personalized Post-Loss Care Plan** is: **person-based, not abstract**

Each experience is anchored to a **deceased person record**, which serves as the central reference point for:

* personalized plans,  
* linked documents,  
* memorial content,  
* and role-based access logic.

---

### **4\. ROLE-BASED VISIBILITY**

Access to Post-Loss Support is strictly controlled and varies by user role.

**4.1 Plan Owner**  
The **Plan Owner** has full control and visibility.  
They can:

* create and manage deceased person records, ( including add, edit, delete archive entries in it \- like death certification etc.)   
* create and edit personalized support plans,  
* access all guidance systems,  
* use all action tools, including obituary and memorial creation,  
* view and manage all content and progress,  
* assign tasks,  
* and manage workflows across the section.

**4.2 Executor**  
Executors have limited access before activation and full operational access after activation.  
After activation, Executors can:

* view and manage the personalized plan,  
* access legal, administrative, and practical steps,  
* assign and manage tasks,  
* coordinate actions across participants (Contributors) ,  
* access documents within their permission scope,  
* and tailor the active post-loss experience based on the real death context.

Executors cannot:

* create independent new plans unrelated to the existing case,  
* or access restricted or private information outside their permission scope.


**4.3 Beneficiary**  
Beneficiaries have restricted, role-specific visibility after the PlanOwner dies and his plan is in Post mortem activation (before that when clicking on Post Lost support- \> conversion CTA for planOwner).  
They can:

* view only the parts of the plan relevant to them,  
* access assigned tasks or information,  
* and view selected documents and guidance made available to them.

They cannot:

* access full estate data,  
* view other beneficiaries or internal workflows,  
* or modify core plan structures.


**4.4 Contributor**  
Contributors have limited, permission-based access.  
They may:

* suggest edits,  
* upload supporting content,  
* and assist with specific tasks or parts of the workflow.

All contributions:

* require approval,  
* and do not overwrite authoritative data directly.


**4.5 Public (Future Scope)**  
In future iterations, limited public access may be enabled for:

* public memorial pages,  
* and selected shared content.

No sensitive data is exposed in this mode.

### **5\. Structural Overview of the Dashboard**

The Post-Loss Dashboard is composed of five primary zones:

**I. Greeting line** 

**II. Loss Planner Tool (Top Module)- Hero Card — Personalized Care Plan Tool**

The **Loss Planner** is a guided entry tool that helps the user define the loss context, including **who was lost, when the loss occurred, and what kind of support is needed**. Based on this input, it initiates a personalized support flow. The section generates **dynamic, person-specific support plans** based on user input. Each plan is anchored to a **deceased person's record** and evolves over time. Once a plan is generated, it is placed in the Active Loss Plans’ section. The hero card always remains available to the user in case the user needs to generate a new plan.

**III. Active Loss Plans (Dynamic List)**

A Plan Owner may have **one, two, or multiple Personalized Post-Loss Plans in parallel**, each linked to a different deceased person.

Within a personalized plan, the Plan Owner can:

* add steps from the broader step systems in **Emotional Support**, **Practical Support**, or **Legal & Administrative Support**,  
* mark steps as done ( They move in tab DONE) ,  
* remove steps from the active plan ( they move in Tab REMOVED),  
* and continue shaping the plan over time according to their needs. ( add from TAb ALL) 

  Active loss plans should be displayed as a list in the Post-Lost Support section but clicking to view an individual plan should redirect the user to the Care Plan tab of that person’s record.

**IV. Quick Actions (Tools)\-** The section also includes dedicated tools for key post-loss actions:

* Obituary creation  
  * Memorial page creation and management

    Obituary and Memorial Page creation are part of the Care Plan steps but can also be accessed via the quick actions tool.  These tools can be used as standalone entry points or as part of a personalized plan and are linked to the person’s record . 

**V. Resources & Learning Hub (Bottom Section)**

A broader content layer supports users with additional knowledge and guidance through:

* articles,  
* guides,  
* webinars,  
* and external resources.

This layer supports both **exploration** and **deeper learning** beyond the structured step systems and personalized plans.

### **6\. DETAILED SPECIFICATION:** 

##### **6.1. Greeting Line**

**6.1.1. Purpose**

The Greeting Line is the emotional entry point of the Post-Loss Support dashboard. Its function is not instructional, operational, or system-driven. Its function is to gently orient the user and establish the emotional tone of the section from the first second of entry. It should communicate presence, reassurance and calm acknowledgment. It should never behave like a dashboard header, KPI surface, or status component. It is intentionally minimal and non-interactive.

The Greeting Line serves as a soft emotional bridge between:

* the user’s emotional state,  
* the structured support environment,  
* and the practical actions that may follow.

**6.1.2 Placement**

The Greeting Line appears at the very top of the main content column, above the Hero Card and below the main app navigation and page frame. It is always the first textual element in the content hierarchy.

**6.1.3 Visual Structure**

* Single line of text  
* No icon  
* No avatar  
* No counters  
* No badge  
* No CTA  
* No tooltip  
* No metadata

It should visually read more like a personal line of support than a page title.

**6.1.4 Content Logic**

The content changes dynamically based on user role, plan state, activation state,  
and whether the user is entering a personal-loss flow or an invited post-death experience.

**66.1.5 States**

**Empty / No active plan**

* “We’re here to help you through this, \[Name\].”  
* Used when the Plan Owner has no active Personalized Post-Loss Plan, has not yet started the Loss Planner, or is entering the section for the first time in personal-loss mode.

**Active plan**

* “You’re not alone in this, \[Name\].”  
* Used when the Plan Owner has at least one active Personalized Post-Loss Plan, or returns to an existing support experience already in progress.

**Invited user / Post-loss user**

* “\[Deceased Name\] prepared some things for you.”  
* Used when an invited user enters the activated Post-Loss environment after the Plan Owner’s death, including Executors, Beneficiaries, or other approved participants.

**Executor post-activation**

* The same emotional rule applies, but the text may be slightly contextualized to reflect operational access without becoming procedural.  
*  Example direction: “\[Deceased Name\] prepared some things for you.” or  
   “We’ve gathered what may help you next.”

**Beneficiary restricted**

* Beneficiaries should see a calm orientation line that acknowledges access without implying control.  
* The tone must remain supportive and role-safe.

**6.1.6 Behavior**

* Non-interactive  
* No hover state  
* No click behavior  
* No expand/collapse  
* No inline editing

It updates automatically when a plan is created, a user enters through activation, role context changes, or a different deceased person context becomes active.

**6.1.7 UX Rules (Critical)**

Must:

* feel human, calm, and supportive  
* feel emotionally aware without sounding sentimental  
* be short enough to read instantly  
* work for both high-distress and low-engagement states

Must not:

* sound like product onboarding  
* sound like a case-management tool  
* include counts, deadlines, progress, or tasks  
* use exclamation marks  
* use urgent verbs  
* sound transactional or administrative

The Greeting Line is emotional framing, not interface instruction.

---

##### **6.2. Loss Planner Tool (Top Module)- Hero Card — Personalized Care Plan Tool**

**6.2.1 Purpose**

The **Hero Card** is the primary orchestration component of the Post-Loss Support dashboard.  
It is the main entry point for:

* starting a new Personalized Post-Loss Plan,  
* resuming an existing plan,  
* reviewing the most important current context,  
* and connecting the support experience to the correct deceased Person Record.

This card is not just a CTA surface. It is the **top-level control layer** of the section and the gateway into the dynamic plan engine, which compiles relevant steps from:

* Emotional Support,  
* Practical Support,  
* Legal & Administrative Support,  
* Obituary,  
* and Memorialization.

It must feel calm, focused, and emotionally safe, while still being structurally clear and operationally useful. This is consistent with PlanAfter’s broader UX mission: progressive guidance, low friction, and emotionally intelligent support.д

It should reduce cognitive load by answering five questions quickly:

* Who is this about?  
* What phase are we in?  
* What is already in motion?  
* What matters most now?  
* Where should I go next?

**6.2.2 Placement on the Dashboard**

The Hero Card is placed directly below the Greeting Line, at the top of the main center content column, above the Active Loss Plans list  and above the Support & Guidance entry points. It is always the first major content block on the page and carries the highest visual priority.

**6.2.3 Visibility by User Role**

**A. Plan Owner**

The Plan Owner sees the full Hero Card in all relevant states:

* no plan yet,  
* one active plan,  
* multiple active plans,  
* paused plan,  
* incomplete plan,  
* or completed plan.

The Plan Owner can:

* start personalization,  
* select an existing person,  
* create a new person,  
* mark a person as deceased,  
* create a new Personalized Plan,  
* resume an existing plan,  
* edit personalization inputs,  
* switch between plans,  
* and open the linked Person Record.

**B. Executor**

The Executor sees an adapted Hero Card only after post-mortem activation.

The Executor can:

* continue the active post-loss experience within permission scope,  
* review contextual death information,  
* complete or update missing context if permitted,  
* review current phase,  
* see top-priority actions,  
* open the linked deceased person record if access is granted,  
* and continue into the appropriate step flow.

The Executor cannot:

* create unrelated new plans,  
* replace Plan Owner authority,  
* or reconfigure unrelated support flows.

**C. Beneficiary**

The Beneficiary does not see the full Plan Owner Hero Card.

Before activation: clicking Post-Loss Support leads to a restricted or conversion state.

After activation: if content is relevant to them, they see a simplified, role-safe version of the Hero Card.

They can:

* view shared or assigned content,  
* see high-level context,  
* continue into relevant guidance or tasks,  
* and access only what has been made visible to them.

They cannot:

* edit the plan,  
* change personalization inputs,  
* switch plans,  
* or view the broader workflow.

**D. Contributor**

The Contributor sees a limited contextual version only if they have been assigned a scoped task or have temporary support access. They may see who the plan relates to, what they were invited to help with and the next relevant contribution entry point. They do not own the plan and cannot configure it.

**6.2.4 Core States of the Hero Card**

The Hero Card supports the following major states:

* **Empty State — No Personalized Plan exists**  
  Used when the Plan Owner has not yet initiated a loss support experience.  
* **Single Active Plan State**  
  Used when one active Personalized Post-Loss Plan exists.  
* **Multiple Active Plans State**  
  Used when multiple deceased-person-based plans exist in parallel.  
* **Paused / Incomplete Plan State**  
  Used when a plan exists but key inputs or steps remain incomplete.  
* **Executor Post-Activation State**  
  Used after activation when the Executor is managing the active support experience.  
* **Beneficiary Restricted State**  
  Used after activation when a Beneficiary has limited, relevant access only.  
* **Contributor Restricted State**  
  Used when the user is participating only in a narrow, permission-based support scope.

Each state changes visible information, available actions, editing permissions, message tone and routing behavior.

**6.2.5.1 Visual Structure of the Hero Card**

The Hero Card contains five internal zones:

* **Zone A — Identity / Context Bar**  
   Displays the identity of the current support plan and the linked deceased person.  
* **Zone B — Phase and Time Context**  
   Displays where the user is in the post-loss journey.  
* **Zone C — Plan Summary / Progress**  
   Displays a compact overview of active progress without over-emphasizing productivity metrics.  
* **Zone D — Priority Preview**  
   Displays the next 2–3 most relevant actions or step priorities.  
* **Zone E — Action Area**  
   Displays the primary and secondary actions available to the current user.

**6.2.5.2 Zone A — Identity / Context Bar**

**Purpose**

Zone A anchors the plan to the correct deceased person and immediately answers ‘Who is this plan for?’. This is critical because the system is person-based, not abstract. In multiple-plan contexts, this zone becomes the main discriminator between plans.

**Content**

Zone A may include:

* plan label,  
* deceased person name,  
* relationship label,  
* and optionally a link to the connected Person Record if permission allows.

Example content patterns:  
 “For: John Johnson”  
 “Partner”  
 “Linked to Person Record”

**Rules**

* Must always identify the relevant deceased person clearly.  
* Must not feel like a CRM header.  
* Must not expose unrelated family-network data.  
* Must respect role permissions.

**6.2.5.3. Zone B — Phase and Time Context**

**Purpose**

Zone B explains where the user is in the journey and provides temporal orientation without creating pressure. It helps the user understand what stage they are in, why certain support items are being surfaced and why the current plan is shaped the way it is.

**Content**

This zone may include phase badge, time since death, or contextual phase framing.

**Examples:**

* ‘Immediate’  
* ‘Early Days’  
* ‘First Weeks’  
* ‘Ongoing’

Examples of time context:

* “3 days since John passed”  
* “Within the first weeks”  
* “Ongoing support”

**Rules**

The phase should be visible and understandable at a glance. The wording must be humane and non-clinical. It should orient, not alarm. This area must not present aggressive countdown logic on the dashboard. Deadlines may exist in the plan, but the Hero Card should frame time with care.

**6.2.5.4 Zone C — Plan Summary / Progress**

**Purpose**

Zone C gives the user a compact understanding of the current state of the plan. It helps answer:

* What is already in motion?  
* How much has been handled?  
* What kind of support exists here?

**Content**

This zone may include:

* number of total active steps,  
* number of completed steps,  
* active categories represented,  
* completion summary,  
* or a subtle visual progress bar element.

Preferred pattern:  
 “N of N steps done”

Example:  
 “3 of 24 steps done”

A visual progress bar may be shown as a secondary supporting element to help the user understand overall movement through the plan at a glance.

**Rules**

* Progress is secondary information. It must not dominate the card. It must not feel like a productivity dashboard. It must not pressure the user with performance framing.  
* If a visual progress bar is used, it must remain quiet, supportive, and visually lightweight.  
  It must support the written summary, not replace it.  
* Where relevant, the summary may also reference:  
  * whether emotional resources are tailored,  
  * whether documents are linked,  
  * or whether memorialization has started.

**6.2.5.5. Zone D — Priority Preview**

**Purpose**

Zone D shows the next 2–3 most relevant actions so the user does not need to scan the full system. It is designed to reduce overwhelm by surfacing only what matters most now.

**Content**

This zone may display the top three practical steps, the most urgent legal or administrative items or role-relevant next actions.

**Examples:**

* Register the death certificate  
* Notify the employer  
* Apply for death benefit

Items may include an urgency marker, a status marker or short contextual label.

**Rules:**

* The list must be short.  
* Maximum 2–3 items visible.  
* Items should be prioritized by real relevance, not simply chronology.  
* Urgency may be shown, but not dramatized.  
* This is a preview, not a task table.

If the user is a Beneficiary or Contributor, only allowed actions should appear.

**6.2.5.6. Zone E — Action Area**

**Purpose**

Zone E gives the user a clear next step without forcing them to interpret the entire interface. It should contain one primary CTA.

**Primary Actions by State**

* **Empty State**  
   Primary CTA: Start / Create Personalized Care Plan  
* **Single Active Plan**  
   Primary CTA: Continue Plan  
* **Paused / Incomplete Plan**  
   Primary CTA: Resume Setup or Continue Plan  
* **Multiple Plans**  
   Primary CTA: View All Plans or Continue Selected Plan  
* **Executor Post-Activation**  
   Primary CTA: Continue Support Plan  
* **Beneficiary Restricted**  
   Primary CTA: View Shared Guidance or See What Was Prepared for You  
* **Contributor Restricted**  
   Primary CTA: View Assigned Area or Continue Contribution

**Rules**

* There must always be one clearly dominant action  
* The action set must remain role-safe and context-aware.

**6.2.6. Empty State — No Personalized Plan Exists**

**Purpose**

This state supports the first entry into Post-Loss Support for the Plan Owner. The goal is to help the user begin gently and with minimal friction.

**Content Structure**

* Headline: “Create Your Personalized Care Plan”  
* Supportive body copy: “Tell us about your loss so we can guide you through this.”  
* Primary CTA: “Start →”  
* Optional secondary action: ‘Learn about Post-Loss Support”

**Behavior**

Clicking Start opens the Personalization Flow. The state should feel invitational, not demanding.  
The user should understand that the system will guide them gradually.

**UX Rules**

* Must not expose empty dashboards with too many placeholders.  
* Must not feel barren or unfinished.  
* Must reduce fear of starting.  
* Must clearly communicate that support will be personalized.

**6.2.7. Personalization Flow** 

**6.2.7.1. Purpose** 

The Personalization Flow is the intake sequence that initializes a new Personalized Post-Loss Care Plan. It is triggered from the Hero Card / Care Plan Overview Card when the user clicks  “**Start →”**

The flow exists to identify who the loss relates to, anchor the experience to the correct Person Record, understand the death context, capture the user’s immediate support needs and generate a personalized starting plan that combines  Practical Support, Emotional Support, Legal & Administrative Support and linked tools such as Obituary and Memorialization.

The default structure is:  
 Q1 → Q2 → Q3 → Q4 → Q5 → Confirmation.

**6.2.7.2. Entry Point**

The flow is launched from Care Plan Overview Card — Empty State  
Primary CTA: “**Start →” .**Once triggered, the user leaves the main directory page and enters a dedicated guided setup flow. The flow should open in a focused central panel.The rest of the section UI should recede visually.

**6.2.7.3. Flow Design Principles**

The Personalization Flow must follow these principles:

* **Progressive disclosure**  
  Only one question is emphasized at a time.  
* **Calm pacing**  
  The user should never see a dense intake form with all fields visible at once.  
* **Minimal required input**  
  The first version of the plan should require only the information needed to create a relevant starting plan.  
* **Person-record authority**  
  The plan must be anchored to a Person Record, not free text.  
* **Editable later**  
  All answers, except certain system-linked relationship structures where restricted, can be revisited later from plan settings or record editing.  
* **Supportive framing**  
  The copy around the questions should feel compassionate and clear, without sounding sentimental or vague.

**6.2.7.4. Global Layout**

Layout Structure

**Top area**

* Step indicator  
* Back action  
* Optional save / exit action  
* Quiet progress pattern such as: Step 1 of 5

**Main area**

* Question title  
* Short supporting line  
* Input field(s)  
* Optional helper content  
* Primary CTA  
* Secondary CTA where appropriate

**Bottom behavior**

* Primary CTA remains consistent in placement  
* Disabled until required field is completed  
* Never uses urgent language such as “Complete now”

**6.2.7.5. Step Indicator**

The flow should show a subtle progress indicator. Recommended pattern: **Step 1 of 5, Step 2 of 5,** etc.

**6.2.7.6. Question 1 — Who did you lose?**

This is the first intake question and defines the broad relationship context of the loss.

* **Purpose:** Q1 determines the relationship category, the emotional support profile, the content routing logic  and the available existing person records shown in Q2.  
* **Field Type:** Single-select dropdown  
  **Field Label:** ‘Who did you lose?’  
* **Hover Text:**  ‘Choose the person this support plan is for.’  
* **Placeholder:** ‘Select relationship’  
* **Options and System Effect:**  
  * **Partner / Spouse**  
    Effect: partner-loss-specific emotional resources,  
    financial stabilization and shared-life disruption more strongly surfaced.  
  * **Child (at any age)**  
    Effect: child-loss resources, caregiver and family support content,  
    guardianship-related steps where applicable.  
  * **Parent**  
    Effect: inheritance and estate-related steps more strongly surfaced.  
  * **Sibling / Friend / Other**  
    Effect: general post-loss resources, more flexible practical guidance.  
  * **Pet**  
    Effect: pet-loss-specific resources, no estate or legal modules unless manually added later.  
* **Validation Rules:** This field is required. The user cannot continue without selecting one category.  
* **Interaction Rules:** Once Q1 is answered: Q2 is filtered to show only Person Records that match the selected relationship category. If the category changes after Q2 has already been answered: the selected person in Q2 should reset unless still valid under the new category.

**6.2.7.7. Question 2 — Select the specific person**

Q2 is a searchable dropdown that appears immediately after Q1 and lists existing Person Records from the selected category, with inline Create new record behavior.

* **Purpose:** Q2 anchors the plan to the actual deceased person.This is a critical system rule:every Personalized Post-Loss Care Plan is person-based, not abstract.  
* **Field Type:** Searchable single-select dropdown  
* **Field Label: ‘**Select the specific person’  
* **Hover Text: ‘**Search an existing person record or create a new one.’  
* **Rules:**   
  * If Existing Record Is Selected \- The system should perform the following actions automatically:  
    * Life Status on the Person Record changes to deceased  
    * Date of Death field becomes active and is populated in Q3  
    * Memorial tab becomes available on the Person Record  
    * The Person Record is linked to the Care Plan  
  * If No Existing Record Exists: Selecting Create New Record opens a Quick Creation Flow.

**6.2.7.8. Question 3 — Date of Death**

Q3 is a date picker. If a date already exists in the Person Record, the field should be pre-filled.

* **Purpose:** Q3 establishes the timeline context of the loss and determines the initial plan phase.This field is one of the main engines of plan relevance because it influences:  
  * Phase-based practical steps,  
  * Time-sensitive deadlines,  
  * Resource sequencing,  
  * Dashboard messaging.  
* **Field Type:** Date picker**.** Single date input. Calendar picker \+ manual date entry support  
* **Field Label:** ‘Date of death’.  
* **Hover Text:** We use this to place the plan in the right phase and show the right next steps.  
* **Pre-Fill Logic:** If the Person Record already contains a Date of Death, the field is pre-filled.  
* **Validation Rules:** Required unless the user selects a preparation flow in Q4 and the product decides to allow no confirmed death date yet. If a date is entered:  
  * cannot be in the future for a confirmed death flow  
  * must be a valid calendar date  
  * should trigger phase recalculation immediately  
* **Phase Calculation Rules:**   
  * **0–72 hours** → Immediate  
  * **3–14 days** → Early Days  
  * **2 weeks – 3 months** → First Weeks  
  * **3+ months** → Ongoing  
* **System Effect:** The selected date determines:  
  * Initial phase badge  
  * Urgency logic  
  * Practical step ordering  
  * Default article filtering  
  * Dashboard summary text such as “3 days since \[Name\] passed”

**6.2.7.9. Question 4 — What happened?**

Q4 is a single-choice question with three main options: illness, sudden and still preparing.

* **Purpose:** Q4 captures the death context and determines support sequencing and sensitivity. It is not intended to collect detailed narrative or medical history. It exists to adapt and support relevance.  
* **Field Type:** Single-select radio button list  
* **Field Label: ‘**What happened?’  
* **Hover Text: ‘**Choose the option that best matches the situation.’  
* **Options:**   
  * **Death after illness (expected)**  
    System effect: caregiver-aware resources, preparation-related guidance where relevant.  
  * **Sudden / unexpected death**  
    System effect: trauma-aware resources, more immediate orientation and stabilization support.  
* **Optional Hover Text per Choice:** For clarity, each option may include a hover::  
  * **Death after illness (expected):** ‘For situations where the loss followed illness or decline’  
  * **Sudden / unexpected death**: ‘For situations that happened without preparation’  
  * **Still preparing**: ‘For situations where death has not yet occurred, but support and preparation are needed’  
* **Validation Rules:** Required  
* **Role Rule:** Executor may edit Q4 after plan creation only in limited post-activation circumstances, especially when a preparation-based plan must be updated to reflect an actual death event.

**6.2.7.10.  Question 5 — How are you feeling?**

Q5 is a multi-select question and maps each answer to a support emphasis in the generated plan.

* **Purpose:** Q5 personalizes the immediate support balance.It tells the system whether to emphasise practical action, emotional support, family-focused guidance or information browsing. This is not a clinical mental-health assessment \-  it is a lightweight preference and distress-context signal.  
* **Field Type:** Multi-select chips or checkbox group  
* **Field Label:** ‘How are you feeling?’  
* **Hover Text:** Choose all that apply. This helps us shape what to show first.  
* **Options and System Effects:**   
  * **Overwhelmed by responsibilities**  
    Effect: Practical steps move to the foreground.  
  * **Struggling emotionally**  
    Effect: Emotional support resources move to the foreground.  
  * **Unsure what to do next**  
    Effect: Balanced plan, equal practical and emotional routing.  
  * **Handling things for others (children, family)**  
    Effect: children- and family-related steps are elevated.  
  * **Just need information**  
    Effect: Browse Mode becomes the default entry behavior for emotional resources.  
* **Validation Rules:** At least one option should be selected.  
* **Interaction Rules:** Multiple answers may be selected. If conflicting intents are selected, the system should combine rather than reject.

**6.2.7.11 Confirmation Screen**

The Confirmation Screen summarizes the generated plan and provides a continuation CTA.

**Purpose:** The Confirmation Screen marks the transition from intake to action. It reassures the user that the system has understood enough to help, a structured plan now exists and they do not need to build everything themselves.

**Layout:**

* **Headline**  
  Your Care Plan is ready.  
* **Intro line**  
  Based on what you shared:  
  * **Generated summary bullets**  
  * 12 practical steps across 4 phases  
  * Starting with: Register the death certificate  
  * Emotional resources tailored to this type of loss  
* **Settings note**  
  You can adjust this at any time from plan settings.  
* **Primary CTA**  
  See Your Plan →

**6.2.7.12. System Output of the Personalization Flow**

When the flow is completed, the system generates:

* a linked Personalized Post-Loss Care Plan  
* a deceased-person anchor through the Person Record  
* a phase assignment  
* a contextual support profile  
* initial practical step ordering  
* emotional support prioritization  
* memorialization readiness  
* dashboard entry into Main Directory Page — Active Plan State

**6.2.7.13. Field-Level Summary Table**

**Q1 — Who did you lose?**

* Field type: single-select dropdown  
* Required: yes  
* Content: relationship category  
* Effect: determines support track and Q2 filtering

**Q2 — Select the specific person**

* Field type: searchable dropdown with inline create-new  
* Required: yes  
* Content: existing Person Record or new quick-create record  
* Effect: links plan to authoritative person record; enables deceased-state logic

**Q3 — Date of death**

* Field type: date picker  
* Required: yes in standard death flow  
* Content: confirmed date of death  
* Effect: calculates phase and time-based support logic

**Q4 — What happened?**

* Field type: single-select card group / radio group  
* Required: yes  
* Content: expected illness / sudden / still preparing  
* Effect: adjusts support flow and preparation-based versus active post-loss behavior

**Q5 — How are you feeling?**

* Field type: multi-select chips / checkbox group  
* Required: at least one selected  
* Content: immediate support preference and distress context  
* Effect: determines which support mode is foregrounded first

**6.2.7.14. UX Rules (Critical)**

The Personalization Flow must:

* Feel supportive and easy to begin  
* Keep the user focused on one answer at a time  
* Use existing Person Records wherever possible  
* Avoid legalistic language  
* Avoid forcing unnecessary detail too early  
* Make the plan feel generated for the user, not built by the user from scratch

The Personalization Flow must not:

* Look like a claims form  
* Look like estate administration software  
* Present too many fields on one screen  
* Ask for unnecessary narrative detail  
* Use emotionally cold language such as “case type,” “incident,” or “subject”

**6.2.8. Executor Post-Activation State**

Purpose

This state adapts the Hero Card for the Executor after post-mortem activation. The Executor’s version is operationally important, but must still remain emotionally appropriate.

Content

The card may show:

* the deceased person identity,  
* current phase,  
* context gathered from activation,  
* priority steps,  
* the next actions the Executor is allowed to manage.

It may also include a prompt to complete contextual death information if this has not yet been fully confirmed.

Actions

Possible actions:

* Continue Plan  
* Review Current Priorities  
* Complete Context  
* Open Deceased Record

Rules

* The Executor must feel empowered, but within scope.  
* The card must not imply ownership of the whole Plan Owner system.  
* Only permitted records and content may be shown.

**6.2.9. Beneficiary Restricted State**

Purpose

This state gives the Beneficiary access to relevant information without exposing the broader plan structure.

Content

The simplified Hero Card may include:  
 

* the deceased person’s name,  
* a supportive orientation line,  
* a short explanation that some items were prepared for them,  
* one safe entry point into their relevant content.

Possible CTA:

* View What Was Shared  
* Continue  
* See Your Next Step

Rules

Must not expose:

* other beneficiaries,  
* estate totals,  
* internal workflows,  
* private executor actions,  
* unshared documents.

This state should feel personal and respectful, not blocked or punitive.

**6.2.10. Contributor Restricted State**

Purpose

This state supports Contributors who have been invited to help with a limited part of the workflow.

Content

The card may include:

* who the support case relates to,  
* why the Contributor has access,  
* what type of contribution is needed,  
* the next scoped action.

Possible CTA:

* Open Assigned Task  
* Continue Contribution  
* Review Shared Area

Rules

Contributors may assist, but never overwrite authoritative plan logic. Their access is contextual, limited, and approval-based.

**6.2.11. Person Selection Logic in the Hero Card Flow**

When the user starts a new plan from the Hero Card, the first requirement is to connect the experience to the correct deceased Person Record.

The flow must support:

* searching existing person records,  
* reusing authoritative records,  
* and creating a new person inline if needed.

This behavior should follow existing platform patterns for searchable person selection, inline “Create new,” authoritative record reuse and linked summary rendering.

When an existing person is selected:

* the record becomes the anchor of the plan,  
* the death context is attached,  
* and the support plan becomes permanently person-based.

##### **6.3. Active Loss Plans (Dynamic List)**

**6.3.1. Single Active Plan State**

**Purpose**

This is the main operational state for a Plan Owner with one current Personalized Post-Loss Plan.

**Content Structure**

* Top area: Plan title / “Your Active Care Plan”; linked deceased person identity  
* Right side: Phase badge; time-since-loss context  
* Middle:  2–3 top-priority actions  
* Bottom: Subtle progress bar;  “N of N steps done”  
* Primary CTA: “Continue Plan →”

**Behavior**

Clicking Continue Plan redirects the user to the Care Plan tab of the deceased person’s record. The card should always reflect the currently active deceased-person context.

**6.3.2 Multiple Active Plans State**

**Purpose**

This state supports Plan Owners managing more than one deceased-person-based support plan. The key UX challenge here is disambiguation and prioritization.

**Content Structure**

**Heading:** ‘Care Plans Overview’

**Main Area:** A compact multi-plan overview.

Each plan row should show:

* deceased person name,  
* relationship label,  
* Phase,  
* urgency summary where relevant.

Example ordering:

* Red / Immediate  
* Amber / First Weeks  
* Green / Ongoing  
* Grey / Completed

Maximum 3-4 visible rows without scroll.

**Individual CTA:** “View Plan →”

**Sorting Logic**

Plans should be sorted by relevance:

* urgent and time-sensitive first,  
* then phase priority,  
* then active but lower-intensity plans,  
* then completed or archived plans.

If a new urgent deadline emerges, the order may update dynamically.

**Rules**

* This state must remain scannable.  
* It must not become a dense table.  
* Each row should feel like a calm member card, not a case-management queue.

**6.3.3. Paused / Incomplete Plan State**

**Purpose**

This state handles cases where a plan has been started but not fully configured, or where contextual inputs are missing.

**Use Cases**

Examples:

* person selected but date of death not completed,  
* initial personalization interrupted,  
* preparation flow not yet converted,  
* plan created but not progressed.

**Content**

The card should acknowledge that setup is in progress and clearly present the next appropriate continuation point.

Possible CTA patterns:

* Resume Setup  
* Complete Plan Context  
* Continue Plan

**Rules**

The card should never shame the user for not finishing setup. Language must remain gentle and progress-oriented.

---

##### **6.4. Quick Actions Tools- Obituary & Memorialization** 

The Obituary & Memorialization section is the creation and management environment for two closely related but distinct post-loss tools:

**Obituary Creation**  
 A structured publishing tool used to prepare a formal obituary page or obituary text.

**Memorial Page Creation & Management**  
 A living remembrance page that allows family, friends, and invited participants to engage with the memory of the deceased through messages, stories, photos, and shared remembrance.

These tools may be used as standalone entry points or as part of a Personalized Post-Loss Plan and are always linked to the relevant deceased Person Record through the Memorialization tab. This mirrors the user’s source specification and is consistent with the person-based logic used across the Post-Loss Support module. PlanOwners can prepare obituaries/memorialization tabs for others or for themselves.

---

**6.4.1. Purpose**

The purpose of this section is to help users create, publish, and manage two kinds of remembrance outputs:

* **A formal obituary \-** used for announcement, biography, funeral information, and official sharing.  
* **A memorial page \-** used for remembrance, guest participation, tribute messages, memory sharing, and ongoing memorial engagement.

The two experiences are related, but not identical. The obituary is more structured, more editorial, more announcement-oriented. The memorial page is more relational, more participatory, more ongoing. The product should support both as connected tools with shared identity data, shared deceased-person anchoring and distinct creation flows.

---

**6.4.2. Entry Points**

The Obituary & Memorialization tools must be accessible through multiple product paths:

* **Entry Point A** — Quick Actions: From the Main Directory Page quick actions.  
* **Entry Point B** — Personalized Plan. From inside a Personalized Post-Loss Plan,  
   when obituary or memorialization is relevant to the user’s plan and phase.  
* **Entry Point C** — Person Record. From the deceased person’s Memorialization tab.

---

**6.4.3. Role-Based Access**

**PlanOwner**

The PlanOwner can create, edit, publish, share, pause, draft and manage both obituary and memorial page. The PlanOwner can control visibility, invite contributors, approve memorial contributions and decide whether the page is public, restricted, or private.

**Executor**

After activation, the Executor may manage obituary and memorial outputs if permissions allow. They can complete unfinished drafts, update memorial details, publish or maintain the page and moderate incoming contributions.

**Beneficiary**

Beneficiaries may see a memorial page if it is shared with them. They may view, share, sign or contribute to the memorial page where allowed. They should not edit formal obituary structure unless explicitly permitted.

**Contributor**

Contributors may suggest edits, submit memories, upload photos or help prepare obituary drafts if invited. All contribution-based changes should be approval-based and must not overwrite authoritative content automatically.

**Public**

Future public access may apply to memorial pages and selected obituary views only.No sensitive plan data is exposed in this mode.

---

**6.4.4. Obituary Creation** 

The obituary creation experience should function as a guided builder, not a blank document editor. The Legacy obituary example shows several strong structural patterns worth adapting prominent person identity, born/died framing, a primary obituary text block, sharing actions, guest-book connection and adjacent memorial participation tools.

**6.4.4.1. Purpose**

The obituary builder helps the user create a clear, respectful obituary without needing to start from scratch.

**6.4.4.2. Core Modes**

The obituary tool should support three modes:

* **Draft Mode:** Private working state.  
* **Preview Mode:** Publication-style preview inside PlanAfter.  
* **Published Mode:** Final visible obituary, either within the memorial page or as a standalone obituary view.

**6.4.4.3. Builder Structure**

The obituary builder should be divided into the following sections:

1. **Identity & Basic Details**  
2. **Obituary Narrative**  
3. **Service / Ceremony Information**  
4. **Family & Relationship Mentions**  
5. **Donation / Flowers / Special Requests**  
6. **Publication & Sharing Settings**  
7. **Preview & Publish**

**A. Identity & Basic Details**

**Fields**

* **Full name**  
   Field type: text input  
   Pre-filled from Person Record where available  
* **Preferred memorial name / display name**  
   Field type: text input  
   Optional  
   Used if the obituary should display a different or shorter name  
* **Birth year / full birth date**  
   Field type: date field or year field  
   Pre-filled where known  
* **Death year / full death date**  
   Field type: date field  
   Pre-filled from Person Record where available  
* **Main photo**  
   Field type: image upload / select from Vault or Person Record  
   Optional but strongly encouraged  
* **Short subheading**  
   Field type: text input  
   Optional  
   Example:  
   “Beloved father, teacher, and friend”

**UX Rule**

This section should be largely prefilled from the Person Record whenever possible so the user is not re-entering known information.

**B. Obituary Narrative**

**Field Type:** Structured long-text editor with optional prompts.

**Sections Inside the Narrative**

* **Opening announcement**  
   Long text  
   Prompt example:  
   “We are saddened to share that…”  
* **Life summary**  
   Long text  
   Prompt example:  
   “Share a few words about who they were, what mattered to them, and how they will be remembered.”  
* **Family / loved ones**  
   Long text or structured repeatable list  
   Prompt example:  
   “They are survived by…”  
* **Closing remembrance**  
   Long text  
   Prompt example:  
   “A final message, blessing, or note of remembrance.”

**Optional Writing Assistance**

The user may choose: **Write myself** or **Use guided prompts.** The system may also offer AI-assisted draft generation if such a capability exists elsewhere in PlanAfter, but it should remain optional and clearly user-controlled.

**C.  Service / Ceremony Information**

**Fields**

* **Service type:** Dropdown. Options may include:  
  * Funeral,  
  * Memorial service,  
  * Celebration of life,  
  * Private family service,  
  * Other  
* **Date:** Date picker  
* **Time:** Time picker  
* **Location:** Text input with optional address expansion  
* **Additional instructions:** Long text. Example:  
   “Guests are invited to wear blue.”  
* **Private / public visibility of service details:** Toggle or segmented selector

**UX Rule**

Service details should be optional and editable later.The system must support obituary publication even if service details are not yet final.

**D. Family & Relationship Mentions**

**Modes:**

* **Simple mode:** One long-form text area  
* **Structured mode:** Repeatable rows pulled from My Family & My Network / Person Records

**Fields:**

* **Name:** Prefilled if selected from network  
* **Relationship:** Dropdown or inherited label  
* **Display in obituary:** Checkbox / toggle

**UX Rule**

This section must be sensitive to privacy. Not every linked person should automatically appear in the obituary.

**E. Donation / Flowers / Special Requests**

Legacy-style memorial pages often surface donation and support actions alongside memorial participation. This section allows the user to include optional giving, flowers, or remembrance instructions.

**Fields:**

* **Accept flowers:** Toggle  
* **Donation in memory of:** Toggle  
* **Organization name:** Text input  
* **Donation link:** URL field  
* **Special remembrance request:** Long text. Example:  
   “In lieu of flowers…”

**F. Publication & Sharing Settings**

**Fields:**

* **Status:** Draft / Private share / Published  
* **Visibility:** Private/ Shared link/ Public memorial page/Public obituary page  
* **Allow sharing:** Toggle  
* **Allow guest book / responses:** Toggle  
* **Link to memorial page:** Toggle

**UX Rule**

Publishing should always be explicit. Nothing becomes public by default.

**6.4.4.4. Preview & Publish**

This section gives the user a calm final review before the obituary is made visible.

**Actions:**

* **Save draft**  
* **Preview obituary**  
* **Publish now**  
* **Share draft for review**

**Preview Layout**

The obituary preview should resemble a polished memorial publication page and include:

* Photo,  
* Full name  
* Birth/death dates  
* Main obituary text,  
* Service information  
* Sharing actions

This reflects the reference pattern where obituary pages are strongly identity-led and supported by adjacent memorial actions.

---

**6.4.5. Memorial Page Creation & Management** 

The purpose of the memorial page is to create a space where memory, tribute, and shared remembrance can continue after the obituary is written. It allows family and friends to read the remembrance, leave messages, share memories, upload photos, follow updates and return over time. It is not only a page \-  it is an ongoing remembrance surface.

**6.4.5.1.  Core States**

The memorial page should support the following states:

* **Draft:** Visible only to authorized editors  
* **Private Shared:** Visible only to invited users  
* **Published / Public-facing:** Visible more broadly, if the user explicitly chooses public sharing  
* **Managed Ongoing Memorial:** Published page with ongoing guest entries, updates, and moderation

**6.4.5.2. Memorial Page Layout**

The memorial page should be composed of the following major zones:

1. **Memorial Hero Header**  
2. **Primary Actions**  
3. **Obituary / Tribute Section**  
4. **Guest Book / Memory Wall**  
5. **Photos & Media**  
6. **Service / Event Information**  
7. **Contribution & Moderation Layer**  
8. **Follow / Share / Donate / Support Actions**

**A. Memorial Hero Header**

The Hero Header is the emotional and visual anchor of the memorial page.

**Content:**

* **Main photo or portrait:** Optional cover / portrait image  
* **In memory of / Remembering:** Soft memorial framing line  
* **Full display name**  
* **Birth and death dates**  
* **Optional short remembrance line**  
   Example:  
   “Beloved mother, artist, and friend”

**UX Rule**

This area must feel dignified and spacious. It must not look like a social-media profile header.

**B. Primary Actions**

**Actions**

* **Add a Memory:** Opens memory submission flow  
* **Sign the Guest Book:** Opens message / condolence form  
* **Share Page:** Share sheet / invite flow  
* **Follow Updates:** Subscribe to changes on the page  
* **Add Photos/Media:** Available to approved contributors or invited participants  
* **Donate in Memory:** Link. Shown only if enabled in memorial settings

**C. Obituary / Tribute Section**

**Modes**

* **Obituary-first mode:** The formal obituary appears in full  
* **Tribute-first mode:** A shorter tribute summary appears first, with full obituary expandable below

**Content**

* **Headline:** Optional title such as “Obituary” or “A Life Remembered”  
* **Body text:** Long-form content from obituary builder or memorial-specific writing  
* **Read more / collapse behavior:** Allowed for long memorial pages

**D. Guest Book / Memory Wall**

This is the participatory heart of the memorial page. It allows visitors to leave condolences, share stories, write tributes or post short messages of remembrance.

**Modes:**

* **Guest Book:** Short condolence-style entries  
* **Memory Wall:** Longer personal memory posts

**Fields:**

* **Name:** Short text  
* **Message:** Long text  
* **Relationship to the deceased:** Optional dropdown or text input  
* **Photo attachment:** Optional image upload  
* **Display publicly:** Checkbox if moderation workflow supports private submission

**Moderation Rules:** Entries may be auto-published, held for review or restricted to invited contributors depending on page settings.

**E. Photos & Media**

This section allows visual remembrance through curated media.

**Content**

* **Photo gallery:** Grid or masonry view  
* **Highlighted images:** Optional featured set near top of page  
* **Captions:** Optional short captions

**Upload Sources**

Photos may come from the Person Record, Vault, memorial contributors or invited family uploads

**UX Rule**

Media must feel curated and respectful. It must not feel like an infinite social feed.

**F. Service / Event Information**

This section gives memorial visitors any relevant ceremony or remembrance information.

**Content:**

* Date   
* Time,  
* Location  
* Attendance notes  
* Stream link if relevant  
* Dress or flower guidance if needed.

**Visibility Rule**

The user must be able to show this publicly, to invited people only, or not at all.

**G. Contribution & Moderation Layer**

This layer controls how memorial participation is managed.

**Settings**

* **Who can post**  
  * Everyone with link  
  * Invited only  
  * Approved contributors only  
* **Require approval before publishing:** Toggle  
* **Allow photo uploads:** Toggle  
* **Allow edits to obituary / tribute:**  Restricted to editors only  
* **Pin featured memories:** Allowed for owners / editors

**H. Follow / Share / Support Layer**

**Elements**

* **Follow updates:** Email or in-app subscription  
* **Share page:** Invite or copy-link flow  
* **Donate in memory:** Optional external donation destination  
* **How you can show support:** Optional micro-section that groups the above actions into one calm explanatory area

**6.4.5.4. Creation Flow**

The memorial page builder should follow a guided multi-step flow rather than opening as a blank canvas.

**Recommended Flow**

* **Step 1 — Choose memorial visibility**  
   Private / Shared / Public  
* **Step 2 — Confirm identity & photo**  
   Person Record data \+ hero image  
* **Step 3 — Add tribute content**  
   Short tribute and/or obituary linkage  
* **Step 4 — Configure guest participation**  
   Guest book, memories, photos, moderation  
* **Step 5 — Add service or donation details**  
   Optional  
* **Step 6 — Preview memorial page**  
   Final review  
* **Step 7 — Publish or save draft**

**6.4.5.5. Memorial Management After Publishing**

Once live, the memorial page should support ongoing management.

**Management Actions:**

* Edit memorial text  
* Approve or remove entries  
* Pin featured memory  
* Update service details  
* Add new photos  
* Close contributions  
* Archive memorial  
* Change visibility

**6.4.5.6. UX Rules (Critical)**

The memorial page must feel dignified, support community remembrance, allow participation without chaos and remain calm even when active. It must not feel like a social network, prioritize engagement metrics, overload the page with widgets, or expose sensitive family information.

---

##### **6.5. Grief Support Directory Resources & Learning Hub**

The Grief Support Directory is the Emotional Care section of Post-Loss Support.  
It supports two distinct usage modes: Guided Mode and Browse Mode. Guided Mode is the default and Browse Mode is the free-navigation alternative, each with different content presentation logic.

**6.5.1. Purpose**

The Grief Support Directory exists to support the user emotionally without overwhelming them. It is not a generic article library. It is a structured emotional-care environment that adapts to loss type, phase and felt need.

Its purpose is to offer emotional grounding, help the user access one meaningful thing at a time when needed, provide a safe browsing mode when they want more autonomy and keep emotional support separate from administrative pressure.

**6.5.2.Core Modes**

**6.5.2.1. Guided Mode**

* Default mode.  
* The system shows one resource at a time.  
* It uses progressive disclosure and contextual framing to reduce overload.  
* Presents one resource at a time, includes introductory framing, and provides Previous / Skip / Next navigation.

**6.5.2.2. Browse Mode**

* Open exploration mode.  
* The user navigates freely across categorized resources using filters such as loss type, feeling state, and format.  
* All main categories are visible.

**6.5.3. Page Header**

* **Purpose:** The Page Header should orient the user emotionally, not operationally. It should clearly identify the section as emotional support while preserving a calm tone.  
* **Content:** It may include section title, soft explanatory subtitle and contextual cues based on the active plan, current loss type, or phase.The right panel may surface contextual AI support or phase-aware emotional guidance. The right-side area carries emotional context filtered by loss type and phase. 

**6.5.4. Mode Toggle**

The mode toggle switches between Guided and Browse. Guided mode reduces overload and Browse mode opens categorized navigation with filters.

**Rules:** 

* Guided Mode is the default.   
* The toggle should remain clear but unobtrusive.  
* Switching modes must not feel like changing products.  
* Both modes belong to the same emotional support system.

**6.5.5. Guided Mode — Single Resource View**

Guided Mode is a full-width single resource card with a short introductory framing statement above it, followed by Previous / Skip / Next controls. Guided Mode exists for users who need support but do not want to search, compare, or decide too much.

**Structure**

* **Introductory Framing:** A short, calm line that normalizes the user’s experience. Example: “Right now, many people in your situation feel overwhelmed. That’s completely normal.”  
* **Single Resource Card:** One resource shown at a time. Includes:  
  * Title  
  * Subtitle  
  * Read time  
  * Read CTA.  
* **Navigation Row**  
  * Previous  
  * Skip this  
  * Next

**UX Rules**

Guided Mode must show only one main item at a time, provide enough framing so the resource feels relevant and make skipping feel acceptable. It must not pressure the user to consume content in sequence, look like a slideshow or trap the user in a rigid flow.

**6.5.6. Browse Mode — Filters & Category Grid**

Browse Mode exposes the broader emotional resource system. There are filters for loss type, ‘what I’m feeling’ and format such as Read / Listen / Write, followed by a category grid with expandable groups.

**Filters**

* **By loss type:** Dropdown filter  
* **What I’m feeling:** Dropdown filter  
* **Format filters:** Read, Listen, Write

**Category Grid**

Examples include:

* Understanding Grief,  
* Taking Care of Yourself,  
* When You Have Children,  
* Grief & Identity,  
* Practical & Emotional Balance.

Each row includes article counts and may expand or collapse.

**UX Rules**

The category grid must feel calm and readable. The user should be able to browse without feeling pushed toward urgency. Counts may be shown, but they are informational, not achievement signals.

**6.5.7. Reassurance Layer**

The file defines a collapsible card shown only in Browse Mode, never interrupting Guided Mode. It contains reassuring system-level language such as:  “What’s Being Taken Care Of”  
and confirms that plans, documents, and responsibilities are securely held. The Reassurance Layer helps reduce background anxiety while the user explores emotional resources. It reminds the user that not everything requires action right now.

**6.5.8. UX Rules (Critical)**

The Grief Support Directory must  feel emotionally safe, separate emotional support from administrative pressure and adapt to different levels of user readiness. It must not look like a content marketplace, surface deadlines or checklists inside emotional browsing or make the user feel they are failing if they do not engage.

---

**6.5.9. Single Article** 

The Single Article page is the internal page for one article or resource.  
It may be opened from a Step Card, the Grief Support Directory, or the Articles block on the main page. It has a three-part structure: Article Header, scrollable Article Body and fixed-bottom Related Articles. There are also right-side actions for Save, Share, and More.

**6.5.9.1 Purpose**

The Single Article page exists to deliver one focused piece of guidance in a calm, readable environment. It should support reflection, offer understanding and extend the user’s support journey without adding pressure. This page is not task-driven. It is meaning-driven and support-driven.

**6.5.9.2 Article Header**

The header includes:

* Back button  
* Article title,  
* Subtitle,  
* Category,  
* Read time,  
* Relevance tags.

The Article Header should quickly establish what the article is, why it is relevant,  
and how much attention it requires.

**Content**

* **Back:** Returns the user to the source context when possible.  
* **Title:** Primary article title  
* **Subtitle:** Short explanatory subtitle  
* **Metadata:** Category, Read time, Relevance label or audience applicability

**6.5.9.3 Action Column**

The resource/article should have three actions:

* **Save:** Saves the article to the user’s personal library (in Grief Support section, before modes selection). When saved, the icon state changes.  
* **Share:** Allows sharing with a Contributor or Executor.  
* **‘⋯’ More:** Dropdown with:  
  * Add to Care Plan,  
  * Mark as read,  
  * Report issue.

**6.5.9.4 Related Articles — Fixed Bottom**

There should be a fixed-bottom ‘Related Articles’ section with three links under the title “More articles like this.” This area supports soft continuation after reading. It should encourage the next relevant article without making the page feel infinite.

**Rules:** Related articles should be thematically close, not merely popular. They must remain secondary to the main article. A fixed-bottom placement is appropriate because it supports continuation without interrupting reading.

**6.5.9.5 UX Rules (Critical)**

The Single Article page must feel reflective and easy to read, support saving and sharing without becoming utility-heavy and preserve the emotional tone of the module. It must not look like a generic blog template, overuse metadata or treat emotional reading as a productivity stream.

##### **6.6. Support & Guidance \- Entry Points**

Post-Loss Support includes three structured, step-based guidance systems: Emotional Support, Practical Support, and Legal & Administrative Support. These are not passive content libraries. They are actionable step systems designed to help users understand what to do, when to do it, why it matters, and how to navigate each part of the process. 

**Emotional Support**  
A structured support system focused on grief, emotional regulation, coping, and adjustment after loss. It helps users understand what they may be feeling, access reassurance in a calm and progressive way, and engage with emotionally relevant support based on loss type, relationship, and phase. Emotional Support is not a passive reading library. It is an actionable support layer composed of individual steps that can be surfaced directly inside a Care Plan when relevant.

**Practical Support**  
A structured action system focused on the real-world responsibilities that follow a loss. It helps users manage practical needs such as immediate next steps, funeral-related coordination, document discovery, notifications, household continuity, and longer-term execution tasks. Practical Support is organized so the user can understand what typically needs attention first, what can wait, and how to move through the process with greater clarity.

**Legal & Administrative Support**  
A structured guidance system focused on legal, institutional, and administrative actions that may be required after a death. It includes steps related to death registration, certificates, inheritance processes, institutional notifications, entitlements, deadlines, documentation, and related formal procedures. This area is designed to make complex legal and administrative requirements easier to understand by breaking them into contextual, actionable steps.

Each system includes individual steps that may be explored on their own or added into a Personalized Post-Loss Care Plan. Once a Personalized Post-Loss Care Plan has been created from the Post-Loss Support section, the relevant personal record gains a dedicated tab titled ‘**Care Plan’**. This tab becomes the primary working surface for that person-specific support experience and contains the emotional, practical, and legal & administrative support steps associated with that care context. The plan is anchored directly to the person’s record rather than existing as an abstract planning layer. 

**6.6.1. Care Plan Tab \- Layout**

The Care Plan tab is the internal plan view for one person-specific post-loss support context. It appears inside the relevant personal record once a Personalized Post-Loss Care Plan has been created.

Its purpose is to provide one unified, person-based execution surface that brings together the support steps generated or added through Post-Loss Support. It allows the user to view, manage, and progress the active support plan in one place without requiring separate internal support tabs inside the record.

The Care Plan tab follows the established content layout pattern used in the record view. Introductory text, as well as a utility row with actions to select, remove or archive appears at the top and this also includes the search field. Directly below this row, the plan content is divided into three grouped support headings:

* Emotional Support  
* Practical Support  
* Legal & Administrative Support

These headings function as visible content dividers in the same structural style as other record-level headings, such as the profile-heading pattern used elsewhere in the product. Each heading introduces the step cards that belong to that support type.

The user therefore sees one integrated Care Plan view grouped by support category, rather than switching between separate support tabs.

**6.6.2. Step Grouping Logic**

All steps shown inside the Care Plan tab belong to the currently active personal record.

When a Care Plan is generated from Post-Loss Support, the system places each step automatically under the appropriate heading based on its support type:

* emotional steps appear under **Emotional Support**  
* practical steps appear under **Practical Support**  
* legal and administrative steps appear under **Legal & Administrative Support**

This grouping logic must be system-controlled and automatic. The user should not need to manually organize steps after they are added to the plan.

**6.6.3. Single Step Card**

The Single Step Card is the core content unit within the Care Plan tab. Each card represents one actionable support step and is displayed under the relevant support heading.

Depending on the step type, the card may function slightly differently:

* for **Emotional Support**, it may focus more on reflection, grounding, coping, reassurance, or emotionally relevant guidance,  
* for **Practical Support**, it may focus more on real-world coordination, follow-through, and logistical action,  
* for **Legal & Administrative Support**, it may focus more on formal processes, institutions, documentation, and legal or administrative clarity.

In all cases, the Single Step Card must help the user focus on one thing at a time and understand how that step fits into the broader care plan.

**6.6.3.1. Purpose**

The purpose of the Single Step Card is to let the user quickly understand the step, its current status, and the phase in which it is typically relevant, without requiring immediate entry into a deeper detail page.

Each card should communicate:

* what the step is,  
* whether it is Active, Pending, or Done,  
* and in which phase it belongs.

**6.6.3.2. Card Structure**

Each Single Step Card should contain the following elements:

**Status indicator**  
  A color-coded visual marker showing the current state of the step.

**Step title**  
  The primary label of the card and the clearest description of the action or support item.

**Phase line**  
  A single secondary line shown directly below the step title. This line displays only the  phase in which the step is relevant or typically completed. Examples: \`0–72 hours\`, \`First 2 weeks\`, \`First 3 months\`, etc.

**Action menu**  
  A three-dot action control positioned at the right edge of the card.

**Icons for Pinned and Done**  
  Two icons for pinned tasks and done tasks that can easily be clicked by the user and visually change appearance once clicked, depending on if the task is pinned or marked as done.

**6.6.3.3. Visual States**

Each step card must support three clear, color-coded states:

**Pending**  
Used when the step has been added to the plan but has not yet been viewed by the user. 

**Active**  
Used when the step is currently in progress, surfaced as relevant now, or being worked on. Once the user expands a particular task, the task automatically moves from Pending to Active.

**Done**  
Used when the step has been completed. Users must manually indicate when a task is done.

These states must be visually legible at a glance while working alongside a minimal card layout that shows only the title, phase line, status state, and action menu.

**6.6.3.4. Action Menu**

Each Single Step Card contains a three-dot action menu. Clicking this menu opens the available actions for that step.

The action menu must contain:

* Mark as done  
* Pin  
* Remove from plan  
* Assign  
* Add reminder

These actions make the card itself the main operational control point inside the Care Plan tab.

**Mark as done**  
Marks the step as completed and changes its visual state to Done.

**Pin**  
Pins the step so it can be surfaced more prominently within the Care Plan where the product chooses to prioritize pinned items.

**Remove from plan**  
Removes the step from the current person’s Care Plan without deleting the underlying support step from the broader Post-Loss Support system. Instead, it treats it as an archived item \- places at bottom and visual appearance is changes (more transparent).

**Assign**  
Allows the step to be assigned to a Contributor or Executor. 

**Add reminder**  
Allows the user to attach a reminder to the step so that follow-up can happen at the appropriate time. 

**6.6.3.5. Expanded Step Layout**

When a user clicks a Single Step Card inside the Care Plan tab, the card expands inline as a dropdown rather than routing the user away from the Care Plan view.

The purpose of the expanded state is to let the user access more guidance and take action while remaining in the same grouped Care Plan context. The interaction should feel calm, lightweight, and progressive. It should reveal more detail only when the user chooses to engage with that specific step.

The expanded step layout contains three sequential layers:

1. **Step Description**  
2. **Optional Sub-Steps**  
3. **Add New Entry Flow**

1. **Step Description**

The first revealed layer is a more detailed description of the step itself. Its purpose is to help the user understand what this step involves, why it matters, and what kind of action or attention it may require. This description should be more detailed than the step title, but still concise and easy to scan.

It should:

* clarify the meaning of the step,  
* provide immediate context,  
* and help the user understand what this part of the Care Plan is asking them to do.

This section is always shown when the step is expanded.

2. **Optional Sub-Steps**

Below the step description, the expanded view may include further sub-steps.

These sub-steps are used when the main step contains smaller internal actions, considerations, or procedural parts that benefit from being broken down further. Each sub-step is displayed as its own collapsible row.

Each sub-step should:

* have its own title,  
* be individually expandable and collapsible,  
* and reveal a more detailed explanation when opened.

This allows the system to keep the default expanded view readable while still supporting deeper guidance where needed.

Sub-steps are optional. They should appear only when the step genuinely benefits from additional breakdown. The interface must not force unnecessary hierarchy for simple steps.

3. **Add New Entry Flow**

After the step description and any optional sub-steps, the expanded layout includes the **Add New Entry** flow. This flow follows the same logic and structure already defined elsewhere in the specification. In this context, it appears as the final layer of the expanded step so the user can record or add the relevant information directly from within the step. Its purpose is to let the user attach any relevant documents to the step in order to help with organisation.

This section allows the user to:

* collect all documents so they are a click away if user needs them, upload digital copies (diplomas, transcripts, certificates)  
* and/or specify where the physical originals are stored

  **I. Location of the Original Document or File (Optional)**

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

  **Hover tooltip (i):**  
   “Use this to record where the original paper documents are stored. This may be especially useful for your loved ones if no digital scan is uploaded.”

---

**II. Specific Storage/ Location Details (Conditional)**

Type: Text input  
Label: Location Details  
Placeholder: “Drawer, safe, folder name…”

Rules:  
Shown when Location is selected (recommended) OR when “Other” requires explanation  
Optional unless Location requires it (e.g., Other)  
---

**III. Upload / Drag & Drop File Component (Optional)**

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
  \[Upload File\]  |  \[Drag and Drop File Here\]  
    
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
    
    
    
  **IV. Uploaded Files row cards (if any, appears in list one under other )**


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


**V. Important note (Security Message)**

Design:

* Info icon (ⓘ)  
* Bold title: **Important\!**  
* Light paragraph text below

  Exact text (FINAL):

  **Important\!**  
  All uploaded files are encrypted using AES-256 and stored securely. Access is limited strictly to individuals explicitly authorised by you, in accordance with your sharing and permission settings.

  **VI. Notes & Instructions (Optional)**


  **Purpose:** Capture human nuance and context that doesn’t belong in structured fields.

  **Type:** Multi-line free-text area

  **Examples:**

* Adequate as per the chosen option above 

  ---

  **Actions & Controls**

  Save Button

  **State:**

* Disabled until all required fields are valid

  Cancel / Close (X)

  **Behavior:**

* If no data entered → closes immediately  
* If unsaved data exists → shows **Unsaved Changes** modal:  
  * **Don’t Save**  
  * **Save**

The Add New Entry flow should appear after the informational content, not before it. This ensures that the user first understands the step and any supporting sub-steps before being asked to input or create anything.

**6.6.3.6. Expanded Step Interaction Rules**

The expanded dropdown behavior must:

* open inline within the Care Plan tab,  
* preserve the grouped section context,  
* reveal content progressively from description to sub-steps to entry flow,  
* and remain visually calm and easy to scan.

The expanded dropdown behavior must not:

* navigate the user away from the Care Plan tab for standard step review,  
* overload the user with all content at once,  
* or present the Add New Entry flow before the explanatory content.

This interaction should feel like a natural extension of the step card rather than a separate page. It preserves continuity, reduces friction, and keeps the user grounded in the person-specific care plan context.

**6.6.4. Relationship to the Broader Support Systems**

Emotional Support, Practical Support, and Legal & Administrative Support continue to exist as structured support systems within Post-Loss Support. They remain the source environments for support discovery, contextual learning, and step selection.

Within the person record, however, the Care Plan tab becomes the consolidated execution view.

This means:

* the broader support systems remain the source layer,  
* while the Care Plan tab becomes the person-based working layer where selected and generated steps are organized and acted on.

This approach preserves the original product logic while making the active support experience easier to understand and manage in one place.

**6.6.5. UX Rules (Critical)**

The Care Plan tab must:

* feel calm, structured, and easy to scan,  
* remain clearly anchored to the correct personal record,  
* display the three support types through grouped headings below the search row,  
* allow direct action from each step card through the action menu,  
* communicate progress through clear but supportive status states,  
* keep each step card visually minimal,  
* and allow step detail to expand inline without breaking the Care Plan context.

The Care Plan tab must not:

* rely on separate internal tabs for Emotional Support, Practical Support, and Legal & Administrative Support,  
* feel like a generic task manager,  
* hide core actions behind unnecessarily deep navigation,  
* detach the plan from the person record to which it belongs,  
* display extra metadata on the card face beyond the title, phase line, status indicator, and three-dot action menu,  
* or force the user into a separate page for standard step review.

The experience should feel person-centered, supportive, and operationally clear.

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,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>

[image4]: <data:image/png;base64,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>

[image5]: <data:image/png;base64,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>