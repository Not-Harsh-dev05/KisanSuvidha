# Kisan Sahayak
PROBLEM STATEMENT 1:

SIH26032 — Farmer Procurement Status & Waiting-Time Uncertainty

PROBLEM STATEMENT 2:

SIH26033 — Middlemen Reducing Farmer Income & Increasing Consumer Prices

PROJECT NAME:

Kisan Suvidha

Digital Farmer Procurement & Direct Market Platform

CORE IDEA:

Build ONE unified government-style digital platform for farmers.

The platform solves two major problems:

1. PROCUREMENT PROBLEM:

Farmers often travel to procurement centres without knowing:

- Whether the centre is accepting crops

- How many farmers are already waiting

- Their position in the queue

- Estimated waiting time

- When their turn will come

2. MARKET PROBLEM:

Farmers often sell through multiple intermediaries:

Farmer → Trader → Wholesaler → Distributor → Retailer → Consumer

This can reduce the farmer's share of the final price while increasing the consumer price.

Our platform connects these two problems.

A farmer should be able to:

- Register their crop

- Choose a procurement centre and track its queue

- OR choose to sell directly to registered buyers

- Compare available buyer prices

- Receive buyer offers

- Match with nearby buyers

- Calculate logistics/transportation cost

- Complete and record the transaction

The platform should therefore feel like a unified government agricultural service rather than two unrelated applications.

==================================================

1. IMPORTANT DESIGN DIRECTION

==================================================

The website MUST look like a credible Indian government/public-service portal.

It should NOT look like:

- AI-generated SaaS

- Startup landing page

- Modern fintech dashboard

- Glassmorphism

- Dribbble UI

- Excessive gradients

- Neon colors

- Purple/pink AI aesthetics

- Huge rounded cards

- Excessive animations

- Floating blobs

- Futuristic AI graphics

Use the visual language of Indian government digital-service websites.

Design:

- White/light grey background

- Dark navy blue primary color

- Muted government green for positive actions

- Small saffron/orange accents

- Thin borders

- 2–6px border radius

- Minimal shadows

- Traditional navigation

- Information-dense layouts

- Tables

- Forms

- Alerts

- Status badges

- Breadcrumbs

The interface should look like something a government department could realistically deploy.

Do NOT claim this is an official Government of India website.

Use:

"Kisan Suvidha"

"Digital Farmer Procurement & Market Platform"

==================================================

2. GLOBAL HEADER

==================================================

Create a traditional Indian government-style header.

Top utility bar:

Left:

"Government Services Portal"

Right:

"हिन्दी | English | Accessibility"

Accessibility controls:

A-

A

A+

Main header:

Left:

Simple Ashoka Chakra / government emblem-style placeholder

Text:

"KISAN SUVIDHA"

"Digital Farmer Procurement & Market Platform"

Subtitle:

"Procurement information and direct market access for farmers"

Right:

"Farmer Login"

"Buyer Login"

"Officer Login"

Navigation:

Home

Farmer Services

Procurement Centres

Direct Market

Price Information

Transactions

Help & Support

Use a traditional horizontal government navigation bar.

Mobile:

Use a simple hamburger menu.

==================================================

3. HOMEPAGE

==================================================

Do NOT create a giant startup-style hero section.

Create a compact government-service homepage.

Main heading:

"Kisan Suvidha"

"Know where to sell, when to arrive and what price you can get."

Description:

"Access procurement-centre queue information and connect directly with buyers to reduce waiting time, improve price transparency and reduce unnecessary intermediaries."

Primary services:

1. Procurement Queue

"Check centre status and estimated waiting time"

2. Direct Market

"Find buyers and compare offers"

3. Price Information

"View reference and buyer prices"

4. Transactions

"Track your completed and ongoing transactions"

Use simple bordered service blocks, NOT floating glass cards.

==================================================

4. UNIFIED FARMER DASHBOARD

==================================================

This is the most important page.

Page:

