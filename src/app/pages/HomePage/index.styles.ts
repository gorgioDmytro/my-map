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

export const Header = styled.div`
  margin: 0 -16px 16px;
  padding: 18px 16px 16px;
  border-bottom: 1px solid #d2d0d0;
  display: flex;
  align-items: center;
`;

export const RightSiteContainer = styled.div`
  padding: 0 16px;
`;

export const DistanceLabel = styled.div`
  margin-left: 12px;
`;
