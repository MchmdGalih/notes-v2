import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { TranslateContext } from "../context/LocaleContext";
import translations from "../utils/translate";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import useInput from "../hooks/useInput";

export default function LoginInput({ onLogin }) {
  const { translate } = useContext(TranslateContext);
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };
    await onLogin(user);

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
        {translations[translate].login}
      </h1>
      <input
        value={email}
        type="email"
        placeholder="Email"
        onChange={handleEmailChange}
        className="rounded-md border-2 px-2 py-1  "
        required
      />
      <div className="relative">
        <input
          value={password}
          onChange={handlePasswordChange}
          type={passwordVisible ? "text" : "password"}
          placeholder={translate === "en" ? "Password" : "Kata Sandi"}
          className="rounded-md border-2 px-2 py-1 w-full "
          required
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
        className="rounded-md border-2 px-2 py-1 bg-blue-400 text-white "
      >
        {translations[translate].submit}
      </button>
      <p className="text-center">
        {translations[translate].no_account}
        <Link to="/register" className="underline px-1">
          {translations[translate].register_here}
        </Link>
      </p>
    </form>
  );
}
