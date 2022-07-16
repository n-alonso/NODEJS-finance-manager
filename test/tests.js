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
        it('Retrieves an array', async () => {
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
    describe('GET', () => {
        it('Retrieves an object', async () => {
            // Exercise
            const id = await request(app)
                .get('/envelopes')
                .send()

            const response = await request(app)
                .get(`/envelopes/${id.body[0].id}`)
                .send()
                
            // Verify
            expect(response.body).to.be.an('object')
        })
        it('The envelope has the right schema', async () => {
            // Exercise
            const id = await request(app)
                .get('/envelopes')
                .send()

            const response = await request(app)
                .get(`/envelopes/${id.body[0].id}`)
                .send()
                
            // Verify
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('spending_limit')
            expect(response.body).to.have.property('spending_available')
        })
    })
    describe('PUT', () => {
        it('Updates the name to the provided one', async () => {
            // Setup
            const envelope = {
                name: 'mocha_test',
                spending_limit: 0,
                spending_available: 0
            }
            const updated_envelope = {
                name: 'mocha_test_updated',
                spending_limit: 0,
                spending_available: 0
            }

            // Exercise
            const create = await request(app)
                .post('/envelopes')
                .send(envelope)
            
            const response = await request(app)
                .put(`/envelopes/${create.body.id}`)
                .send(updated_envelope)

            // Verify
            expect(response.body.name).to.equal('mocha_test_updated')

            // Teardown
            const id = response.body.id
            await request(app)
                .delete(`/envelopes/${id}`)
                .send()            
        })
        it('Fails if envelope does not have the right schema', async () => {
            // Setup
            const envelope = {
                name: 'mocha_test',
                spending_limit: 0,
                spending_available: 0
            }
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
            const id = await request(app)
                .post('/envelopes')
                .send(envelope)

            const response1 = await request(app)
                .put(`/envelopes/${id.body.id}`)
                .send(missingProperty)

            const response2 = await request(app)
                .put(`/envelopes/${id.body.id}`)
                .send(wrongType)

            // Verify
            expect(response1.body).to.have.property('error')
            expect(response2.body).to.have.property('error')

            // Teardown
            await request(app)
                .delete(`/envelopes/${id.body.id}`)
                .send()   
        })
        it('Fails if spending_available > spending_limit', async () => {
            // Setup
            const envelope = {
                name: 'mocha_test',
                spending_limit: 0,
                spending_available: 0
            }
            const badAvailable = {
                name: 'mocha_test',
                spending_limit: 0,
                spending_available: 1
            }

            // Exercise
            const id = await request(app)
                .post('/envelopes')
                .send(envelope)

            const response = await request(app)
                .put(`/envelopes/${id.body.id}`)
                .send(badAvailable)

            // Verify
            expect(response.body).to.have.property('error')

            // Teardown
            await request(app)
                .delete(`/envelopes/${id.body.id}`)
                .send() 
        })
    })
    describe('DELETE', () => {
        it('Deletes the right envelope', async () => {
            // Setup
            const envelope = {
                name: 'mocha_test',
                spending_limit: 0,
                spending_available: 0
            }

            // Exercise
            const id = await request(app)
                .post('/envelopes')
                .send(envelope)

            const response = await request(app)
                .delete(`/envelopes/${id.body.id}`)
                .send()

            // Verify
            expect(response.body.deletedEnvelope.name).to.equal('mocha_test')
        })
    })
})
describe('/expenses', () => {
    describe('GET', () => {
        it('Retrieves an array', async () => {
            // Exercise
            const response = await request(app)
                .get('/expenses')
                .send()
                
            // Verify
            expect(response.body).to.be.an('array')
        })
        it('Expenses have the right schema', async () => {
            // Exercise
            const response = await request(app)
                .get('/expenses')
                .send()
                
            // Verify
            expect(response.body[0]).to.have.property('id')
            expect(response.body[0]).to.have.property('amount')
            expect(response.body[0]).to.have.property('envelope_id')
            expect(response.body[0]).to.have.property('description')
        })
    })
    describe('POST', () => {
        it('Retrieves the expense in the response', async () => {
            // Setup
            const envelope = {
                name: 'mocha_test',
                spending_limit: 0,
                spending_available: 0
            }
            const expense = {
                amount: 0,
                envelope_id: 0,
                description: 'mocha_test'
            }

            // Exercise
            const newEnvelope = await request(app)
                .post('/envelopes')
                .send(envelope)
            expense.envelope_id = newEnvelope.body.id

            const response = await request(app)
                .post('/expenses')
                .send(expense)

            // Verify
            expect(response.body).to.be.an('object')
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('amount')
            expect(response.body).to.have.property('envelope_id')
            expect(response.body).to.have.property('description')

            // Teardown
            await request(app)
                .delete(`/envelopes/${newEnvelope.body.id}`)
                .send() 
            await request(app)
                .delete(`/expenses/${response.body.id}`)
                .send()            
        })
        it('Fails if expense does not have the right schema', async () => {
            // Setup
            const missingProperty = {
                amount: 0,
                description: "mocha_test"
            }
            const wrongType = {
                amount: 0,
                envelope_id: 'wrong_type',
                description: 'mocha_test'
            }

            // Exercise
            const response1 = await request(app)
                .post('/expenses')
                .send(missingProperty)

            const response2 = await request(app)
                .post('/expenses')
                .send(wrongType)

            // Verify
            expect(response1.body).to.have.property('error')
            expect(response2.body).to.have.property('error')  
        })
    })
})
describe('/expenses/id', () => {
    describe('DELETE', () => {
        it('Deletes the right expense', async () => {
            // Setup
            const envelope = {
                name: 'mocha_test',
                spending_limit: 0,
                spending_available: 0
            }
            const expense = {
                amount: 0,
                envelope_id: 0,
                description: 'mocha_test'
            }

            // Exercise
            const envelopeId = await request(app)
                .post('/envelopes')
                .send(envelope)
            expense.envelope_id = envelopeId.body.id

            const expenseId = await request(app)
                .post('/expenses')
                .send(expense)

            const response = await request(app)
                .delete(`/expenses/${expenseId.body.id}`)
                .send()

            // Verify
            expect(response.body.description).to.equal('mocha_test')
        })
    })
})