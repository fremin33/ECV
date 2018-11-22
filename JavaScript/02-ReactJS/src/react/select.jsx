import React, { Component } from "react";
export default function Select(props) {
  return (
    <div>
      <select name="author">
        {props.tweets.map(tweet => {
          return (
            <option key={tweet.id} author={tweet.user.screen_name}>
              {tweet.user.screen_name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
