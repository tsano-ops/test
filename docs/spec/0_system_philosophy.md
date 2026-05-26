**0\. System Philosophy** 

PlanAfter is a **single-author, controlled-distribution system**.

* There is **exactly one authoritative editor**: the **PlanOwner**

* All other participants interact through:  
  * **suggestions**  
  * **view access**  
  * **task-based release actions**

* No role except PlanOwner can independently propagate content.

This model is designed for **legal safety, emotional integrity, and operational clarity**.  
---

**1\. Roles** 

**1.1 PlanOwner**

The sole authority and source of truth.

**Capabilities**

* Create, edit, delete all content  
* Content becomes active immediately on Save  
* Define all access, timing, events, and releases  
* Approve / reject suggestions  
* Assign unlimited Executors, Contributors, Beneficiaries  
* Revoke or modify access and future releases at any time

**Constraints**

* None

---

**1.2 Contributor**

A **temporary helper** operating in suggestion mode.  
**Capabilities**

* Suggest text  
* Upload files (as suggestions)  
* View content **only if explicitly allowed**

**Constraints**

* Always time-limited (default e.g. 15 days)  
* Scope-limited (specific section / record / card / entry)  
* No edit  
* No approve  
* No download  
* No share  
* Loses *all visibility* when access expires

**Suggestion Handling**

* Suggestions are:

  * not visible to others  
  * not part of the plan

* PlanOwner can:

  * approve → becomes PlanOwner content

  * reject → retained for audit (see §7.2)

**Edge cases**

* PlanOwner **always sees contributor attribution**  
* Contributor can be re-invited with a single action  
* On re-invite, contributor **does not regain past visibility**, only new scope

---

**1.3 Executor**

An **operator of the PlanOwner’s intent**, not a content owner.  
Executor is **not a super-user**.  
Executor capabilities are split into **three independent layers**:  
A) View Layer (optional)

* Executor may have view access if PlanOwner grants it

* Scope can be:

  * entire plan  
  * section  
  * category  
  * Record  
  * card  
  * entry

* Timing:

  * immediate  
  * date-based  
  * event-based  
  * post-mortem

Executor **does not automatically see emotional or private content**.

---

B) Suggestion Layer (optional)

* Executor **may also act as a Contributor**  
* No time limit  
* Still suggestion-only  
* Requires PlanOwner approval  
* No edit rights

---

C) Task & Release Layer (core executor role)  
Executor receives **system-generated tasks**.  
**Executor Tasks**

* Are created automatically by the platform  
* Are defined exclusively by PlanOwner  
* Can be:

  * post-mortem  
  * event-based  
  * date-based

**Release Tasks**

* Allow Executor to **release access to a beneficiary**

* Executor:

  * presses a button  
  * confirms an event

* Executor:

  * ❌ cannot view the content  
  * ❌ cannot open files  
  * ❌ cannot read messages or watch videos

* This is **delivery without disclosure**

Executor may release content **even if they do not have view access to it**.  
---

1.4 Beneficiary  
A **passive recipient**.  
**Capabilities**

* View only  
* Download only if explicitly allowed

**Constraints**

* No edit  
* No suggest  
* No tasks  
* No share  
* No release actions

Access is delivered:

* by email

* via secure link

* exactly scoped

* exactly timed

---

2\. Sharing, Transfer, Download Rules (Locked)  
2.1 Sharing

* **Only PlanOwner can share content**

* Sharing \= granting access rights

* No exceptions

2.2 Transfer / Release

* Only Executors can release content

* Only via predefined tasks

* Executor cannot choose recipients or content

* Executor cannot re-share

2.3 Download

| Role | Download |
| ----- | ----- |
| PlanOwner | Yes |
| Contributor | No |
| Executor | Yes, if allowed |
| Beneficiary | Yes, if allowed |

Downloaded content **cannot be re-shared via the platform**.  
---

3\. What “Access” Means in PlanAfter  
Access in PlanAfter is **object-based**, **hierarchical**, and **conditional**.  
It is evaluated across **three distinct layers**:  
3.1 Existence Visibility  
“Does this thing exist for me?”

* A user sees an object **only if PlanOwner shared it**

* No phantom or placeholder items

* If something is not shared → it does not exist in UI

---

3.2 Readable Access  
“Can I open it?”

* Requires explicit view permission

* Applies to:

  * all  
      
  * section

  * category

  * record

  * card

  * entry

---

3.3 Action Access  
“Can I do something with it?”  
Possible actions:

* suggest

* release

* download

Actions are **independent of view**.  
Example:

* Executor can release an entry without being able to read it.

---

4\. Structural Layers of Access (Hierarchy)  
Access can be granted at any level:

1. **Section**  
    e.g. *Me, Family & Network*  
     
2. **Category / Subcategory**  
    e.g. *My Family*  
     
3. **Record**  
    e.g. *Person C*

4. **Card**  
    e.g. *Essential Info* 

5. **Entry**  
    e.g. *Birth Certificate.pdf*

---

5\. Record-Driven Visibility Rules (Explicit)

* Sections with **no records** do not appear

* Sections with records appear **only with accessible records**

* Records appear individually

Example  
PlanOwner has three family members:

* Person A

* Person B

* Person C

If Beneficiary has access to **Person C only**:

* They see **My Family**

* Inside it, they see **only Person C**

* Person A and B do not exist for them

---

6\. Access Inheritance & Conflict Resolution (Locked)  
6.1 Inheritance Rules

* Access is inherited downward:

  * Section → Category → Record → Card → Entry

* Granting access at a higher level includes:

  * all existing children

  * all future children

Example:

* Record access → all cards & future cards & entries

---

6.2 Conflict Rules (Critical)

1. **More specific overrides less specific**

2. **Deny overrides allow**

3. **Release permission is independent from view permission**

Checkbox logic (PlanOwner UI mental model)

* If a parent is checked → all children are checked

* If a child is unchecked → parent becomes partially checked

* Access state reflects the most specific setting

---

7\. Audit, Proof & Legal Traceability  
7.1 What Is Logged (Immutable)  
The system must log:

* who approved content

* who rejected content

* who released access

* when access was delivered

* whether Executor completed or ignored a task

* contributor attribution

All logs are:

* timestamped

* immutable

* legally defensible

---

7.2 Rejected Suggestions (Recommendation)  
**Recommended implementation:**

* Rejected suggestions are retained

* Visible only to PlanOwner

* Used for:

  * audit

  * dispute resolution

  * executor protection

This strengthens legal credibility.  
---

8\. Revocation & Failure Scenarios  
Executor inactivity

