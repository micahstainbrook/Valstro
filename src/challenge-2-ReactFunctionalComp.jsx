// Imports
import {useState, useEffect} from 'react'

function FunctionalComp() {

  const [characters, setCharacters] = useState([])
  const [matchedCharacters, setMatchedCharacters] = useState([])
  const [filter, setFilter] = useState('')
  const [multiplier, setMultiplier] = useState(10)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResults('https://swapi.dev/api/people/')
    document.addEventListener('keydown', escFunction, false)
  },[])

  // Render Results in a collection
  const Results = () => {

    return(
      matchedCharacters.map((result,i) => {

        let power = result.height === 'unknown' || result.mass === 'unknown'
          ? 'unknown' 
          : multiplier * parseInt(result.height) * parseInt(result.mass)
        
        if(result.name.toLowerCase().includes(filter.toLowerCase())) {
          return(<tr key={i}>
            <td>{result.name}</td>
            <td>{result.height}</td>
            <td>{result.mass}</td>
            <td>{power}</td>
          </tr>)
        }
        
      })
    )
  }

  // Reset Results on Escape key press
  const escFunction = (event) => {
    if (event.key === "Escape") {
      setFilter('')
      setMultiplier(10)
    }
  }

  // Update Filter
  const updateFilter = (event) => {
    setFilter(event.target.value)
  }

  // Update Multiplier
  const updateMultiplier = (event) => {
    setMultiplier(event.target.value)
  }

  // Fetch Character Results
  const fetchResults = (url, page = 1, previousResponse = []) => {
    fetch('https://swapi.dev/api/people/?page='+page)
    .then(response => response.json())
    .then(newResponse => {

      const response = [...previousResponse, ...newResponse.results]

      if (newResponse.next !== null) {
        page++
        return fetchResults(url, page, response)
      }

      setCharacters(response)
      setMatchedCharacters(response)
      setLoading(false)
    })
  }

  return (
    <div id="functional-comp">
      <h2>React Functional Component</h2>
      Filter: <input placeholder="Filter by name" onChange={updateFilter} value={filter} /> Multiplier:{" "}
      <input
        onChange={updateMultiplier}
        placeholder="Multiplier"
        type="number"
        min="1"
        max="20"
        value={multiplier}
      />{" "}
      Press "Escape" to reset fields
      {loading ? <div style={{textAlign: 'center'}} className="loader">Loading...</div> : null}
      <table width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Power</th>
          </tr>
        </thead>
        <tbody>
          <Results />
        </tbody>
      </table>
    </div>
  )
}

export default FunctionalComp
