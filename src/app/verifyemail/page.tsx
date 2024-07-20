"use client";
import { useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

const VerifyEmail: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [verifying, setVerifying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(8).fill(null));

  const handleVerify = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setVerifying(true);
    setError(null);
    const code = inputRefs.current.map((input) => input?.value).join("");
    try {
      await axios.post(
        "/api/users/verifyemail",
        { email, code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      router.replace("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred");
      }
      setVerifying(false);
    }
  };

  const handleChange = (index, event) => {
    const { value } = event.target;
    if (value.length <= 1) {
      inputRefs.current[index].value = value;
      if (value && index < 7) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (
      event.key === "Backspace" &&
      index > 0 &&
      !inputRefs.current[index]?.value
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div>
      <div className="m-10 flex items-center justify-center sm:m-12">
        <div className="flex h-1/2 w-full flex-col items-center rounded-2xl border-2 sm:h-1/3 sm:w-1/2">
          <div className="m-5 text-3xl font-semibold">Verify your email</div>
          <div className="m-2 text-base font-normal">
            Enter the 8 digit code you received on{" "}
            {email?.replace(/(.{3})(.*)(@.*)/, "$1***$3")}
          </div>
          <div className="m-10">
            <div className="mb-2">Code</div>
            <div className="flex items-center justify-center space-x-2">
              <form
                className="flex w-full flex-col items-center"
                onSubmit={handleVerify}
              >
                <div className="flex space-x-1">
                  {Array(8)
                    .fill(0)
                    .map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        className="h-12 w-12 rounded-md border px-2 py-2 text-center focus:border-black"
                        ref={(el) => (inputRefs.current[index] = el)}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                      />
                    ))}
                </div>
                {error && (
                  <div className="m-4 flex w-5/6 text-red-500 sm:w-4/6">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="m-5 h-14 w-full rounded-md bg-black text-white sm:w-4/6"
                >
                  {verifying ? "Verifying..." : "VERIFY"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
