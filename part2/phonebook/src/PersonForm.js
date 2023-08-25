const PersonForm = ({
  handlePersonList,
  newName,
  handleSetNewName,
  newNum,
  handleSetNewNum,
}) => {
  return (
    <form onSubmit={handlePersonList}>
      <div>
        name: <input value={newName} onChange={handleSetNewName} />
      </div>
      <div>
        number: <input value={newNum} onChange={handleSetNewNum} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