"Farmer Dashboard"

Farmer:

Ramesh Kumar

Farmer ID:

KPS-2026-00147

Show two major sections side-by-side or stacked.

SECTION A:

"Current Procurement Status"

Procurement Centre:

Rampur Procurement Centre

Ludhiana

Crop:

Wheat

Your Token:

147

Currently Serving:

121

Farmers Ahead:

26

Estimated Waiting Time:

3 hours 40 minutes

Expected Procurement:

Today, 6:30 PM

Status:

Accepting Procurement

Button:

"View Live Queue"

SECTION B:

"Current Market Opportunities"

Crop:

Wheat

Your Quantity:

5000 kg

Reference Market Price:

₹24/kg

Available Buyer Offers:

Buyer A:

₹26/kg

Distance: 18 km

Demand: 2000 kg

Buyer B:

₹27/kg

Distance: 32 km

Demand: 3000 kg

Buyer C:

₹25.50/kg

Distance: 11 km

Demand: 5000 kg

Buttons:

"Compare Offers"

"View Buyers"

This immediately shows that the SAME crop can have two possible paths:

PROCUREMENT CENTRE

or

DIRECT MARKET

==================================================

5. CROP REGISTRATION

==================================================

Create:

"Register Crop"

Form:

Farmer Name

Mobile Number

State

District

Village

Crop

Quantity

Unit

Expected Harvest / Availability Date

Quality / Grade

Example:

Crop: Wheat

Quantity: 5000 kg

Grade: A

Available Date: 05 September 2026

After entering crop details, show:

"What would you like to do?"

OPTION 1:

"Government Procurement"

"Check nearby procurement centres and queue status."

OPTION 2:

"Direct Market"

"Find registered buyers and compare offers."

This is the key connection between SIH26032 and SIH26033.

==================================================

6. PROCUREMENT PATH

==================================================

When the farmer chooses:

"Government Procurement"

Show:

"Nearby Procurement Centres"

Table:

Centre

District

Distance

Current Token

Waiting Farmers

Estimated Wait

Status

Action

Example:

Rampur Procurement Centre

Ludhiana

8 km

121

26

3h 40m

Accepting

Select

Model Mandi Centre

Amritsar

14 km

84

18

2h 10m

Accepting

Select

Central Procurement Centre

Patiala

22 km

156

41

5h 20m

High Queue

Select

Allow sorting by:

- Distance

- Waiting time

- Queue size

==================================================

7. PROCUREMENT QUEUE TRACKING

==================================================

After selecting a centre:

"Live Procurement Status"

Show:

YOUR TOKEN

147

CURRENT TOKEN

121

FARMERS AHEAD

26

ESTIMATED WAIT

3h 40m

EXPECTED TURN

6:30 PM

Centre:

Rampur Procurement Centre

Then show a simple queue visualization:

121

Currently Serving

122

123

124

...

147

Your Token

Do NOT make this futuristic.

Below:

"Waiting Time Estimation"

Factors:

Farmers ahead: 26

Average processing time: 8 min/farmer

Active counters: 3

Historical processing speed: 7–9 min/farmer

Show:

"Estimated remaining time:

Approximately 3 hours 40 minutes"

Add note:

"Estimated time may change depending on queue movement and centre capacity."

==================================================

8. LIVE QUEUE DEMONSTRATION

==================================================

Make the prototype interactive.

Buttons:

"Process Next Farmer"

"Pause Queue"

"Reset Demo"

Example:

Initial:

Current Token: 121

Your Token: 147

Farmers Ahead: 26

Click:

"Process Next Farmer"

Then:

Current Token: 122

Farmers Ahead: 25

Waiting time automatically decreases.

The farmer dashboard should update.

This is important for the SIH demonstration.

==================================================

9. DIRECT MARKET PATH

==================================================

When the farmer chooses:

"Direct Market"

Show:

"Sell Directly to Buyers"

At the top:

Your Crop:

Wheat

Available Quantity:

