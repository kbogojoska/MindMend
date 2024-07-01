import React from 'react'

function Habit(props) {
  return (
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="card-body">
            <h5 class="card-title">{props.name}</h5>
            <ul class="list-group">
                {props.attributes.map((attribute, index) => (
                  <li class="list-group-item" key={index}>{attribute}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Habit