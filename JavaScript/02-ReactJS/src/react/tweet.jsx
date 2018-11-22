import React from "react";

export default function Tweet(props) {


  const rtDiv = props.tweet.retweeted_status
    ? <h3 className="retweet">retweet</h3>
    : undefined;

  return (
    <div className={"list"}>
      <li>
        <div className={"content"}>
          <div className={"avatar"}>
            <img src={props.tweet.user.profile_image_url} />
          </div>
          <div>
            <div className="entete">
              <h3>@{props.tweet.user.screen_name}</h3>
              {rtDiv}
            </div>
            <p>{props.tweet.text}</p>
          </div>
        </div>
        <p className={"date"}>{props.tweet.created_at}</p>
      </li>
    </div>
  );
}
