const Header = ({ course }) => {
  return (
    <>
      <h2 key={course.id}>{course.name}</h2>
    </>
  );
};

const Total = ({ sum }) => (
  <>
    <h3>
      Total of{" "}
      {sum.reduce((accu, currentValue) => accu + currentValue.exercises, 0)}{" "}
      exercises
    </h3>
  </>
);

const Part = ({ parts }) => (
  <>
    {parts.map((part) => (
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    ))}
  </>
);

const Content = ({ parts }) => (
  <>
    <Part parts={parts} />
  </>
);

const Course = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total sum={course.parts} />
        </>
      ))}
    </>
  );
};

export default Course;
