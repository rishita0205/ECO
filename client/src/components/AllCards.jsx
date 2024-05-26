// AllCards.jsx
import React from 'react';
import CategoryCard from './CategoryCard';  // Adjust the import path as needed
import { WaterConversation, InnovativeTouches, HygieneAndCare, TechnologySolutions } from "../assets";

const AllCards = ({ ToggleScreen }) => {
  return (
    <div className="mx-5 my-10">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div className="md:items-center p-6 hidden lg:flex md:flex-col">
          <h2 className="text-[40px] font-bold mb-6 text-base-blue">Category for you</h2>
        </div>
        <CategoryCard 
          imageSrc={WaterConversation}
          altText="Water Conversation"
          title="Water Conversation"
          onClick={() => ToggleScreen("Water Conversation")}  // Pass a function reference
        />
        <CategoryCard 
          imageSrc={TechnologySolutions}
          altText="Technology Solutions"
          title="Technology Solutions"
          onClick={() => ToggleScreen("Technology Solutions")}  // Pass a function reference
        />
        <CategoryCard 
          imageSrc={HygieneAndCare}
          altText="Hygiene And Care"
          title="Hygiene And Care"
          onClick={() => ToggleScreen("Hygiene And Care")}  // Pass a function reference
        />
        <CategoryCard 
          imageSrc={InnovativeTouches}
          altText="Innovative Touches"
          title="Innovative Touches"
          onClick={() => ToggleScreen("Innovative Touches")}  // Pass a function reference
        />
      </div>
    </div>
  );
};

export default AllCards;
