import React, { Component } from 'react';
import './App.css'
import 'bulma/css/bulma.css'
import TimeInfo from './components/time-info';
import Logos from './components/logos';


class Nav extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-brand">
            <a className="navbar-item" href="http://bulma.io">
              <h1>Taipei Ethereum Meetup</h1>
            </a>

            <div className="navbar-burger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

class Header extends Component {
  render() {
    return (
      <section className="hero is-medium is-dark is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title"> 2017 LogoVote</h1>
            <h2 className="subtitle"> Taipei Ethereum Meetup</h2>
          </div>
        </div>
      </section>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <TimeInfo />
        <Logos />
      </div>
    );
  }
}

export default App;
