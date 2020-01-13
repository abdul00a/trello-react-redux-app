import React, { Component } from 'react';
import './form.css';
// import { connect } from 'react-redux';
// import { txtValue, cardDisplay, BtnDisplay } from '../../actions';

// const mapStateToProps = state => {
//   return {
//     name: state.addForm.name,
//     show: state.addForm.show
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     hanleChange: e => dispatch(txtValue(e)),
//     handleCardDisplay: () => dispatch(cardDisplay()),
//     handleBtnDisplay: () => dispatch(BtnDisplay())
//   };
// };

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      show: false
    };
  }

  handleCardDisplay = () => {
    this.setState({
      show: true
    });
  };
  handleBtnDisplay = () => {
    this.setState({
      show: false
    });
  };

  hanleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name } = this.state;

    const inputStyle = {
      backgroundColor: '#fff',
      paddingLeft: '5px',
      margin: '0',
      width: '300px',
      borderRadius: '0.3em'
    };

    return (
      <div className="list">
        <button
          className="btn waves-effect waves-light add-btn"
          type="submit"
          name="action"
          onClick={this.handleCardDisplay}
          style={{
            display: !this.state.show ? 'block' : 'none'
          }}
        >
          ADD {this.props.names}
        </button>
        <div
          className="add-list"
          style={{ display: this.state.show ? 'block' : 'none' }}
        >
          <div className="input-field col s6">
            <input
              type="text"
              name="name"
              defaultValue={name}
              data-length="3"
              style={inputStyle}
              placeholder={`Enter ${this.props.names} title...`}
              onChange={this.hanleChange}
            />
          </div>
          <div className="addlist">
            <button
              className="btn waves-effect waves-light add"
              onClick={() => this.props.onAdd(name, this.props.id)}
            >
              ADD
            </button>
            <i
              className="small material-icons close"
              onClick={this.handleBtnDisplay}
            >
              close
            </i>
          </div>
        </div>
      </div>
    );
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
export default AddForm;
