import React, { useEffect, useState } from "react";
import "./public/App.css";

const API_BASE = "http://localhost:3001";

function App() {
  const [moves, setMoves] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newMove, setNewMove] = useState("");

  useEffect(() => {
    GetMoves();
    console.log(moves);
  }, []);

  const GetMoves = () => {
    fetch(API_BASE + "/moves")
      .then((res) => res.json())
      .then((data) => setMoves(data))
      .catch((ett) => console.error("Error", err));
  };

  const saveMove = async (id) => {
    const data = await fetch(API_BASE + "/move/complete" + id).then((res) =>
      res.json()
    );

    setMoves((moves) =>
      moves.map((move) => {
        if (move._id == data._id) {
          move.complete = data.complete;
        }

        return move;
      })
    );
  };

  const addMove = async () => {
    const data = await fetch(API_BASE + "/move/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        test: newMove,
      }),
    }).then((res) => res.json());

    setMoves([...moves, data]);
    setIsOpen(false);
    setNewMove("");
  };

  const deleteMove = async (id) => {
    const data = await fetch(API_BASE + "/move/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setMoves((moves) => moves.filter((move) => move._id !== data._id));
  };

  return (
    <div className="App">
      <h1>Jui Jitsu Journal</h1>
      <div className="moves">
        {moves.length > 0 ? (
          moves.map((move) => (
            <div
              className={"move" + (move.save ? " is-saved" : "")}
              key={move._id}
              onClick={() => saveMove(move._id)}
            >
              <div className="checkbox"></div>

              <div className="text">{move.text} </div>

              <div className="delete-move" onClick={() => deleteMove(move._id)}>
                x
              </div>
            </div>
          ))
        ) : (
          <p>You currently have no moves</p>
        )}
      </div>
      <div className="Add New Move">
        <button onClick={() => setIsOpen(true)}>Add Move</button>
        {isOpen && (
          <div>
            <div>
              <h3>Add New Move</h3>
              <input
                type="text"
                className="add-move-name"
                onChange={(e) => setNewMove(e.target.value)}
                value={newMove}
              />
              <input
                type="text"
                className="add-style"
                onChange={(e) => setStyle(e.target.value)}
                value={setStyle}
              />
              <div className="button" onClick={addMove}>
                Create Move
              </div>
              <button onClick={() => setIsOpen(false)}>save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