* Platform sends reminders

* Tasks remain pending

Executor unavailable or deceased

* PlanOwner can assign **multiple Executors**

* Tasks can be reassigned automatically or manually

Revoking future releases

* PlanOwner can cancel or modify any future release

* Changes apply immediately

---

9\. Role Combinations (Explicit)

* A person can hold **multiple roles simultaneously**

* Roles **do not stack permissions**

* Each role grants **independent capability sets**

Example:

* Executor \+ Beneficiary

* Executor \+ Contributor

Permissions are evaluated per role context, not merged.  
---

10\. Backend-Level Definitions (Signaled)  
Canonical Enums (Examples)  
RoleType:  
\- PLAN\_OWNER  
\- CONTRIBUTOR  
\- EXECUTOR  
\- BENEFICIARY

AccessLevel:  
\- SECTION  
\- CATEGORY  
\- RECORD  
\- CARD  
\- ENTRY

AccessAction:  
\- VIEW  
\- SUGGEST  
\- RELEASE  
\- DOWNLOAD

TriggerType:  
\- IMMEDIATE  
\- DATE  
\- EVENT  
\- POST\_MORTEM

TaskStatus:  
\- PENDING  
\- COMPLETED  
\- EXPIRED  
\- REASSIGNED

Object Identification

* Every object (record, card, entry) has a unique internal ID

* Access rules reference object IDs, not UI paths

Evaluation Model

* Access rules are evaluated **dynamically**

* No permission is assumed or cached without validation

1. Me, My Family & Network  
   1. My Profile  
      1. Overview  
         1. Essential Info  
            1. Document Entry A (if generated)  
            2. Document Entry B (if generated)  
         2. Contact Info  
            1. Document Entry A (if generated)  
            2. Document Entry B (if generated)  
         3. Family & Relationships  
            1. Document Entry A (if generated)  
            2. Document Entry B (if generated)  
         4. Medical Info  
            1. Document Entry A (if generated)  
            2. Document Entry B (if generated)  
         5. Education  
            1. Document Entry A (if generated)  
            2. Document Entry B (if generated)  
         6. Employment & Affiliations  
            1. Document Entry A (if generated)  
            2. Document Entry B (if generated)  
         7. Beliefs, Hobbies & Interest   
            1. Document Entry A (if generated)  
            2. Document Entry B (if generated)  
      2. Document Entries (if this is marked, all other individual entries in each of the card are also marked. If, for example 1.1.1.7.1 is unmarked, the remaining individual entries from each card remain marked, but 1.1.2 itself gets unmarked as technically not all entries are marked. Similarly, if the user marks all the entries individually from the cards above, then 1.1.2 gets marked automatically)  
      3. Album (all marked ones)  
      4. Life Story   
         1. Life Story Entry A  
         2. Life Story Entry B  
      5. Memorial (whole tab)  
   2. My Family (same access levels as 1.1)  
      1. Profile A  
      2. Profile B   
   3. My Network (same access levels as 1.1)  
      1. Profile A  
         1. Essential Info  
            1. Document Entry A (if generated)  
            2. Document Entry B (if generated)  
         2. Contact Info  
            1. Document Entry A (if generated)  
            2. Document Entry B (if generated)  
      2. Profile B  (same as 1.3.1)  
