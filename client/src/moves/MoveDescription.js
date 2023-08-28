import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import DescriptionCard from "./DescriptionCard";
import NewDescriptionForm from "./NewDescriptionForm.js";

function MoveDescription() {
  const { moveId } = useParams();

  const history = useHistory();

  const [move, setMove] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/moves/${moveId}`);
      const resData = await response.json();
      setMove(resData);
    };
    fetchData();
  }, [moveId]);

  if (place === null) {
    return <h1>We're getting you your move!</h1>;
  }

  function editMove() {
    history.push(`/moves/${move.moveId}/edit`);
  }

  async function deleteMove() {
    await fetch(`http://localhost:3001/places/${move.moveId}`, {
      method: "DELETE",
    });
    history.push("/place");
  }

  async function deleteDescription(deletedDescription) {
    await fetch(
      `http://localhost:3001/moves/${move.moveId}/descriptions/${deletedDescription.descriptionId}`,
      {
        method: "DELETE",
      }
    );

    setMove({
      ...move,
      descriptions: move.descriptions.filter(
        (description) =>
          description.descriptionId !== deletedDescription.descriptionId
      ),
    });
  }

  async function createDescription(descriptionAttributes) {
    const response = await fetch(
      `http://localhost:3001/moves/${move.moveId}/descriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(desctiptionAttributes),
      }
    );

    const description = await response.json();

    setMove({
      ...move,
      description: [...move.descriptions, description],
    });
  }

  let description = <h3 className="inactive">No description yet</h3>;
  if (move.description.length) {
    descriptions -
      move.description.map((desctiption) => {
        return (
          <DescriptionCard
            key={description.descriptionId}
            description={description}
            onDelete={() => deletedDescription(description)}
          />
        );
      });
  }

  return (
    <main>
      <div className="row">
        <div className="col-sm-6">
          <h1>{move.name}</h1>
          <h2>{move.style}</h2>
          <h3>{move.position}</h3>
          <h4>{move.type}</h4>
          <br />
          <a className="btn btn-warning" onClick={editMove}>
            Edit Move
          </a>
          {` `}
          <button type="submit" className="btn btn-danger" onClick={deleteMove}>
            Delete Move
          </button>
        </div>
      </div>
      <hr />
      <h2>Description</h2>
      <div className="row">{description}</div>
      <hr />
      <h2> Want to submit another move?</h2>
      <NewMoveForm move={move} onSubmit={createMove} />
    </main>
  );
}

export default MoveDescription;
