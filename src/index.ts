import 'source-map-support/register';
import { sequelize } from './db';

import './server';
import { Wine } from './models/Wine';
import { populateDB } from './routes/wines';


async function main() {
    try {
        await sequelize.sync({force: true});

    } catch (err) {
        console.log(err);
        console.log(`Unable to connect to database. Exiting.`);
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
