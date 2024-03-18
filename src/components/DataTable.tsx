import React from 'react';
import { CryptoData } from './useCryptoData';

interface CryptoDataTableProps {
  data: CryptoData[];
  cryptoPrices: { [key: string]: number };
  input: string;
  changedCryptoPrices: { [key: string]: number };
}

const DataTable: React.FC<CryptoDataTableProps> = ({ data, cryptoPrices, input, changedCryptoPrices }) => {
  return (
    <table className='table table-auto w-full border-b-2'>
      <thead className="bg-cyan-200">
        <tr>
          <th className="border border-black px-4 py-2 cursor-pointer">
            Rank
          </th>
          <th className="border border-black px-4 py-2">Zkratka</th>
          <th className="border border-black px-4 py-2">Název</th>
          <th className="border border-black px-4 py-2">Cena</th>
          <th className="border border-black px-4 py-2">Změna 24h</th>
        </tr>
      </thead>
      <tbody className='text-left'>
        {data
        .filter((record) => {
          return input === "" 
            ? record 
            : record.name.toLowerCase().includes(input.toLowerCase())
        })
        .map((record) => {
          const name = record.name.toLowerCase();
          const newestPrice = cryptoPrices[name] ?? record.priceUsd;
          const isUpdated = name in changedCryptoPrices;
          const isIncreased = changedCryptoPrices[name] === 1;
          const isDecreased = changedCryptoPrices[name] === -1; 
          return <tr key={record.id} className={isUpdated 
            ? (isIncreased ? 'updated-row green' 
            : (isDecreased ? 'updated-row red' : '')) : ''}>
            <td className="border border-gray-400 px-4 py-2 text-center">{record.rank}</td>
            <td className="border border-gray-400 px-4 py-2">{record.symbol}</td>
            <td className="border border-gray-400 px-4 py-2">{record.name}</td>
            <td className="border border-gray-400 px-4 py-2">{newestPrice}</td>
            <td className="border border-gray-400 px-4 py-2">{record.volumeUsd24Hr}</td>
          </tr>
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
