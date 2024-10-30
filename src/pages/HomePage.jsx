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
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
  const { auth } = useContext(AuthorizAtionContext);
  const { translate } = useContext(TranslateContext);
  const title = translations[translate].search_note;
  const [notes, setNotes] = useState([]);

  const [searchParams] = useSearchParams();
  const params = searchParams.get("keyword") || "";

  const searchNote = notes.filter((note) =>
    note.title.toLowerCase().includes(params.toLowerCase())
  );

  useEffect(() => {
    if (!auth) {
      setNotes([
        {
          id: +new Date(),
          title: "DUMMY DATA",
          body: "DUMMY DATA",
          createdAt: new Date().toISOString(),
        },
      ]);
      return;
    }

    const getHandleNotes = async () => {
      try {
        const { data } = await getActiveNotes();
        setNotes(data);
      } catch (err) {
        console.log("error", err);
      }
    };
    getHandleNotes();
  }, [auth]);

  return (
    <div className="home__container">
      <main className="p-4">
        <SearchBar placeholder={title} />

        <Card notes={searchNote} />
      </main>
    </div>
  );
}
