import { request } from 'supertest';

const baseURL = 'http://localhost:5000';

/*
beforeAll(async () => {
    await User.sync({ force: true });
});

describe('test cases for register new user', () => {
    it('test register new user', async () => {
        const response = await request(app).post("/user/").send({
            "role": "User",
            "username": "tester28",
            "password": "abc123",
            "confirmPassword": "abc123",
            "balance": 88
        });
        expect(response.statusCode).toBe(200);
    });
});
*/

test("It adds two numbers", () => {
    expect(1 + 1).toBe(2);
});