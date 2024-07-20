"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HomePage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);
    try {
      await axios.post(
        "/api/users/signup",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const url = `/verifyemail?email=${email}`;
      router.replace(url);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred");
      }
      setProcessing(false);
    }
  };

  const isDisabled = !email || !password || !name || processing;

  return (
    <div className="m-10 flex items-center justify-center sm:m-12">
      <div className="flex h-1/2 w-full flex-col items-center rounded-2xl border-2 shadow-md sm:h-1/3 sm:w-1/2">
        <div className="m-5 text-3xl font-semibold">Create your account</div>
        <form
          className="flex w-full flex-col items-center"
          onSubmit={handleRegister}
        >
          <div className="m-4 flex w-5/6 flex-col sm:w-4/6">
            <label htmlFor="name">Name</label>
            <div className="flex flex-col">
              <input
                required
                id="name"
                type="text"
                placeholder="Enter"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 w-full rounded-md border border-gray-300 p-4"
              />
            </div>
          </div>
          <div className="m-4 flex w-5/6 flex-col sm:w-4/6">
            <label htmlFor="email">Email</label>
            <div>
              <input
                required
                id="email"
                type="email"
                placeholder="Enter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-md border border-gray-300 p-4"
              />
            </div>
          </div>
          <div className="m-4 flex w-5/6 flex-col sm:w-4/6">
            <label htmlFor="password">Password</label>
            <div className="flex flex-col">
              <input
                required
                id="password"
                type="password"
                placeholder="Enter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-md border border-gray-300 p-4"
              />
            </div>
          </div>
          {error && (
            <div className="m-4 flex w-5/6 text-red-500 sm:w-4/6">{error}</div>
          )}
          <button
            type="submit"
            className={`m-5 h-14 w-5/6 rounded-md text-white sm:w-4/6 ${isDisabled ? "bg-gray-400" : "bg-black"}`}
            disabled={isDisabled}
          >
            {processing ? "Processing..." : "CREATE ACCOUNT"}
          </button>
        </form>
        <Link href="/login" className="m-6 mb-10 text-base font-medium">
          <span className="text-base font-normal">Have an Account?</span>
          <strong> LOG IN</strong>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
