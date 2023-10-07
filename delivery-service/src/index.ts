import UtilFunctions from './utils/UtilFunctions';
import Router from './Router';
import Controller from './Controller';
import Redis from './Redis';
import Service from './Service';
import ApiService from './ApiService';
import CronExecutor from './crons/CronExecutor';
import CronJobs from './crons/CronJobs';
import LoginMiddleware from './middleware/LoginMiddleware';
import { Application } from './Application';
import { Server } from './Server';
import Database from './Database';
import Dao from './Dao';

(async () => {
    UtilFunctions.configureDotenvDev();

    await Redis.start();

    const redisClient = Redis.getClient();

    const dao = new Dao();
    const service = new Service(dao);
    const apiService = new ApiService(redisClient);

    const controller = new Controller(service, apiService);
    const loginMiddleware = new LoginMiddleware(redisClient);

    const cronJobs = new CronJobs(apiService);
    const cronExecutor = new CronExecutor(cronJobs);

    await cronExecutor.execute();
    cronExecutor.schedule();

    const router = new Router(controller, loginMiddleware).getExpressInstance();
    const app = new Application(router).getExpressInstance();

    const server = new Server(app, redisClient, apiService);

    server.start();

    await Database.start();

    UtilFunctions.setServer(server.getExpressInstance());

    await UtilFunctions.handleExitProcess();
})();
