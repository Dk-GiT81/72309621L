# Average Calculator Microservice

This repository contains the implementation of the Average Calculator HTTP Microservice.

## Features

- Fetches numbers from third-party APIs based on qualified IDs: prime (p), fibonacci (f), even (e), random (r)
- Maintains a unique sliding window of numbers (window size: 10)
- Calculates and returns the average of numbers in the window
- Handles request timeouts and errors gracefully

## Setup Instructions

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `node server.js` to start the server (default port: 9876)
4. Access API endpoints like: `http://localhost:9876/numbers/e`

## API Endpoints

- `/numbers/p` - Prime numbers
- `/numbers/f` - Fibonacci numbers
- `/numbers/e` - Even numbers
- `/numbers/r` - Random numbers

## Notes

- Please ensure you have Node.js installed (version 16+ recommended)
- The microservice handles timeouts and will ignore API calls taking longer than 900ms
