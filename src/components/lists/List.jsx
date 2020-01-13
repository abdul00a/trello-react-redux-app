import React, { Component } from 'react';
import Header from '../header/Header';
import BoardList from './BoardLists';
import AddForm from './AddForm';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from '../modal/Modal';
import './list.css';
import {
  reqLists,
  showModal,
  AddList,
  DeleteList,
  AddCard,
  delCard,
  closeModal
} from '../../actions';

const mapStateToProps = state => {
  return {
    Lists: state.Lists.allList,
    open: state.Lists.open,
    cardID: state.Lists.cardID,
    cardName: state.Lists.cardName
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestList: id => dispatch(reqLists(id)),
    onOpenModal: (id, name) => dispatch(showModal(id, name)),
    AddList: (name, id) => dispatch(AddList(name, id)),
    Deletelist: id => dispatch(DeleteList(id)),
    addCard: (name, id) => dispatch(AddCard(name, id)),
    onCloseModal: () => dispatch(closeModal()),
    deleteCard: (id, listID) => dispatch(delCard(id, listID))
  };
};

class List extends Component {
  componentDidMount() {
    this.props.onRequestList(this.props.match.params.id);
  }

  handleAddList = name => {
    this.props.AddList(name, this.props.match.params.id);
  };

  handleAddCard = (name, id) => {
    this.props.addCard(name, id);
  };

  handleDeleteList = id => {
    this.props.Deletelist(id);
  };

  handleDeleteCard = (id, listID) => {
    this.props.deleteCard(id, listID);
  };

  render() {
    return (
      <div>
        <Header />
        <div className="headContainer">
          <h1 className="boardName">
            <em>{this.props.match.params.name}</em>
          </h1>
          <Link to="/" style={{ alignSelf: 'center' }}>
            <button className="btn-board">
              <span className="btn-text">Boards</span>
            </button>
          </Link>
        </div>
        <div className="listContainer">
          {this.props.Lists.map(ele => (
            <BoardList
              list={ele}
              key={ele.id}
              onDeleteList={this.handleDeleteList}
              openModal={this.props.onOpenModal}
              addCard={this.handleAddCard}
              delCard={this.handleDeleteCard}
            />
          ))}
          <AddForm names="list" onAdd={this.handleAddList} />
        </div>
        <Modal
          show={this.props.open}
          close={this.props.onCloseModal}
          cardID={this.props.cardID}
          cardName={this.props.cardName}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
