import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const axios = require('axios');


function App() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get('http://localhost:8080/hello?myName=PlayPal')
        .then(response => setTitle(response.data))
        .catch(error => {
          setTitle("SERVER ERROR");
          console.error('There was an error!', error);
        }); 

  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {/* Edit <code>src/App.js</code> and save to reload.  */}
          {title}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
