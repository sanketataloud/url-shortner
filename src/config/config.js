import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export default {
    APP_PORT : process.env.APP_PORT || 4005,
    MONGO_URI : process.env.MONGO_URI || '',
    BASE : process.env.BASE
}