import * as dotEnv from "dotenv";

dotEnv.config();

const CONFIG = Object.assign({
        KEEP_LOGS_LAST_DAYS: 180,
    } as any,
    process.env,
);

export const {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME
} = CONFIG;