import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions";

const mapStateToProps = state => {
  return {
    registerMsg: state.auth.registerMsg
  };
};

let CommentForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="comment"
        component={renderField}
        type="text"
        label="Add a comment..."
      />

      {/* <button className="btn btn-primary btn-sm btn-block mt-3">Comment</button> */}
    </form>
  );
};

const renderField = ({ input, label, type }) => (
  <div>
    <input
      className="form-control form-control-sm border-0"
      {...input}
      placeholder={label}
      type={type}
      autoComplete="off"
    />
  </div>
);

CommentForm = reduxForm({ enableReinitialize: true })(CommentForm);

class Comment extends Component {
  handleSubmit = data => {
    if (Object.keys(data).length !== 0) {
      this.props.comment(data, this.props.postId);
    }
  };

  render() {
    return (
      <CommentForm form={`${this.props.postId}`} onSubmit={this.handleSubmit} />
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(Comment);
