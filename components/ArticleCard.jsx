import { useState } from 'react';

const ArticleCard = ({ image, title, date, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-600 text-sm">{date}</p>
        <p className={`text-gray-700 text-base mt-2 ${isExpanded ? '' : 'truncate'}`}>
          {description}
        </p>
        <button 
          className="text-blue-500 hover:text-blue-700 mt-2"
          onClick={toggleReadMore}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
