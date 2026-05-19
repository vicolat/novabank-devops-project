const pino = require("pino");

const isProd = process.env.NODE_ENV === "production";

module.exports = pino({
  level: isProd ? "info" : "debug",
  base: {
    service: "novabank-backend",
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: !isProd
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      }
    : undefined,
});