import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

import NoteCard from "../components/NoteCard"
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        console.log(res.data);
        setLoading(false);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
          setLoading(false);
        } else {
          toast.error("Failed to load notes");
        }
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto mt-6 p-4">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg: grid-cols-3 gap-6 ">
            {notes.map((note,_id) => (
              <NoteCard key={_id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
