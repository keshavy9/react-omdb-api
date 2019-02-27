import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { CardContent, Typography, CardActions, IconButton, Collapse, Chip, AppBar } from '@material-ui/core';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: [],
      loading: true,
      query: '', 
      history: [], 
      expanded: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleChipClick = this.handleChipClick.bind(this);
  }


/*
                    <h3>Title: {data.Title}</h3>, 
                    <h3>Actors: {data.Actors}</h3>, 
                    <h3>Director: {data.Director}</h3>, 
                    <h3>Box Office Collection {data.BoxOffice}</h3>
*/
//genre, Runtime, Writer, Year, 

  handleExpandClick(e){
    this.setState({
      expanded: !this.state.expanded
    });
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
          results: [ 

          <Card style={{minWidth: 275}}>
            <CardContent>
              <div className="row">
              <div className="col-sm-4">
                <img src={data.Poster} />
              </div>  
              <div className="col-sm-8">
                <h3>Title</h3>{data.Title}
                <h3>Actors</h3><span> {data.Actors}</span>
                <h3>Directors</h3><span>{data.Director}</span> 
                <h3>Box Office Collection</h3> <span>{data.BoxOffice}</span>
                <h3>Genre</h3><span> {data.Genre}</span>
                <h3>Runtime</h3><span> {data.Runtime}</span>
              </div>  
              </div>
            </CardContent>
          </Card>

          ]
        });
      })
    //console.log(this.state.history);
    //history: [...this.state.history, data.t+',']

        this.setState({
         history: [...this.state.history, <Chip variant ="outlined" onClick={this.handleChipClick} color="primary" label ={data.t}/>]
      });
    //console.log(this.state.history);

  }
  componentDidMount(){
    
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

  handleChipClick(event){

    //console.log(event.target.label.value)
    this.setState({
      query: event.target.label
    });
  }


  render() {
    const text = this.state.loading ? 'Search for a movie' : this.state.results;
    const query = this.state.query;
    const history = this.state.history;
  
    return (
  
      <div className="App">
      <AppBar color="primary" position="static">
        <Typography variant="h6" color="inherit">
          OMDb API
        </Typography>
      </AppBar>

      <h2>Enter a search query!</h2>

      <TextField label ='Search for a movie' margin = 'normal' type = "text" value ={this.state.query} onChange = {this.handleChange} />
      <br></br>
      <br></br>
       <Button variant ="contained" color = "primary"  name ='querymovie' id ="search-box" onClick = {this.handleClick}> Search</Button>
       <Button variant ="contained" color = "secondary"  onClick ={this.handleReset}>Reset</Button>
       <br></br>
       <br></br>
      {text}
      <DisplayComponent value = {this.state.text} />  
      <br></br>
      {history.length>0 &&  <h4> Previous Queries <div>{this.state.history}<br></br></div></h4>}
      
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
