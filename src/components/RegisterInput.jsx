import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { TranslateContext } from "../context/LocaleContext";
import translations from "../utils/translate";
import useInput from "../hooks/useInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterInput({ onRegister }) {
  const { translate } = useContext(TranslateContext);
  const [name, hanldeNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addUser = {
      name: name,
      email: email,
      password: password,
    };
    await onRegister(addUser);

    hanldeNameChange("");
    handleEmailChange("");
    handlePasswordChange("");
  };

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col gap-4 p-4 flex-1"
    >
      <h1 className=" text-xl md:text-2xl text-center font-bold">
        {translations[translate].register_here}
      </h1>
      <div className="relative">
        <input
          value={name}
          type="text"
          placeholder={translate === "en" ? "Name" : "Nama Pengguna"}
          onChange={hanldeNameChange}
          className="rounded-md border-2 px-2 py-1 w-full  "
        />
      </div>

      <div className="relative">
        <input
          value={email}
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          className="rounded-md border-2 px-2 py-1  w-full "
        />
      </div>

      <div className="relative">
        <input
          value={password}
          onChange={handlePasswordChange}
          type={passwordVisible ? "text" : "password"}
          placeholder={translate === "en" ? "Password" : "Kata Sandi"}
          className="rounded-md border-2 px-2 py-1 w-full "
        />

        <button
          type="button"
          onClick={togglePasswordVisible}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>

      <button
        type="submit"
        className="rounded-md border-2 px-2 py-1 bg-blue-400 text-white  "
      >
        {translations[translate].submit}
      </button>
      <p className="text-center">
        {translate === "en" ? "Already have an account?" : "Sudah punya akun?"}{" "}
        <Link to="/login" className="underline">
          {translations[translate].login_here}
        </Link>
      </p>
    </form>
  );
}
