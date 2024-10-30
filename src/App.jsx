import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import { getUserLogged } from "./utils/api";
import {
  TranslateContext,
  AuthorizAtionContext,
  ThemeContext,
} from "./context/LocaleContext";
import "./styles/style.css";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AddNotes from "./pages/Notes/AddNotes";
function App() {
  const [translate, setTranslate] = useState(
    localStorage.getItem("translate") || "en"
  );
  const [auth, setAuth] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const initialDataUser = async () => {
    const { error, data } = await getUserLogged();
    if (!error) {
      setAuth(data);
    }
  };

  useEffect(() => {
    initialDataUser();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);
  const toggleTranslate = () => {
    localStorage.setItem("translate", translate === "en" ? "id" : "en");
    setTranslate((prevState) => (prevState === "en" ? "id" : "en"));
  };

  const toggleTheme = () => {
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  const translationsvalue = useMemo(
    () => ({
      translate,
      toggleTranslate,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [translate]
  );

  const authContextValue = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth]
  );

  const themeContextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <>
      <AuthorizAtionContext.Provider value={authContextValue}>
        <TranslateContext.Provider value={translationsvalue}>
          <ThemeContext.Provider value={themeContextValue}>
            <Header />

            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/notes/add" element={<AddNotes />} />
              </Routes>
            </main>
          </ThemeContext.Provider>
        </TranslateContext.Provider>
      </AuthorizAtionContext.Provider>
    </>
  );
}

export default App;
