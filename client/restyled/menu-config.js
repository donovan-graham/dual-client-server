import React from 'react';
import styled from 'styled-components';

export const Link = styled.a`
  padding: 20px;
  color: ${props => (props.isActive ? 'red' : 'blue')};
`;
Link.displayName = 'StyledLink';

const ToggleLink = ({ handleToggle, toggleKey, isActive, href, children }) => (
  <Link onClick={e => handleToggle(toggleKey, e)} isActive={isActive} href={href}>
    {children}
  </Link>
);

export const Button = styled.button`
  padding: 20px;
  color: ${props => (props.isActive ? 'red' : 'blue')};
`;
Button.displayName = 'StyledButton';

const ToggleButton = ({ handleToggle, toggleKey, isActive, children }) => (
  <Button onClick={e => handleToggle(toggleKey, e)} isActive={isActive}>
    {children}
  </Button>
);

const config = [
  {
    type: ToggleLink,
    props: { href: '/homes', toggleKey: 'HOME_LINK' },
    children: 'Home'
  },
  {
    type: ToggleLink,
    props: { href: '/contact', toggleKey: 'CONTACT_LINK' },
    children: 'Contact'
  },
  {
    type: ToggleButton,
    props: { toggleKey: 'BOOM_BUTTON' },
    children: [<p>boom!</p>, <div>boom!!</div>, <span>boom!!!</span>]
  }
];

export default config;
