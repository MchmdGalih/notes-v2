import { useEffect, useState } from "react";
import { getActiveNotes } from "../utils/api";
import { useContext } from "react";
import {
  AuthorizAtionContext,
  TranslateContext,
} from "../context/LocaleContext";
import translations from "../utils/translate";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import { Link, useSearchParams } from "react-router-dom";
import dummyData from "../utils/dummy";
import SkeletonCard from "../components/SkeletonCard";
import { FaArchive } from "react-icons/fa";

export default function HomePage() {
  const { auth } = useContext(AuthorizAtionContext);
  const { translate } = useContext(TranslateContext);
  const title = translations[translate].search_note;
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const params = searchParams.get("keyword") || "";

  const searchNote = notes.filter((note) =>
    note.title.toLowerCase().includes(params.toLowerCase())
  );

  useEffect(() => {
    if (!auth) {
      setNotes(dummyData);
      setTimeout(() => setLoading(false), 2000);
      return;
    }

    const getHandleNotes = async () => {
      try {
        const { data } = await getActiveNotes();
        setNotes(data);
      } catch (err) {
        console.log("error", err);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };
    getHandleNotes();
  }, [auth]);

  return (
    <div className="home__container">
      <main className="p-4">
        <SearchBar placeholder={title} />

        {loading ? (
          <section className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
            {(auth ? notes : dummyData).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </section>
        ) : (
          <Card notes={searchNote} />
        )}
        {auth && (
          <Link to="/archived" className="fixed bottom-10 right-10">
            <FaArchive className="text-2xl" />
          </Link>
        )}
      </main>
    </div>
  );
}
