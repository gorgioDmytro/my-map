import styled from 'styled-components/macro';

export const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

export const MapWrapper = styled.div`
  height: 100vh;
  & > *:first-child {
    height: 100%;
  }
`;
