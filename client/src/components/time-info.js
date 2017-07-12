import React, { Component } from 'react';
import moment from 'moment';
import Spinner from 'react-spinkit';

const end_block = 4039902;
const avg_block_time = 14;
const blockNumber_api = `http://${process.env.REACT_APP_ROOT}:3000/blockNumber`;
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
    let self = this;
    setTimeout(function () {
      if (!self.state.mounted) { return; }
      self.poll();
      self._timer = setInterval(self.poll.bind(self), 15000);
    }, 1000);
  }

  poll() {
    fetch(blockNumber_api)
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
            <h1 className="title">緊張刺激哦！ Clock is ticking</h1>

            <nav className="level">
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">目前區塊高度</p>
                  <p className="heading">Current Block</p>
                  {this.state.curr_block === 0 ? <Spinner name="three-bounce" /> : <p className="title">this.state.curr_block}</p>}
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">投票結束區塊高度</p>
                  <p className="heading">End Block</p>
                  <p className="title"> {end_block}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">預估結束時間</p>
                  <p className="heading">Estimate EndTime</p>
                  <p className="title"> {this.timeFromNow().calendar()} </p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">預估距今結束時間</p>
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