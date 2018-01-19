import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black',
]

class MenuView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleItemClick(e, name) {
    this.setState({
      activeItem: name
    });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu size='large'>
        <Link to='/'><Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} /></Link>
        <Link to='/itinerary'><Menu.Item name='my trips' active={activeItem === 'itineraries'} onClick={this.handleItemClick} /></Link>

        <Menu.Menu position='right'>
          <Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick} />
        </Menu.Menu>
      </Menu>
    )
  }
}

export default MenuView;