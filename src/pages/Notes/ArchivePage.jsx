import { useContext, useEffect, useState } from "react";
import { getArchivedNotes } from "../../utils/api";
import SearchBar from "../../components/SearchBar";
import { useSearchParams } from "react-router-dom";
import { TranslateContext } from "../../context/LocaleContext";
import translations from "../../utils/translate";
import Card from "../../components/Card";
import SkeletonCard from "../../components/SkeletonCard";
export default function ArchivePage() {
  const { translate } = useContext(TranslateContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const params = searchParams.get("keyword") || "";

  const searchNote = notes.filter((note) =>
    note.title.toLowerCase().includes(params.toLowerCase())
  );

  const title = translations[translate].search_archive;
  useEffect(() => {
    const getHandleNotes = async () => {
      try {
        const { data } = await getArchivedNotes();
        setNotes(data);
      } catch (err) {
        console.log("error", err);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };

    getHandleNotes();
  }, []);

  return (
    <div className="home__container">
      <main className="p-4">
        <SearchBar placeholder={title} />

        {loading ? (
          <section className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
            {notes.map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </section>
        ) : (
          <Card notes={searchNote} />
        )}
      </main>
    </div>
  );
}
