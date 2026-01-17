import { defineConfig } from '@prisma/config';
import 'dotenv/config';

export default defineConfig({
    migrations: {
        seed: 'tsx prisma/seed.ts',
    },
    datasource: {
        url: process.env.DIRECT_URL,
        //directUrl: process.env.DIRECT_URL,
    },
});