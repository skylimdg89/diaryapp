import React, { useEffect, useState } from "react";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

const sortOptionList = [
  { value: "latest", name: "Latest" },
  { value: "oldest", name: "Oldest" },
];

const filterOptionList = [
  { value: "all", name: "All" },
  { value: "good", name: "Good" },
  { value: "bad", name: "Bad" },
];

const ControlMenu = ({ value, optionList, onChange }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option value={it.value} key={idx}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const getProcessedDiaryList = () => {
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const FilterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => FilterCallBack(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            optionList={sortOptionList}
            onChange={setSortType}
          />
          <ControlMenu
            value={filter}
            optionList={filterOptionList}
            onChange={setFilter}
          />
        </div>
        <div className="right_col">
          <MyButton
            text={"New Entry"}
            type={"positive"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

export default DiaryList;
