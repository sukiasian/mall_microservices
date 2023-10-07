import UtilFunctions from './utils/UtilFunctions';
import { Application } from './Application';
import { Server } from './Server';
import Router from './Router';
import Controller from './Controller';
import _1CService from './_1CService';
import Redis from './Redis';
import Service from './Service';
import Dao from './Dao';
import Database from './Database';
import basicLogger from './loggers/basicLogger';

(async () => {
    try {
        UtilFunctions.configureDotenvDev();

        await Redis.start();

        const dao = new Dao();

        const service = new Service(dao);
        const _1Cservice = new _1CService();

        const controller = new Controller(service, _1Cservice);

        const redisClient = Redis.getClient();

        const router = new Router(controller, redisClient).getExpressInstance();
        const app = new Application(router).getExpressInstance();

        const server = new Server(app);

        server.start();

        await Database.start();

        UtilFunctions.setServer(server.getExpressInstance());
        await UtilFunctions.handleExitProcess();
    } catch (err) {
        basicLogger.error(err);
    }
})();
