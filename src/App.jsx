import React, { createContext, useState } from "react";
import "./App.css";
import moon from "./assets/icon-moon.svg";
import sun from "./assets/icon-sun.svg"
import cross from "./assets/icon-cross.svg";
import check from "./assets/icon-check.svg";
import backpiclight from "./assets/bg-desktop-light.jpg"
import backpicdark from "./assets/bg-desktop-dark.jpg"
import backpiclightMob from "./assets/bg-mobile-light.jpg"
import backpicdarkMob from "./assets/bg-mobile-dark.jpg"

export const ThemeContext = createContext("null");

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [visibility, setVisibility] = useState("all");
  const [isNightMode, setIsNightMode] = useState("light");



  function toggleMode(){
    setIsNightMode((currentMode) => (currentMode === "light" ? "dark" : "light"));
    document.body.style.background = (isNightMode === "dark") ? 'hsla(240, 5%, 85%, 0.603)' : '#171823';
  }

  function backpicMode(){
      return (isNightMode === "dark") ? backpicdark : backpiclight;
  }

  function backpicModeMobile(){
    return (isNightMode === "dark") ? backpicdarkMob : backpiclightMob;
}

  function iconMode(){
    return (isNightMode === "dark") ? sun : moon;
}

  function addTask() {
    if (!newItem) {
      alert("Please write something in input");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
      completed: false,
    };

    setItems((oldList) => [...oldList, item]);
    setNewItem("");
  }

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  function toggleCompleted(id) {
    setItems((oldItems) =>
      oldItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function filterTasks() {
    if (visibility === "active") {
      return items.filter((item) => !item.completed);
    } else if (visibility === "completed") {
      return items.filter((item) => item.completed);
    } else {
      return items;
    }
  }

  function clearCompleted() {
    setItems((oldItems) => oldItems.filter((item) => !item.completed));
  }

  function alertIfNoCompletedTasks() {
    const completedTasks = items.filter((item) => item.completed);

    if (completedTasks.length === 0) {
      alert("There are no completed tasks.");
    } else {
      setVisibility("completed");
    }
  }

  function alertIfNoUnCompletedTasks() {
    const uncompletedTasks = items.filter((item) => !item.completed);

    if(uncompletedTasks.length === 0){
      alert("There are no uncompleted tasks.");
    }else{
      setVisibility("active");
    }
  }

  return (
    <>
    
    <div className="main" id={isNightMode}>
    <img src={backpicMode()} alt="" className="backpic"/>
    <img src={backpicModeMobile()} alt="" className="backpic-mob"/>



    <header>
      <h1>TODO :</h1>
      <img src={iconMode()} alt="" className="moon" onClick={toggleMode} />
    </header>

    <div className="todo">
      <img src={check} alt="" className="round"/>
      <input
        type="text"
        placeholder="Create a new todo…"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addTask}>+</button>
    </div>

    <div className="todo-box">
      {items.length === 0 ? (
        <div className="nothing"><p>No ToDo items left!</p></div>
      ) : (
        <ul>
          {filterTasks().map((item) => (
            <li key={item.id} className="tasks">
              <button
                className={item.completed ? 'completed' : 'uncompleted'}
                onClick={() => toggleCompleted(item.id)}
              >
                <img src={check} alt="" className={item.completed ? 'checked' : 'not-checked'}/>
              </button>
              <p>{item.value}</p>
              <img src={cross} alt="" onClick={() => deleteItem(item.id)} className="cross" />
            </li>
          ))}
        </ul>
      )}
      <div className="functions">
        <p>{items.filter((item) => !item.completed).length} items left</p>
        <p onClick={() => setVisibility("all")}>All</p>
        <p onClick={alertIfNoUnCompletedTasks}>Active</p>
        <p onClick={alertIfNoCompletedTasks}>
          Completed
        </p>
        <p onClick={clearCompleted}>
          Clear completed
        </p>
      </div>
    </div>
  </div>
</>
    
  );
}

export default App;