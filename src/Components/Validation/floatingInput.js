import React, { Component } from 'react';
import {  Input, } from 'reactstrap';

class floatingInput extends Component {
  state = {
    isFocused: false,
    inputPopulated: false,
  };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  render() {
    const { label, ...props } = this.props;
    const { isFocused } = this.state;
    const checkValueForPlaceholder = this.props.value
      ? { color: 'transparent' }
      : {  color: '#aaa' };

    return (
      <div >
        <div style={{ flexDirection: 'row', position: 'absolute' }}>
          <p>{label}</p>
        </div>

        <Input
          {...props}       
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={this.props.refInner}
          editable = {this.props.editable && this.props.editable}
        />
        <p className="text-danger"><small>{props.errorMessage}</small></p>
      </div>
    );
  }
}

export default floatingInput;
