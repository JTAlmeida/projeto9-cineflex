import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

export default function Sessions() {
  const { idFilme } = useParams();
  const [sessions, setSessions] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [useLocation()]);
  
  useEffect(() => {
    const request = axios.get(
      `https://mock-api.driven.com.br/api/v7/cineflex/movies/${idFilme}/showtimes`
    );

    request.then((res) => {
      setSessions(res.data);
      setDays(res.data.days);
    });
  }, []);

  return (
    <>
      <h2>Selecione o horário</h2>
      <div className="sessions">
        {days.map((session, index) => (
          <Session
            key={index}
            id={session.id}
            date={session.date}
            weekday={session.weekday}
            showtimes={session.showtimes}
          />
        ))}
      </div>
      <Footer title={sessions.title} posterURL={sessions.posterURL} />
    </>
  );
}

function Session({ id, date, weekday, showtimes }) {
  return (
    <>
      <h3>
        {weekday} - {date}
      </h3>
      <div className="movie-hours">
        {showtimes.map((time) => (
          <Times key={time.id} id = {time.id} name={time.name} />
        ))}
      </div>
    </>
  );
}

function Times({ id, name }) {
  return (
    <>
      <Link to={`/assentos/${id}`}>
        <div className="time">{name}</div>
      </Link>
    </>
  );
}
