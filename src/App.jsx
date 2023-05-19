import { useState } from 'react';

import './App.css';
import { Link } from 'react-router-dom';
import Like from './Like/Like';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>


      <Like />

    </>
  )
}

export default App
