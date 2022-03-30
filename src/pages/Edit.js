import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log("id = ", id);
  const mode = searchParams.get("mode");
  console.log("mode = ", mode);

  return (
    <div>
      <h2>Edit</h2>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Edit;
