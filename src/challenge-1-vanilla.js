// Note: The HTML for this challenge can be found in index.html
// Note: this function is run inside of src/main.tsx
export function runVanillaApp() {
  
    // Elements
    let multiplier = document.getElementById('multiplier')
    let resultsContainer = document.getElementById('tbody')
    let loader = document.getElementById('loader')
    let filter = document.getElementById('filter')

    // Arrays
    let characters = []

    // Event Listeners
    filter.addEventListener('input', updateResults)
    multiplier.addEventListener('input', updateResults)

    document.body.addEventListener('keydown', function(e) {

        // Reset Results on Escape key press
        if (e.key === 'Escape') {
            multiplier.value = 10
            filter.value = ''
            updateResults()
        }
    })

    init()

    // Initialize Character Results
    function init() {
        fetchResults('https://swapi.dev/api/people/')
    }

    // Update Character Results
    function updateResults() {

        loader.classList.remove('hide')
        resultsContainer.innerHTML = ''

        characters.map((character) => {

            if(character.name.toLowerCase().includes(filter.value.toLowerCase())) {

                let power = character.height === 'unknown' || character.mass === 'unknown'
                ? 'unknown' 
                : multiplier.value * parseInt(character.height) * parseInt(character.mass)
            
                let result = document.createElement('tr')
                result.innerHTML = '<td>'+character.name+'</td><td>'+character.height+'</td><td>'+character.mass+'</td><td>'+power+'</td>'
                resultsContainer.appendChild(result)
            }

        })

        loader.classList.add('hide')
    }

    // Load Character Results
    function loadResults() {

        characters.map((character) => {

            let power = character.height === 'unknown' || character.mass === 'unknown'
                ? 'unknown' 
                : multiplier.value * parseInt(character.height) * parseInt(character.mass)
            
            let result = document.createElement('tr')
            result.innerHTML = '<td>'+character.name+'</td><td>'+character.height+'</td><td>'+character.mass+'</td><td>'+power+'</td>'
            resultsContainer.appendChild(result)
        })

        loader.classList.add('hide')
    }

    // Request results from API and accumulate them into characters array
    function fetchResults(url, page = 1, previousResponse = []) {

        return fetch('https://swapi.dev/api/people/?page='+page)
        .then(response => response.json())
        .then(newResponse => {

            const response = [...previousResponse, ...newResponse.results]

            if (newResponse.next !== null) {
            page++
            return fetchResults(url, page, response)
            }
    
            characters = response
            loadResults()
        })
    }
}

