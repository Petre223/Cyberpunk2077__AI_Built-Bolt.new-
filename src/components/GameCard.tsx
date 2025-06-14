import React from 'react';
import { Star, Heart, ShoppingCart, Monitor, Gamepad2 } from 'lucide-react';

interface Game {
  id: number;
  title: string;
  genre: string;
  platform: string[];
  rating: number;
  price: number;
  image: string;
  description: string;
  releaseDate: string;
  developer: string;
  tags: string[];
}

interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  isInCart: boolean;
  onToggleFavorite: (gameId: number) => void;
  onToggleCart: (gameId: number) => void;
}

const GameCard: React.FC<GameCardProps> = ({
  game,
  isFavorite,
  isInCart,
  onToggleFavorite,
  onToggleCart
}) => {
  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.toLowerCase().includes('pc')) return <Monitor className="h-4 w-4" />;
    return <Gamepad2 className="h-4 w-4" />;
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
      {/* Game Image */}
      <div className="relative overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay with Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={() => onToggleFavorite(game.id)}
              className={`p-2 rounded-full transition-all duration-200 ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onToggleCart(game.id)}
              className={`p-2 rounded-full transition-all duration-200 ${
                isInCart 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-blue-500'
              }`}
            >
              <ShoppingCart className={`h-4 w-4 ${isInCart ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm font-semibold">{game.rating}</span>
          </div>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4">
          <div className={`px-3 py-1 rounded-lg text-sm font-bold ${
            game.price === 0 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {formatPrice(game.price)}
          </div>
        </div>
      </div>

      {/* Game Info */}
      <div className="p-6">
        {/* Title and Genre */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{game.title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-blue-400 text-sm font-semibold">{game.genre}</span>
            <span className="text-gray-400 text-sm">{game.developer}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
          {game.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {game.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {game.tags.length > 2 && (
            <span className="text-gray-400 text-xs py-1">
              +{game.tags.length - 2} more
            </span>
          )}
        </div>

        {/* Platforms */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-xs">Available on:</span>
            <div className="flex space-x-1">
              {game.platform.slice(0, 3).map((platform, index) => (
                <div
                  key={index}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  title={platform}
                >
                  {getPlatformIcon(platform)}
                </div>
              ))}
              {game.platform.length > 3 && (
                <span className="text-gray-400 text-xs">+{game.platform.length - 3}</span>
              )}
            </div>
          </div>
          
          {/* Release Date */}
          <div className="text-gray-400 text-xs">
            {new Date(game.releaseDate).getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;