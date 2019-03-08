import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { CardContent, Typography, Chip, AppBar, Tabs, Tab } from '@material-ui/core';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: [],
      loading: true,
      query: '', 
      history: [], 
      value: 0,
      tvtitle: '',
      season: '',
      imdb: ''

    };
    this.handleMovieClick = this.handleMovieClick.bind(this);
    this.handleTvClick = this.handleTvClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChipClick = this.handleChipClick.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
  }

  async handleMovieClick(event){
    const data = {t: this.state.query};

    await fetch(`http://omdbapi.com/?t=${(data.t)}&apikey=7e74abc5`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          loading: !this.state.loading,
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
                <h3>Runtime</h3><span> <span> {data.Runtime}</span>
                
                </span>
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
      history: [...this.state.history, <Chip variant ="outlined" name="moviechip" onClick={this.handleChipClick} color="primary" label ={data.t}/>]
    });
        
    //console.log(this.state.history);

  }
  
  async handleTvClick(event){

    const title = this.state.tvtitle; 
    const season = this.state.season;
    const imdb = this.state.imdb;
    console.log(title);
    console.log(season);
    await fetch(`http://www.omdbapi.com/?t=${title}&Season=${(season)}&apikey=7e74abc5`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({
        loading: !this.state.loading,
        /*results: [
          <div>
          {data.Episodes.map(episode => episode.imdbRating > 9.0) && <div>
          <h4>Title</h4><span>{data.Title}</span>
          <h4>Season</h4><span>{data.Season}</span>
          <h4>Episodes</h4><span>{data.Episodes.map(episode => 
          <Card style={{minWidth: 275}}>
          <CardContent>
            <h4>Episode: </h4>{episode.Episode}<br></br>
            <h4>Title: </h4>{episode.Title}<br></br>
            <h4>Release Date: </h4>{episode.Released}<br></br>
            <h4>Imdb Rating:  <div>{episode.imdbRating}</div></h4><br></br>
          </CardContent>  
          </Card>
            )}
            
            </span>
          </div>
        }
        </div>
        ]*/

      results : [

          <div>
          <h4>{data.Title}</h4> 
          {data.Episodes.map(episode => 
          <div>
          {episode.imdbRating > this.state.imdb && 
            <div>
          <h4>Episode Number:</h4> {episode.Episode}
          <h4>Title: </h4>{episode.Title}
          <h4>Imdb Rating: </h4>{episode.imdbRating}
          </div>
          }
          </div>
          )}
          </div>
        
      ]
      })
    });

    const labeltest = `${title} season ${season}`
     this.setState({
      history: [...this.state.history, <Chip variant ="outlined" name = "chip" onClick={this.handleChipClick} color="primary" label = {`${labeltest}`} />]
    });



  }
  componentDidMount(){
   
  }

   handleEventChange(event){
    this.setState({
     [event.target.name]: event.target.value
    });
  }

  handleReset(event){
    this.setState({
      query: '',
      text: '',
      loading: true,
      tvtitle: '',
      season: '',
      imdb: ''
    })
  }

  handleChipClick(event){
    console.log(event);
  
    this.setState({
      query: event.target.label
    });
  }
  

  handleTabChange = (event, value) => {
    this.setState({value});
    this.setState({
      results: []
    });
  }

 

  render() {
    
    const text = this.state.loading ? 'Search for a movie' : this.state.results;
    const query = this.state.query;
    const history = this.state.history;
    const value =this.state.value;
    const buttonText = this.state.buttonText;

    
    return (
      
  
      <div className="App">
      <AppBar color="primary" position="static">
        <Typography variant="h6" color="inherit">
          OMDb API
        </Typography>
      </AppBar>

      <h2>Enter a search query!</h2>
      <Tabs value={value} onChange ={this.handleTabChange} >
      <Tab label="Movies" /> 
      <Tab label="TV Shows" />
      
      </Tabs>

      {value === 0 && <div>


      <TextField name = "query" label ='Search for a movie' margin = 'normal' type = "text" value ={this.state.query} onChange = {this.handleEventChange} />
      <br></br>
      <br></br>
       <Button variant ="contained" color = "primary"  name ='querymovie'  onClick = {this.handleMovieClick}> Search</Button>
       <Button variant ="contained" color = "secondary"  onClick ={this.handleReset}>Reset</Button>
  
       <br></br>
       <br></br>

      </div>}

      {value === 1 && <div>

      <TextField label ='Search for a TV Show' type= "text" name="tvtitle" value ={this.state.tvtitle} onChange = {this.handleEventChange} />
      <br></br>
       <br></br>
      <TextField label ='Season' name= "season" value ={this.state.season} onChange = {this.handleEventChange} />
      <br></br>
       <br></br>
      <TextField label ='Imdb Rating' name= "imdb" value ={this.state.imdb} onChange = {this.handleEventChange} />
      <br></br>
       <br></br>
      <Button variant ="contained" color = "primary"  name ='querytv' onClick = {this.handleTvClick}> Search</Button>
      <Button variant ="contained" color = "secondary"  onClick ={this.handleReset}>Reset</Button>
  

      </div>}
      
      {text}
      <DisplayComponent value = {this.state.text} />  
      <br></br>
      {history.length>0 &&  <h4> Previous Queries <div>{this.state.history}<br></br></div></h4>}
      
      </div>
    );
  }
}

//want to add two search options 
//one form for movie and other for tv series


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
