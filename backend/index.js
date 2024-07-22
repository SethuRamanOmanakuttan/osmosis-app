import express from "express";
import cors from "cors";
import { osmosis } from "osmojs";
import axios from "axios";
import "dotenv/config";

const app = express();
const port = 3001;

// Enable CORS for cross-origin requests
app.use(cors());

// Calculates a weight score for a pool (implementation logic to be defined)
const calculatePoolWeightScore = (pool) => {
  return pool.total_shares; // Placeholder, replace with actual calculation
};

// Fetches pool details from Imperator.co API
const getPoolDetailsFromImperator = async (poolId) => {
  const POOL_DATA_API = process.env.IMPERATOR_API_URL;
  const url = `${POOL_DATA_API}${poolId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching pool details from Imperator.co for pool ${poolId}:`,
      error
    );
    return []; // Handle error gracefully, return empty array
  }
};

// Fetches pool data from Osmosis and combines with Imperator data
const fetchPoolData = async () => {
  const LAVA_OSMOSIS_RPC = process.env.OSMOSIS_RPC_ENDPOINT;
  const client = await osmosis.ClientFactory.createRPCQueryClient({
    rpcEndpoint: LAVA_OSMOSIS_RPC,
  });

  try {
    const { pools } = await client.osmosis.gamm.v1beta1.pools();

    // Calculate weight for each pool
    const poolsWithWeight = pools.map((pool) => ({
      pool,
      weight: calculatePoolWeightScore(pool),
    }));

    // Select top 20 pools by weight
    const top100Pools = poolsWithWeight
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 100);

    const allPoolData = [];

    for (const { pool } of top100Pools) {
      const imperatorPoolData = await getPoolDetailsFromImperator(pool.id);

      if (imperatorPoolData.length !== 2) {
        console.error(`Unexpected number of assets in pool ${pool.id}`);
        continue; // Skip pools with unexpected data
      }

      const poolObject = {
        poolID: pool.id.toString(),
        token1: {
          token_symbol: imperatorPoolData[0].symbol,
          token_balance: imperatorPoolData[0].amount.toString(),
        },
        token2: {
          token_symbol: imperatorPoolData[1].symbol,
          token_balance: imperatorPoolData[1].amount.toString(),
        },
      };

      allPoolData.push(poolObject);
    }

    return allPoolData;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Rethrow error to be handled by frontend
  }
};

// API endpoint to fetch pool data
app.get("/api/poolData", async (req, res) => {
  try {
    const poolData = await fetchPoolData();
    console.log(poolData);
    res.json(poolData);
  } catch (error) {
    console.error("Error fetching pool data:", error);
    res.status(500).json({ error: "Failed to fetch pool data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
