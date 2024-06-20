const request = require('supertest');
const app = require('../server'); 

describe('User API Integration Test', () => {
    test('GET /api/users/:id returns user profile', async () => {
        const response = await request(app).get('/api/users/123'); 
        expect(response.status).toBe(200); 
        expect(response.body).toEqual({ name: 'John Doe', email: 'john@example.com' }); 
    });

    test('PUT /api/users/:id updates user profile', async () => {
        const updateData = { name: 'Jane Doe', email: 'jane@example.com' }; 
        const response = await request(app).put('/api/users/123').send(updateData); 
        expect(response.status).toBe(200); 
    });
});
