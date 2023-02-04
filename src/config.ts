import * as dotEnv from "dotenv";

const { argv } = require('yargs');
const configPath = argv.env ? `.env.${argv.env}` : null;

dotEnv.config({ path: configPath });

const CONFIG = Object.assign({
        KEEP_LOGS_LAST_DAYS: 180,
    } as any,
    process.env,
);

export const {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    FIREBASE_API_KEY,
    FIREBASE_APP_ID
} = CONFIG;