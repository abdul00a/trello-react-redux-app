import React, { Component } from 'react';
import './boardList.css';
import AllCards from '../cards/Card';
import AddForm from './AddForm';

class BoardList extends Component {

  render() {
    return (
      <div className="lists">
        <div className="card cards">
          <h6 className="header">
            {this.props.list.name}
            <i
              className="material-icons del"
              onClick={() => this.props.onDeleteList(this.props.list.id)}
            >
              cancel
            </i>
          </h6>
          <div className="card allcard">
            <ul>
              {this.props.list.cards.map(ele => (
                <AllCards
                  cardObj={ele}
                  key={ele.id}
                  onDeleteCard={this.props.delCard}
                  modal={this.props.openModal}
                  listID={this.props.list.id}
                />
              ))}
            </ul>
          </div>
          <AddForm
            names="card"
            onAdd={this.props.addCard}
            id={this.props.list.id}
          />
        </div>
      </div>
    );
  }
}

export default BoardList;
