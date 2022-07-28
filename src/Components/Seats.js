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
  const [selectedSeats, setSelectedSeats] = useState([]);

  console.log(selectedSeats);
  useEffect(() => {
    const request = axios.get(
      `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSessao}/seats`
    );

    request.then((res) => {
      setSeats(res.data);
      setSelectSeats(res.data.seats);
      setMovieInfo(res.data.movie);
      setDayInfo(res.data.day);
    });
  }, []);

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
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
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

function Seat({ id, name, availability, selectedSeats, setSelectedSeats }) {
  const [selected, setSelected] = useState(false);

  if (availability === true && selected === false) {
    return (
      <div
        className="seat"
        onClick={() => {
          setSelected(!selected);
          setSelectedSeats([...selectedSeats, id]);
        }}
      >
        {name}
      </div>
    );
  } else if (availability === true && selected === true) {
    let temp = [];
    return (
      <div
        className="seat selected"
        onClick={() => {
          setSelected(!selected);
          for(let i = 0; i<selectedSeats.length; i++){
            if (selectedSeats[i]!==id){
              temp.push(selectedSeats[i])
            }
          }
          setSelectedSeats(temp);
        }}
      >
        {name}
      </div>
    );
  } else {
    return <div className="seat unavailable">{name}</div>;
  }
}
