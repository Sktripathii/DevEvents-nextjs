 import {notFound} from "next/navigation"
 import Image from "next/image";
 import { unstable_cacheLife as cacheLife } from "next/cache";
 import BookEvent from "@/components/BookEvent";
 import { getSimilarEventsBySlug, getEventBySlug } from "@/lib/actions/event.actions";
import { IEvent } from "@/database";
import EventCard from "@/components/EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({icon, alt, label} : {icon:string, alt:string, label:string}) => {
  return (
    <div className="flex-row-gap-2 item-center">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  );
}

const EventAgenda = ({agendaItems}: {agendaItems: string[]}) => {
  return (
    <section className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

const EventTags = ({tags}: {tags: string[]}) => {
  return (
    <div className="flex-row-gap-1.5 flex--wrap">
      {
        tags.map((tag) => (
          <div className="pill" key={tag}>{tag}</div>
        ))
      }
      
    </div>
  );
}

import { Suspense } from "react";

const EventDetailsContent = async ({ slug }: { slug: string }) => {
  const event = await getEventBySlug(slug);
  
  if(!event || !event.description){
    return notFound();
  }
  
  const {description, image, overview, date,time, location, mode, agenda,audience, organizer, tags} = event;
  const bookings = 10;
  const similarEvents = await getSimilarEventsBySlug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description </h1>
        <p>{description} </p> 
      </div>

      <div className="details">
        {/* Left side - Event Content */}

      <div className="content">
        <Image src={image} alt="Event Banner" width={800} height={800} className="Banner"/>

        <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>

        </section>

        <section className="flex-col-gap-2">
          <h2>Event Details</h2>
           <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date}/>
           <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time}/>
           <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location}/>
           <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode}/>
           <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience}/>

        </section>  
        {agenda && agenda.length > 0 && (
          <EventAgenda agendaItems={agenda[0].startsWith('[') ? JSON.parse(agenda[0]) : agenda} />
        )}

        <section className="flex-col-gap-2">
          <h2>About the Organizer</h2>
          <p>{organizer}</p>
        </section>

        <h2>Tags</h2>
        {tags && tags.length > 0 && (
          <EventTags tags={tags[0].startsWith('[') ? JSON.parse(tags[0]) : tags} />
        )}

        

      </div>

      {/* Right side - Booking */}
      <aside className="booking">
        <div className="signup-card">
          <h2> Book Your Spot</h2>
          {bookings > 0 ? (
            <p className="text-sm">
              Join {bookings} people who have  already booked their spot!
            </p>
          ): (
            <p className="text-sm">Be the first one to book your spot</p>
          )}
          <BookEvent eventId={event._id.toString()} slug={event.slug} />
        </div>
        
      </aside>
      </div>

      <div className="flex  w-full flex-col gap-4 pt-20">

        <h2>
          Similar Events
        </h2>
        <div className="events">
          {similarEvents.length > 0 && similarEvents.map((similarEvent:IEvent)=>(
            <EventCard key={similarEvent._id.toString()} {...similarEvent} />
          ))}
        </div>
      </div>
            
    </section>
  )
}

const EventDetailsPage = async ({params} : {params: Promise<{slug: string}>}) => {
  const {slug} = await params;
  return (
    <Suspense fallback={<div>Loading event details...</div>}>
      <EventDetailsContent slug={slug} />
    </Suspense>
  );
}

export default EventDetailsPage;