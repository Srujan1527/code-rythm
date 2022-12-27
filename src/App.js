import { useState, useEffect } from "react";
// import axios from "axios";
import "./App.css";

const App = () => {
  const API_URL = "https://jsonplaceholder.typicode.com/todos ";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [errMsg, setErrMsg] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL);

      if (response.ok === true) {
        const data = await response.json();
        setData(data);
        setLoading(false);
        setErrMsg(false);
      } else {
        setErrMsg(true);
      }
    };
    fetchData();

    // axios.get(API_URL).then((res) => setData(res.data));
  }, []);

  const lastIndexTodo = currentPage * todosPerPage; //if currentPage=4 lastIndexTodo is 40
  const firstIndexTodo = lastIndexTodo - todosPerPage; //firstIndexTodo is 30

  const slicedTodos = data && data.slice(firstIndexTodo, lastIndexTodo);
  // getting total number of pages
  const numOfPages = Math.ceil(data.length / todosPerPage);
  const filteredTodos = slicedTodos.filter((each) => {
    return each.title.includes(input);
  });

  const pages = [...Array(numOfPages + 1).keys()].slice(1);

  const getInputValue = (e) => {
    const inputVal = e.target.value.toLocaleLowerCase();
    setInput(inputVal);
    console.log(input);
  };

  const prevPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage !== numOfPages) setCurrentPage(currentPage + 1);
  };

  console.log(errMsg);
  return (
    <div>
      {errMsg ? (
        <h1 className="error-msg">Something Went Wrong</h1>
      ) : loading ? (
        <h1 className="loading">Loading</h1>
      ) : (
        <div className="container">
          <h1 className="heading">CODE-RYTHM ASSIGNMENT</h1>
          <input
            className="input"
            type="search"
            placeholder="Enter the text to get filtered result"
            onChange={getInputValue}
          />
          <ul className="list">
            {filteredTodos.map((each) => (
              <li key={each.id}>
                <p>{each.title}</p>
              </li>
            ))}
          </ul>
          <span className="switch" onClick={prevPageHandler}>
            Prev
          </span>
          <p>
            {pages.map((page) => (
              <span
                className={`${currentPage === page ? "active" : ""}`}
                key={page}
                onClick={() => setCurrentPage(page)}
              >{`${page} | `}</span>
            ))}
          </p>
          <span className="switch" onClick={nextPageHandler}>
            Next
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