2. My Plan  
   1. Assets & Liabilities  
      1. Assets  
         1. Financial Accounts & Instruments  
            1. Bank Accounts  
               1. Bank Account A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Ownership  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Related Services  
                        1. Related Services A (Document Entry A (if generated) \+ Document Entry B (if generated))  
                        2. Related Services B (Document Entry A (if generated) \+ Document Entry B (if generated))  
                  2. Document Entries  
                  3. Credentials  
                     1. Credential A  
                     2. Credential B  
               2. Bank Account B  
            2. Investments  
               1. Investment A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Ownership  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Related Services  
                        1. Related Services A (Document Entry A (if generated) \+ Document Entry B (if generated))  
                        2. Related Services B (Document Entry A (if generated) \+ Document Entry B (if generated))  
                  2. Document Entries  
                  3. Credentials  
                     1. Credential A  
                     2. Credential B  
               2. Investment B   
            3. Retirement Accounts  
               1. Retirement Account A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Ownership  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Related Services  
                        1. Related Services A (Document Entry A (if generated) \+ Document Entry B (if generated))  
                        2. Related Services B (Document Entry A (if generated) \+ Document Entry B (if generated))  
                  2. Document Entries  
                  3. Credentials   
                     1. Credential A  
                     2. Credential B  
               2. Retirement Account B  
            4. Life Insurance  
               1. Life Insurance A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Ownership  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Related Services  
                        1. Related Services A (Document Entry A (if generated) \+ Document Entry B (if generated))  
                        2. Related Services B (Document Entry A (if generated) \+ Document Entry B (if generated))  
                  2. Document Entries  
                  3. Credentials  
                     1. Credential A  
                     2. Credential B  
                  4.   
               2. Life Insurance B  
            5. Cash at Home / Safe  
               1. Cash at Home / Safe A  
                  1. Overview  
                     1. Basic Info   
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credential A  
                     2. Credential B  
               2. Cash at Home / Safe B   
            6. Other Financial Assets  
               1. Other Financial Asset A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Ownership  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Related Services  
                        1. Related Services A (Document Entry A (if generated) \+ Document Entry B (if generated))  
                        2. Related Services B (Document Entry A (if generated) \+ Document Entry B (if generated))  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Other Financial Asset B  
         2. Crypto & Blockchain   
            1. Crypto & Blockchain A  
               1. Overview  
                  1. Basic Info  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  2. Ownership  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  3. Related Services  
                     1. Related Services A  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Related Services B  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
               2. Document Entries  
               3. Credentials  
                  1. Credentials A  
                  2. Credentials B  
            2. Crypto & Blockchain B  
         3. Real Estate  
            1. Real Estate A   
               1. Overview  
                  1. Basic Info  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  2. Ownership  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  3. Mortgage Details  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  4. Insurance Details  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  5. Utilities  
                     1. Utility A  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Utility B   
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  6. Related Services  
                     1. Related Service A  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Related Service B  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
               2. Document Entries  
               3. Credentials  
                  1. Credentials A  
                  2. Credentials B  
            2. Real Estate B  
         4. Vehicles   
            1. Vehicle A  
               1. Overview  
                  1. Basic Info  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  2. Ownership  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  3. Insurance  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  4. Warranty  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  5. Related Services  
                     1. Related Services A  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Related Services B  
               2. Document Entries  
               3. Credentials  
            2. Vehicle B  
         5. Digital & Online   
            1. Domains  
               1. Domain A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Ownership  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Related Services  
                        1. Related Services A (Document Entry A (if generated) \+ Document Entry B (if generated))  
                        2. Related Services B (Document Entry A (if generated) \+ Document Entry B (if generated))  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Domain B  
            2. Loyalty Points & Gift Cards  
               1. Points & Cards A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Ownership  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Points & Cards B  
            3. In-app Credits  
               1. Credits A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Ownership  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Credits B  
            4. Online Accounts  
               1. Online Account A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Ownership  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Related Services  
                        1. Related Services A (Document Entry A (if generated) \+ Document Entry B (if generated))  
                        2. Related Services B (Document Entry A (if generated) \+ Document Entry B (if generated))  
                  2. Document Entries  
                  3. Credentials   
                     1. Credentials A  
                     2. Credentials B  
               2. Online Account B  
         6. Personal Property  
            1. Personal Property A  
               1. Overview  
                  1. Basic Info  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  2. Ownership  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  3. Insurance  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  4. Related Services  
                     1. Related Service A  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Related Service B  
                  5. Warranty  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
               2. Document Entries  
               3. Credentials   
                  1. Credentials A  
                  2. Credentials B  
            2. Personal Property B  
         7. Business   
            1. Business A  
               1. Overview  
                  1. Basic Info  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  2. Ownership  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  3. Insurance  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  4. Related Services  
                     1. Related Service A  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Related Service B  
               2. Document Entries  
               3. Credentials  
                  1. Credentials A  
                  2. Credentials B  
            2. Business B  
         8. Intellectual Property  
            1. Intellectual Property A  
               1. Overview  
                  1. Basic Info  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  2. Ownership  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  3. Related Services  
                     1. Related Service A  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Related Service B  
               2. Document Entries  
               3. Credentials  
                  1. Credentials A  
                  2. Credentials B  
            2. Intellectual Property B  
         9. Other Assets  
            1. Other Asset A  
               1. Overview  
                  1. Basic Info  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  2. Ownership  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  3. Insurance  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  4. Warranty  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  5. Mortgage  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  6. Utilities   
                     1. Utilities A  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Utilities B  
                  7. Related Services  
                     1. Related Service A  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Related Service B  
               2. Document Entries  
               3. Credentials  
                  1. Credentials A  
                  2. Credentials B  
            2. Other Asset B  
      2. Liabilities   
         1. Financial Debts and Loans  
            1. Mortgage  
               1. Mortgage A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Ownership  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Collateral  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Servicer Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Related Services  
                        1. Related Services A (Document Entry A (if generated) \+ Document Entry B (if generated))  
                        2. Related Services B (Document Entry A (if generated) \+ Document Entry B (if generated))  
                  2. Document Entries  
                  3. Credentials  
               2. Mortgage B  
            2. Consumer / Personal Loan  
               1. Consumer/Personal Loan A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Borrower & Other Parties  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Terms & Payments  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Collateral  
                        1. Collateral A (Document Entry A (if generated) \+ Document Entry B (if generated))  
                        2. Collateral B (Document Entry A (if generated) \+ Document Entry B (if generated))  
                        3.   
                     5. Insurance  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     6. Servicer Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     7. Online Access  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Consumer/Personal Loan B  
            3. Business Loan  
               1. Business Loan A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Borrower & Other Parties  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Terms & Payments  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Collateral   
                        1. Collateral A (Document Entry A (if generated) \+ Document Entry B (if generated))  
                        2. Collateral B   
                        3.   
                     5. Covenants  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     6. Servicer Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     7. Online Access  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Business Loan B  
            4. Credit Card Debt  
               1. Credit Card A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Terms & Payments  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Rates & Fees  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Balance & Limits  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Rewards  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     6. Online Access  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     7. Disputes & Chargebacks  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Credit Card B  
            5. Leasing Agreement  
               1. Leasing Agreement A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Parties   
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Asset Details  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Terms & Payments  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Insurance   
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     6. Fees & Penalties  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     7. Online Access  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials   
                     1. Credentials A  
                     2. Credentials B  
               2. Leasing Agreement B  
            6. Private Loan  
               1. Private Loan A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Parties  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Terms & Payments  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Collateral  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Online Access  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Private Loan B  
            7. Lines of Credit  
               1. Line of Credit A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Parties  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Terms & Payments  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Rates & Limits  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Collateral  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     6. Servicer Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     7. Online Access  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Line of Credit B  
            8. Co-signed Loans or Guarantees  
               1. Co-signed Loan/Guarantee A  
                  1. Overview   
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Parties  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Underlying Loan  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Guarantee / Co-sign Terms  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Collateral & Liens  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     6. Notifications & Defaults  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     7. Online Access  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Co-signed Loan/Guarantee B  
            9. Other Financial Liability  
               1. Other Financial Liability A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Parties  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Terms & Amounts  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Rates & Fees  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Collateral  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     6. Online Access  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Other Financial Liability B  
         2. Outstanding Bills & Ongoing Expenses  
            1. Medical Bills  
               1. Medical Bill A  
                  1. Overview   
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Patient & Providers  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Bill Details  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Insurance & Claims  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Payment Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     6. Online Access  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Medical Bill B  
            2. Utility Bills  
               1. Utility Bill A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Service Provider  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Billing  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Current Charges & Balance  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Payment Plan  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     6. Online Access  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Utility Bill B  
            3. Rent  
               1. Rent A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Parties  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Terms  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Rent & Payments  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Online Access  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials   
                     1. Credentials A  
                     2. Credentials B  
               2. Rent B  
            4. Subscriptions & Memberships  
               1. Subscription/Membership A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Provider & Plan  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Billing & Cycle  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Payment Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Access & Authentication  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     6. Cancellation & Renewal  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Subscription/Membership B  
            5. Insurance Payments  
               1. Insurance Payment A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Policy & Provider  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Coverage & Beneficiaries  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Premiums & Payment Schedule  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Claims & Support  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     6. Renewal & Cancellation  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     7. Online Access  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Insurance Payment B  
            6. Elder or Home Care Services  
               1. Elder/Home Care Service A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Provider Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Service Details  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Costs & Billing  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Payment Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     6. Insurance/Benefits  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     7. Online Access  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Elder/Home Care Service B  
            7. Service Provider Fees  
               1. Service Provider Fee A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Provider Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Billing & Invoicing   
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Payments Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Renewal & Cancellation  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     6. Online Access  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Service Provider Fee B  
            8. Other Recurring or Unpaid Expenses  
               1. Other Recurring/Unpaid Expense A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Provider/Payee Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Payments Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Online Access  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Other Recurring/Unpaid Expense B  
         3. Legal & Tax Liabilities   
            1. Unpaid Taxes  
               1. Unpaid Tax A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Tax Authority & Details  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Tax Period & Assessment  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Payment Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Contacts & Representation  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Unpaid Tax B  
            2. Tax Repayment Plans  
               1. Tax Repayment Plan A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Tax Authority & Details  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Plan Terms  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Repayment Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Contacts & Representations  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Tax Repayment Plan B  
            3. Court Judgments and Fines  
               1. Court Judgment and Fines A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Case & Court Details  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Parties & Representation  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Payment Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Court Judgment and Fines B  
            4. Alimony or Child Support  
               1. Alimony/Child Support A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Court Order Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Parties & Beneficiaries  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Payments Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Alimony/Child Support B  
            5. Liens, Seizures or Freeze Orders  
               1. Lien/Seizure/Freeze Order A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Issuing Authority  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Affected Assets  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Amounts & Secured Claims  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     5. Enforcement Actions & Restrictions  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     6. Contacts & Representation  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials  
                     1. Credentials A  
                     2. Credentials B  
               2. Lien/Seizure/Freeze Order B  
            6. Other Legal Liability  
               1. Other Legal Liability A  
                  1. Overview  
                     1. Basic Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     2. Legal Basis & Details  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     3. Parties & Representation  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                     4. Payment Info  
                        1. Document Entry A (if generated)  
                        2. Document Entry B (if generated)  
                  2. Document Entries  
                  3. Credentials   
                     1. Credentials A  
                     2. Credentials B  
               2. Other Legal Liability B  
         4. Other Liabilities  
            1. Other Liability A  
               1. Overview  
                  1. Basic Info  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  2. Parties  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  3. Payment Info  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
                  4. Collateral  
                     1. Document Entry A (if generated)  
                     2. Document Entry B (if generated)  
               2. Document Entries  
               3. Credentials  
                  1. Credentials A  
                  2. Credentials B  
            2. Other Liability B  
   2. Emotional Legacy  
      1. Psychological Support  
      2. Life Reflection  
         1. Year In Review  
         2. Ethical Will  
      3. Family Tree & Story  
      4. Letters to Loved Ones  
         1. Letter to Loved Ones A  
         2. Letter to Loved Ones B  
   3. Body & Health  
      1. In Case of Emergency  
      2. Getting Old  
      3. When I’m Gone  
   4. Goals & Aspirations  
      1. Annual Goals   
         1. Annual Goal A  
         2. Annual Goal B  
      2. Dreams & Aspirations  
         1. Dream & Aspiration A  
         2. Dream & Aspiration B  
   5. Will & Legal Actions  
      1. Will   
      2. Trust   
         1. Trust A  
         2. Trust B  
      3. Power Of Attorney  
         1. PoA A  
         2. PoA B  
      4. Guardianship Declaration  
      5. Advanced Directive  
