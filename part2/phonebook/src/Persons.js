const Persons = ({ displayedResult }) => {
  return (
    <div>
      {displayedResult.map((person) => (
        <p key={person.id}>
          {" "}
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};
export default Persons;
