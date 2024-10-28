import { useEffect, useState } from "react";
import { login, putAccessToken } from "../utils/api";
import Hero from "../components/Hero";
import LoginInput from "../components/LoginInput";
import LoginPageSkeleton from "../components/Skeleton";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);

  const signIn = async (user) => {
    const { error, data } = await login(user);
    if (!error) {
      putAccessToken(data.accessToken);
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
    <div className="login__container ">
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
