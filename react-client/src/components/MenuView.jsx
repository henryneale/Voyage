import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import ItineraryView from './ItineraryView.jsx';

class MenuView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleItemClick(e, name) {
    // this.setState({
    //   activeItem: name
    // });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <BrowserRouter>
        <div>
          <Menu size="large">
            <a href="/">
              <Menu.Item
                name="home"
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
              />
            </a>
            <Link to={'/itinerary'}>
              <Menu.Item
                name="my trips"
                active={activeItem === 'itineraries'}
                onClick={this.handleItemClick}
              />
            </Link>

            <Menu.Menu position="right">
              {this.props.user.username ? (
                <a href="/logout">
                  <Menu.Item
                    name="logout"
                    active={activeItem === 'logout'}
                    onClick={this.handleItemClick}
                  />
                </a>
              ) : (
                <a href="/login">
                  <Menu.Item
                    name="login"
                    active={activeItem === 'login'}
                    onClick={this.handleItemClick}
                  />
                </a>
              )}
            </Menu.Menu>
          </Menu>
          <div>
            <Switch>
              <Route
                path="/itinerary"
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
}

export default MenuView;
