import UtilFunctions from './utils/UtilFunctions';
import Redis from './Redis';
import RequestAttemptsLimiterMiddleware from './middleware/RequestAttemptsMiddleware';
import { Server } from './Server';
import { Application } from './Application';
import { RedisKey } from './types/enums';

UtilFunctions.configureDotenv();

(async () => {
    await Redis.start();

    const redisClient = Redis.getClient();

    const requestAttemptsLimiterMW = new RequestAttemptsLimiterMiddleware(redisClient, RedisKey.REQUEST_ATTEMPTS);

    const app = new Application(requestAttemptsLimiterMW).getInstance();

    const server = new Server(app);

    server.start();

    UtilFunctions.setServer(server.getExpressInstance());
    UtilFunctions.handleExitProcess();
})();
