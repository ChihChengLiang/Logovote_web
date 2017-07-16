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
      <section className="hero is-medium is-bold is-light">
        <div className="hero-body">
          <div className="container">
            <h1 className="title"> How do I vote?</h1>
            <h2 className="subtitle"> Let me tell ya, it's simple!</h2>
            <div className="columns">
              <div className="column is-half">
                <p >You get tokens to vote, ...</p>
                <iframe title="get-token" width="100%" height="315" src="https://www.youtube.com/embed/MRN9-vkazMQ" frameborder="0" allowfullscreen></iframe>
              </div>
              <div className="column is-half">
                <p>and you vote with the tokens!</p>
                <iframe title="vote" width="100%" height="315" src="https://www.youtube.com/embed/-8N5AtsaTU4" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>
    )
  }
}

class Sponsors extends Component {
  render() {
    const sponsors = [
      {
        name: "Consensus Innovation",
        img: `${process.env.PUBLIC_URL}/sponsors/css.png`
      }, {
        name: "DLT DOJO",
        img: "https://dltdojo.org/android-chrome-256x256.png"
      }

    ]
    return (
      <section className="hero is-medium is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title"> Sponsors</h1>
            <div className="columns">
              {sponsors.map((sponsor, key) => (
                <div className="column is-3 " key={key}>
                  <img src={sponsor.img} width="80%" alt={sponsor.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

class LearnMore extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="level">
            <div className="level-item">
              <div>
                <p class="heading">Contract source code</p>
                <p class="title">
                  <a target="_blank" href="https://github.com/EtherTW/LogoVote2017" rel="noopener noreferrer">EtherTW/LogoVote2017</a>
                </p>
              </div>
            </div>
            <div className="level-item">
              <div>
                <p class="heading">This website source code</p>
                <p class="title">
                  <a target="_blank" href="https://github.com/chihchengliang/Logovote_web" rel="noopener noreferrer">ChihChengLiang/Logovote_web</a>
                </p>
              </div>

            </div>
          </div>
          <div className="content has-text-centered">
            <p>
              Learn more with
              <strong>
                <a href="https://www.facebook.com/groups/443751072484739/">
                  Taipei Ethereum Meetup
                </a>
              </strong>
            </p>
          </div>
        </div>
      </footer>
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
        <Sponsors />
        <LearnMore />
      </div>
    );
  }
}

export default App;
