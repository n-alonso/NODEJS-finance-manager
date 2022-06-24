# backend_personal-finance-manager

## Introduction

Personal Finance Manager project to set your salary, manage your spending limits per categories or [envelopes](https://www.thebalance.com/what-is-envelope-budgeting-1293682), and add expenses that can automatically substract their amounts from their respective categories.  

Tech-stack: 
 * Node.js 
 * Express.js
 * PostgreSQL __[Coming Soon]__
 * Mocha __[Coming Soon]__
 * Chai __[Coming Soon]__
 * Heroku __[Coming Soon]__
 * OpenAPI Specification __[Coming Soon]__

## Table of Contents __[Coming Soon]__

## Installation

This project assumes that you have Node.js properly installed in your computer.
To install it, follow these steps:
 * Clone this project locally
 * Navigate to the local repository `cd <file_path>`
 * Install this project's dependencies `npm install`
 * Run the project `npm start`
 * Test the project `npm test`

## Description

### Endpoints

* /salary
  * GET '/' to retrieve your salary
  * PUT '/' to update your salary

* /envelopes 
  * GET '/' to get an array of all envelopes
  * GET '/:name' to get a single envelope by `name`
  * POST '/' to create an additional envelope
  * PUT '/:name' to update an entire single envelope by `name`
  * PATCH '/:name' to update specific properties of a single envelope by `name`
  * DELETE '/:name' to delete a single envelope by `name`

* /expenses __[Coming Soon]__
  * GET '/:id' to get a specific expense by `id`
  * POST '/' to create a new expense linked to an envelope
  * DELETE '/:id' to delete a specific expense by `id`
 
### Schemas

* salary: number
* envelopes:
  * name: string
  * limit: number
  * available: number

### Constraints

* The sum of all `limit`s cannot be higher than the value of `salary`
* When updating an envelope, the value of `available` cannot be higher than the value of `limit`
* All properties within the schemas are mandatory for all methods exept PATCH
* For PATCH requests all properties are optional
* All properties supplied must have values with correct data types

