const { assert } = require('chai')
const request = require('supertest')
const app = require('../server')

describe('/salary', () => {
    describe('GET', () => {
        it('Retrieves a valid salary', async () => {
            // Setup
            const expected = ['salary']

            // Exercise
            const response = await request(app)
                .get('/salary')
                .send()

            // Verify
            assert.hasAllkeys(response.body, expected)
        })
    })
    describe('PUT', () => {
        it('Updates salary to the provided one', async () => {
            // Setup
            const expected = 1000

            // Exercise
            const response = await request
                .put('/salary')
                .send({ salary: 1000 })
            const updatedSalary = await db.getSalary()

            // Verify
            assert.include(updatedSalary, expected)
        })
        it('Retrieves the provided salary in the response', async () => {
            // Setup
            const expected = { salary: 1000 }

            // Exercise
            const response = await request
                .put('/salary')
                .send({ salary: 1000 })

            // Verify
            assert.include(response.body, expected)
        })
    })
})