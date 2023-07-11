import React, { useState } from 'react';
import Menu from './components/Menu';
import ShotCounter from './components/ShotCounter';

export default function App() {
  const [page, setPage] = useState("Menu");

  if (page === "Menu") {
    return (
      <Menu selectPage={setPage}/>
    );
  }
  if (page === "ShotCounter") {
    return (
      <ShotCounter selectPage={setPage}/>
    )
  }
}

