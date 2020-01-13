import React, { Component } from 'react';
import './AllBoard.css';
import Board from './Board';
import { connect } from 'react-redux';
import { reqBoards } from '../../actions';

const mapStateToProps = state => {
  return {
    boards: state.Boards.allBoard
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestBoard: () => dispatch(reqBoards())
  };
};

class AllBoard extends Component {
  componentDidMount() {
    this.props.onRequestBoard();
  }

  render() {
    const { boards } = this.props;
    return (
      <section>
        <div>
          <h1 className="boardText">All Trello Boards:</h1>
          <div>
            <ul className="boardContainer">
              {boards.map(ele => (
                <Board
                  key={ele.id}
                  id={ele.id}
                  name={ele.name}
                  imgURL={ele.prefs.backgroundImage}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBoard);
