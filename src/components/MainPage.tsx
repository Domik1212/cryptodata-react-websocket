import React from 'react';
import { useState, useEffect } from 'react';
import SortColumnDropdown from './SortColumnDropdown.tsx';
import SortOrderRadio from './SortOrderRadio.tsx';
import DataTable from './DataTable.tsx';
import NameFilter from './NameFilter.tsx';
import { useCryptoData } from './useCryptoData.ts';

export const MainPage: React.FC = () => {
  const { data, setData, cryptoPrices, changedCryptoPrices } = useCryptoData();
  const [sortColumn, setSortColumn] = useState<string>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [inputValue, setInputValue] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    if (sortOrder === 'asc') {
      const sorted = [...data].sort((a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];
        if (!isNaN(Number(columnA)) && !isNaN(Number(columnB))) {
          return Number(columnA) - Number(columnB);
        } else {
          return columnA.toLowerCase() > columnB.toLowerCase() ? 1 : -1;
        }
      });
      setData(sorted);
    } else {
      const sorted = [...data].sort((a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];
        if (!isNaN(Number(columnA)) && !isNaN(Number(columnB))) {
          return Number(columnB) - Number(columnA);
        } else {
          return columnA.toLowerCase() < columnB.toLowerCase() ? 1 : -1;
        }
      });
      setData(sorted);
    }
  }, [sortColumn, sortOrder]);

  return (
    <div>
      <div className='grid grid-cols-3 mb-4'>
        <div className='flex flex-col col-span-2 m-4'>
          <SortColumnDropdown value={sortColumn} onChange={setSortColumn} />
          <SortOrderRadio value={sortOrder} onChange={setSortOrder} />
        </div>
        <div className='m-4'>
          <NameFilter 
            inputValue={inputValue} 
            filterValue={filterValue} 
            setInputValue={setInputValue} 
            setFilterValue={setFilterValue} />
        </div>
      </div>

      <div className='mx-auto mb-4 container flex justify-center'>
        <DataTable data={data} cryptoPrices={cryptoPrices} input={filterValue} changedCryptoPrices={changedCryptoPrices}/>
      </div>
    </div>
    );
}
