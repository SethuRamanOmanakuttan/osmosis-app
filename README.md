# Osmosis Pool Data Viewer

This Node.js application provides a simple interface to view top pools on the Osmosis blockchain.

## Installation

Clone the repository :

```
git clone https://github.com/SethuRamanOmanakuttan/osmosis-app

```
Navigate to the project directory :

```
cd osmosis-app
```

Install dependencies :

```
npm install
```

## Configuration
Create a .env file: Create a file named .env at the root of the project directory.

Set environment variable: Add the following variable to the .env file :
```
IMPERATOR_API_URL="https://api-osmosis.imperator.co/pools/v2/"

```
Now, add the rpc endpoint :

```
OSMOSIS_RPC_ENDPOINT="< https://OSMOSIS_TENDERMINT_HTTP_RPC_ENDPOINT>"
```
Replace `<OSMOSIS_TENDERMINT_HTTP_RPC_ENDPOINT>` with the actual Osmosis mainnet Tendermint/HTTP RPC endpoint. 
You can access the enpoint via the lava network. Just create a [lava account](https://accounts.lavanet.xyz/) and fetch the free osmosis endpoint.

## Usage
Start the application:

Open a terminal in the root directory of the project and run the following command :

```
npm start
```

## Access the application:
Open your web browser and navigate to : 
```
 http://localhost:5173/
```
