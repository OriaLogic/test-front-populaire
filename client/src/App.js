import React, { useState, useEffect } from 'react';


function App() {
  const [status, setStatus] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(
    () => {
      const fetchStatus = async () => {
        const response = await fetch("http://localhost:3001/status");
        const jsonResponse = await response.json();

        setStatus(jsonResponse.status);
      };
      
      const fetchIntervalId = setInterval(fetchStatus, 1000);

      return () => clearInterval(fetchIntervalId);
    },
    [setStatus, setElapsedTime]
  );

  useEffect(
    () => {
      const elapsedTimeIntervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);

      return () => clearInterval(elapsedTimeIntervalId);
    },
    [setElapsedTime]
  );

  useEffect(
    () => {
      setElapsedTime(0);
    },
    [status, setElapsedTime]
  )

  return (
    <div className="app">
      <div>
        {'Status: '}
        <span style={{ fontWeight: 'bold' }}>
          {
            !!status ? status : 'unknown'
          }
        </span>
      </div>
      
      <div style={{ fontSize: 18, color: "#7a7a7a" }}>
        {'Status has not changed since '}
        <span style={{ fontWeight: 'bold' }}>{elapsedTime} {' seconds'}</span>
      </div>
    </div>
  );
}

export default App;
