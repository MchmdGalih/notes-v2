import { useEffect, useState } from "react";

import { getActiveNotes } from "../utils/api";
import { useContext } from "react";
import { TranslateContext } from "../context/LocaleContext";
import translations from "../utils/translate";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const { translate } = useContext(TranslateContext);
  const title = translations[translate].search_note;
  useEffect(() => {
    const getHandleNotes = async () => {
      try {
        const { data } = await getActiveNotes();

        setNotes(data);
      } catch (error) {
        console.log(error);
      }
    };

    getHandleNotes();
  }, []);

  return (
    <div className="login__container">
      <main className="p-4">
        <SearchBar placeholder={title} />

        <Card notes={notes} />
      </main>
    </div>
  );
}