5000 kg

Location:

Ludhiana

Reference Market Price:

₹24/kg

Then show buyer offers.

TABLE:

Buyer

Location

Required Quantity

Offer Price

Distance

Estimated Transport

Net Farmer Price

Action

Example:

Punjab Grain Retail

Ludhiana

2000 kg

₹26/kg

18 km

₹0.80/kg

₹25.20/kg

View Offer

FreshMart Wholesale

Amritsar

3000 kg

₹27/kg

32 km

₹1.40/kg

₹25.60/kg

View Offer

Local Food Retail

Ludhiana

5000 kg

₹25.50/kg

11 km

₹0.50/kg

₹25.00/kg

View Offer

The platform should calculate:

NET FARMER PRICE

=

Buyer Offer Price

-

Estimated Transportation Cost

This makes the platform more than a simple marketplace.

==================================================

10. PRICE TRANSPARENCY

==================================================

Create:

"Price Information"

Show:

Crop:

Wheat

Reference Price:

₹24/kg

Current Buyer Offers:

₹25.50–₹27/kg

Highest Offer:

₹27/kg

Then show a simple price comparison table.

Also show a visual comparison:

Traditional Supply Chain:

Farmer

↓

Trader

↓

Wholesaler

↓

Distributor

↓

Retailer

↓

Consumer

Our Platform:

Farmer

↓

Kisan Suvidha

↓

Buyer / Retailer

Do NOT claim that every transaction eliminates every intermediary.

Use wording such as:

"Potentially fewer intermediary layers"

==================================================

11. IMPACT CALCULATOR

==================================================

This should be one of the strongest demo features.

Create:

"Compare Selling Options"

Example:

Farmer quantity:

5000 kg

Traditional route:

Farmer selling price:

₹20/kg

Farmer revenue:

₹1,00,000

Direct buyer offer:

₹27/kg

Estimated transport:

₹1/kg

Net farmer price:

₹26/kg

Net farmer revenue:

₹1,30,000

Potential difference:

₹30,000

Also show:

Consumer price under traditional chain:

₹40/kg

Potential direct-market price:

₹32/kg

Use a simple comparison table.

Label this carefully as:

"Illustrative calculation"

Do not present simulated numbers as real market statistics.

==================================================

12. LOGISTICS MATCHING

==================================================

Create:

"Logistics"

After a buyer offer is selected:

Farmer location

↓

Buyer location

Show:

Distance:

32 km

Quantity:

3000 kg

Estimated transport cost:

₹4,200

Transport cost per kg:

₹1.40

Then show available transport options:

Local Transporter

Tractor/Trolley

Small Truck

Each with:

Vehicle capacity

Estimated cost

Availability

Button:

"Select Transport"

This demonstrates that the platform is not merely a listing website.

==================================================

13. BUYER DASHBOARD

==================================================

Create a separate:

"Buyer Portal"

Buyer:

Punjab Grain Retail

Dashboard sections:

Search Crops

Nearby Farmers

Active Offers

Orders

Transactions

Search interface:

Crop

Location

Quantity

Available Date

Results:

Farmer

Crop

Quantity

Location

Expected Price

Availability

Action

Example:

Ramesh Kumar

Wheat

5000 kg

Ludhiana

₹25/kg

05 Sep

Make Offer

==================================================

14. BUYER OFFER FLOW

==================================================

Buyer selects a farmer.

Show:

Crop:

Wheat

Available:

5000 kg

Farmer Expected Price:

₹25/kg

Buyer Offer:

₹27/kg

Required Quantity:

2000 kg

Expected Pickup Date:

07 Sep 2026

Estimated Logistics:

₹1/kg

Button:

"Submit Offer"

On submission:

Status:

"Offer Sent"

Farmer dashboard should show:

"New Buyer Offer"

Punjab Grain Retail

₹27/kg

2000 kg

Estimated transport: ₹1/kg

Net: ₹26/kg

Buttons:

Accept

