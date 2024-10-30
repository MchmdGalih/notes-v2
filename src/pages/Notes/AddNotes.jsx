import { useContext } from "react";
import { TranslateContext } from "../../context/LocaleContext";
import translations from "../../utils/translate";

export default function AddNotes() {
  const { translate } = useContext(TranslateContext);
  return (
    <div className="home__container">
      <main className="mt-4 max-w-[800px] w-full mx-auto">
        <h1 className="text-center text-3xl  font-semibold  mb-2">
          {translations[translate].add_title}
        </h1>
        <form className="flex flex-col p-3 gap-5">
          <input
            type="text"
            className="w-full p-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Title"
          />
          <textarea
            cols="30"
            rows="10"
            className="resize-none w-full p-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Take a note..."
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
