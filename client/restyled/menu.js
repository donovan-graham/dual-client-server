import React from 'react';
import styled from 'styled-components';

const Drawer = styled.div`
  width: ${props => (props.isOpen ? 200 : 40)}px;
  transition: width 100ms;
  position: absolute;
  overflow: none;
  top: 0;
  bottom: 0;
  float: left;
  display: block;
  background-color: black;
  color: white;
`;

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };

    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleEnter() {
    this.setState(state => Object.assign({}, state, { isOpen: true }));
  }

  handleExit() {
    this.setState(state => Object.assign({}, state, { isOpen: false }));
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        isMenuOpen: this.state.isOpen
      })
    );

    return (
      <div onMouseEnter={this.handleEnter} onMouseLeave={this.handleExit}>
        <Drawer isOpen={this.state.isOpen}>{childrenWithProps}</Drawer>
      </div>
    );
  }
}

export default Menu;
