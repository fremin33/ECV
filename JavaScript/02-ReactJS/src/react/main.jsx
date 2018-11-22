import React, { Component } from "react";
import ReactDOM from "react-dom";
import { isTweetFr } from "../vanilla/utils";
import fetchJson from "../vanilla/fetchJson";
import TweetList from "./tweetList.jsx";
import Filter from "./filter.jsx";

class Root extends Component {
  constructor() {
    super();
    this.state = {
      isFr: false,
      tweets: []
    };
    // Permet d'utiliser this en tant que Root
    this.filter = this.filter.bind(this);
  }
  filter() {
    this.setState({
      isFr: !this.state.isFr
    });
  }

//   Excuter après le premier rendu
  componentDidMount() {
    const urls = [
      "https://raw.githubusercontent.com/iOiurson/formation/correction/data/tweets.json",
      "https://raw.githubusercontent.com/iOiurson/formation/correction/data/tweets2.json"
    ];
    Promise.all(urls.map(fetchJson)).then(([tweets1, tweets2]) => {
      const tweets = tweets1.concat(tweets2);
      this.setState({
        tweets
      });
    });
  }

  render() {
      const tweetsToDisplay = this.state.isFr ? this.state.tweets.filter(isTweetFr) : this.state.tweets ;
    return (
      <div>
        <Filter filter={this.filter} />
        <TweetList tweets={tweetsToDisplay} />
      </div>
    );
  }
}


ReactDOM.render(<Root />, document.getElementById("root"));
