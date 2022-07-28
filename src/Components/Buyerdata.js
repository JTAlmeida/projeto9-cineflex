import { Link } from "react-router-dom";

export default function Buyerdata() {
  return (
    <>
      <div className="buyer-data">
        <p>Nome do comprador:</p>
        <input placeholder="Digite seu nome..."></input>
        <p>CPF do comprador:</p>
        <input placeholder="Digite seu CPF..."></input>
      </div>

      <div className="end-of-page">
        <Link to="/sucesso">
          <div className="end-button">Reservar assento(s)</div>
        </Link>
      </div>
    </>
  );
}
