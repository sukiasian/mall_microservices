import * as request from 'supertest';
import * as express from 'express';
import TestManager from './TestManager';
import { describe, beforeAll, afterAll, it, expect } from '@jest/globals';
import { MicroserviceURL } from '../src/types/enums';

describe('Membership (e2e)', () => {
    let app: express.Application;
    let userToken: string | undefined;
    let getAllMembershipsResponse: request.Response;

    beforeAll(async () => {
        app = TestManager.getAppExpressInstance();

        userToken = await TestManager.acquireUserToken();
    });

    afterAll(() => {
        TestManager.stop();
    });

    it("GET / should return all user's memberships and packages.", async () => {
        const res = await request(app)
            .get(MicroserviceURL.MEMBERSHIPS)
            .set('Cookie', [`user_token=${userToken}`]);

        expect(res.status).toBe(200);
    });

    it("GET /:id should return user's membership or package by id.", async () => {
        getAllMembershipsResponse = await request(app)
            .get(MicroserviceURL.MEMBERSHIPS)
            .set('Cookie', [`user_token=${userToken}`]);

        const getMembershipByIdResponse = await request(app)
            .get(`${MicroserviceURL.MEMBERSHIPS}/${getAllMembershipsResponse.body.data[0]}`)
            .set('Cookie', [`user_token=${userToken}`]);

        expect(getMembershipByIdResponse.status).toBe(200);
        expect(getMembershipByIdResponse.body.id).toBeTruthy();
    });

    it('POST /:id/activate should activate membership and send payment information to CRM', async () => {
        const activateMembershipResponse = await request(app)
            .post(`${MicroserviceURL.MEMBERSHIPS}/${getAllMembershipsResponse.body.data[0]}/activation`)
            .set('Cookie', [`user_token=${userToken}`]);

        expect(activateMembershipResponse.status).toBe(201);
        expect(activateMembershipResponse.body.result).toBeTruthy();
    });

    it('POST /:id/freezing should freeze a ticket.', async () => {
        const res = await request(app)
            .post(`${MicroserviceURL.MEMBERSHIPS}/${getAllMembershipsResponse.body.data[0]}/freezing`)
            .set('Cookie', [`user_token=${userToken}`]);

        expect(res.status).toBe(201);
    });

    it('PUT /:id/freezing should unfreeze a ticket', async () => {
        const res = await request(app)
            .put(`${MicroserviceURL.MEMBERSHIPS}/${getAllMembershipsResponse.body.data[0]}/freezing`)
            .set('Cookie', [`user_token=${userToken}`]);

        expect(res.status).toBe(200);
    });

    it('DELETE /:id/freezing should cancel upcoming ticket freezing.', async () => {
        const res = await request(app)
            .post(`${MicroserviceURL.MEMBERSHIPS}/${getAllMembershipsResponse.body.data[0]}/freezing`)
            .set('Cookie', [`user_token=${userToken}`]);

        expect(res.status).toBe(200);
    });
});
