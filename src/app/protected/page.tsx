"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";

type Category = {
  id: number;
  name: string;
  isSelected: boolean;
};

const ProtectedPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setLoading(true);
    setError(null);

    axios
      .get("/api/categories/fetchcategories", {
        params: { page },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCategories(response.data.categories);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.error);
        } else {
          setError("An unexpected error occurred");
        }
        setLoading(false);
      });
  }, [page, router]);

  const handleSelect = async (categoryId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setError(null);

    try {
      await axios.post(
        "/api/categories/selectedcategories",
        { categoryId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId
            ? { ...category, isSelected: !category.isSelected }
            : category,
        ),
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <main className="m-10 flex items-center justify-center sm:m-12">
      <div className="flex h-1/2 w-full flex-col rounded-2xl border-2 shadow-md sm:h-1/3 sm:w-2/5">
        <div className="p-5 sm:p-10">
          <div className="pb-4 text-center text-3xl font-semibold">
            Please mark your interests!
          </div>
          <div className="m-2 flex items-center justify-center pb-4 text-base font-normal">
            We will keep you notified
          </div>
          <div className="flex h-full pb-6 text-lg font-medium">
            My saved interests!
          </div>
          {error && (
            <div className="m-4 flex w-5/6 text-red-500 sm:w-4/6">{error}</div>
          )}
          {loading ? (
            <Loading />
          ) : (
            <div>
              <ul>
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className="flex items-center space-x-4 pb-5"
                  >
                    <input
                      className="h-6 w-6 rounded accent-slate-950"
                      type="checkbox"
                      checked={category.isSelected}
                      onChange={() => handleSelect(category.id)}
                    />
                    <span className="text-base font-normal">
                      {category.name}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-8">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProtectedPage;
