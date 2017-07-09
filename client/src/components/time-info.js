import React, { Component } from 'react';
import moment from 'moment';

const end_block = 4039902;
const avg_block_time = 14;

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
export default TimeInfo;