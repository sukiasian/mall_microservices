import * as request from 'supertest';
import * as express from 'express';
import * as axios from 'axios';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@jest/globals';
import TestManager from './TestManager';
import { MicroserviceURL, ResponseStatus } from '../src/types/enums';
// import { CreateClientBody, UpdateClientBody } from '../src/types/interfaces';
//
// describe('User (e2e)', () => {
//     let app: express.Application;
//     let createClientBody: CreateClientBody;
//     let updateClientBody: UpdateClientBody;
//
//     beforeAll(async () => {
//         app = TestManager.getAppExpressInstance();
//     });
//
//     beforeEach(async () => {});
//
//     afterEach(async () => {});
//
//     afterAll(() => {
//         TestManager.stop();
//     });
//
//     it('POST / should create a client.', async () => {
//         createClientBody = TestManager.generateCreateClientBody();
//
//         const signupOrLoginResponse = await axios.default.post(
//             'http://127.0.0.1:9000/signupOrLogin',
//             {
//                 phone: '79649059722',
//                 password: 'Helloworld01',
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//     });
//
//     it('GET / should get client information by usertoken.', async () => {
//         const res = await request(app).get(MicroserviceURL.USERS);
//
//         expect(res.statusCode).toBe(200);
//         expect(res.body.result).toBeTruthy();
//     });
//
//     it('PUT / should update client information by usertoken.', async () => {
//         updateClientBody = TestManager.generateUpdateClientBody();
//
//         const res = await request(app).put(MicroserviceURL.USERS);
//
//         expect(res.status).toBe(200);
//         expect(res.body.status).toBe(ResponseStatus.SUCCESS);
//     });
//
//     it('GET /qr should ...', async () => {});
// });
