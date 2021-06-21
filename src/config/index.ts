import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = dotenv.config();

if (env.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    port: process.env.PORT || 3000,

    /**
    * Used by winston logger
    */
    logs: {
      level: process.env.LOG_LEVEL || 'silly',
      format: process.env.LOG_FORMAT
    },
    /**
     * API configs
     */
    api: {
        prefix: '/v1',
    }
};