3. Post-Loss Support  
4. Vault  
5. Task & Reminders

# **PlanAfter — Ролеви модел и нива на достъп**

## **Финален синтез v3: UX Спецификация \+ Архитектура \+ Бизнес правила**

---

## **1\. Фундаментални принципи**

### **1.1 Роли ≠ Хора — множество роли per person**

Един човек може да натрупва множество роли в един план. Съпругът може едновременно да бъде Beneficiary, Executor и Contributor. Ролите не са взаимно изключващи се — те се акумулират.

### **1.2 Розетският камък — формулата за определяне на роля**

| Условие | Роля |
| ----- | ----- |
| **Access \+ Task** към директория,категоря,  рекърд, card/entry, таб | Contributor или Executor,  |
| **Access без Task** към директория,категоря,  рекърд, card/entry, таб | Beneficiary или Executor |
| **Task без Access** към директория,категоря,  рекърд, card/entry, таб | Executor |

Тази формула е ядрото на целия permission model — тя определя как system-ът категоризира всяко assignment.

### **1.3 Само PlanOwner редактира**

Никой друг освен PlanOwner не може да прави директни промени. Contributor-ите предлагат (suggestive mode), PlanOwner одобрява. Executor вижда метаданни, но не и съдържание (освен ако не е и Beneficiary).

### **1.4 Single source of truth**

* Person Records — авторитетни, referenced навсякъде  
* Role/Access assignments — един shared model между Card VIII и Settings  
* Linked Summary Cards — read-only projections, никога не притежават данни  
* Промени в Card VIII ↔ Settings — **двупосочна** синхронизация

---

## **2\. Трите роли — capabilities и timing**

### **2.1 Матрица на действията**

| Actions | Beneficiary | Contributor | Executor |
| ----- | ----- | ----- | ----- |
| **Access to Platform** |  |  |  |
| Preview Documents | ✓ | ✓ | — |
| Download/Print Documents | ✓ | ✓ | — |
| Suggest Changes | ✗ | ✓ | — |
| **Tasks** |  |  |  |
| Suggestion Tasks | — | ✓ | — |
| Post-Mortem Activation Tasks | — | — | ✓ |
| Beneficiary Access Tasks (Event Based) | — | — | ✓ |
| Post-Mortem Tasks | ✓ | — | ✓ |
| **Accounts in Platform** | ✓ | ✓ | ✓ |

### **2.2 Матрица на timing**

| When is access granted? | Beneficiary | Contributor | Executor |
| ----- | ----- | ----- | ----- |
| **Immediately** | ✓ | ✓ | — |
| **Post-Mortem** | ✓ | — | ✓ |
| **On Specific Date** | ✓ | — | — |
| **On Specific Event** | ✓ | — | — |

### **2.3 Характеристики по роля**

**Beneficiary — "Получателят"**

* Read-only достъп (Preview \+ Download, без Suggest Changes)  
* Най-гъвкав по timing — всичките 4 варианта  
* Получава Post-Mortem Tasks (напр. "Get this document court-approved to receive my car")  
* Scope: конкретни items (досиета, карти, ентрита) или цял запис

**Contributor — "Помощникът"**

* Read \+ Suggest Changes (suggestive mode — PlanOwner одобрява)  
* Получава Suggestion Tasks приживе на PlanOwner  
* Достъп САМО Immediately — няма Post-Mortem, Date, Event  
* Scope: обвързан с конкретна задача и granted items

**Executor — "Ключарят"**

