import toast from "react-hot-toast";

function HomePage() {
  return (
    <div>
      <button
        onClick={() => {
          toast.success("CONGRATS");
        }}
        className="btn btn-outline "
      >
        Click me
      </button>
    </div>
  );
}

export default HomePage;
