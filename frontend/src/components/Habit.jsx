import React from 'react'

function Habit(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <ul className="list-group">
                {props.attributes.map((attribute, index) => (
                  <li className="list-group-item" key={index}>{attribute}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Habit