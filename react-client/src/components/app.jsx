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
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    console.log('index');
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      token: ''
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


  render() {
    return(
      <div>
      <Router>
        <div>
          <MenuView />
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route path="/itinerary" component={ItineraryView} />
            <Route path="/results" component={TripView} />
            <Route path="/login" component={Login} />
          </Switch>
          </div>
      </Router>
      </div>
    )
    // <MenuView />
    // if (view === 'trip') {
    //   return (
    //     <MuiThemeProvider>
    //       <div>
    //       <MenuView onChangeView={this.changeView}/>
    //       <TripView eat={this.state.eat} party={this.state.party} sleep={this.state.sleep} explore={this.state.explore} />
    //       </div>
    //     </MuiThemeProvider>
    //   )
    // } else if (view === 'home') {
    //   return (
    //     <MuiThemeProvider>
    //       <div>
    //         <MenuView />
    //         <div className="headers">
    //           <h1>Voyage</h1>
    //           <h5>Ready to plan your next getaway?</h5>
    //         </div>
    //         <div className="searchContainer">
    //           <div>
    //             <div>
    //               <SearchLocation changeLoc={this.onChangeLocation} />
    //               <AddPrice changeBudget={this.onChangePrice} />
    //               <AddCategory setActivities={this.setActivities} />
    //             </div>
    //           </div>
    //         </div>
    //         <div className="goButton">
    //           <button type="button" className="btn btn-primary mb-2" onClick={this.go} > Let's go! </button>
    //         </div>
    //       </div>
    //     </MuiThemeProvider>
    //   );
    // }

  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
