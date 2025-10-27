
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
  starClassName?: string;
  containerClassName?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  onRatingChange, 
  readOnly = false, 
  starClassName = "w-5 h-5",
  containerClassName = "flex items-center"
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleStarClick = (index: number) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(index);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  return (
    <div className={containerClassName}>
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        return (
          <Star
            key={i}
            className={`
              ${starClassName}
              ${starValue <= (hoverRating || rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              ${!readOnly ? 'cursor-pointer' : ''}
            `}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
