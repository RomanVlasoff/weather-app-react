import React from 'react';
import styled from 'styled-components';
import AppTopBar from '@/components/app/AppTopBar';
import Container from '@mui/material/Container';
import SearchForm from '@/features/search/SearchForm';

const ContainerContent = styled.div`
  padding: 16px 12px 12px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function WeatherPage() {

  return (
    <div className="weather-page">
      <AppTopBar />
      <Container>
        <ContainerContent>
          <SearchForm />
        </ContainerContent>
      </Container>
    </div>
  );
}

export default WeatherPage;
