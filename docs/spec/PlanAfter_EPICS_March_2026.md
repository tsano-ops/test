# PlanAfter EPICs

# 

PlanAfter EPIC Backlog: Full Epics, Stories, Tasks & Acceptance Criteria  
March 2026 

# 

**Proactive End-of-Life Planning, Secure Legacy Transference, and Comprehensive Post-Loss Support,**  
**Confidentiality & Disclaimer**

This document contains confidential and proprietary information belonging to PlanAfter DPK. It is provided strictly for use in connection with the authorized work, services, or collaboration between PlanAfter DPK and the recipient. Any unauthorised use, reproduction, modification, distribution, or disclosure of this material is strictly prohibited. If you are not the intended recipient, please notify the sender and delete this document immediately.

For questions, please contact: violetka.alexieva@planafter.co

# Table of Contents

[Epic 1: Registration & Onboarding \[Phase 1\]	3](#epic-1:-registration-&-onboarding-[phase-1])

[Epic 2: Account Types, User Roles & Access Models  \[Phase 1\]	8](#epic-2:-account-types,-user-roles-&-access-models-[phase-1])

[Epic 3: Dashboard & Navigation \[Phase 1\]	13](#epic-3:-dashboard-&-navigation-[phase-1])

[Epic 4: Settings \[PHASE 1\]	20](#epic-4:-settings-[phase-1])

[Epic 5: Me, My Family & My Network \[PHASE 1\]	26](#epic-5:-me,-my-family-&-my-network-[phase-1])

[Epic 6: My Plan- Emotional Legacy \[PHASE 1\]/ \[PHASE 2\]	34](#epic-6:-my-plan--emotional-legacy-[phase-1]/-[phase-2])

[Epic 7: My Plan- Body & Health \[PHASE 1\]	39](#epic-7:-my-plan--body-&-health-[phase-1])

[Epic 8: My Plan – Assets & Liabilities \[PHASE 1\]	42](#epic-8:-my-plan-–-assets-&-liabilities-[phase-1])

[Epic 9: My Plan – Goals & Aspirations \[PHASE 1\]	66](#epic-9:-my-plan-–-goals-&-aspirations-[phase-1])

[Epic 10:  My Plan- Will & Legal Actions \[PHASE 1\]	67](#epic-10:-my-plan--will-&-legal-actions-[phase-1])

[Epic 11: Post-Loss Support \[PHASE 1\]	72](#epic-11:-post-loss-support-[phase-1])

[Epic 12: Vault \[PHASE 1\]	73](#epic-12:-vault-[phase-1])

[Epic 13: Tasks & Reminders \[PHASE 1\]	77](#epic-13:-tasks-&-reminders-[phase-1])

[Epic 14: Marketplace \[Phase 2\]	79](#epic-14:-marketplace-[phase-2])

[Epic 15: Plans Shared With Me \[PHASE 1\]	81](#epic-15:-plans-shared-with-me-[phase-1])

[Epic 16: Marketing Website & Platform Entry Point (PHASE 1\)	82](#epic-16:-marketing-website-&-platform-entry-point-\(phase-1\))

[EPIC 17: Executor Role \[PHASE 1\]	84](#epic-17:-executor-role-[phase-1])

[Epic 18: Contributor Role \[PHASE 1\]	87](#epic-18:-contributor-role-[phase-1])

[Epic 19: Beneficiary Role \[PHASE 1\]	89](#epic-19:-beneficiary-role-[phase-1])

[Epic 20: Admin Panel \[PHASE 1\]	92](#epic-20:-admin-panel-[phase-1])

[Epic 21: Annual PlanAfter Review \[Phase 2\]	94](#epic-21:-annual-planafter-review-[phase-2])

[Epic 22: Contract & Services Accounts Closure \[Phase 2\]	96](#epic-22:-contract-&-services-accounts-closure-[phase-2])

[EPIC 23: Customer Billing System \[PHASE 1\]	100](#epic-23:-customer-billing-system-[phase-1])

[Epic 24: Compliance & Certifications \[PHASE 1\]	102](#epic-24:-compliance-&-certifications-[phase-1])

[Epic 25: Mobile Applications \[Phase 2\]	104](#epic-25:-mobile-applications-[phase-2])

[Epic 26: Platform-Wide Encryption, Data Security & Backup \[PHASE 1\]	106](#epic-26:-platform-wide-encryption,-data-security-&-backup-[phase-1])

[Epic 27: AI Assistant \[PHASE 1\]	108](#epic-27:-ai-assistant-[phase-1])

[Epic 28: Archiving Functionality \[PHASE 1\]	110](#epic-28:-archiving-functionality-[phase-1])

[Epic 29: Corporate Client Dashboards \[Phase 2\]	111](#epic-29:-corporate-client-dashboards-[phase-2])

[Epic 30: Affiliate & White-Label Partner Dashboards \[Phase 2\]	113](#epic-30:-affiliate-&-white-label-partner-dashboards-[phase-2])

**PlanAfter Platform – EPICs Overview**

**Introduction**  
This document outlines the comprehensive Agile Epic backlog for the development of the PlanAfter platform—a secure, life and legacy planning solution designed to guide individuals, families, and partners through the complexities of preparing for life events, loss, and digital legacy. The platform combines emotional intelligence, user empowerment, and compliance with international legal and security standards.  
Each Epic in this backlog is structured to include:

* A clear description of its scope and purpose.  
* Associated user stories.  
* A breakdown of developer-focused tasks.  
* Acceptance criteria to ensure quality and completeness.

The document supports cross-functional collaboration across product, engineering, UX/UI, and legal/security teams. The user experience flows, component designs, and technical implementations align with the overall product roadmap and customer engagement strategy.  
The Epic catalogue serves as a living reference for planning, sprint estimation, roadmap tracking, and milestone alignment—especially critical as the platform scales from PHASE 1 to full enterprise release. Some of the described Epics may have an PHASE 1 and a Phase 2 aspect.

# 

# **Epic 1: Registration & Onboarding \[Phase 1\]** {#epic-1:-registration-&-onboarding-[phase-1]}

**Description:** Develop the full registration and onboarding journey for new users, guiding them from public sign-up through email verification, contextual profile setup, life assessments, plan selection, payment (if needed), and into their personalized PlanAfter experience. The process ends with a tour that introduces platform features and builds user confidence. In some cases, onboarding questions will be included here, depending on the user type, to help users engage with their plan from the very beginning.

**1.1 Story: Account Creation & Login**

Description: Allow users to create a secure account and log in using their email and password. The flow should support registration, validation, secure authentication, and smooth continuation into the platform.

Tasks:

* Build the email and password form for account creation with client-side validation.  
* Build the email and password login form with client-side validation.  
* Show real-time password strength indicators and field requirements during account creation.  
* Connect the registration form to the account creation endpoint and handle server responses.  
* Connect the login form to the authentication endpoint and handle server responses.  
* Block submission until all required fields are valid and terms are accepted for account creation.  
* Persist temporary form state to support refresh and resume behavior where applicable.  
* Redirect successful registration to email verification.  
* Redirect successful login to the appropriate next step or dashboard based on account state.  
* Display clear error handling for invalid credentials, duplicate emails, and API failures.


Acceptance Criteria:

* Given a valid email and password, when the user submits the registration form, the account is created and the user is routed to email verification.  
* Given an invalid or already used email, appropriate error messages are shown and submission is blocked.  
* Given the registration form is partially filled, refreshing the page retains the entered values.  
* Given the terms checkbox is unchecked, registration submission remains disabled.  
* Given API failure during registration, the form stays enabled and shows an error banner.  
* Given a user enters valid login credentials, when they submit the login form, they are authenticated and routed to the correct next screen.  
* Given a user enters invalid login credentials, an error message is shown and login is blocked.  
* Given API failure during login, the form stays enabled and shows an error banner.

**1.2 Story: Email Verification**  
Description: Implement a 6-digit code verification process to confirm the user’s email address.  
Tasks:

* Build the OTP input system with individual fields and auto-advance.  
* Connect verification to the backend endpoint.  
* Include a resend code feature with countdown and rate limiting.  
* Provide visual feedback for successful or failed attempts.  
* Allow users to change their email and restart the verification flow.

Acceptance Criteria:

* Given a user enters all 6 digits and clicks verify, the system confirms validity and advances to the next step.  
* Given an invalid or expired code is submitted, an error is shown and the form remains active.  
* Given a user clicks “resend” after the countdown ends, a new code is sent.  
* Given the verification is successful, the user proceeds to the welcome screen.  
* Given a resend limit is reached, the resend option is disabled until reset.

**1.3 Story: Profile Setup**  
Description: Capture basic personal and regional information needed to tailor the onboarding experience.  
Tasks:

* Build form fields for full name, date of birth, nationality, and residence.  
* Enable dynamic dropdowns (e.g. region/state based on country).  
* Validate required fields before allowing submission.  
* Save progress in draft format for mid-flow exits.  
* Provide Save & Exit and Continue functionality.

Acceptance Criteria:

* Given all required fields are filled correctly, users can proceed to the next step.  
* Given fields are invalid or empty, the user is prevented from continuing.  
* Given the user returns mid-flow, previously entered data is pre-filled.  
* Given Save & Exit is clicked, the data is persisted and recoverable later.  
* Given the profile is successfully saved, the backend returns a 200 response.

**1.5 Story: Plan Selection**  
Description: Allow users to select how they are signing up for PlanAfter, so the platform can determine the correct onboarding path and access context. The user must choose one sign-up source before continuing, such as signing up through the website, an insurance provider (or another broker), an employer, or an access code.  
Tasks:

* Build a sign-up source selection screen matching the onboarding entry experience.  
* Present the available options such as Website, My Insurance Provider (or another broker), My Employer, Access Code  
* Display supporting copy explaining that PlanAfter may be offered through employers, insurance carriers, or other partner organizations.  
* Save the selected sign-up source in onboarding context and backend.  
* Block progression until a sign-up source is selected.  
* Persist the selection across refresh and resume.  
* Route the user into the correct onboarding or authentication flow based on the selected source.  
* Handle source-specific logic, such as partner-based access or access-code entry.


Acceptance Criteria:

* Given no sign-up source is selected, the user cannot continue.  
* Given a valid sign-up source is selected, the system saves it and moves the user forward.  
* Given a page refresh, the previous selection is preserved.  
* Given the API fails to save the selection, the user remains on the screen and an error is shown.  
* Given different sign-up sources are selected, the corresponding onboarding or access flow updates accordingly.


  
**1.6 Story: Checkout & Payment**  
Description: Collect payment for paid plans and confirm the user’s subscription where payment is required. If the user’s plan is sponsored by their Employer or the user signs up with an access code for an eligible family package, then the user should not be required to make a payment and should proceed without checkout.

Tasks:

* Integrate payment provider SDK (e.g. Stripe).  
* Build payment inputs with validation for card and other supported payment methods.  
* Handle success, failure, and no-payment-required states.  
* Store successful subscription or sponsored-access data in the backend.  
* Block submission on invalid or incomplete payment fields when payment is required.  
* Add ability to enter a promo code.  
* Detect when the selected sign-up path or access entitlement means payment is not required.  
* Skip or bypass checkout for employer-sponsored plans and valid access-code family packages.  
* Route users to the next onboarding step once payment is completed or waived.  
  


Acceptance Criteria:

* Given valid payment details are entered for a paid plan, payment is processed and the subscription is confirmed.  
* Given invalid payment data is submitted, an error is shown and submission is blocked.  
* Given a payment is successful, the user is routed to the next onboarding step.  
* Given a duplicate payment is attempted, no double charges occur.  
* Given the API fails, the form is re-enabled and an error is shown.  
* Given a user enters a valid promo code, the payment amount is reduced or becomes zero where applicable.  
* Given the plan is sponsored by the user’s Employer, the user is not required to pay and can proceed to the next onboarding step.  
* Given the user enters a valid access code for a family package, the user is not required to pay and can proceed to the next onboarding step.  
* Given payment is not required, the system still stores the correct subscription or entitlement state in the backend.

**1.7 Story: Setup Complete**   
Description: Display a completion screen confirming that the user’s initial setup has been successfully finished.  
Tasks:

* Show a setup completion screen.  
* Display confirmation messaging that setup has been completed successfully.  
* Provide navigation to the user’s dashboard.  
* Log the setup completion event.  
* Ensure the completion screen loads reliably after setup is finished.


Acceptance Criteria:

* Given setup is completed, the completion screen loads successfully.  
* Given the user chooses to leave the completion screen, they are routed to their dashboard.  
* Given the completion event is triggered, it is logged successfully.  
* Given data fails to load, fallback copy appears and the user remains in flow.  
* Given a user refreshes the page, the completion screen reloads without error.


  
**1.8 Story: Interactive Platform Tour & Onboarding**  
**Description:** Guide new users through an interactive onboarding experience that captures essential life context, planning priorities, and personal goals, then introduces key PlanAfter features through a guided platform tour. The flow should help users set up their plan, personalize their experience, save progress as they go, and finish with a recommended first action and optional product tour.

Tasks:

* Build a multi-step onboarding flow that captures life context, planning priorities and values, bucket list / life goals  
* Render questions and inputs with conditional logic based on prior responses.  
* Save responses incrementally to the backend.  
* Persist draft answers so users can leave and resume later.  
* Block progression until required fields are completed.  
* Save user preferences for dashboard and plan personalization.  
* Support optional notes or links where relevant.  
* Provide Save & Exit, Continue, and resume functionality throughout the flow.  
* Display a setup completion screen with personalized summary cards, recommended first action, navigation options such as Start Now or Go to Dashboard  
* Log onboarding completion.  
* Implement an interactive platform tour after onboarding completion.  
* Highlight key areas such as Dashboard, Vault, Plan Sections, Tasks, and Support.  
* Store a tour completed flag to prevent automatic repeat display.  
* Include controls for skipping, pausing, and replaying the tour later.  
* Ensure accessibility, including keyboard navigation and screen reader support.  
* Track onboarding and tour events, including started, completed, skipped, and resumed states.

Acceptance Criteria:

* Given required onboarding questions are unanswered, Continue is disabled.  
* Given conditional logic is triggered, dependent required fields must be completed before proceeding.  
* Given responses are partially completed and the user exits, returning restores saved progress.  
* Given Save & Exit is clicked, responses and selections are saved for later.  
* Given onboarding data is completed, the system stores it for personalized plan and dashboard setup.  
* Given the user reaches the end of onboarding, a summary screen loads with accurate data and a recommended first action.  
* Given the user clicks the recommended action, they are routed to the correct platform area.  
* Given the user chooses to go to the dashboard, they are routed there successfully.  
* Given onboarding is complete, the platform tour prompt is shown on first login.  
* Given the user starts the tour, each key section is highlighted with guidance.  
* Given the user skips or completes the tour, the appropriate completion flag is stored.  
* Given the user wants to replay the tour later, it can be started again from settings.  
* Given a save or load action fails, an error message appears and the user is not routed forward incorrectly.  
* Given the user refreshes or reopens the flow, saved onboarding data reloads without error.

# **Epic 2: Account Types, User Roles & Access Models  \[Phase 1\]** {#epic-2:-account-types,-user-roles-&-access-models-[phase-1]}

Description: Define the account types, user roles, sponsorship ( account as gift or account covered by company or family member)  models, and access rules within the PlanAfter platform so that onboarding, permissions, billing, sharing, and workflow behavior are applied consistently across the system. This Epic establishes how different users enter the platform, what type of account they hold, how access is funded or sponsored, and what actions they are allowed to perform. PlanAfter supports these core account groups:

* PlanOwner (paid account with full functionalities)   
  * Self-Paid  
  * Sponsored by Family Member  
  * Sponsored by Another PlanOwner or non customer via the website (Gift)  
  * Sponsored by Corporate Client  
* Invited User ( free account with limited functionalities in someone's plan)  
  * Executor  
  * Contributor  
  * Beneficiary  
* Third Party  
  * Corporate Clients   
  * Brokers   
  * Vendors   
* Admin

**2.1 Story: Define PlanOwner Account Types**

Description: Allow the platform to create and manage PlanOwner accounts under different funding and sponsorship models, while keeping the PlanOwner as the primary owner of their plan.

Tasks:

* Define PlanOwner as the primary account holder and owner of a plan with full functionalities .  
* Support PlanOwner account types:  
  * Self-Paid  
  * Sponsored by Family Member (Family Plan)- invitation by email / code  
  * Sponsored by Another PlanOwner (Gift)- invitation by email / code  
  * Sponsored by Corporate Client- invitation by email / code  
* Store the funding or sponsorship type in the account model.  
* Ensure billing, onboarding, and entitlement logic reflect the PlanOwner’s account type.  
* Ensure sponsorship status can be referenced throughout the platform where needed.  
* The PlanOwner is able to change ( upgrade, downgrade, cover the accounts for family member, by changing to Family Plan; or Take Over the Payment form sponsoring company or person  ( start paying the subscription of his own)

Acceptance Criteria:

* Given a user is a PlanOwner, their account is stored as the primary owner of the plan.  
* Given a PlanOwner is self-paid, billing is required unless another valid discount or waiver applies.

* Given a PlanOwner is sponsored by a family member through Family package, the account is marked as sponsored and billing is not required from that PlanOwner.  
* Given a PlanOwner is sponsored as a gift by another PlanOwner, the sponsorship relationship is stored correctly.  
* Given a PlanOwner is sponsored by a corporate client, the account reflects employer or partner-funded access.  
* Given a PlanOwner account type is determined, the correct onboarding and entitlement rules are applied.

**2.2 Story: Invited User Roles**

Description: Allow PlanOwners to invite other users into the platform with limited, role-based access based on their function in the plan. Support Executor, Contributor, and Beneficiary as invited roles with no payment and limited functinalities ( no personal Plans) .

Tasks:

* Implement invitation flow for each role type.  
* Build role-specific registration bypassing payment.  
* Enforce role-based access from first login.  
* Link invited user to the correct PlanOwner  
* Support the invited roles \- Executor, Contributor, Beneficiary  
* Store the invited user’s role and relationship to the PlanOwner.  
* Enforce that invited users do not become owners of the plan.  
* Ensure access is limited according to role and permissions assigned.

Acceptance Criteria:

* Given a user is invited into a plan, they are able to create a free but limited in functionality and permissions  account, and are stored as an Invited User and not as the PlanOwner.  
* Given an invited user is assigned the Executor role, their access follows executor permissions ( specific tasks to complete  ) .  
* Given an invited user is assigned the Contributor role, their access follows contributor permissions. ( limited view rights, specific task with suggestion rights)  
* Given an invited user is assigned the Beneficiary role, their access follows beneficiary permissions. ( view access)   
* Given an invited user has not been granted access to a section or item, they cannot view or act on it.  
* Given a PlanOwner changes an invited user’s role, the user’s permissions update accordingly.  
* Given a PlanOwner sends an invitation to an Executor, contributor or benefitury , then the invitee receives an email with a unique invitation link, a description of the role, tasks or etc  and the PlanOwner's name.  
* Given an invited user clicks a valid invitation link, then they are routed to a role-specific registration flow that requires only name, email, and password — no plan selection or payment step.  
* Given an invited user completes registration, then their account is linked to the inviting PlanOwner, their role is assigned, and they are routed to their role-specific dashboard.  
* Given an invitation link expires (after 7 days) before the invitee registers, then clicking the link shows an 'Invitation expired' message — the PlanOwner is notified and can resend.  
* Given the same email receives invitations from two different PlanOwners, then both invitations are valid and the user can accept both.  
* Given a Contributor logs in and navigates via Plans shared with m , then they see only the sections and tasks explicitly assigned to them — all other plan sections are hidden, not locked.

**2.3 Story: Third-Party Account Types**

Description: Allow the platform to recognize and manage third-party organizations and service entities that interact with PlanAfter in a business or service capacity.  
Tasks:

* Support Third Party account type.  
* Support third-party categories: Corporate Clients, Brokers, Vendors  
* Store the organization type and relevant business relationship.  
* Ensure third-party access is separated from personal plan ownership and invited-user access.  
* Define the basis for future integrations, sponsorship, referral, and service workflows.

Acceptance Criteria:

* Given a third-party organization is registered in the platform, it is stored under the correct third-party category.  
* Given a corporate client sponsors user access, that sponsorship can be linked to eligible PlanOwner accounts.  
* Given a broker is configured in the system, their access and relationship are distinct from corporate clients and vendors.  
* Given a vendor is configured in the system, their access is limited to their approved service scope.  
* Given a third party is not authorized for personal plan access, they cannot view private user plan data.

**2.4 Story: Admin Accounts**

Description: Allow internal administrative users to access platform administration capabilities with strict security and audit controls.  
Tasks:

* Support Admin account type.  
* Define admin-only capabilities and restrictions.  
* Separate admin access from end-user access models.  
* Apply enhanced audit logging to admin actions.  
* Ensure admin permissions are governed by internal access controls.

Acceptance Criteria:

* Given a user is an Admin, they can access only the administrative functions assigned to them.  
* Given an Admin performs a sensitive action, the action is logged.  
* Given a non-admin user attempts to access admin functionality, access is denied.  
* Given admin permissions are changed, those changes take effect immediately.  
* Given an admin account is disabled, the user can no longer access admin areas.

**2.5 Story: Sponsorship & Billing Logic**

Description: Ensure the platform correctly applies billing and entitlement behavior depending on whether an account is self-paid or sponsored.  
Tasks:

* Map payment requirements to account type.  
* Support no-payment-required flows for sponsored users.  
* Support gifting flows between PlanOwners.  
* Support family-sponsored access.  
* Support corporate-sponsored access.  
* Store sponsorship relationships and entitlement status in the backend.

Acceptance Criteria:

* Given a PlanOwner is self-paid, the system requires payment unless a valid discount or waiver applies.  
* Given a PlanOwner is sponsored by family (Family Plan), payment is skipped for that user.  
* Given a PlanOwner is gifted access by another PlanOwner, payment is skipped and the gift relationship is stored.  
* Given a PlanOwner is sponsored by a corporate client, payment is skipped and entitlement is granted according to the sponsorship arrangement.  
* Given sponsorship ends or changes, the account entitlement state updates accordingly.

**2.6 Story: Role-Based Access Across the Platform**

Description: Apply consistent role-based access control so that every user sees and can act only on what their account type and role allow.  
Tasks:

* Map permissions by account type and role.  
* Separate ownership permissions from invited-user permissions.  
* Enforce visibility rules across all pillars and records.  
* Ensure sponsorship does not automatically change role permissions.  
* Ensure access changes propagate throughout the platform.

Acceptance Criteria:

* Given a user logs in, they see only the platform areas allowed by their role and permissions.  
* Given a PlanOwner accesses their account, they retain owner-level control over their plan.  
* Given an invited user accesses a shared plan, they see only the records, tasks, and sections permitted to them.  
* Given a third party accesses the platform, they cannot access personal plan data unless explicitly authorized through a defined business workflow.  
* Given permissions are updated, the affected user’s access changes accordingly without needing a new account.

**2.7 Story: Role-Aware Onboarding and Entry Paths**

Description: Ensure users enter the correct platform flow depending on whether they are a PlanOwner, invited user, sponsored user, third party, or admin.  
Tasks:

* Define onboarding paths for each account type.  
* Support sign-up and invitation-based entry separately.  
* Support sponsorship-aware onboarding logic.  
* Route users to the correct experience after authentication.  
* Store the origin and entry path of the account.

Acceptance Criteria:

* Given a self-paid PlanOwner signs up, they follow the standard PlanOwner onboarding flow.  
* Given a sponsored PlanOwner signs up, they follow the sponsorship-aware onboarding flow.  
* Given an invited user joins through an invitation, they follow the invited-user onboarding flow.  
* Given a third party signs in, they are routed to the correct organization-facing experience.  
* Given an Admin signs in, they are routed to the administrative experience.

**2.8 Story: Auditability of Roles, Access and Sponsorship**

Description: Ensure that all important changes to account type, role, sponsorship, and permissions are traceable.  
Tasks:

* Log creation and updates of account types.  
* Log role assignment and role changes.  
* Log sponsorship assignment, gifting, and removal.  
* Log permission changes affecting access.  
* Ensure logs are available for compliance and support review.

Acceptance Criteria:

* Given an account type is created or changed, the event is logged.  
* Given a user’s role is assigned or updated, the event is logged.  
* Given a sponsorship relationship is created, updated, or removed, the event is logged.  
* Given permissions affecting user access are changed, the event is logged.  
* Given support or compliance review is needed, the relevant audit trail is available.

# **Epic 3: Dashboard & Navigation \[Phase 1\]** {#epic-3:-dashboard-&-navigation-[phase-1]}

Description: Develop a responsive, role-aware dashboard that provides users with a clear overview of their plan progress, key actions, recent activity, notifications, and primary navigation. The dashboard acts as the central entry point for engaging with the PlanAfter platform and must support different user roles (PlanOwner, Contributor, Executor, Beneficiary) while remaining accessible, fast, and visually coherent.  
**3.1 Story: Build Main Dashboard Layout**

Description: Implement the primary dashboard layout and responsive UI scaffold, including support for multiple screen sizes and personalized greetings.  
Tasks:

* Implement flexible container grid layout (left nav, content, right panel).  
* Load user profile metadata (name, avatar, role).  
* Render personalized greeting dynamically.  
* Apply responsive behavior (mobile/tablet/desktop breakpoints).  
* Integrate loading skeletons and fallback content.


Acceptance Criteria:

* Given a user logs in, the dashboard loads with their name and role.  
* Given different screen sizes, the layout adjusts responsively.  
* Given data is loading, skeletons or spinners appear until data is available.  
* Given the dashboard loads, layout areas (nav, tasks, assistant, progress, etc.) are populated correctly.  
* Given the user has no data yet, empty state components are shown with guidance.

**3.2 Story: Implement Left-Side Navigation**  
Description: Build the collapsible left-side navigation menu with active state highlighting, expandable sections, persistent navigation state, and role-aware access behavior. The sidebar should display the user’s profile image in the header, or initials when no profile photo exists. For PlanOwners, it should also display a plan banner reflecting plan ownership and payment status. For invited users such as Contributors, Beneficiaries, and Executors, certain sections remain visible but locked until they become PlanOwners themselves, and no plan banner is shown.  
Tasks:

* Implement the sidebar header with profile photo display, initials fallback when no profile photo exists resizing and placement controls for the profile image  
* Ensure profile picture updates propagate across the platform, including sidebar header, settings / dashboard avatar, My Profile header, linked PlanOwner summary cards, including in Family Tree, other shared or summary views showing the PlanOwner’s image  
* Implement sidebar groups such as Me, My Family & My Network, My Plan, Post-Loss Support, Vault, Tasks & Reminders, Plans Shared With Me, Settings  
* Highlight the active route with visual indicators.  
* Enable collapse / expand behavior.  
* Persist navigation state in session storage.  
* Support role-based access rules:   
  * PlanOwner can access all available sections  
  * Contributor / Beneficiary / Executor can access only permitted sections such as Tasks & Reminders, Plans Shared With Me, Post-Loss Support, and Settings  
  * Sections such as My Plan and Me, My Family & My Network remain visible but locked and inactive for invited users until they become PlanOwners  
* Implement the Plan banner for PlanOwners:  
  * for Self-Paid PlanOwners, show the plan name, Covered by Me, and either Upgrade or Manage Plan CTA depending on plan tier  
  * for Sponsored PlanOwners whose sponsorship is ending, show a Take Over Payment CTA  
* For invited users (Contributors, Beneficiaries, Executors), do not show the Plan banner; instead show an upgrade CTA block  
* Ensure locked sections trigger the correct upgrade or takeover flow where applicable

Acceptance Criteria:

* Given the user clicks a section, it expands or collapses accordingly.  
* Given the user is on a page, the corresponding nav item is highlighted.  
* Given the user refreshes the page, the nav state is preserved.  
* Given the nav is collapsed, icons remain accessible with tooltips.  
* Given the user has no profile photo, the sidebar header shows their initials.  
* Given the PlanOwner updates their profile picture, the updated image appears in the sidebar and all other linked platform locations that display it.  
* Given the user is a PlanOwner, all permitted sections are active and accessible.  
* Given the user is an invited user (Contributor, Beneficiary, or Executor), locked sections such as My Plan and Me, My Family & My Network are visible but not active until they become a PlanOwner.  
* Given the user is a Self-Paid PlanOwner, the Plan banner shows the plan name, Covered by Me, and the correct Upgrade or Manage Plan CTA based on their tier.  
* Given the user is a Sponsored PlanOwner and sponsorship is ending, the Plan banner shows a Take Over Payment CTA.  
* Given the user is an invited user, no Plan banner is shown and an upgrade CTA block is displayed instead.  
* Given the user clicks a locked section or relevant CTA, the correct upgrade, takeover, or plan-acquisition flow is triggered.


  
**3.3 Story: Load Today’s Tasks & Recent Activity**  
Description: Display the user’s current tasks and reminders  and recent activity log on the dashboard.

Tasks:

* Fetch tasks marked as “today’s priority” via API.  
* Fetch recent activity (uploads, role updates, health forms, etc.).  
* Design task cards with status badges and section labels.  
* Implement click-to-navigate from tasks or activity to Tasks & Reminders section.  
* Handle empty states with educational content or prompts.


Acceptance Criteria:

* Given tasks exist for today, they are listed with section tags and status indicators.  
* Given no tasks are available, a helpful empty state message is shown.  
* Given a user clicks a task, they are routed to the relevant section.  
* Given recent activities exist, they appear chronologically with timestamps.  
* Given the API fails to load tasks or activity, an error fallback is shown.

**3.4 Story: Implement Notifications System**  
Description: Build a notification center that alerts users to updates, reminders, and changes from other participants.

Tasks:

* Create bell icon with unread counter.  
* Build notifications drawer UI with read/unread styling.  
* Implement “Mark all as read” and “Clear all” functionality.  
* Support priority tagging (info, medium, high).  
* Integrate with backend events (uploads, task reminders, invites).


Acceptance Criteria:

* Given new notifications exist, the unread counter updates accurately.  
* Given a notification is clicked, it routes to the relevant plan section.  
* Given “Mark all as read” is clicked, all notifications are updated and UI reflects this.  
* Given priority levels exist, they are styled accordingly (color-coded).  
* Given no notifications exist, an empty state with a message is displayed.

**3.5 Story: Display Plan Progress Tracker**  
Description: Show an overall progress bar and sectional progress indicators (Assets, Legacy, Health, Goals, Legal).

Tasks:

* Fetch completion data for each plan section from backend.  
* Display total progress as a percentage bar.  
* Show sectional progress with horizontal bar components.  
* Enable click-to-navigate to the specific plan section.  
* Handle visual updates as data changes.

Acceptance Criteria:

* Given section completion data exists, each tracker reflects accurate progress.  
* Given a section is clicked, the user is routed to that area.  
* Given no sections are started yet, progress is at 0%.  
* Given a section is updated, the progress bar reflects the change in real-time.  
* Given the user completes onboarding, the tracker reflects an initial baseline.

**3.6 Story: Enable Quick Actions & Key People Panel**  
Description: Allow users to take key actions quickly (Upload, Invite, Write, Schedule) and view people involved in their plan.

Tasks:

* Build Quick Actions component with four shortcut buttons.  
* Implement modal triggers for Upload, Write, Invite, Schedule.  
* Build a dynamic Key People list (Executor, Contributor, Beneficiary).  
* Enable contact detail view or management from this panel.  
* Support state updates (e.g. last activity timestamp).


Acceptance Criteria:

* Given the user clicks a quick action, the appropriate modal opens.  
* Given no key people exist, a CTA to add them is shown.  
* Given key people exist, they are displayed with avatars, role, and recent activity.  
* Given a person is clicked, the user is navigated to their profile or edit view.  
* Given actions are performed, the dashboard refreshes to reflect updates.

**3.7 Story: Resources & Articles**  
Description: Provide users with a Resources & Articles section that surfaces helpful, relevant content to support them as they build and maintain their PlanAfter plan. This section should offer educational articles, practical guidance, and curated resources connected to the user’s progress, priorities, and current platform activity.

Tasks:

* Build a Resources & Articles component for the dashboard.  
* Display a curated set of helpful articles and resources relevant to the user’s planning journey.  
* Support content categories such as estate planning, emotional legacy, health, financial planning, legal actions, and goals.  
* Personalize recommended content based on the user’s progress, plan status, and activity where applicable.  
* Show article cards with key metadata such as title, category, image, and short description.  
* Enable users to open and read the selected resource.  
* Provide a way to browse more content beyond the initially displayed set.  
* Ensure the section is responsive and accessible.  
* Track engagement events such as article opened or resource clicked.

Acceptance Criteria:

* Given a user opens the dashboard, the Resources & Articles section is visible.  
* Given relevant content exists, article cards are displayed with title, category, and preview information.  
* Given a user selects an article or resource, it opens successfully.  
* Given the user’s plan progress or activity changes, the recommended resources can update accordingly.  
* Given there are more resources than shown initially, the user can access additional content.

* Given no personalized content is available, the system displays a default helpful set of resources.  
* Given a user interacts with an article, the interaction is tracked.


  
**3.8 Story: Implement Global Search**  
Description: Enable users to search for content across PlanAfter (documents, people, plan items) from a global search bar.

Tasks:

* Build search input and result preview panel.  
* Connect to backend full-text search API.  
* Display result types (documents, plan sections, people) with icons.  
* Support recent searches and keyboard shortcuts.  
* Enable keyboard navigation and accessibility features.


Acceptance Criteria:

* Given a user types in the search bar, relevant suggestions appear.  
* Given a user selects a result, they are routed to the associated page.  
* Given the input is cleared, suggestions are removed.  
* Given no results are found, an empty state with suggestions is displayed.  
* Given recent searches exist, they appear beneath the search bar.

**3.9 Story: Build Interactive AI Assistant Widget (see also EPIC – AI Assistant)**  
Description: Develop the PlanAfter AI Assistant as a smart, contextual help and navigation widget embedded in the dashboard. This assistant provides users with support, guidance, and relevant content suggestions based on their activity, plan progress, and questions.

Tasks:

* Build floating AI assistant widget UI with chat interface.  
* Create logic for user action suggestions triggered on certain events (eg. ID to expire soon, suggest review of suggested tasks, etc.).  
* Connect frontend to AI backend service (e.g., custom NLP engine or OpenAI API).  
* Handle both free-form user queries and predefined prompts (e.g. “Where do I start?”).  
* Load contextual quick replies (based on section, tasks, or role).  
* Enable the assistant to route users to relevant platform pages (e.g. Vault, Goals).  
* Log queries and interactions for analytics and future improvements.

Acceptance Criteria:

* Given the user is on the dashboard, the assistant widget is visible and accessible.  
* Given a user types a supported question (e.g., “How do I upload a will?”), the assistant responds with a relevant answer and routing option.  
* Given the assistant cannot answer a question, it gracefully informs the user and suggests help resources.  
* Given a user clicks a suggested action (e.g., “Go to My Plan”), the assistant navigates them to that section.  
* Given an interaction occurs, it is logged and associated with the user’s session for analysis.

**3.10 Story: Plan Completeness Score**  
Description: Provide users with a Plan Completeness Score component that shows how much of their PlanAfter plan has been completed overall and by key planning categories. The score should help users understand their current level of progress, identify gaps, and prioritize the next areas to complete.

Tasks:

* Build a Plan Completeness Score component for the dashboard.  
* Display an overall completion percentage for the user’s plan.  
* Break down completion by key categories: Assets & Liabilities, Emotional Legacy, Body & Health, Goals & Aspirations, Will & Legal Actions  
* Show each category with its own progress indicator.  
* Calculate completeness based on completed required and relevant data points within each category.  
* Update the overall score dynamically as users add or complete information.  
* Allow users to expand or view more detail on how completeness is calculated, where applicable.  
* Use the score to help surface next-best actions or incomplete sections.  
* Ensure the component is responsive and accessible.

Acceptance Criteria:

* Given a user has entered some plan data, the Plan Completeness Score displays an overall completion percentage.  
* Given the user has data across multiple categories, each category shows its own progress indicator.  
* Given the user completes more of their plan, the overall and category scores update accordingly.  
* Given a category has little or no information, its progress indicator reflects that incomplete state.  
* Given the user views the component, they can clearly distinguish overall progress from category-level progress.  
* Given completeness data changes, the dashboard reflects the updated values without error.  
* Given the component is viewed on supported screen sizes, it remains readable and usable.

**3.11 Story: Gamification Layer Linked to Progress Tracker \[Phase 2\]**  
Description: Introduce gamified elements into the dashboard’s progress tracker to motivate users through positive reinforcement, milestone achievements, and contextual discounts or rewards for completing meaningful portions of their plan.

Tasks:

* Integrate milestone logic (e.g. 25%, 50%, 75%, 100% of a section or full plan).  
* Display contextual messages: motivational quotes, completion badges, or small celebrations (confetti, sounds).  
* Fetch eligible discounts/offers based on progress (e.g. 75% of Legal → discount on attorney services).  
* Build reward modal/card UI with CTA to redeem service or learn more.  
* Store milestone completion and reward usage in backend.  
* Ensure gamification does not interfere with accessibility or core UX.

Acceptance Criteria:

* Given a user crosses a section milestone (e.g. 50% of Body & Health), a congratulatory message or animation appears.  
* Given a reward is unlocked, a visible card appears with the offer details and relevant CTA (e.g. “Claim Discount”).  
* Given a user already claimed a reward, the system disables or marks it as “Used”.  
* Given the full plan reaches 100%, a special recognition badge or visual is displayed on the dashboard.  
* Given no milestones are reached, no gamification elements are shown.

# **Epic 4: Settings \[PHASE 1\]** {#epic-4:-settings-[phase-1]}

Description: Provide users with full control over their account, identity verification, roles, payments, privacy, support, and log out functionality.

**4.1 Identity & Security** 

**4.1.1 Story: Account Information**  
Description: Allow users to update and manage their personal account details to ensure accuracy and maintain control over their identity information.

Tasks:

* Build profile update UI (full legal name, email, phone, DOB, address, citizenship/jurisdiction, marriage status, primary language with option for English and Bulgarian, children – Yes/No with additional fields if Yes, etc.). The fields in this section are also linked to the ones in Profile section of the Me category in Epic Me, My Family & My Network (see 2.2 below). All information editing in either of the sections should be reflected in the other.  
* Create logic for changing password, with success modal to inform user.  
* Verification logic for email and phone number with success modal.   
* Connect UI to profile service API.  
* Implement input validation (required fields and formats).  
* Implement audit logging of changes.  
* Unit & integration tests.

Acceptance Criteria:

* Given a logged-in user, when they update info and click save, then changes persist and confirmation is shown.  
* Given invalid input, when the user saves, then error messages display and no data is saved.  
* Given user changes password, new password becomes operational and user is informed about this.  
* Given a successful update, then the profile shows updated info immediately.

**4.1.2 Story: Identity Verification**  
Description: Provide a secure identity verification flow to comply with regulations and ensure account authenticity.

Tasks:

* Integrate with KYC provider (document \+ selfie \- Evrotrust).  
* Build verification flow UI (upload docs, status tracking).  
* Store verification status securely (verified, pending, failed).  
* Handle retry/failure logic – message display for failure to verify and CTA for retry.  
* Write automated tests (valid, invalid, expired docs).

Acceptance Criteria:

* Given a user submits docs, when the provider returns pending, then status is displayed as pending.  
* Given provider confirms verification, then account is marked verified.  
* Given provider fails verification, then user is notified and can retry.

**4.1.3 Story: Security & Devices**  
Description: Allow users to monitor and manage their active sessions and connected devices for improved security and control.

Tasks:

* Build Security & Devices dashboard UI showing active sessions with device details.  
* Implement backend service for session tracking and revocation.  
* Add revoke button for session termination and send notifications when revoked.  
* Implement security questions for account restoration features (in case of hacks).  
* Add 2FA settings UI to enable/disable with methods (authenticator app, SMS, email).  
* Implement backend logic for 2FA token generation, validation, and recovery codes.  
* Write unit, integration, and security tests for session management and 2FA flows.

Acceptance Criteria:

* Given a user is logged in, when they open Security & Devices, then they see a list of all their active sessions with device metadata.  
* Given a user has an active session, when they revoke it, then it is terminated immediately and they receive a notification.  
* Given a user’s account has been hacked, he can restore it safely.  
* Given a user enables 2FA, when they complete setup with their chosen method, then they are prompted for it at the next login.  
* Given a user has 2FA enabled, when recovery codes are generated, then they can use them to regain access if they lose their second factor.  
* Given a user performs a sensitive action (e.g., revoke a session), when 2FA is enabled, then they must confirm with their second factor before the action completes.

**4.1.4 Story: Notifications**  
Description: Enable users to configure how and when they receive alerts, ensuring personalized communication preferences.

Tasks:

* Preferences UI for notification channels \- email, SMS, push notifications.  
* Connect to notification service.  
* Save preferences in the backend.  
* Add preview/test notification feature.  
* Write test coverage.

Acceptance Criteria:

* User can toggle notification channels on/off.  
* Saving preferences updates backend.  
* Preview/test notification matches user’s chosen settings.

**4.2 Plan & Roles**  
**4.2.1 Story: Plan Activation (Legacy Mode)**  
Description: Allow users to define how their plan can be activated after death, either through a Dead Man’s Switch based on extended inactivity or through a designated Executor. If the Executor path is chosen, the appointed executor must first complete identity verification (KYC) and then upload the PlanOwner’s death certificate. The uploaded death certificate should be validated through an automated check using an integration with the death registry in Bulgaria and, where supported, relevant death registries in other countries \[Phase 2\]. Once verification is successful, the executor can activate the plan and make it available to beneficiaries according to permissions and plan rules.

Tasks:

* Build Legacy Mode activation workflow UI.  
* Allow the user to choose between a Dead Man’s Switch or an Executor activation  
* Build Dead Man’s Switch configuration options with activation timeframes such as 30 days of inactivity / 90 days of inactivity / 120 days of inactivity  
* Add options for how to contact the user in case of inactivity before activation, including direct user contact methods and emergency contacts  
* Build flow for the user to appoint one or more executors who can activate the plan after death.

* Require appointed executors to complete identity verification (KYC) before they can act on the activation workflow.  
* Build death certificate upload flow for verified executors.  
* Integrate death certificate auto-check against the death registry in Bulgaria and other supported countries.  
* Allow plan activation and beneficiary access only after required checks are completed successfully.  
* Add legal disclaimer and confirmation step.  
* Store Legacy Mode choice, activation settings, and executor designation in the backend.  
* Notify relevant users and trusted parties when Legacy Mode is configured or activated.  
* Write tests for activation, verification, certificate upload, registry validation, and deactivation flows.

Acceptance Criteria:

* User can activate Legacy Mode after confirmation.  
* Legacy status and selected activation method are visible in settings.  
* User can choose either a Dead Man’s Switch or executor-based activation.  
* User can designate one or more executors to activate the plan.  
* Given the executor-based path is selected, the executor must complete identity verification before they can upload a death certificate.  
* Given a verified executor uploads a death certificate, the system performs an automated registry check against Bulgaria and other supported countries.  
* Given the death certificate is successfully validated, the executor can activate the plan and open access to beneficiaries according to permissions.  
* Given the death certificate cannot be validated, activation is blocked and an appropriate error or review state is shown.  
* Given the Dead Man’s Switch path is selected, the system follows the configured inactivity and contact-verification workflow before activation.  
* Trusted contacts are notified of activation where applicable.

**4.2.2 Story: Trusted Contacts & Roles**  
Description: Display a roster of already-added trusted contacts with their current roles, invitation status and let the user manage per-contact preferences, resend invitations, and revoke all access at any time. 

Tasks:

* Build roster UI to display trusted contacts with avatar, name, relationship, role badge (read-only), status (Pending/Accepted/Declined), last activity and display list of specific information access. Should also include empty state with CTA when no contacts exist.  
* Add roster controls: search by name, filter by role/status/relationship, and sort by name/status/last updated.  
* Implement status chip component with color-coding and tooltips showing timestamp and invite email.  
* Provide “Resend Invitation” action for Pending/Declined contacts with backend integration, status history update, and rate limiting.  
    
* Provide “Revoke All Access” action with confirmation modal, optional re-auth, backend revoke call, status update to Revoked, token invalidation, logging, and contact notification.  
* Add per-contact preferences panel with toggles for notifications and data visibility, persist via backend, show success/failure toasts, and audit log changes.  
* Unit & integration tests.

Acceptance Criteria:

* When the page loads, trusted contacts are displayed with their name, relationship, read-only role badge(s), and status (Pending/Accepted/Declined) including relevant timestamps.  
* Pending or Declined contacts show a Resend option that updates status history and shows success feedback; Accepted contacts do not.  
* Selecting Revoke Access immediately removes all access, invalidates tokens, logs the action, notifies the contact, and updates the UI; cancelling does nothing.  
* Users can update notification/visibility preferences with persistence and success toasts; invalid combinations trigger validation errors; all changes are audit logged.  
* Filtering by role (e.g., Executors) and sorting by status or name update the displayed list accordingly.

**4.3 Payments**

**4.3.1 Story: Subscription & Billing**  
Description:Allow users to manage their subscriptions, view billing history, handle payment updates, and purchase plans as gifts for other users. The section should support self-paid, sponsored, and gifted plan scenarios, while making it clear who is paying for the plan and what actions are available to the current user.

Tasks:

* Implement status indicators for storage capacity currently used in the plan, renewal date, payment status / payment source (e.g. Paid by Me, Paid by Company, Paid by \[Name\])  
* Allow users to take over payment when the plan is currently paid by someone else and takeover is permitted.  
* Support corporate-sponsored and other sponsored account flows, including notifying the sponsor when the sponsored term is ending, asking whether they want to pay for another term, notifying the PlanOwner if the sponsor renews, notifying the PlanOwner if the sponsor does not renew and offering the option to pay  
* Integrate payment processor (Stripe, PayPal, etc.).  
* Build subscription management UI for plan selection, upgrades, downgrades and gift purchases  
* Support gift-plan flows including selecting the gifted plan, assigning or sending the gift to the recipient, storing the gifting relationship in the backend and ensuring the gifted user is not required to pay while the gift is active  
* Build payment-method management UI (debit card, credit card, Apple Pay, etc.), with the ability to add and switch payment methods, switch providers where supported and add promo codes for discounts

* Provide billing and invoice settings for managing billing preferences.  
* Show billing history and invoices.  
* Implement logic for failed, expired, or interrupted payments.  
* Write billing, gifting, and payment-related tests.

Acceptance Criteria:

* User can view their current plan and billing history.  
* User can update their subscription plan successfully.  
* Failed payments trigger user notifications.  
* Given a user purchases a plan as a gift, the gifted plan is stored correctly and linked to the recipient.  
* Given a user receives a gifted plan, they are not required to pay while the gifted subscription is active.  
* Given a gifted or sponsored plan is ending, the relevant user is notified and shown the correct next-step options.  
* Given a user is eligible to take over payment, they can do so successfully.


  
**4.4 Privacy & Legal**

**4.4.1 Story: Privacy & Legal Policies**  
Description: Ensure users have easy access to privacy and legal policies and can acknowledge them for compliance.

Tasks:

* Display terms of service, privacy policy and cookie policy.  
* Link documents in app settings.  
* Add acknowledgement checkbox during onboarding.  
* Store user acceptance records.  
* Manage AI permissions and preferences.   
* Tests for legal compliance.

Acceptance Criteria:

* User can access and view policies at any time.  
* Policy acceptance is recorded with timestamp.  
* User manages their AI preferences and permissions.

**4.5 Support**

**4.5.1 Story: Help & Support**  
Description: Provide a help centre with FAQs, support tickets, and chatbot to ensure users can resolve issues quickly.

Tasks:

* Build Help Centre UI with FAQ & search.  
* Add support request/ticket form.  
* Integrate chatbot.  
* Store support requests in backend.  
* Write tests for support flows.

Acceptance Criteria:

* User can access FAQ and search for help topics.  
* User can submit a support request successfully.  
* Support tickets are stored and tracked.

**4.5.2 Story: Account Closure**  
Description: Allow users to close their account while ensuring compliance with retention and notification requirements.

Tasks:

* Build account closure workflow with confirmation.  
* Backend anonymization/retention logic.  
* Add legal disclaimer screen.  
* Notify trusted contacts upon closure.  
* Write tests for closure flow.

Acceptance Criteria:

* User can request account closure with confirmation step.  
* Closure complies with retention requirements.  
* Trusted contacts are notified of account closure.

**4.6 Log Out**

**4.6.1 Story: Secure Log Out**  
Description: Provide a secure log out mechanism that terminates sessions and ensures user safety across devices.

Tasks:

* Implement logout button UI.  
* Backend token/session invalidation.  
* Redirect user to login screen.  
* Add “logout all devices” option.  
* Write logout flow tests.  
* Settings and logic for inactivity session – eg. After 15 minutes of no user activity, 30 second timer displays that logs out user automatically unless confirms still present. Change option for inactivity timer (eg. 10/15/30 minutes).

Acceptance Criteria:

* User can log out and session is invalidated immediately.  
* “Logout all” ends sessions on all devices.  
* After logout, user is redirected to login screen.  
* User can set inactivity timer preferences for automatic logout.

# **Epic 5: Me, My Family & My Network \[PHASE 1\]** {#epic-5:-me,-my-family-&-my-network-[phase-1]}

Description: Allow users to define and maintain their personal profile, capture family structure, and manage non-family network contacts. This ensures the platform reflects the user’s real-world relationships and provides context for role assignments, legacy planning, and communication. Each individual record in this Epic should follow a structured input experience using collapsible cards, similar to the approach used in the Assets & Liabilities section. While each record type may include category-specific cards depending on whether the person is the user, a family member, or a network contact, all records must consistently include the shared cards Basic Info, Contact Info, Tasks & Reminders, and Shared With.

Each individual record should also be organized into four tabs:

* Overview – contains all collapsible cards for that individual  
* Document Entries – contains all document entries associated with that individual  
* Album – contains photos and media related to that individual  
* Life Story – contains narrative, memories, milestones, and other biographical content related to that individual

In addition, when an individual passes away, a Memorial tab ( and page [**https://www.forevermissed.com**](https://www.forevermissed.com) \- we already have a domain for this pages [RememberdAfter.com](http://RememberdAfter.com))  should appear for that record, providing a dedicated space for memorial-related content and remembrance. This creates a unified, scalable, and life-cycle-aware way to manage personal, family, and network records across the module.

**5.1 Story: My Profile (PlanOwner)**

Description: Provide the PlanOwner with the ability to create, view, and update their personal profile, which serves as the main personal record and foundation for family, network, legal, and planning information across the platform. The My Profile record is created during onboarding and should include a dedicated record header that surfaces identity, status, identity verification, and access information at a glance. It should also include the standard record tabs and structured collapsible cards used throughout the platform.

Tasks:

* Build the My Profile UI for the PlanOwner, linked with the user Profile section in Settings.  
* Implement a dedicated record header for My Profile that includes:  
  * back navigation  
  * avatar / profile photo with status indicator  
  * full legal name  
  * breadcrumb navigation  
  * date of birth and calculated age  
  * date of death and age at passing, when applicable  
  * fixed role display as PlanOwner  
  * shared access summary  
  * identity verification status

* Add header actions for:  
  * **Verify Identity**  
  * **Add Family**  
  * **Download**  
  * **Share**

* Ensure legal name and date of birth become read-only after successful **identity verification**.  
* Implement the standard tabs:  
  * **Overview**  
  * **Document Entries**  
  * **Album**  
  * **Life Story**  
  * **Memorial** (visible only when the individual is deceased) from where an individual memorial page www.(name of the person)RememberedAfter.com  (similar to  [**https://www.forevermissed.com**](https://www.forevermissed.com))   
* Build the **Overview** tab using collapsible cards for:  
  * **Essential Info**  
  * **Contact Info**  
  * **Family & Relationships**  
  * **Medical Info**  
  * **Education**  
  * **Employment & Affiliations**  
  * **Beliefs, Hobbies & Interests**  
  * **Roles & Access in Your Plan**  
  * **Tasks & Reminders**  
  * **Shared With**

* Connect to backend services for reading and writing profile data.  
* Enable document entry attachment on each category-specific card, except for Basic Info, Shared With, and Tasks & Reminders.  
* Create time/date and event-based triggers for sharing collapsible cards information under the Shared With card  
* Implement input validation for required and formatted fields.  
* Store profile metadata such as created and updated timestamps.  
* Add audit logging for profile updates and sensitive header actions.

Acceptance Criteria:

* Given a logged-in user, when they update their profile and click save, then changes persist and a confirmation is shown.  
* Given invalid inputs, when the user attempts to save, then error messages are displayed and no invalid data is stored.  
* Given a successful update, then the profile immediately reflects the new information.  
* Given the user opens My Profile, then the record header displays identity, status, identity verification, and access information.  
* Given the user opens the record, then the tabs Overview, Document Entries, Album, and Life Story are visible.  
* Given the record is marked as deceased, then a Memorial tab appears.  
* Given the user opens the Overview tab, then the record is organized into the defined collapsible cards.  
* Given the user clicks Verify Identity, then the identity verification flow starts.  
* Given the user clicks Add Family, then the add-family flow opens.  
* Given the user clicks Download, then a PDF version of the record is generated.  
* Given the user clicks Share, then the sharing modal opens.  
* Given identity verification is completed, then legal name and date of birth become read-only.  
* Given changes are made to the profile, then audit logs and updated timestamps are recorded.


  
**5.2 Story: My Family**

Description: My Family is where users manage records for the people and pets in their family network, including spouse or partner, children, parents, siblings, extended family, and pets. Each record stays in the right category and follows a consistent structure used across the platform for family relationships, guardianship, inheritance, legal workflows, emotional legacy, and role-based access. It combines structured family records with a Family Tree view (shown in Emotional Legacy), includes a header with family stats, and supports actions like sharing, downloading, archiving, deleting, and updating life status. In Family Plans, the My Profile, My Family, and Family Tree sections are shared between both account holders.  
 

**5.2.1 Story: My Family Records**  
Description: Allow users to create and manage Family Member Records for immediate and extended family in a structured, secure, and reusable way. Each family member should exist as a single unique person record used across the platform for family structure, inheritance logic, guardianship, legal workflows, executor workflows, and emotional legacy. Family Member Records should follow the same personal-record structure as My Profile, with tabs for Overview, Document Entries, Album, Life Story, and Memorial when deceased, and with Overview cards including Essential Info, Contact Info, Family & Relationships, Medical Info, Education, Employment & Affiliations, Beliefs, Hobbies & Interests, Roles & Access in PlanAfter, Tasks & Reminders, and Shared With.

Tasks:

* Build category-based family record flows for Spouse / Partner, Children, Parents, Siblings, Extended Family, Pets

* Ensure each family record stays in its correct category while following a common record structure.  
* Support category-specific relationship labels and metadata.  
* ​​Add a My Family header that displays family stats and summary information.  
* Build a standard header for each individual record that shows key summary details (identity, life status, relationship or plan role) and main record actions (add family, download, share, gift plan)  
* Support standard tabs and collapsible-card layouts across family records.  
* Allow upload and management of related documents, photos, and other record content where applicable.  
* Support Family Plan behavior so that shared family records are visible and usable by both account holders where applicable.  
* Ensure that in Family Plans, changes made in shared My Profile, My Family, and Family Tree contexts stay synchronized between the two account holders.  
* Enable linking family records to plan roles and permissions where relevant.  
* Ensure records display correctly in the family roster and family tree where applicable.  
* Show duplicate warnings when the same individual or pet is added twice.  
* Add record actions for sharing a record, downloading a record, deleting a record, updating life status, archiving a record  
* Ensure life status updates affect record behavior, including memorial state where applicable.  
* Gifting a family member a plan should make his /her record become the other person’s Profile record in the new gifted plan  
* Enable document entry attachment on each category-specific card, except for Basic Info, Shared With, and Tasks & Reminders.  
* Create time/date and event-based triggers for sharing collapsible cards information under the Shared With card  
* Ensure archived records are no longer shown in active views and are handled according to archive logic.  
* Show duplicate warnings when the same person is added twice.

Acceptance Criteria:

* User can add, edit, and remove family records within their relevant family category.  
* Family records remain organized under the correct category in My Family.  
* Each family record follows the standard structured-record approach.  
* Family members display correctly in the family roster and family tree where applicable.  
* Relevant documents, photos, and related content can be added to the record where supported.  
* Family records can be linked to roles where applicable.  
* Given a user shares a family record, access is granted according to roles and permissions.  
* Given a user downloads a family record, the record is generated and downloaded successfully.  
* Given a user deletes a family record, the system requests confirmation before deletion.  
* Given a user updates the life status of a family record, the record updates accordingly and memorial behavior appears where applicable.  
* Given a user archives a family record, it is removed from active views and handled as archived.  
* Given the users are on a Family Plan, shared My Profile, My Family, and Family Tree data is visible consistently to both account holders according to the Family Plan model.  
* Given the users are on a Family Plan, their My Profile records become each other’s Family member records (and vice versa)  
* Duplicate warnings are displayed if the same record is added twice.


  
**5.2.2 Story: Relationship Engine**  
Description: Build a Relationship Engine that manages family and personal record connections across the platform. The engine must ensure that relationships are always stored consistently in both directions, that inverse relationship labels are applied correctly based on the record being viewed, and that updates to one relationship can trigger recalculation of other related relationships. It should support auto-created and suggested links where appropriate, while avoiding unsafe assumptions for unclear relationship types such as spouse-to-child, sibling subtype, step relationships, and in-law relationships.

Tasks:

* Implement bidirectional relationship logic so that when a relationship is created or updated between Record A and Record B, the reverse relationship is automatically created or updated.  
* Store a single underlying relationship link while allowing the UI wording to change based on record perspective.  
* Map each selected relationship type to the correct inverse relationship type.  
* Store relationship-level dates on the link itself so the same dates appear consistently in both related records.  
* Exclude relationship start dates where they are not meaningful, such as for biological parent/child, biological sibling, or biological grandparent/grandchild relationships.  
* Run a Relationship Recalculation step after any relationship is created or edited.  
* Support two recalculation tiers \- Tier A: auto-create logically certain relationships without confirmation; Tier B: suggest plausible relationships that require user confirmation  
* When a child is added and the anchor record already has a spouse or partner, add the child into the spouse or partner’s family view and prompt the user to clarify that spouse’s relationship to the child.  
* Support spouse-to-child clarification options such as Biological Parent, Adoptive Parent, Step-Parent  
* Treat unclear spouse-to-child links as needs clarification until confirmed.  
* Create sibling links immediately in both directions as a generic Sibling relationship where subtype is not yet known.  
* Prompt the user to clarify whether a sibling relationship is biological, half, or step.  
* Label unclear sibling links as Sibling — needs clarification until confirmed.  
* Suggest step relationships, in-law relationships, and other marriage-derived relationships only when confidence is high, but require user confirmation before finalizing them.  
* Implement deterministic conflict handling for impossible states, such as multiple current spouses where only one is allowed.  
* Support relationship upgrades when new information makes a relationship more specific, such as Sibling: unknown → half → full; Parent: Biological Parent → Biological Mother / Biological Father when sex or gender is known  
* Ensure recalculated, suggested, and upgraded relationships are reflected consistently across family records, the family roster, and the family tree.  
* Write unit and integration tests for bidirectional logic, recalculation, suggestions, confirmation flows, conflict handling, and upgrades.

Acceptance Criteria:

* Given a user creates a relationship between two records, the reverse relationship is automatically created or updated.  
* Given a relationship is viewed from each record, the wording reflects the correct perspective while preserving the same underlying link.  
* Given a relationship includes shared dates such as marriage, civil partnership, engagement, adoption, or divorce, the same dates appear in both related records.  
* Given a relationship is added or edited, the system runs relationship recalculation.  
* Given a recalculated relationship is logically certain, it is auto-created without confirmation.  
* Given a recalculated relationship is plausible but not guaranteed, it is suggested and requires user confirmation.  
* Given a user adds a child and the anchor record already has a spouse or partner, the child also appears in the spouse or partner’s family view.  
* Given a spouse-to-child relationship has not yet been clarified, it is marked as needs clarification and is not treated as biological parent data.  
* Given a user adds a sibling, both records immediately show each other under Siblings.  
* Given the sibling subtype is not confirmed, the relationship is shown as Sibling — needs clarification.  
* Given the user confirms the sibling type, the correct sibling label is applied in both records.  
* Given a suggested step or in-law relationship is not confirmed, it is not finalized as an actual relationship.  
* Given new information creates an impossible relationship state, the system blocks the change and requires user resolution.  
* Given new information makes a relationship more specific, the system upgrades the relationship label accordingly.  
* Given relationships are recalculated, confirmed, or upgraded, the family roster and family tree reflect the updated structure consistently.


  
**5.3 Story: Life Story Tab**  
Description: Provide a Life Story tab that combines automatically generated life milestones from the Overview data with personal reflection entries, memories, and media. It should present a chronological view of a person’s life and allow contributions from the PlanOwner, the person the record is about, and permitted third parties.

Tasks:

* Build a Life Story tab for personal and family member records where applicable.  
* Automatically generate a chronological timeline of key facts using data from the Overview section.  
* Display facts such as date of birth, education milestones, career milestones and other relevant structured life events  
* Display the life story in a clear chronological format.  
* Build Reflection Entries functionality for adding personal and memory-based content.  
* Allow the PlanOwner to add personal reflections, answers to guided questions, notes and attached photos and media  
* Allow the PlanOwner to invite the person the record is about to contribute their own reflections and answers.  
* Allow third parties to contribute memories, comments, or questionnaire-style entries where permitted.  
* Support guided prompts and question sets to help users create meaningful entries.  
* Allow reflection entries to include text, images, and other media attachments.  
* Ensure contributions are permission-based and clearly attributed by source.  
* Keep fact-based timeline items distinct from reflection entries, while presenting them together as one life story experience.  
* Write unit and integration tests.

Acceptance Criteria:

* Given a record has structured data in Overview, the Life Story tab shows key life facts in chronological order.  
* Given birth, education, or career data exists, those milestones appear automatically in the life story.  
* Given a user adds a reflection entry, it is saved and displayed in the Life Story tab.  
* Given the PlanOwner answers guided questions, those answers can include attached photos or media.  
* Given the PlanOwner invites the person the record is about, that person can contribute their own entries where permitted.  
* Given a third party is allowed to contribute, they can add memories or questionnaire-style entries for that record.  
* Given multiple contribution types exist, each entry shows its source clearly.  
* Given permissions do not allow contribution, the user cannot add or edit reflection entries.  
* Given the Life Story contains both fact-based items and reflections, they are displayed together in a coherent timeline without confusion.

**5.3 Story: My Network**

Description: Allow users to create and manage non-family contacts as structured My Network records for people such as friends, advisors, caregivers, doctors, lawyers, and colleagues. These records can be used across the platform for communication, task assignment, sharing, and role-based access. Each record should include a header, the tabs Overview, Document Entries, and Memorial when deceased, and the Overview cards Essential Info, Contact Info, Roles & Access in Your Plan, Tasks & Reminders, and Shared With. Network contacts do not appear in the Family Tree.

Tasks:

* Build Network Contact Record creation and edit flow in My Network.  
* Support creation from multiple entry points, including My Network page, other records, tasks/instructions/workflows, document-linking quick add, dashboard/legal/health,  post-loss flows, AI / system suggestions when a new person is detected  
* Build the record with a header, Overview tab, Document Entries tab, Memorial tab when deceased  
* Build the Overview tab with the cards: Essential Info, Contact Info, Roles & Access in Your Plan, Tasks & Reminders, Shared With  
* Support Role in Your Life values such as friend, business partner, doctor, therapist, lawyer, accountant, financial advisor, insurance broker, personal banker, colleague, HR contact, teacher, caregiver, neighbor, and other.  
* Allow linking contacts to plan roles and permissions such as Executor, Contributor, and Beneficiary where applicable.  
* Allow storage of notes, documents, and contact-related information relevant to the person’s role.  
* Ensure network contacts can be tagged in documents, tasks, memories, and shared access flows.  
* Prevent network contacts from appearing in the Family Tree.  
* Allow conversion of a Network Contact into a Family Member Record where needed.  
* Show duplicate warnings when the same contact is added twice.

Acceptance Criteria:

* User can add, edit, and remove non-family network contacts.  
* Contacts appear in My Network with their relationship / role labels.  
* A Network Contact is created as a structured record with a header and the tabs Overview, Document Entries, and Memorial when applicable.  
* The Overview tab includes the cards Essential Info, Contact Info, Roles & Access in Your PlanAfter, Tasks & Reminders, and Shared With.  
* Network contacts can be linked to plan roles where applicable.  
* Network contacts can be used in tasks, workflows, document links, emergency flows, and sharing logic.  
* Network contacts do not appear in the Family Tree.  
* Duplicate warnings are displayed if the same contact is added twice.  
* User can add, edit, and remove non-family network contacts.  
* Contacts appear in the “My Network” section with relationship labels.

# **Epic 6: [My Plan](#epic-8:-my-plan-–-assets-&-liabilities-[phase-1])\- Emotional Legacy \[PHASE 1\]/ \[PHASE 2\]** {#epic-6:-my-plan--emotional-legacy-[phase-1]/-[phase-2]}

Description: Provide users with tools to reflect on their lives, capture memories, share values, and leave meaningful content for loved ones.

**6.1 Professional Psychological Support \[Phase 2\]**

Description: Provide users with access to professional psychological support through a single section that combines guided self-assessment questionnaires, session booking for themselves, and the ability to organize support for loved ones where permitted. This section should help users better understand their emotional well-being, connect with professional support, and manage related sessions and history in one place.

Tasks:

* Build a section for Professional Psychological Support.  
* Build guided self-assessment questionnaire flows with multiple question types.  
* Implement backend scoring and result calculation logic.  
* Store assessment results with timestamps and allow retrieval of history.  
* Display progress charts and trends across multiple assessments.  
* Add export and download options for sharing assessment results with professionals.  
* Build booking UI for psychological support sessions, including calendar, provider selection, session type.  
* Integrate backend scheduling services.  
* Implement notifications and reminders for booked sessions.  
* Store booking history and session details.  
* Allow cancellation and rescheduling of sessions.  
* Build UI for organizing support sessions for loved ones or trusted contacts.  
* Support selecting the loved one, defining session type, and linking the booking to that person.  
* Provide consent management and authorization controls for booking on behalf of another person.  
* Notify relevant parties of scheduled, changed, or cancelled sessions.  
* Write unit and integration tests for questionnaire, scoring, booking, consent, and history flows.

Acceptance Criteria:

* Given a user completes a questionnaire, when they submit it, then results are saved with a timestamp.  
* Given a user has completed multiple questionnaires, when they view history, then past results are displayed in order.  
* Given a user views their assessments, when history is available, then trends and progress over time are visible.  
* Given a user wants to share results, when they export data, then a file is generated securely.  
* Given invalid questionnaire inputs, when the user attempts submission, then an error message is displayed and no results are saved.  
* Given a user selects a date and provider, when they confirm, then the session is booked and stored.  
* Given a booked session, when the date approaches, then the user receives a reminder notification.  
* Given a booked session, when the user cancels or reschedules, then the system updates the booking and sends the appropriate notifications.  
* Given a user views session history, when previous bookings exist, then all details are displayed.  
* Given a user selects a loved one and has the required consent, when they confirm a session, then it is booked and linked to that loved one.  
* Given a loved one has a scheduled session, when booking is complete, then the relevant parties receive notifications.  
* Given a user attempts to book for another person without consent, then the system blocks the booking.  
* Given invalid booking details are submitted, then the system prevents scheduling and shows errors.

**6.2 Life Reflection and Ethical Will**

**6.2.1 Story: Year in Review / Time Capsule/ Life reflection** 

Description: Enable users to complete a guided questionnaire that captures yearly reflections, highlights, memories, and personal responses. The questionnaire can be created for the user themselves or for a Family Member Record. It can be started either from this section or from the Life Story tab within a record. The questionnaire may be completed by the user directly or sent to another person to complete in a keepsake-book / reflection format, where permitted.

Tasks:

* Build the section as a guided questionnaire flow.

* Allow the questionnaire to be created for the user themselves or for a Family Member Record

* Allow the questionnaire flow to be started from this section or from the Life Story tab of a record

* Allow the user to either complete the questionnaire themselves or send it to another person to complete

* Support questionnaire prompts for yearly reflections, highlights, memories, and personal answers.

* Allow responses to include text, images, videos and voice recordings.

* Implement tagging for year and category (e.g. family, career, health, milestones).

* Store entries securely with timestamp.

* Allow playback or “unlock” at a future date.

* Provide sharing options with trusted contacts.

* Write tests for creation, sharing, completion, and retrieval.

Acceptance Criteria:

* Given a user starts this feature, they are presented with a guided questionnaire flow.

* Given a user creates a reflection, they can choose whether it is for themselves or for a Family Member Record.

* Given a user starts the questionnaire, they can do so either from this section or from the Life Story tab of a record.  
* Given a user chooses to complete the questionnaire themselves, their responses are saved to the correct profile or record.  
* Given a user chooses to send the questionnaire to another person, that person can complete it where permitted.  
* Given a questionnaire response is saved, it is stored with the year and timestamp.  
* Given a user sets a future unlock date, when that date arrives, then the reflection becomes viewable.  
* Given a user views history, then past reflections are displayed in chronological order.  
* Given a reflection is shared, then trusted contacts can access it securely according to permissions.  
* Given invalid inputs, when saving, then errors are displayed and no entry is stored.

**6.2.2 Story: Ethical Will – Life Story, Values, and Memories**  
Description: Allow users to document their life story, values, and memories as a form of an ethical will for loved ones.

Tasks:

* Provide editor UI for writing and organizing life stories.  
* Support attachments (photos, audio, video).  
* Implement secure storage with encryption.  
* Add ability to structure content into chapters or themes.  
* Provide preview and export options (PDF, multimedia package).  
* Unit and integration tests.

Acceptance Criteria:

* Given a user writes a life story, when they save it, then it is stored securely.  
* Given a user organizes content, then chapters and themes are preserved.  
* Given attachments are uploaded, then they are linked and retrievable with the story.  
* Given a user exports their ethical will, then it generates a secure file/package.  
* Given invalid uploads or inputs, then the system blocks saving and shows errors.

**6.2.3 Story: Family Story and Tree (Interactive Visualization Tools)** 

Description: Provide a **Family Tree** view that visually maps the PlanOwner’s family network around the PlanOwner as the anchor point. The Family Tree should help users understand family structure at a glance, navigate relationships visually, and extend the tree through guided add flows. It should reflect relationship data from the platform consistently and distinguish clearly between different relationship types.

Tasks:

* Build a PlanOwner-anchored Family Tree view with the PlanOwner centered in the layout.  
* Display family members as linked summary cards arranged by generation, including children above the PlanOwner, parents below, grandparents further below when available, spouse / partner alongside the PlanOwner

* Display each family member card with profile photo or avatar, name, specific role label, key date line, age or age at death where applicable  
* Add a “+” action on cards to allow users to extend the tree from that person, subject to rules and permissions.  
* Build tree navigation controls for centering on the PlanOwner and zooming in and out.  
* Build a guided Quick Add / Add Relatives state around the PlanOwner that supports only direct relationships \- Add Parent, Add Child, Add Sibling, Add Partner.  
* Ensure extended relatives cannot be added directly from the PlanOwner Quick Add state until valid connecting family nodes exist.  
* Visually distinguish relationship lines for biological relationships, step relationships, half relationships.  
* Highlight the relationship path to the PlanOwner when a user hovers over a family member.  
* Support three views within the Family area: Family Tree, Family Members, Timeline.  
* Add a My Family quick-access strip above the views for fast switching between key family members.  
* Build the Family Members view as a structured list grouped by category.  
* Build the Timeline view as milestone-based story cards grouped by life stage or generation.  
* Add Timeline actions such as Add Family, Download, Preview, Print.  
* Ensure the Family Tree stays consistent with the underlying family records and relationship data.

Acceptance Criteria:

* Given a user opens the Family Tree, the PlanOwner appears as the anchor in the center of the tree.  
* Given family members exist, they are positioned by generation relative to the PlanOwner.  
* Given a family member card is shown, it displays avatar, name, specific relationship label, key date information, and age where applicable.  
* Given the user clicks the “+” action on a permitted node, they can extend the tree according to the allowed relationship rules.  
* Given the user enters the PlanOwner Quick Add state, they can add only a parent, child, sibling, or partner directly from that state.  
* Given an extended relative does not yet have a valid connecting node, the system does not allow that person to be added directly from the PlanOwner Quick Add flow.  
* Given relationship lines are shown in the tree, biological, step, and half relationships are visually distinct.  
* Given the user hovers over a family member, the path connecting that member to the PlanOwner is highlighted.  
* Given the user uses the center control, the view re-centers on the PlanOwner.  
* Given the user uses zoom controls, the tree zooms in or out correctly.  
* Given the user switches between Family Tree, Family Members, and Timeline, the same underlying family network is reflected consistently.

* Given the user uses the My Family quick-access strip, they can jump directly to the selected family member context.  
* Given the user opens the Timeline view, family milestones are shown as story cards grouped by life stage or generation.  
* Given the user selects Download or Print from the Timeline view, the relevant export action is triggered successfully.


  
**6.2.4 Story: Letters & Messages to Loved Ones**  
Description: Allow users to create and store letters or messages that can be securely delivered to loved ones now or in the future.

Tasks:

* Build editor UI for creating letters/messages.  
* Implement encryption for all messages.  
* Add scheduling option for future release.  
* Notify recipients when a message is delivered.  
* Store message history for the user.  
* Unit and integration tests.

Acceptance Criteria:

* Given a user writes a letter, when they save it, then it is stored securely.  
* Given a user sets a delivery date, when that date arrives, then the letter is delivered to the recipient.  
* Given multiple letters exist, when a user views history, then all letters are listed with statuses.  
* Given a delivery occurs, then the recipient is notified and can access the message securely.  
* Given encryption is applied, then only authorized recipients can read the content.

# **Epic 7: [My Plan](#epic-8:-my-plan-–-assets-&-liabilities-[phase-1])\- Body & Health \[PHASE 1\]** {#epic-7:-my-plan--body-&-health-[phase-1]}

Description: Provide users with a guided questionnaire and input-based section to think through, record, and organize their wishes around health, aging, emergencies, and what should happen after death. The section should explain why each topic matters, help users reflect on and document their preferences for their loved ones, and include references to the Will & Legal Actions section so users can attach an existing document or be prompted to create one if they do not yet have it. The content should be organized into three main categories: In Case of Emergency, Getting Old, and After I’m Gone, covering topics such as medical and emergency information, later-life care, what should happen to the user’s body, funeral and ceremony preferences, related document entries such as family burial plots, and the ability to prepare an obituary or memorial page ( www.(name of the person)RememberedAfter.com  (similar to  [**https://www.forevermissed.com**](https://www.forevermissed.com))  for later use by the executor.

**7.1 Story: Healthcare Info / In Case of Emergency**

Description: Allow users to record, manage, and securely store key healthcare and emergency-related information in one place, including general medical information, family health history, genetic information, and organ and tissue donation preferences. This section should help users prepare for emergencies and make important health information accessible to authorized people when needed.

Tasks:

* Build a unified Healthcare Info / In Case of Emergency section.  
* Allow users to record and manage general medical history, allergies, medications, family health history and genetic information, organ and tissue donation preferences.  
* Allow upload of related medical and supporting documents.  
* Encrypt and securely store all healthcare data and uploaded documents.  
* Allow linking relevant health history or genetic information to family member records where applicable.  
* Provide summary and emergency views for critical healthcare information.  
* Provide print and export options for emergency and healthcare use.  
* Enable sharing with trusted contacts or other permitted users where applicable.  
* Prompt users to create medical legal documents (Living Will, Medical Proxy, DNR) in the Will & Legal Documents section (or reference them if they already have them)   
* Support updating records with version history.  
* Write unit and integration tests.

Acceptance Criteria:

* Given a user enters healthcare or emergency information, when they save, then the data is stored securely.  
* Given a user has saved healthcare information, when they view it later, then all information is displayed correctly.  
* Given a user uploads related healthcare documents, then they are stored securely and are retrievable.  
* Given a user updates healthcare information, then version history is preserved.  
* Given a user links relevant health history to family members, then it displays correctly where applicable.  
* Given a user requests print or export, then a secure emergency or healthcare file is generated.  
* Given a user shares healthcare information, then authorized contacts can access it securely according to permissions.  
* Given unauthorized access is attempted, then the system prevents access.


**7.2 Story: End-of-Life Care / Getting Old**

Description: Allow users to record, manage, and securely store preferences related to end-of-life care and later-life support in one place, including palliative care, hospice care, pain management, and spiritual or religious needs. This section should help users express how they want to be cared for as they age or approach end of life, while making those preferences accessible to authorized people when needed.

Tasks:

* Build a unified End-of-Life Care / Getting Old section.  
* Allow users to record and manage palliative care wishes, hospice care preferences, pain management preferences, spiritual and religious needs.  
* Allow attachment of related care documents, instructions, and notes.  
* Allow linking to relevant providers or facilities where applicable.  
* Encrypt and securely store all end-of-life care information and uploaded documents.  
* Enable sharing with healthcare proxies, family members, or other permitted users where applicable.  
* Support updating records with version history and audit logging.  
* Provide secure retrieval of all saved preferences and attachments.  
* Write unit and integration tests

Acceptance Criteria:

* Given a user records end-of-life care preferences, then they are saved securely.  
* Given a user uploads related attachments, then they are stored securely and retrievable.  
* Given a user updates their preferences, then the latest version is visible and history is preserved.  
* Given a healthcare proxy is assigned, then they can access the relevant preferences according to permissions.  
* Given preferences are shared with permitted family members, then those users can view them securely.  
* Given linked providers or facilities are added, then their details are displayed correctly.  
* Given a user specifies treatment preferences, medications, restrictions, or spiritual needs, then those are included in the record.  
* Given unauthorized access is attempted, then the system denies access.

**7.3 Funeral & Memorial Planning / When I’m Gone**

Description: Allow users to record, manage, and securely store their funeral and memorial preferences in one place, including burial or cremation wishes, funeral or memorial service preferences, preferred funeral home or provider, pre-paid funeral arrangements, and create  a digital obituary or memorial page  (www. \<name of the person\>RememberedAfter.com  (similar to  [**https://www.forevermissed.com**](https://www.forevermissed.com)). This section should help users communicate their wishes clearly and make them accessible to authorized family members, proxies, or other permitted users when needed.

Tasks:

* Build a unified Funeral & Memorial Planning / When I’m Gone section.  
* Allow users to record and manage burial or cremation preferences, funeral or memorial service preferences, preferred funeral home or provider and pre-paid funeral arrangements  
* Allow the creation of a digital obituary or memorial page (with more sharing and better creation capabilities more designs and functionalities  in Phase 2\)  
* Allow upload and storage of related documents such as contracts, receipts, service outlines, and provider information.  
* Allow users to add notes, text, photos, and videos where applicable.  
* Encrypt and securely store all funeral and memorial planning data and attachments.  
* Provide export and secure sharing options for family members, proxies, funeral providers, or other permitted users.  
* Support updating records with version history where relevant.  
* Keep digital obituary or memorial content unpublished until the appropriate trigger or publishing workflow is completed.  
* Provide a publishing workflow for authorized family members or proxies for digital obituary or memorial pages www.(name of the person)RememberedAfter.com  (similar to  [**https://www.forevermissed.com**](https://www.forevermissed.com)) .  
* Write unit and integration tests.

Acceptance Criteria:

* Given a user records funeral or memorial preferences, then they are stored securely.  
* Given a user uploads related documents or media, then they are stored securely and retrievable.  
* Given a user updates their funeral or memorial preferences, then the latest information is shown and history is preserved where applicable.  
* Given export or sharing is requested, then the relevant information can be shared securely with authorized users.  
* Given a preferred provider or pre-paid arrangement is recorded, then those details display correctly.  
* Given digital obituary or memorial content is created, then it remains protected and unpublished until the correct publishing flow is triggered.  
* Given authorized family members or proxies have access, then they can view the relevant funeral and memorial planning information securely.  
* Given unauthorized access is attempted, then the system denies access.


# **Epic 8: My Plan – Assets & Liabilities \[PHASE 1\]** {#epic-8:-my-plan-–-assets-&-liabilities-[phase-1]}

Description: Enable users to record, organize, and manage all their assets and liabilities in a structured, centralized view. Each asset or liability can include metadata, linked documents, and associated tasks that appear in the Tasks & Reminders section for both the user and trusted contacts (depending on roles and permissions). This ensures users and their families have a complete and actionable financial picture. 

**8.0 Story: Assets & Liabilities – Statistics, Breakdown, Completeness & Archived View**

Description: Develop a Stats and Insights module within the Assets & Liabilities section that not only calculates the user’s Total Assets, Total Liabilities, and resulting Net Worth, but also provides an intuitive breakdown by category, tracks completion progress, and includes a dedicated view for archived items. This module will help users understand their current financial position, identify missing data, and maintain access to previously archived records (such as sold properties, closed accounts, or deceased family members). In Phase 1, calculations will be based primarily on user-entered and stored data. In Phase 2, the platform should evolve toward more real-time and dynamically updated net worth and asset valuation through selected third-party integrations, such as bank account connectivity in accordance with the Open Banking Directive, market data feeds for stocks and bonds, vehicle valuation platforms, crypto platforms, and other relevant valuation sources.

Tasks:

* Aggregation & Calculation:  
  * Calculate total asset values using active (non-archived) records only.  
  * Calculate total liability values using active (non-archived) records only.  
  * Derive net worth by subtracting total liabilities from total assets.  
  * Break down each category’s contribution (Financial, Real Estate, Vehicles, etc.) as a percentage of the total.  
  * Track category-level completeness by identifying which asset and liability categories have at least one item entered.

* Visual Stats & Insights Display:  
* Create summary tiles showing:  
  * Total Assets  
  * Total Liabilities  
  * Net Worth

* Add a comparison bar showing assets vs. liabilities, including trend indicators where applicable.  
* Add horizontal stacked bar charts visualizing the percentage contribution of each category.  
* Add a completion progress indicator (e.g. “You’ve filled 6 of 10 categories”).

* Missing Data & Completion Prompts:  
  * Display a list of categories with no entries.  
  * Offer CTA buttons to add missing data (e.g. “Add Your Vehicle Info”).

* Archived Items View:  
* Build an Archived Items view where users can:  
  * See all previously archived items, grouped by Assets or Liabilities.  
  * View the value of each archived item.  
  * View the last update date or archive timestamp for each archived item.  
  * Access archived data in read-only format.

* Exclude archived records from active net worth and percentage breakdown calculations.  
* Optionally display total archived value separately from active totals.

* **UX Requirements:**  
  * Clearly label archived items and make them visually distinct from active items.

  * Add a toggle or link to switch between **Active View** and **Archived View**.

  * Ensure data formatting and calculations respect currency consistency, including conversion of multi-currency inputs using appropriate exchange rates.

* **Accessibility:**  
* Provide screen-reader-friendly labels for charts.  
* Provide textual summaries for all visual data.

* **Phase 2 Real-Time Valuation Enhancements:**  
  * Define a Phase 2 enhancement path for more real-time valuation and net worth updates through selected integrations.  
  * Support future integrations such as:

    * Bank account integrations compliant with applicable open banking requirements  
    * Stock and bond market data integrations for current valuation support  
    * Vehicle valuation platform integrations  
    * Crypto platform integrations  
    * Other relevant valuation and balance data providers


**Acceptance Criteria**:

* Given the user has entered asset and liability data, when viewing the Stats section, then the system displays total values, net worth, and category-wise breakdowns with correct percentages.  
* Given categories with data, when viewing the breakdown, then each category displays its proportional share using visual bars and corresponding values.  
* Given the user has archived items, when clicking on View Archived Items, then a dedicated page or modal shows a list of those archived records with their last known values.  
* Given archived records exist, then they are excluded from the main net worth and percentage breakdown calculations, unless otherwise stated.  
* Given some asset or liability categories are unfilled, when viewing the Stats section, then the system shows a prompt with which categories are still incomplete.  
* Given a user has not added any assets or liabilities yet, then the Stats section displays a friendly empty state with guidance to start adding data.  
* Given the product progresses to Phase 2, then the design supports enhancing asset values and net worth calculations with more real-time data from approved external valuation and financial integrations.  
* Given a supported external integration is connected in Phase 2, then relevant asset values or balances can be refreshed using that integration in accordance with permissions, compliance requirements, and data availability.

**8.1 Story: Assets & Liabilities – Category-Based Input Structure**  
Description: Design and implement the input structure for all Asset and Liability categories so that each category uses collapsible input cards tailored to its specific data requirements. While the fields inside each category will vary depending on the type of asset or liability, there must be a consistent structure across the module through two shared collapsible cards available on both Asset and Liability items: Shared With and Tasks & Reminders. In addition, each category-specific card—except Basic Info, Shared With, and Tasks & Reminders—should support attaching a document entry relevant to that card’s content. Document entries should include preview, download, and sharing capabilities, subject to permissions. Each Asset and Liability item should be presented through three tabs: Overview, Document Entries, and Credentials. The Overview tab contains all collapsible cards, the Document Entries tab aggregates all document entries across the item’s cards, and the Credentials tab aggregates all login credentials across the item’s cards. This ensures a flexible but unified data-entry and management experience across the entire Assets & Liabilities section.  
Tasks: 

* Define category-specific input structures for each Asset and Liability category.  
* Implement collapsible input cards for each category, grouping related fields in a clear and logical way.  
* Ensure each category’s collapsible cards reflect the information relevant to that category only.  
* Implement a shared Shared With collapsible card for all Asset and Liability items, allowing users to define which trusted contacts can view or access the item, based on roles and permissions.  
* Implement a shared Tasks & Reminders collapsible card for all Asset and Liability items, allowing users to create, view, and manage associated reminders, follow-ups, or action items.  
* Enable tasks within the Tasks & Reminders card to be assigned either to the user or to trusted contacts designated as contributors, in accordance with roles and permissions.  
* Enable document entry attachment on each category-specific card, except for Basic Info, Shared With, and Tasks & Reminders.  
* Create time/date and event-based triggers for sharing collapsible cards information under the Shared With card  
* Provide document entry functionality with preview, download, and sharing capabilities.  
* Support credential entries within relevant category-specific cards where applicable.  
* Implement three tabs for every Asset and Liability item \- Overview tab containing all collapsible cards, Document Entries tab showing all document entries from all cards and Credentials tab showing all login credentials from all cards  
* Ensure attached document entries are linked to the relevant card context and retrievable from both the relevant card and the Document Entries tab.  
* Ensure saved credentials are linked to the relevant card context and retrievable from both the relevant card and the Credentials tab.  
* Enforce permissions on document preview, download, sharing, and credential visibility.  
* Ensure category-specific cards, shared cards, and tabs behave consistently across Assets and Liabilities.  
* Preserve entered data when cards are expanded or collapsed.  
* Support linking of metadata, documents, credentials, and related actions within the relevant category-specific cards.  
* Ensure the UI is scalable so new categories can introduce their own card structures without affecting the shared experience.  
* Write unit and integration tests.

Acceptance Criteria:

* Given a user opens any Asset category item, the item is displayed with the tabs Overview, Document Entries, and Credentials.  
* Given a user opens any Liability category item, the item is displayed with the tabs Overview, Document Entries, and Credentials.  
* Given a user opens the Overview tab, all category-specific and shared collapsible cards are available there.  
* Given a user opens the Document Entries tab, all document entries attached across the item’s cards are listed there.  
* Given a user opens the Credentials tab, all login credentials saved across the item’s cards are listed there.  
* Given two different categories, the system allows them to have different collapsible card structures based on their data requirements.  
* Given a user opens any Asset or Liability item, the Shared With card is always present in the Overview tab.  
* Given a user opens any Asset or Liability item, the Tasks & Reminders card is always present in the Overview tab.  
* Given a user expands or collapses any input card, the relevant fields are shown or hidden without loss of entered data.  
* Given a category-specific card other than Basic Info, Shared With, or Tasks & Reminders, the user can attach a document entry to that card.  
* Given a document entry is attached to a card, it is linked to the relevant Asset or Liability item and appears in the Document Entries tab.  
* Given a user opens a document entry, they can preview it where supported.  
* Given a user has permission, they can download the attached document entry.  
* Given a user has permission, they can share the attached document entry according to role-based access controls.  
* Given credentials are added within a relevant card, they are linked to the relevant Asset or Liability item and appear in the Credentials tab.  
* Given a user adds tasks or reminders within the shared card, those items are linked to the relevant Asset or Liability and appear in the Tasks & Reminders section according to permissions.  
* Given a task is created within the Tasks & Reminders card, it can be assigned either to the user or to a trusted contact with the contributor role.  
* Given a contributor is assigned a task, they can view and act on that task according to their permissions.  
* Given a user configures sharing within the Shared With card, access is applied according to trusted contact roles and permissions.  
* Given unauthorized access is attempted, shared settings, tasks, documents, credentials, and underlying Asset or Liability details remain restricted according to permissions.  
  


**8.2 Assets**

**8.2.1 Story: Financial Accounts & Instruments**  
Description: Allow users to record financial accounts (bank accounts, investments, retirement accounts, life insurance, cash at home/safe, and other financial instruments), with optional integrations and secure storage. The input experience should organize information into collapsible cards, including Basic Info, Ownership, Related Services, and the shared cards Shared With and Tasks & Reminders.  
Tasks:

* Build input UI for financial accounts (account type, institution, balance, account number).  
* Integrate Plaid/Yodlee or similar APIs for automated balance sync.  
* Enable upload of supporting documents (statements, policy docs, etc.).  
* Encrypt and store financial account data securely in the backend.  
* Generate associated tasks (e.g., “Update beneficiaries,” “Upload latest statement”).  
* Allow user to archive item.   
* Write unit and integration tests.

Acceptance Criteria:

* Given a user adds a financial account, then it appears under the Assets section in the correct category.  
* Given a user connects to an external API, then account balances update automatically.  
* Given a user uploads supporting documents, then files are stored securely in the Vault and linked to the account.  
* Given a financial account task is generated, then it appears in the Tasks & Reminders section with correct assignee/status.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given information and documents for the item are uploaded, they are linked and retrievable from the Vault.  
* Given unauthorized access is attempted, then the financial account data is not visible.

**8.2.2 Story: Crypto & Blockchain Assets**  
Description: Allow users to record and manage digital assets including hot wallets, cold wallets, exchange accounts, NFTs, and DeFi positions. The input experience should organize information into collapsible cards, including Basic Info, Ownership, Related Services, and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Create input forms for different crypto asset types (wallets, exchanges, NFTs, DeFi).  
* Integrate with major wallet/exchange APIs for balance retrieval.  
* Encrypt and store wallet addresses, private details, and metadata securely.  
* Display holdings in the Assets dashboard with value updates.  
* Generate associated tasks (e.g., “Update wallet keys,” “Review staking positions”).  
* Allow user to archive item.  
* Write unit and integration tests.

Acceptance Criteria:

* Given a user adds a crypto wallet, then it appears under Crypto & Blockchain assets with correct metadata.  
* Given an exchange account is linked, then balances sync automatically.  
* Given documents are uploaded, they are retrievable from the Vault.  
* Given a user uploads or records NFT details, then they appear in the NFT Collections category.  
* Given a crypto-related task is created, then it appears in Tasks & Reminders with correct status/assignee.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access is attempted, then crypto details remain hidden.

**8.2.3 Story: Real Estate**  
Description: Allow users to document real estate properties across categories (residential, commercial, industrial, agricultural, or other) and link them with related documents or tasks. The input experience should organize information into collapsible cards, including Basic Info, Ownership, Mortgage Details, Insurance Details, Utilities, Related Services, and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build input UI for property details (address, ownership type, value, documents, etc.).  
* Categorize properties by type (residential, commercial, industrial, land, other).  
* Enable upload and linking of deeds, mortgage papers, or lease agreements.  
* Store data and documents are linked to Vault.  
* Generate associated tasks (e.g., “Update property insurance,” “Pay property tax”).  
* Allow user to archive item.   
* Write unit and integration tests.

Acceptance Criteria:

* Given a user adds a property, then it appears in the correct Real Estate category in Assets.  
* Given a user uploads property documents, then they are retrievable from the Vault.  
* Given a property task is generated, then it appears in Tasks & Reminders with correct role and status.  
* Given a user edits property details, then updates are reflected immediately.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given an unauthorized user attempts access, then property details are hidden.

**8.2.4 Story: Vehicles**  
Description: Allow users to record details of owned vehicles (car, motorcycle, truck, RV, boat, e-bike, aircraft, or other) and manage associated tasks. The input experience should organize information into collapsible cards, including Basic Info, Ownership, Insurance, Warranty, Related Services, and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build input forms for vehicle details (type, make, model, year, VIN, value).  
* Enable upload of related documents (titles, insurance, loan papers).  
* Categorize vehicles by type (car, motorcycle, truck, etc.).  
* Store data and documents securely in the Vault.  
* Generate associated tasks (e.g., “Renew registration,” “Maintain insurance”).  
* Allow user to archive item.   
* Write unit and integration tests.

Acceptance Criteria:

* Given a user records a vehicle, then it appears under the Vehicles category in Assets.  
* Given a user uploads vehicle documents, then they are stored and retrievable from the Vault.  
* Given a vehicle task is generated, then it appears in the Tasks & Reminders section with assignee/status.  
* Given a user edits vehicle details, then the update is saved and displayed.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given an unauthorized user attempts access, then the vehicle record is not visible.

**8.2.5 Story: Digital & Online Assets**  
Description: Allow users to manage digital assets (domains, loyalty points, in-app credits, social media, email, cloud storage, streaming accounts, software, and other) and link them with relevant credentials and tasks. The input experience should organize information into collapsible cards, including Basic Info, Ownership, Related Services, and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build input UI for digital/online accounts and assets.  
* Allow linking login credentials, account details, and notes.  
* Enable upload of backup codes or related documentation.  
* Categorize assets by type (domains, loyalty, subscriptions, etc.).  
* Generate associated tasks (e.g., “Renew domain,” “Update password”).  
* Allow user to archive item.   
* Unit and integration tests.

Acceptance Criteria:

* Given a user adds a digital account, then it appears in the correct Digital & Online category in Assets.  
* Given a user uploads related files, then they are retrievable from the Vault and linked to the asset.  
* Given a digital asset task is generated, then it appears in Tasks & Reminders with role and status.  
* Given a user updates credentials, then changes are stored securely and versioned.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given an unauthorized user attempts access, then the asset details remain hidden.

**8.2.6 Story: Personal Property**  
Description: Allow users to document personal property such as electronics, jewellery, art, collectibles, heirlooms, household items and other. The input experience should organize information into collapsible cards, including Basic Info, Ownership, Insurance, Related Services, Warranty and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build input UI for personal property details (type, description, value, location).  
* Allow upload of photos or proof-of-ownership documents.  
* Categorize items by type (electronics, jewelry, art, etc.).  
* Enable linking personal property items to beneficiaries or legacy preferences.  
* Generate associated tasks (e.g., “Appraise antique,” “Update household inventory”).  
* Allow user to archive item.   
* Unit and integration tests.

Acceptance Criteria:

* Given a user adds a personal property item, then it is stored securely and categorized.  
* Given a user uploads photos/documents, then they are retrievable from the Vault.  
* Given a property is linked to a beneficiary, then the relationship displays correctly.  
* Given a related task is created, then it appears in Tasks & Reminders with assignee and status.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized users attempt access, then the item is hidden.

**8.2.7 Story: Business**   
Description: Allow users to record and manage business-related interests and exposures across the Business section, including Private Company Shares & Equity, Convertible Instruments & Equity, Business Loans & Commercial Receivables, Partnerships, Joint Ventures, Self-Employed & Freelance Work, and Other. This section should help users maintain a structured inventory of their business involvement, related rights, and relevant records. The input experience should organize information into collapsible cards, including Basic Info, Ownership, Insurance, Related Services, and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build UI for adding business records with details such as category, name, ownership or participation %, value or estimated value, counterparties, jurisdiction, notes, and documents.  
* Enable categorization of business assets (shares, loans, partnerships, etc.).  
* Allow linking to related supporting documents such as shareholder agreements, convertible notes, loan agreements, partnership agreements, invoices, contracts, or other business records.  
* Encrypt and store all data and documents securely.  
* Generate tasks (e.g., “Renew partnership agreement,” “Review business loan terms”).  
* Allow user to archive item.   
* Unit and integration tests.

Acceptance Criteria:

* Given a user adds a business asset, then it appears under the Business category in Assets.  
* Given a user uploads business documents, then they are retrievable from the Vault.  
* Given a business asset has related tasks, then tasks appear in Tasks & Reminders with correct labels.  
* Given a user edits business details, then updates are saved and versioned.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized users attempt access, then business details remain restricted.

**8.2.8 Story: Intellectual Property**  
Description: Allow users to record intellectual property (patents, trademarks, copyrights, trade secrets, or other IP) with supporting documents and task tracking. The input experience should organize information into collapsible cards, including Basic Info, Ownership, Related Services, and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build input UI for IP details (type, registration number, jurisdiction, status).  
* Allow upload of related legal certificates, filings, or ownership proof.  
* Categorize IP types (patent, trademark, copyright, trade secret, other).  
* Enable linking IP to business or personal assets.  
* Generate tasks (e.g., “Renew trademark,” “File patent maintenance fee”).  
* Allow user to archive item.   
* Unit and integration tests.

Acceptance Criteria:

* Given a user records IP details, then the item is stored securely under the correct category.  
* Given a user uploads IP documents, then they are retrievable from the Vault.  
* Given an IP asset is linked to a business or person, then the link displays in both sections.  
* Given a related IP task is generated, then it appears in Tasks & Reminders with correct status.  
* Given an unauthorized user attempts access, then the IP item remains hidden.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.

**8.2.9 Story: Other Assets**  
Description: Allow users to record and organize miscellaneous assets not covered by predefined categories. The input experience should organize information into collapsible cards, including Basic Info, Ownership, Insurance, Mortgage, Warranty, Utilities, Related Services, and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build generic input form for “Other Assets” with flexible fields.  
* Allow file and photo uploads for supporting evidence.  
* Store data securely in the Vault with metadata.  
* Provide option to link other assets to beneficiaries or liabilities.  
* Generate tasks (e.g., “Update valuation,” “Provide access details”).  
* Allow user to archive item.   
* Write unit and integration tests.

Acceptance Criteria:

* Given a user records another type of asset, then it is stored under “Other Assets.”  
* Given a user uploads supporting documentation, then it is retrievable from the Vault.  
* Given a user links an “Other Asset” to a plan item, then the connection is displayed in both sections.  
* Given a task is generated for an “Other Asset,” then it appears in Tasks & Reminders.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized users attempt access, then the asset remains restricted.

**8.3 Liabilities** 

Description: Enable users to capture, organize, and manage all liabilities (debts, loans, recurring expenses, and legal/tax obligations). Each liability supports linked documents, schedules, and auto-generated/user-generated tasks that surface in Tasks & Reminders. Visibility and editing honor roles/permissions.

**8.3.1.1 Story: Financial Debts and Loans (Overview)**  
Description: Provide a unified model and UI patterns for entering and managing all financial debt types; sub-stories below specify nuances per type.

Tasks:

* Implement liability schema (type, lender/party, principal, interest, term, payment schedule, autopay, collateral link, notes).  
* Build add/edit UI with smart defaults and validation (APR, dates, currency).  
* Attach & link documents (agreements, statements) to Vault; cross-link to related assets.  
* Calculate payoff/amortization and next-due amounts; expose to dashboards.  
* Generate tasks (e.g., “Pay installment”, “Rate review”, “Renew term”); sync with Tasks & Reminders.  
* Allow user to archive item.   
* Unit/integration tests; permission checks and audit logs.

Acceptance Criteria:

* Given a user saves a debt, then it appears under Liabilities with next due date and balance.  
* Given a document is uploaded, then it’s stored in the Vault and linked to the liability.  
* Given a due date approaches, then a task/reminder appears in Tasks & Reminders.  
* Given a user updates terms or payoff, then schedules and calculations refresh immediately.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given an unauthorized user attempts access, then the liability is hidden.

**8.3.1.2 Story: Mortgage**  
Description: Capture mortgages and link them to properties, escrow, and payment schedules. The input experience should organize information into collapsible cards, including Basic Info, Ownership, Collateral, Servicer Info, Related Services and the shared cards Shared With and Tasks & Reminders.  
Tasks:

* Add mortgage fields (property link, lender, principal, rate type/fixed-ARM, term, escrow, payment cadence).  
* Compute amortization, escrow components, and payoff date.  
* Link deeds/notes/escrow docs to Vault; link to the Real Estate asset.  
* Optional aggregator import for balances/transactions (where supported).  
* Generate tasks (e.g., “Pay mortgage”, “Annual escrow review”, “Rate reset check”).  
* Allow user to archive item.   
* Tests for calculations, links, and permissions.

Acceptance Criteria:

* Given a user records a mortgage, then it appears under Liabilities and is cross-linked to the property.  
* Given schedules are set, then next payment and escrow amounts display.  
* Given documents are attached, then they are retrievable from the Vault.  
* Given a rate reset window approaches, then a task is created.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given access is restricted, then only authorized users can view/edit the mortgage.

**8.3.1.3 Story: Consumer / Personal Loan**  
Description: Allow users to record personal loans (secured or unsecured) with repayment details and link supporting contracts. The input experience should organize information into collapsible cards, including Basic Info, Borrower & Other Parties, Terms & Payments, Collateral, Insurance, Servicer Info, Online Access and the shared cards Shared With and Tasks & Reminders.  
Tasks:

* Build input UI for personal loan details (lender, amount, APR, term, repayment schedule).  
* Enable uploading of loan agreements and receipts.  
* Store loan data securely with encryption.  
* Generate tasks (e.g., “Pay installment,” “Review repayment schedule”).  
* Provide edit/update and deletion functionality.  
* Allow user to archive item.   
* Unit and integration tests.


Acceptance Criteria:

* Given a user adds a personal loan, then it appears under Liabilities with details.  
* Given a repayment date approaches, then a reminder task is generated.  
* Given supporting documents are uploaded, then they are securely retrievable.  
* Given the loan is edited, then the updates are reflected immediately.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then the loan is hidden.

**8.3.1.4 Story: Business Loans**  
Description: Track loans taken for business purposes and link them to Business assets. The input experience should organize information into collapsible cards, including Basic Info, Borrower & Other Parties, Terms & Payments, Collateral, Covenants, Servicer Info, Online Access and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build input UI for business loan details (entity, lender, amount, interest, repayment).  
* Enable uploading of loan agreements, covenants, or financial statements.  
* Cross-link loan to relevant Business assets.  
* Generate tasks (e.g., “Quarterly covenant check,” “Repayment due”).  
* Provide status tracking (active, repaid).  
* Allow user to archive item.   
* Write tests.


Acceptance Criteria:

* Given a business loan is added, then it displays under Liabilities and links to the business asset.  
* Given repayment is due, then a reminder task is generated.  
* Given a covenant document is uploaded, then it is retrievable from the Vault.  
* Given the loan status is updated to repaid, then it is reflected in the dashboard.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then details remain hidden.

**8.3.1.5 Story: Credit Card Debts**  
Description: Manage revolving credit card accounts with balances, limits, and statements. The input experience should organize information into collapsible cards, including Basic Info, Terms & Payments, Rates & Fees, Balance & Limits, Rewards, Disputes & Chargebacks, Online Access and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build input form for card details (issuer, account number, credit limit, APR, due date).  
* Allow uploading of monthly statements.  
* Show utilization % (balance/limit).  
* Generate tasks (e.g., “Pay statement balance,” “Dispute charge”).  
* Optionally integrate aggregator for balance sync.  
* Allow user to archive item.   
* Unit and integration tests.


Acceptance Criteria:

* Given a credit card account is added, then balance, limit, and utilization are displayed.  
* Given a due date approaches, then a repayment task is generated.  
* Given a statement is uploaded, then it is retrievable in the Vault.  
* Given aggregator sync is enabled, then balances update automatically.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then the account is not visible.

**8.3.1.6 Story: Leasing Agreements**  
Description: Track lease agreements for vehicles, property, or equipment with payment schedules and end-of-term actions. The input experience should organize information into collapsible cards, including Basic Info, Parties, Asset Details, Terms & Payments, Insurance, Fees & Penalties, Online Access and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build input form for lease details (lessor, start/end date, residual value, payment frequency).  
* Allow uploading of lease agreements and inspection documents.  
* Link leased asset (e.g., car, office space) to the lease.  
* Generate tasks (e.g., “Monthly lease payment,” “Lease return inspection”).  
* Display end-of-term alerts in dashboard.  
* Allow user to archive item.   
* Write tests.


Acceptance Criteria:

* Given a lease is recorded, then it displays with next payment and end date.  
* Given the term is near expiration, then a return/renewal task is generated.  
* Given lease documents are uploaded, then they are retrievable in the Vault.  
* Given an asset is linked, then the connection displays in both sections.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then the lease is hidden.

**8.3.1.7 Story: Private Loans**  
Description: Record loans between individuals with repayment tracking and counterparty details. The input experience should organize information into collapsible cards, including Basic Info, Parties, Terms & Payments, Collateral, Online Access and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build input UI (counterparty name, contact, amount, repayment schedule).  
* Upload promissory notes or receipts.  
* Generate tasks (e.g., “Pay installment,” “Reconcile outstanding balance”).  
* Allow status updates (active, repaid, defaulted).  
* Notify counterparty of updates if linked as a contact.  
* Allow user to archive item.   
* Unit and integration tests.


Acceptance Criteria:

* Given a private loan is recorded, then it displays with repayment schedule.  
* Given a payment date arrives, then a reminder task is generated.  
* Given documents are uploaded, then they are retrievable from the Vault.  
* Given the status is updated, then it reflects correctly in the dashboard.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then details are hidden.

**8.3.1.8 Story: Lines of Credit**  
Description: Track lines of credit, including credit utilization and repayment terms. The input experience should organize information into collapsible cards, including Basic Info, Parties, Terms & Payments, Rates & Limits, Collateral, Servicer Info, Online Access and the shared cards Shared With and Tasks & Reminders.  
Tasks:

* Build input UI for LOC details (issuer, credit limit, balance, rate, draw period).  
* Upload agreements and statements.  
* Calculate utilization and repayment schedules.  
* Generate tasks (e.g., “Pay LOC installment,” “Draw period end approaching”).  
* Provide alerts for nearing limits.  
* Allow user to archive item.   
* Write tests.


Acceptance Criteria:

* Given a LOC is added, then it displays balance, limit, and utilization %.  
* Given repayment is due, then a task is generated.  
* Given documents are uploaded, then they are linked in the Vault.  
* Given a draw period end approaches, then an alert task is created.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then the LOC is not visible.

**8.3.1.9 Story: Co-signed Loans or Guarantees**  
Description: Record liabilities where the user is a co-signer or guarantor, showing contingent exposure. The input experience should organize information into collapsible cards, including Basic Info, Parties, Underlying Loan, Guarantee / Co-sign Terms, Collateral & Liens, Notifications & Defaults, Online Access and the shared cards Shared With and Tasks & Reminders.  
Tasks:

* Build input UI for co-signed loan details (borrower, lender, amount, terms).  
* Upload guarantee documents.  
* Flag liability as “contingent.”  
* Generate monitoring tasks (e.g., “Review borrower payment status”).  
* Allow notifications of delinquency.  
* Allow user to archive item.   
* Write tests.


Acceptance Criteria:

* Given a co-signed loan is added, then it is flagged as contingent.  
* Given a delinquency occurs, then a monitoring task is generated.  
* Given documents are uploaded, then they are retrievable in the Vault.  
* Given updates occur, then status reflects exposure.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then details are hidden.

**8.3.1.10 Story: Other Financial Liabilities**  
Description: Flexible entry for liabilities not covered by predefined categories. The input experience should organize information into collapsible cards, including Basic Info, Parties, Terms & Amounts, Rates & Fees, Collateral, Online Access and the shared cards Shared With and Tasks & Reminders.  
Tasks:

* Build generic liability form with customizable fields.  
* Enable file uploads (contracts, receipts).  
* Apply tags/categories for classification.  
* Generate related tasks (e.g., “Payment due,” “Review terms”).  
* Allow user to archive item.   
* Write tests.


Acceptance Criteria:

* Given a liability is recorded, then it is listed under “Other Financial Liability.”  
* Given documents are uploaded, then they are linked in the Vault.  
* Given tasks are generated, then they appear in Tasks & Reminders.  
* Given edits are made, then changes are reflected immediately.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then the liability is hidden.

**8.3.2 Story: Outstanding Bills & Ongoing Expenses (Overview)**  
Description: Capture and manage all recurring or ad-hoc bills (medical, rent, utilities, subscriptions, insurance, and services). Each bill includes schedules, vendor details, and tasks that surface in Tasks & Reminders.  
Tasks:

* Build UI for adding recurring or one-off bills with vendor, amount, due date, and frequency.  
* Implement scheduler engine for recurring tasks (daily, monthly, annually).  
* Upload invoices or contracts and link them to the Vault.  
* Generate tasks for due dates and overdue alerts.  
* Display next due bill and outstanding balance.  
* Allow user to archive item.   
* Write unit and integration tests.


Acceptance Criteria:

* Given a bill is recorded, then it appears with its vendor, amount, and next due date.  
* Given a bill is recurring, then future due tasks are automatically generated.  
* Given invoices are uploaded, then they are retrievable in the Vault.  
* Given a bill is overdue, then an alert task is shown in Tasks & Reminders.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then bills remain hidden.

**8.3.2.1 Story: Medical Bills**  
Description: Allow users to record and track medical bills, invoices, and payment plans. The input experience should organize information into collapsible cards, including Basic Info, Patient & Providers, Bill Details, Insurance & Claims, Payment Info, Online Access and the shared cards Shared With and Tasks & Reminders.  
Tasks:

* Build input UI for medical bill details (provider, claim ID, service date, amount).  
* Upload invoices, receipts, and Explanation of Benefits (EOB).  
* Support payment plans and installment schedules.  
* Generate tasks (e.g., “Pay bill,” “File insurance claim,” “Appeal denial”).  
* Allow status update (paid, pending, disputed).  
* Allow user to archive item.   
* Write tests.


Acceptance Criteria:

* Given a user records a medical bill, then it appears under Liabilities with due date.  
* Given an installment plan is set, then scheduled tasks are generated.  
* Given an invoice/EOB is uploaded, then it is retrievable in the Vault.  
* Given the bill is disputed, then status reflects as “Disputed.”  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then the medical bill is hidden.

**8.3.2.2 Story: Utility Bills**  
Description: Record recurring household utility expenses such as electricity, water, gas, internet, and phone. The input experience should organize information into collapsible cards, including Basic Info, Service Provider, Billing, Current Charges & Balance, Payment Plan, Online Access and the shared cards Shared With and Tasks & Reminders.  
Tasks:

* Build UI for utility bill details (vendor, account number, due date, frequency).  
* Upload utility invoices/statements.  
* Auto-generate monthly tasks for payment reminders.  
* Allow setting autopay flag for vendor.  
* Display next payment in dashboard.  
* Allow user to archive item.   
* Tests.

Acceptance Criteria:

* Given a utility bill is recorded, then it appears with vendor and due date.  
* Given autopay is enabled, then it is flagged in the UI.  
* Given a bill is due, then a reminder task is generated.  
* Given an invoice is uploaded, then it is retrievable in the Vault.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then details are hidden.

**8.3.2.3 Story: Rent**  
Description: Manage recurring rent payments and link them to lease agreements. The input experience should organize information into collapsible cards, including Basic Info, Parties, Terms, Rent & Payments, Online Access and the shared cards Shared With and Tasks & Reminders.  
Tasks:

* Build UI for rent details (landlord, property, amount, due date, frequency).  
* Upload lease agreements or receipts.  
* Auto-generate monthly rent tasks.  
* Generate renewal/termination reminders.  
* Allow user to archive item.   
* Write tests.

Acceptance Criteria:

* Given a rent entry is recorded, then it appears with landlord, amount, and due date.  
* Given the lease term is ending, then a renewal/termination task is generated.  
* Given a receipt or lease is uploaded, then it is stored in the Vault.  
* Given a payment is marked as complete, then status updates immediately.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then rent details are hidden.


**8.3.2.4 Story: Subscriptions & Memberships**  
Description: Record recurring digital or physical subscriptions (e.g., Netflix, gym, magazines). The input experience should organize information into collapsible cards, including Basic Info, Provider & Plan, Billing & Cycle, Payment Info, Access & Authentication, Cancellation & Renewal and the shared cards Shared With and Tasks & Reminders.  
Tasks:

* Build UI for subscription details (service name, cost, renewal date, frequency).  
* Upload invoices or receipts.  
* Generate tasks (e.g., “Review subscription,” “Cancel before renewal”).  
* Allow bulk import of subscriptions via email parsing or upload.  
* Display recurring costs in dashboard.  
* Allow user to archive item.   
* Write tests.


Acceptance Criteria:

* Given a subscription is recorded, then it appears with service name and renewal date.  
* Given a renewal date is approaching, then a reminder task is generated.  
* Given a subscription is canceled, then status updates to “Inactive.”  
* Given invoices are uploaded, then they are retrievable in the Vault.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then details are hidden.

**8.3.2.5 Story: Insurance Payments**  
Description: Manage recurring insurance premium payments across life, health, auto, or property insurance. The input experience should organize information into collapsible cards, including Basic Info, Policy & Provider, Coverage & Beneficiaries, Premiums & Payment Schedule, Claims & Support, Renewal & Cancellation, Online Access and the shared cards Shared With and Tasks & Reminders.  
Tasks:

* Build input UI for insurance payments (provider, policy number, premium, frequency).  
* Upload policy documents or premium receipts.  
* Generate tasks for premium due dates and renewals.  
* Link insurance policies to corresponding assets (car, house, etc.).  
* Allow user to archive item.   
* Tests.

Acceptance Criteria:

* Given an insurance policy is recorded, then it appears with premium amount and due date.  
* Given renewal is approaching, then a reminder task is generated.  
* Given the policy document is uploaded, then it is retrievable in the Vault.  
* Given the payment is marked complete, then the schedule updates.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then details remain hidden.

**8.3.2.6 Story: Elder or Home Care Services**  
Description: Track recurring payments and invoices for elder care or home care providers. The input experience should organize information into collapsible cards, including Basic Info, Provider Info, Service Details, Costs & Billing, Payment Info, Insurance/Benefits, Online Access and the shared cards Shared With and Tasks & Reminders.  
Tasks:

* Build UI for care service details (provider, amount, frequency, type of care).  
* Upload invoices or agreements.  
* Generate recurring tasks (e.g., “Pay invoice,” “Review care plan”).  
* Link providers to contacts.  
* Allow user to archive item.   
* Tests.

Acceptance Criteria:

* Given a care service is recorded, then it appears with provider, amount, and frequency.  
* Given invoices are due, then tasks are generated in Tasks & Reminders.  
* Given invoices are uploaded, then they are stored in the Vault.  
* Given the care plan changes, then updates reflect immediately.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then details are hidden.


**8.3.2.7 Story: Service Provider Fees**  
Description: Record recurring or one-off payments to professional service providers (e.g., lawyers, accountants, consultants). The input experience should organize information into collapsible cards, including Basic Info, Provider Info, Billing & Invoicing, Payments Info, Renewal & Cancellation, Online Access and the shared cards Shared With and Tasks & Reminders.  
Tasks:

* Build UI for service provider details (name, service, amount, due date).  
* Upload invoices or engagement agreements.  
* Generate tasks (e.g., “Pay invoice,” “Review agreement annually”).  
* Allow user to archive item.   
* Write tests.


Acceptance Criteria:

* Given a service provider fee is recorded, then it displays with due date.  
* Given invoices are uploaded, then they are retrievable in the Vault.  
* Given a review is due, then a task is generated.  
* Given updates occur, then they are reflected immediately.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then fees remain hidden.

**8.3.2.8 Story: Other Recurring or Unpaid Expenses**  
Description: Allow flexible entry of expenses not covered by other categories.  The input experience should organize information into collapsible cards, including Basic Info, Provider/Payee Info, Payments Info, Online Access and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build generic input form with flexible fields.  
* Upload supporting documents.  
* Generate tasks for due dates and overdue alerts.  
* Allow categorization via tags.  
* Allow user to archive item.   
* Tests.

Acceptance Criteria:

* Given an expense is recorded, then it displays under “Other Expenses.”  
* Given due date is approaching, then a task is generated.  
* Given supporting documents are uploaded, then they are stored in the Vault.  
* Given edits occur, then changes display immediately.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then details are hidden.

**8.3.3 Story: Legal & Tax Liabilities (Overview)**  
Description: Capture obligations from taxes, judgments, fines, and support orders. Each entry includes documents, deadlines, and auto-generated tasks.   
Tasks:

* Build schema for legal/tax obligations (authority, case/ref number, due amount, deadlines).  
* Allow file upload (orders, notices, rulings).  
* Generate tasks (e.g., “File return,” “Pay installment,” “Attend hearing”).  
* Implement permission handling and audit logs.  
* Allow user to archive item.   
* Write unit tests.

Acceptance Criteria:

* Given a liability is recorded, then it displays with authority and deadline.  
* Given a task is due, then it appears in Tasks & Reminders.  
* Given supporting documents are uploaded, then they are retrievable.  
* Given edits occur, then schedules update immediately.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then details are hidden.

**8.3.3.1 Story: Unpaid Taxes**  
Description: Record unpaid taxes by jurisdiction and year. The input experience should organize information into collapsible cards, including Basic Info, Tax Authority & Details, Tax Period & Assessment, Payment Info, Contacts & Representation and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Input UI for unpaid taxes (jurisdiction, year, amount).  
* Upload tax bills/notices.  
* Calculate penalties/interest.  
* Generate tasks (e.g., “Pay tax bill,” “File extension”).  
* Allow user to archive item.   
* Write tests.

Acceptance Criteria:

* Given unpaid taxes are recorded, then they appear with year and jurisdiction.  
* Given penalties apply, then totals update automatically.  
* Given tax notices are uploaded, then they are retrievable in the Vault.  
* Given due dates approach, then tasks are generated.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then taxes remain hidden.

**8.3.3.2 Story: Tax Repayment Plans**  
Description: Track instalment agreements with tax authorities. The input experience should organize information into collapsible cards, including Basic Info, Tax Authority & Details, Plan Terms, Repayment Info, Contacts & Representation and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Input UI for repayment details (instalment amount, frequency, authority, end date).  
* Upload instalment agreement.  
* Auto-calculate balance and payoff date.  
* Generate tasks (e.g., “Pay instalment,” “Review compliance”).  
* Allow user to archive item.   
* Write tests.

Acceptance Criteria:

* Given a repayment plan is recorded, then it appears with balance and schedule.  
* Given instalments are due, then tasks are generated.  
* Given documents are uploaded, then they are retrievable.  
* Given payments are updated, then balance recalculates.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then repayment plans remain hidden.

**8.3.3.3 Story: Court Judgments and Fines**  
Description: Record court-ordered financial obligations. The input experience should organize information into collapsible cards, including Basic Info, Case & Court Details, Parties & Representation, Payment Info, and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Input UI for judgment details (court, case number, amount, due date).  
* Upload judgment orders.  
* Generate tasks (e.g., “Pay fine,” “File appeal”).  
* Audit log all changes.  
* Allow user to archive item.   
* Write tests.

Acceptance Criteria:

* Given a judgment is recorded, then it displays with case number and amount.  
* Given a due date approaches, then a payment task is generated.  
* Given orders are uploaded, then they are retrievable in the Vault.  
* Given changes occur, then they are logged.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then details remain hidden.

**8.3.3.4 Story: Alimony or Child Support**  
Description: Track alimony or child support obligations. The input experience should organize information into collapsible cards, including Basic Info, Court Order Info, Parties & Representations, Payments Info and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build UI for support details (recipient, amount, frequency, start/end date).  
* Upload court orders or agreements.  
* Generate recurring tasks (e.g., “Pay monthly support”).  
* Track arrears and compliance.  
* Allow user to archive item.   
* Write tests.


Acceptance Criteria:

* Given a support obligation is recorded, then it appears with schedule and recipient.  
* Given payments are due, then tasks are generated.  
* Given arrears occur, then dashboard reflects overdue status.  
* Given agreements are uploaded, then they are retrievable.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then obligations remain hidden.

**8.3.3.5 Story: Liens, Seizures, or Freeze Orders**  
Description: Record enforcement actions restricting access to assets. The input experience should organize information into collapsible cards, including Basic Info, Issuing Authority, Affected Assets, Amounts & Secured Claims, Enforcement Actions & Restrictions, Contacts & Representations and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build input UI (authority, assets affected, amount, start/end date).  
* Upload lien/seizure orders.  
* Link liability to affected assets.  
* Generate tasks (e.g., “File contest,” “Monitor account freeze”).  
* Allow user to archive item.   
* Write tests.

Acceptance Criteria:

* Given a lien is recorded, then it is linked to impacted assets.  
* Given deadlines apply, then tasks are generated.  
* Given orders are uploaded, then they are retrievable.  
* Given updates occur, then Vault reflects the changes.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then liens remain hidden.

**8.3.3.6 Story: Other Legal Liability**  
Description: Flexible entry for any legal liabilities not predefined. The input experience should organize information into collapsible cards, including Basic Info, Legal Basis & Details, Parties & Representations, Payment Info and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build generic form with authority, type, amount, due date.  
* Upload documents.  
* Generate associated tasks.  
* Allow user to archive item.   
* Write tests.

Acceptance Criteria:

* Given a legal liability is recorded, then it appears with authority and amount.  
* Given a due date is near, then a task is generated.  
* Given docs are uploaded, then they are retrievable in Vault.  
* Given updates occur, then they reflect immediately.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then details are hidden.

**8.3.4 Story: Other Liabilities**  
Description: Allow users to record liabilities outside of defined categories while maintaining document storage and task generation. The input experience should organize information into collapsible cards, including Basic Info, Parties, Payment Info, Collateral and the shared cards Shared With and Tasks & Reminders.

Tasks:

* Build flexible liability entry form with custom fields.  
* Enable file upload.  
* Apply tagging and categorization.  
* Generate associated tasks.  
* Write tests.  
* Allow user to archive item.   
* Enforce permissions.

Acceptance Criteria:

* Given an “Other Liability” is recorded, then it appears in Liabilities with metadata.  
* Given docs are uploaded, then they are retrievable from the Vault.  
* Given due dates exist, then tasks are generated in Tasks & Reminders.  
* Given edits are made, then updates are reflected.  
* Given a user archives an item, the item status changes to ‘Archived’ and is no longer visible in the inventory.  
* Given unauthorized access, then the liability remains hidden.


# **Epic 9: My Plan – Goals & Aspirations \[PHASE 1\]** {#epic-9:-my-plan-–-goals-&-aspirations-[phase-1]}

Description: Allow users to capture personal ambitions, both short- and long-term, and track progress toward achieving them. Goals can be annual, aspirational, or bucket list items. Users can organize, monitor, and visualize progress in a structured and inspiring way.  
**9.1 Story: Annual Goals (short-term)**  
Description: Provide functionality to set, manage, and track annual goals with progress indicators and deadlines.  
Tasks:

* Create UI for setting annual goals (title, description, deadline).  
* Enable progress tracking with percentages and milestones.  
* Allow editing, updating, and deleting of goals.  
* Persist data in dedicated goals database.  
* Provide summary dashboard with goal status.  
* Write unit and integration tests.


Acceptance Criteria:

* Given a user creates an annual goal, then it appears with deadline and progress indicators.  
* Given a user updates a goal, then changes reflect immediately in the dashboard.  
* Given a user deletes a goal, then it is removed from the list.  
* Given goals exist, then the dashboard shows all active ones with status.  
* Given no goals exist, then the dashboard shows an empty state with a CTA to create goals.

**9.2 Story: Dreams & Aspirations (long-term)**  
Description: Enable users to capture aspirational, long-term visions and organize them into meaningful categories.  
Tasks:

* Build UI for recording long-term aspirations with title and description.  
* Allow categorization (personal, career, financial, family, lifestyle).  
* Enable notes and file attachments for context.  
* Store aspirations securely in the database.  
* Provide “vision board” style display for inspiration.  
* Tests for CRUD and visualization.

Acceptance Criteria:

* Given a user records an aspiration, then it is saved with category and displayed in the vision board.  
* Given aspirations exist, then the user can view them grouped by category.  
* Given a user updates or deletes an aspiration, then changes reflect immediately.  
* Given attachments are uploaded, then they are retrievable with the aspiration.  
* Given no aspirations exist, then the vision board shows an empty state with CTA.

**9.3 Story: Maintain a Bucket List \[PHASE 2\]**  
Description: Allow users to create and manage a personal bucket list for major life goals and “once-in-a-lifetime” experiences.  
Tasks:

* Design UI for bucket list creation with fields (title, description, target date).  
* Enable categorization (travel, adventure, learning, personal growth, family, other).  
* Provide progress tracking (not started, in progress, completed).  
* Allow attachments (photos, notes, inspirations).  
* Persist bucket list securely in the database.  
* Provide visualization (checklist or milestone view).


Acceptance Criteria:

* Given a user creates a bucket list item, then it appears with category, status, and target date.  
* Given a user updates progress on a bucket list item, then the status changes accordingly.  
* Given a user attaches a photo or note, then it is stored and retrievable with the item.  
* Given items are completed, then they appear in a “Completed” view for inspiration.  
* Given no bucket list exists, then the user sees an empty state with a CTA to add items.

# **Epic 10:  My Plan- Will & Legal Actions \[PHASE 1\]** {#epic-10:-my-plan--will-&-legal-actions-[phase-1]}

Description: Provide users with the ability to upload, download templated legal documents, and manage legal documents and directives (will, trusts, power of attorney, guardianship, advance directives, business continuity), ensuring clarity of wishes and continuity for loved ones. Where document creation is supported, the process will consist of providing users with a template they can download, complete, and legalize externally, together with clear instructions on how to legalize or formalize the respective document. In Phase 2, the Will & Legal Documents section should also support jurisdiction-specific variations so that templates, guidance, legal language, and procedural steps can be adapted to reflect the applicable local laws, requirements, and formalities of different countries or regions.  
**10.1 Story: Will**

Description: Allow users to upload a completed will, or begin the will creation process by downloading a templated will document together with guidance on how to complete and legalize it externally. Users can then store the finalized will, manage versions, and provide secure access to trusted contacts.  
Tasks:

* Build UI to upload a scanned or completed will.  
* Provide downloadable will templates for users to fill out externally.  
* Provide step-by-step instructions on how to complete and legalize the will.  
* Implement version control to preserve history of changes.  
* Provide controlled access for trusted contacts and executors.  
* In Phase 2, enable will templates, instructions, and related guidance to vary by jurisdiction to reflect local legal requirements, formalities, and processes.  
* Validate upload size, file types, and enforce limits.  
* Write unit and integration tests.

Acceptance Criteria:

* Given a user wants to create a will, they can download a template and view instructions for completing and legalizing it.  
* Given a user uploads a completed will, when saved, then it is stored securely and retrievable later.  
* Given a will is stored, when a trusted contact with permission accesses it, then it is visible to them.  
* Given a user uploads an updated will, then a new version is created without overwriting the old one.  
* Given an invalid file type or size, when uploading, then the system blocks it and shows an error.  
* Given the platform reaches Phase 2, then will templates and legalization guidance can be adapted for different jurisdictions to reflect local laws and procedures.  
* Given unauthorized access is attempted, then the system denies entry.

**10.2 Story: Trust**

Description: Provide users with an informational section about trusts for reference and education purposes. Since trusts cannot currently be established under Bulgarian law in the same way as in some other jurisdictions, this section is not intended to support trust creation or execution within the platform at this time. Instead, it should help users understand what a trust is, when it may be relevant in other jurisdictions, and how it may relate conceptually to assets, beneficiaries, and estate planning. In Phase 2, this section may be expanded for jurisdictions outside Bulgaria to include downloadable trust templates and instructions, where trusts are legally supported and can be set up under local law.

Tasks:

* Build an informational UI section explaining what a trust is and how it is commonly used in other jurisdictions.  
* Provide educational content on how trusts may relate to assets and beneficiaries conceptually.

* Allow users to upload and store trust-related reference documents only where relevant for informational or foreign-jurisdiction purposes.  
* Clearly indicate that trusts are not currently supported as a legal planning instrument within Bulgaria through the platform.  
* Restrict editing flows to informational document management only, rather than trust creation workflows.  
* Add appropriate disclaimers and legal-context messaging.  
* In Phase 2, support downloadable trust templates and related instructions for jurisdictions outside Bulgaria where trusts can legally be established.  
* In Phase 2, support jurisdiction-specific trust guidance to reflect local legal requirements and processes where applicable.  
* Unit and integration tests.

Acceptance Criteria:

* Given a user opens the Trust section, they see clear informational content explaining trusts and their relevance.  
* Given a user is based in Bulgaria, the system clearly indicates that trusts are not currently supported as a local legal planning tool within the platform.  
* Given a user uploads a trust-related reference document, it is stored securely and retrievable.  
* Given trust-related assets or beneficiaries are referenced for informational purposes, they display correctly in context.  
* Given unauthorized access is attempted, the system denies entry.  
* Given a user views the Trust section, it is clear that this is an informational/reference area only and not a workflow for establishing a trust in Bulgaria.  
* Given the platform reaches Phase 2, trust templates and instructions can be made available for jurisdictions outside Bulgaria where trusts are legally supported.

**10.3 Story: Power of Attorney (POA)**

Description: Allow users to assign a power of attorney (POA) to a trusted contact, define scope, and manage revocations. Where users need to create a POA document, the platform will provide a downloadable template and instructions for completion and legalization outside the platform.  
Tasks:

* Build UI to designate a POA (contact, relationship, scope, duration).  
* Provide downloadable POA templates for users to complete externally.  
* Provide instructions on how to complete and legalize the POA.  
* Enable editing, updating, and revoking of POA records.  
* Link POA to health and financial/legal sections.  
* Audit log all changes and updates.  
* In Phase 2, enable POA templates, instructions, and related guidance to vary by jurisdiction to reflect local legal requirements, formalities, and processes.  
* Unit and integration tests.  
  

Acceptance Criteria:

* Given a user wants to create a POA, they can download a template and view instructions for completing and legalizing it.  
* Given a user assigns a POA, when saved, then the details are stored securely.  
* Given a POA is assigned, then it is retrievable in the legal section.  
* Given a POA is edited or revoked, then the system updates records and logs the action.  
* Given a user links a POA to health/legal actions, then permissions are enforced accordingly.  
* Given the platform reaches Phase 2, then POA templates and legalization guidance can be adapted for different jurisdictions to reflect local laws and procedures.  
* Given unauthorized access is attempted, then the POA details are hidden.


  
**10.4 Story: Guardianship Declaration**

Description: Allow users to upload or create a guardianship declaration record that formally captures their intended guardian choices, supporting notes, and related legal preferences for dependents. The create flow will consist of downloadable declaration templates and instructions for completing and legalizing the document externally before upload.  
Tasks:

* Build UI to upload a completed guardianship declaration document.  
* Provide downloadable guardianship declaration templates.  
* Provide instructions on how to complete and legalize the guardianship declaration.  
* Allow users to associate the declaration with selected dependents and designated guardians.  
* Support editing and version history of guardianship declaration records.  
* Provide secure access to authorized trusted contacts or guardians as appropriate.  
* Validate upload size, file types, and enforce limits.  
* In Phase 2, enable guardianship declaration templates, instructions, and related guidance to vary by jurisdiction to reflect local legal requirements, formalities, and processes.  
* Write unit and integration tests.

Acceptance Criteria:

* Given a user wants to create a guardianship declaration, they can download a template and view instructions for completing and legalizing it.  
* Given a user uploads a guardianship declaration, then it is stored securely and retrievable.  
* Given a guardianship declaration is linked to dependents or guardians, then those relationships display correctly in the legal section.  
* Given a guardianship declaration is updated, then a new version is created and preserved.  
* Given an authorized trusted contact or guardian has permission, then they can securely access the declaration.  
* Given the platform reaches Phase 2, then guardianship declaration templates and legalization guidance can be adapted for different jurisdictions to reflect local laws and procedures.  
* Given unauthorized access is attempted, then the system denies entry.


  
**10.5 Story: Advance Directive**

Description:  Allow users to create, upload, and manage an advance directive, including treatment preferences, end-of-life care instructions, and related medical decision guidance. The create process will be supported through downloadable templates and instructions for how to complete and legalize or formalize the document externally.

Tasks:

* Build UI for uploading a completed advance directive.  
* Provide downloadable advance directive templates.  
* Provide instructions on how to complete and legalize or formalize the advance directive.  
* Enable sharing with healthcare proxies or providers.  
* Track version history for updates.  
* Provide export/print options for medical use.  
* In Phase 2, enable advance directive templates, instructions, and related guidance to vary by jurisdiction to reflect local legal requirements, formalities, and processes.  
* Write unit and integration tests.

Acceptance Criteria:

* Given a user wants to create an advance directive, they can download a template and view instructions for completing and legalizing or formalizing it.  
* Given a user records or uploads an advance directive, then it is stored securely and retrievable.  
* Given an advance directive is updated, then version history is preserved.  
* Given a healthcare proxy has access, then they can securely view the advance directive.  
* Given export is requested, then a printable version is generated securely.  
* Given the platform reaches Phase 2, then advance directive templates and formalization guidance can be adapted for different jurisdictions to reflect local laws and procedures.  
* Given unauthorized access is attempted, then access is denied.

**10.6 Story: Business Continuity**

Description:  Allow users to define continuity instructions for businesses, partnerships, or self-employment in the event of incapacitation or death. Where formal documentation is needed, the platform will support the process with downloadable templates and instructions for completion and legalization outside the platform.  
Tasks:

* Build UI for recording business continuity instructions.  
* Provide downloadable business continuity templates where applicable.  
* Provide instructions on how to complete and legalize the relevant continuity documents.  
* Allow linking to specific business assets and documents.  
* Store instructions securely in vault with encryption.  
* Provide controlled access to designated partners or executors.  
* Enable editing and version tracking.  
* Unit and integration tests.

Acceptance Criteria:

* Given a user wants to create a business continuity document, they can download a template and view instructions for completing and legalizing it where applicable.  
* Given a user records continuity instructions, then they are stored securely and retrievable.  
* Given instructions link to business assets, then they display correctly.  
* Given updates are made, then version history is preserved.  
* Given designated partners or executors have access, then they can view continuity details securely.  
* Given unauthorized access is attempted, then instructions are hidden.


# **Epic 11: Post-Loss Support \[PHASE 1\]** {#epic-11:-post-loss-support-[phase-1]}

Description: Provide families and trusted contacts with structured guidance, resources, and materials (articles, videos, checklists) to support them through the legal, financial, and emotional challenges that follow a loss.  
**11.1 Story: Deliver Structured Post-Loss Checklist**  
Description: Provide a standardized checklist that guides trusted contacts through key legal, financial, and emotional steps after a death.  
Tasks:

* Define standardized checklist with categories (legal, financial, emotional).  
* Build step-by-step workflow for completing checklist items.  
* Implement progress tracking with completion indicators.  
* Allow assigning checklist items to family members or trusted contacts.  
* Restrict access so only trusted contacts can use the checklist.  
* Write unit and integration tests for workflow and permissions.

Acceptance Criteria:

* Given a user is a trusted contact and a death trigger occurs, when they log in, then they can access the post-loss checklist.  
* Given a user views the checklist, when they check off items, then progress is updated and saved.  
* Given a checklist item is assigned, when another family member logs in, then they see their assigned tasks.  
* Given an unauthorized user attempts to access the checklist, then access is denied.  
* Given a checklist exists, when items are completed, then overall progress is visible to all authorized users.

**11.2 Story: Access Post-Loss Resource Library (Articles, Videos, Guides)**  
Description: Provide trusted contacts with access to curated post-loss educational materials (articles, videos, guides) to help them navigate legal, financial, and emotional challenges.  
Tasks:

* Build UI for browsing categorized resources (legal, financial, emotional, memorial).  
* Store and manage articles, videos, and guides in a resource library.  
* Implement search, filter, and recommendation features for resources.  
* Restrict access so only trusted contacts can access post-loss materials.  
* Provide download or share options for specific resources.  
* Write unit and integration tests for access and content delivery.

Acceptance Criteria:

* Given a user is a trusted contact, when a death trigger occurs, then they gain access to the resource library.  
* Given a user searches or filters resources, then only relevant articles, videos, or guides are displayed.  
* Given a user selects a resource, then it is viewable or playable within the platform.  
* Given a user wants to share a resource, then they can send it securely to other authorized contacts.  
* Given an unauthorized user attempts to access the library, then the system denies entry.  
  .

# **Epic 12: Vault \[PHASE 1\]** {#epic-12:-vault-[phase-1]}

Description: Provide users with a centralized Vault that serves as the single place to access all document entries across the PlanAfter platform. The Vault should organize documents and location-based records from all sections, preserve their original platform context, support search and easy retrieval, and ensure secure, role-based access for authorized users and trusted contacts. The Vault should also include a Credentials tab that organizes all saved credentials in one place for secure access and management.  
**12.1 Story: Centralized Document Entry & Credentials Repository**  
Description: Provide a centralized Vault experience that automatically organizes all document entries and credentials across the PlanAfter platform in one place. The Vault should preserve each item’s original platform context, support search and easy retrieval, and ensure secure, role-based access for authorized users and trusted contacts. In addition to document entries, the Vault should include a dedicated Credentials tab that organizes all saved credentials for secure access and management.  
Tasks:

* Design the Vault UI as a centralized repository for document entries across all platform sections.  
* Organize Vault content by category and original platform context.  
* Implement backend logic to surface document entries from other sections in the Vault automatically.  
* Apply metadata to each document entry, such as type, category, creation date, source section, and status.  
* Provide search, filter, and sort features for document entries in the Vault.  
* Enable secure preview, download, and sharing of document entries, subject to permissions.  
* Add a dedicated Credentials tab that aggregates and organizes all saved credentials from across the platform.  
* Enable secure access and management of credentials in accordance with roles and permissions.  
* Write unit and integration tests for sync, metadata, retrieval, and permissions.  
  

Acceptance Criteria:

* Given a user uploads or creates a document entry in another section, then it appears in the Vault under the correct category and retains its original platform context.  
* Given a user opens the Vault, then all available document entries are displayed with metadata.  
* Given a user opens the Credentials tab, then all saved credentials available to them are shown in one organized view.  
* Given a user searches, filters, or sorts Vault content, then only relevant items appear.  
* Given a user selects a document entry, then they can preview, download, or share it securely according to permissions.  
* Given a user selects a credential, then they can access it securely according to permissions.  
* Given a user lacks permission, then the item or credential is hidden or access is denied.

**12.2 Story: Cross-Linking of Vault Items**  
Description: Allow users to see and navigate the relationship between Vault items and their original platform context. Each document entry or credential in the Vault should preserve where it came from, what it is linked to, and where else it is used across the PlanAfter platform. The Vault acts as a centralized access layer without losing the original meaning, structure, and relationships of each item. If a document entry or credential is edited from within the Vault, that same update must also be reflected in its original location, since the Vault and source location reference the same underlying record.  
Tasks:

* Build linking functionality between Vault document entries and credentials and their originating platform records.  
* Display original source context and related linked items within Vault item details.  
* Show clickable references to connected records, sections, or individuals where permitted.  
* Sync Vault links and displayed context when source items are modified.  
* Ensure that edits made to document entries or credentials in the Vault update the same record in the original source location.  
* Ensure that edits made in the original source location are reflected in the Vault.  
* Ensure linked items and contextual references respect role-based permissions.  
* Maintain consistency of links between the Vault and all originating sections.  
* Unit and integration tests for linking, context, and source-sync logic.

Acceptance Criteria:

* Given a user views an item in the Vault, then its original source context and related linked items are shown.  
* Given a linked source item is updated, then the Vault displays the updated context or version.  
* Given a user edits a document entry or credential from the Vault, then the same update is reflected in its original location.  
* Given a user edits a document entry or credential in its original location, then the updated version is reflected in the Vault.  
* Given a user clicks a linked item, then they are navigated to its relevant detail page where permitted.  
* Given a user lacks permission for a linked item, then that linked item is hidden or inaccessible.  
* Given links exist, then they remain consistent across all sections and the Vault.

**12.3 Story: Secure Access & Permissions**  
Description: Enforce secure, role-based access controls across the Vault so that document entries and credentials are visible only to authorized users or trusted contacts, with permissions inherited from their original source sections. The Vault must respect the same access, sharing, and editing rules as the underlying records it surfaces. If permissions change in the original location, Vault visibility and actions must update accordingly. Access to sensitive document entries or credentials may also require additional authentication, and all relevant access, preview, download, sharing, and edit actions must be auditable.  
Tasks:

* Implement role-based access checks for Vault document entries and credentials.  
* Enforce visibility and access rules inherited from original source sections.  
* Ensure the Vault respects source-level sharing settings and permissions.  
* Restrict preview, download, sharing, and editing actions to users with explicit permissions.  
* Ensure credentials have appropriate secure-access protections and visibility controls.  
* Provide secure audit logging for access, preview, download, sharing, and edit actions.  
* Add optional re-authentication before access to sensitive document entries or credentials.  
* Ensure permission changes in source sections automatically update Vault visibility and allowed actions.  
* Write penetration, security, and permissions tests.  
  

Acceptance Criteria:

* Given a user has a role with access, when they open the Vault, then only permitted document entries and credentials are visible.  
* Given a user without permission tries to view a document entry or credential, then access is denied.  
* Given a sensitive document entry or credential is opened, then the user must re-authenticate if required.  
* Given a user previews, downloads, shares, or edits a Vault item, then the event is logged.  
* Given permissions change in a source section, then the Vault updates visibility and allowed actions automatically.  
* Given a user has permission to edit an item from the Vault, then they can edit only according to the permissions inherited from the original source location.

**12.4 Story: Vault Sharing with Trusted Contacts**  
Description: Allow users to share Vault access, including specific document entries and credentials, with trusted contacts in accordance with assigned roles, permissions, and data-visibility preferences. Vault sharing must respect the original source permissions of each item, so users can only share what they are allowed to share, and trusted contacts can only access what their role permits. Sharing status should be clear, manageable, and revocable at any time, with updates reflected consistently across the Vault and the underlying source records.  
Tasks:

* Build sharing UI for selecting trusted contacts and assigning visibility and access levels.  
* Support sharing at both Vault-item level and broader Vault-access level where applicable.  
* Integrate with the backend to grant or revoke access to document entries and credentials.  
* Ensure shared access respects source-level permissions and visibility rules.  
* Show sharing status, including who has access, what role or permissions they have, and when access was assigned.  
* Provide the ability to revoke access at any time with confirmation.  
* Notify trusted contacts when access is granted or revoked.  
* Ensure sharing changes are reflected consistently in the Vault and in the original source location permissions model.  
* Unit and integration tests for sharing and revocation flows.


Acceptance Criteria:

* Given a user selects a trusted contact and grants access, then the contact is added with visible role and permissions.

* Given a user revokes access, then the contact loses access immediately and receives a notification.  
* Given a contact’s role limits visibility, then only permitted Vault items are shown to them.  
* Given a user views sharing settings, then all current access assignments are visible.  
* Given a shared item originates from another section, then sharing respects the permissions and visibility rules of that original source.  
* Given unauthorized users attempt access, then the system blocks them.

**12.5 Story: Bulk Export & Download**  
Description: Provide users with the ability to export and download Vault content, including document entries and, where permitted, credentials, either as a full Vault export or as selected categories or items. Export and download functionality must respect the same source-based permissions and sharing rules that apply within the Vault, ensuring users can export only what they are authorized to access. Exported content should be delivered in a secure format, support protection measures such as password locking, and be fully auditable.  
Tasks:

* Build bulk export functionality for the entire Vault or selected categories and items.  
* Support export of document entries and, where permitted, credentials.  
* Generate downloadable secure export packages, such as ZIP files with password protection or encryption.  
* Ensure exported content preserves relevant metadata and context where appropriate.  
* Provide progress feedback for large exports.  
* Allow permission-controlled sharing of export access with trusted contacts where applicable.  
* Enforce source-level permissions and visibility rules on all export actions.  
* Log all export and download actions in the audit trail.  
* Write unit and integration tests for export, download, permissions, and sharing flows.

Acceptance Criteria:

* Given a user selects items or categories in the Vault, when they request export, then a downloadable package is generated for the content they are permitted to access.  
* Given the export includes credentials, then only credentials the user is authorized to access are included.  
* Given the package is large, then the user sees progress feedback during generation.  
* Given a user sets a password for export, then the package requires that password to open.  
* Given a user shares export access with a trusted contact, then the contact can access it securely according to permissions.  
* Given an unauthorized user attempts to access an export or download link, then access is denied.  
* Given an export or download occurs, then the event is recorded in the audit trail.


# **Epic 13: Tasks & Reminders \[PHASE 1\]** {#epic-13:-tasks-&-reminders-[phase-1]}

Description: Provide users and contributors with a centralized space to manage tasks and reminders. Tasks may be pre-generated by the platform, created manually by users, or automatically generated from other sections (e.g., Will, Health Directives, Assets). Each task includes assignee labels (user or contributor) and status tracking.  
**13.1 Story: Manage Pre-Generated Tasks**  
Description: Automatically generate and manage default tasks created by the platform when a user sets up or updates their plan.  
Tasks:

* Generate default tasks from plan templates (e.g., upload will, add healthcare proxy).  
* Display generated tasks in the dashboard with due dates.  
* Mark tasks with labels (assigned to user or contributor).  
* Allow marking pre-generated tasks as complete or incomplete.  
* Link tasks to their relevant input sections in other parts of the platform.  
* Track and update task status (To Do, In Progress, Complete).  
* Write unit and integration tests for auto-generation and status tracking.

Acceptance Criteria:

* Given a user completes plan setup, when tasks are generated, then default tasks appear in the dashboard automatically.  
* Given a user views pre-generated tasks, then each shows labels for assignee and task status.  
* Given a user marks a task complete, then its status changes and is saved.  
* Given a due task is approaching, then the user receives a reminder.  
* Given an unauthorized user views the dashboard, then pre-generated tasks are hidden.

**13.2 Story: Create and Manage User-Generated Tasks**  
Description: Allow users to create their own custom tasks with due dates, assignees, and reminders.  
Tasks:

* Build UI for adding custom tasks with description, due date, and assignee label.  
* Store custom tasks securely in backend.  
* Display tasks alongside pre-generated tasks in a unified dashboard.  
* Allow editing, completion, or deletion of custom tasks.  
* Link tasks to their relevant input sections in other parts of the platform.  
* Implement reminders and notifications for due tasks.  
* Unit and integration tests for custom task flows.

Acceptance Criteria:

* Given a user creates a task, when saved, then it appears in the dashboard with details.  
* Given a user views the task list, then both pre-generated and custom tasks are displayed together.  
* Given a user edits a task, then the updated information is reflected immediately.  
* Given a due date is set, then the user receives a reminder.  
* Given a task is deleted, then it no longer appears in the list.

**13.3 Story: Consolidate Tasks from Other Sections**  
Description: Aggregate all tasks generated in other sections of the platform (e.g., Will, Legal Actions, Health, Assets) into the central Tasks & Reminders dashboard.  
Tasks:

* Integrate with other platform sections to pull tasks (e.g., “Upload healthcare proxy document”).  
* Display aggregated tasks with clear labels for source section.  
* Add assignee label (user vs. contributor) to each aggregated task.  
* Show task status (To Do, In Progress, Complete) consistently across all sections.  
* Enable updates in either the originating section or the task dashboard to stay synchronized.  
* Write integration tests across modules.

Acceptance Criteria:

* Given a user generates a task in another section, then it appears in the Tasks dashboard automatically.  
* Given a task is updated in the originating section, then the change is reflected in the dashboard.  
* Given a user views aggregated tasks, then each has a source label, assignee label, and status.  
* Given a task is marked complete in the dashboard, then its status updates in the originating section.  
* Given an unauthorized user accesses tasks, then restricted tasks from other sections are hidden.

**13.4 Story: Task Filtering & Sorting**  
Description: Allow users to filter and sort tasks by attributes (status, due date, assignee, or source) to better manage large task lists.  
Tasks:

* Build filter controls (status, due date, assignee, source).  
* Build sorting options (due date ascending/descending, alphabetical, status).  
* Implement combined filtering \+ sorting logic.  
* Ensure filters and sorting apply consistently across pre-generated, custom, and aggregated tasks.  
* Persist user’s last filter/sort preference.  
* Unit and integration tests for filtering/sorting.

Acceptance Criteria:

* Given a user selects a filter (e.g., status \= To Do), then only matching tasks are displayed.  
* Given a user sorts by due date, then tasks are displayed in correct order.  
* Given multiple filters are applied, then only tasks meeting all conditions are shown.  
* Given a user leaves and returns, then their last filter/sort preference persists.  
* Given invalid or unauthorized filters, then the system prevents results and displays an error.

**13.5 Story: Notifications & Alerts**  
Description: Notify users and contributors of task deadlines, changes, and escalations across all task types.  
Tasks:

* Implement reminder notifications (email, push, SMS) for upcoming due tasks.  
* Build logic for overdue task escalation (e.g., highlight in dashboard, optional secondary notification).  
* Allow users to configure notification preferences (channel, frequency, mute options).  
* Trigger notifications when task status changes (e.g., completed, reassigned).  
* Store notification history for auditing.  
* Unit and integration tests for reminders and alerts.

Acceptance Criteria:

* Given a user has a task with a due date, when the due date approaches, then they receive a reminder via their preferred channel.  
* Given a task becomes overdue, when escalation is enabled, then the user is notified and the task is highlighted in the dashboard.  
* Given a user updates notification preferences, then reminders are sent according to their new settings.  
* Given a task status changes (e.g., completed or reassigned), then the assigned user receives a notification.  
* Given unauthorized users attempt to trigger or view notifications, then the system blocks access.


# **Epic 14: Marketplace \[Phase 2\]** {#epic-14:-marketplace-[phase-2]}

Description: Provide users with access to a curated marketplace of trusted third-party services that support financial, legal, healthcare, memorial, and life goals. The marketplace acts as the PlanAfter support hub, where users can browse providers (e.g., estate planning lawyers, financial advisors, therapists, funeral homes, personal trainers, dietitians, mentors, and education services), view details, and connect. Users can add vendors to their network, assign them tasks, and manage engagements securely.  
**14.1 Story: Legal Services Marketplace**  
Description: Allow users to discover and connect with legal service providers such as estate planning attorneys and will-writing specialists.  
Tasks:

* Research and onboard legal service provider APIs or partner integrations.  
* Build marketplace UI for listing and searching legal services.  
* Display provider profiles with details (expertise, credentials, contact info).  
* Implement secure purchase/booking flow.  
* Enable adding providers to user’s contacts and assigning tasks.  
* Track and store transaction history securely.

Acceptance Criteria:

* Given a user opens the marketplace, then they see a list of legal service providers with relevant details.  
* Given a user books a service, then the booking is processed securely and confirmed.  
* Given a booking is completed, then it appears in the user’s transaction history.  
* Given a user chooses to add a provider, then the provider appears in their contacts.  
* Given a user assigns a task to a provider, then the provider receives it with correct context.

**14.2 Story: Financial Advisory Marketplace**  
Description: Provide users with access to vetted financial advisors, tax specialists, and planners to help manage assets, liabilities, and financial goals.  
Tasks:

* Onboard financial service providers with profiles and offerings.  
* Build marketplace UI for financial categories (advisory, tax, retirement, investments).  
* Implement secure connection and booking flow.  
* Allow users to add providers to their network and assign related tasks (e.g., review investment portfolio).  
* Store financial service transactions securely.  
* Unit and integration tests.

Acceptance Criteria:

* Given a user navigates to the financial services category, then they see available advisors with verified details.  
* Given a user books a financial service, then the booking is completed and logged.  
* Given a user adds a financial advisor to contacts, then the provider is accessible in their network.  
* Given a user assigns a task (e.g., review will finances), then the provider receives the task.  
* Given an unauthorized user attempts to access financial providers, then access is denied.

**14.3 Story: Healthcare & Emotional Support Marketplace**  
Description: Enable users and their families to connect with healthcare and emotional support providers such as therapists, grief counselors, palliative care services, and related wellness providers.  
Tasks:

* Onboard healthcare and emotional support service providers.  
* Build marketplace UI for categories (therapy, counseling, palliative care).  
* Enable secure booking/scheduling flow.  
* Allow users to add providers to contacts and assign tasks (e.g., book a counseling session for a loved one).  
* Provide resource integration (articles/videos) with provider services.  
* Unit and integration tests.

Acceptance Criteria:

* Given a user opens healthcare & support category, then relevant providers are listed with verified details.  
* Given a user books a session, then it is scheduled and logged securely.  
* Given a user adds a provider to contacts, then the provider is available in their network.  
* Given a user assigns a provider a task, then the provider receives it and confirms.  
* Given an unauthorized user attempts to access this category, then access is denied.

**14.4 Story: Life Goals & Aspirations Marketplace**  
Description: Allow users to connect with professionals and services that help achieve personal dreams and life goals, such as travel planners, trainers, dietitians, coaches, and educational providers.  
Tasks:

* Onboard vendors for travel, fitness, nutrition, coaching, and education.  
* Build marketplace UI for browsing and filtering by life goals category.  
* Enable secure booking and payment flow.  
* Allow adding vendors to contacts for ongoing support.  
* Provide option to assign goal-related tasks to vendors.  
* Unit and integration tests.

Acceptance Criteria:

* Given a user browses the Life Goals section, then they see a list of relevant vendors.  
* Given a user selects a vendor, then they can view details and available services.  
* Given a user books a service, then confirmation is displayed and stored in history.  
* Given a user adds a vendor to their contacts, then they can assign tasks.  
* Given an unauthorized user attempts to access life goals vendors, then the system denies access.

# **Epic 15: Plans Shared With Me \[PHASE 1\]** {#epic-15:-plans-shared-with-me-[phase-1]}

Description: Allow users to view and interact with plans shared by others. Access depends on the role granted by the plan owner (Executor, Beneficiary, Contributor), and users can switch their dashboard view accordingly to reflect their permissions.  
**15.1 Story: View Plans Shared by Other PlanOwners**  
Description: Enable users to see all plans shared with them by other owners and access details according to their assigned permissions.  
Tasks:

* Build UI for displaying a list of shared plans with owner name and role.  
* Implement detail view for each shared plan.  
* Enforce permissions (read-only, edit, contribute) based on assigned role.  
* Log all shared plan access in the audit trail.  
* Restrict visibility to only authorized users.  
* Write unit and integration tests.

Acceptance Criteria:

* Given a user has plans shared with them, when they log in, then the shared plans list is displayed.  
* Given a user clicks on a shared plan, then the detail view opens with permissions enforced.  
* Given a user without permissions attempts access, then the system denies entry.  
* Given a user views a shared plan, then the access is logged in the audit trail.  
* Given a shared plan exists, then only authorized roles (Executor, Beneficiary, Contributor) can see and interact with it.

**15.2 Story: Switch Dashboard Role View**  
Description: Allow users to switch between dashboard views (Executor, Beneficiary, Contributor) when clicking on a shared plan so that they see the plan only as permitted by the plan owner.  
Tasks:

* Build role-based dashboard layouts (Executor, Beneficiary, Contributor).  
* Enable role switcher logic to load the correct dashboard when entering a shared plan.  
* Display role badge in the UI to make current view clear.  
* Restrict access to features/actions based on role permissions.  
* Ensure synchronization between role view and audit trail logging.  
* Write unit and integration tests for role switching and permissions.

Acceptance Criteria:

* Given a user has multiple roles across shared plans, when they click on a plan, then the dashboard opens in the assigned role view.  
* Given a user is in a role-based dashboard, then only features permitted by that role are visible and accessible.  
* Given a user attempts an action outside their role (e.g., Beneficiary editing), then the system blocks it.  
* Given a user opens a shared plan, then the correct role badge (Executor, Beneficiary, Contributor) is displayed in the dashboard.  
* Given role switching occurs, then the event is logged in the audit trail.

# **Epic 16: Marketing Website & Platform Entry Point (PHASE 1\)** {#epic-16:-marketing-website-&-platform-entry-point-(phase-1)}

Description: Develop and implement a responsive, multilingual public marketing website that serves as the entry point to the PlanAfter platform. The development team will receive final UX/UI wireframes, visual design, and content and will be responsible for executing the front-end build, CMS integration, platform routing, SEO optimization, legal compliance, and analytics tracking.  
**16.1 Story: Front-End Implementation of Page Architecture**  
Description: Build the site structure and navigation using provided page architecture and responsive wireframes.  
Tasks:

* Implement site layout (homepage, use case pages, FAQs, blog, legal) based on wireframes.  
* Create reusable layout components (header, footer, page templates).  
* Implement responsive behaviour across breakpoints (mobile, tablet, desktop).  
* Integrate dynamic CTAs with platform routing logic.  
* Write automated UI tests for navigation and layout.

Acceptance Criteria:

* Given the site is accessed on any device, the layout is responsive and matches design specs.  
* Given users click CTAs, they are routed to the correct platform flow (PlanOwner, Executor, Partner).  
* Given navigation is rendered, it aligns with the provided site map.  
* Given Lighthouse tests run, layout performance scores meet baseline requirements.  
* Given QA review, no layout or routing bugs exist.

 **16.2 Story: Multilingual Content Integration**  
Description: Integrate multilingual support based on finalized content files, including English and Bulgarian versions.  
Tasks:

* Implement i18n setup (e.g., i18next or Next.js localization).  
* Load language files and ensure dynamic rendering of localized strings.  
* Add toggle for language switching in UI.  
* Test URL path-based or cookie-based language persistence.  
* Write unit tests for fallback logic.

Acceptance Criteria:

* Given a user switches language, all content updates to the selected locale.  
* Given no translation exists for a string, fallback to default language is applied.  
* Given QA runs localization tests, all page sections are fully translated.  
* Given metadata (title, description) updates, it matches selected language.  
* Given SEO bots index the site, localized paths are visible and unique.

**16.3 Story: Component-Based UI Implementation**  
Description: Implement all visual components based on the approved UI kit and design tokens.  
Tasks:

* Create atomic components (buttons, inputs, cards, CTAs).  
* Apply global styles (colors, typography, spacing).  
* Build page sections (hero, testimonials, feature blocks).  
* Ensure components are responsive and accessible.  
* Validate against design tokens and style guide.

Acceptance Criteria:

* Given component library is rendered, it matches design library pixel-perfect.  
* Given screen size changes, components adapt accordingly.  
* Given accessibility audits, all interactive components meet WCAG standards.  
* Given internal testing, all sections render without visual regressions.

**16.4 Story: CMS & Blog Integration**  
Description: Implement CMS integration to enable non-technical teams to manage blog and help center content.  
Tasks:

* Set up selected CMS (Strapi, Contentful, or markdown-based CMS).  
* Connect dynamic pages to CMS API.  
* Create templates for blog, help center, and FAQs.  
* Seed initial blog articles and help content.  
* Set up user permissions and editor access.

Acceptance Criteria:

* Given CMS content is updated, changes reflect live on the site.  
* Given a new article is added in the CMS, it renders correctly on the frontend.  
* Given CMS roles are assigned, only authorized users can publish or edit.  
* Given backend fetch fails, the frontend falls back to static placeholders.

**16.5 Story: Legal & Cookie Consent Implementation**  
Description: Implement legal documentation pages and GDPR-compliant cookie banner functionality.  
Tasks:

* Build static pages for Privacy Policy, Terms, and Security Info.  
* Implement consent management banner (accept, reject, customize).  
* Store user preferences in cookies/local storage.  
* Prevent analytics from loading before consent.  
* Ensure pages are indexable but excluded from CTAs.

Acceptance Criteria:

* Given a user visits the site for the first time, a cookie banner appears.  
* Given a user accepts/rejects cookies, their preferences are respected.  
* Given legal pages are visited, content displays in both EN and BG.  
* Given compliance audit is run, cookie behavior meets GDPR standards.

**16.6 Story: SEO & Analytics Integration**  
Description: Set up tracking, meta tags, and schema markup to ensure discoverability and performance insights.  
Tasks:

* Add GA4, Hotjar, and GTM tracking scripts.  
* Insert meta tags (title, description, canonical, OG).  
* Implement structured data ([schema.org](http://schema.org/)) for key pages.  
* Generate and upload sitemap.xml and robots.txt.  
* Test site speed and optimize image loading.

Acceptance Criteria:

* Given tracking is enabled, user behavior is recorded in GA4.  
* Given a page is crawled, SEO tags and schema markup are present.  
* Given SEO scans run, the site passes core web vitals benchmarks.  
* Given the sitemap is submitted, GSC indexes all key pages correctly.

# **EPIC 17: Executor Role \[PHASE 1\]** {#epic-17:-executor-role-[phase-1]}

Description: Enable a trusted person designated by the PlanOwner to act as an Executor. Executors are responsible for confirming the PlanOwner’s death, activating the plan, and carrying out predefined instructions. Their access to the platform is secured, permission-based, and can be triggered by specific events (e.g., death confirmation). Executors can complete platform-generated or delegated tasks and access support tools and secure messaging.  
**17.1 Story: Invite and Onboard Executor**  
Description: Enable PlanOwners to securely invite Executors and manage their onboarding through a dedicated no-payment registration flow.  
Tasks:

* Implement secure invitation flow via email with unique token  
* Build executor-specific registration form (skip payment logic)  
* Validate invitation token & link expiry  
* Assign role and bind executor to correct PlanOwner  
* Write tests for invitation and registration flow


Acceptance Criteria:

* Given a PlanOwner invites an Executor, the Executor receives a secure email with an invite link  
* Given an Executor clicks the invite, they can register without payment  
* Given registration completes, the Executor role is linked to the PlanOwner  
* Given an expired or invalid invite, an error message is shown  
* Given a registered Executor returns later, they can log in with correct role

**17.2 Story: Executor Access & Permission Controls**  
Description: Support configurable access controls defining what sections and data Executors can see, and when access becomes active (immediately, delayed, or triggered).  
Tasks:

* Implement permission rules based on executor access level  
* Build timing logic for immediate/delayed/event-based access  
* Sync with platform triggers (e.g., death confirmation)  
* Test role-switching and access logic under all scenarios  
* Build audit logging for access attempts and granted access


Acceptance Criteria:

* Given an Executor logs in before their access is active, they see a limited dashboard with no plan access  
* Given death is confirmed or scheduled access time is reached, permissions unlock  
* Given a PlanOwner updates access settings, the Executor’s view updates accordingly  
* All access changes are logged and auditable  
* Executors cannot view unauthorized plan sections

**17.3 Story: Executor Dashboard & Task Management**  
Description: Create a dedicated dashboard for Executors displaying assigned tasks (platform-generated or PlanOwner–delegated), along with contextual tools and progress tracking.  
Tasks:

* Build executor dashboard UI (task view, status, timeline)  
* Show both predefined and delegated tasks  
* Implement task completion logic with audit trail  
* Add progress bar and secure comments/chat if enabled  
* Write tests for task assignment and execution

Acceptance Criteria:

* Given an Executor has active tasks, they appear in the dashboard with due dates  
* Given a task is completed, status updates and logs the action  
* Given the PlanOwner assigns a new task, it appears in real-time  
* Executors can only see tasks relevant to their role  
* Executor dashboard reflects live progress of execution

**17.4 Story: Executor Verification & Death Confirmation**  
Description: Enable Executors to securely confirm the death of the PlanOwner and trigger access activation with supporting document upload and legal verification.  
Tasks:

* Build secure death confirmation flow (document upload \+ identity check)  
* Integrate document verification module (API or manual review)  
* Link trigger to access change and notifications  
* Ensure legal compliance with documentation policy  
* Write security tests and validations

Acceptance Criteria:

* Given an Executor confirms a death with supporting files, verification begins  
* Once verified, plan is activated and access unlocks per permissions  
* Death confirmation is logged with timestamp and file references  
* Unauthorized users cannot submit confirmation  
* Executor receives confirmation email once access is granted

**17.5 Story: Collaboration & Safeguards**  
Description: Allow Executors to interact with PlanAfter data with safeguards—such as read-only modes, version control, and secure messaging—to maintain plan integrity.  
Tasks:

* Implement read-only and contributor modes based on permissions  
* Enable secure internal messaging (chat/comments)  
* Add version control to editable items  
* Create real-time alert system for collaboration actions  
* Write unit/integration tests for safeguarded updates

Acceptance Criteria:

* Executors in read-only mode cannot make changes  
* Changes made by Executors (if allowed) are versioned and logged  
* Given an Executor sends a message, recipient is notified  
* Given a change is made, it appears in audit logs  
* Real-time updates reflect collaboration securely

**17.6** **Story: Executor Upgrade & Optional Payments**  
Description: Enable Executors to upgrade to PlanOwner status or purchase additional services without interfering with their executor role.  
Tasks:

* Add CTA for upgrade to PlanOwner with payment path  
* Support microtransactions (e.g., legal help, contract closure services)  
* Ensure executor/plan owner roles don’t conflict  
* Maintain separation of roles in DB structure  
* Test upgrade scenarios

Acceptance Criteria:

* Given an Executor chooses to upgrade, they’re taken through registration & payment without losing executor status  
* Executor can purchase a-la-carte services securely  
* Given an upgrade occurs, user now sees both dashboards  
* Purchases are recorded and accessible from executor account  
* Errors or duplicate upgrades are prevented

# **Epic 18: Contributor Role \[PHASE 1\]** {#epic-18:-contributor-role-[phase-1]}

Description: Enable trusted individuals (Contributors) to be invited by the PlanOwner to contribute to specific sections of the life and legacy plan. Contributors receive temporary, controlled access to designated sections for gathering information, uploading documents, and providing input. Their access is time-bound and revoked once the section is finalized, ensuring data security and plan integrity.

**18.1 Story: Invite and Register Contributor**  
Description: Allow PlanOwners to securely invite contributors via link or direct message and guide them through a registration process that includes identity verification but skips payment.  
Tasks:

* Build invite modal with options to send via email or copy link.  
* Generate unique token for each invitation (with expiration).  
* Implement contributor-specific registration form (no payment).  
* Include legal-consulted identity verification step (basic KYC form).  
* Link contributor account to inviting PlanOwner and specific folders.

Acceptance Criteria:

* Given a PlanOwner invites a contributor, the contributor receives a secure invitation link.  
* Given a contributor registers via the link, they can complete setup without any payment.  
* Given the invitation is expired or invalid, a relevant error is shown.  
* Given identity verification fails, contributor cannot proceed.  
* Given registration succeeds, contributor is routed to their dashboard with limited access.

**18.2 Story: Contributor Access Control & Folder Permissions**  
Description: Implement granular, temporary access to specific sections or folders of the plan, ensuring contributors can only interact with what is explicitly shared with them.  
Tasks:

* Create permission-setting UI for PlanOwners (select section/folder and access level).  
* Build logic to grant or revoke access based on folder finalization or deadlines.  
* Display allowed folders in the contributor dashboard.  
* Implement timed expiration and access state sync.  
* Test unauthorized access scenarios (manual URL attempts, expired roles).

Acceptance Criteria:

* Given a folder is shared, the contributor can view and/or edit it based on assigned rights.  
* Given the contribution phase ends or the folder is finalized, access is revoked automatically.  
* Given a contributor attempts to access unauthorized content, they receive an error or restricted view.  
* Given access settings are updated by the PlanOwner, the contributor’s view reflects the change.  
* All access grants/revokes are logged in an audit trail.

**18.3 Story: Contributor Dashboard and Task Management**  
Description: Provide contributors with a dedicated dashboard displaying assigned tasks, access areas, progress, and contextual tools to support their responsibilities.  
Tasks:

* Build dashboard UI for contributors showing task list, shared sections, and progress.  
* Fetch task data from backend and update in real-time.  
* Implement progress indicators per section/folder.  
* Show optional CTA to “Create Your Own PlanAfter” (with payment upgrade).  
* Display a banner with expiry countdown of access.

Acceptance Criteria:

* Given a contributor logs in, they see only the assigned sections and tasks.  
* Given tasks are completed, progress indicators update accordingly.  
* Given a contributor clicks “Create My PlanAfter,” they are routed to a PlanOwner upgrade flow.  
* Given access is close to expiring, a visual warning is displayed.  
* Given no active tasks or shared folders, an empty state is shown with guidance.

**18.4 Story: Document Upload, Feedback, and Contribution Tools**  
Description: Enable contributors to securely upload documents, leave notes, and interact with the PlanOwner using structured collaboration tools and feedback components.  
Tasks:

* Enable file upload with type validation and virus scanning.  
* Allow in-section commenting (inline or panel).  
* Implement secure messaging between PlanOwner and Contributor.  
* Store all feedback and actions in audit trail.  
* Add ability to mark comments as resolved.


Acceptance Criteria:

* Given access is granted, contributors can upload documents in assigned sections.  
* Given a contributor adds a comment, the PlanOwner is notified.  
* Given a comment is resolved, it is visually marked and logged.  
* Given uploads occur, file previews and versioning are available.  
* Contributors cannot modify plan data outside their assigned folders.

**18.5 Story: Automatic Access Revocation on Section Finalization**  
Description: Ensure contributor access is automatically revoked once a section or folder is finalized by the PlanOwner.  
Tasks:

* Listen for section finalization events in backend.  
* Trigger access removal and update permissions.  
* Notify contributor via email or in-app message.  
* Lock the section to read-only or remove access completely.  
* Log all access change events.


Acceptance Criteria:

* Given a section is finalized, the contributor’s access is revoked immediately.  
* Given access is revoked, the contributor sees a locked or removed message.  
* A notification is sent to inform them their contribution phase has ended.  
* Any further actions by contributor are prevented and logged.  
* Given the PlanOwner reopens a section, access can be reinstated manually.

**18.6 Story: In-Platform Upgrade to PlanOwner**  
Description: Allow contributors to upgrade their account to become PlanOwners and start their own plan.  
Tasks:

* Create upgrade CTA and flow from contributor dashboard.  
* Implement payment step and PlanOwner registration.  
* Maintain dual role (Contributor \+ PlanOwner) structure.  
* Ensure dashboards for both roles are accessible post-upgrade.  
* Prevent cross-contamination of data between roles.

Acceptance Criteria:

* Given a contributor chooses to upgrade, they’re redirected to a payment and plan setup flow.  
* Given the upgrade is completed, the user can now switch between roles.  
* Given the upgrade fails, no changes are made to contributor data.  
* Data access from the original PlanOwner remains role-scoped (no escalation).  
* The new PlanOwner account includes full feature access.

# **Epic 19: Beneficiary Role \[PHASE 1\]** {#epic-19:-beneficiary-role-[phase-1]}

Description: Allow designated individuals or organizations to securely receive legacy content (assets, documents, letters, media, instructions) based on the PlanOwner’s configurations. Beneficiaries are invited via email or SMS, gain timed or event-triggered access, and may upgrade for personalized services. Future expansion includes grief support, digital memorials, and administrative guidance.

**19.1 Story: Invite and Register Beneficiary**  
Description: Enable PlanOwners or Executors to send secure invitations to Beneficiaries that lead to a payment-free registration process, tied to folder-specific permissions.  
Tasks:

* Build invitation logic triggered by either PlanOwner or Executor.  
* Implement backend to generate unique invitation token with expiry.  
* Build registration form for Beneficiaries (name, contact, optional ID verification).  
* Integrate basic identity check (e.g. date of birth or passphrase).  
* Assign Beneficiary to correct PlanOwner and designated folders on success.

Acceptance Criteria:

* Given a Beneficiary is invited, they receive a secure email (and optional SMS) with the invite link.  
* Given the Beneficiary registers successfully, they are granted view-only access to their designated content.  
* Given the invitation link is expired or invalid, a relevant error message appears.  
* Given identity verification fails, registration does not complete.  
* Given the invitation is triggered by Executor after activation, it functions the same as PlanOwner-sent invite.

**19.2 Story: Time-Based and Event-Based Access Control**  
Description: Support access that is either granted immediately or delayed based on an event (e.g. death confirmation) or a specific scheduled date.  
Tasks:

* Implement permission rules for delayed or event-triggered access.  
* Support future-date-based scheduling logic.  
* Build backend listener for activation events (e.g. plan activated by Executor).  
* Send real-time email/SMS/app notifications when access is granted.  
* Display folder unlock status in dashboard with timestamp.

Acceptance Criteria:

* Given the access date is reached, the Beneficiary receives a notification and folder is unlocked.  
* Given the Plan is activated by the Executor, Beneficiary access is triggered accordingly.  
* Given access is not yet granted, the folder appears locked with an explanatory message.  
* All access grants are logged and timestamped.  
* Given a PlanOwner updates access rules, the system recalculates eligibility in real-time.

**19.3 Story: Beneficiary Dashboard**  
Description: Build a simplified, secure dashboard for Beneficiaries showing granted folders, content previews, status of access, and support tools.  
Tasks:

* Build dashboard UI with sectioned folder access (e.g. Letters, Videos, Instructions).  
* Implement secure content preview for allowed media types.  
* Add status indicators (e.g. “Unlocked,” “Scheduled,” “Pending Executor Trigger”).  
* Include contextual resource tiles (e.g. grief support, digital memorial).  
* Display action button for “Upgrade to PlanOwner.

Acceptance Criteria:

* Given a Beneficiary logs in, they only see folders assigned to them.  
* Given a folder is unlocked, its content is accessible and view-only.  
* Given access is pending, a locked state is shown with status info.  
* Given a user clicks a support tile, they are routed to the appropriate service.  
* Dashboard is responsive and shows remaining access time where applicable.

**19.4 Story: Grief Support**   
Description: Integrate support services into the Beneficiary experience, such as grief counselling and checklists.  
Tasks:

* Build resource center UI with help guides, articles, and links.  
* Include Post-Loss support materials (same structure as Post-Loss Support section in PlanOwner’s role).  
* Include support-specific contact forms or chat.  
* Add backend logging for tool usage and feedback.

Acceptance Criteria:

* Given a Beneficiary accesses the grief support section, content is loaded securely.  
* Given a support session is booked, the confirmation is logged and visible in dashboard.  
* Resource guides are localized and categorized clearly.

**19.5 Story: Access Notifications and Communication**  
Description: Ensure that Beneficiaries are proactively notified about their access status and can communicate securely with the PlanAfter platform or their PlanOwner if needed.  
Tasks:

* Send access notifications via email and optionally SMS.  
* Add in-app alerts when access updates.  
* Build contact/support widget for inquiries or clarification.  
* Enable PlanOwner-configured messaging for custom onboarding notes.  
* Create audit trail for all communication and access events.

Acceptance Criteria:

* Given access is updated, the Beneficiary is notified immediately.  
* Given PlanOwner adds a custom note, it appears in the onboarding screen.  
* Given the user submits a support request, a confirmation is shown and message is routed.  
* All sent notifications appear in the message history for reference.  
* Beneficiaries cannot message other beneficiaries or edit the plan.

**19.6 Story: Optional Services and Upgrade Path \[Phase 2\]**  
Description: Allow Beneficiaries to access premium services via microtransactions and upgrade to full PlanOwner status.  
Tasks:

* Add upgrade CTA and route to PlanOwner registration and payment flow.  
* Build secure microtransaction system (pay-per-use) for services like:

  * Premium grief counseling  
  * Custom digital obituary enhancements  
  * Legacy storytelling session  
*   
* Display pricing and terms clearly before purchase  
* Prevent double billing and validate payment status

Acceptance Criteria:

* Given a user chooses to upgrade, they are taken through the appropriate payment and onboarding steps.  
* Given a premium service is purchased, the transaction is logged and content is unlocked.  
* Given a service fails to deliver (e.g. third-party API fails), a fallback is shown and the user is refunded.  
* Upgrade status is shown in the dashboard and allows access to additional features.  
* Microtransactions are optional and do not block standard beneficiary functionality.

# **Epic 20: Admin Panel \[PHASE 1\]** {#epic-20:-admin-panel-[phase-1]}

Description: Enable internal teams to efficiently monitor, analyze, support, and manage platform operations and users through a secure, role-based admin interface. The Admin Panel supports data reporting, user insights, subscriptions, lead tracking, and platform activity — while maintaining data security, GDPR compliance, and privacy constraints.

**Story 20.1: Build Admin Panel Infrastructure**  
Description: Develop the foundational backend and frontend components of the Admin Panel, with secure role-based access and integration to platform services.  
Tasks:

* Set up RBAC (Role-Based Access Control) for all admin types.  
* Create frontend layout and navigation for the Admin Panel.  
* Build secure login system for admin roles (not connected to regular user login).  
* Integrate analytics/dashboard libraries for visual reports.  
* Implement activity logging and error tracking.


Acceptance Criteria:

* Admin users can log in securely with role-specific access.  
* Unauthorized access is blocked.  
* The Admin Panel loads correctly for each role with appropriate views.  
* All admin interactions are logged securely.

**Story 20.2: Customer Management Module**  
Description: Create a module to view and manage customer profile information, subscription status, and recent activity.  
Tasks:

* Design frontend UI for customer list and profile view.  
* Build API to fetch user data: registration, login history, subscriptions.  
* Display last 5 user actions and folders updated.  
* Compute and show PlanAfter Score and Customer Lifetime Value (CLV).  
* Implement search, filter, and export options.

Acceptance Criteria:

* Admin can view individual user records with all profile and usage info.  
* Search/filter by name, email, subscription, location is functional.  
* All displayed data is masked for Limited View roles.  
* CLV is calculated accurately and updated in real-time.

**Story 20.3: Lead Conversion Tracking**  
Description: Implement lead analytics to track users who start but do not complete registration.  
Tasks:

* Capture funnel drop-off points with timestamps.  
* Store device, browser, and source metadata.  
* Design report view for registration steps and conversion rates.  
* Visualize leads by time (daily, weekly, monthly).


Acceptance Criteria:

* Admin sees accurate number of leads and conversion rates by time period.  
* Drop-off points are clearly identified per registration step.  
* Lead source segmentation is visible (organic, paid, affiliate).

**Story 20.4: Subscription & Revenue Reports**  
Description: Provide a financial reporting section that tracks user subscriptions, payments, and revenue.  
Tasks:

* Build UI to list subscription status and payment history per user.  
* Implement report views for revenue per subscription plan, payment method, and source.  
* Add export capability for CSV/Excel.

Acceptance Criteria:

* Admin can see revenue totals by month, quarter, and year.  
* Filters for active, expired, and overdue subscriptions function as expected.  
* Data is downloadable in .csv format.  
* Revenue breakdown by source (partner, direct) is accurate.

**Story 20.5: Churn & Inactivity Tracking**  
Description: Allow tracking of user churn patterns and inactive users to support retention strategies.  
Tasks:

* Capture and display time from signup to cancellation.  
* Visualize churn by demographics, subscription type, and duration.  
* List inactive users with last login date and account type.


Acceptance Criteria:

* Churn rate is calculated correctly and displayed by period.  
* Admin can view inactivity segmented by user type and days since last activity.  
* Exit survey data (if available) is linked to each churned user.

**Story 20.6: Data Usage & Questionnaire Reports**  
Description: Provide insights into platform usage patterns including storage, form completions, and user actions.  
Tasks:

* Track average storage per user and per folder.  
* Identify high-storage users and common document types.  
* Report on completion rates for each questionnaire.  
* Visualize questionnaire drop-off points and average completion time.

Acceptance Criteria:

* Admin can view and export reports on questionnaire performance.  
* Drop-off insights are broken down by question and device type.  
* High-storage users are listed correctly with folder-level breakdown.

**Story 20.7: Content & CMS Access**  
Description: Allow authorized admins to manage legal content, FAQs, and blog posts via integrated CMS.  
Tasks:

* Connect CMS (e.g., Strapi, Contentful) to Admin Panel.  
* Build interface for publishing legal policies, updates, and articles.  
* Set up multi-language (EN, BG) content management.  
* Implement change logs and editor history.


Acceptance Criteria:

* Admin can view, edit, publish, and localize content via the panel.  
* CMS changes are tracked with editor name and timestamp.  
* Language toggle reflects correct versions.

**Story 20.8: Admin Roles & Permissions**  
Description: Define and enforce admin access levels across roles such as Admin, Analyst, Support, Financial Officer, and Limited Viewer.  
Tasks:

* Create roles and assign granular permissions.  
* Implement toggles for viewing vs editing per report/module.  
* Set up personal data masking for non-admins.  
* Test access control scenarios.


Acceptance Criteria:

* Each admin role sees only allowed sections.  
* Limited Access View masks personal data fields.  
* Audit log tracks permission changes and unauthorized attempts.

# **Epic 21: Annual PlanAfter Review \[Phase 2\]** {#epic-21:-annual-planafter-review-[phase-2]}

Description: Introduce an annual check-in mechanism that prompts users to revisit and update their legacy plan. This feature helps maintain up-to-date legal, financial, health, and digital records, while reinforcing engagement with the platform. It allows users to track personal growth, life milestones, and evolving intentions year over year.  
**21.1 Story: Trigger Annual Review Notification**  
Description: Notify users annually via email, in-app message, and SMS to initiate their Annual PlanAfter Review.  
Tasks:

* Build backend logic to track registration anniversaries and last review dates.  
* Schedule and send notifications (email, in-app, SMS).  
* Build notification settings panel (opt-in/out, preferred channels).  
* Add “Start Annual Review” CTA to user dashboard.

Acceptance Criteria:

* Given a user is due for review, they receive a multi-channel notification.  
* Given the user starts the review, progress is tracked and saved.  
* Notification preferences are respected based on user settings.  
* Users can postpone review and get reminded later.

**21.2 Story: Annual Review Interface & Progress Tracker**  
Description: Design and implement a guided flow that walks users through updating their information by category (Personal, Health, Legal, Digital, etc.).  
Tasks:

* Build frontend review flow UI with sections: Personal, Health, Legal, Digital, Emotional Legacy.  
* Fetch existing data and suggest fields for update.  
* Display progress tracker (e.g. 3/5 sections complete).  
* Save draft progress for each section.  
* Create “Review History” page with timeline view of past annual reviews.

Acceptance Criteria:

* Given a user enters the review, previously submitted data is pre-filled and editable.  
* Progress is shown clearly and saved if user exits mid-way.  
* Timeline of past reviews is viewable with timestamp and downloadable.  
* All updates auto-save to the user’s plan upon completion.

**21.3 Story: Smart Suggestions & Pre-Filled Prompts**  
Description: Enable the system to suggest relevant updates based on time elapsed, previous changes, or detected gaps in the user’s plan.  
Tasks:

* Implement logic to detect out-of-date fields or missing plan items.  
* Build frontend prompt banners (e.g., “You haven’t updated your Power of Attorney in 2 years”).  
* Highlight key fields in red/yellow based on priority or expiration.  
* Allow user to dismiss or act on each prompt.

Acceptance Criteria:

* Given a plan item is missing or outdated, a contextual prompt is shown.  
* Given the user acts on a suggestion, it opens the correct section for update.  
* Suggestions disappear once acted upon or dismissed.  
* Prompts are updated dynamically as the user progresses.

**21.4 Story: Save & Store Completed Review**  
Description: Once the review is completed, save a versioned record of the updates in the Secure Vault and allow user to export a summary.  
Tasks:

* Create versioned entry for completed review in the Secure Vault.  
* Provide download/export as PDF summary.  
* Timestamp and label the review version (e.g. “Annual Review 2025”).  
* Trigger backup sync and audit log.

Acceptance Criteria:

* Given a review is completed, it is saved to the Vault with full traceability.  
* Given the user opens the Vault, they see previous review summaries.  
* User can download a clean, readable version of the review summary.  
* A log entry is created showing who submitted the updates and when.

**21.5 Story: Add/Edit Annual Review Categories**  
Description: Allow users to customize which sections are included in their annual review (e.g., skip Financials, include Bucket List).  
Tasks:

* Build category preferences settings page.  
* Allow toggling categories ON/OFF in review.  
* Save user preferences and apply to future reminders.  
* Add “Why this section matters” tooltip per category.


Acceptance Criteria:

* Given the user disables a category, it is excluded from their annual review.  
* Given the user re-enables a category, it appears next time they review.  
* Preferences persist across years unless updated.  
* Tooltips provide value and context for each section.

**21.6 Story: Life Milestone & Reflection Prompts**  
Description: Encourage users to reflect on life milestones, ethical will updates, and personal growth through a structured journaling section.  
Tasks:

* Build optional journaling prompts (e.g., “What changed this year?”, “What am I grateful for?”).  
* Allow uploading of photos or videos related to life events.  
* Save entries as “Year in Review” documents.  
* Link to ethical will and letters sections for seamless updates.


Acceptance Criteria:

* Given the user completes the reflection section, it is saved in their legacy plan.  
* User can revisit previous reflections in a timeline or document viewer.  
* Given attachments are uploaded, they are stored securely and encrypted.  
* Users are encouraged to revisit or share reflections if desired.

# **Epic 22: Contract & Services Accounts Closure \[Phase 2\]** {#epic-22:-contract-&-services-accounts-closure-[phase-2]}

Description: Provide Executors with a secure, automated tool to manage the closure of contracts and accounts on behalf of deceased individuals. This includes submitting verification, identifying relevant institutions, sending closure notifications, and tracking progress — while ensuring legal compliance and data security.  
**22.1 Story: Death Verification & Document Upload**  
Description: Enable Executors to initiate the closure process by uploading a certified death certificate and supporting identification documents.  
Tasks:

* Build document upload UI with required fields.  
* Accept PDFs, images (JPG/PNG), or scanned documents.  
* Create backend service to store files securely (encrypted at rest).  
* Validate document types, expiration dates, and format.

Acceptance Criteria:

* Given an Executor uploads a valid death certificate, it is securely saved and linked to the corresponding PlanOwner.  
* Only permitted file types are accepted; others trigger validation errors.  
* Upload is logged with timestamp and user ID.  
* A confirmation message is displayed upon successful upload.

**22.2 Story: Automated Death Verification via API or AI OCR**  
Description: Use integrations with government databases or AI-based OCR to validate the death certificate automatically.  
Tasks:

* Integrate government registry APIs (where available) for cross-checking death records.  
* Implement OCR to extract data fields from uploaded documents.  
* Flag invalid or mismatched records for manual review.  
* Store verification status (Pending, Verified, Failed).

Acceptance Criteria:

* Given a valid document, the system verifies identity and confirms death within seconds/minutes.  
* OCR extracts at minimum: name, date of death, issuing authority.  
* Status is updated and visible on the Executor dashboard.  
* Errors trigger fallback to manual review and notify support.

**22.3 Story: Institution Identification via AI**  
Description: Use uploaded documents, plan data, and AI to detect institutions that need to be notified of the user’s death.  
Tasks:

* Develop AI model to parse uploaded bank statements, utility bills, etc.  
* Map institution names to supported closure flows.  
* Build confidence threshold logic (e.g. 90% match).  
* List identified institutions for Executor review and approval.


Acceptance Criteria:

* Given uploaded records, institutions are listed automatically.  
* Executor can confirm/remove institutions before notification.  
* AI misses trigger manual addition interface.  
* Suggested list is accurate with confidence scores.

**22.4 Story: Automated Notifications to Institutions**  
Description: Automatically send death notifications and closure requests to the identified institutions via email, SMS, or API.  
Tasks:

* Build template-based email and SMS generator.  
* Integrate with partner APIs for one-click closures.  
* Log delivery status (sent, failed, acknowledged).  
* Allow custom message additions by Executor.


Acceptance Criteria:

* Given an approved institution, a notification is sent and delivery is logged.  
* Failed attempts trigger retry logic and display alerts to the Executor.  
* Executor can edit messages before sending (where permitted).  
* All communications are stored securely and time-stamped.

**22.5 Story: Digital Account Closure (Social, Email, Cloud)**  
Description: Enable closure or memorialization of digital accounts like Gmail, Facebook, iCloud, etc.  
Tasks:

* Provide UI for selecting supported platforms.  
* Build guides and direct links to provider closure request forms.  
* Where possible, integrate API-based memorialization (e.g., Facebook Graph API).  
* Allow upload of platform-specific closure requirements.

Acceptance Criteria:

* Executor can view and select supported platforms.  
* Closure instructions and form links are accurate and up to date.  
* Where APIs exist, status of closure is tracked in real-time.  
* Manual options allow upload of evidence and form completion confirmation.

**22.6 Story: Executor Closure Dashboard**  
Description: Provide a real-time dashboard for Executors to track the status of all contract/account closures.  
Tasks:

* Build dashboard UI with institution name, type, status (Pending, In Progress, Completed, Failed).  
* Add filter/sort options.  
* Provide downloadable status report.  
* Integrate status updates from notification and document flows.

Acceptance Criteria:

* Executor sees up-to-date status for every notified institution.  
* Status updates reflect real-time changes in backend.  
* Dashboard supports filtering by status and institution type.  
* Executor can download a summary report at any time.

**22.7 Story: Pre-Death Account Closure Preferences**  
Description: Allow PlanOwners to pre-select which accounts or contracts should be automatically closed after their death.  
Tasks:

* Build UI for pre-death closure preferences (toggle on/off per service).  
* Link preferences to post-death automation logic.  
* Display service-level disclaimers or requirements.  
* Allow export of selected preferences for family or legal use.

Acceptance Criteria:

* PlanOwners can enable/disable closure for each supported institution.  
* Preferences persist and are stored securely.  
* Executor sees selected instructions upon plan activation.  
* Preferences are automatically added to closure dashboard post-death.

**22.8 Story: Support & AI Assistance for Executors**  
Description: Provide AI-driven or live support to help Executors resolve complex closure issues.  
Tasks:

* Integrate AI assistant for FAQs, document checks, and institution requirements.  
* Provide escalation to live chat or phone for unresolved queries.  
* Build support ticket submission with relevant metadata.  
* Allow file attachment to support requests.

Acceptance Criteria:

* Executors can access AI or live support from closure dashboard.  
* Complex issues can be escalated via ticket or chat.  
* AI assistant provides at least 70% resolution for common tasks.  
* User satisfaction survey available post-interaction.

**22.9 Story: One-Click Closure via API Integration**  
Description: For supported institutions, allow Executors to close accounts directly via secure API integrations.  
Tasks:

* Establish partner agreements with financial and utility providers.  
* Build standardized closure API interface.  
* Create confirmation callback flow with institution.  
* Log all request/response data for compliance.


Acceptance Criteria:

* Executor can trigger closures directly for integrated institutions.  
* Status updates are reflected immediately upon institution response.  
* All activity is recorded for audit purposes.  
* Errors include resolution steps and fallback options.

**22.10 Story: Security, Compliance & Audit Logging**  
Description: Ensure full GDPR compliance, secure data handling, and audit logging of all closure-related activities.  
Tasks:

* Encrypt all personal and closure data at rest and in transit.  
* Maintain audit logs of document uploads, notifications, and closures.  
* Implement access control for sensitive data (Executors only).  
* Run regular data retention and deletion reviews.

Acceptance Criteria:

* All closure actions are securely logged with actor, timestamp, and result.  
* Personal data is never shared with unauthorized users or institutions.  
* All document storage meets GDPR standards.  
* Logs are exportable for legal inquiries or disputes.

# 

# **EPIC 23: Customer Billing System \[PHASE 1\]**  {#epic-23:-customer-billing-system-[phase-1]}

Description: Design and implement a secure, flexible, and scalable billing system that supports multi-tiered subscription plans, diverse payment methods, promotional discounts, account upgrades, and administrative oversight. The system must support different user roles and types (B2C, B2B2C, sponsored, reseller) and offer recurring billing, microtransactions, and conversion paths to PlanOwner accounts.  
**Story 23.1: Implement Multi-Tiered Subscription System**  
Description: Support Basic, Premium, and Family Plans with monthly or annual billing cycles, allowing recurring payments and upgrades between plans.  
Tasks:

* Set up subscription models (Basic, Premium, Family).  
* Configure recurring billing logic for monthly/annual options.  
* Build upgrade/downgrade and family invite flow.  
* Integrate backend plan enforcement logic.

Acceptance Criteria:

* Users can select and subscribe to Basic, Premium, or Family plans.  
* Billing occurs based on selected cycle (monthly/annually).  
* Family member invites apply correct discounted pricing.  
* Upgrades and downgrades reflect in the subscription immediately.

**Story 23.2: Integrate Multiple Payment Methods**  
Description: Enable users to pay using credit/debit cards, PayPal, and digital wallets (Apple Pay/Google Pay), with future support for cryptocurrency and invoices.  
Tasks:

* Integrate Stripe (or other processor) for card payments.  
* Add PayPal and digital wallet SDKs.  
* Add UI logic for payment method selection.  
* Support invoice-based payment for enterprise.

Acceptance Criteria:

* Users can successfully complete payments with any of the supported methods.  
* Payment method is reflected in user’s subscription record.  
* Invalid transactions are handled with proper error messages.

**Story 23.3: Promo Code & Discount Engine**  
Description: Allow automatic and manual application of promo codes during registration or checkout for discounts or free access.  
Tasks:

* Implement backend logic to validate promo codes.  
* Track code usage and expiration.  
* Apply code during onboarding or checkout flow.  
* Enable admin dashboard for code creation and management.

Acceptance Criteria:

* Promo code is applied correctly and adjusts billing total.  
* Expired or invalid codes trigger appropriate error message.  
* Promo usage appears in admin reporting.

**Story 23.4: Role Conversion & Account Upgrades**  
Description: Enable Executors, Contributors, and Beneficiaries to upgrade to full PlanOwner status through a billing conversion flow.  
Tasks:

* Add “Upgrade to PlanOwner” option with payment flow.  
* Carry over role-based data to new PlanOwner account.  
* Trigger post-upgrade onboarding.

Acceptance Criteria:

* Non-PlanOwner users can convert roles via payment.  
* After upgrade, user is granted PlanOwner dashboard and permissions.  
* Conversion event is logged in billing and user history.

**Story 23.5: Microtransaction & In-App Service Billing \[Phase 2\]**  
Description: Allow users to purchase one-time services (e.g., digital obituary, special document design) via in-platform payment.  
Tasks:

* Set up microtransaction billing endpoint.  
* Define SKU types and pricing.  
* Integrate payment triggers from UI (e.g., “Buy enhanced obituary”).  
* Track purchase history.

Acceptance Criteria:

* Users can complete purchase flows for individual services.  
* Purchased features are unlocked immediately.  
* Transactions appear in billing history and admin logs.

**Story 23.6: Free Trial / Money-Back Guarantee Logic (Stripe-based)**  
Description: Support either a free trial before first billing or a money-back window after purchase, configurable via admin panel.  
Tasks:

* Add backend flag for trial or guarantee logic.  
* Configure countdown timers and eligibility checks.  
* Handle refund requests (if applicable).  
* Track trial-to-paid conversions.

Acceptance Criteria:

* Trial users convert to paid after expiry unless cancelled.  
* Users within guarantee window can cancel and request refund.  
* Logic can be toggled per account type (trial vs guarantee).

**Story 23.7: Subscription Transition for Sponsored Accounts**  
Description: Allow seamless transition for corporate-sponsored or family-sponsored accounts to self-paid subscriptions.  
Tasks:

* Track source of sponsorship.  
* Trigger alert and UI flow before sponsorship expiration.  
* Allow direct payment setup to convert to individual account.


Acceptance Criteria:

* Sponsored users receive notice ahead of expiration.  
* Users can complete payment to retain access.  
* Transition is reflected in billing system and UI.

**Story 23.8: Admin Dashboard for Billing Oversight**  
Description: Create administrative tools to manage user subscriptions, promo codes, failed payments, and revenue reporting.  
Tasks:

* Build views for payment history, active plans, and failures.  
* Add promo code management interface.  
* Generate reporting for revenue by type/source.  
* Integrate alerts for expired/expiring plans.

Acceptance Criteria:

* Admins can view and export reports.  
* Promo codes are editable from the dashboard.  
* Alerts trigger for failed renewals or unusual billing activity.

**Story 23.9: Security, Compliance & GDPR for Billing**  
Description: Ensure all billing data is encrypted, stored securely, and compliant with GDPR, ISO, and PCI-DSS requirements.  
Tasks:

* Encrypt all sensitive billing information.  
* Mask payment data in admin views.  
* Implement audit logs for all billing-related changes.  
* Add cookie consent for tracking payment behaviour.

Acceptance Criteria:

* Billing data complies with PCI and GDPR requirements.  
* Only authorized roles can view financial records.  
* Changes to subscription or billing info are logged securely.

# **Epic 24: Compliance & Certifications \[PHASE 1\]** {#epic-24:-compliance-&-certifications-[phase-1]}

Description: Ensure the PlanAfter platform meets all necessary international legal, security, and data protection standards through the implementation of regulatory frameworks and audit readiness for key certifications. This EPIC is critical for securing trust from end-users, partners, and institutional stakeholders, and enables platform readiness for European and global markets.  
**24.1 Story: Implement Full GDPR Compliance**  
Description: Ensure that all personal data handling across the platform aligns with GDPR principles, including data minimization, consent management, access logs, and right-to-be-forgotten workflows.  
Tasks:

* Implement cookie consent banners with preferences and logging.  
* Build Data Subject Access Request (DSAR) flow for users to request, export, or delete personal data.  
* Store all personal data encrypted at rest and in transit.  
* Track consent per data processing purpose with timestamp.  
* Maintain audit logs for all access to personal user data.

Acceptance Criteria:

* Given a user requests their data, a downloadable export is generated within 30 days.  
* Given a user requests deletion, personal data is permanently removed with confirmation.  
* Cookie banners load on first visit and store preferences securely.  
* Admins can export a log of consent and data access by date/user/IP.

**24.2 Story: Integrate eIDAS 2.0 Support for QES (Qualified Electronic Signature) \[Phase 2\]**  
Description: Enable users to sign legally binding documents using eIDAS 2.0-compliant Qualified Electronic Signatures.  
Tasks:

* Integrate with a QES provider (e.g., DocuSign, Signicat, or IDnow).  
* Create document signing workflow with step-by-step verification.  
* Store signed documents in secure vault with tamper-proof audit trails.  
* Ensure time-stamping and digital identity verification are in place.

Acceptance Criteria:

* Users can apply QES to a document and download the signed version.  
* The platform confirms QES compliance using third-party verification.  
* Signature and signer identity are visible in document audit log.  
* Tamper attempts invalidate signature and trigger alert.

**24.3 Story: Align Architecture for ISO 27001 & 27701 Certification**  
Description: Design and document security and privacy controls aligned with ISO 27001 (information security) and ISO 27701 (privacy information management) standards.  
Tasks:

* Implement policies for access control, backup, encryption, and incident response.  
* Tag and classify personal data according to privacy impact.  
* Configure role-based access controls and audit trails.  
* Set up periodic vulnerability scanning and penetration testing.

Acceptance Criteria:

* Platform passes internal audit checklist aligned with ISO 27001/27701 controls.  
* Every classified data set has a designated owner and risk assessment.  
* Access logs are maintained and monitored per ISO requirements.  
* Policies and technical controls are exportable for external audit.

**24.4 Story: Align Architecture for SOC 2 Type II Certification**  
Description: Implement system monitoring, availability, security, and confidentiality policies to meet SOC 2 Type II controls, with full audit traceability over time.  
Tasks:

* Configure automated monitoring and alerting for platform uptime and intrusion.  
* Create detailed system and application-level logging infrastructure.  
* Define change management processes and documentation.  
* Set up scheduled data access reviews for sensitive systems.

Acceptance Criteria:

* Logs capture user actions, data changes, and system failures.  
* Monitoring tools alert stakeholders when availability or risk thresholds are breached.  
* Change requests are reviewed and documented before deployment.  
* All access reviews and incidents are logged and reportable in real-time.

**24.5 Story: Ensure EU AI Act Compliance for Explainability & Auditability**  
Description: Ensure that any AI features (e.g., smart suggestions, AI assistant) comply with EU AI Act by offering explainability, transparency, and clear logging for decisions made by AI.  
Tasks:

* Add explainability tooltips and metadata to AI-driven outputs.  
* Log every AI decision or suggestion with context and input parameters.  
* Provide users with a way to request explanation for any automated decisions.  
* Document data sources and training sets for each AI model used.

Acceptance Criteria:

* Users see “Why this was suggested” on all AI-generated outputs.  
* Given a user asks for an explanation, the system returns a human-readable breakdown.  
* All AI interactions are logged and exportable by admin for audit purposes.  
* High-risk AI systems trigger compliance warnings and require explicit user consent.

# **Epic 25: Mobile Applications \[Phase 2\]** {#epic-25:-mobile-applications-[phase-2]}

Description:   
Develop and deploy full-featured mobile applications for iOS and Android, expanding on the PlanAfter platform experience beyond the PlanAfter web-app. The mobile apps should deliver offline access, strong performance, push notifications, document capture using the phone camera, and an optimized mobile user experience. A seamless, reliable synchronization model with the core web platform is essential.

**Story 25.1: Develop iOS Mobile Application**  
Description: Build an iOS mobile application that delivers key PlanAfter functionality, including user registration, dashboard access, task management, document access, document capture via the device camera, and plan updates, while maintaining a consistent experience with the broader platform.  
Tasks:

* Set up the iOS mobile application project with a scalable architecture.  
* Integrate secure login and biometric authentication.  
* Implement dashboard, plan viewer, and task list interfaces.  
* Enable document capture using the phone camera, including upload, preview, and attachment to the appropriate plan section.  
* Integrate with backend APIs for near real-time data synchronization.  
* Conduct App Store compliance review and deployment preparation.

Acceptance Criteria:

* Given an iOS user logs in, their full plan and profile are accessible.  
* Given a user interacts with their plan or tasks, updates sync to the web app in near real time.  
* Given a user captures a document with their phone camera, the document is uploaded and attached to the correct record or section.  
* Given the app is submitted to the App Store, it passes review and is published.  
* App supports biometric login where the device permits.

**Story 25.2: Develop Android Mobile Application**  
Description: Create an Android mobile application that mirrors the core feature set of the iOS and web-app experiences, ensuring strong performance, usability, accessibility, and document capture capabilities across major Android devices.  
Tasks:

* Set up the Android mobile application project with a scalable architecture.  
* Integrate secure login and optional biometric authentication.

* Build reusable UI components for dashboard, plan sections, and task handling.  
* Enable document capture using the phone camera, including upload, preview, and attachment workflows.  
* Implement backend synchronization through secure APIs.  
* Prepare the Play Store submission package.


Acceptance Criteria:

* Given an Android user logs in, all plan data and documents load correctly.  
* Given the user performs edits, these changes are reflected in their web app account.  
* Given a user captures a document with their phone camera, it is saved and made available in their account.  
* App passes Google Play review and is available for download.  
* Push notifications function on supported Android versions.

**Story 25.3: Implement Push Notifications**  
Description: Enable critical alerts, reminders, and shared plan updates to be delivered to users in real time through mobile push notifications across both platforms.  
Tasks:

* Set up push notification services for iOS and Android.

* Implement notification handling for foreground and background states.  
* Define event triggers (e.g., task deadline, new contact role, annual review, document upload follow-up).  
* Add notification preference settings to the mobile UI.  
* Ensure localization support.

Acceptance Criteria:

* Users receive push notifications for task deadlines, invites, reminders, and relevant document-related prompts.  
* Notifications open the correct deep link in the app (e.g., Task Detail page).  
* Users can enable or disable notification types in-app.  
* Notifications are delivered consistently across both iOS and Android.

**Story 25.4: Ensure Seamless Data Synchronization**  
Description: Maintain consistent user data across the web platform and mobile applications, ensuring updates are reflected in near real time or handled through appropriate conflict-resolution logic, including documents captured and uploaded from mobile devices.  
Tasks:

* Implement shared backend logic for synchronizing user data and uploaded documents.  
* Design sync behavior for offline access and queued updates.  
* Use real-time update mechanisms or polling for timely data reflection.  
* Handle sync conflicts with defined resolution policies.

Acceptance Criteria:

* Given a user updates their plan or profile in the mobile app, the changes appear on the web platform within seconds.  
* Given a user edits data offline, changes sync when they reconnect.  
* Given a user captures or uploads a document from mobile, it syncs to the web platform and is accessible in the correct section.  
* Given simultaneous edits across devices, the latest save wins or the user is prompted.  
* Sync logs are auditable and errors are properly handled across mobile apps.


# **Epic 26: Platform-Wide Encryption, Data Security & Backup \[PHASE 1\]** {#epic-26:-platform-wide-encryption,-data-security-&-backup-[phase-1]}

Description: Ensure end-to-end protection of all user data and documents across the entire PlanAfter platform using robust encryption standards (AES-256 at rest, TLS in transit), secure access control, and a reliable backup & recovery system. This implementation safeguards sensitive data such as personal information, health, legal, financial, and legacy content stored anywhere in the platform—not just in the Vault—ensuring full compliance with ISO, GDPR, and other global standards.

**26.1 Story: AES-256 Encryption for Data at Rest (Platform-Wide)**  
Description: Encrypt all user data stored in the platform—including Vault files, profile details, legal records, health documents, tasks, and messages—using AES-256 encryption to protect against unauthorized access and data breaches.  
Tasks:

* Implement AES-256 encryption for all data storage layers (documents, structured data, metadata).  
* Design and configure a secure Key Management System (KMS) with rotation policies.  
* Encrypt sensitive fields at database level (e.g. names, IDs, contact info, notes, directives).  
* Build decryption services for secure data access during authorized sessions.  
* Conduct encryption performance benchmarking across high-volume operations.

Acceptance Criteria:

* Given any user data is stored, it is automatically encrypted using AES-256.  
* Given an authorized session, encrypted data is decrypted and displayed correctly.  
* Given data is accessed without authorization, access is denied at storage level.  
* Given periodic audits occur, platform meets ISO/industry encryption compliance.  
* Given performance tests are run, data encryption does not degrade platform UX.

**26.2 Story: TLS 1.2+ for Data in Transit**  
Description: Protect all communications between the user’s device and the PlanAfter backend by enforcing encrypted transmission via TLS 1.2 or higher.  
Tasks:

* Enforce HTTPS with TLS 1.2+ across all APIs, frontend interfaces, and mobile clients.  
* Configure HSTS (HTTP Strict Transport Security) headers on web apps.  
* Conduct SSL pinning on native mobile clients (future).  
* Regularly audit endpoints using security tools (e.g. SSL Labs).  
* Disable non-secure HTTP fallback across environments.

Acceptance Criteria:

* Given data is transmitted between frontend and backend, TLS is always enforced.  
* Given a penetration test is run, no unencrypted traffic is accepted.  
* Given browser loads the site, only HTTPS is allowed (HSTS active).  
* Given security headers are checked, TLS configuration meets industry standards.  
* Given a mobile app connects, it validates server certs securely.

**26.3 Story: Platform-Wide Secure Access Controls**  
Description: Ensure that only authorized users with valid roles and permissions can access sensitive data and documents, with enforced identity authentication and role-based access controls (RBAC).  
Tasks:

* Implement RBAC for all sections of the platform (assets, health, messages, legacy).  
* Add 2FA or re-authentication for accessing high-sensitivity sections (e.g. legal docs, Will).  
* Enable token-based, session-controlled access for frontend and API calls.  
* Log all access events and permission changes to a secure audit trail.  
* Regularly test access levels for roles like Contributor, Executor, and Beneficiary.

Acceptance Criteria:

* Given a user attempts access, permissions are verified before data is displayed.  
* Given a role does not allow access, system blocks the request with a clear message.  
* Given a security event occurs (e.g., 2FA fail), logs are recorded and alerts triggered.  
* Given a trusted contact is revoked, their access is fully terminated.  
* Given security audit runs, access policies align with defined rules.

**26.4 Story: Platform-Wide Data Backup System**  
Description: Implement scheduled and manual data backup capabilities for all platform data (documents, messages, tasks, account metadata) to ensure resilience and prevent data loss.  
Tasks:

* Set up encrypted backups across all data types, including file storage and databases.  
* Enable manual backups by admin and scheduled nightly backups for core data.  
* Provide admin interface to view backup logs with timestamps and status.  
* Encrypt all backup files and store in offsite secure cloud location.  
* Simulate failure scenarios to test backup restoration.

Acceptance Criteria:

* Given backups run (manual or scheduled), data is securely saved offsite.  
* Given an admin views logs, all backups are timestamped and verifiable.  
* Given a test failure is simulated, backed-up data is recoverable without loss.  
* Given user data types (tasks, messages, uploads), all are included in backup cycle.  
* Given encryption audit runs, backup data is confirmed to meet AES-256 standards.

**26.5 Story: Data Recovery for Platform-Wide Restoration**  
Description: Allow authorized users (e.g. Admins, DevOps) to restore lost or corrupted data across the platform, with granular options for full or partial recovery and activity logging.  
Tasks:

* Develop recovery API with granular recovery options (user-level, file-level, full).  
* Build a secure admin interface to trigger restores.  
* Log all restore attempts and outcomes in a secure audit log.  
* Validate data integrity checks after each restore.  
* Notify relevant user(s) after successful recovery.

Acceptance Criteria:

* Given data is lost or corrupted, platform supports secure recovery via admin.  
* Given a restore is triggered, logs are updated and confirmation is displayed.  
* Given restored data is reviewed, it maintains original encryption and permissions.  
* Given unauthorized users attempt restore, they are denied.  
* Given ISO inspection, recovery procedures meet disaster recovery requirements.

# **Epic 27: AI Assistant \[PHASE 1\]** {#epic-27:-ai-assistant-[phase-1]}

Description:  Implement a context-aware, on-premise AI Assistant integrated throughout the PlanAfter platform to guide users at all times. For security, privacy, and data governance reasons, the assistant must be deployed and operated entirely within PlanAfter’s controlled infrastructure. The assistant will offer personalized task recommendations, explain features, help with navigation, provide real-time answers to user questions, and also act as an organizational assistant by helping users classify, route, and store information and uploaded documents in the most appropriate location within the platform when requested. This will deliver a frictionless, secure, and supportive experience.

**27.1 Story: Contextual On-Premise AI Support Across Dashboard & Pillars**  
Description: Deploy the on-premise AI Assistant across the dashboard and major platform sections to provide contextual advice, task guidance, feature explanations, and organizational support based on user activity and role. The assistant should also help users determine where information or uploaded documents belong within the platform and, when requested, place them in the relevant section.

Tasks:

* Embed the AI Assistant across key platform areas (dashboard, assets, health, goals, etc.).  
* Develop logic for personalized prompts based on user role and current plan status.  
* Enable the Assistant to highlight UI elements or open the relevant section upon suggestion.  
* Build interactive Info Boxes powered by AI within each pillar for micro-guidance.  
* Enable the Assistant to analyze uploaded documents and recommend the most appropriate platform section, category, or record for storage.  
* Enable the Assistant, upon user request, to route and store uploaded documents in the relevant platform location.  
* Ensure the AI Assistant is deployed on-premise only, with no reliance on external hosted AI services, to meet security and compliance requirements.  
* Log queries and AI-supported organizational actions for quality monitoring and iteration.

Acceptance Criteria:

* Given a user is on any dashboard or section, AI offers contextual guidance (e.g., “Add a health directive”).  
* Given a feature is unfamiliar, users can ask for explanation and receive a relevant response.  
* Given a question is asked about permissions or legal structure, AI explains role access accurately.  
* Given a completed task, AI suggests the next relevant task dynamically.  
* Given progress, AI updates the user with encouragement and progress summaries.  
* Given a user uploads a document, AI can recommend the most appropriate location in the platform to store it.  
* Given a user requests help organizing an uploaded document, AI places it in the appropriate section or record within the platform.

**27.2 Story: Intelligent Questionnaires & Proactive Recommendations**  
Description:  Enhance user input flows with an on-premise AI-powered adaptive questionnaire experience that learns user preferences and generates personalized tasks and suggestions based on input. For security, privacy, and compliance reasons, all AI processing, inference, and data handling must occur within PlanAfter’s controlled on-premise infrastructure. The assistant should also use questionnaire responses to help organize information into the correct areas of the platform where relevant.  
Tasks:

* Build AI-assisted logic for adaptive forms (e.g., skipping irrelevant questions).  
* Develop backend task-generation engine based on questionnaire responses.  
* Train/configure the AI to link responses to relevant platform sections and resources.  
* Create a feedback mechanism to improve recommendation accuracy over time.  
* Integrate proactive suggestion UI (banner/toast cards).  
* Enable AI to suggest the most appropriate destination section for newly captured information based on questionnaire responses.

Acceptance Criteria:

* Given a user completes a questionnaire, AI generates a relevant task list tailored to them.  
* Given user input shows family complexity, AI suggests inviting collaborators or setting guardianship.  
* Given missing plan elements, AI prompts user to complete those next.  
* Given task fatigue is detected, AI offers encouragement or simplifies the task list.  
* Given a new life event (e.g., marriage, baby), AI suggests related updates (e.g., add spouse, guardianship).  
* Given questionnaire responses indicate that information belongs in a specific platform area, AI recommends the relevant section accordingly.


# **Epic 28: Archiving Functionality \[PHASE 1\]** {#epic-28:-archiving-functionality-[phase-1]}

Description: Implement an archiving feature that allows users to archive records from key platform sections—Assets & Liabilities, My Family, and My Network—when items are no longer active (e.g., a sold asset, deceased relative, or retired advisor). Archiving ensures historical data is preserved securely without cluttering the active plan, supporting both future reference and audit needs.  
**28.1 Story: Archive Items in Assets & Liabilities**  
Description: Allow users to archive specific financial items (e.g., car, property, account) that are no longer owned but may need to be referenced later.  
Tasks:

* Add archive option (button or menu) for assets and liabilities.  
* Implement UI segregation: Archived vs. Active items.  
* Input field (free text) for reason why item is archived.  
* Store timestamp, archive reason, and user who archived.  
* Ensure archived items are excluded from plan summaries and calculations.  
* Allow reactivation or permanent deletion (admin-controlled).

Acceptance Criteria:

* Given a user archives an asset, it no longer appears in the active list or summary totals.  
* Given a user views Archived Items tab, all archived assets appear with archive date.  
* Given an archived item is selected, full details remain accessible in read-only mode.  
* Given the user reactivates the item, it returns to the active list and calculations.  
* Given no delete action is taken, archived data remains stored and encrypted.

**28.2 Story: Archive Individuals in My Family**  
Description: Enable users to archive family members no longer actively involved in the plan (e.g., deceased relatives), preserving their profile and contributions without cluttering the relevant sections.

Tasks:

* Add “Archive” toggle in family member profile.  
* Input field (free text) for reason why person is archived.  
* Display visual distinction (e.g., badge, greyscale avatar).  
* Retain legacy data (e.g., ethical will, shared messages).  
* Prevent notifications or task assignment to archived members.  
* Link to Family Tree for those marked ‘Deceased’.

Acceptance Criteria:

* Given a family member is marked as archived, they no longer appear in the active contact list.  
* Given the archive reason is “Deceased”, their entry displays this visibly (e.g., black ribbon icon) in Family Tree.  
* Given the user opens the archived profile, all data remains viewable in read-only mode.  
* Given this member was associated with any legacy content, it remains intact and accessible.  
* Given the user toggles “Show Archived”, the member is listed.

**28.3 Story: Archive Contacts in My Network**  
Description: Allow users to archive collaborators or professionals (e.g., advisors, lawyers) they no longer work with, without deleting their history or access logs.

Tasks:

* Add archive option to Network contact cards.  
* Input field (free text) for reason why person is archived.  
* Segregate archived contacts into a separate tab or section.  
* Retain message history and document contributions.  
* Disable access if previously granted and log revocation.  
* Maintain audit trail of access and interactions.

Acceptance Criteria:

* Given a user archives a network contact, they are moved to the Archived tab.  
* Given a contact had prior access, it is revoked upon archiving, and this is logged.  
* Given the user views past tasks or messages, they remain attached to the archived contact.  
* Given audit history is queried, all interactions with the contact remain visible.  
* Given a reactivation request, user can restore the contact to the active list.

# 

# **Epic 29: Corporate Client Dashboards \[Phase 2\]** {#epic-29:-corporate-client-dashboards-[phase-2]}

Description: Develop dedicated dashboards for corporate clients (e.g., HR departments, benefits administrators) who sponsor PlanAfter subscriptions for their employees. These dashboards enable secure, high-level visibility into usage, engagement, and subscription metrics—without accessing any personal or sensitive content of the users.  
The goal is to support employer-sponsored wellness, compliance, and legacy preparedness programs while maintaining user privacy and platform integrity.

**29.1 Story: Dashboard Setup & Access Control**  
Description: Enable the creation of corporate administrator accounts that allow designated staff to access a high-level dashboard without accessing individual user data.  
Tasks:

* Implement secure registration and login flow for corporate admin users.  
* Define role-based access for corporate admins (view-only, export, manager).  
* Ensure dashboard is restricted to only their organization’s users.  
* Link employee accounts to corporate sponsor via promo code or domain logic.  
* Mask all personal user information (names, content, plan details).

Acceptance Criteria:

* Given a corporate admin logs in, they only see users linked to their organization.  
* Given user data is viewed, no sensitive personal content is exposed.  
* Given new employees join via promo code, they are auto-linked to the corporate dashboard.  
* Given access roles differ, permission logic is respected.  
* Given audit logs are needed, actions from each corporate admin are recorded.

**29.2 Story: Employee Engagement & Activation Metrics**  
Description: Provide anonymized analytics on employee platform engagement, broken down by activation, completion, and interaction with key features.  
Tasks:

* Display number of employees invited, registered, and actively using the platform.  
* Show percentage of users completing onboarding and core pillars.  
* Visualize engagement trends (daily, weekly, monthly logins).  
* Track % of employees completing questionnaires and assessments.  
* Build charts for quick engagement overview.

Acceptance Criteria:

* Given the dashboard loads, corporate clients see % of employees activated.  
* Given questionnaire completion metrics are queried, accurate anonymized data is shown.  
* Given filters are applied (by team, location, etc.), the view updates accordingly.  
* Given low engagement users are listed, personal data remains hidden.  
* Given charts are downloaded, they reflect current date ranges and filters.

**29.3 Story: Subscription & Billing Overview**  
Description: Provide corporate clients with full visibility into their purchased seats, usage status, and renewal timelines.  
Tasks:

* Show total seats purchased vs. claimed vs. remaining.  
* Display billing history and next renewal date.  
* Integrate secure download of invoices (PDF).  
* Enable self-service seat management (reassign, remove, invite).  
* Display applied promo codes and discounts.

Acceptance Criteria:

* Given a corporate client views their dashboard, they can see all seat usage stats.  
* Given a billing history is requested, all invoices are downloadable securely.  
* Given a seat is unclaimed, client can send an invite or reassign.  
* Given a promo code was used, discount appears correctly.  
* Given renewal date is upcoming, it appears with a reminder option.

**29.4 Story: Reporting & Exporting Tools**  
Description: Allow corporate clients to export relevant metrics and reports for internal tracking or presentations.  
Tasks:

* Build export options for CSV, Excel, PDF.  
* Enable custom date range selection for reports.  
* Mask all user names and personal content.  
* Include engagement summaries and subscription breakdowns.  
* Log report download activity.

Acceptance Criteria:

* Given a report is exported, no personal data is included.  
* Given a time range is selected, data is scoped appropriately.  
* Given a download occurs, it is logged securely.  
* Given an export is opened, engagement metrics are clearly visualized.  
* Given filters were applied pre-export, the report reflects them accurately.

# 

# **Epic 30: Affiliate & White-Label Partner Dashboards \[Phase 2\]** {#epic-30:-affiliate-&-white-label-partner-dashboards-[phase-2]}

Description: Develop a dedicated dashboard for partners who promote, resell, or distribute the PlanAfter platform—either under the PlanAfter brand (affiliate) or their own brand (white-label). The dashboard provides visibility into signups, engagement metrics, promo code performance, and commissions earned, while protecting user privacy. This functionality supports performance tracking, onboarding efficiency, and partner accountability in PlanAfter’s extended ecosystem.  
**30.1 Story: Partner Account Setup & Dashboard Access**  
Description: Enable affiliate and white-label partners to register securely, receive unique tracking links or promo codes, and access their own performance dashboard.  
Tasks:

* Build partner onboarding flow with optional brand and company info.  
* Generate unique referral codes or tracking links.  
* Configure dashboard access with partner-only permissions.  
* Ensure user activity is attributed correctly to each partner.  
* Mask all user personal data and limit access scope.


Acceptance Criteria:

* Given a partner registers, a secure partner dashboard is created.  
* Given new users sign up using a partner link/code, they are tracked accurately.  
* Given a partner logs in, only aggregated performance data is shown.  
* Given partner branding is active (white-label), dashboard UI reflects their brand.  
* Given audit logs are reviewed, all partner access is traceable.

**30.2 Story: Referral & Conversion Tracking**  
Description: Provide detailed reports of partner-attributed user signups, conversion rates, and behavior after registration.  
Tasks:

* Track referred user sign-ups, activations, and subscription conversions.  
* Break down data by plan type, date range, and referral source.  
* Visualize conversion funnel (click → signup → activation → subscription).  
* Display high-level activity metrics per referral cohort.  
* Support click attribution from multiple channels (social, website, email).

Acceptance Criteria:

* Given a user signs up via referral, attribution is logged and displayed to the partner.  
* Given conversion data is filtered by plan or time, the funnel view updates accordingly.  
* Given no personal data is needed, user identities remain anonymized.  
* Given a partner link is used multiple times, all unique and duplicate visits are tracked.  
* Given reporting is exported, aggregated totals are included per code.

**30.3 Story: Promo Code Management**  
Description: Allow partners to manage custom promo codes used to incentivize subscriptions or trial activations.  
Tasks:

* Enable partner creation of promo codes (within admin-defined rules).  
* Display activation rate per promo code.  
* Limit promo code expiration, usage cap, and region (optional).  
* Integrate promo codes into analytics views.  
* Provide API endpoint or manual generator for advanced partners.

Acceptance Criteria:

* Given a promo code is created, it can be tested immediately.  
* Given a promo code expires or hits limit, new signups are restricted.  
* Given usage data is shown, partners can optimize campaigns.  
* Given promo codes are shared, referrals are tracked.  
* Given the promo is disabled by admin, no further signups occur through it.

**30.4 Story: Commission & Revenue Tracking**  
Description: Display financial performance and earnings for commission-based or white-label partners.  
Tasks:

* Show total revenue generated by partner-attributed users.  
* Calculate commissions based on tier or negotiated rates.  
* Display payout cycles, history, and next expected earnings.  
* Integrate payout methods (e.g., PayPal, bank transfer).  
* Mask any individual financial user data.

Acceptance Criteria:

* Given a partner logs in, they can view real-time commission metrics.  
* Given payout data is requested, it is downloadable and accurate.  
* Given earnings change due to refunds, adjustments are reflected.  
* Given payment thresholds are reached, payout is triggered.  
* Given export is run, all historical revenue is included with timestamps.

**30.5 Story: White-Label Branding & Experience (Optional)**  
Description: Allow white-label partners to offer PlanAfter under their brand name, with customized dashboards, domain, and client experience.  
Tasks:

* Enable custom logo, color scheme, and domain (e.g., [mylegacy.partner.com](http://mylegacy.partner.com/)).  
* Route white-label users to customized onboarding flow.  
* Mirror core platform features under the partner’s branding.  
* Restrict features unavailable to white-label versions (as defined in agreement).  
* Maintain all analytics and metrics under partner’s view.

Acceptance Criteria:

* Given white-label branding is configured, dashboard reflects partner identity.  
* Given a white-label user signs up, they remain within branded environment.  
* Given analytics run, white-label metrics are isolated from main platform.  
* Given the user switches device, brand experience persists across views.  
* Given a white-label user upgrades, partner attribution remains intact.

# Business Context

**Business Context**

This section provides foundational context about PlanAfter — what it is, why it exists, who it serves, and how it generates revenue. It is intended to orient all team members — engineering, product, QA, and design — so that every Epic and Story in this backlog is understood within the correct strategic and operational frame.

# **What is PlanAfter?**

PlanAfter is a cutting-edge, highly secure, multilingual digital platform — combining advanced AI, bank-grade encryption, and cross-jurisdictional compliance to solve one of the most human and complex challenges of modern life: **securing and transferring legacy, and transforming life's most difficult transitions into journeys of clarity, care, dignity, and love**.

PlanAfter is not a document vault, a checklist tool, or an isolated legal service. It is a complete, guided, encrypted planning environment that helps individuals prepare, protect, and transfer their life's most important wishes, information, documents, and messages — in ways that are legally sound, emotionally intelligent, and operationally actionable.

The platform delivers 360-degree support across three distinct service areas:

* **Life Organisation & Optimisation —** helping individuals structure and protect all essential life information: legal, financial, medical, emotional, and aspirational  documents and plans in one always-accessible, encrypted place.


* **End-of-Life Planning & Legacy Creation, Protection and Transfer —** enabling users to define and transfer their financial, legal, and emotional legacy with precision and care: beneficiary instructions, digital wills, letters to loved ones, and role-based access for executors and family members.


* **Post-Loss Support —** an AI-supported, structured environment for the people left behind: guided administrative checklists, grief resources, institutional notification tools, memorial pages (creation and publishing, and management of individual memorial pages www.(name of the person)RememberedAfter.com  (similar to  [https://www.forevermissed.com](https://www.forevermissed.com)) , and access to the PlanOwner's wishes and documents — all delivered with care and without friction.

PlanAfter delivered as a web-based Progressive Web App (PWA), with native mobile applications planned. The platform is multilingual, jurisdiction-aware, and built on a unified secure architecture. 

# **Mission & Vision**

**Mission**

To empower individuals and families to securely plan, protect, and pass on their legal, financial, digital, and emotional legacy — and to navigate the complexities of life's most difficult transitions with a greater sense of control, support, purpose, and peace of mind.

**Vision**

To become the global standard for proactive end-of-life planning, legacy management, and professional post-loss support — trusted by families, adopted by institutions, and recommended across generations. To empower people to live with clarity, plan with confidence, and leave behind a lasting legacy of love, care, and positive impact.

**What Makes PlanAfter Different**

PlanAfter occupies a unique position in the market because it combines capabilities that no single existing platform offers together. Each differentiator below represents a deliberate design decision — not a feature enhancement, but a foundational capability that defines what kind of platform PlanAfter is.

**Holistic, 360° Life & Legacy Planning**

Most competitors focus on a single dimension: a will-writing tool, a document vault, or a grief platform. PlanAfter covers the full spectrum — legal, financial, emotional, medical, digital, and aspirational — across all life stages. Users do not need multiple platforms. Everything lives in one encrypted, AI-guided environment.

**AI-Powered Personalisation**

No two lives are the same. PlanAfter's Smart Planning Engine adapts to each user's jurisdiction, life stage, family structure, cultural values, language, and planning pace. The AI identifies gaps, suggests priorities, generates tasks, and offers contextual guidance — making the planning process feel guided rather than overwhelming.

**Bank-Grade Security**

All data is protected with encryption at rest and in transit. Premium users can activate the Zero-Knowledge Vault — a client-side encryption layer under which PlanAfter staff, administrators, and AI systems cannot access the content, even with a court order. Decryption is only possible by the PlanOwner or a designated recipient.

**Automated Death Verification via eID**

Unlike platforms that rely on passive signals (such as failed logins) or subjective trust-circle declarations to detect a user's death, PlanAfter integrates with national death registries and eID infrastructure. Users who have verified their identity via eID can have their death confirmed automatically via API — triggering plan activation in real time, without delays, manual submissions, or fraud risk. This transforms post-mortem access from a manual burden into an automated, trusted, and auditable process.

**Role-Based, Conditional Access Architecture**

The PlanOwner stays in complete control. Executors, Contributors, and Beneficiaries each receive precisely scoped access — defined by what they can see, what they can do, and when. Access can be conditional on death, a specific date, or a confirmed life event. Nothing is shared prematurely, nothing is delivered without the PlanOwner's explicit pre-configuration.

**Delivery Without Disclosure**

A uniquely powerful privacy feature: an Executor can deliver content to a Beneficiary — triggering access to a video message, a letter, a document — without being able to open or view that content themselves. The Executor confirms an event; the system delivers. This preserves the PlanOwner's privacy and emotional intentions even after death.

**Continuous, Adaptive Planning**

PlanAfter is not a one-time action. Life changes — and the platform evolves alongside its users. Smart reminders, life event triggers, and the Annual PlanAfter Review ensure that the plan stays current without adding complexity. Each year's review is recorded as a permanent milestone in the plan's history.

**Family Account as Shared Infrastructure**

PlanAfter's Family Account model allows multiple PlanOwners in the same household to share Person Records and a synchronised Family Tree — eliminating duplication, ensuring no family member's information diverges, and ensuring that the surviving partner always has a complete, up-to-date picture of the family's affairs.

# **Platform Structure**

The platform is built around four conceptual layers: **identity and relationships** — every person who matters, their documents and life story, always one click away; **planning** — what you own, owe, want to say, and what happens after you're gone; **support** — for anyone navigating loss, whether their own or in preparation for others; and **collaboration and access** — how other people participate in your plan, and how you participate in theirs.

**1.Me, Family & Network**

The identity and relationships hub of the platform. This is where the PlanOwner builds and maintains structured records for themselves and every person who matters to their life and plan. It is the foundation on which everything else is built — assets reference owners, legal documents reference parties, tasks reference assignees, and roles reference people, all from records created here. Contains three sub-sections: My Profile, My Family, and My Network.

**Person Record vs. Platform Account**

A critical distinction underpins the entire platform: a Person Record is not the same as a platform account. A Person Record is a structured data container — a folder of information about a person: their details, documents, photos, relationship to the PlanOwner, medical notes, and life story. The PlanOwner can create Person Records for anyone — a child, a pet, an elderly parent, a deceased grandparent, a professional contact — without that person ever using PlanAfter or even being aware the platform exists. The record belongs to the PlanOwner and serves as an organised reference for their own planning.

A platform account is also created when the PlanOwner explicitly invites a person into the platform — assigning them a role (Executor, Contributor, or Beneficiary) and sending an invitation. This separation is intentional and important: it means a PlanOwner can fully document their family's structure, history, and key information without involving those family members in the process at all.

**1.1.My Profile**

The PlanOwner's own Person Record — the single authoritative source of identity for the entire plan. My Profile contains seven structured cards that hold information about the PlanOwner in the Overview tab: Essential Info, Contact Info, Family & Relationships, Medical Info, Education, Employment & Affiliations, and Beliefs, Hobbies & Interests. Each card can contain Document Entries — structured records that reference physical documents, digital files, or both. There are also three other cards in the Overview tab (Tasks & Reminders, Shared With, Roles & Access in your Plan) that help organise and manage the plan structurally. Additional tabs provide access to Document Entries (aggregated from all cards), an Album, and a Life Story. A Memorial tab activates if the PlanOwner's plan enters Legacy Mode. Every other section of the platform references or is enriched by the PlanOwner's profile — it personalises AI recommendations, adjusts the Plan Completeness Score target, and pre-populates legal document templates.

**1.2.My Family**

Person Records for family members — parents, siblings, children, spouses, and extended family,  pets. Each family member Record has the same tab structure as My Profile: Overview (with structured cards), Document Entries, Album, Life Story, and Memorial (activated when the family member is marked as deceased). A family member Record can exist without the person having any platform account — the PlanOwner creates and maintains it independently, documenting the person's details, uploading their documents, adding family photos, and writing their life story entirely on their own. If the PlanOwner later invites this family member to the platform in a role, their existing Record is linked to the newly created account.

My Family also contains the Family Tree & Story — a visual, interactive representation of the family structure where each node is a Person Record. The Family Tree is not a separate section: it is a view of the same records, displayed as a connected graph. Every node in the tree is clickable and opens the full Person Record. Deceased family members remain in the tree in a Memorial state. The Family Tree builds over time as the PlanOwner adds more records — it becomes a living, documented archive of the family's history.	

**1.3.My Network**

Person Records for non-family contacts relevant to the plan — solicitors, accountants, financial advisors, doctors, care providers, business partners, trusted friends, and etc. Network Records follow the same structure as family Records but are scoped to professional and contact information: Essential Info and Contact Info cards, with Document Entries. Network contacts can be linked to specific assets, liabilities, or legal documents — and can be assigned roles in the plan. When the PlanOwner dies, the Executor does not need to search for who to call: every key contact is documented with their role and relationship to the plan clearly stated.

**2\. My Plan — Five Planning Pillars**

My Plan is the core planning hub — the structured, guided environment where the PlanOwner builds their complete life and legacy plan. It contains five colour-coded pillars, each covering a distinct and essential dimension of planning:

**2.1. Assets & Liabilities**

Most people have no single place where everything they own and owe is clearly documented. Bank accounts, property, vehicles, crypto wallets, business interests, mortgages, loans, and subscriptions are scattered across statements, emails, and memory. When someone dies or becomes incapacitated, their family can spend months trying to piece together the financial picture. Assets & Liabilities solves this — every asset and liability is stored as a structured Record with its own document storage, credential management, valuation, and Executor-facing notes. 

The section calculates and displays the PlanOwner's Net Worth (Total Assets minus Total Liabilities), broken down by category with visual charts. 

Archived records (sold property, closed accounts) are preserved in read-only form, excluded from active calculations but always accessible. 

In Phase 2, the platform will integrate with open banking, stock market data feeds, vehicle valuation APIs, and crypto platforms for **automated live valuation**. 

**2.2. Emotional Legacy**

Planning for death is not only about finances and legal documents — it is about what you want to say to the people you love, what you want them to know about you, and how you want to be remembered. 

Emotional Legacy gives the PlanOwner **tools to reflect, record, and share:** guided life reflection prompts, personal values and beliefs, an ethical will, and letters to specific individuals delivered only after death (or another configured trigger).

The Annual PlanAfter Review feeds directly into this section — each year's review becomes a permanent record of where the PlanOwner was in life at that point. All Emotional Legacy content is encrypted by default — **inaccessible to PlanAfter staff,** AI systems, or anyone without the PlanOwner's explicit authorisation. 

**2.3. Body & Health**

In a medical emergency, a hospital needs to know about allergies, current medications, blood type, and existing conditions — immediately, without waiting for a relative to recall or search through folders. 

Body & Health captures all of this in a structured, ICE-ready format exportable as a PDF/ mobile  card. Beyond emergencies, the section also covers getting-older planning (care preferences, health-related power of attorney) and end-of-life wishes (organ donation, funeral preferences, what the PlanOwner wants to happen after death). 

Each sub-section uses a guided questionnaire — the PlanOwner reflects, decides, and records their wishes, with cross-links to relevant legal documents in Will & Legal Actions where a formal directive is recommended. 

**2.4. Goals & Aspirations**

PlanAfter is not only a plan for death — it is a plan for life. Goals & Aspirations gives the platform a forward-looking, life-affirming dimension. The PlanOwner can record annual goals (short-term, tracked with progress indicators and deadlines), long-term aspirations, and bucket list items — things they want to do, experience, achieve, or become. 

This section serves two purposes: it helps the PlanOwner stay focused and intentional about what they are working towards, and it leaves behind a meaningful record for loved ones of what the person cared about and dreamed of — not just what they owned or owed. 

**2.5. Will & Legal Actions**

Most people do not have a will. Those who do often have documents that are out of date, stored somewhere no one knows about, or legally invalid in their current jurisdiction. 

Will & Legal Actions centralises all legal directives (Will, Trust, Power of Attorney, Guardianship Declaration, Advanced Directive) in one encrypted, versioned, Executor-accessible location. 

For each document type, the platform provides a downloadable template, clear guidance on how to complete and legalise it in the PlanOwner's jurisdiction, and a structured place to upload the completed, signed document. 

The PlanOwner can also record where physical originals are stored. Post-activation, Executors receive immediate access to all relevant legal documents — no searching, no delays. 

# **3\. Post-Loss Support**

PlanAfter does not end with the PlanOwner. When someone dies, the people left behind face two simultaneous burdens: grief, and an overwhelming amount of administrative, legal, and logistical work. Post-Loss Support is the platform's dedicated response to both.

The section serves three distinct users in three distinct moments. For the PlanOwner who has lost someone, it is an immediately available support system — accessible from the dashboard at any time, without requiring the deceased to have been a PlanAfter user. For the Executor, after plan activation, it is a structured, guided environment to carry out the administrative and practical work that follows death. For Beneficiaries, after plan activation, it provides emotional support, access to the PlanOwner's pre-prepared messages, and a clear view of what they need to do and receive.

**3.1. Personalised Plan ( loss of Child, Pet, Parent , Friend…)**

A structured post-loss action plan tailored to the specific situation of the person navigating the loss — their relationship to the deceased, the assets and accounts involved, and the legal jurisdiction. The plan generates a prioritised, step-by-step task list covering the most urgent administrative requirements, so the Executor or surviving family member knows exactly what to do and in what order, without needing to research or improvise.

**3.2. Practical Support**

A guided, chronological toolkit for the administrative work that follows death — what needs to happen, in what order, what documents are required and where to obtain them. At MVP, the platform provides AI-assisted template letters, jurisdiction-specific checklists, and pre-populated contact information for major organisations. In Phase 2, this evolves into a managed service where the PlanAfter platform handles notifications and closures on the PlanOwner's behalf (with the assistance of the Executor) via direct API integrations.

**3.3. Emotional Support**

Curated grief resources — articles, guided reflections, breathing exercises, audio content, and signposting to professional grief counselling — available immediately and without friction. The PlanOwner can also pre-select and configure emotional resources for their own loved ones in advance, ensuring that the people they leave behind have access to support that feels personal and considered rather than generic.

**3.4. Obituary**

A tool for creating a structured, meaningful written death announcement — informing family, communities of the passing, with details of funeral arrangements, and how to pay respects.

The PlanOwner can pre-draft the framework for their own obituary — the tone, the key facts, the stories they want included — so that after death the Executor has everything needed to publish promptly, without having to construct it under grief.

**3.5. Memorial Page**

A lasting digital memorial — a dedicated online space where family and friends can visit, share memories, leave condolences, and contribute to a charitable cause in the deceased's name. The PlanOwner can pre-design the structure and content of their own memorial page, uploading photos, drafting biographical text, selecting preferred charities, and specifying who can access and contribute. After death, the Executor publishes the page and family members can interact with it over time.

**3.6. Resources**

A curated library of articles, guides, recorded webinars, and external references covering every aspect of loss — legal, financial, administrative, and emotional. Content is jurisdiction-aware and updated regularly. Available to PlanAfter users navigating loss.

# **4\. Vault**

The Vault is a dedicated section of the platform that aggregates every Entry (Document and/or Credential)  from across the entire plan into one searchable, organised inventory. It does not hold raw files in isolation — it surfaces structured entries that exist within cards throughout every Record and section of the platform.

A Document Entry is not simply a file upload. Each Document Entry is a structured record that can include: a title, a document type, a physical location (where the original is stored), a digital file attachment (photo, scan, or PDF), an expiry date, and a link to a relevant contact — for example, the solicitor who holds the original will, or the bank that issued the account statement. The document may be entirely digital, entirely physical with only a location reference, or both. This means a PlanOwner can document the existence and location of an important physical document — a signed will in a solicitor's office, a certificate in a home safe — without needing a digital copy at all.

A Credential Entry follows the same principle — it is a structured record, not merely stored login and password details. Each Credential Entry specifies one of three approaches: a Manager Entry (credentials live in an external password manager; PlanAfter records only where to find them), a Direct Entry (credentials are stored and encrypted directly within the platform), or an Offline Entry (credentials exist physically; PlanAfter records only the physical location). The PlanOwner documents every account and access point in their life without being forced to centralise sensitive passwords — the level of storage versus reference is always their choice.

Document Entries and Credential Entries are created within cards throughout the platform — in My Profile, in every Asset and Liability Record, in Family Member Records, and across all planning sections. The Vault aggregates all of them so the PlanOwner, and — after activation — the Executor/Beneficiary, can locate any document or credential without navigating section by section. All Vault content is encrypted with bank-grade security. 

**5\. Tasks & Reminders**

Tasks & Reminders is the platform's unified action layer — a single view that aggregates every task from across the entire plan and even other persons’ plans ( if you are a contributor or executor for another PlanOwner). A task to renew a passport (generated from Essential Info), a reminder to review a will (generated from Will & Legal Actions), a deadline to upload a property valuation (set by the PlanOwner), and a task assigned to a Contributor to scan and upload old family photos all appear in one place, organised by priority, due date, and status.

Tasks are generated through three distinct routes. The platform's Smart Task Engine automatically creates tasks based on the PlanOwner's data — if a passport expiry date is entered, a renewal reminder is scheduled, a task is created to address the gap. The AI Assistant proactively identifies plan weaknesses and surfaces suggested tasks with explanations of why they matter. And the PlanOwner can create custom tasks manually, assign them to Contributors or Executors with deadlines and instructions, and track their completion.

Reminders are delivered via the platform's notification system — in-app, by email, and (in Phase 2\) by push notification. Overdue tasks escalate through a configured reminder cadence. The Annual PlanAfter Review is also surfaced through this section — once per year, on the anniversary of the plan's creation, the PlanOwner is prompted to review, update, and reflect.

**6\. Marketplace**

End-of-life and legacy planning frequently requires professional support — a solicitor to draft or validate a will, a financial advisor to review asset distribution, a notary to authenticate a power of attorney, a grief counsellor for emotional support, or an accountant to advise on inheritance tax. Finding the right professional at the right moment is difficult, especially for someone navigating an unfamiliar process during a stressful period.

The Marketplace is PlanAfter's curated directory of vetted professionals and service providers — accessible directly from within the platform, at the exact moment the user realises they need help. Service providers are verified (credentials, licences, reputation), listed with transparent pricing, and filterable by type, jurisdiction, language, and availability. Users can book consultations, commission services, and receive deliverables (documents, reports) directly into their  Records or Vault.

The Marketplace serves both immediate and forward-looking needs. A PlanOwner can use it now — to get a will professionally reviewed, or to consult a financial advisor about asset distribution. They can also pre-select and recommend specific vendors for their Executor to use after death — specifying, for example, which solicitor should handle probate or which funeral director they prefer. These recommendations are stored within the plan and surfaced to the Executor when the plan is activated.

**7\. Plans Shared With Me**

A PlanAfter user can be invited to participate in other people's plans — as an Executor, a Contributor, or a Beneficiary. Plans Shared With Me is the section where all of these external roles are consolidated. Each plan the current user has been granted access to appears here, labelled with the plan owner's name and the user's specific role in that plan.

This section exists because the roles a person plays in others' lives are as important as the plan they build for themselves. Someone may be the Executor for an elderly parent, a Contributor helping a sibling complete their plan, and a Beneficiary of a partner's estate — all simultaneously, all requiring different types of access, all managed from one place.

Access within each shared plan is strictly scoped to what the PlanOwner has configured. An Executor sees only the sections and documents that have been designated for Executor access. A Beneficiary sees nothing until the configured trigger condition is met. A Contributor sees only the specific tasks or fields they have been assigned. All actions taken within a shared plan are logged and auditable by the PlanOwner.

Participating in another person's plan is also a natural pathway to creating one's own. Users who accept an Executor or Contributor invitation and experience the platform through that role are prompted — at appropriate moments and without pressure — to consider building their own plan and converted to PlanOwner.

**8\. Settings**

Settings is the platform's account configuration centre — accessible at any time from the header bar's profile menu. It is not a planning section; it is the control layer that governs how the platform behaves, who has access, and under what conditions. A complete and correctly configured Settings area is as important as a complete plan — because it determines whether the plan will actually work as intended when it matters.

**Account & Profile Verification**

The foundation of the plan's legal validity. Personal details entered here flow directly into My Profile and into all generated legal documents — meaning the name, date of birth, and jurisdiction recorded here must be exact and verified. Profile Information covers full legal name, date of birth, country of residence, citizenship, marital status, and primary language. Contact Information covers primary and secondary email, mobile phone, and preferred pronouns. Identity Verification enables government eID or KYC verification — with document upload as a fallback — unlocking notarisation-ready documents and trusted access controls across the platform. Password Management covers credential updates and recovery options.

**Security**

Controls over account access and session integrity. The PlanOwner can enable two-factor authentication via authenticator app, SMS, or FIDO2 security key, and configure login alerts for new sessions or high-risk activity. The authorised devices panel lists every active session with approximate location and last seen timestamp — individual devices can be trusted or revoked, and all sessions can be terminated simultaneously with a single action.

**Plan Legacy Mode Activation / Post Mortem Activation & Roles**

The control centre for two of the most critical configurations in the platform: how the system will detect the PlanOwner's death and activate the plan, and who has access to what and when.

For Legacy Mode Activation, three paths are supported.

The first is automated death registry verification — in supported jurisdictions, PlanAfter queries national death registries via eID API and triggers plan activation automatically upon a confirmed match, with no human intervention required. 

The second is Executor-initiated manual activation — the Executor submits a verified death certificate through the platform, initiating a 72-hour grace period before the plan transitions to Legacy Mode. 

The third is the Dead Man's Switch — the PlanOwner sets a check-in interval (for example, every 30 days); if no check-in is received, the platform sends escalating alerts to the PlanOwner and designated contacts; if no response is received after all escalation steps are exhausted, the plan activation sequence is triggered automatically. The PlanOwner configures the check-in interval, the escalation sequence, and the contacts to be notified at each stage. All three mechanisms can operate in parallel — whichever fires first initiates the process.

For Trusted Contacts & Roles, the PlanOwner has a centralised view of all role assignments across the plan — Executors, Contributors, and Beneficiaries — with the ability to invite, revoke, adjust permissions, and review access logs. This is the master control for who can see what and when, supplemented by the granular per-section and per-document controls throughout the plan.

**Subscription & Billing**

Current plan tier, payment method, billing history, upcoming renewal date, and upgrade/downgrade options. Sponsored PlanOwners are notified here when their covered period is approaching expiry and are guided through the Take Over flow to convert to a direct subscription. PlanOwners on a family plan can also split from their adjacent account here. The billing area also surfaces available promo codes and referral credits.

**Preferences & Communication**

Language and localisation settings, notification delivery preferences (email, SMS, in-app, and push in Phase 2), and digest frequency. Notification controls are split between owner notifications — security alerts, plan progress reminders, billing updates — and trusted contact notifications, which govern when Executors and Beneficiaries are contacted and under what conditions. 

Language preference controls the entire platform interface — labels, buttons, messages, and emails — independently of the PlanOwner's jurisdiction.

**Support**

A full in-platform support centre — a searchable Help Centre with expandable FAQs, a ticket submission form with category, subject, description, and file attachments, a ticket history table with open/pending/resolved status tracking, a chatbot widget for immediate assistance, and a feedback mechanism. The PlanOwner never needs to leave the platform to get help.

**Legal & Compliance**

Terms of Service, Privacy Policy, and Cookie Policy. GDPR rights management — the PlanOwner can request data access, deletion, or export at any time, each tracked through a dedicated modal with status updates. Jurisdiction configuration determines which legal templates, succession rules, and compliance logic apply across the platform. A full audit log with date range and action type filters gives the PlanOwner a complete record of every action taken within their account.

**Log Out**

Log out of the current device or all active sessions simultaneously. All session terminations are recorded in the audit log.

**User Roles & The Permission Model**

PlanAfter is a single-author, controlled-distribution system. There is exactly one authoritative editor: the PlanOwner. All other participants interact through view access, suggestions, or task-based release actions. No role other than PlanOwner can independently propagate, modify, or share content. This model is designed for legal safety, emotional integrity, and operational clarity.

**Role Determination Formula**

A person's role in a plan is determined by the combination of access and tasks they have been assigned. Access \+ Task \= Contributor or Executor. Access without Task \= Beneficiary or Executor. Task without Access \= Executor. This formula is the core of the permission model — it defines how the system categorises every assignment, and it means one person can hold multiple roles simultaneously in the same plan. A spouse may be a Beneficiary (receiving access to assets post-mortem), a Contributor (helping to update contact information), and an Executor (responsible for activating the plan) — all at once, each role granting independent and non-merged capabilities.

**PlanOwner**

The sole authority and source of truth for the entire plan. The PlanOwner creates, edits, and deletes all content. Content changes take effect immediately on save. The PlanOwner defines all access, timing, events, and release conditions for every other role — and can revoke or modify any assignment at any time. No content enters the plan without the PlanOwner's explicit approval: Contributor suggestions are proposed changes, not edits. The PlanOwner is the only user with full access to encrypted content. There are no restrictions on what a PlanOwner can do within their own plan.

**Executor**

An operator of the PlanOwner's intent — not a content owner, not a super-user, and not a manager of the plan. The Executor's core function is to carry out the PlanOwner's pre-defined instructions at the right moment, for the right people, under the right conditions. The Executor role has two independent and optional layers: a View Layer (the Executor may be granted read access to specific sections, records, or entries — or may have none at all) and a Task & Release Layer (the core executor function).

The Executor's defining capability is delivery without disclosure: the Executor can release content to a Beneficiary — triggering access to a video, a letter, a document — without being able to open, read, or view that content themselves. The Executor presses a button to confirm an event; the system delivers the content to the designated recipient. This is intentional — it protects the privacy and emotional integrity of the PlanOwner's messages, while still ensuring they are delivered correctly and verifiably.

Executors receive three categories of tasks: Post-Mortem Activation Tasks (confirming death and activating the plan), Beneficiary Access Tasks (event-triggered releases — confirming a wedding, a graduation, a specific date) and Post-Mortem Tasks shared with Beneficiaries (e.g. cancelling subscriptions). Executor access is Post-Mortem by default — Executors do not automatically receive access before the plan is activated. The PlanOwner can optionally grant pre-mortem view access for specific sections to allow the Executor to familiarise themselves with the plan structure.

**Contributor**

A temporary helper operating in suggestion mode. Contributors are invited to assist with specific, clearly defined tasks — uploading a document, updating contact information, completing a section, organising media. Their access is strictly scoped to the tasks and fields they have been assigned, and it is always temporary: tied to the due date of the assigned task, or revokable by the PlanOwner at any time. Contributors can only suggest changes — they cannot make direct edits. All suggestions are held as proposed changes pending PlanOwner review and approval. Nothing a Contributor does enters the plan without the PlanOwner explicitly accepting it. To achieve their tasks, contributors also can preview, download and print documents.

Contributor access is immediate by design — it exists to help the PlanOwner build and maintain the plan while alive. Contributors have no Post-Mortem access. When a Contributor's access expires, they lose all visibility into the sections they were working on. They can be re-invited at any time, but re-invitation does not restore visibility into past content — only the new scope assigned in the new invitation.

**Beneficiary**

A passive recipient. The Beneficiary is designated to receive access to specific sections, records, cards, entries, or files from the plan — exactly scoped, exactly timed, delivered by secure link or email. Beneficiaries cannot edit, suggest, share, or release content. They view and optionally download what they have been assigned — nothing more. Before their trigger condition is met, a Beneficiary who has registered sees a holding screen confirming their designated role but providing no content access. After their trigger fires, access is automatic.

Beneficiary access is the most flexible in terms of timing: the PlanOwner can configure it as Immediate (the Beneficiary sees the content now), on a Specific Date, Post-Mortem (after plan activation), or on a Specific Event (confirmed by the Executor). For event-based delivery, there are two confirmation mechanisms: the Executor confirms the event occurred, or the Beneficiary notifies the Executor who then approves. Once confirmed, delivery is automatic — the Beneficiary receives an email with a secure access link. Beneficiaries may also receive Post-Mortem Tasks — for example, instructions to get a document court-approved in order to receive an asset.

**Corporate & Institutional Roles**

PlanAfter also supports corporate and institutional roles for organizations that provide access to the platform as part of their own offering. This includes corporate clients that purchase plans for their employees, members, or customers, as well as third-party brokers or distribution partners that resell PlanAfter to their own clients, such as insurance companies, banks, or similar institutions. These roles do not function like PlanOwners or invited personal-plan roles; instead, they operate through their own dedicated dashboard views, where they can access, manage, monitor, and administer the plans connected to their organization or client base according to their contractual permissions and platform access model.

**Admin (Internal)**

PlanAfter internal roles with no access to user plan content. Admin roles are: Super Admin, Support, Financial Officer, Analyst, and Limited Viewer — each with a strictly scoped permission set. Admins cannot access the Vault content under any circumstances. All admin actions are logged in an immutable audit trail.

**Business Model**

PlanAfter operates on a tiered subscription model for B2C users and a bulk licensing model for B2B2C institutional partners, supplemented by marketplace commissions and microtransactions.

**B2C Subscriptions (Annual billing only)**

Basic Plan (€100/year): Core planning features, standard encryption, guided onboarding, Vault access. Premium Plan (€200/year): Full feature set, Vault, extended AI guidance, priority support, extended storage. Family Plan: Two separate PlanOwner accounts — primary at full price, second at 50% discount. Basic Family \= €150/year; Premium Family \= €300/year. All plans include a free trial period (duration TBC). Promo codes supported.

**B2B2C — Corporate & Institutional Partners**

Organisations (employers, insurers, banks, pension funds) purchase bulk licence blocks and distribute them to employees or clients via a self-service Partner Dashboard. Pricing is negotiated per-organisation. Partners see only anonymised, aggregated usage metrics — never personal plan content. The platform supports co-branding, API integration, and annual licence renewal management.

**Legacy Mode Fee**

A symbolic €12/year fee for Executors and Beneficiaries to retain read-only access to an activated (post-death) plan. Covers ongoing archival and access costs after plan activation.

**Marketplace Commissions**

5–15% commission on services booked through the PlanAfter Marketplace (lawyers, therapists, financial advisors, funeral services, etc.).

**Microtransactions**

One-time purchases for premium digital assets: memorial page designs, enhanced reporting, personalised AI content, or post-loss services. Available to PlanOwners, Executors, and Beneficiaries.

**Account Types & How Access Is Paid For**

PlanAfter supports multiple account types reflecting the different ways users enter the platform, who pays for their access, and what their relationship to the plan is. Understanding account type is essential because it governs billing logic, upgrade paths, access levels, and what happens when a subscription period ends.

**PlanOwner Accounts**

The PlanOwner is the primary user — the person who creates, owns, and controls the plan. All other roles (Executor, Beneficiary, Contributor) are defined and configured by the PlanOwner. PlanOwner accounts come in three variants depending on how access is funded:

**Direct PlanOwner — Basic (€100/year)**

A self-paying PlanOwner on the Basic tier. Includes core planning features across all sections, standard encrypted Vault, the Smart Task Engine, guided onboarding, and access to the Marketplace. Billed annually. Upgrade to Premium is available at any time with prorated billing for the remainder of the current cycle.

**Direct PlanOwner — Premium (€200/year)**

A self-paying PlanOwner on the Premium tier. Includes everything in Basic plus the optional Zero-Knowledge Vault (ZKV) for maximum privacy, extended AI guidance and proactive planning suggestions, extended storage, and priority support. The Premium tier is the recommended account type for users with complex estates, significant digital assets, or high privacy requirements.

**Direct PlanOwner — Family Plan**

A single payment covering 2-5 separate PlanOwner accounts — each with their own independent plan, Vault, role assignments, and data. The primary account holder pays full price; the second ( 2-5) account is included at 50% discount. Basic Family \= €150/year (two up to five Basic accounts). Premium Family \= €300/year (two Premium accounts). Both accounts are independently full-featured. Shared Person Records and the Family Tree are the collaborative layer; each PlanOwner's individual planning sections (assets, legal documents, Emotional Legacy) remain private by default. 

**Sponsored PlanOwner — Corporate**

A PlanOwner whose access has been paid for by an employer, insurer, bank, pension fund, or other institutional partner via a bulk licence purchase. The Sponsored PlanOwner has the same access as a Direct PlanOwner at the tier their sponsor has configured. They never see billing information or payment flows while sponsored. When the sponsorship period ends, the platform notifies the sponsor first (to renew), then — if the sponsor does not renew — notifies the PlanOwner with a timed prompt to take over payment independently. A grace period preserves full access during the transition. All plan content, documents, and role assignments are retained across the transition.

**Sponsored PlanOwner — Family**

A PlanOwner whose access has been paid for by another PlanOwner as part of a Family Plan. The second account holder is the sponsored user. The same take-over logic applies when the Family Plan subscription ends or is cancelled.

**Gifted PlanOwner**

A PlanOwner whose subscription has been purchased as a gift by another individual — a family member, friend, or colleague — through the PlanAfter gifting flow. The recipient activates their account via a gift code. Gifted plans follow the same tier logic and take-over/renewal flow as Sponsored plans when the gifted period expires.

**Invited Role Accounts — Free Access, Scoped to One Plan**

Executors, Contributors, and Beneficiaries are invited into the platform by a PlanOwner. Their access is free — they do not pay for a subscription, and they do not need a PlanOwner account. Their access is strictly scoped to the specific plan they have been invited into, under the permissions configured by that PlanOwner. Invited role accounts require a fast-track registration (name, email, password, email verification) but do not go through full onboarding. At any point, any free account holder can upgrade to a PlanOwner account and begin building their own plan. Their existing role assignments and shared plan access continue unchanged alongside their own new plan.

**Executor**

Designated by the PlanOwner to manage and execute the plan after death or incapacitation. Access may be granted immediately upon invitation (to allow the Executor to familiarise themselves with the plan structure) or restricted until plan activation, depending on the PlanOwner's configuration. After plan activation, the Executor gains access to all sections and documents designated for Executor access. The Executor can optionally pay a €12/year Legacy Mode fee to retain ongoing read-only access to the activated plan after their duties are complete.

**Contributor**

Invited to assist with specific, clearly defined tasks — uploading documents, completing a form, organising media. The Contributor sees only the tasks and fields they have been assigned; they have no view into the rest of the plan. Contributor access is temporary by design — it ends when their assigned tasks are complete, or when the PlanOwner revokes it. Contributors who engage with the platform through their role are prompted — without pressure — to consider creating their own plan.

**Beneficiary**

Designated to receive access to specific sections, documents, or messages from the plan — either immediately, on a future date, or after plan activation. Before their trigger condition is met, Beneficiaries see a holding screen confirming their designated role but providing no content access. After activation, they access only what has been explicitly assigned to them. Beneficiaries can optionally pay a €12/year Legacy Mode fee to retain ongoing access to the content assigned to them after the default access window closes.

**Institutional Partner Accounts — B2B2C**

Corporate and institutional partners (employers, insurers, banks, pension funds) purchase bulk licence blocks and manage distribution through a dedicated Partner Admin Dashboard. The partner is the customer — they hold the billing relationship with PlanAfter. The end-users (their employees or clients) are Sponsored PlanOwners. Partners never access personal plan content; they see only activation metrics and anonymised usage data.

Pricing for institutional partners is negotiated per-organisation based on volume, tier, and any co-branding or API integration requirements. Licences are sold in annual blocks. Unused licences can be reassigned. Renewals are managed per-licence, allowing partners to selectively continue or discontinue individual accounts at the end of each billing cycle.

**Target Institutional Partner Categories:**

**Life & Health Insurers**

Support policyholders and beneficiaries emotionally and administratively before and after loss — not just through payouts, but through structured care. PlanAfter enhances policyholder lifetime value and reduces the administrative burden of post-mortem claims processing.

**Banks & Private Wealth Institutions**

Build intergenerational loyalty and monetisable trust services by offering clients structured, secure legacy planning support. PlanAfter positions the institution as a long-term partner through one of life's most significant financial transitions.

**Employee Benefit Providers & Corporates**

Offer PlanAfter as part of a well-being and continuity benefit for employees and their families. Particularly valuable for organisations with ageing workforces, family-oriented cultures, or HR strategies that prioritise holistic employee care.

**Pension Funds & Retirement Providers**

Support members through death, disability, and legacy moments — offering secure, compliant, and emotionally intelligent tools that enhance trust, reduce liability, and increase lifetime member value.

**Law Firms & Legal Consultants**

Digitise and automate estate planning, document handover, and executor workflows — reducing errors, improving client outcomes, and building long-term client relationships anchored in trust.

**Crypto Platforms & Digital Wallets**

Ensure digital assets are not lost after death. PlanAfter provides a compliant, structured mechanism for documenting and inheriting crypto assets, wallet credentials, and digital account access.

**Conversion Paths**

Every non-paying account type has a defined conversion path to a paying PlanOwner account:

**Sponsored → Direct PlanOwner**

Target conversion rate: 60%. Triggered by sponsor non-renewal. Automated notifications, dashboard countdowns, and prorated pricing offers guide the transition. All content is preserved.

**Executor → PlanOwner**

Prompted after accepting invitation and exploring the platform. Conversion offer presented contextually — not immediately, but after the Executor has experienced the value of the platform through their role.

**Contributor → PlanOwner**

Prompted after completing tasks — particularly for Contributors who have done emotionally significant work (organising a deceased relative's files, completing a family member's profile). Conversion offer frames the experience as a reason to build their own plan.

**Beneficiary → PlanOwner**

Prompted after a defined period following plan activation. The Beneficiary has experienced what it means to receive a well-prepared plan and is nudged to build one of their own.

**Free Trial → Paid**

Target conversion rate: 20–30%. Trial users who reach meaningful plan completion milestones during the trial period are more likely to convert. AI nudges and progress visibility are the primary conversion drivers during trial.

**Family Account: The Family Operating System**

A Family Account is not just a discounted bundle of two individual plans. It is a different operating model: a shared foundation for a household or family unit, where two PlanOwners collaborate around common data and a shared family structure. What makes it distinct is shared Person Records. Instead of each PlanOwner keeping separate versions of the same family member, both can view and contribute to one shared record. For example, both parents can access the same child record, including documents, medical information, photos, and life story. If one parent adds something, the other sees it immediately, with no duplication or version conflicts.

The same applies to the Family Tree, which is shared and synchronized between both PlanOwners. Both see the same tree, and any change — adding a relative, correcting a date, or marking someone as deceased — appears immediately for the other. Privacy is still preserved. Each PlanOwner keeps full control of their own private plan areas, such as assets, liabilities, legal documents, personal goals, and Emotional Legacy content, unless they explicitly choose to share them. A shared Family Account creates common family infrastructure without removing individual privacy or autonomy.

This matters especially if one PlanOwner dies. The surviving partner does not lose access to the shared family knowledge — such as children’s records, family history, contacts, and the Family Tree — because these records were always shared. At the same time, the second account holder can later choose to **separate** from the Family Plan. If that happens, the link between the two accounts ends and both continue independently under their own account logic.

A Family Account covers two PlanOwner accounts. The primary account holder pays full price; the second account is included at 50% discount. Both accounts are independently full-featured — each has their own plan, their own Vault, their own role assignments, and their own privacy. The shared infrastructure (Person Records, Family Tree) is the layer that connects them. Essentials Family \= €150/year. Premium Family \=/year.

**Plan Lifecycle**

Every PlanOwner account passes through the following lifecycle phases:

**1\. Discovery & Awareness**

The potential user or partner first encounters PlanAfter via the public website, corporate invitation, or partner campaign.

**2\. Registration & Onboarding**

The user registers (self, corporate invite, or gift), verifies identity, selects a plan tier, and completes an adaptive onboarding questionnaire that configures their initial task list and plan structure.

**3\. Planning Phase**

The active phase: the PlanOwner fills in sections, uploads documents, assigns roles, configures triggers, and builds plan completeness over time with AI and task engine guidance.

**4\. Maintenance Phase**

Ongoing plan upkeep: edits, reminders, annual reviews, role updates, and document renewals. The Plan Completeness Score and AI nudges keep the plan current.

**5\. Plan Activation**

Triggered by death verification (manual Executor submission, Dead Man's Switch, or automated death registry API match). The plan transitions to Legacy Mode. A 72-hour grace period allows for false positive cancellation.

**6\. Legacy Mode**

Executors and Beneficiaries receive their configured access. Post-loss tasks are executed. Documents and messages are delivered per trigger conditions. Audit trail captures all actions. The plan is eventually archived or deleted per retention policy and user configuration.

**Glossary of Platform Terms**

This glossary defines the core terminology used consistently throughout this document and across the PlanAfter platform — in product design, engineering, and communications. All team members should use these terms precisely to avoid ambiguity.

**Plan**

The top-level container for a PlanOwner's life and legacy planning data. Every PlanOwner has exactly one Plan. The Plan encompasses all sections of the platform — Me, My Family & My Network; My Plan (Assets & Liabilities, Emotional Legacy, Body & Health, Goals & Aspirations, Will & Legal Actions); Vault; Tasks & Reminders; Post-Loss Support — and all role assignments, trigger configurations, and sharing grants. A Plan can be shared with Executors, Contributors, and Beneficiaries under permissions defined by the PlanOwner. The Plan persists beyond the PlanOwner's death and transitions to Legacy Mode upon activation.

**PlanOwner**

The primary user of the platform — the person who creates, owns, and controls the Plan. The PlanOwner has full read and write access to all sections of their Plan and is the only user who can configure roles, sharing grants, trigger logic, and plan activation settings. A PlanOwner may be a Direct PlanOwner (self-paying), a Sponsored PlanOwner (paid by a corporate or family partner), or a Gifted PlanOwner (access purchased by another individual). There is exactly one PlanOwner per Plan.

**Executor**

A trusted person designated by the PlanOwner to manage and execute the Plan after the PlanOwner's death or incapacitation. The Executor is responsible for initiating plan activation (including death verification), completing post-death tasks, notifying institutions, enabling Beneficiary access, and overseeing the fulfilment of the PlanOwner's instructions. Executor access is configured by the PlanOwner and may be granted immediately upon invitation or held until plan activation. An Executor can optionally pay a €12/year Legacy Mode fee to retain read-only access after their duties are complete. One Plan may have multiple Executors.

**Contributor**

A person invited by the PlanOwner to assist with specific, clearly defined tasks within the Plan — uploading documents, completing a form, filling in a section, or organising media. Contributors have no visibility into the rest of the Plan beyond their assigned tasks and fields. Contributor access is temporary by design: it ends when tasks are complete or when the PlanOwner revokes it. Contributors do not pay for access. They may also be service providers sourced from the Marketplace (e.g. a document assistant or digital notary).

**Beneficiary**

A person designated by the PlanOwner to receive access to specific parts of the Plan — documents, messages, asset information, or emotional content — either immediately, on a scheduled future date, or after plan activation. Before their trigger condition is met, Beneficiaries see a holding screen confirming their role but providing no content. After activation, they access only what has been explicitly assigned to them. Beneficiaries cannot edit the Plan. They may optionally pay a €12/year Legacy Mode fee to retain ongoing access after the default window closes.

**Institutional Partner**

An organisation (employer, insurer, bank, pension fund, or similar) that purchases bulk PlanOwner licences and distributes them to employees or clients as a benefit or value-added service. The Institutional Partner is the billing customer. Their employees or clients become Sponsored PlanOwners. Partners manage distribution, monitor activation metrics, and handle renewals through a dedicated Partner Admin Dashboard. Partners never access personal plan content — all analytics visible to them are aggregated and anonymised.

**Direct PlanOwner**

A PlanOwner who pays for their own subscription directly to PlanAfter. Available at Basic (€100/year) or Premium (€200/year) tier. Upgrade and downgrade are available at any time; upgrades are prorated for the current billing cycle, downgrades take effect at the next renewal.

**Sponsored PlanOwner**

A PlanOwner whose subscription is paid by a corporate or institutional partner, or by another PlanOwner (Family Plan). The Sponsored PlanOwner has the same access as a Direct PlanOwner at the tier their sponsor has configured. When sponsorship ends, the platform guides the user through a Take Over flow to convert to a Direct PlanOwner, with all plan content preserved.

**Legacy Mode (account state)**

The state a Plan enters after activation (following the PlanOwner's death). In Legacy Mode, Executors and Beneficiaries gain their configured access. The PlanOwner can no longer log in. Executors and Beneficiaries may optionally pay €12/year to maintain ongoing read-only access beyond the default access window. Separately, Legacy Mode also refers to the PlanOwner's pre-death configuration of what should happen after their death — who gets access, to what, and under what conditions.

**Record**

A single, structured data object within the platform representing a person, asset, or liability. Every Record has a header (name, type, status, and key summary fields) and is organised into Tabs. The three Record types are: Person Record, Asset Record, and Liability Record.

**Person Record**

A Record representing an individual. Used for the PlanOwner (My Profile), family members (My Family), and network contacts (My Network). All Person Records share the same Tab structure: Overview, Document Entries, Album, Life Story, and — when the individual is marked as deceased — Memorial.

**Asset Record**

A Record representing a financial or physical asset owned by the PlanOwner: bank accounts, property, vehicles, crypto wallets, business interests, investments, and other valuables. Asset Records share the Tab structure: Overview, Document Entries, and Credentials.

**Liability Record**

A Record representing a financial obligation of the PlanOwner: mortgages, loans, credit cards, subscriptions, and other ongoing payment commitments. Liability Records share the same Tab structure as Asset Records: Overview, Document Entries, and Credentials.

**Tab**

A top-level view within a Record that organises its content into distinct areas. Tabs are fixed per Record type and are not user-configurable. Switching tabs does not navigate away from the Record. Person Record tabs: Overview, Document Entries, Album, Life Story, Memorial (deceased only). Asset and Liability Record tabs: Overview, Document Entries, Credentials.

**Overview Tab**

The default and primary tab of every Record. Contains all collapsible Cards for that Record, organised into logical groupings. Always the first view shown when a Record is opened.

**Document Entries Tab**

Available on all Record types. Aggregates every Document Entry attached to any Card within that Record into a single consolidated view, grouped by Card context. The same Document Entries are also visible within their respective Cards in the Overview tab.

**Credentials Tab**

Available on Asset and Liability Records only. Aggregates every Credential Entry attached to any Card within that Record into a single consolidated view. The same Credential Entries are also visible within their respective Cards in the Overview tab.

**Album Tab**

Available on Person Records. A media gallery containing photos and other visual content associated with that individual — personal photos, family memories, life milestones.

**Life Story Tab**

Available on Person Records. Contains narrative biographical content — written milestones, personal memories, significant life events, and reflections. Also serves as the primary source for AI-assisted life story generation and for the family archive built through the Emotional Legacy section.

**Memorial Tab**

Available on Person Records only when the individual has been marked as deceased. A dedicated space for memorial-related content — tributes, remembrances, and legacy information. Not visible or accessible while the individual is alive.

**Card**

A collapsible section within the Overview tab of a Record. Each Card groups a logically related set of fields, actions, and entries. Cards are expanded and collapsed independently. Examples within My Profile: Essential Info, Contact Info, Medical Info, Education, Employment & Affiliations, Beliefs & Values. Examples within a Bank Account Record: Basic Info, Ownership, Related Services, Additional Documents, Tasks & Reminders, Shared With.

**Document Entry**

A single document (file) attached to a Card within a Record. Each Document Entry has a title, document type, source type (Digital File, Physical Location, or both), and an optional expiry date. Document Entries support preview, download, version history, and access-controlled sharing. They appear both within their parent Card and in the Document Entries tab of the Record. Cards that do not support Document Entries: Basic Info, Shared With, Tasks & Reminders.

**Credential Entry**

A single set of login or access credentials attached to a Card within an Asset or Liability Record. Each Credential Entry has a label and one of three entry types: Manager Entry, Direct Entry, or Offline Entry. Credential Entries are encrypted and appear both within their parent Card and in the Credentials tab of the Record.

**Credential Entry — Manager Entry**

A Credential Entry where the actual credentials are stored in an external password manager (e.g. LastPass, 1Password, Bitwarden). PlanAfter records only the name and location of the relevant entry in the external manager — not the credentials themselves.

**Credential Entry — Direct Entry**

A Credential Entry where the credentials (username, password, URL, and any notes) are stored directly within PlanAfter, encrypted in the Vault.

**Credential Entry — Offline Entry**

A Credential Entry where the credentials exist only in physical form (written in a notebook, stored in a safe, or held by a trusted person). PlanAfter records the physical location only.

**Vault**

The platform's central encrypted document repository. All documents uploaded anywhere in the platform are stored in the Vault and cross-linked back to their context. The Vault is accessible as a standalone section (showing all documents across the entire plan in one place) and is also embedded within each Record and Card where documents are relevant. The most sensitive content can be further protected with the Zero-Knowledge Vault (ZKV) layer.

**Zero-Knowledge Vault (ZKV)**

An optional encryption layer for the most sensitive content within the Vault. With ZKV enabled, content is encrypted client-side before it reaches PlanAfter's servers. PlanAfter staff, administrators, AI systems, and search indexes cannot access or read ZKV-protected content under any circumstances — including with a court order. Decryption is only possible by the PlanOwner (or a designated recipient who has been given the decryption key). ZKV content is excluded from OCR processing, AI analysis, and search indexing.

**Dead Man's Switch (DMS)**

An automated plan activation mechanism configured by the PlanOwner in Settings. The PlanOwner sets a check-in interval (e.g. every 30 days). If the PlanOwner fails to check in within the interval, the platform sends escalating alerts to the PlanOwner and to designated emergency contacts. If no response is received after all escalation steps are exhausted, the plan activation sequence is triggered automatically. The DMS operates alongside manual Executor-triggered activation and automated death registry API verification.

**Plan Completeness Score**

A point-based indicator of how complete the PlanOwner's plan is. Points are awarded per completed entry across all sections — each document uploaded, each field completed, each role assigned contributes to the score. The score is displayed as a raw total against a dynamic recommended target that adjusts based on the PlanOwner's profile complexity (age, number of dependents, asset types, legal status, and jurisdiction). The score is not a percentage — it is an absolute count against a personalised benchmark.

**Smart Task Engine**

The platform's automated task generation system. Creates tasks based on three inputs: (1) system-generated tasks triggered by plan data (e.g. a passport expiry date in the profile automatically generates a renewal reminder); (2) AI-suggested tasks that identify gaps or inadequate information in the plan; and (3) user-created custom tasks that the PlanOwner manually defines and optionally assigns to Contributors or Executors. All tasks are aggregated in the Tasks & Reminders section.

**Intelligent Document Cross-Linking**

An AI-powered system that automatically organises and connects documents across the platform. When a document is uploaded anywhere, the system performs OCR (if applicable), classifies the document type using machine learning, determines its primary storage location, and identifies all other sections and Records in the plan where the document is logically relevant — then cross-links it to all of them. A property deed uploaded to an Asset Record is automatically cross-linked to Legal Documents and to any related Liability Record. Documents uploaded once are visible everywhere they are needed, without the PlanOwner having to upload or categorise them manually.

**AI Assistant**

An on-premise, context-aware planning companion embedded throughout the platform. Provides personalised task recommendations, feature explanations, plan gap identification, document routing suggestions, and proactive planning nudges. The AI Assistant never accesses ZKV-encrypted content. All AI interactions are logged. The AI Assistant operates only with the PlanOwner's explicit consent and all suggestions are explainable, revocable, and auditable. The AI Assistant does not make autonomous decisions — it advises and suggests; humans confirm and act.

**Plan Activation**

The process by which the Plan transitions from its active (pre-death) state to Legacy Mode, granting Executors and Beneficiaries their configured access and initiating post-death task execution. Plan Activation can be triggered in three ways: (1) manually, by an Executor submitting a verified death certificate; (2) automatically, via a match from a national death registry API; or (3) via the Dead Man's Switch after all escalation steps are exhausted. A 72-hour grace period after activation allows the PlanOwner or a trusted contact to cancel if the activation was triggered in error.

**Trigger**

The condition that activates a Sharing Grant and releases access to a Beneficiary or Executor. Four trigger types exist: Immediate (access is granted at the moment of configuration), Scheduled Date (access is granted on a specific future date), Post-Death (access is granted after Plan Activation), and Event-Triggered (access is granted when a nominated trusted person confirms that a specified life event has occurred — for example, a child's graduation or the PlanOwner's incapacitation).

**Sharing Grant**

A permission created by the PlanOwner (or Executor) that defines the exact terms of a specific sharing relationship: who receives access (a named user or role), what they can access (a specific Record, Card, Document Entry, or Credential Entry), at what permission level (View Only, Contribute, or Manage), and under which Trigger condition the access becomes active. Sharing Grants are the atomic unit of access control across the platform.

**eID Verification**

Integration with national electronic identity systems (e.g. Evrotrust in Bulgaria, eIDAS-compliant services across the EU) for two purposes: (1) verified user onboarding — confirming the PlanOwner's identity via state-certified authentication, eliminating fake or duplicate accounts; and (2) automated death detection — once a PlanOwner is eID-verified, PlanAfter can query national death registries via API to automatically detect death and trigger plan activation without requiring human intervention.

**Section**

A top-level area of the platform accessible from the main navigation. Sections either contain multiple Records of a given type (My Family contains multiple Person Records; Assets & Liabilities contains multiple Asset and Liability Records) or present a single structured view (My Profile is a single Person Record; Tasks & Reminders is a unified task list; Vault is a unified document repository).

**Jurisdiction**

A personal data field stored in My Profile (not in Settings) recording the PlanOwner's country of legal residence. Jurisdiction determines which legal document templates are shown, which inheritance and succession rules apply, which statutory guidance is surfaced, and how compliance logic behaves throughout the platform. Jurisdiction does not affect the interface language — that is controlled separately by Language Preference.

**Annual PlanAfter Review**

A structured, AI-guided plan review prompted once per year on the anniversary of the PlanOwner's registration. The Review walks the PlanOwner through all sections of their plan, highlights what has changed or become stale, prompts updates, and generates a versioned review record stored in the Vault. The Review also includes optional personal reflection prompts linked to the Emotional Legacy section. Completing the Annual Review contributes points to the Plan Completeness Score.

# XD adobe design:

   
**XD adobe design**: 

Паролата за всички линкове е една и съща: PA@w16\_20260417

1\. OnBoarding  
[https://xd.adobe.com/view/fa887128-6445-45ab-988f-0796a65e579e-afdb/](https://xd.adobe.com/view/fa887128-6445-45ab-988f-0796a65e579e-afdb/)

2\. Assets & Liabilities  
[https://xd.adobe.com/view/f080e5bc-46da-4977-b2c7-72ea62221c58-a5d3/](https://xd.adobe.com/view/f080e5bc-46da-4977-b2c7-72ea62221c58-a5d3/)

3\. Emotional Legacy  
[https://xd.adobe.com/view/ee32d13b-8624-4094-8238-52d338d42e7e-bb61/](https://xd.adobe.com/view/ee32d13b-8624-4094-8238-52d338d42e7e-bb61/)

4\. My Profile  
[https://xd.adobe.com/view/b64d24e4-9f36-4932-8caf-bff7baa9c6a5-e31e/](https://xd.adobe.com/view/b64d24e4-9f36-4932-8caf-bff7baa9c6a5-e31e/)

5\. My Profile \- Task & Reminders  
[https://xd.adobe.com/view/d6e19884-577c-4a6d-abaf-ee4c9a8f8d5c-83b2/](https://xd.adobe.com/view/d6e19884-577c-4a6d-abaf-ee4c9a8f8d5c-83b2/)

6\. Vault  
[https://xd.adobe.com/view/f98be77f-d0ee-40ce-9b20-5b6297563d31-acd8/](https://xd.adobe.com/view/f98be77f-d0ee-40ce-9b20-5b6297563d31-acd8/)

7\. Mobile (Assets & Liabilities)  
[https://xd.adobe.com/view/15f58e3b-0a01-45fb-ae8c-375282df6b0b-40a6/](https://xd.adobe.com/view/15f58e3b-0a01-45fb-ae8c-375282df6b0b-40a6/)

Download and Print

1\. My Profile  
[https://xd.adobe.com/view/93d4cf9a-3c3e-495f-b30a-5a4b4a860764-c687/](https://xd.adobe.com/view/93d4cf9a-3c3e-495f-b30a-5a4b4a860764-c687/)

2\. Legal Documents (Templates)  
[https://xd.adobe.com/view/60d73946-2d19-499f-985d-5560f071364b-3584/](https://xd.adobe.com/view/60d73946-2d19-499f-985d-5560f071364b-3584/)

\* Всички линкове ще са валидни 1 година.  
(Освен ако, използвайки работните файлове не ги качите в собствен акаунт на Adobe)

Отделно от този линк могат да се свалят всички работни файлове:  
[https://www.swisstransfer.com/d/67672207-1996-4f55-a7d9-022c73c12ead](https://www.swisstransfer.com/d/67672207-1996-4f55-a7d9-022c73c12ead)

Свалянето на файловете е защитено с парола, която е същата като за линковете.  
Валидността на линка е 30 дни (до 17 май 2026\)

Другата седмица ще изпратим и приемно предавателния протокол.  
Ако има нужда при разработването на платформата по отношение на дизайна сме на линия за съдействие.

Поздрави и пожелания за успех\!

**Alexsander**  
Head of Design

**Creative . Web . Factory**  
\+ 359 884 346469

 PS\>   
Показани са всички възможни състояния на три ентрита in Vault:  
\- Bank Setup Agreement  
\- Harvard University  
\- AB+ (Blood Type)

За Add Document, за да се покаже пълния формат на структурата:  
\- Category  
\- Sub-Category  
\- Section  
\- Sub-Section  
\- Individual Item  
\- Item Card

е взет за пример създаването на Document Entry в:  
\- Assets & Liabilities  
\- Assets  
\- Financial Accounts & Instruments  
\- Bank Accounts  
\- My Main Bank Account  
\- Ownership

Както и добавянето на Adaptive Timeline Builder \- Timeline & Milestones:  
\- Issue Date  
Добавен е таб Credentials като е показана пълната функционалност в него.  
Add Credential е показан в същия път, в който и Add Document.  
В Documents Entries е добавен dropdown за филтриране на ентритата според конкретен профил.  
В случая е даден пример с John Johnson.

# Ref:/  Competition

**Ref:**

- **Plan and family operation system / Vault \- [https://www.trustworthy.com](https://www.trustworthy.com)**  
- **Family Tree \- https://www.myheritage.com**  
- **Memorial Pages [https://www.forevermissed.com](https://www.forevermissed.com)**   
- **Post lost support \- [empathy.com](http://empathy.com)**   
- **Plan and family operation system \-  [https://www.trustworthy.com](https://www.trustworthy.com)**  
- **Legal documents generation \- [https://mygoodtrust.com](https://mygoodtrust.com)**  
    
  