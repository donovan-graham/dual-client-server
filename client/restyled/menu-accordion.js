import React from 'react';
import styled from 'styled-components';
import withToggle from './with-toggle';

const SvgChevron = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 256 256">
    <polygon points="128,48.907 0,176.907 30.187,207.093 128,109.28 225.813,207.093 256,176.907   " />
  </svg>
);

const Chevron = styled(SvgChevron)`
  transform: rotate(${props => (props.isOpen ? '0' : '180')}deg);
  transition: transform 100ms linear;
  width: 14px;
  height: 14px;
  fill: white;
  float: right;
  margin-top: 4px;
`;

const Wrapper = styled.div`
  cursor: pointer;
  background-color: #ffc0cb;
  color: #fff;
  border-bottom: 1px solid #fff;
`;

const MenuTitle = styled.div`
  border-left-style: solid;
  border-left-width: 2px;
  border-left-color: ${props => (props.isOpen ? '#d37c8b' : 'transparent')};
  font-size: 14px;
  line-height: 22px;
  height: 22px;
  padding: 6px 8px 6px 6px;
  overflow: hidden;
  display: block;
  word-break: break-word;
  transition: border-left-color 100ms linear;
`;

const MenuPanel = styled.div`
  border-top: ${props => (props.isOpen ? '1px' : '0px')} solid #fff;
  max-height: ${props => (props.isOpen ? props.maxHeight : 0)}px;
  transition: max-height 100ms linear;
  overflow: hidden;
`;

const MenuAccordion = ({ isMenuOpen, isOpen, toggle, icon, title, panel, maxHeight = 130 }) => (
  <Wrapper>
    <MenuTitle isOpen={isOpen} onClick={toggle}>
      {icon}
      <Chevron isOpen={isOpen} />
      {title}
    </MenuTitle>
    <MenuPanel isOpen={isMenuOpen && isOpen} maxHeight={maxHeight}>
      {panel}
    </MenuPanel>
  </Wrapper>
);

export default withToggle(MenuAccordion);
