import React, { Component } from 'react';
import logo_info from './logo_info';
import QRCode from 'qrcode-react';


const votes_api = `http://${process.env.REACT_APP_ROOT}:3000/votes`
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
    fetch(votes_api)
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

export default Logos;