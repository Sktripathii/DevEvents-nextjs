'use server';

import { Event } from '@/database/event.model';
import connectToDatabase from '../mongodb';

export const getEventBySlug = async (slug: string) => {
    try {
        await connectToDatabase();
        const event = await Event.findOne({ slug }).lean();
        return event ? JSON.parse(JSON.stringify(event)) : null;
    } catch (error) {
        console.error("Failed to fetch event by slug:", error);
        return null;
    }
}
export const getSimilarEventsBySlug = async (slug : string) => {
    try{
        await connectToDatabase();   
        const event = await Event.findOne({slug}) 
        
        if (!event) return [];

        const similarEvents = await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags || [] } }).lean();  
        return JSON.parse(JSON.stringify(similarEvents));
        
    }

    catch(error){
        console.error("Failed to fetch similar events:", error);
        return []
    }



}