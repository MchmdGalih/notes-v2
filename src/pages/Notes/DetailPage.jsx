import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoteId } from "../../utils/api";
import { AuthorizAtionContext } from "../../context/LocaleContext";
import dummyData from "../../utils/dummy";
export default function DetailPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { auth } = useContext(AuthorizAtionContext);

  console.log("id", id);
  console.log("auth", auth);
  const getHandleNotes = async () => {
    try {
      const { data } = await getNoteId(id);

      setNotes(data);
    } catch (err) {
      console.log("error", err);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const foundIdDummy = (id) =>
    dummyData.find((note) => note.id === parseInt(id));

  useEffect(() => {
    if (!auth) {
      const dummyDataId = foundIdDummy(id);
      setNotes(dummyDataId);
      setTimeout(() => setLoading(false), 2000);
      return;
    }

    getHandleNotes();
  }, [auth, id]);

  return (
    <div className="login__container">
      <h1>Detail Pages</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <section>
          <h1>{notes.title}</h1>
          <p>{notes.body}</p>
        </section>
      )}
    </div>
  );
}
