import React from 'react';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withToggle(WrappedComponent, initState = false) {
  class WithToggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: initState
      };
      this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
      this.setState(state => Object.assign({}, state, { isOpen: !this.state.isOpen }));
    }

    render() {
      return <WrappedComponent toggle={this.handleToggle} isOpen={this.state.isOpen} {...this.props} />;
    }
  }
  WithToggle.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithToggle;
}

export default withToggle;