Reject

Counter Offer

==================================================

15. TRANSACTION FLOW

==================================================

Create:

"Transaction Details"

After accepting an offer:

Transaction ID:

KS-2026-00421

Farmer:

Ramesh Kumar

Buyer:

Punjab Grain Retail

Crop:

Wheat

Quantity:

2000 kg

Agreed Price:

₹27/kg

Transport:

₹2,000

Status:

Offer Accepted

↓

Transport Assigned

↓

Pickup Scheduled

↓

Crop Delivered

↓

Transaction Completed

This should be a simple horizontal status tracker.

==================================================

16. FARMER NOTIFICATIONS

==================================================

Create:

"Notifications"

Examples:

10:25 AM

Procurement Queue Updated

"26 farmers are currently ahead of you."

1:45 PM

Queue Movement

"Estimated waiting time reduced to 2 hours."

3:30 PM

Turn Approaching

"Your token is approaching. Please plan your arrival."

4:10 PM

New Buyer Offer

"Punjab Grain Retail offered ₹27/kg for 2,000 kg wheat."

5:00 PM

Offer Accepted

"Your transaction has been confirmed."

==================================================

17. LOW CONNECTIVITY / IVR

==================================================

Create:

"Services for Farmers with Limited Internet Access"

Explain:

"Farmers can access essential information through SMS and IVR."

Mock IVR:

Dial:

1800-XXX-XXXX

1 — Check Procurement Token

2 — Check Queue Position

3 — Check Waiting Time

4 — Find Procurement Centre

5 — Check Buyer Offers

Mock SMS:

"Kisan Suvidha:

Token 147

Current Token 121

Farmers Ahead 26

Estimated Wait 3h 40m

Rampur Procurement Centre"

Also show a market SMS:

"Kisan Suvidha:

New Buyer Offer

Punjab Grain Retail

₹27/kg

Quantity 2000 kg

Reply 1 to view"

This is a prototype visualization only.

==================================================

18. OFFICER DASHBOARD

==================================================

Create:

"Procurement Centre Management"

Officer:

S. Sharma

Centre:

Rampur Procurement Centre

Show:

Today's Capacity

200

Processed

121

Waiting

26

Pending

53

Active Counters

3

Then:

"Live Queue Management"

Table:

Token

Farmer

Crop

Quantity

Status

Action

121

Ramesh Kumar

Wheat

5000 kg

Processing

Complete

122

Harpreet Singh

Wheat

3000 kg

Waiting

Call

123

Aman Kumar

Wheat

4200 kg

Waiting

Call

Buttons:

Call Next Farmer

Mark Completed

Pause Counter

Officer actions should update the mock queue.

==================================================

19. OFFICER MARKET/PROCUREMENT OVERVIEW

==================================================

Add another section:

"Centre & Market Overview"

Show:

Procurement demand

Available crop quantity

Farmers waiting

Average processing time

Nearby buyer demand

Simple charts only.

No futuristic analytics.

==================================================

20. UNIFIED TRANSACTION HISTORY

==================================================

Create:

"Transaction History"

Tabs:

Procurement

Direct Market

Example:

05 Sep 2026

Wheat

5000 kg

Rampur Procurement Centre

Government Procurement

Completed

07 Sep 2026

Wheat

2000 kg

Punjab Grain Retail

Direct Market

₹27/kg

Completed

This makes both problem statements part of the same farmer journey.

==================================================

21. MAIN NAVIGATION STRUCTURE

==================================================

The final application should have these main routes/pages:

/

Home

/farmer

Farmer Dashboard

/register-crop

Register Crop

/procurement

Procurement Centres

/queue

Live Queue

/market

Direct Market

/prices

Price Information

/buyers

Buyer Portal

/logistics

Logistics

/transactions

Transactions

/notifications

Notifications

/officer

Officer Dashboard

/help

Help & Support

Use frontend routing.

==================================================

22. IMPORTANT DEMO JOURNEY

==================================================

