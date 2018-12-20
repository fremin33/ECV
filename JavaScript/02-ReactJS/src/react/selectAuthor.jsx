import React from "react";
export default function SelectAuthor(props) {
  return (
    <div>
      <select name="author" onChange={() => props.filter(event.target.value)}>
        <option key="All-author">All</option>
        {props.authors.map(author => {
          return <option key={author}>{author}</option>;
        })}
      </select>
    </div>
  );
}
