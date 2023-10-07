import * as request from 'supertest';
import * as express from 'express';
import TestManager from './TestManager';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@jest/globals';
import { MicroserviceURL } from '../src/types/enums';

describe('User (e2e)', () => {
    let app: express.Application;

    beforeAll(async () => {
        app = TestManager.getAppExpressInstance();
    });

    beforeEach(async () => {});

    afterEach(async () => {});

    afterAll(() => {
        TestManager.stop();
    });

    it("GET /accounts should return client's bonus accounts.", async () => {
        const userToken = await request(app).get('');

        const res = await request(app)
            .get(MicroserviceURL.ACCOUNTS)
            .set('Cookie', [`user_token=${userToken}`]);

        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBeTruthy();
    });

    it("GET /history should return client's bonus history.", async () => {
        const userToken = await request(app).get('');

        const res = await request(app)
            .get(MicroserviceURL.HISTORY)
            .set('Cookie', [`user_token=${userToken}`]);

        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBeTruthy();
    });
});
