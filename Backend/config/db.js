import {neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

//if (!process.env.DATABASE_URL) {
//    throw new Error("DATABASE_URL is not defined in environment variables");
//}

// this will create a connection to the database(sql)
export const sql = neon(process.env.DATABASE_URL);