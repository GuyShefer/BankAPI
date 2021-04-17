const { describe, it, test, expect } = require("@jest/globals");
const supertest = require("supertest");
const app = require('../../server');

let server = supertest(app);

describe('GET', () => {

  it('get all users', async (done) => {
    const res = await server.get('/api/bank').expect(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    done();
  });

  it('get user by id', async (done) => {
    const user = { id: 2, cash: 900, credit: 1000, isActive: true };
    const res = await server.get('/api/bank/getUser/2').expect(200);
    expect(res.body.id).toBe(user.id);
    expect(res.body.cash).toBe(user.cash);
    expect(res.body.credit).toBe(user.credit);
    expect(res.body.isActive).toBe(user.isActive);
    done();
  });

  it('get all users sorted by money', async (done) => {
    // const user = { id: 2, cash: 900, credit: 1000, isActive: true };
    const res = await server.get('/api/bank/sortedByMoney').expect(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body[res.body.length - 1].cash).toBeGreaterThan(res.body[0].cash);
    done();
  });

  it('get all activate users filtered by amount', async (done) => {
    const res = await server.get('/api/bank/getActiveUsersWithSpecifiedAmount/500').expect(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    done();
  });

});

describe('POST', () => {

  it('create new user', async (done) => {
    const user = { id: 3, cash: 400, credit: 300, isActive: true };
    const res = await server.post('/api/bank').send(user).expect(406);
    expect(res.text).toEqual('User ID already exists.');
    done();
  });
  
});

describe('PUT', () => {

  it('deposite cash', async (done) => {
    const obj = { id: 0, cash: 400 };
    const res = await server.put('/api/bank/deposite').send(obj).expect(200);
    expect(res.text).toEqual('User funds have been successfully deposited.');
    done();
  });

});