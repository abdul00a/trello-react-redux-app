import React, { Component } from 'react';
import Modals from 'react-responsive-modal';
import './modal.css';
import { connect } from 'react-redux';
import AddForm from '../lists/AddForm';
import CheckList from '../checkList/CheckList';
import { reqCheckLists, AddChecklist, DeleteCheckList } from '../../actions';

const mapStateToProps = state => {
  return {
    checkList: state.CheckLists.checkList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestCheckList: id => dispatch(reqCheckLists(id)),
    Addcheclist: (name, id) => dispatch(AddChecklist(name, id)),
    deleteChecklist: id => dispatch(DeleteCheckList(id))
  };
};

class Modal extends Component {

  componentDidUpdate(prevCard) {
    if (this.props.cardID !== prevCard.cardID) {
      this.props.onRequestCheckList(this.props.cardID);
    }
  }

  handleAddCheckList = async name => {
    this.props.Addcheclist(name, this.props.cardID);
  };

  handleDeleteCheckList = id => {
    this.props.deleteChecklist(id);
  };

  render() {
    const { show, close, cardName } = this.props;
    return (
      <div>
        <Modals open={show} onClose={close}>
          <h2 className="card-name">{cardName}</h2>
          <span className="checklist-form">
            <AddForm names="checklist" onAdd={this.handleAddCheckList} />
          </span>
          <div className="checklist-checkitems">
            {this.props.checkList.map(ele => (
              <CheckList
                key={ele.id}
                listData={ele}
                onDeleteChecklist={this.handleDeleteCheckList}
              />
            ))}
          </div>
        </Modals>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
