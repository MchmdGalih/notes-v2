import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils/api";
export default function CardItem({ id, title, body, createdAt }) {
  return (
    <Link to={`/notes/${id}`} className="card min-h-full">
      <article
        className={`border bg-inherit p-3 shadow-md hover:scale-105 transition-all cursor-pointer h-full`}
      >
        <h2 className="font-bold underline pt-2">{title}</h2>
        <p className="pb-1 italic">{showFormattedDate(createdAt)}</p>
        <p className="py-1 line-clamp-4">{body}</p>
      </article>
    </Link>
  );
}
