import { useSearchParams } from "react-router-dom";

export default function SearchBar({ placeholder }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get("keyword") || "";

  return (
    <input
      value={params}
      className="w-full p-2 rounded-lg shadow-sm border-2 border-gray-300 mb-4"
      type="text"
      placeholder={placeholder}
      onChange={(e) => setSearchParams({ keyword: e.target.value })}
    />
  );
}
