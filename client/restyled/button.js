import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-family: Arial;
  color: #fff;
  background: #3498db;
  border: 3px solid #1f628d;
  font-size: 60px;
  padding: 20px 40px;
  border-radius: 60px;
  text-shadow: 0px 1px 3px #666;
  text-decoration: none;

  &:hover {
    background: #8059ff;
    border-color: #3b1d9c;
  }
`;

export default StyledButton;
