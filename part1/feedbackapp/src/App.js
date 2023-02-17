import { useState } from 'react'

const Title = ({title}) => <h1> {title}  </h1>

const StatisticLine = ({text,value}) => <><td>{text}</td><td>{value}</td></>


const Statistics = (props) => {
  if(props.all == 0){
    return (
      <p>No feedback given</p>
    )
  }
  return(
    <table>
    <tbody>
   <tr><StatisticLine text="good" value={props.good}/></tr>
   <tr><StatisticLine text="neutral" value={props.neutral}/></tr>
   <tr><StatisticLine text="bad" value={props.bad}/></tr>
   <tr><StatisticLine text="total" value={props.all}/></tr>
   <tr><StatisticLine text="average" value={(props.good-props.bad)/props.all}/></tr> 
   <tr><StatisticLine text="positive" value={(100*props.good)/props.all + " %"}/></tr> 
    </tbody>
    </table>
  ) 
}
const Button = ({onclick,vote}) => <button onClick={onclick}>{vote}</button>



const App = () => {
  const title1 = "give feedback";
  const title2= "statistics";
  const buttons = ["good","neutral","bad","all","average","positive"];
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all , setAll] = useState(0)

  const handleGoodVote = () =>{
    setAll(all + 1)
    setGood(good + 1)
  }
  const handleNeutralVote = () =>{
    setAll(all + 1)
    setNeutral(neutral + 1)
  }
  const handleBadVote = () =>{
    setAll(all + 1)
    setBad(bad + 1)
  }
  

  return (
    <div>
      <Title title={title1}/>
      <Button onclick={handleGoodVote} vote={buttons[0]} />
      <Button onclick={handleNeutralVote} vote={buttons[1]} />
      <Button onclick={handleBadVote} vote={buttons[2]} />
      <Title title={title2}/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
        </div>
  )
}

export default App