import { Component } from 'react'

class Results extends Component {

    render() {

        const { characters, filter, multiplier } = this.props

        return(
            characters.map((result,i) => {

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
}

export default Results