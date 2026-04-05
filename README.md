# iTriangle Approval Workflow Assignment

Purchase approval workflow system built using React, Node.js, Express and PostgreSQL.

## Project Overview

This project implements a purchase request approval workflow where requests pass through configurable approval levels before final approval or rejection.

The system demonstrates approval routing, workflow rules, and audit history similar to ERP approval processes.

## Tech Stack

Frontend:
React (Vite)
Axios
React Router

Backend:
Node.js
Express.js
PostgreSQL
pg library

Database:
PostgreSQL (Local database)

## Features

Purchase Request Creation  
Dynamic Approval Workflow  
Multi-Level Approval Support  
Approve / Reject Actions  
Approval History Tracking  
Role Based Workflow Rules  
REST API Architecture  

## System Workflow

1 User creates Purchase Request  
2 System checks approval workflow rules  
3 If approval required → approval request created  
4 Approver sees pending approvals  
5 Approver approves or rejects  
6 System updates request status  
7 Approval history stored in approval_actions table  

## Database Tables

roles  
users  
purchase_requests  
approval_workflows  
approval_workflow_rules  
approval_levels  
approval_requests  
approval_request_steps  
approval_actions  

## API Endpoints

Create Purchase Request:
POST /api/pr

Get Purchase Requests:
GET /api/pr

Get Pending Approvals:
GET /api/approval/pending?user_id=2

Approve Request:
POST /api/approval/:id/approve

Reject Request:
POST /api/approval/:id/reject

## Local Setup

Clone project:

git clone https://github.com/chaitanyalogin/itriangle_Assignment.git

Backend setup:

cd approval-system-backend  
npm install  
npm start  

Backend runs on:
http://localhost:5000

Frontend setup:

cd approval-system-frontend  
npm install  
npm run dev  

Frontend runs on:
http://localhost:5173

## Database Setup

1 Create PostgreSQL database:

approval_system

2 Run:

schema.sql

3 Run:

seed.sql

4 Ensure PostgreSQL runs on:

localhost:5432

## Test Users (from seed data)

Employee:
user_id = 1

Manager:
user_id = 2

Use Employee to create PR.
Use Manager to approve PR.

## Notes

node_modules folders are excluded.

Project designed to run locally for assignment evaluation.

## Author

Chaitanyachidambar Kulkarni