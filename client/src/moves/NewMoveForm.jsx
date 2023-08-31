import { useState } from "react";
import { useHistory } from "react-router";

function NewMoveForm() {
  const history = useHistory();

  const [move, setMove] = useState({
    name: "",
    style: "",
    position: "",
    type: "",
    description: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`http://localhost:3001/moves`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    });

    history.push("/moves");
  }

  return (
    <main>
      <h1>Add a New Move</h1>
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
          <label htmlFor="style">style</label>
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
          <label htmlFor="position">position</label>
          <input
            required
            value={move.position}
            onChange={(e) => setPosition({ ...move, position: e.target.value })}
            className="form-control"
            id="position"
            name="position"
          />
        </div>
        <div className="form-group">
          <label htmlFor="submission or escape">submission</label>
          <input
            value={move.submission}
            onChange={(e) =>
              setSubmission({ ...move, submission: e.target.value })
            }
            className="form-control"
            id="submission"
            name="submission"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">description</label>
          <input
            required
            value={move.position}
            onChange={(e) =>
              setDescription({ ...move, position: e.target.value })
            }
            className="form-control"
            id="description"
            name="description"
          />
        </div>
      </form>
    </main>
  );
}

export default NewMoveForm;
