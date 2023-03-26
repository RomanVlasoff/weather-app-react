import styled from 'styled-components';
import Card from '@mui/material/Card';

export const WeatherCard = styled(Card)`
  background: #2f80ed;
  background: -webkit-linear-gradient(to right, #2f80ed, #56ccf2);
  background: linear-gradient(to right, #2f80ed, #56ccf2);
  padding: 16px;
  flex-grow: 1;
  min-height: 310px;
`;

export const WeatherIconImg = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
`;