The complete SIH demo should work like this:

FARMER:

Home

↓

Register Crop

↓

Enter:

Wheat

5000 kg

Ludhiana

↓

Platform gives TWO OPTIONS:

A. Government Procurement

B. Direct Market

DEMO A:

Choose Government Procurement

↓

See nearby centres

↓

Choose Rampur Centre

↓

Get Token #147

↓

See Current Token #121

↓

26 Farmers Ahead

↓

3h 40m estimated wait

↓

Live queue simulation

↓

Officer processes farmers

↓

Queue changes

↓

Waiting time changes

↓

Farmer gets notification

Then return to dashboard.

DEMO B:

Choose Direct Market

↓

See reference price ₹24/kg

↓

See buyer offers

₹25.50

₹26

₹27

↓

Compare offers

↓

Calculate transportation

↓

Calculate NET farmer price

↓

Select buyer

↓

Buyer accepts

↓

Transport assigned

↓

Transaction completed

Finally show:

"Farmer Outcome"

Procurement route:

Waiting time visibility

Token tracking

Reduced unnecessary waiting

Direct market route:

Price transparency

Buyer discovery

Potentially fewer intermediary layers

Logistics matching

==================================================

23. MOCK DATA

==================================================

Use realistic Indian data.

Farmers:

Ramesh Kumar

Harpreet Singh

Aman Kumar

Gurpreet Kaur

Sukhwinder Singh

Locations:

Ludhiana

Patiala

Amritsar

Bathinda

Moga

Crops:

Wheat

Rice

Paddy

Maize

Use ₹ for Indian currency.

Do NOT use Lorem Ipsum.

==================================================

24. RESPONSIVE DESIGN

==================================================

Support:

Desktop

Laptop

Tablet

Mobile

Farmer-facing screens should work especially well on mobile.

Keep the interface lightweight.

Avoid unnecessary animations.

==================================================

25. ACCESSIBILITY

==================================================

Include:

High contrast

Keyboard navigation

Visible focus states

Proper form labels

Readable font sizes

Clear error messages

Status should not depend only on color

Accessibility controls

Header:

A-

A

A+

Language:

English / हिन्दी

==================================================

26. TECHNICAL REQUIREMENTS

==================================================

Frontend only.

Use:

React

TypeScript

Tailwind CSS

Component-based architecture

React Router

Local/mock state

No backend.

No real authentication.

No real SMS.

No real IVR.

No real payment gateway.

No real government API.

Use mock data but make interactions functional.

Create reusable components:

GovernmentHeader

Navigation

Breadcrumbs

GovernmentButton

DataTable

FormField

StatusBadge

QueueTracker

PriceComparison

BuyerOffer

LogisticsCalculator

NotificationPanel

TransactionTimeline

==================================================

27. MOST IMPORTANT VISUAL RULE

==================================================

This should look like ONE government agricultural service platform.

NOT:

"Procurement website + marketplace website"

Instead:

"Kisan Suvidha"

A farmer comes to ONE platform with a crop.

The platform helps the farmer decide:

"Where should I sell my crop?"

The farmer can then:

1. Check government procurement availability and queue

OR

2. Compare direct buyer opportunities

The dashboard should make this relationship obvious.

==================================================

28. FINAL DESIGN RULE

==================================================

Prioritize:

Credibility

Usability

Information clarity

Government-service authenticity

Simple navigation

Realistic forms and tables

Functional prototype interactions

Do NOT prioritize:

Fancy animations

AI aesthetics

Gradients

Glassmorphism

Huge cards

3D graphics

Decorative illustrations

Startup-style marketing sections

The final prototype should look like a serious Indian public-service platform that could realistically be presented to a government department.

The UI should be polished, but restrained.

The strongest visual impression should be:

"Government digital service + practical agricultural technology"

not:

"AI-generated startup dashboard."

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://kisan-doot-setu.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/00211374-3272-4fb8-9450-d51c60cf6554).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
