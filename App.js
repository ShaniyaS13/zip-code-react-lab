import React, { Component } from 'react';
import './App.css';


function City({ data } ) {
  return (
    //<div>This is the City component</div>
      <div>
        City Name: {data.City}
        State: {data.State}
        <ul>
          <li>State: {data.state}</li>
          <li>Location: {data.lat}, {data.long} </li>
          <li>Population (estimated): {data.population}</li>
          <li>Total Wages: {data.wages}</li>
        </ul>
      </div>
    );
}

function ZipSearchField(props) {
  return (
  <div>
    Zip Code: 
    <input 
    type="text"  
    onChange= { props.changeHandler } 
    placeholder = "try 10016"
    />
    </div>);
}


class App extends Component {

  state = {
    zipCode: ' ',
    cities: [],
  }
zipChanged = (event) => {
  console.log(event.target.value);
  this.setState({ zipCode: event.target.value })

if(event.target.value.length ===5){
  fetch('https://ctp-zip-api.herokuapp.com/zip/'+ event.target.value)
    .then(res => res.json())
    .then((data) =>{
       console.log(data)
       this.setState({cities: data})
    })
    .catch(err => {
      console.log('No results')
      this.setState({ cities: []})
    })
  }   else{
    this.setState({ cities: []})
  }
}
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipcode={this.state.zipcode} changeHandler={this.zipChanged}/>
        <div> 
        {this.state.cities.length === 0 ? <h5>No results</h5> : null}
        { this.state.cities.map((city) => <City data= {city}/> )} 
        </div>
      </div>
    );
  }
}

export default App;
