import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getNoteId,
  archivedNote,
  unarchiveNote,
  deleteNote,
} from "../../utils/api";
import { AuthorizAtionContext } from "../../context/LocaleContext";
import { showFormattedDate } from "../../utils/api";
import dummyData from "../../utils/dummy";
import { FaArchive, FaBackward } from "react-icons/fa";
import { FaTrashArrowUp } from "react-icons/fa6";
import { FiArchive } from "react-icons/fi";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
export default function DetailPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { auth } = useContext(AuthorizAtionContext);

  const navigate = useNavigate();

  const getHandleNotes = async (id) => {
    try {
      const { data } = await getNoteId(id);

      setNotes(data);
    } catch (err) {
      console.log("error", err);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const foundIdDummy = (noteId) =>
    dummyData.find((note) => note.id === parseInt(noteId));

  useEffect(() => {
    if (!auth) {
      const dummyDataId = foundIdDummy(id);
      setNotes(dummyDataId);
      setTimeout(() => setLoading(false), 2000);
      return;
    }

    getHandleNotes(id);
  }, [auth, id]);

  const onArchive = async () => {
    if (notes.archived) {
      await unarchiveNote(id);
      navigate("/");
    } else {
      await archivedNote(id);
      navigate("/archived");
    }
  };

  const onDelete = async () => {
    try {
      await deleteNote(id);
      navigate("/archived");
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <section className="login__container">
      <div className="flex items-center gap-4 mb-4">
        <FaBackward
          size={20}
          className="cursor-pointer"
          onClick={() => window.history.back()}
        />
        <h1 className="text-3xl ">Detail Pages</h1>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-4 rounded-md border-2 flex flex-col">
          <h1 className="text-3xl font-rubic font-bold mb-2">{notes?.title}</h1>
          <p className="text-xs font-rubic font-light mb-2">
            {showFormattedDate(notes?.createdAt)}
          </p>
          <p className="text-xs md:text-sm font-rubic font-medium">
            {notes?.body}
          </p>
          <div className="flex gap-4 absolute bottom-10 right-10">
            {auth && (
              <>
                {notes.archived ? (
                  <BiArchiveIn size={26} onClick={onArchive} />
                ) : (
                  <BiArchiveOut size={26} onClick={onArchive} />
                )}
                <button onClick={onDelete}>
                  <FaTrashArrowUp size={26} className="pointer-events-auto" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
