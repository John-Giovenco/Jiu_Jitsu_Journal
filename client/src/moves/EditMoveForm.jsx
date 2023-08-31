import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";

function EditMoveForm() {
  const history = useHistory();

  const { moveId } = useParams();

  const [move, setMove] = useState({
    name: "",
    style: "",
    position: "",
    type: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/moves${moveId}`);
      const resData = await response.json();
      setMove(resData);
    };
    fetchData();
  }, [moveId]);

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`http://localhost:3001/moves/${moveId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(move),
    });

    history.push(`/moves/${move.moveId}`);
  }

  return (
    <main>
      <h1>Edit Place</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Move Name</label>
          <input
            required
            value={move.name}
            onChange={(e) => setMove({ ...move, name: e.target.value })}
            className="form-control"
            id="name"
            name="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="style">Gi or No Gi</label>
          <input
            required
            value={move.style}
            onChange={(e) => setMove({ ...move, style: e.target.value })}
            className="form-control"
            id="style"
            name="style"
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Select the position</label>
          <input
            required
            value={move.position}
            onChange={(e) => setMove({ ...move, style: e.target.value })}
            className="form-control"
            id="position"
            name="position"
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">What are you trying to accomplish</label>
          <input
            required
            value={move.type}
            onChange={(e) => setMove({ ...move, type: e.target.value })}
            className="form-control"
            id="type"
            name="type"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">description</label>
          <input
            required
            value={move.description}
            onChange={(e) => setMove({ ...move, description: e.target.value })}
            className="form-control"
            id="description"
            name="description"
          />
        </div>
      </form>
    </main>
  );
}

export default EditMoveForm;
