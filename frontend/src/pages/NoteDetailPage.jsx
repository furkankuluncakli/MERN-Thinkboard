import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, TrashIcon } from "lucide-react";

function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch the note");
        console.log("Error in fetching note", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure do you wanna delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted succesfully");
      navigate("/");
    } catch (error) {
      console.log("Error in deleting the note: ", error);
      toast.error("Failed to delete note");
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      return toast.error("Please add a title or content");
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note changed succesfully");
      navigate("/");
    } catch (error) {
      console.log("Error in saving the note: ", error);
      toast.error("Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              <span className="text-lg">Back to Notes </span>
            </Link>
            <button className="btn btn-error" onClick={handleDelete}>
              <TrashIcon className="size-5" />
              <span className="text-lg">Delete Note </span>
            </button>
          </div>
          <div className="card bg-base-100 ">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="text-lg">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => {
                    setNote({ ...note, title: e.target.value });
                  }}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="text-lg">Content</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Note Title"
                  className="textarea textarea-bordered"
                  value={note.content}
                  onChange={(e) => {
                    setNote({ ...note, content: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetailPage;
