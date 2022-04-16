# backend_budget-manager-api

## Introduction

Practice backend project with the theme of a Budget Manager.
Simple API built with Node.js and Express.js, and dedicated endpoints to set your salary and manage your limits per categories or [envelopes](https://www.thebalance.com/what-is-envelope-budgeting-1293682).

## Installation

This project assumes that you have Node.js properly installed in your computer.
To install it, follow these steps:
 * Clone this project locally
 * Navigate to the local repository `cd <file_path>`
 * Install this project's dependencies `npm install`
 * Run the project `node server.js` or `nodemon server.js`

Troubleshooting:
 * If you get `nodemon is not a valid command` or similar, run `npm i nodemon`. If the issue persists, run `sudo npm i nodemon`
 * If the issue persists or you get similar issues with other packages, you might want to check that they are installed with `<package_name> -v` and force install with `sudo npm i <package_name>`

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

* /expenses __Coming Soon__
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

