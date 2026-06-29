import ExploreBtn from '@/components/ExploreBtn'
import EventCard from '@/components/EventCard';
import { IEvent } from '@/database';
import { getAllEvents } from '@/lib/actions/event.actions';
import { Suspense } from "react";

const HomeContent = async () => {
  const events = await getAllEvents();
  
  return (
    <div className='mt-20 space-y-7'>
      <h3>Featured Events</h3>   
      <ul className="events">
        {events && events.length > 0 && events.map((event:IEvent) => (
          <li key={event.title} className='list-none'> 
            <EventCard {...event}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

const page = async () => {
  return (
    <section>
        <h1 className="text-center"> The Hub for Every Dev <br/>  Event you mustn't miss</h1>
        <p className="text-center mt-5"> Hackathons, Meetups,Conferences, All in one place</p>

        <ExploreBtn/>

        <Suspense fallback={<div className="mt-20">Loading events...</div>}>
          <HomeContent />
        </Suspense>
    </section>
  )
}

export default page;
