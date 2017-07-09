import React, { Component } from 'react';
import './App.css'
import 'bulma/css/bulma.css'
import moment from 'moment';
import QRCode from 'qrcode-react';

const end_block = 4039902;
const avg_block_time = 14;
const logo_info = [
  {
    address: '0xD82ce82FBe3fc5b0429De15617604A7c6A8E0B0f',
    image: 'Logo1.png',
    title: 'Green Taiwan and 101 Taipei',
    author: 'wendy30398',
    url: 'https://github.com/EtherTW/LogoVote2017/issues/7'
  },
  {
    address: '0x17DA2B4227bdfbF6c4dc39afea1E4F6e0af575B7',
    image: 'Logo2.png',
    title: 'Ethereum in Taipei',
    author: 'insowe',
    url: 'https://github.com/EtherTW/LogoVote2017/issues/10'
  },
  {
    address: '0x7d10CD89b7506ddA58933e54e7774b71c28F2B53',
    image: 'Logo3.jpg',
    title: 'New Kids in the Ether',
    author: 'neojason',
    url: 'https://github.com/EtherTW/LogoVote2017/issues/11'
  },
  {
    address: '0xf010A1CF53BEe1b1eCa44F3FB6e36f1ac633Ad19',
    image: 'Logo4.png',
    title: 'sky lanterns',
    author: 'iisaint',
    url: 'https://github.com/EtherTW/LogoVote2017/issues/12'
  },
  {
    address: '0xa245D51B2683E8e13657a6C711FE23a011391700',
    image: 'Logo5.png',
    title: 'Kite, EtherLogo just like a Kite',
    author: 'Stella Wang and Rachel Wang',
    url: 'https://github.com/EtherTW/LogoVote2017/issues/13'
  },
  {
    address: '0x3503317F65b1cdA3d48009AB963Be13BB6960A38',
    image: 'Logo6.jpg',
    title: 'Ethereum of future light in taipei',
    author: 'andrea1112',
    url: 'https://github.com/EtherTW/LogoVote2017/issues/15'
  }
]

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

class TimeInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      curr_block: 0
    }
  }

  componentDidMount() {
    this.startPolling();
    this.setState({ mounted: true });
  }
  componentWillUnmount() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
    this.setState({ mounted: false });
  }
  startPolling() {
    var self = this;
    setTimeout(function () {
      if (!self.state.mounted) { return; }
      self.poll();
      self._timer = setInterval(self.poll.bind(self), 15000);
    }, 1000);
  }

  poll() {
    fetch("http://localhost:3000/blockNumber")
      .then((res) => res.json())
      .then(data => {
        this.setState({ curr_block: data.blockNumber })
      })
  }

  timeFromNow() {
    let blocks_left = end_block - this.state.curr_block
    let seconds_left = blocks_left * avg_block_time
    let time_left = moment().second(seconds_left)
    return time_left
  }

  render() {
    return (
      <section className="hero is-warning ">
        <div className="hero-body">
          <div className="container">
            <h1 className="title"> Clock is ticking</h1>

            <nav className="level">
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading"> Current Block</p>
                  <p className="title"> {this.state.curr_block}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">  End Block</p>
                  <p className="title"> {end_block}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Estimate EndTime</p>
                  <p className="title"> {this.timeFromNow().calendar()} </p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">EndTime From Now</p>
                  <p className="title"> {this.timeFromNow().fromNow()}</p>
                </div>

              </div>
            </nav>
          </div>
        </div>
      </section>
    )
  }
}

class Logos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: logo_info.map(logo => {
        let addr_vote = {}
        for (let i = 0; i < logo.length; i++) {
          addr_vote[logo[i].address] = 0
        }
        return addr_vote
      })
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/votes")
      .then((res) => res.json())
      .then(data => {
        this.setState({ votes: data })
      })
  }

  render() {
    return (
      <section id="logos" className="is-large">
        <div className="container">
          <div className="columns is-multiline">
            {
              logo_info.map((logo, idx) =>
                <div className="column is-4" key={idx}>
                  <div className="card" >
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={`./img/${logo.image}`} alt={`./img/${logo.image}`} />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <p className="title is-4">{logo.title}</p>
                          <p className="subtitle is-6">@{logo.author}</p>
                        </div>
                      </div>
                      <div className="content has-text-centered">
                        <div className="columns">
                          <div className="column is-half">
                            Current Vote
                        <h1 className="title is-1 is-spaced">{this.state.votes[logo.address]} </h1>

                          </div>
                          <div className="column is-half">
                            Vote Address
                         <QRCode value={logo.address} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
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
