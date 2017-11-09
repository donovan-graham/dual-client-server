import React from 'react';
// import { Link } from './menu-config';

class MenuBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);

    this.state = {
      activeKey: undefined,
      isOpen: true
    };
  }

  handleToggle(activeKey, e) {
    e.preventDefault();
    this.setState(state => Object.assign({}, state, { activeKey, isOpen: !state.isOpen }));
  }

  render() {
    // React.Children.toArray(children)
    // React.createElement(type, [props],[...children])
    const nodes = this.props.config.map(({ type, props, children }) =>
      React.createElement(
        type,
        Object.assign({}, props, {
          key: props.toggleKey,
          handleToggle: this.handleToggle,
          isActive: this.state.activeKey && props.toggleKey && this.state.activeKey === props.toggleKey
        }),
        children
      )
    );
    return (
      <div>
        Yo {this.state.activeKey}!!!
        <br />
        <button onClick={e => this.handleToggle('me', e)}>Toggle {this.state.isOpen ? '[o]' : '[c]'}</button>
        <br />
        <br />
        {nodes}
      </div>
    );
  }
}

export default MenuBuilder;
