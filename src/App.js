import "./styles.css";
import { useState, useEffect } from "react";
let num = 0;
export default function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completes, setCompletes] = useState([]);
  // 初期表示
  const init = () => {
    //localStorageから取り出し
    let currentTasks = localStorage.getItem("currentTasks");
    currentTasks = JSON.parse(currentTasks);
    const newArr = [...tasks];
    // currentTasks復元
    if (currentTasks?.length !== 0) {
      for (let i = 0; i < currentTasks?.length; i++) {
        newArr.push(currentTasks[i]);
      }
      setTasks(newArr);
    }
    //localStorageから取り出し
    let compleated = localStorage.getItem("compleated");
    compleated = JSON.parse(compleated);
    const newCompArry = [...completes];
    // compleated復元
    if (compleated?.length !== 0) {
      for (let i = 0; i < compleated?.length; i++) {
        newCompArry.push(compleated[i]);
      }
      setCompletes(newCompArry);
    }
    let counter = localStorage.getItem("num");
    if (counter !== null) {
      num = JSON.parse(counter);
    }
    // id カウント初期化
    if (currentTasks?.length === 0 && compleated?.length === 0) {
      num = 0;
    }
  };
  //初期表示・復元
  useEffect(() => {
    init();
  }, []);

  // input要素が変わる度に値を挿入
  const onChangeText = (e) => setText(e.target.value);

  // Add Taskイベント
  const onClickButton = (evt) => {
    evt.preventDefault();
    const task = text;
    AddTaskSet(task);
  };

  //タスクを作成
  const AddTaskSet = (task) => {
    // 入力値が空の場合リターンを返す
    if (!task) {
      return;
    }
    const newArr = [...tasks];
    const taskKeyword = {
      id: num,
      name: task
    };
    num++;
    newArr.push(taskKeyword);
    // タスクに値をセット
    setTasks(newArr);
    // localStrageにデータを保存する
    localStorage.setItem("currentTasks", JSON.stringify(newArr));
    localStorage.setItem("num", JSON.stringify(num));
  };

  //deleteボタンをクリックし、イベントを発動（タスクが削除）
  const onClickDelete = (evt) => {
    evt.preventDefault();
    const dataId = evt.target.parentNode.getAttribute("id");
    let newArr = [...tasks];
    // 該当する値を削除
    newArr = newArr.filter((array) => array.id !== Number(dataId));
    // タスクを再設定
    setTasks(newArr);
    // localStrageにデータを保存する
    localStorage.setItem("currentTasks", JSON.stringify(newArr));
  };

  //completeボタンをクリックし、イベントを発動（タスクが移動する）
  const onClickcomplete = (evt) => {
    evt.preventDefault();
    const dataId = evt.target.parentNode.getAttribute("id");
    let newArr = [...tasks];
    // 該当する値を取り出し
    let pushArrCompletes = newArr.filter(
      (array) => array.id === Number(dataId)
    );
    // 該当する値を削除
    newArr = newArr.filter((array) => array.id !== Number(dataId));
    // タスクを再設定
    setTasks(newArr);
    let newArrCompletes = [...completes];
    // completedにセット
    newArrCompletes.push(pushArrCompletes[0]);
    setCompletes(newArrCompletes);
    // localStrageにデータを保存する
    localStorage.setItem("currentTasks", JSON.stringify(newArr));
    localStorage.setItem("compleated", JSON.stringify(newArrCompletes));
  };

  // onClickDeleteCompボタンをクリックし、イベントを発動（完了タスクを全て削除する）
  const onClickDeleteComp = (evt) => {
    evt.preventDefault();
    let newArrCompletes = [...completes];
    // 完了タスクを初期化
    newArrCompletes = [];
    setCompletes(newArrCompletes);
    localStorage.setItem("compleated", JSON.stringify(newArrCompletes));
  };

  return (
    <div className="wrap app">
      <div id="app">
        <h1>TODO-List</h1>
      </div>
      <form>
        <input
          className="task_value"
          type="text"
          value={text}
          onChange={onChangeText}
        />
        <button className="task_submit" type="button" onClick={onClickButton}>
          Add Task
        </button>
      </form>
      <div className="contents">
        <div id="table">
          <h2>Current Tasks</h2>
          <ul className="task_list">
            {tasks.map((tasks) => (
              <li id={tasks.id} key={tasks.id}>
                {tasks.name}
                <button
                  className="task_submit"
                  type="button"
                  onClick={onClickcomplete}
                >
                  complete
                </button>
                <button
                  className="task_submit"
                  type="button"
                  onClick={onClickDelete}
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div id="table" className="position_table">
          <h2>Compleated</h2>
          <ul className="compleate_list">
            {completes.map((completes) => (
              <li id={completes.id} key={completes.id}>
                {completes.name}
              </li>
            ))}
          </ul>
          <button
            id="comp"
            className="comp"
            type="button"
            onClick={onClickDeleteComp}
          >
            All Deleate
          </button>
        </div>
      </div>
    </div>
  );
}
