# DuckDuckGo 

<br>

### Introduction
This is a full-stack application that utilizes React.js on the client-side and Nest.js on the server-side. 
The application interacts with the DuckDuckGo API, fetching results based on the user's input and displaying them. 
It supports real-time search features and offers a seamless user experience with instant and responsive results.

### Tech Stack
Front-End: React.js with TypeScript
State Management: Redux with Redux Toolkit
Backend: Nest.js with Axios for HTTP requests

## Getting Started
Follow these steps to run the application:

### Prerequisites
Node.js (v16+)

npm

### Installation
1. Clone the repository:
* HTTPS
  ```bash
  $ git clone https://github.com/FexMass/cialdnb.git
  ```
* SSH
  ```bash
  $ git clone git@github.com:FexMass/cialdnb.git
  ```
* GitHub CLI
  ```bash
  $ git clone gh repo clone FexMass/cialdnb
  ```
  <br>
## Install the dependencies for both the frontend and backend:
### Navigate into the frontend directory
     $ cd ../frontend
     $ npm install
### Navigate into the backend directory
  ```bash
   $ cd ../backend
   $ npm install
  ```
### Running the Application
1. Start the backend server:
  ### Inside the backend directory
  ```bash
   $ npm run start
  ```
  
*The server will start on http://localhost:3001

2. Start the frontend:
### Inside the frontend directory
   ```bash
    $ npm run dev
   ```

*The React/Vite application will start on http://localhost:5173.
<br>

## Features
* Real-time search using the DuckDuckGo API
* Display of search results with relevant information
* Some sort of Error handling for API requests
* Test coverage for backend controller and service
* Local storage with Redux "localfile" acting as store for caching previously searched parameteres and results
* Clicking on the DuckDuckGO Logo will open new window with DuckDuckGO info (page is blank)
<br>

## Testing
This application includes test suites for the frontend (React components, Redux actions, and reducers) and backend (Nest.js services and controllers).

### NestJS Backend
```bash
$ cd ../backend
$ npm run test
```
<br>

* Author <b>Massimo Gruicic<b>
