import 'source-map-support/register';
import { sequelize } from './db';

import './server';
import { Wine } from './models/Wine';
import { populateDB } from './routes/wines';

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    const maxTries = 10;
    let i = 0;
    for (; i < maxTries; ++i) {
        try {
            await sequelize.sync({force: true});
            break;

        } catch (err) {
            const errType = err && err.name;
            switch (errType) {
                case 'SequelizeConnectionRefusedError':
                    console.log(`Database connection refused`);
                    await sleep(1000);
                    break;

                default:
                    console.log(err);
                    console.log(`Error connecting to database: ${errType}. ` +
                                `Exiting`);
                    process.exit(1);
            }
        }
    }

    if (i >= maxTries) {
        console.log(`Unable to connect to database after ${maxTries} tries. ` +
                    `Exiting.`);
        process.exit(1);
    }

    try {
        const test = await Wine.findOne();
        if (!test) {
            console.log(`Populating database with sample data.`);
            await populateDB();
        }
    } catch (err) {
        console.log(err);
        console.log(`Error setting up database`);
        process.exit(1);
    }
}

main();
