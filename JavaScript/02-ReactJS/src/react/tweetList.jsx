import React, { Component } from "react";
import Tweet from "./tweet";
export default function TweetList(props) {
  const myTweet = props.tweets.map(tweet => (
    <Tweet key={tweet.id} tweet={tweet} />
  ));
  return (
    <div>
      <ul>{myTweet}</ul>
    </div>
  );
}
