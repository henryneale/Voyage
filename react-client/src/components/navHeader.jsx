import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

export class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to={'/eat'}>Eat</Link>
            <Link to={'/party'}>Party</Link>
            <Link to={'/sleep'}>Sleep</Link>
            <Link to={'/explore'}>Explore</Link>
          </div>
        </div>
      </nav>
    );
  }
}
