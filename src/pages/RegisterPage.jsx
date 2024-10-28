import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import LoginPageSkeleton from "../components/Skeleton";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const signUp = async (addUser) => {
    const { error } = await register(addUser);

    if (!error) {
      alert("Register Success");
      navigate("/login");
    }
  };
  return (
    <div className="login__container ">
      {isLoading ? (
        <LoginPageSkeleton />
      ) : (
        <section className="flex md:flex-row flex-col rounded-md shadow-sm mt-2  ">
          <Hero />
          <section className="flex-1 flex justify-center w-full m-auto  ">
            <RegisterInput onRegister={signUp} />
          </section>
        </section>
      )}
    </div>
  );
}
