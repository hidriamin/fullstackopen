const Person = ({ displayedResult, deletePerson }) => {
  return (
    <div>
      {displayedResult.map((person) => (
        <p key={person.id}>
          {" "}
          {person.name} {person.number}{" "}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};
export default Person;
