import { useContext, useState } from "react";
import { TranslateContext } from "../../context/LocaleContext";
import translations from "../../utils/translate";
import { addNote } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function AddNotes() {
  const { translate } = useContext(TranslateContext);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await addNote(formData);

      if (!error) {
        navigate("/");
      }
    } catch (err) {
      throw new Error(`Error, ${err}`);
    }
  };
  return (
    <div className="home__container">
      <main className="mt-4 max-w-[800px] w-full mx-auto">
        <h1 className="text-center text-3xl  font-semibold  mb-2">
          {translations[translate].add_title}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col p-3 gap-5">
          <input
            type="text"
            className="w-full p-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <textarea
            cols="30"
            rows="10"
            className="resize-none w-full p-2 rounded-md shadow-sm border bg-inherit border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Take a note..."
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          ></textarea>

          <button
            type="submit"
            className="absolute right-4 bottom-6 border-2 rounded-full  p-2  "
          >
            Kirim
          </button>
        </form>
      </main>
    </div>
  );
}
