import React, { Component } from 'react';
import moment from 'moment';

const end_block = 4039902;
const end_time = 1500392658;
const end_moment = moment(end_time * 1000);
class TimeInfo extends Component {

  render() {
    return (
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">投票結束了 The election has ended.</h1>

            <nav className="level">
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">投票結束區塊高度</p>
                  <p className="heading">End Block</p>
                  <p className="title"> {end_block}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">結束時間</p>
                  <p className="heading">EndTime</p>
                  <p className="title"> {end_moment.calendar()} </p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">距今結束時間</p>
                  <p className="heading">EndTime From Now</p>
                  <p className="title"> {end_moment.fromNow()}</p>
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