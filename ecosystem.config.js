module.exports = {
    apps: [
        {
            name: 'api-gateway',
            watch: false,
            // instances: 2,
            ignore_watch: ['./log', './dist', './package-lock.json', './node_modules'],
            env_production: {
                NODE_ENV: 'production',
            },
            env_development: {
                NODE_ENV: 'development',
            },
            script: 'npm',
            cwd: './api-gateway',
            args: 'run start:pm2',
            exec_mode: 'fork',
        },
        {
            name: 'auth-service',
            watch: false,
            // instances: 4,
            ignore_watch: ['./log', './dist', './package-lock.json', './node_modules'],
            env_production: {
                NODE_ENV: 'production',
            },
            env_development: {
                NODE_ENV: 'development',
            },
            script: 'npm',
            cwd: './auth-service',
            args: 'run start:pm2',
            exec_mode: 'fork',
        },
        {
            name: 'bonuses-service',
            watch: false,
            // instances: 4,
            ignore_watch: ['./log', './dist', './package-lock.json', './node_modules'],
            env_production: {
                NODE_ENV: 'production',
            },
            env_development: {
                NODE_ENV: 'development',
            },
            script: 'npm',
            cwd: './bonuses-service',
            args: 'run start:pm2',
            exec_mode: 'fork',
        },
        {
            name: 'delivery-service',
            watch: false,
            // instances: 4,
            ignore_watch: ['./log', './dist', './package-lock.json', './node_modules'],
            env_production: {
                NODE_ENV: 'production',
            },
            env_development: {
                NODE_ENV: 'development',
            },
            script: 'npm',
            cwd: './delivery-service',
            args: 'run start:pm2',
            exec_mode: 'fork',
        },
        // {
        //     name: 'membership-service',
        //     watch: true,
        //     // instances: 4,
        //     ignore_watch: ['./log', './dist', './package-lock.json', './node_modules'],
        //     env_production: {
        //         NODE_ENV: 'production',
        //     },
        //     env_development: {
        //         NODE_ENV: 'development',
        //     },
        //     script: 'npm',
        //     cwd: './membership-service',
        //     args: 'run start:pm2',
        //     exec_mode: 'fork',
        //   max_memory_restart: '300M'
        // },
        // {
        //     name: 'parking-service',
        //     watch: true,
        //     // instances: 4,
        //     ignore_watch: ['./log', './dist', './package-lock.json', './node_modules'],
        //     env_production: {
        //         NODE_ENV: 'production',
        //     },
        //     env_development: {
        //         NODE_ENV: 'development',
        //     },
        //     script: 'npm',
        //     cwd: './parking-service',
        //     args: 'run start:pm2',
        //     exec_mode: 'fork',
        //   max_memory_restart: '300M'
        // },
        {
            name: 'payment-service',
            watch: false,
            // instances: 4,
            ignore_watch: ['./log', './dist', './package-lock.json', './node_modules'],
            env_production: {
                NODE_ENV: 'production',
            },
            env_development: {
                NODE_ENV: 'development',
            },
            script: 'npm',
            cwd: './payment-service',
            args: 'run start:pm2',
            exec_mode: 'fork',
        },
        {
            name: 'schedule-service',
            watch: false,
            // instances: 4,
            ignore_watch: ['./log', './dist', './package-lock.json', './node_modules'],
            env_production: {
                NODE_ENV: 'production',
            },
            env_development: {
                NODE_ENV: 'development',
            },
            script: 'npm',
            cwd: './schedule-service',
            args: 'run start:pm2',
            exec_mode: 'fork',
        },
        {
            name: 'services-service',
            watch: false,
            ignore_watch: ['./log', './dist', './package-lock.json', './node_modules'],
            // instances: 4,
            env_production: {
                NODE_ENV: 'production',
            },
            env_development: {
                NODE_ENV: 'development',
            },
            script: 'npm',
            cwd: './services-service',
            args: 'run start:pm2',
            exec_mode: 'fork',
        },
        {
            name: 'user-service',
            watch: false,
            ignore_watch: ['./log', './dist', './package-lock.json', './node_modules'],
            // instances: 4,
            env_production: {
                NODE_ENV: 'production',
            },
            env_development: {
                NODE_ENV: 'development',
            },
            script: 'npm',
            cwd: './user-service',
            args: 'run start:pm2',
            exec_mode: 'fork',
        },
    ],
    deploy: {
        development: {
            env: {
                NODE_ENV: 'development',
            },
            user: 'root',
            ssh: '~/.ssh/hostinger.pub',
            host: ['154.41.254.68:22'],
            ref: 'origin/main',
            repo: 'git@github.com:polydev-io/foodmall_backend.git',
            path: '/root/projects',
            'post-setup': 'npx tsc',
            'post-deploy': 'pm2 startOrRestart ecosystem.json --env development',
        },
    },
};
