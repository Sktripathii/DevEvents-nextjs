'use server';
import {Booking} from "@/database/booking.model"
import connectToDatabase from "@/lib/mongodb";

export const createBooking = async ({eventId, slug,email}:{eventId:string, slug:string,email:string}) => {
    try{
        await connectToDatabase();
        
        // Remove slug (not in schema) and fix the lean() crash
        const newBooking = await Booking.create({eventId, email});
        const booking = JSON.parse(JSON.stringify(newBooking));

        return {success: true, booking};
    }
    catch (error){
        console.error('create booking failed ',error);
        return {success: false, error };
    }
}

