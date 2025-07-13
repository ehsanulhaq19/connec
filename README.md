# AI Virtual Assistant System

## Project Overview

The AI Virtual Assistant System is an intelligent calling platform that leverages cutting-edge AI technologies to create human-like virtual assistants capable of making outbound calls to clients and performing complex conversational tasks.

## Project Goal and Mission

**Primary Goal**: To revolutionize client engagement through AI-powered virtual assistants that can autonomously call clients, understand their needs, and perform specific actions like booking appointments, conducting product demos, or gathering information.

**Mission**: Create a seamless bridge between businesses and their clients using intelligent AI agents that can handle complex conversations, understand context, and execute business objectives through natural voice interactions.

## Core Functionality

### AI-Powered Calling System
- **Outbound Calling**: Virtual assistants automatically call clients using Twilio's telephony infrastructure
- **Natural Conversations**: AI agents engage in human-like conversations using Google's Gemini AI
- **Voice Synthesis**: Realistic voice generation using Google Text-to-Speech
- **Speech Recognition**: Accurate client speech understanding via Google Speech-to-Text
- **Context Awareness**: AI maintains conversation context and client information throughout calls

### Business Use Cases
- **Appointment Booking**: Convince clients to schedule product demos or consultations
- **Lead Qualification**: Gather information and qualify potential customers
- **Customer Support**: Handle routine inquiries and support requests
- **Follow-up Calls**: Automated follow-up for sales, surveys, or reminders
- **Information Gathering**: Collect client preferences and requirements

### Client Data Integration
- **Client Profiles**: Comprehensive client information and history
- **Call Context**: Previous interactions and preferences
- **Business Intelligence**: Analytics and insights from call outcomes
- **Personalization**: Tailored conversations based on client data

## Technology Stack

### AI and Voice Technologies
- **Google Gemini AI**: Advanced language model for natural conversation generation
- **Google Text-to-Speech**: High-quality voice synthesis with multiple voices and languages
- **Google Speech-to-Text**: Real-time speech recognition and transcription
- **Twilio**: Telephony infrastructure for making and receiving calls

### Backend Technologies
- **Node.js & NestJS**: Robust server-side framework with modular architecture
- **MongoDB & Mongoose**: Flexible document database for client and call data
- **JWT Authentication**: Secure user authentication and authorization
- **Swagger API Documentation**: Comprehensive API documentation and testing
- **Docker**: Containerized deployment for scalability

### Frontend Technologies
- **React & TypeScript**: Modern, type-safe user interface
- **Vite**: Fast development and build tooling
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Redux Toolkit**: State management for complex application state
- **React Router**: Client-side routing and navigation
- **React Hook Form & Zod**: Form handling and validation

### DevOps and Infrastructure
- **Docker Compose**: Multi-service orchestration for development and deployment
- **MongoDB**: Primary database for storing client data, call records, and system information
- **Environment Management**: Secure configuration management across environments

## System Architecture

### Monorepo Structure
- **Backend**: NestJS application with modular design (auth, users, assistants, clients, schedules, calls)
- **Frontend**: React application with component-based architecture
- **Shared**: Common utilities, types, and configurations

### Core Modules
- **Authentication Module**: User management and JWT-based security
- **Client Management**: Client profiles, preferences, and interaction history
- **Virtual Assistant Module**: AI agent configuration and personality management
- **Call Scheduling**: Automated call scheduling and management
- **Call Analytics**: Detailed call records, transcripts, and performance metrics
- **Integration Module**: Twilio, Google AI, and external service integrations

## Key Features

### Virtual Assistant Capabilities
- **Intelligent Conversations**: Context-aware dialogue using Gemini AI
- **Multi-language Support**: Conversations in multiple languages
- **Voice Customization**: Different voices and personalities for different use cases
- **Call Recording**: Complete call recordings and transcriptions
- **Real-time Analytics**: Live call monitoring and performance tracking

### Business Intelligence
- **Call Success Metrics**: Conversion rates, appointment bookings, lead qualifications
- **Client Engagement Analytics**: Interaction patterns and preferences
- **Performance Optimization**: AI model improvement based on call outcomes
- **Reporting Dashboard**: Comprehensive business intelligence and reporting

### Security and Compliance
- **Data Encryption**: End-to-end encryption for sensitive client information
- **GDPR Compliance**: Privacy and data protection compliance
- **Call Recording Consent**: Proper consent management for call recordings
- **Secure API Access**: JWT-based authentication and authorization

## Use Case Scenarios

### Product Demo Booking
1. Virtual assistant calls client using Twilio
2. AI introduces itself and explains the purpose of the call
3. Uses client data to personalize the conversation
4. Presents product benefits and value proposition
5. Handles objections using Gemini AI responses
6. Books appointment if client is interested
7. Records call outcome and updates client profile

