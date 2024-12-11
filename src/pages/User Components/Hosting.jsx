import React from "react";
import EventCard from "../../components/EventCard";
import { events } from "../../data/data";
import Pagination from "../../components/Pagination";
import Empty from "../../components/Empty";
import Loader from "../../components/Loader";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";

const Hosting = () => {
  const token = localStorage.getItem("mb-token");
  const url = "https://mbevent-server.onrender.com/api/v1/event/hosted";
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getEvent = async () => {
    try {
      const result = await axios(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(result);
      setIsLoading(false);
      setEvents(result.data.events);
    } catch (error) {
      // console.log(error);
      if (error && error?.status === 401) {
        toast.error("Session Expired", Login);
        localStorage.removeItem("mb-token");
        localStorage.removeItem("user");
        redirect("/login");
      }
    }
  };
  useEffect(() => {
    getEvent();
  }, []);
  if (isLoading) {
    return <Loader height="150px" />;
  }
  if (!isLoading && events.length === 0) {
    return <Empty content="You are not hosting any event" height="200px" />;
  }
  return (
    <div className="container">
      <h2 className="my-3">Hosting</h2>
      <div className="d-flex justify-content-between flex-wrap">
        {events.map((event) => {
          return <EventCard key={event._id} {...event} />;
        })}
      </div>
      <Pagination />
    </div>
  );
};

export default Hosting;
