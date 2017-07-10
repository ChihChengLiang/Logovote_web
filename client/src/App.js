import React, { Component } from 'react';
import './App.css'
import 'bulma/css/bulma.css'
import TimeInfo from './components/time-info';
import Logos from './components/logos';


class Header extends Component {
  render() {
    return (
      <section className="hero is-medium is-dark is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title"> 2017 LogoVote</h1>
            <h2 className="subtitle">台北以太坊社群 Taipei Ethereum Meetup</h2>
            <h3>主合約地址：
              <a target="_blank"
                href="https://etherscan.io/address/0x3ab1d534bb477f516817efaaf0b569f419b8e292"
                rel="noopener noreferrer">
                0x3Ab1d534Bb477f516817eFaAf0B569f419b8e292</a>
            </h3>
          </div>
        </div>
      </section>
    )
  }
}

class HowTo extends Component {
  render() {
    return (
      <section className="hero is-medium is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title"> How do I vote?</h1>
            <h2 className="subtitle"> Let me tell ya</h2>

          </div>
        </div>
      </section>
    )
  }
}

class LearnMore extends Component {
  render() {
    return (
      <section className="hero is-medium is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title"> How do I vote?</h1>
            <h2 className="subtitle"> Let me tell ya</h2>

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
        <HowTo />
        <LearnMore />
      </div>
    );
  }
}

export default App;
