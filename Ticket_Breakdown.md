# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## My Breakdown

Assume I've been assigned a below ticket:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

### 1. Discovery

**Description:** A discovery to analyses the change and impact of the ticket changes. As per my understanding, the following changes we need to do. I'm assuming Agent can work for multiple shifts and facilities.So, there is one to many relation.

**Acceptance Criteria:** Analyze the changes and impact on the system. System must worked and deliver the needed works as per given Ticket.

**ETA:** If i worked at Clipboard Health for 2yrs, then discovery will take 4-5hr to check the system changes. For new joiner ETA will be 1 day so, including discussion with seniors or who know the system for some assistance.

### 2. DB migrations
**Description:** Update Agent table or Create a new table relation one to many with facility, in order to have `label_id` for each Facility. As a single Agent can work for multiple Facilities.

**Changes:**

**New Table**
```
- FacilityAgents
  - agent_id
  - facility_id
  - label_id
```
If we are using any DB call or db function/procedures, we also need to update it. So, while fetching the agent it also select `label_id` in sql query. In case of ORM we need to modify the code for same.

**ETA:** It may vary depend upon checking the DB changes and how many places i need to update.

**Acceptance Criteria:** All DB changes must be done to get `label_id` column.

### 3. `getShiftsByFacility` change to get AgentId assigned by Facility and CRUD operation to manage `label_id` column

**Description:** 
- `getShiftsByFacility` function need to modify to have `label_id` in the response, so that it can be used in `generateReport` to shown in PDF report.
- CRUD operation must be perform to save `label_id` as per Facility.

**ETA:** 15Hr

**Acceptance Criteria:** Function need to have `label_id` in agent meta data.

### 4. `generateReport` to modify the PDF to show AgentID assigned by Facility

**Description:** This function need to modify to have `label_id` in the response, so that it can be used in PDF report.

**ETA:** 2-3Hr, as DB or ORM changes are already done.

**Acceptance Criteria:** Function need to have `label_id` and it must be visible in PDF.

### 5. Test case modification

**Description:** Dependent test cases need to be modified as per 3 and 4 sub Ticket.

**ETA:** 10-12hr.

**Acceptance Criteria:** Test cases must be worked to accept new `label_id` changes.

### 6. QA and Automation Ticket for testing

**Description:** QA person need to test and make sure the final PDF generate have `label_id` shown as AgentId assigned by Facility.
**Acceptance Criteria:** QA and automation need to verify the final PDF report to have `label_id` changes.
