# itriangle_Assignment
Purchase approval workflow using React, Node.js, Express and PostgreSQL

# Approval Workflow System

A full stack approval workflow system built using React, Node.js, Express and PostgreSQL.  
This system allows purchase requests to be created and routed through configurable approval workflows.

## Live Demo

Frontend:
https://your-vercel-url.vercel.app

Backend API:
https://your-render-url.onrender.com

## Tech Stack

Frontend:
React (Vite)
Tailwind CSS
Axios
React Router

Backend:
Node.js
Express.js
PostgreSQL
pg library

Database:
PostgreSQL (Neon cloud)

Deployment:
Frontend → Vercel  
Backend → Render  
Database → Neon PostgreSQL

---

## Features

Purchase Request Creation  
Dynamic Approval Workflow  
Multi-Level Approval Support  
Approve / Reject Actions  
Approval History Tracking  
Role Based Workflow Rules  
REST API Architecture  
Cloud Deployment Ready  

---

## System Workflow

1 User creates Purchase Request  
2 System checks approval workflow rules  
3 If approval required → approval request created  
4 Approver sees pending approvals  
5 Approver can approve or reject  
6 System updates request status  
7 Approval history stored in audit table  

---

## Database Design

Core tables:

roles  
users  
purchase_requests  
approval_workflows  
approval_workflow_rules  
approval_levels  
approval_requests  
approval_request_steps  
approval_actions  

---

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

---

## Local Setup

Clone project:

