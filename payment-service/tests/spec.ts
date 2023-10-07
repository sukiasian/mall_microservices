import * as express from 'express';
import * as request from 'supertest';
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

    it("GET /cart should return client's cart.", async () => {
        const res = await request(app).get(MicroserviceURL.CART);

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeDefined();
    });
    it("GET /debts should return client's debts.", async () => {
        const res = await request(app).get(MicroserviceURL.DEBTS);

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeDefined();
    });
    it("GET /cards should return client's credit cards.", async () => {
        const res = await request(app).get(MicroserviceURL.CARDS);

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeDefined();
    });
    it('POST /payment should create a payment.', async () => {
        const res = await request(app).post(MicroserviceURL.DEBTS);

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeDefined();
    });

    it('POST /debts/payment should create a post-payment.', async () => {});
    it("POST /cards should add a credit card to client's account", async () => {});
});
