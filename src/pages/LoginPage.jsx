import { useEffect, useState, useContext } from "react";
import { login, putAccessToken } from "../utils/api";
import { AuthorizAtionContext } from "../context/LocaleContext";
import Hero from "../components/Hero";
import LoginInput from "../components/LoginInput";
import LoginPageSkeleton from "../components/Skeleton";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const { setAuth } = useContext(AuthorizAtionContext);

  const signIn = async (user) => {
    const { error, data } = await login(user);
    if (!error) {
      putAccessToken(data.accessToken);
      setAuth(data);
      navigate("/");
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="login__container h-[100vh] ">
      {isLoading ? (
        <LoginPageSkeleton />
      ) : (
        <section className="flex md:flex-row flex-col rounded-md shadow-sm mt-2  ">
          <Hero />
          <section className="flex-1 flex justify-center w-full m-auto  ">
            <LoginInput onLogin={signIn} />
          </section>
        </section>
      )}
    </div>
  );
}
