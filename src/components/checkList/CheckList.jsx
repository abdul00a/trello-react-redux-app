import React, { Component } from 'react';
import './checklist.css';
import CheckItems from '../checkItem/CheckItems';
import AddForm from '../lists/AddForm';
import { connect } from 'react-redux';
import {
  reqCheckItem,
  AddCheckItem,
  DeleteCheckItem,
  updateCheckState
} from '../../actions';

const mapStateToProps = state => {
  return {
    checkItems: state.CheckItem.checkItems
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestCheckItem: id => dispatch(reqCheckItem(id)),
    AddItem: (name, id) => dispatch(AddCheckItem(name, id)),
    DeleteItem: (listID, id) => dispatch(DeleteCheckItem(listID, id)),
    checkboxState: (cardID, id, state) =>
      dispatch(updateCheckState(cardID, id, state))
  };
};

class CheckList extends Component {
  handleState = async event => {
    let state = 'incomplete';
    event.target.checked === true
      ? (state = 'complete')
      : (state = 'incomplete');
    this.props.checkboxState(
      this.props.listData.idCard,
      event.target.id,
      state
    );
  };

  componentDidMount() {
    this.props.onRequestCheckItem(this.props.listData.id);
  }

  handleAddItems = name => {
    this.props.AddItem(name, this.props.listData.id);
  };

  handleDeleteItems = id => {
    this.props.DeleteItem(this.props.listData.id, id);
  };

  render() {
    return (
      <div className="checklist-container">
        <div className="check-list">
          <div className="listName">
            <span style={{ alignSelf: 'center', paddingTop: '0.5em' }}>
              <i className="material-icons">check_box</i>
            </span>
            <span className="name">{this.props.listData.name}</span>
          </div>
          <span
            className="del-btn"
            onClick={() => this.props.onDeleteChecklist(this.props.listData.id)}
          >
            DELETE
          </span>
        </div>
        <hr />
        <div className="checkitems-container">
          {this.props.checkItems.map(item => (
            <CheckItems
              key={item.id}
              name={item.name}
              id={item.id}
              ItemState={item.state}
              onStatus={this.handleState}
              onDelItem={this.handleDeleteItems}
            />
          ))}
        </div>
        <div className="checklist-addBtn">
          <AddForm names="checkItem" onAdd={this.handleAddItems} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckList);
