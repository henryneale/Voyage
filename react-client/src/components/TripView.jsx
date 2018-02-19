import React from 'react';
import EatView from './EatView.jsx';
import PartyView from './PartyView.jsx';
import SleepView from './SleepView.jsx';
import ExploreView from './ExploreView.jsx';
import ItineraryView from './ItineraryView.jsx';
import navHeader from './navHeader.jsx';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class TripView extends React.Component {
  constructor(props) {
    super(props);
  }

  // <Link> tag used to direct user to proper page renders
  // More info here: https://reacttraining.com/react-router/web/api/Link

  render() {
    return (
      <BrowserRouter>
        <div style={{ marginTop: '5px' }}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link to={'/eat'}>Eat</Link>
                <Link to={'/party'}>Party</Link>
                <Link to={'/sleep'}>Sleep</Link>
                <Link to={'/explore'}>Explore</Link>
                <Link to={'/trips'}>My Trips</Link>
              </div>
            </div>
          </nav>
          <div>
            <Switch>
              <Route
                path="/eat"
                render={() => (
                  <EatView newTrip={this.props.newTrip} eat={this.props.eat} />
                )}
              />
              <Route
                path="/party"
                render={() => (
                  <PartyView
                    newTrip={this.props.newTrip}
                    party={this.props.party}
                  />
                )}
              />
              <Route
                path="/sleep"
                render={() => (
                  <SleepView
                    newTrip={this.props.newTrip}
                    sleep={this.props.sleep}
                  />
                )}
              />
              <Route
                path="/explore"
                render={() => (
                  <ExploreView
                    newTrip={this.props.newTrip}
                    explore={this.props.explore}
                  />
                )}
              />
              <Route
                path="/trips"
                render={() => (
                  <ItineraryView itineraries={this.props.itineraries} />
                )}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }

  // <Switch> tag used to ensure that only the matching path component will render
  // Example: Without <Switch>, "/e" and "/eat" path components would both render
  // because "/e" path matches the first two strings in "/eat"
  // More info here: https://reacttraining.com/react-router/web/api/Switch
}

export default TripView;
