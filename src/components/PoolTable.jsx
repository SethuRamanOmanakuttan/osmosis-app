// src/components/PoolTable.js
import React from "react";

function PoolTable({ poolData }) {
  console.log(poolData);
  return (
    <table className='  table-auto w-full text-center border-4'>
      <thead>
        <tr>
          <th className='border-4 px-4 py-2 text-2xl'>#Pool</th>
          <th className='border-4 px-4 py-2 text-2xl'>Token #1</th>
          <th className='border-4 px-4 py-2 text-2xl'>Balance</th>
          <th className='border-4 px-4 py-2 text-2xl'>Token #2</th>
          <th className='border-4 px-4 py-2 text-2xl'>Balance</th>
        </tr>
      </thead>
      <tbody>
        {poolData.map((pool, index) => (
          <tr key={index}>
            <td className='border-4 px-4 py-2'>{pool.poolID}</td>
            <td className='border-4 px-4 py-2'>{pool.token1.token_symbol}</td>
            <td className='border-4 px-4 py-2'>{pool.token1.token_balance}</td>
            <td className='border-4 px-4 py-2'>{pool.token2.token_symbol}</td>
            <td className='border-4 px-4 py-2'>{pool.token2.token_balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PoolTable;
