import React, { useState, useEffect } from "react";
import PoolTable from "./components/PoolTable.jsx";
import loadingImage from "./assets/lava.gif"; // Import your loading image

const API_URL = "http://localhost:3001/api/poolData"; // Use environment variable for API endpoint

function App() {
  const [poolData, setPoolData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPoolData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPoolData(data);
      } catch (error) {
        console.error("Error fetching pool data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoolData();
  }, []);

  return (
    <div className='bg-slate-950 h-screen flex flex-col items-center justify-center'>
      <h1 className=' font-VT323 text-orange-500  tracking-wide text-8xl font-bold mb-8 mt-8'>
        TOP OSMOSIS POOLS
      </h1>{" "}
      {/* Added mt-8 for margin-top */}
      <div className='w-full text-slate-400  max-w-screen-xl overflow-x-auto'>
        {" "}
        {/* Increased max-width */}
        {isLoading ? (
          <img
            src={loadingImage}
            alt='Loading...'
            className=' mx-auto h-56 w-56'
          />
        ) : (
          <PoolTable poolData={poolData} />
        )}
      </div>
    </div>
  );
}

export default App;