* НЯМА достъп до съдържание (Preview/Download) — нито преди, нито след смъртта  
* ВИЖДА метаданни: заглавие, описание, кога да достави, на кого  
* Достъп САМО Post-Mortem  
* Получава 3 типа задачи: Post-Mortem Activation, Beneficiary Access (event-based), Post-Mortem Tasks  
* Отключва врати, зад които не е влизал (освен ако не е и Beneficiary)

---

## **3\. Четирите типа задачи**

### **A. Suggestion Tasks (Contributor tasks)**

* **Кога:** Приживе на PlanOwner  
* **Кой:** Contributor  
* **Какво:** Добавяне, обновяване, подобряване на информация в платформата  
* **Примери:** "Upload a missing document", "Update my cousin's contact information"  
* **Approval:** Всички промени са suggestive — PlanOwner одобрява преди да станат permanent  
* **Достъп:** Temporary Access To (hierarchical multi-select от Card IX)

### **B. Post-Mortem Activation Tasks (Executor tasks)**

* **Кога:** След смъртта на PlanOwner  
* **Кой:** Executor  
* **Какво:** Активиране на плана и отключване на достъп  
* **Примери:** "Grant platform access to the pre-approved list of people (Beneficiaries)"  
* **Trigger:** Death confirmation от Executor

### **C. Beneficiary Access Tasks (Executor-triggered, event-based)**

* **Кога:** При настъпване на реално събитие (не фиксирана дата)  
* **Кой инициира:** Executor  
* **Какво:** Отключване/доставка на конкретни items при събитие  
* **Примери:** "Send this video to my daughter on her wedding day", "Give this document to my grandson when he starts driving"  
* **Потвърждаване на събитие:** Два механизма — Executor потвърждава ръчно ИЛИ Beneficiary заявява \+ Executor одобрява  
* **Delivery:** Beneficiary получава email → регистрира се в PlanAfter → има достъп  
* **Нюанс:** Executor вижда метаданни (заглавие, описание, кога, на кого) но НЕ и съдържанието

### **D. Post-Mortem Tasks (Executor и/или Beneficiary)**

* **Кога:** След смъртта на PlanOwner  
* **Кой:** Executor, Beneficiary, или и двамата — зависи от действието  
* **Примери:**  
  * *(Executor)* "Cancel my Netflix and Spotify subscriptions"  
  * *(Beneficiary)* "Get this document court-approved to receive my car"

---

## **4\. Акаунти и upgrade path**

### **4.1 Безплатни акаунти (поканени потребители)**

Всеки поканен потребител (Beneficiary, Executor, Contributor или комбинация) получава безплатен акаунт в PlanAfter. Този акаунт му дава:

* Достъп до задачите и данните, които PlanOwner му е предоставил  
* Преглед на чуждите планове, в които участва, през **Plans Shared With Me** на dashboard-а

### **4.2 Upgrade до PlanOwner**

Всеки безплатен акаунт може по всяко време да се upgrade-не до PlanOwner — създава свой собствен план. Информацията от чуждите планове (ролите, достъпа) продължава да се вижда през Plans Shared With Me.

### **4.3 Flow: Покана → Регистрация → Достъп**

1. PlanOwner assign-ва роля/задача → Send Invitation (email)  
2. Получател кликва линк → регистрира се (безплатен акаунт)  
3. Акаунтът се свързва с role assignment-а  
4. Потребителят вижда данните спрямо granted scope и timing  
5. По желание → Upgrade до PlanOwner (собствен план)

---

## **5\. Access Levels (три типа)**

Дефинирани в Card X (Shared With) и Card VIII (Roles and Access):

### **5.1 Read-Only Access (оранжев tag)**

* Вижда granted items, не може да предлага промени  
* Типична Beneficiary роля

### **5.2 Contributor Suggestive Access (син tag)**

* Вижда granted items \+ може да предлага промени  
* Всички промени минават през PlanOwner approval  
* Типична Contributor роля

### **5.3 Release Task Access (зелен tag)**

* Временен, task-scoped достъп  
* Обвързан с конкретна задача  
* Управляван от PlanOwner (може да удължи, прекъсне, промени)  
* При промени → email \+ in-app notification до assignee  
* Типична Executor роля (Task без Access → вижда само метаданни)  
* Ако е избран в Card X, появява се допълнително поле "Specific Task"

---

## **6\. Permission Scope — Data Access Tree**

### **6.1 Пълният списък на достъпни items (от документацията)**

```
1. Me, My Family & Network
   1.1. My Profile
        1.1.1. Overview
               1.1.1.1. Essential Info
                        + Document Entry A, B (if generated)
               1.1.1.2. Contact Info
                        + Document Entry A, B (if generated)
               1.1.1.3. Family & Relationships
                        + Document Entry A, B (if generated)
               1.1.1.4. Medical Info
                        + Document Entry A, B (if generated)
               1.1.1.5. Education
                        + Document Entry A, B (if generated)
               1.1.1.6. Employment & Affiliations
                        + Document Entry A, B (if generated)
               1.1.1.7. Beliefs, Hobbies & Interests
                        + Document Entry A, B (if generated)
               1.1.2. Document Entries (master toggle — all individual entries)
               1.1.3. Album
        1.1.2. Life Story
               + Life Story Entry A, B
        1.1.3. Memorial (whole tab)
   1.2. My Family (same access levels as 1.1)
        Profile A, Profile B...
   1.3. My Network (same access levels as 1.1)
        Profile A (Essential Info, Contact Info + entries), Profile B...

2. My Plan
   2.1. Assets & Liabilities
        2.1.1. Assets (15 categories, each with sub-types)
               Per asset: Overview → Basic Info, Ownership, Related Services,
                          Document Entries, Credentials
        2.1.2. Liabilities (4 groups, 25+ sub-types)
               Per liability: Overview → Basic Info, Parties, Terms,
                              Collateral, Insurance, Online Access,
                              Document Entries, Credentials
   2.2. Emotional Legacy
        Psychological Support, Life Reflection, Year In Review,
        Ethical Will, Family Tree & Story, Letters to Loved Ones
   2.3. Body & Health
        In Case of Emergency, Getting Old, When I'm Gone
   2.4. Goals & Aspirations
        Annual Goals, Dreams & Aspirations
   2.5. Will & Legal Actions
        Will, Trust(s), Power of Attorney, Guardianship Declaration,
        Advanced Directive
   2.6. Post-Loss Support
   2.7. Vault
   2.8. Tasks & Reminders
```

### **6.2 Scope selection механизъм**

**Card VIII (Edit Mode):**

* Permission Scope dropdown: Full Access / Partial Access  
* Ако Partial → гранулирани checkboxes/toggles за всеки item от дървото  
* Ако човек има Role Tasks и PlanOwner промени scope-а → warning modal: "Changing the permission scope could affect the ability of the user to complete the assigned tasks. Are you sure you want to proceed?"

