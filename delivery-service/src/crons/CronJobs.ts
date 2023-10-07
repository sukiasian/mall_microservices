import { CronJob } from '../types/types';
import { AbstractCronJobs } from '../types/abstracts';
import ApiService from '../ApiService';

export default class CronJobs implements AbstractCronJobs {
    private apiService: ApiService;
    private jobs: CronJob[] = [];

    constructor(apiService: ApiService) {
        this.apiService = apiService;

        this.setJob(this.fetchTokenOnDailyBasis);
    }

    private setJob = (job: CronJob): void => {
        this.jobs.push(job);
    };

    private fetchTokenOnDailyBasis = async (): Promise<void> => {
        await this.apiService.login();
    };

    public getJobs = (): CronJob[] => {
        return this.jobs;
    };
}
