export default function SearchBar({ placeholder }) {
  return (
    <input
      className="w-full p-2 rounded-lg shadow-sm border-2 border-gray-300 mb-4"
      type="text"
      placeholder={placeholder}
    />
  );
}
