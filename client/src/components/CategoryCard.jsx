import React from 'react';

const CategoryCard = ({ imageSrc, altText, title ,onClick }) => {
  return (
    <div onClick={onClick} className="flex relative shrink-0 flex-col items-center p-0 rounded-lg hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <img src={imageSrc} className="w-full h-full rounded-lg" alt={altText} />
      <div className="mt-2 text-white px-3 py-1.5  absolute bottom-6 left-6 text-[10px] lg:text-[12px] text-center bg-secondary-dark-bg rounded-full font-medium">{title}</div>
    </div>
  );
};

export default CategoryCard;
