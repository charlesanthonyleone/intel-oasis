import { Link } from 'react-router-dom';

export default function SeriesPage({ series, papers, book }) {
  return (
    <article className="page">
      <Link to="/Books" className="crumb">Library</Link>
      <h1 className="h-page">{series.label}</h1>
      {series.tagline && <p className="lede">{series.tagline}</p>}
      {series.desc && <p className="body-text mt-6">{series.desc}</p>}
      {series.quote && <blockquote className="pull">{series.quote}</blockquote>}

      <h2 className="h-section">Papers</h2>
      <ol className="rows">
        {papers.map((item, i) => (
          <li key={item.id}>
            <Link to={`/IdeaDetail?id=${item.id}`} className="row group">
              <span className="row-num">{i + 1}</span>
              <span className="row-body">
                <span className="row-title">{item.title}</span>
                {item.tagline && <span className="row-sub">{item.tagline}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {book && (
        <>
          <h2 className="h-section">Book</h2>
          <Link to={`/IdeaDetail?id=${book.id}`} className="row group">
            <span className="row-num" />
            <span className="row-body">
              <span className="row-title">{book.title}</span>
              {book.summary && <span className="row-sub">{book.summary}</span>}
            </span>
          </Link>
        </>
      )}
    </article>
  );
}
