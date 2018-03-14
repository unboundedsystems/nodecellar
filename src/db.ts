
import { Sequelize } from 'sequelize-typescript';

/*
 * First look for Docker container environment variables that are
 * set when using the --link xx:postgres option. That sets a
 * bunch of env vars that tell us how to connect to a postgres
 * container.
 * Otherwise, fall back to some basic environment variables.
 * Last, use 'postgres:postgres@localhost:5432'
 */
const host =
    process.env.POSTGRES_PORT_5432_TCP_ADDR ||
    process.env.POSTGRES_HOST ||
    'localhost';
const port =
    Number(process.env.POSTGRES_PORT_5432_TCP_PORT) ||
    Number(process.env.POSTGRES_PORT) ||
    5432;
const username =
    process.env.POSTGRES_ENV_POSTGRES_USER ||
    process.env.POSTGRES_USER ||
    'postgres';
const password =
    process.env.POSTGRES_ENV_POSTGRES_PASSWORD ||
    process.env.POSTGRES_PASSWORD ||
    'postgres';

console.log(`Connecting to ${username}:xxx@${host}:${port}`);

export const sequelize = new Sequelize({
    host,
    port,
    username,
    password,
    dialect:  'postgres',
    database: 'winedb',
});
