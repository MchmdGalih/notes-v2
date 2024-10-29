import { Link } from "react-router-dom";

import CardItem from "./CardItem";
export default function Card({ notes }) {
  return (
    <section className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
      <Link to="/notes/new" className="min-h-48 w-full">
        <article
          className={`border bg-inherit
            } p-3 shadow-md hover:scale-105 transition-all cursor-pointer h-full  flex items-center justify-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="82"
            height="82"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
            />
          </svg>
        </article>
      </Link>
      {notes.map((note) => (
        <CardItem key={note.id} {...note} />
      ))}
    </section>
  );
}
