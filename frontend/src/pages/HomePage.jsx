import axios from "axios";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import RateLimitedUI from "../components/RateLimitedUI";

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
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
      {loading && (
        <div className="text-center text-primary py-10">Loading notes...</div>
      )}
    </div>
  );
}

export default HomePage;