### Lead Qualification
1. AI agent calls potential leads from database
2. Asks qualifying questions based on business criteria
3. Uses speech recognition to understand responses
4. Evaluates lead quality using AI analysis
5. Schedules follow-up actions or disqualifies leads
6. Updates CRM with qualification results

### Customer Follow-up
1. Automated follow-up calls for recent customers
2. Gathers feedback and satisfaction metrics
3. Addresses concerns or questions
4. Offers additional services or support
5. Records customer sentiment and satisfaction

## Technical Implementation

### AI Integration Flow
1. **Call Initiation**: System triggers outbound call via Twilio
2. **Voice Generation**: Google TTS converts AI responses to speech
3. **Speech Recognition**: Google STT transcribes client speech
4. **AI Processing**: Gemini AI analyzes context and generates responses
5. **Context Management**: System maintains conversation state
6. **Action Execution**: Performs business actions based on conversation outcome

### Data Flow
1. **Client Data**: Stored in MongoDB with comprehensive profiles
2. **Call Context**: Real-time conversation state and history
3. **AI Responses**: Generated using client data and conversation context
4. **Call Records**: Complete transcripts and outcomes stored
5. **Analytics**: Performance metrics and insights generated

## Architecture
- **Monorepo**: Contains both frontend (React) and backend (NestJS) apps.
- **Backend**: NestJS, MongoDB, Mongoose, JWT Auth, Swagger, Dockerized, modular (auth, users, assistants, clients, schedules, calls, appointments), repository pattern, service layer.
- **Frontend**: React (Vite, TypeScript), Tailwind CSS, Redux Toolkit, React Router, SCSS modules, react-hook-form/zod validation, Dockerized.
- **Database**: MongoDB (Dockerized)
- **API Docs**: Swagger (auto-generated by NestJS)

## Tech Stack
- **Backend**: Node.js, NestJS, Mongoose, MongoDB, JWT, Swagger, Docker
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Redux Toolkit, React Router, SCSS, react-hook-form, zod, Docker
- **AI Services**: Google Gemini AI, Google Text-to-Speech, Google Speech-to-Text
- **Telephony**: Twilio Voice API
- **DevOps**: Docker, Docker Compose

## Folder Structure
```
├── backend/           # NestJS backend (modules, controllers, services, schemas)
├── frontend/          # React frontend (components, pages, store, api, theme)
├── docker-compose.yml # Multi-service orchestration
├── README.md          # Project documentation
└── ...
```

## Local Development Setup

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose

### 1. Clone the repository
```sh
git clone <repo-url>
cd <repo-root>
```

### 2. Environment Variables
- Copy `backend/env.example` to `backend/.env` and set values.
- Copy `frontend/env.example` to `frontend/.env` and set values (e.g., `VITE_API_URL=http://localhost:3005/api`).

### 3. Install Dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd ../frontend
npm install
```

### 4. Run Locally (Dev Mode)
#### Start MongoDB (Docker)
```sh
docker-compose up mongo
```
#### Start Backend
```sh
cd backend
npm run start:dev
```
#### Start Frontend
```sh
cd frontend
npm run dev
```

### 5. Access the App
- Frontend: [http://localhost:5173](http://localhost:5173) (or [http://localhost:5174](http://localhost:5174) if using Docker)
- Backend API: [http://localhost:3000/api](http://localhost:3000/api) (or [http://localhost:3005/api](http://localhost:3005/api) if using Docker)
- Swagger Docs: [http://localhost:3000/api](http://localhost:3000/api) (or [http://localhost:3005/api](http://localhost:3005/api) if using Docker)
- MongoDB: [mongodb://localhost:27017](mongodb://localhost:27017) (or [mongodb://localhost:27018](mongodb://localhost:27018) if using Docker)

## Dockerized Setup (Recommended)

### 1. Build and Start All Services
```sh
docker-compose up --build
```
- Frontend: [http://localhost:5174](http://localhost:5174)
- Backend: [http://localhost:3005/api](http://localhost:3005/api)
- Swagger: [http://localhost:3005/api](http://localhost:3005/api)
- MongoDB: [localhost:27018]

### 2. Stopping Services
```sh
docker-compose down
```

## Testing
- **Frontend**: `cd frontend && npm test` (Vitest, React Testing Library)
- **Backend**: `cd backend && npm test` (Jest)

## Project Structure Details
- **backend/**: NestJS modules (auth, users, assistants, clients, schedules, calls, appointments), repository pattern, Swagger setup.
- **frontend/**: React components, pages, Redux store, API services, theme context, hooks, tests.

## Contributing
- Fork, branch, and PR workflow.
- Use conventional commits.
