import connectToDatabase from "../lib/mongodb";
import { Event } from "../database/event.model";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: "/home/satyam/Desktop/nextjs-course/.env.local" });

async function check() {
    await connectToDatabase();
    const events = await Event.find().sort({createdAt: -1}).limit(2);
    console.log(JSON.stringify(events, null, 2));
    process.exit(0);
}

check();
