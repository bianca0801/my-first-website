import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [catData, setCatData] = useState<any>({});
  const [IpData, setIpData] = useState<any>({});
  const colors = ['', 'red', 'lightblue', 'green', 'yellow', 'pink', 'purple'];
  const apiKey ="YOUR_API_KEY"; 

  useEffect(() => {
    document.body.style.backgroundColor = colors[colorIndex];
  }, [colorIndex]);

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search', {
      headers: {
        'x-api-key': apiKey
      }
    })
      .then(response => response.json())
      .then(data => setCatData(data[0]))
      .catch(error => console.error('Error fetching the cat data:', error));
  }, [apiKey]);

  useEffect(() => {
    fetch('https://27bd13eb-bd9c-4aab-bb5a-01bb56b029af.eu-central-1.cloud.genez.io/ip')
      .then(response => response.json())
      .then(data => {
        setIpData(data);
        console.log(data); // Verifică ce date primești aici în consolă
      })
      .catch(error => console.error('Error fetching location data:', error));
  }, []);

  const changeBackgroundColor1 = () => {
    setColorIndex(colors.indexOf('green'));
  };

  const changeBackgroundColor2 = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  const changeBackgroundColor3 = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setColorIndex(randomIndex);
  };

  return (
    <div>
      <div>
        {catData.url ? (
          <div>
            <img src={catData.url} alt="A Random Cat" width="300" />
          </div>
        ) : (
          <p>Loading cat data...</p>
        )}
      </div>
      <h1>Bianca Dumitru</h1>
      <h1>Caraua Alexandra</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={changeBackgroundColor1}>
          Schimba culoarea fundalului in verde
        </button>
        <button onClick={changeBackgroundColor2}>
          Schimba culoarea fundalului ciclic
        </button>
        <button onClick={changeBackgroundColor3}>
          Schimba culoarea fundalului aleatoriu
        </button>
        <h2>
          {IpData.country}, {IpData.regionName}, {IpData.city}
        </h2>
      </div>
    </div>
  );
}

export default App;



