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
  transition: transform 150ms linear;
  width: 14px;
  height: 14px;
`;

const Wrapper = styled.div`
  cursor: pointer;
  border-bottom: 1px solid #fff;

  border-left-style: solid;
  border-left-width: 2px;
  border-left-color: ${props => (props.isOpen ? '#fd5572' : 'transparent')};
  background-color: ${props => (props.isOpen ? '#c57281' : '#ffc0cb')};

  transition: border-left-color 150ms linear, background-color 150ms linear;

  &:hover {
    background-color: #c57281;
  }
`;

const MenuHeader = styled.div`
  font-size: 14px;
  overflow: hidden;
  display: flex;
  height: 64px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;

  color: ${props => (props.isOpen ? '#ffebeb' : '#fff')};
  svg {
    fill: ${props => (props.isOpen ? '#ffebeb' : '#fff')};
  }
`;

const MenuPanel = styled.div`
  transition: max-height 150ms linear;
  overflow: hidden;
  font-size: 12px;
  background-color: #d5d5d5;
  color: #fff;
  max-height: ${props => (props.isOpen ? props.maxHeight : 0)}px;
`;
const LabelWrapper = styled.div`
  overflow: hidden;
  /* flex: 1 0 auto; */
  flex: none;
  width: 120px;
  text-align: left;
`;

const IconWrapper = styled.div`
  /* flex: 0 0 40px; */
  flex: none;
  width: 40px;
  text-align: center;
  margin-left: -2px;
`;
const ChevronWrapper = styled.div`
  /* flex: 0 0 40px; */
  flex: none;
  width: 40px;
  text-align: center;
`;

const SvgGear = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 300 300">
    <g>
      <circle cx="149.996" cy="156.072" r="28.197" />
      <path d="M149.996,0C67.157,0,0.001,67.161,0.001,149.997S67.157,300,149.996,300s150.003-67.163,150.003-150.003     S232.835,0,149.996,0z M228.82,171.799l-21.306,1.372c-1.193,4.02-2.783,7.866-4.746,11.482l14.088,16.039l-22.245,22.243     l-16.031-14.091c-3.618,1.961-7.464,3.551-11.482,4.741l-1.377,21.311l-31.458-0.003l-1.375-21.309     c-4.015-1.19-7.861-2.78-11.479-4.741l-16.034,14.091l-22.243-22.25l14.088-16.031c-1.963-3.618-3.553-7.464-4.746-11.482     l-21.306-1.375v-31.458l21.306-1.375c1.193-4.015,2.786-7.864,4.746-11.479l-14.088-16.031l22.245-22.248l16.031,14.088     c3.618-1.963,7.464-3.551,11.484-4.744l1.375-21.309h31.452l1.377,21.309c4.017,1.193,7.864,2.78,11.482,4.744l16.036-14.088     l22.243,22.248l-14.088,16.031c1.961,3.618,3.553,7.464,4.746,11.479l21.306,1.375L228.82,171.799z" />
    </g>
  </svg>
);

const GearIcon = styled(SvgGear)`
  width: 22px;
  height: 22px;
  fill: white;
`;

const MenuAccordion = ({ isMenuOpen, isOpen, toggle, icon, title, panel, maxHeight = 130 }) => (
  <Wrapper isOpen={isOpen}>
    <MenuHeader isOpen={isOpen} onClick={toggle}>
      <IconWrapper>{icon}</IconWrapper>
      <LabelWrapper>{title}</LabelWrapper>
      <ChevronWrapper>
        <Chevron isOpen={isOpen} />
      </ChevronWrapper>
    </MenuHeader>
    <MenuPanel isOpen={isMenuOpen && isOpen} maxHeight={maxHeight}>
      {panel}
    </MenuPanel>
  </Wrapper>
);

export default withToggle(MenuAccordion);
