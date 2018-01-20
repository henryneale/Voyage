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
import ItineraryView from './ItineraryView.jsx';
import HomeView from './HomeView.jsx';
import Login from './Login.jsx';
import EatView from './EatView.jsx';
import PartyView from './PartyView.jsx';
import SleepView from './SleepView.jsx';
import ExploreView from './ExploreView.jsx';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      token: '',
    };
  }

  // onSuccess(response) {
  //   const token = response.headers.get('x-auth-token');
  //   response.json().then(user => {
  //     if (token) {
  //       this.setState({isAuthenticated: true, user: user, token: token});
  //     }
  //   });
  // }

  // onFailed (error) {
  //   alert(error);
  // };
  // logout () {
  // }

  handler(data, type) {
    console.log('data: ', data);
    if (type === 'eat') {
      this.setState({
        eat: data
      });
    }

    if (type === 'sleep') {
      this.setState({
        sleep: data
      });
    }

    if (type === 'party') {
      this.setState({
        party: data
      });
    }


    if (type === 'explore') {
      this.setState({
        explore: data
      });
    }
  }

  render() {
    return(
      <div>
      <Router>
        <div>
          <MenuView />
          <Switch>
            <Route exact path="/" render={() => <HomeView handler={ this.handler.bind(this) }/>} />
            <Route path="/itinerary" component={ItineraryView} />
            <Route path="/results" component={TripView} />
            <Route path="/login" component={Login} />
            <Route path="/eat" render={() => <EatView eat={ this.state.eat } />} />
            <Route path="/party" render={() => <PartyView party={ this.state.party } />} />
            <Route path="/sleep" render={() => <SleepView sleep={ this.state.sleep } />} />
            <Route path="/explore" render={() => <ExploreView explore={ this.state.explore } />} />
          </Switch>
          </div>
      </Router>
      </div>
    )


  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
