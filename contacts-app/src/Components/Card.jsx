import React from "react";
import Avatar from "./Avatar.jsx";
import Paragraph from "./Paragraph";

function Card(props) {
  return (
    <div>
      <div className="card">
        <div className="top">
          <Paragraph info={props.id} />
          <h2 className="name">{props.name}</h2>
          <Avatar imgURL={props.img} />
        </div>
        <div className="bottom">
          <Paragraph info={props.tel} />
          <Paragraph info={props.email} />
        </div>
      </div>
    </div>
  );
}

export default Card;
