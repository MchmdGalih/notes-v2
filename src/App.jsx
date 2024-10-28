import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import { getUserLogged } from "./utils/api";
import {
  TranslateContext,
  AuthorizAtionContext,
} from "./context/LocaleContext";
import "./styles/style.css";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
function App() {
  const [translate, setTranslate] = useState(
    localStorage.getItem("translate") || "en"
  );
  const [auth, setAuth] = useState(null);

  const initialDataUser = async () => {
    const { error, data } = await getUserLogged();
    if (!error) {
      setAuth(data);
    }
  };

  useEffect(() => {
    initialDataUser();
  }, []);

  const toggleTranslate = () => {
    localStorage.setItem("translate", translate === "en" ? "id" : "en");
    setTranslate((prevState) => (prevState === "en" ? "id" : "en"));
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
  return (
    <>
      <AuthorizAtionContext.Provider value={authContextValue}>
        <TranslateContext.Provider value={translationsvalue}>
          <Header />

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </TranslateContext.Provider>
      </AuthorizAtionContext.Provider>
    </>
  );
}

export default App;
