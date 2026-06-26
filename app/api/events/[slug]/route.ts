import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Event } from "@/database/event.model";

// In Next.js 15+ (and 16), dynamic route parameters are accessed as a Promise
type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function GET(req: NextRequest, { params }: Props) {
    try {
        // 1. Establish database connection
        await connectToDatabase();

        // 2. Await the dynamic params
        const { slug } = await params;

        // 3. Validate slug parameter
        if (!slug || typeof slug !== 'string' || slug.trim() === '') {
            return NextResponse.json(
                { message: "Slug parameter is required" }, 
                { status: 400 }
            );
        }

        // 4. Query the database for the specific event
        const event = await Event.findOne({ slug });

        // 5. Handle case where no event matches the slug
        if (!event) {
            return NextResponse.json(
                { message: "Event not found" }, 
                { status: 404 }
            );
        }

        // 6. Return the successfully found event
        return NextResponse.json(
            { message: "Event fetched successfully", event }, 
            { status: 200 }
        );

    } catch (error) {
        // 7. Handle unexpected server errors gracefully
        console.error("Error fetching event by slug:", error);
        
        return NextResponse.json(
            { 
                message: "Event Fetching Failed", 
                error: error instanceof Error ? error.message : "Unknown error occurred" 
            }, 
            { status: 500 }
        );
    }
}
