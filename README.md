# backend_personal-finance-manager

## Introduction

Personal Finance Manager project to set your salary, manage your spending limits per categories or [envelopes](https://www.thebalance.com/what-is-envelope-budgeting-1293682), and add expenses that can automatically subtract their amounts from their respective categories.  

Tech-stack: 
 * Implementation code:
    * Node.js 
    * Express.js
    * PostgreSQL __[Coming Soon]__
 * Testing code:
    * Mocha __[Coming Soon]__
    * Chai __[Coming Soon]__
    * Supertest __[Coming Soon]__
 * Deployment:
    * Heroku __[Coming Soon]__
 * Documentation:
    * OpenAPI Specification

## Table of Contents

1. [Installation](#installation)
2. [Documentation](#documentation)
   * [OpenAPI Specification](#openapi-specification)
   * [Database](#database)
   * [Constraints](#constraints)

## Installation

This project assumes that you have Node.js properly installed in your computer.
To install it, follow these steps:
 * Clone this project locally
 * Navigate to the local repository `cd <file_path>`
 * Install this project's dependencies `npm install`
 * Run the project `npm start`
 * Test the project `npm test`

## Documentation

### OpenAPI Specification

Please discover this API via it's Swagger UI represented OpenAPI Specification __[Coming Soon]__

### Database

Explore the [Database Schema](https://dbdiagram.io/d/62b8326969be0b672c421b5d):  
![image](https://user-images.githubusercontent.com/63936366/175810172-84236a64-0697-48ca-b51c-c971cf0e2ee5.png)

Or perform [Database Queries]() directly __[Coming Soon]__

### Constraints

* The sum of all `limit`s cannot be higher than the value of `salary`
* When updating an envelope, the value of `available` cannot be higher than the value of `limit`
* All properties within the schemas are mandatory for all methods exept PATCH
* For PATCH requests all properties are optional
* All properties supplied must have values with correct data types

