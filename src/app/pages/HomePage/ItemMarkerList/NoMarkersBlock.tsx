import * as React from 'react';
import styled from 'styled-components/macro';

interface INoMarkersBlock {
  additionalMessage?: string;
}

const StyledNoMarkersBlock = styled.div`
  padding: 16px;
  background-color: beige;
  cursor: pointer;
`;

export function NoMarkersBlock({ additionalMessage }: INoMarkersBlock) {
  return (
    <StyledNoMarkersBlock>
      <div>Empty markers list...</div>
      {additionalMessage && <div>{additionalMessage}</div>}
    </StyledNoMarkersBlock>
  );
}
