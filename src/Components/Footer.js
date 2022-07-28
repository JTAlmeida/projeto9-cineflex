export default function Footer({ title, posterURL }) {
  return (
    <>
      <div className="footer">
        <div className="movie">
        <img src={posterURL} />
        </div>
        <div className="title">
        {title}
        </div>
      </div>
    </>
  );
}
