import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h2>Diary</h2>
    </div>
  );
};

export default Diary;
