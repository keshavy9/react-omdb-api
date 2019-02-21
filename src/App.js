import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: [],
      loading: true,
      query: '', 
      history: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }


  handleClick(event){
    const data = {t: this.state.query};

    fetch(`http://omdbapi.com/?t=${encodeURIComponent(data.t)}&apikey=7e74abc5`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        /*let titles = data.res.map((title)=>{
          return (
            <h3>{title.Title}</h3>
          );
        })*/
        this.setState({
          loading: false,
          results: [<h3>Title: {data.Title}</h3>, 
                    <h3>Actors: {data.Actors}</h3>, 
                    <h3>Director: {data.Director}</h3>, 
                    <h3>Box Office Collection {data.BoxOffice}</h3>]
        });
      })

    this.setState({
      history: this.state.query
    })  

  }

  handleChange(event){
    this.setState({
      query: event.target.value
    });
  }

  handleReset(event){
    this.setState({
      query: '',
      text: '',
      loading: true
    })
  }


  render() {
    const text = this.state.loading ? 'Search for a movie' : this.state.results;
    const query = this.state.query;
    const history = this.state.history;
  
    return (
  
      <div className="App">
      <h2>Enter a search query!</h2>

      <input type = "text" value ={this.state.query} onChange = {this.handleChange} />
      <br></br>
      <br></br>
       <button name ='querymovie' id ="search-box" onClick = {this.handleClick}> Search</button>
       <button onClick ={this.handleReset}>Reset</button>
       <br></br>
       <br></br>
      {text}
      <DisplayComponent value = {this.state.text} />  

      {history.length>0 &&  <h4> You last queried for {this.state.history}</h4>}
      
      </div>
    );
  }
}


class DisplayComponent extends React.Component{
  render(){
    const text = this.props.value

    return(
      <div>
        {text}
      </div>
    );
  }
}


export default App;
