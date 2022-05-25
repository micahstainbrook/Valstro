// Imports
import { Component } from 'react'
import Results from './Results'

class ClassComp extends Component {

  constructor(props) {
    super(props)

    this.state = {
      characters: [],
      filter: '',
      multiplier: 10,
      loading: true,
    }
    
    this.escFunction = this.escFunction.bind(this)
    this.updateFilter = this.updateFilter.bind(this)
    this.updateMultiplier = this.updateMultiplier.bind(this)
    this.fetchResults = this.fetchResults.bind(this)
  }

  // Reset Results on Escape key press
  escFunction =(event) => {
    if (event.key === "Escape") {
      this.setState({ filter: '', multiplier: 10 })
    }
  }

  // Update Filter
  updateFilter =(event) => {
    this.setState({ filter: event.target.value })
  }

  // Update Multiplier
  updateMultiplier =(event) => {
    this.setState({ multiplier: event.target.value })
  }

  // Fetch Character Results
  fetchResults =(url, page = 1, previousResponse = []) => {
    fetch('https://swapi.dev/api/people/?page='+page)
    .then(response => response.json())
    .then(newResponse => {

      const response = [...previousResponse, ...newResponse.results]

      if (newResponse.next !== null) {
        page++
        return this.fetchResults(url, page, response)
      }

      this.setState({ characters: response, loading: false })
    })
  }

  componentDidMount() {
    this.fetchResults('https://swapi.dev/api/people/')
    document.addEventListener('keydown', this.escFunction, false)
  }

  render() {

    let {characters, filter, multiplier, loading} = this.state

    return (
      <div id="class-comp">
        <h2>React Class Component</h2>
        Filter: <input placeholder="Filter by name" onChange={this.updateFilter} value={filter} /> Multiplier:{" "}
        <input
          onChange={this.updateMultiplier}
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
            <Results characters={characters} filter={filter} multiplier={multiplier} />
          </tbody>
        </table>
      </div>
    )
  }
}

export default ClassComp