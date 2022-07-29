import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Legends from "./Legends";
import Footer from "./Footer";

export default function Seats({ setSucessInfo, sucessInfo }) {
  const { idSessao } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectSeats, setSelectSeats] = useState([]);
  const [movieInfo, setMovieInfo] = useState([]);
  const [dayInfo, setDayInfo] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsNames, setSelectedSeatsNames] = useState([]);
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  function cpfIsValid() {
    if (cpf.length !== 11) {
      setCpf("");
      alert("CPF deve ter 11 digitos");
    } else {
      let cpfv = cpf;

      if (cpfv.length === 14 || cpfv.length === 11) {
        cpfv = cpfv.replace(".", "");
        cpfv = cpfv.replace(".", "");
        cpfv = cpfv.replace("-", "");
        let nonNumbers = /\D/;
        if (nonNumbers.test(cpfv)) {
          setCpf("");
          alert("O CPF é composto apenas por números!");
        }
      }
    }
  }

  function finishPurchase(e) {
    if (selectedSeats.length===0){
      alert("Por favor, selecione no mínimo um assento")
    }
    let nonNumbers = /\D/;
    e.preventDefault();

    if (
      cpf.length === 11 &&
      name.length > 0 &&
      !nonNumbers.test(cpf) &&
      selectedSeats.length > 0
    ) {
      const request = axios.post(
        "https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many",
        {
          ids: selectedSeats,
          name,
          cpf,
        }
      );
      request.then(() => {
        setSucessInfo({
          cpf,
          name,
          seats: selectedSeatsNames,
          title: movieInfo.title,
          time: seats.name,
          date: dayInfo.date,
        });
        navigate("/sucesso");
      });
    }
  }

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
            selectedSeatsNames={selectedSeatsNames}
            setSelectedSeatsNames={setSelectedSeatsNames}
          />
        ))}
      </div>

      <Legends />

      <form onSubmit={finishPurchase}>
        <div className="buyer-data">
          <label htmlFor="name">Nome do comprador:</label>
          <input
            placeholder="Digite seu nome..."
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="cpf">CPF do comprador:</label>
          <input
            placeholder="Digite seu CPF..."
            type="text"
            onChange={(e) => setCpf(e.target.value)}
            required
            value={cpf}
            onBlur={cpfIsValid}
            maxlength="11"
          />
          <div className="end-of-page">
            <button type="submit" className="end-button">
              Reservar assento(s)
            </button>
          </div>
        </div>
      </form>

      <Footer
        title={movieInfo.title}
        posterURL={movieInfo.posterURL}
        weekday={dayInfo.weekday}
        time={seats.name}
      />
    </>
  );
}

function Seat({
  id,
  name,
  availability,
  selectedSeats,
  setSelectedSeats,
  selectedSeatsNames,
  setSelectedSeatsNames,
}) {
  const [selected, setSelected] = useState(false);

  if (availability === true && selected === false) {
    return (
      <div
        className="seat"
        onClick={() => {
          setSelected(!selected);
          setSelectedSeats([...selectedSeats, id]);
          setSelectedSeatsNames([...selectedSeatsNames, Number(name)]);
        }}
      >
        {name}
      </div>
    );
  } else if (availability === true && selected === true) {
    let tempID = [];
    let tempName = [];
    return (
      <div
        className="seat selected"
        onClick={() => {
          setSelected(!selected);

          for (let i = 0; i < selectedSeats.length; i++) {
            if (selectedSeats[i] !== id) {
              tempID.push(selectedSeats[i]);
            }
          }
          setSelectedSeats(tempID);

          for (let i = 0; i < selectedSeatsNames.length; i++) {
            if (selectedSeatsNames[i] !== Number(name)) {
              tempName.push(selectedSeatsNames[i]);
            }
          }
          setSelectedSeatsNames(tempName);
        }}
      >
        {name}
      </div>
    );
  } else {
    return (
      <div
        className="seat unavailable"
        onClick={() => {
          alert("Esse assento não está disponível");
        }}
      >
        {name}
      </div>
    );
  }
}
