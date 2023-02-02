module.exports = {
  apps: [
    {
      name: "app",
      script: "./src/server.js",
      instances: 0,
      exec_mode: "cluster",
      watch: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
