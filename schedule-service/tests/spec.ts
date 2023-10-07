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

    it('POST /signup should register a user.', async () => {});
});
