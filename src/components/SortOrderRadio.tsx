import React from 'react';

interface SortOrderRadioProps {
  value: 'asc' | 'desc';
  onChange: (value: 'asc' | 'desc') => void;
}

const SortOrderRadio: React.FC<SortOrderRadioProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col">
      <p className='font-bold mx-2'>Typ řazení:</p>
      <div className="flex items-center mx-4">
        <input
          type="radio"
          id="asc"
          name="sortOrder"
          value="asc"
          checked={value === 'asc'}
          onChange={() => onChange('asc')}
          className="mr-1"
        />
        <label htmlFor="asc" className="mr-2">Vzestupně</label>
        <input
          type="radio"
          id="desc"
          name="sortOrder"
          value="desc"
          checked={value === 'desc'}
          onChange={() => onChange('desc')}
          className="mr-1"
        />
        <label htmlFor="desc">Sestupně</label>
      </div>
    </div>
  );
};

export default SortOrderRadio;
