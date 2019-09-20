import React from "react";

const ListItem = props => {
  return (
    <li className="list-group-item">
      {props.data.name}
      <i
        onClick={props.onDelete}
        className="fa fa-trash-o ml-4 clickable"
        aria-hidden="true"
        title="delete"
      ></i>
      <i
        onClick={props.onUpdate}
        className="fa fa-pencil-square-o clickable ml-2"
        title="edit"
      ></i>
    </li>
  );
};

export default ListItem;
