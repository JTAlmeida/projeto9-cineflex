import { Link } from "react-router-dom";

export default function Sucess({ sucessInfo, setSucessInfo }) {
  function mascaraCpf(valor) {
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  }

  return (
    <>
      <div className="sucess">
        <h2>
          Pedido feito <br />
          com sucesso!
        </h2>

        <h3>Filme e sessão</h3>
        <p>{sucessInfo.title}</p>
        <p>
          {sucessInfo.date} {sucessInfo.time}
        </p>

        <h3 className="tickets">Ingressos</h3>
        {sucessInfo.seats.map((seat) => (
          <p>Assento {seat}</p>
        ))}

        <h3 className="buyer">Comprador</h3>
        <p>Nome: {sucessInfo.name}</p>
        <p>CPF: {mascaraCpf(sucessInfo.cpf)}</p>
        <div className="end-of-page">
          <Link to="/">
            <button className="end-button" onClick={() => setSucessInfo({})}>
              Voltar pra Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
