import React from 'react';

interface NameFilterProps {
  inputValue: string;
  filterValue: string;
  setInputValue: (value: string) => void;
  setFilterValue: (value: string) => void;
}

const NameFilter: React.FC<NameFilterProps> = ({ inputValue, filterValue, setInputValue, setFilterValue }) => {

  const removeFilter = () => {
    setInputValue("");
    setFilterValue("");
  }

  return (
    <div className='flex flex-col'>
      <p className='font-bold mx-2'>Filtrovat podle jména:</p>
      <input 
        type="text" 
        name="filterName" 
        className="border border-gray-300 rounded-md px-3 py-1 mx-2 w-4/5"
        placeholder="Jméno..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}>
      </input>
      <div className='mx-2 w-4/5 flex justify-between'>
        <button 
          onClick={() => setFilterValue(inputValue)}
          className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 m-1 ml-0 rounded-md w-1/2">
          Filtovat
        </button>
        <button
          onClick={removeFilter}
          className={`py-2 px-4 m-1 mr-0 rounded-md w-1/2 font-bold ${
            filterValue === "" ? "bg-gray-300 text-white cursor-not-allowed" : "bg-gray-200 text-cyan-500 hover:bg-gray-300"
          }`}
          disabled={filterValue === ""}>
          Zobrazit vše
        </button>
      </div>
    </div>
  );
};

export default NameFilter;