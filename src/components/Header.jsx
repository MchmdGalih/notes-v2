import { FaBars, FaRegMoon, FaRegSun, FaTimes } from "react-icons/fa";
import {
  AuthorizAtionContext,
  TranslateContext,
  ThemeContext,
} from "../context/LocaleContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import translations from "../utils/translate";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { translate, toggleTranslate } = useContext(TranslateContext);
  const { auth, setAuth } = useContext(AuthorizAtionContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuth(null);
    navigate("/");
  };

  return (
    <header className="header__container">
      <nav className="flex justify-between gap-2 items-center w-full mb-4">
        <Link to="/">
          <h1 className="text-xl md:text-2xl font-bold">
            {translations[translate].personal_notes}
          </h1>
        </Link>

        <div className="flex items-center  gap-2 cursor-pointer">
          <div className="md:hidden" onClick={toggleHandler}>
            <FaBars size={30} />
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span
              className="p-2  hover:bg-slate-200 rounded-md"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <FaRegMoon size={28} />
              ) : (
                <FaRegSun size={28} />
              )}
            </span>
            <p
              className="p-2 hover:bg-slate-200 rounded-md"
              onClick={toggleTranslate}
            >
              {translate === "en" ? "Indonesia" : "English"}
            </p>
            {auth === null ? (
              <Link className="p-2 hover:bg-slate-200 rounded-md" to="/login">
                Login
              </Link>
            ) : (
              <button onClick={logout}>Logout</button>
            )}
          </div>

          <div
            className={`fixed top-0 right-0 h-full w-2/4 ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            } shadow-lg p-4 md:hidden transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center">
              <span
                className="p-2 hover:bg-slate-200 rounded-md"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <FaRegMoon size={28} />
                ) : (
                  <FaRegSun size={28} />
                )}
              </span>
              <FaTimes
                size={28}
                className="cursor-pointer"
                onClick={toggleHandler}
              />
            </div>
            <p
              onClick={toggleTranslate}
              className="p-2 hover:bg-slate-200 rounded-md mt-2 "
            >
              {translate === "en" ? "Indonesia" : "English"}
            </p>
            {auth === null ? (
              <Link
                className="p-2 hover:bg-slate-200 rounded-md block w-full"
                to="/login"
              >
                Login
              </Link>
            ) : (
              <button
                className="p-2 hover:bg-slate-200 rounded-md "
                onClick={logout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
