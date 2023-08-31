function DescriptionCard({ description, onDelete }) {
  return (
    <div className="border col-sm-4">
      <h4>{description.content}</h4>
      <button className="btn btn-danger" onClick={onDelete}>
        Delete description
      </button>
    </div>
  );
}

export default DescriptionCard;
