import UtilFunctions from './utils/UtilFunctions';
import { Application } from './Application';
import { Server } from './Server';
import Router from './Router';
import Controller from './Controller';
import Service from './Service';
import _1CService from './_1CService';

UtilFunctions.configureDotenvDev();

const service = new Service();
const _1Cservice = new _1CService();
const controller = new Controller(service, _1Cservice);

const router = new Router(controller).getExpressInstance();
const app = new Application(router).getExpressInstance();

const server = new Server(app);

server.start();

UtilFunctions.setServer(server.getExpressInstance());
UtilFunctions.handleExitProcess();
