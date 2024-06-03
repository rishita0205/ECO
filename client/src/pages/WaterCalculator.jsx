import React, { useRef } from 'react';
import logo from '../assets/logo.png'; // Make sure to update the path to your logo image
import Calculator from '../components/Calculator';
import guide from '../assets/guide.png'
import Footer from '../components/Footer'
const WaterCalculator = () => {
  const calculatorRef = useRef(null);

  const handleButtonClick = () => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className='bg-white h-20 w-full absolute'>
        <div className='rounded-tr-full rounded-br-full rounded-bl-full p-3 flex justify-items-center items-center bg-white relative top-10 bottom-10 h-24 w-24'>
          <a href="/">
          <img src={logo} alt="Logo" />
          </a>
        </div>
      </div>

      <div className="bg-[url('https://www.watersaving.com/static/uploads/GettyImages-1337380223_blue_2_EWDNfUc.jpg')] flex flex-col  w-full h-[600px] items-center justify-center bg-cover p-6  md:p-40">
        <h1 className='font-fancy text-3xl md:text-6xl lg:text-7xl text-base-blue '>HOW MUCH WATER CAN YOU SAVE?</h1>
        <p className='text-white text-sm mt-4'>
          Chances are your water consumption is higher than you think. In many households, for example, 15 liters of water come out of the shower – and that’s per minute. Find out now how much water, energy and money you can save.
        </p>
        <button 
          className='rounded-full px-6 py-2 self-start mt-4 bg-base-blue text-white' 
          onClick={handleButtonClick}
        >
          SAVING CALCULATOR
        </button>
      </div>


     {/*<div className="ml-80 mr-80 mt-8 border-b-1 pb-2">
     <h1 className='text-xl md:text-4xl font-fancy ml-4 mt-2'>CALCULATE YOUR SAVINGS POTENTIAL</h1>
     <p>Heating this water costs energy, which you have to pay for. With water- saving faucet aerators and flow regulators for the shower, your water consumption and energy bills can be significantly reduced. Our water and energy saving calculator tells you just how great that reduction could be.
How the water and energy saving calculator works 
Simply enter how many people live in your household and the average usage time of the shower, washbasin, and kitchen faucets per person per day. Our calculator then shows you how much water, energy, and money you can save.

Of course, we don’t know the exact details of your contract with your water and energy provider, so our calculations are based on statistical averages.

However, to get even more accurate results, you can use the cogwheel icon to open the expert settings and customize the calculation values. 

You can even enter the actual flow rate of your faucets. This video shows you everything you need to do in order to calculate your savings potential.</p>
     </div>
  */}
      <img src={guide} className='w-full'></img>
      <div className='flex flex-col justify-items-center items-center'>
        <div ref={calculatorRef}>
          <Calculator />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default WaterCalculator;
