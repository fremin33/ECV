import React from "react";
export default function Tweet(props) {
  return (
    <div>
      {props.tweet.text}
      {props.tweet.created_at}
      {props.ouvert}
    </div>
  );
}
