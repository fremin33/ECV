import React from "react";
export default function SelectHashtag(props) {
  return (
    <div>
      <select name="hastag" onChange={() => props.filter(event.target.value)}>
        <option key="All-hashtag">All</option>
        {props.hashtags.map(hashTag => {
          return <option key={hashTag}>{hashTag}</option>;
        })}
      </select>
    </div>
  );
}
