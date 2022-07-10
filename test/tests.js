const { expect } = require('chai')
const request = require('supertest')

process.env.NODE_ENV = 'test'
process.env.PORT = 3002
const app = require('../server')

describe('/salary', () => {
    describe('GET', () => {
        it('Retrieves a salary object', async () => {
            // Exercise
            const response = await request(app)
                .get('/salary')
                .send()

            // Verify
            expect(response.body).to.be.an('object')
        })
        it('Salary has the right schema', async () => {
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
    describe('GET', () => {
        it('Retrieves an array of envelopes', async () => {
            // Exercise
            const response = await request(app)
                .get('/envelopes')
                .send()
                
            // Verify
            expect(response.body).to.be.an('array')
        })
        it('Envelopes have the right schema', async () => {
            // Exercise
            const response = await request(app)
                .get('/envelopes')
                .send()
                
            // Verify
            expect(response.body[0]).to.have.property('id')
            expect(response.body[0]).to.have.property('name')
            expect(response.body[0]).to.have.property('spending_limit')
            expect(response.body[0]).to.have.property('spending_available')
        })
    })
    describe('POST', () => {
        it('Retrieves the envelope in the response', async () => {
            // Setup
            const envelope = {
                name: 'mocha_test',
                spending_limit: 0,
                spending_available: 0
            }

            // Exercise
            const response = await request(app)
                .post('/envelopes')
                .send(envelope)

            // Verify
            expect(response.body).to.be.an('object')

            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('spending_limit')
            expect(response.body).to.have.property('spending_available')

            // Teardown
            const id = response.body.id
            await request(app)
                .delete(`/envelopes/${id}`)
                .send()            
        })
        it('Fails if envelope does not have the right schema', async () => {
            // Setup
            const missingProperty = {
                name: 'mocha_test',
                spending_available: 0
            }
            const wrongType = {
                name: 'mocha_test',
                spending_limit: 'wrong type',
                spending_available: 0
            }

            // Exercise
            const response1 = await request(app)
                .post('/envelopes')
                .send(missingProperty)

            const response2 = await request(app)
                .post('/envelopes')
                .send(wrongType)

            // Verify
            expect(response1.body).to.have.property('error')
            expect(response2.body).to.have.property('error')

            // Teardown
            const id1 = response1.body.id
            await request(app)
                .delete(`/envelopes/${id1}`)
                .send()        
                
            const id2 = response2.body.id
            await request(app)
                .delete(`/envelopes/${id2}`)
                .send()    
        })
        it('Fails if envelopes.name already exists', async () => {
            // Setup
            const envelope = {
                name: 'mocha_test',
                spending_limit: 0,
                spending_available: 0
            }
            const repeatedEnvelope = {
                name: 'mocha_test',
                spending_limit: 0,
                spending_available: 0
            }

            // Exercise
            const response1 = await request(app)
                .post('/envelopes')
                .send(envelope)

            const response2 = await request(app)
                .post('/envelopes')
                .send(repeatedEnvelope)

            // Verify
            expect(response2.body).to.have.property('error')

            // Teardown
            const id1 = response1.body.id
            await request(app)
                .delete(`/envelopes/${id1}`)
                .send()        
                
            const id2 = response2.body.id
            await request(app)
                .delete(`/envelopes/${id2}`)
                .send()    
        })
        it('Fails if spending_available > spending_limit', async () => {
            // Setup
            const envelope = {
                name: 'mocha_test',
                spending_limit: 0,
                spending_available: 1
            }

            // Exercise
            const response = await request(app)
                .post('/envelopes')
                .send(envelope)

            // Verify
            expect(response.body).to.have.property('error')

            // Teardown
            const id = response.body.id
            await request(app)
                .delete(`/envelopes/${id}`)
                .send() 
        })
    })
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