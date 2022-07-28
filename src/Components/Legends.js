export default function Legends() {
  return (
    <>
      <div className="legend-color">
        <div className="selected"></div>
        <div className="available"></div>
        <div className="unavailable"></div>
      </div>
      <div className="legend-text">
        <p>Selecionado</p>
        <p>Disponível</p>
        <p>Indisponível</p>
      </div>
    </>
  );
}
