# mern-url-shortener

## Overview
This project is a URL shortener web application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to submit long URLs and receive shortened versions, with redirection functionality.

## Features
- Shorten long URLs
- Redirect to original URLs using shortened codes
- Simple and user-friendly interface

## Project Structure
```
mern-url-shortener
├── backend
│   ├── src
│   │   ├── controllers
│   │   │   └── urlController.js
│   │   ├── models
│   │   │   └── urlModel.js
│   │   ├── routes
│   │   │   └── urlRoutes.js
│   │   ├── app.js
│   │   └── config
│   │       └── db.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── components
│   │   │   └── UrlShortenerForm.jsx
│   │   ├── pages
│   │   │   └── Home.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mern-url-shortener
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

### Usage
- Navigate to the frontend application in your browser.
- Enter a long URL in the form and submit to receive a shortened URL.
- Use the shortened URL to be redirected to the original URL.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License.