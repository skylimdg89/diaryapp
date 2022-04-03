import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

/* Pages */
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyList = [
  {
    id: 1,
    emotion: 2,
    content: "Diary Entry 1",
    date: 1648376646297,
  },
  {
    id: 2,
    emotion: 3,
    content: "Diary Entry 2",
    date: 1648376646298,
  },
  {
    id: 3,
    emotion: 1,
    content: "Diary Entry 3",
    date: 1648376646299,
  },
  {
    id: 4,
    emotion: 5,
    content: "Diary Entry 4",
    date: 1648376646300,
  },
  {
    id: 5,
    emotion: 4,
    content: "Diary Entry 5",
    date: 1648376646301,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyList);

  const dataId = useRef(6);
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  dataId.current += 1;
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  //EDIT
  const onEdit = (date, content, emotion, targetId) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        content,
        emotion,
        date: new Date(date).getTime(),
      },
    });
  };
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
