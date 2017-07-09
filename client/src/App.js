import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Websocket from 'react-websocket';
import 'bulma/css/bulma.css'
import moment from 'moment';

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
    this.state = { curr_block: 0 }
  }
  handleData(data) {
    console.log(data);
    let result = JSON.parse(data);
    this.setState({ curr_block: result.blockNumber });
  }
  timeFromNow() {
    let blocks_left = end_block - this.state.curr_block
    let seconds_left = blocks_left * avg_block_time
    let time_left = moment().second(seconds_left)
    return time_left

  }

  render() {
    return (
      <section className="is-medium">
        <div className="container">
          <h1 className="title"> Clock is ticking</h1>
          <h2 className="subtitle"> Current Block: {this.state.curr_block}</h2>
          <h2 className="subtitle"> End Block: {end_block}</h2>
          <h2 className="subtitle"> Estimate EndTime: {this.timeFromNow().calendar()} {this.timeFromNow().fromNow()}</h2>
        </div>
        <Websocket url='ws://localhost:3000/blockheight'
          onMessage={this.handleData.bind(this)} />
      </section>
    )
  }
}

class Logos extends Component {
  render() {
    return (
      <section className="is-medium">
        <h1 className="title"> Clock is ticking</h1>
        <div className="container">
          <div className="columns is-multiline">
            {
              logo_info.map((logo, idx) =>
                <div className="column is-4">
                  <div className="card" key={idx}>
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={`./img/${logo.image}`} />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <p className="title is-4">{logo.title}</p>
                          <p className="subtitle is-6">@{logo.author}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>

        </div>
        {/*<Websocket url='ws://localhost:3000/blockheight'
          onMessage={this.handleData.bind(this)} />*/}
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
