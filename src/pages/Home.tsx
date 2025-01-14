import React from 'react';

import CardList from '../components/CardList/CardList';

const Home: React.FC = () => {

  return (
    <>
    <h1 hidden>Main Page</h1>
      <section>
      <h2 hidden>Card List</h2>
        <CardList />
      </section>
    </>
  );
};

export default Home;