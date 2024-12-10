import React from "react";
import SectionHeading from "../SectionHeading";
import { events } from "../../data/data";
import EventCard from "../EventCard";
import axios from "axios";
import Empty from "../Empty";
import Loader from "../Loader";
import { useFetch } from "../../utils/useFetch";
const UpcomingEvents = () => {
  const url = "https://mbevent-server.onrender.com/api/v1/event/upcoming";
  const {
    isLoading,
    data: { events },
  } = useFetch(url);
  //console.log(data);

  return (
    <div className="my-5 container">
      <SectionHeading heading="Upcoming Events" />

      {isLoading ? (
        <Loader height="200px" />
      ) : !isLoading && events.length === 0 ? (
        <Empty height="150px" content="No upcoming Events" />
      ) : (
        <div
          className=" d-flex justify-content-between align-items-center gap-4 event-container my-3"
          style={{ overflowX: "scroll" }}
        >
          {events.map((event) => {
            return <EventCard key={event._id} {...event} />;
          })}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
