import * as request from 'supertest';
import * as express from 'express';
import TestManager from './TestManager';
import { describe, beforeAll, afterAll, it, expect } from '@jest/globals';
import ApiService from '../src/ApiService';
import Redis from '../src/Redis';
import { MicroserviceURL } from '../src/types/enums';

describe('Delivery (e2e)', () => {
    let app: express.Application;

    let apiService: ApiService;

    let token: string;

    beforeAll(async () => {
        app = TestManager.getAppExpressInstance();
        apiService = new ApiService(Redis.getClient());

        token = (await apiService.login()).data.token;
    });

    afterAll(() => {
        TestManager.stop();
    });

    it('POST /orders should create new order.', async () => {
        const response = await request(app).post(MicroserviceURL.ORDERS).set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(201);
        expect(response.body.orderId).toBeDefined();
    });

    it('GET /orders/:id should get order by id.', async () => {
        const response = await request(app)
            .get(`${MicroserviceURL.ORDERS}/:orderId`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.orderId).toBeDefined();
    });

    it('DELETE /orders/:id should delete order by id.', async () => {
        const response = await request(app)
            .delete(`${MicroserviceURL.ORDERS}/:orderId`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    it('GET /orders/:id/status should get all markets.', async () => {
        const response = await request(app)
            .get(`${MicroserviceURL.ORDERS}/:orderId/status`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    it('GET /markets/:id/availability should get available markets.', async () => {
        const response = await request(app)
            .get(`${MicroserviceURL.MARKETS}/:marketId/availability`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    it('GET /tree should get the tree.', async () => {
        const response = await request(app).get(`${MicroserviceURL.TREE}`).set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    it('GET /precheck should get data vor verifying.', async () => {
        const response = await request(app).get(`${MicroserviceURL.PRECHECK}`).set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });
});
