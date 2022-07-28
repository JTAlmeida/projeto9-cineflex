import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Legends from "./Legends";
import Buyerdata from "./Buyerdata";
import Footer from "./Footer";

export default function Seats() {
  const { idSessao } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectSeats, setSelectSeats] = useState([]);
  const [movieInfo, setMovieInfo] = useState([]);
  const [dayInfo, setDayInfo] = useState([]);

  useEffect(() => {
    const request = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
    );

    request.then((res) => {
      setSeats(res.data);
      setSelectSeats(res.data.seats);
      setMovieInfo(res.data.movie);
      setDayInfo(res.data.day);
    });
  }, []);
  //console.log(seats);
  console.log(selectSeats);
  //console.log(movieInfo);

  return (
    <>
      <h2>Selecione o(s) assento(s)</h2>
      <div className="seats">
        {selectSeats.map((selectSeat, index) => (
          <Seat
            key={index}
            id={selectSeat.id}
            name={selectSeat.name}
            availability={selectSeat.isAvailable}
          />
        ))}
      </div>
      <Legends />

      <Buyerdata />

      <Footer
        title={movieInfo.title}
        posterURL={movieInfo.posterURL}
        weekday={dayInfo.weekday}
        time={seats.name}
      />
    </>
  );
}

function Seat({ id, name, availability }) {
  if (availability === "true") {
    return (
      <div className="seat" onClick="">
        {name}
      </div>
    );
  } else {
    return (
      <div className="seat unavailable">
        {name}
      </div>
    );
  }
}
