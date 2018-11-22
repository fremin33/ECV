import React, { Component } from "react";
import ReactDOM from "react-dom";
import { isTweetFr } from "../vanilla/utils";
import fetchJson from "../vanilla/fetchJson";
import TweetList from "./tweetList";
import Filter from "./filter";
import Order from "./order";
import Select from "./select";

class Root extends Component {
  constructor() {
    super();
    this.state = {
      isFr: false,
      order: false,
      tweets: []
    };
    // Permet d'utiliser this en tant que Root
    this.filter = this.filter.bind(this);
    this.order = this.order.bind(this);
  }
  filter() {
    this.setState({
      isFr: !this.state.isFr
    });
  }
  order () {
    this.setState({
      order: !this.state.order
    })
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
      const tweets = this.state.isFr ? this.state.tweets.filter(isTweetFr) : this.state.tweets;
      const tweetsToDisplay = tweets.sort((a,b) => {
        const mult = this.state.order ? -1 : 1;
        return mult * (new Date(b.created_at) - new Date(a.created_at));
      });
    return (
      <div>
        <Filter filter={this.filter} />
        <Order order={this.order} />
        <Select tweets={tweetsToDisplay} />
        <TweetList tweets={tweetsToDisplay} />
      </div>
    );
  }
}


ReactDOM.render(<Root />, document.getElementById("root"));
