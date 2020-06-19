const db = require('../database/dbConfig');
const user = require('./auth-model.js');
const request = require('supertest');
const server = require('../api/server');


describe('server.js', () => {
    describe('index route', () => {
        it('should return an OK status code from the index route', async () => {
          const expectedStatusCode = 200;
          const response = await request(server).get('/');
          expect(response.status).toEqual(expectedStatusCode);
        });
       });
     });

     describe("register user", () => {
        it('returns 201 CREATED', async () => {
            const data = {username: "testing123", password:"testing123"}
            const res = await request(server)
            .post("/api/auth/register")
            .send(data)
            expect(res.statusCode).toBe(201);
        })
        it("should return JSON", async () => {
            const res = await request(server)
              .post("/api/auth/register")
              .send({username: "testing123"});
            expect(res.type).toMatch(/json/i);
          });
    })

    describe("login user", () => {
        it('returns 200 login', async () => {
            const data = {username: "testing123", password:"testing123"}
            const res = await request(server)
            .post("/api/auth/login")
            .send(data)
            expect(res.statusCode).toBe(200);
        })
        it("should return JSON", async () => {
            const res = await request(server)
              .post("/api/auth/login")
              .send({username: "testing123"});
            expect(res.type).toMatch(/json/i);
          });
    })    
    describe('server.js', () => {
      describe('index route', () => {
          it('should return an 401 status code from the index route when not login', async () => {
            const expectedStatusCode = 401;
            const response = await request(server).get('/api/jokes');
            expect(response.status).toEqual(expectedStatusCode);
          });
         });
       });

       