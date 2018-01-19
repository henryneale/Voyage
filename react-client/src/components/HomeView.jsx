import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SearchLocation from './SearchLocation.jsx';
import AddPrice from './AddPrice.jsx';
import Header from './navHeader.jsx';
import AddCategory from './AddCategory.jsx';
import axios from 'axios';
import TripView from './TripView.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuView from './MenuView.jsx';

class HomeView extends React.Component {
  constructor(props) {
    console.log('index');
    super(props);
    this.state = {
      location: '',
      price: '',
      activities: [],
      sleep: [],
      eat: [],
      party: [],
      explore: [],
      view: 'home',
    };
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.setActivities = this.setActivities.bind(this);
    this.go = this.go.bind(this);
    this.getExploreData = this.getExploreData.bind(this);
    this.getEatData = this.getEatData.bind(this);
    this.getPartyData = this.getPartyData.bind(this);
    this.getSleepData = this.getSleepData.bind(this);
    this.changeTripView = this.changeTripView.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  // sets the location state
  onChangeLocation(destination) {
    this.setState({
      location: destination,
    });
  }

  // sets the price state
  onChangePrice(value) {
    this.setState({
      price: value,
    });

    this.setActivities = this.setActivities.bind(this);
  }

  // sets the activities state
  setActivities(data) {
    this.setState({
      activities: data,
    });
  }

  // this method will get called when clicked on GO button
  go() {
    if (this.state.activities.includes('explore') && this.state.location !== '' && this.state.price !== '') {
      axios.post('/explore', {
        location: this.state.location,
        price: this.state.price,
      })
        .then(response => {
          console.log('explore data from server', response);
           this.getExploreData(response.data);
        })
        .catch(error => {
          console.log('error..!!', error);
        });
    }

     if (this.state.activities.includes('sleep') && this.state.location !== '' && this.state.price !== '') {
      axios.post('/sleep', {
        location: this.state.location,
        price: this.state.price,
      })
        .then(response => {
           console.log('sleep data from server', response);
           this.getSleepData(response.data);
        })
        .catch(error => {
          console.log('error..!!', error);
        });
    }

     if (this.state.activities.includes('eat') && this.state.location !== '' && this.state.price !== '') {
      axios.post('/eat', {
        location: this.state.location,
        price: parseInt(this.state.price),
      })
        .then(response => {
           console.log('eat data from server', response);
           this.getEatData(response.data);
        })
        .catch(error => {
          console.log('error..!!', error);
        });
    }

      if (this.state.activities.includes('party') && this.state.location !== '' && this.state.price !== '') {
      axios.post('/party', {
        location: this.state.location,
        price: this.state.price,
      })
        .then(response => {
           console.log('party data from server', response.data);
           this.getPartyData(response.data);
        })
        .catch(error => {
          console.log('error..!!', error);
        });
    }
    this.changeTripView();
  }

//sets the trip view
  changeTripView() {
    this.setState({
      view: 'trip',
    });
  }

  // sets the state with the explore data which is coming from server
  getExploreData(data) {
    this.setState({
      explore: data,
    });
  }

  // sets the state with the eat data which is coming from server
  getEatData(data) {
    this.setState({
      eat: data,
    });
  }

  // sets the state with the party data which is coming from server
  getPartyData(data) {
    this.setState({
      party: data,
    });
  }

  // sets the state with the sleep data which is coming from server
  getSleepData(data) {
    this.setState({
      sleep: data,
    });
  }

  changeView(e) {
    console.log('changing view')
    console.log('e:', e)
    this.setState({
      view: e,
    });
  }

  render() {
    const { view } = this.state;
      return (
        <MuiThemeProvider>
          <div>
            <MenuView />
            <div className="headers">
              <h1>Voyage</h1>
              <h5>Ready to plan your next getaway?</h5>
            </div>
            <div className="searchContainer">
              <div>
                <div>
                  <SearchLocation changeLoc={this.onChangeLocation} />
                  <AddPrice changeBudget={this.onChangePrice} />
                  <AddCategory setActivities={this.setActivities} />
                </div>
              </div>
            </div>
            <div className="goButton">
              <button type="button" className="btn btn-primary mb-2" onClick={this.go} > Let's go! </button>
            </div>
          </div>
        </MuiThemeProvider>
      );
  }
}


export default HomeView;
