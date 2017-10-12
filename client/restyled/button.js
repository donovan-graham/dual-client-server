import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-size: 60px;
  color: white;
  padding: 20px 40px;
  border: 3px solid #1f628d;
  text-shadow: 0px 1px 3px #666;
  background: #3498db;
  border-radius: 60px;
  &:hover {
    background: #8059ff;
    border-color: #3b1d9c;
  }
`;

export default StyledButton;
