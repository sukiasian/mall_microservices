import * as request from 'supertest';
import * as express from 'express';
import * as axios from 'axios';
import TestManager from './TestManager';
import { describe, beforeAll, afterAll, it, expect } from '@jest/globals';
import { MicroserviceURL } from '../src/types/enums';

describe('Services (e2e)', () => {
    let app: express.Application;
    let clubId: string;

    beforeAll(async () => {
        app = TestManager.getAppExpressInstance();

        clubId = '9186cdca-e45c-11ed-8516-b76bc546f423';
    });

    afterAll(() => {
        TestManager.stop();
    });

    it('GET /availability/services should return all available services for a specified period.', async () => {
        const res = await request(app).get(`${MicroserviceURL.AVAILABILITY}/services`).query({ club_id: clubId });

        expect(res.status).toBe(200);
    });

    it('GET /availability/masters should return all available masters for a specified period.', async () => {
        const res = await request(app).get(`${MicroserviceURL.AVAILABILITY}/services`).query({ club_id: clubId });

        expect(res.status).toBe(200);
    });

    it('GET /availability/dates should return all available dates for appointment.', async () => {
        const res = await request(app).get(`${MicroserviceURL.AVAILABILITY}/services`).query({ club_id: clubId });

        expect(res.status).toBe(200);
    });

    it('GET /availability/slots should return all available slots for appointment.', async () => {
        const res = await request(app).get(`${MicroserviceURL.AVAILABILITY}/services`).query({ club_id: clubId });

        expect(res.status).toBe(200);
    });

    // ERROR FROM 1C
    it('POST /appointment should create an appointment for a service.', async () => {
        const userToken = await TestManager.acquireUserToken();

        const res = await request(app)
            .post(MicroserviceURL.APPOINTMENTS)
            .set('Cookie', [`user_token=${userToken}`])
            .send(TestManager.createAppointmentRequestBody(clubId));

        expect(res.status).toBe(201);
    });
});
