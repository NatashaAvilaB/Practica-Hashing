import { Client } from 'pg'

export const connectDB = async () => {
    const client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        ssl: {
            ca: process.env.DB_CA,
            rejectUnauthorized: false
        }
    })
    await client.connect()
    return client
}
