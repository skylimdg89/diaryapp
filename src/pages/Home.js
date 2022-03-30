import React, { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [curDate, setCurDate] = useState(new Date());
  const [data, setData] = useState([]);
  const headText = `${curDate.getFullYear()} - ${curDate.getMonth() + 1}`;
  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };

  useEffect(() => {
    console.log(curDate);
    const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
    const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0);
    // console.log(data.filter((it) => it.date >= firstDay && it.date <= lastDay));
    setData(
      diaryList.filter((it) => it.date >= firstDay && it.date <= lastDay)
    );
  }, [curDate, diaryList]);

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <div>
        <DiaryList diaryList={data} />
      </div>
    </div>
  );
};

export default Home;
