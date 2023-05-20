module.exports = {
    apps: [
        {
            name: 'mnb-email',
            script: 'npm',
            args: 'start',
            env: {
                NODE_ENV: 'production',
            },
            exp_backoff_restart_delay: 100,
        },
    ],
};