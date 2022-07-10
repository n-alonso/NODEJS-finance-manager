const { expect } = require('chai')
const request = require('supertest')

process.env.NODE_ENV = 'test'
const app = require('../server')

describe('/salary', () => {
    describe('GET', () => {
        it('Retrieves the salary', async () => {
            // Exercise
            const response = await request(app)
                .get('/salary')
                .send()

            // Verify
            expect(response.body).to.have.property('amount')
        })
        it('Salary is above 0', async () => {
            // Exercise
            const response = await request(app)
                .get('/salary')
                .send()

            // Verify
            expect(response.body.amount).to.be.above(0)
        })
    })
    describe('PUT', () => {
        it('Retrieves the salary in the response', async () => {
            // Setup
            const previousSalary = await request(app)
                .get('/salary')
                .send()
            const previousAmount = previousSalary.body.amount

            // Exercise
            const response = await request(app)
                .put('/salary')
                .send({ amount: 1000 })

            // Verify
            expect(response.body).to.have.property('amount')

            // Teardown
            await request(app)
                .put('/salary')
                .send({ amount: previousAmount })
        })
        it('Updates salary.amount to the provided one', async () => {
            // Setup
            const previousSalary = await request(app)
                .get('/salary')
                .send()
            const previousAmount = previousSalary.body.amount

            // Exercise
            const response = await request(app)
                .put('/salary')
                .send({ amount: 1000 })

            // Verify
            expect(response.body.amount).to.equal(1000)

            // Teardown
            await request(app)
                .put('/salary')
                .send({ amount: previousAmount })
        })
    })
})
describe('/envelopes', () => {
    describe('GET', () => {})
    describe('POST', () => {})
})
describe('/envelopes/id', () => {
    describe('GET', () => {})
    describe('PUT', () => {})
    describe('DELETE', () => {})
})
describe('/expenses', () => {
    describe('GET', () => {})
    describe('POST', () => {})
    describe('DELETE', () => {})
})
describe('/expenses/id', () => {
    describe('DELETE', () => {})
})