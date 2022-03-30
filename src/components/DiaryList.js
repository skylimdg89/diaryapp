import React from "react";
import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList }) => {
  return (
    <div>
      {diaryList.map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

export default DiaryList;
