import * as cron from 'node-cron';
import { AbstractCronExecutor } from '../types/abstracts';
import CronJobs from './CronJobs';

export default class CronExecutor implements AbstractCronExecutor {
    private cronJobs: CronJobs;

    constructor(cronJobs: CronJobs) {
        this.cronJobs = cronJobs;
    }

    public execute = async () => {
        return Promise.allSettled(
            this.cronJobs.getJobs().map(async (job) => {
                await job();
            })
        );
    };

    public schedule = (): void => {
        cron.schedule('0 0 7 * *', this.execute, {
            scheduled: true,
            timezone: 'Europe/Moscow',
        });
    };
}
