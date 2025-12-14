"use client";
import { IconPlus, IconTrash, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notes, setNotesData] = useState(null);

  useEffect(() => {
    const localData = localStorage.getItem("Current User");
    const user = JSON.parse(localData);

    if (localData) {
      setLoggedIn(true);
    } else {
      return;
    }

    async function readAllNotes() {
      try {
        try {
          setLoading(true);
          const res = await axios.get(`/backend/api/notes?userId=${user.id}`);
          console.log(res.data.notes);
        } finally {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    readAllNotes();
  }, []);

  return (
    <section className=" relative p-2">
      <h1 className="font-bold text-3xl align-left mt-2 mb-10">Mr-Keep</h1>
      {loading == true || loggedIn == false ? (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <img
            src="/write.png"
            className="h-auto mb-2 max-w-full min-w-[70%]"
          />
          <p className="font-normal text-[22px]">Start Writing Your Notes</p>
        </div>
      ) : (
        <div className=" relative py-2 pr-4 pl-2 border border-none shadow shadow-emerald-400 cursor-pointer transition-shadow rounded-[10px] w-full align-left h-40">
          <p className="truncate mb-1 font-semibold text-2xl">LODA LESUN </p>
          <p className="line-clamp-3 overflow-hidden text-gray-800">
            Sample Text
          </p>

          <div className="absolute bottom-1 right-2 flex flex-row gap-2 items-center">
            <p className="text-gray-700  font-light text-[12px] ">
              Last time editied : 12:00Am, 12-20-2025
            </p>

            <p
              title="delete"
              className="cursor-pointer text-red-500 text-[18px]"
            >
              <IconTrash stroke={2} />
            </p>
            <p
              title="Edit"
              className="cursor-pointer text-emerald-400 text-[18px] "
            >
              <IconEdit stroke={2} />
            </p>
          </div>
        </div>
      )}

      <Link href={`/new-note`}>
        <div className=" fixed bg-emerald-400 cursor-pointer bottom-6 right-6 rounded-full">
          <span className="font-2xl text-white">
            <IconPlus stroke={2} size={50} />
          </span>
        </div>
      </Link>
    </section>
  );
}

export default Home;
