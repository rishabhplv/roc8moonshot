"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Clears JWT token from localStorage when the login page is hit
    localStorage.removeItem("token");
  }, []);

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setAuthenticating(true);
    setError(null);
    try {
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      localStorage.setItem("token", data.token);
      router.push("/protected");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred");
      }
      setAuthenticating(false);
    }
  };

  const isDisabled = !email || !password || authenticating;

  return (
    <div className="m-10 flex items-center justify-center sm:m-12">
      <div className="flex h-1/2 w-full flex-col items-center rounded-2xl border-2 shadow-md sm:h-1/3 sm:w-1/2">
        <div className="m-5 text-3xl font-semibold">Login</div>
        <div className="m-4 text-2xl font-medium">
          Welcome back to ECOMMERCE
        </div>
        <div className="m-2 text-base font-normal">
          The next gen business marketplace
        </div>

        <form
          className="flex w-full flex-col items-center"
          onSubmit={handleLogin}
        >
          <div className="m-4 flex w-5/6 flex-col sm:w-4/6">
            <label htmlFor="email">Email</label>
            <div>
              <input
                required
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
            <div className="relative w-full">
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Enter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-md border border-gray-300 p-4 pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 transform text-sm font-medium text-black underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
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
            {authenticating ? "Authenticating..." : "LOGIN"}
          </button>
        </form>
        <hr
          className="w-5/6 border-gray-300 sm:w-4/6"
          style={{ background: "#C1C1C1", height: "1px" }}
        />
        <Link href="/" className="m-6 text-base font-medium">
          <span className="text-base font-normal">
            Don&apos;t have an Account?
          </span>{" "}
          <strong> SIGN UP</strong>
        </Link>
      </div>
    </div>
  );
};

export default Login;
