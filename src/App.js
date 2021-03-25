import './App.css';
import React from "react";

export default function App() {
  const [data, setData] = React.useState([]); // МАССИВ ДЛЯ ИСХОДНЫХ ДАННЫХ
  const [filtered, setFiltered] = React.useState([]); // МАССИВ ДЛЯ ОТФИЛЬТРОВАННЫХ ДАННЫХ
  const [input, setInput] = React.useState(""); // ЗНАЧЕНИЕ ПОЛЯ INPUT
  const [checkbox, setCheckbox] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loader, setLoader] = React.useState(false);

  // ЗАГРУЗКА ДАННЫХ
  React.useEffect(() => {
    const fetchData = () => {
      setLoader(true);
      fetch(
        "https://cors-anywhere.herokuapp.com/https://www.mrsoft.by/data.json"
      )
        .then((res) => res.json())
        .then((resJson) => setData(resJson.data))
        .catch((e) => console.log(e));
      setLoader(false);
    };
    fetchData();
  }, []);

  // ОБНОВЛЕНИЕ МАССИВА FILTERED
  React.useEffect(() => {
    if (data) {
      setFiltered(data);
    }
  }, [data]);

  // ОБРАБОТЧИК ПОЛЯ INPUT
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  // ОБРАБОТЧИК КНОПКИ ДЛЯ ФИЛЬТРАЦИИ ПО ДЛИНЕ СЛОВА
  const handleNumbers = () => {
    setFiltered(
      data.filter((el) => {
        if (el.length > input) return true;
        return false;
      })
    );
    setInput("");
  };

  // ОБРАБОТЧИК КНОПКИ ДЛЯ ФИЛЬТРАЦИИ ПО ПОДСТРОКАМ
  const handleString = () => {
    if (checkbox) {
      setFiltered(
        data.filter((el) => {
          if (el.includes(input)) return true;
          return false;
        })
      );
    } else {
      setFiltered(
        data.filter((el) => {
          if (el.toLowerCase().includes(input.toLowerCase())) return true;
          return false;
        })
      );
    }
    setInput("");
  };

  return (
    <div className="App">
      <div className="filters">
        <div>
          <input
            id="checkbox"
            type="checkbox"
            onChange={() => setCheckbox(!checkbox)}
          />
          <label htmlFor="checkbox">Поиск с учетом регистра</label>
        </div>
        <div className="inputBox">
          <input value={input} onChange={handleInput} />
          <button onClick={handleNumbers}>фильтр по длине</button>
          <button onClick={handleString}>фильтр по подстроке</button>
        </div>
      </div>
      {loader ? <h3>Loading...</h3> : null}
      {!error ? (
        <div className="dataBox">
          {filtered.map((el, id) => {
            return <div key={id}>{el}</div>;
          })}
        </div>
      ) : (
        { error }
      )}
    </div>
  );
}