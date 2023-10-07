import * as request from 'supertest';
import * as express from 'express';
import TestManager from './TestManager';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@jest/globals';
import { MicroserviceURL } from '../src/types/enums';
import { SignupBody } from '../src/types/interfaces';

describe('Auth (e2e)', () => {
    let app: express.Application;
    let signupBody: SignupBody;

    beforeAll(async () => {
        app = TestManager.getAppExpressInstance();
    });

    beforeEach(async () => {
        signupBody = await TestManager.createSignupBody();
    });

    afterEach(async () => {});

    afterAll(() => {
        TestManager.stop();
    });

    it('POST /signup should register a user.', async () => {
        const res = await request(app)
            .post(MicroserviceURL.SIGNUP_OR_LOGIN)
            .send({ phone: '79649059722', password: 'Hhelloworld2' });

        expect(res.status).toBe(200);
        expect(res.body.data.id).toBeTruthy();
    });

    it('POST /signup should set a user_token cookie.', async () => {
        const res = await request(app)
            .post(MicroserviceURL.SIGNUP_OR_LOGIN)
            .send({ phone: '79649059722', password: 'Hhelloworld2' });

        expect(res.status).toBe(200);
        expect(TestManager.cookieExists(res, 'user_token')).toBeTruthy();
    });

    it('POST /login should login user', async () => {
        const res = await request(app)
            .post(MicroserviceURL.LOGIN)
            .send({ phone: '79649059722', password: 'Hhelloworld2' });

        expect(res.status).toBe(200);
        expect(res.body.data.user_token).toBeTruthy();
    });

    it('POST /login should set a user_token cookie', async () => {
        const res = await request(app)
            .post(MicroserviceURL.LOGIN)
            .send({ phone: '79649059722', password: 'Hhelloworld2' });

        expect(res.status).toBe(200);
        expect(TestManager.cookieExists(res, 'user_token')).toBeTruthy();
    });

    it('POST /phoneConfirmation should confirm phone number.', async () => {
        const loginRes = await request(app)
            .post(MicroserviceURL.LOGIN)
            .send({ phone: '79649059722', password: 'Hhelloworld2' });
        const userToken = loginRes.body.data.user_token;

        // TO GET A CODE
        const getConfirmationCodeRes = await request(app)
            .post(MicroserviceURL.PHONE_CONFIRMATION)
            .send({ phone: '79649059722', auth_type: 'sms' })
            .set('Cookie', [`user_token=${userToken}`]);

        expect(getConfirmationCodeRes.statusCode).toBe(200);

        // TO CONFIRM THE CODE
        const confirmPhoneRes = await request(app)
            .post(MicroserviceURL.PHONE_CONFIRMATION)
            .send({ phone: '79649059722', confirmation_code: '' })
            .set('Cookie', [`user_token=${userToken}`]);

        expect(confirmPhoneRes.status).toBe(200);
    });

    it('GET /publicOffer should send the public offer page to a user.', async () => {
        const res = await request(app).get(MicroserviceURL.PUBLIC_OFFER);
    });

    it('GET /agreement should send the agreement page.', async () => {});

    it('POST /password should create a new password for a user.', async () => {
        const res = await request(app)
            .post(MicroserviceURL.PASSWORD)
            .send({ phone: '79649059722', password: 'Hhelloworld2' });

        expect(res.status).toBe(200);
        expect(res.body.data.id).toBeTruthy();
    });

    it('POST /password should set a user_token cookie', async () => {
        const res = await request(app)
            .post(MicroserviceURL.PASSWORD)
            .send({ phone: '79649059722', password: 'Hhelloworld2' });

        expect(res.status).toBe(200);
        expect(TestManager.cookieExists(res, 'user_token')).toBeTruthy();
    });
});
