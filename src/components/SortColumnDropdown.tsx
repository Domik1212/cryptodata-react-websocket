import React from 'react';

interface SortColumnDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SortColumnDropdown: React.FC<SortColumnDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-grow items-center">
      <p className='font-bold mx-2'>Seřadit podle:</p>
      <select
        className="px-2 py-1 border border-gray-300 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="rank">Rank</option>
        <option value="symbol">Zkratka</option>
        <option value="name">Název</option>
        <option value="priceUsd">Cena</option>
        <option value="volumeUsd24Hr">Změna 24h</option>
      </select>
    </div>
  );
};

export default SortColumnDropdown;
