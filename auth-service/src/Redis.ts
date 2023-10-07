import * as redis from 'redis';
import * as childProcess from 'child_process';
import { promisify } from 'util';
import basicLogger from './loggers/basicLogger';
import { NodeEnvironment } from './types/enums';

export default class Redis {
    private static CLIENT: redis.RedisClientType;
    private static START_REDIS_ON_HOST_CMD = 'redis server';
    private static STOP_REDIS_ON_HOST_CMD = 'redis-cli shutdown';
    private static REDIS_HOST = process.env.NODE_ENV === NodeEnvironment.PRODUCTION ? 'redis_auth' : '127.0.0.1';

    public static start = async (): Promise<void> => {
        this.CLIENT = redis.createClient({ url: `redis://${this.REDIS_HOST}:6379` });

        this.CLIENT.on('error', (err: Error) => {
            basicLogger.error(err);

            process.exit(1);
        });

        await this.CLIENT.connect();
    };

    private static executeCommand = (command: string): Promise<{ stdout: string; stderr: string }> => {
        try {
            const exec = promisify(childProcess.exec);

            return exec(command);
        } catch (err) {
            basicLogger.error(err);
        }
    };

    public static startRedisServerOnHost = (): void => {
        try {
            this.executeCommand(this.START_REDIS_ON_HOST_CMD);
        } catch (err: unknown) {
            basicLogger.error(err);
        }
    };

    public static shutdownRedisServerOnHost = async (): Promise<void> => {
        await this.CLIENT.disconnect();

        await this.executeCommand(this.STOP_REDIS_ON_HOST_CMD);
    };

    public static getClient = (): redis.RedisClientType => {
        return this.CLIENT;
    };
}
