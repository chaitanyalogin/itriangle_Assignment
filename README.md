# iTriangle Approval Workflow Assignment

Purchase approval workflow system built using React, Node.js, Express and PostgreSQL.

## Project Overview

This project implements a purchase request approval workflow where requests pass through configurable approval levels before final approval or rejection.

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
PostgreSQL (Neon Cloud)

## Features

Purchase Request Creation  
Dynamic Approval Workflow  
Multi-Level Approval Support  
Approve / Reject Actions  
Approval History Tracking  
Role Based Workflow Rules  
REST API Architecture  

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

## Setup Instructions

Backend setup:

cd approval-system-backend  
npm install  
npm start  

Frontend setup:

cd approval-system-frontend  
npm install  
npm run dev  

## Database Setup

PostgreSQL database used (Neon cloud).

Import provided schema before running backend.

## Project Structure

itriangle_Assignment

approval-system-backend → Express API  
approval-system-frontend → React UI  

## Notes

node_modules folder excluded from submission.

Environment variables required:

DATABASE_URL = PostgreSQL connection string