**Card X (Add New Share, Step 3):**

* Full Record Access (master toggle — disable-ва individual checkboxes)  
* Partial: per card, per document entry  
* PlanOwner може да даде достъп само до конкретен document entry, а не до цялата карта

### **6.3 Document Entries — cascade logic**

Ако всички individual entries в картите са маркирани → "Document Entries" (1.1.2) се маркира автоматично. Ако дори едно е unmаrkирано → 1.1.2 се unmark-ва, но останалите individual entries остават marked.

---

## **7\. UI — Card VIII: "Roles and Access in Your Plan"**

### **7.1 Card States**

**Collapsed:**

* Title: "Roles and Access in Your Plan"  
* Subtitle: "The place to manage other roles and access."  
* Caret (˅), без preview rows

**Expanded (Read Mode):**

* Narrative paragraph  
* Edit icon (top-right)  
* Roles & Access list (Linked Row Cards)

**Expanded (Edit Mode):**

* Narrative \+ Edit icon (active)  
* Row list (all visible)  
  * Add person/role/access button

### **7.2 Linked Role & Access Row Card**

**Collapsed Row (always visible):**

```
┌──────────────────────────────────────────────────────────────┐
│                                       Executor, Beneficiary  │
│  [Avatar●]  John Johnson                              ⋯     │
│             Your Husband  •  Since Sep 28, 2005              │
│             July 4, 1978 (Age 47)                            │
│                                                              │
│  Status: "Access Inactive · Post-Mortem Unlock"              │
│                                          [Read-Only] tag     │
└──────────────────────────────────────────────────────────────┘
```

**Left block:**

* Avatar \+ Life Status dot  
* Full name  
* Plan role label(s): "Executor, Beneficiary" (акумулирани, comma-separated)  
* Status line patterns:  
  * "Access Active · Expires in 7 days"  
  * "Access Inactive · Post-Mortem Unlock"  
  * "Access Pending · Expires in 15 days"  
  * "Access Inactive · Specific Date unlock"  
  * "Access Rejected · Rejected on 18/12/2005"  
  * "Access Revoked · Revoked on 20/12/2005"

**Right block:**

* Access tag: Contributor Suggestive Access (blue) / Read-Only (orange) / Release Task Access (green)

**Far-right:**

* ⋯ menu → Edit, Open Record, Revoke Access

### **7.3 Expanded Row (click on row body) — Data Access Summary**

**Съдържание:**

1. **Data Access Summary** — structured hierarchy на ефективния достъп:

   * Categories → Sub-categories → Sections → Cards → Entries  
   * Read-only, derived от role/access assignment  
   * Ако няма активен достъп: "No active access yet." / "Access will become active when the activation conditions are met."  
2. **Role Tasks** — секции по роля (показват се само релевантните):

   * Contributor's Tasks  
   * Executor's Tasks  
   * Beneficiary's Tasks  
   * Подредба: Contributor → Executor → Beneficiary  
   * Ако секция няма tasks → не се показва  
   * Ако човек има само една роля → само тази секция

**Interaction rules:**

* Inline expansion only (no modal, no navigation)  
* Само един ред expand-нат наведнъж  
* Click на ⋯ НЕ toggle-ва expansion  
* Smooth unfold animation

### **7.4 Edit Mode — Editable Role & Access Panel**

**Entry points:**

* Pencil icon (top-right) — card-level edit mode  
* ⋯ → Edit — row-specific edit

**Inline panel fields (top → bottom):**

| \# | Field | Type | Options |
| ----- | ----- | ----- | ----- |
| 1 | Access Level | Dropdown, single-select | Read-Only / Contributor Suggestive / Release Task |
| 2 | Permission Scope | Dropdown, single-select | Full Access / Partial Access |
| 2a | (if Partial) | Multi-select checkboxes | Full hierarchical tree (Section 6.1) |
| 2b | (if has Tasks \+ scope change) | Warning modal | "Changing scope could affect tasks. Proceed?" |
| 3 | When is access granted? | Dropdown, single-select | Immediately / Specific Date / Post-Mortem |
| 3a | (if Specific Date) | Date selector | Day (1-31) / Month (Jan-Dec) / Year (2026-2056) |
| 4 | Notes & Instructions | Multiline free text | Shared with assignment object |
| — | Controls | Buttons | Save / Cancel (X) |

**Single-edit rule:** само един ред може да се редактира наведнъж. При unsaved changes → Unsaved Changes warning.

**Save propagation:** обновява Card VIII, Settings → Manage Access and Roles, Access Summary, всички свързани surfaces. Двупосочна синхронизация.

### **7.5 Revoke Access**

* Entry: ⋯ → Revoke Access  
* Inline confirmation (не modal): "This will remove this person's access to your plan. Their person record will not be deleted."  
* Buttons: Cancel (X) / Revoke Access (destructive)  
* На confirm: row изчезва, access се отнема навсякъде  
* НИКОГА не изтрива: person record, files, documents

### **7.6 Add New Role & Access Assignment**

* Link existing person (My Family / My Network)  
* Или Create New (Person Record Quick Creation — TYPE A: My Network / TYPE B: My Family)  
* Assign role \+ access level \+ scope \+ timing

### **7.7 No-duplication rule**

Ако се опита дублиране на идентичен role/access assignment → inline error: "This role/access assignment already exists. Edit it instead."

---

## **8\. UI — Card IX: Tasks & Reminders (ключови моменти за ролевия модел)**

### **8.1 Suggestion Tasks (AI-generated, 2×2 grid)**

* 4 видими, dynamic replacement при accept/remove  
* Accept → prefills Add New Task form (Title, Notes, Assignee \= "Me")

### **8.2 Task Row Card — collapsed**

* Priority color bar | Done toggle | Title | Subtitle ("Assigned to: \[Name\] · Due: \[Date\]") | ⋯ menu | Chevron

### **8.3 Task Row Card — expanded (read view)**

* Assigned To (linked summary cards)  
* Status: In Progress / Rejected by \[Name\] (+ reason) / Invitation sent, awaiting reply (+ Resend button)  
* Due Date  
* Priority (High/Medium/Low) — само за tasks assigned to Me  
* Reminders (Repeats logic: Does Not Repeat / Daily / Weekly / Monthly / Annually / Custom)  
* **Temporary Access To** (delegated tasks only): hierarchical multi-select  
  * Full Record Access / Overview Tab / Life Story Tab / Memorialisation Tab / individual cards  
* Notes & Instructions  
* Rejection Reason (conditional)

### **8.4 Add New Task — conditional logic**

**Core fields (винаги):**

* Task Title (required)  
* Assigned To (dropdown: You / My Family / My Network / \+ Create New)  
* Due Date (calendar picker, default \= today)  
* Priority (dropdown — само за Assigned To \= You)

**Personal task fields (Assigned To \= You):**

* Repeats (Does Not Repeat / Daily / Weekly / Monthly / Annually / Custom)  
* Ends (Never / On date / After X occurrences)

**Delegated task fields (Assigned To ≠ You):**

* Temporary Access To (hierarchical multi-select)  
* Inherited Access Exemption: hidden ако assignee вече има full access  
* Hierarchical selection: parent → auto-selects children

### **8.5 Task invitation flow**

1. Assign task → "Send Task Invitation" modal  
2. Recipient Email \+ Subject \+ prefilled Message  
3. On Send → invitation timestamp, task → active pending  
4. Assignee кликва линк → регистрация → достъп до задачата

### **8.6 Proposed Changes rule**

Всички updates от assignee (upload, fill info, change field) са **suggested changes**. PlanOwner трябва да review-не и explicitly accept-не. Нищо не се apply-ва автоматично.

---

## **9\. UI — Card X: Shared With (ключови моменти за ролевия модел)**

### **9.1 Shared Contact Row — collapsed header**

* Avatar \+ Full name \+ Specific Role \+ Status line \+ Access tag \+ ⋯ menu  
* Същите status patterns и access tags като Card VIII

### **9.2 Shared Contact Row — expanded (read-only config summary)**

* Access Level: Read-Only / Contributor Suggestive / Release Task Access (+ Specific Task field)  
* Data Access Scope: Full Record Access / Partial (per card, per document entry)  
* Access Granted: Immediately / On Specific Date / Post-Mortem  
* Access Expiration Date  
* Invitation Status: Accepted (green) / Rejected (red) / Pending (yellow \+ Resend button)  
* Notes & Instructions

### **9.3 Add New Share — modal flow (5 steps)**

| Step | Field | Type |
| ----- | ----- | ----- |
| 1\. Select Contact | Searchable dropdown (My Family \+ My Network \+ Create New) | Person selection |
| 2\. Access Level | Radio: Read-Only / Contributor Suggestive / Release Task | Single select |
| 3\. Which Information? | Full Record Access (master toggle) OR per-card/per-entry checkboxes | Multi-select |
| 4\. When? | Radio: Immediately / Specific Date / Post-Mortem \+ Expiration Date | Single select \+ date |
| 5\. Notes | Free text | Textarea |

Modal actions: Cancel / Send Invitation

---

## **10\. Contributor auto-revocation и Task lifecycle**

### **10.1 Contributor достъп — lifecycle**

* Обвързан с **Due Date** на задачата (Card IX)  
* PlanOwner може по всяко време да: удължи, прекъсне, промени задачата  
* При промени → email \+ in-app notification до assignee  
* Temporary Access To scope може да се промени в Edit Mode на задачата

### **10.2 Release Task Access — lifecycle**

* Временен, task-scoped достъп  
* Управляван от PlanOwner (удължи / прекъсне / промени)  
* При промени в scope → warning ако има active tasks

### **10.3 Task edit propagation**

Всяка промяна на task details (title, dates, notes, priority, access scope, reassignment) → комуникирана на assignee чрез email \+ in-app notification.

---

## **11\. Event-based access — потвърждаване**

### **11.1 Два механизма за "On Specific Event"**

1. **Executor потвърждава ръчно** — Executor знае, че събитието е настъпило и trigger-ва delivery  
2. **Beneficiary заявява \+ Executor одобрява** — Beneficiary съобщава, Executor потвърждава

### **11.2 Delivery flow**

1. Executor потвърждава настъпването на събитието  
2. System изпраща email до Beneficiary  
3. Beneficiary кликва линк → регистрира се (ако не е вече) → получава достъп до съдържанието  
4. Достъпът е автоматичен след потвърждение — няма допълнителна стъпка

---

## **12\. Backend модел (обновен)**

### **12.1 Database Schema (concept)**

```
PersonRoleAssignment (множество per person per plan):
  - id: UUID
  - person_id: FK → Person Record
  - plan_id: FK → Plan
  - role: EXECUTOR | CONTRIBUTOR | BENEFICIARY
  - status: ACTIVE | PENDING_INVITATION | ACCEPTED | REJECTED | REVOKED
  - created_at, updated_at, created_by

RoleAccessGrant (per role assignment, определя scope):
  - id: UUID
  - assignment_id: FK → PersonRoleAssignment
  - access_level: READ_ONLY | CONTRIBUTOR_SUGGESTIVE | RELEASE_TASK
  - scope: FULL_RECORD | PARTIAL
  - scope_details: JSON (hierarchical tree — categories/cards/entries)
  - activation: IMMEDIATE | POST_MORTEM | SPECIFIC_DATE | SPECIFIC_EVENT
  - activation_date: nullable Date
  - activation_event: nullable String
  - expiration_date: nullable Date
  - specific_task: nullable String (ако RELEASE_TASK)
  - notes: text
  - status: ACTIVE | PENDING | EXPIRED | REVOKED

TaskAssignment:
  - id: UUID
  - plan_id: FK → Plan
  - record_id: FK → Record
  - assigned_to: FK → Person
  - task_type: SUGGESTION | POST_MORTEM_ACTIVATION | BENEFICIARY_ACCESS | POST_MORTEM
  - title: String
  - description: text
  - due_date: Date
  - priority: HIGH | MEDIUM | LOW (само за personal tasks)
  - repeats: JSON (recurrence config)
  - temporary_access_scope: JSON (hierarchical multi-select)
  - related_beneficiary_id: nullable FK → Person (за Beneficiary Access Tasks)
  - event_description: nullable String (за event-based)
  - invitation_status: NOT_SENT | SENT | ACCEPTED | REJECTED
  - invitation_sent_at: nullable DateTime
  - rejection_reason: nullable text
  - status: PENDING | ACTIVE | IN_PROGRESS | COMPLETED | REJECTED
  - metadata_visible: Boolean (true за Executor tasks без достъп до съдържание)

ProposedChange (suggestive mode):
  - id: UUID
  - task_id: FK → TaskAssignment
  - proposed_by: FK → Person
  - target_field: String (path to field)
  - proposed_value: JSON
  - status: PENDING_REVIEW | ACCEPTED | REJECTED
  - reviewed_by: FK → Person (PlanOwner)
  - reviewed_at: nullable DateTime
```

