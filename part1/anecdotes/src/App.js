import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'Adding manpower to a late software project makes it later!',
    'The first thing you should learn as a programmer, is that there are teenagers that are better programmers than you will ever be.',
    'First, solve the problem. Then, write the code.',
    'If you’re the smartest person in the room, you’re in the wrong room.',
    'The only way to learn a new programming language is by writing programs in it.',
    'Sometimes it’s better to leave something alone, to pause, and that’s very true of programming.',
    'The only way to go fast, is to go well.'
  ]
 

  const [points, setPoints]  = useState([0,0,0,0,0,0,0]);
  const copy=[...points];
  console.log(points)

  const [selected, setSelected] = useState(0);

  let generate = () => {
    function getRndInteger(min,max) {
      return Math.floor(Math.random() * (max - min) ) + min; 
    }
    setSelected(getRndInteger(0,anecdotes.length -1))
    console.log(points[selected])

   }
  let addPoints = () => {
    copy[selected] += 1;
    setPoints(copy)
    console.log(points[selected])
  }
let mostVotes = Math.max(...points);
console.log(mostVotes)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />has {points[selected]} votes
      <br /><button onClick={addPoints}>vote</button>
      <button onClick={generate}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[points.indexOf(mostVotes)]}
      <br />has {mostVotes} votes
    </div>
  )
}

export default App