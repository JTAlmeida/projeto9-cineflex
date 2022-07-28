export default function Footer({ title, posterURL, weekday, time }) {
  return (
    <>
      {!weekday ? (
        <div className="footer">
          <div className="movie">
            <img src={posterURL} />
          </div>
          <div className="title">{title}</div>
        </div>
      ) : (
        <div className="footer">
          <div className="movie">
            <img src={posterURL} />
          </div>
          <div className="title">
            {title}
            <div>{weekday} - {time}</div>
        </div>
        </div>
      )}
    </>
  );
}