### **12.2 Access Resolution Algorithm**

```py
def resolve_access(person, item, plan):
    assignments = get_all_role_assignments(person, plan)
    effective_grants = []
    
    for assignment in assignments:
        grants = get_access_grants(assignment)
        for grant in grants:
            # Check timing gate
            if not is_activated(grant):
                continue
            # Check expiration
            if is_expired(grant):
                continue
            # Check if item is in scope
            if item_in_scope(item, grant.scope_details):
                effective_grants.append(grant)
    
    # Also check task-based temporary access
    task_grants = get_active_task_access(person, item)
    effective_grants.extend(task_grants)
    
    if not effective_grants:
        return AccessResult(can_view=False, can_view_metadata=False)
    
    # Determine capabilities (union of all active grants)
    can_view_content = any(
        g.access_level in [READ_ONLY, CONTRIBUTOR_SUGGESTIVE] 
        for g in effective_grants
    )
    can_view_metadata = any(
        g.access_level == RELEASE_TASK 
        for g in effective_grants
    ) or can_view_content
    can_suggest = any(
        g.access_level == CONTRIBUTOR_SUGGESTIVE 
        for g in effective_grants
    )
    
    return AccessResult(
        can_view_content=can_view_content,
        can_view_metadata=can_view_metadata,
        can_suggest=can_suggest,
        roles=[a.role for a in assignments],
        active_tasks=get_related_tasks(person, item)
    )
```

---

## **13\. Валидационни сценарии**

### **Сценарий 1: Съпруг с 3 роли**

**John Johnson — Your Husband — Executor, Beneficiary, Contributor**

| Роля | Item | Access | Timing | Task |
| ----- | ----- | ----- | ----- | ----- |
| Beneficiary | Essential Info | Read | Immediately | — |
| Beneficiary | Medical Info | Read | Immediately | — |
| Beneficiary | Assets (all) | Read | Post-Mortem | — |
| Beneficiary | Letter "To my love" | Read | Post-Mortem | — |
| Contributor | Contact Info | Read+Suggest | Immediately | "Update Dr. Petrov's address" |
| Executor | — | Metadata only | Post-Mortem | Report death |
| Executor | — | Metadata only | Post-Mortem | Grant access to Beneficiaries |
| Executor | Video за Мария | Metadata only | On Event (wedding) | Deliver video |
| Executor | Netflix/Spotify | Metadata only | Post-Mortem | Cancel subscriptions |

**UI Collapsed:** "Executor, Beneficiary, Contributor" \+ status \+ access tag **UI Expanded:** Data Access Tree \+ 3 Role Tasks sections

### **Сценарий 2: Дъщеря — само Beneficiary**

**Мария Иванова — Your Daughter — Beneficiary**

| Item | Access | Timing |
| ----- | ----- | ----- |
| Video "Wedding congratulations" | Read | On Specific Event (wedding) |
| Letter "To my daughter" | Read | Post-Mortem |
| 50% Apartment Sofia | Read | Post-Mortem |

**UI Collapsed:** "Beneficiary" \+ "Access Inactive · Post-Mortem Unlock"

### **Сценарий 3: Адвокат — Contributor**

**Mark Davis — Family Attorney — Contributor**

| Item | Access | Timing | Task |
| ----- | ----- | ----- | ----- |
| Will & Legal Actions | Read+Suggest | Immediately | "Review and update PoA" |

**UI Collapsed:** "Contributor" \+ "Access Active" \+ Contributor Suggestive Access (blue tag)

### **Сценарий 4: Executor доставя item без достъп до съдържание**

**John (Executor) трябва да достави видео на Мария:**

1. John вижда метаданни: "Video for Мария — deliver on wedding day, recorded Jan 2025"  
2. John НЕ вижда самото видео  
3. Мария се омъжва → John потвърждава (ръчно) ИЛИ Мария заявява \+ John одобрява  
4. System изпраща email до Мария  
5. Мария кликва линк → регистрация → достъп до видеото

### **Сценарий 5: Upgrade path**

**Emma — Beneficiary в плана на Sarah:**

1. Sarah assign-ва Emma като Beneficiary → Send Invitation  
2. Emma получава email → регистрира безплатен акаунт  
3. Emma вижда Sarah's план през Plans Shared With Me  
4. Emma решава да създаде свой план → Upgrade до PlanOwner  
5. Emma вече има 2 контекста: собствен план \+ роля в Sarah's план

---

## **14\. Решени въпроси (пълен лог)**

| \# | Въпрос | Решение |
| ----- | ----- | ----- |
| 1 | Viewer като роля? | ✅ Не съществува. Read-only \= Beneficiary access level |
| 2 | Contributor edit mode? | ✅ Винаги Suggestive. Само PlanOwner редактира |
| 3 | Един човек \= една роля? | ✅ Множество роли per person, акумулирани |
| 4 | Executor преди Post-Mortem? | ✅ Няма достъп, вижда само метаданни на tasks |
| 5 | Release Task Access? | ✅ Временен, task-scoped, PlanOwner управлява |
| 6 | Contributor auto-revocation? | ✅ Обвързан с Due Date \+ PlanOwner може ръчно |
| 7 | Executor upgrade path? | ✅ Всеки безплатен акаунт може да стане PlanOwner |
| 8 | Card VIII ↔ Settings sync? | ✅ Двупосочна синхронизация |
| 9 | On Specific Event потвърждаване? | ✅ Executor ръчно ИЛИ Beneficiary заявява \+ Executor одобрява |
| 10 | Beneficiary Access Task delivery? | ✅ Email → регистрация → автоматичен достъп |

---

## **15\. System Guarantees**

1. Role/access assignment е single source of truth за план-ниво permissions  
2. Linked row cards са views, не data owners  
3. Data Access Summary е derived, read-only projection  
4. Card VIII ↔ Settings — shared model, двупосочна синхронизация  
5. Всички промени са: Immediate (on save), Consistent, Reversible, Privacy-safe, PlanOwner-controlled  
6. No duplication rule — ако идентичен assignment вече съществува → inline error  
7. Proposed Changes (suggestive mode) — нищо не се apply-ва без PlanOwner explicit approval  
8. Task edit propagation — всяка промяна → email \+ in-app notification

---

*Генерирано: 27 Февруари 2026 — v3 (финален)* *Източници: UX Спецификация Cards VIII, IX, X (пълен текст), Архитектурен план v1.0, Actions Matrix, Timing Matrix, Task Definitions, Data Access Configuration Tree*

