import React, { Component } from 'react';
import logo_info from './logo_info';
import QRCode from 'qrcode-react';

const Logo = (logo, idx) => (
  <div className="column is-4" key={idx}>
    <div className="card" >
      <div className="card-image">
        <figure className="image is-4by3">
          <a target="_blank" href={logo.url} rel="noopener noreferrer">
            <img src={`./img/${logo.image}`} alt={`./img/${logo.image}`} />
          </a>
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
              Final Votes
                             <h1 className="title is-1 is-spaced">{logo.votes} </h1>
            </div>
            <div className="column is-half">
              Vote Address
                            <a target="_blank"
                href={`https://etherscan.io/address/${logo.address}#tokentxns`}
                rel="noopener noreferrer">
                <QRCode value={logo.address} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

)

class Logos extends Component {

  render() {
    return (
      <section id="logos" className="is-large">
        <div className="container">
          <div className="columns is-multiline">
            {
              logo_info.map((logo, idx) => Logo(logo, idx))
            }
          </div>
        </div>
      </section>
    )
  }
}
export  {Logo} ;
export default Logos;
