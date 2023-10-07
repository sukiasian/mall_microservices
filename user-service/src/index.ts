import UtilFunctions from './utils/UtilFunctions';
import Router from './Router';
import Controller from './Controller';
import Service from './Service';
import _1CService from './_1CService';
import { Application } from './Application';
import { Server } from './Server';
import Database from './Database';
import Dao from './Dao';

(async () => {
    UtilFunctions.configureDotenvDev();
    const dao = new Dao();
    const service = new Service(dao);
    const _1Cservice = new _1CService();

    const controller = new Controller(service, _1Cservice);

    const router = new Router(controller).getExpressInstance();
    const app = new Application(router).getExpressInstance();

    const server = new Server(app);

    server.start();
    await Database.start();

    UtilFunctions.setServer(server.getExpressInstance());
    await UtilFunctions.handleExitProcess();
})();
