const Header = (props) => {
  console.log(props);
    return(
<>
<h1>{props.course}</h1>
</>
  )
}
const Part = (prop) => {
  console.log(prop);
 // console.log(exercisesprop);
  return (
    <>
    <p>
      {prop.part} {prop.exercises}
    </p>
    </>
  )
}
const Content = (props) => {
  const courseinfo = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  console.log(props);
  return (
    <>
<Part part={courseinfo} exercises={exercises1} />
<Part part={part2} exercises={exercises2} />
<Part part={part3} exercises={exercises3} />

    </>
  )
}
const Total = (props) => {
  console.log(props);
  return(
    <>
  <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>

    </>

  )
}

const App = () => {
  const course = 'Half Stack application development'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14;

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App
