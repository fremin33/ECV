import React, { Component } from "react";
import ReactDOM from "react-dom";
import { isTweetFr, tweetsByAuthor,getHashtags, tweetsByHashtag } from "../vanilla/utils";
import fetchJson from "../vanilla/fetchJson";
import TweetList from "./tweetList";
import OrderDate from "./orderDate";
import SelectAuthor from "./selectAuthor";
import FilterLanguage from "./filterLanguage";
import SelectHashTag from './selectHashtag'

class Root extends Component {
  constructor() {
    super();
    this.state = {
      isFr: false,
      order: false,
      filterByAuthor: "All",
      filterByHashtag: "All",
      tweets: []
    };
    // Permet d'utiliser this en tant que Root
    this.filter = this.filter.bind(this);
    this.order = this.order.bind(this);
    this.filterByAuthor = this.filterByAuthor.bind(this);
    this.filterByHashtag = this.filterByHashtag.bind(this);
  }
  filter() {
    this.setState({
      isFr: !this.state.isFr
    });
  }
  order() {
    this.setState({
      order: !this.state.order
    });
  }
  filterByAuthor(author) {
    this.setState({
      filterByAuthor: author
    });
  }
  filterByHashtag(hastag) {
    this.setState({
      filterByHashtag: hastag
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
    let tweets = this.state.isFr
      ? this.state.tweets.filter(isTweetFr)
      : this.state.tweets;
    if (this.state.filterByAuthor !== "All") {
      tweets = tweetsByAuthor(tweets, this.state.filterByAuthor);
    }
    if (this.state.filterByHashtag !== "All") {
      tweets = tweetsByHashtag(tweets, this.state.filterByHashtag);
    }
    const hashTags = getHashtags(this.state.tweets);
    const tweetsToDisplay = tweets.sort((a, b) => {
      const mult = this.state.order ? -1 : 1;
      return mult * (new Date(b.created_at) - new Date(a.created_at));
    });

    const authors = [];
    this.state.tweets.forEach(tweet => {
      if (!authors.includes(tweet.user.screen_name))
        authors.push(tweet.user.screen_name);
    });

    return (
      <div>
        <FilterLanguage filter={this.filter} />
        <OrderDate order={this.order} />
        <SelectAuthor authors={authors} filter={this.filterByAuthor} />
        <SelectHashTag hashtags={hashTags} filter={this.filterByHashtag} />
        <TweetList tweets={tweetsToDisplay} />
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
