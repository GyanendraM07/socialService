import React, { useEffect, useState } from 'react'

function Fetch() {

    const [first, setfirst] = useState([])

    
   useEffect(()=>{
    fetch("https://catfact.ninja/fact")
    .then(res =>res.json())
    .then((resul) =>{
        setfirst(resul);
        console.log(resul)
    })
   },[]
   )
  return (
    
<>
{first.fact}</>
  )
}

export default Fetch