import React, { useState } from 'react';
import { MdShower, MdKitchen, MdBathroom } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

const Calculator = () => {
  const [showerMinutes, setShowerMinutes] = useState(1);
  const [showerPersons, setShowerPersons] = useState(1);
  const [kitchenMinutes, setKitchenMinutes] = useState(1);
  const [kitchenPersons, setKitchenPersons] = useState(1);
  const [bathroomMinutes, setBathroomMinutes] = useState(1);
  const [bathroomPersons, setBathroomPersons] = useState(1);

  const handleShowerMinutesChange = (e) => {
    setShowerMinutes(e.target.value);
  };

  const handleShowerPersonsChange = (e) => {
    setShowerPersons(e.target.value);
  };

  const handleKitchenMinutesChange = (e) => {
    setKitchenMinutes(e.target.value);
  };

  const handleKitchenPersonsChange = (e) => {
    setKitchenPersons(e.target.value);
  };

  const handleBathroomMinutesChange = (e) => {
    setBathroomMinutes(e.target.value);
  };

  const handleBathroomPersonsChange = (e) => {
    setBathroomPersons(e.target.value);
  };

  const calculateShowerUsage = () => {
    return 14 * showerMinutes * showerPersons;
  };

  const calculateKitchenUsage = () => {
    return 9 * kitchenMinutes * kitchenPersons;
  };

  const calculateBathroomUsage = () => {
    return 8 * bathroomMinutes * bathroomPersons;
  };

  const calculateTotalUsage = () => {
    return calculateShowerUsage() + calculateKitchenUsage() + calculateBathroomUsage();
  };

  const calculateWaterSavings = () => {
    // Example: Save 20% water with water saver
    const totalUsage = calculateTotalUsage();
    return totalUsage * 0.20;
  };

  const calculateWaterSavingsPerYear = () => {
    return calculateWaterSavings() * 365;
  };

  const calculatePeopleDrinkingWater = () => {
    return calculateWaterSavingsPerYear() / 3;
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <h1 className='text-xl md:text-2xl lg:text-3xl p-2'>WATER SAVING CALCULATOR</h1>
      <div className="shadow-lg w-full max-w-4xl">
        <div className='bg-gray-500 text-white p-2'>CHANGE YOUR DATA <IoSettingsSharp />
</div>

        <div className="border-b-1 flex flex-col md:flex-row">
          <div className="flex flex-col w-full md:w-1/3 items-center p-6">
            <div className='text-6xl md:text-8xl text-base-blue'><MdShower /></div>
            <h1 className='text-lg md:text-xl'>Shower</h1>
            <h1 className='text-center text-base'>Daily Water Consumption:</h1>
            <h2 className='text-lg md:text-xl text-base-blue'>{calculateShowerUsage().toFixed(2)} Ltr.</h2>
            <div className='flex flex-row items-center mt-4'>
              <label htmlFor="showerMinutes" className='text-base text-center'>Usage in minutes per day and person</label>
              <input
                type="number"
                id="showerMinutes"
                value={showerMinutes}
                onChange={handleShowerMinutesChange}
                className='border rounded p-2 w-16 text-center'
                min="0"
              />
            </div>
            <div className='flex flex-row items-center mt-4'>
              <label htmlFor="showerPersons" className='text-base'>Persons using the shower</label>
              <input
                type="number"
                id="showerPersons"
                value={showerPersons}
                onChange={handleShowerPersonsChange}
                className='border rounded p-2 w-16 text-center'
                min="0"
              />
            </div>
          </div>

          <div className="flex flex-col w-full md:w-1/3 items-center p-6 md:border-l-1">
            <div className='text-6xl md:text-8xl text-base-blue'><MdKitchen /></div>
            <h1 className='text-lg md:text-xl'>Kitchen Faucet</h1>
            <h1 className='text-center text-base'>Daily Water Consumption:</h1>
            <h2 className='text-lg md:text-xl text-base-blue'>{calculateKitchenUsage().toFixed(2)} Ltr.</h2>
            <div className='flex flex-row items-center mt-4'>
              <label htmlFor="kitchenMinutes" className='text-base text-center'>Usage in minutes per day and person</label>
              <input
                type="number"
                id="kitchenMinutes"
                value={kitchenMinutes}
                onChange={handleKitchenMinutesChange}
                className='border rounded p-2 w-16 text-center'
                min="0"
              />
            </div>
            <div className='flex flex-row items-center mt-4'>
              <label htmlFor="kitchenPersons" className='text-base'>People using the faucet</label>
              <input
                type="number"
                id="kitchenPersons"
                value={kitchenPersons}
                onChange={handleKitchenPersonsChange}
                className='border rounded p-2 w-16 text-center'
                min="0"
              />
            </div>
          </div>

          <div className="flex flex-col w-full md:w-1/3 items-center p-6 md:border-l-1">
            <div className='text-6xl md:text-8xl text-base-blue'><MdBathroom /></div>
            <h1 className='text-lg md:text-xl'>Bathroom Faucet</h1>
            <h1 className='text-center text-base'>Daily Water Consumption:</h1>
            <h2 className='text-lg md:text-xl text-base-blue'>{calculateBathroomUsage().toFixed(2)} Ltr.</h2>
            <div className='flex flex-row items-center mt-4'>
              <label htmlFor="bathroomMinutes" className='text-base text-center'>Usage in minutes per day and person</label>
              <input
                type="number"
                id="bathroomMinutes"
                value={bathroomMinutes}
                onChange={handleBathroomMinutesChange}
                className='border rounded p-2 w-16 text-center'
                min="0"
              />
            </div>
            <div className='flex flex-row items-center mt-4'>
              <label htmlFor="bathroomPersons" className='text-base'>People using the faucet</label>
              <input
                type="number"
                id="bathroomPersons"
                value={bathroomPersons}
                onChange={handleBathroomPersonsChange}
                className='border rounded p-2 w-16 text-center'
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 mt-4">
          <h2 className='text-xl md:text-2xl lg:text-3xl'>Total Water Consumption</h2>
          <p className='text-lg md:text-xl'>Total water consumption: <span className='text-base-blue'>{calculateTotalUsage().toFixed(2)} Ltr. per day</span></p>
          <p className='text-lg md:text-xl'>Your water consumption with water saver: <span className='text-base-blue'>{(calculateTotalUsage() - calculateWaterSavings()).toFixed(2)} Ltr. per day</span></p>
          <p className='text-lg md:text-xl'>Your water savings per year: <span className='text-base-blue'>{calculateWaterSavingsPerYear().toFixed(2)} Ltr.</span></p>
          <p className='text-lg md:text-xl'>These are the daily drinking water needs of <span className='text-base-blue'>{calculatePeopleDrinkingWater().toFixed(0)}</span> people.</p>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
