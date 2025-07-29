import React from 'react'
import Card from './components/Card'
import './App.css'

function App() {
 
  const loop =[1,2,3,4];
  var Username = "Noteworthy technology acquisitions 2021 Cards";

  return (
    <>
    <div className="flex flex-wrap gap-6" >
      
    
    { 
    loop.map((item, index) => {
      return (
        <Card  key={index} Username={Username} />
      )
    }
  )}
 
      
      </div>
    </>
  )
}

export default App
