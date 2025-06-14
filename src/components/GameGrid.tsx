import React from 'react';
import GameCard from './GameCard';

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

interface GameGridProps {
  games: Game[];
  favorites: number[];
  cart: number[];
  onToggleFavorite: (gameId: number) => void;
  onToggleCart: (gameId: number) => void;
}

const GameGrid: React.FC<GameGridProps> = ({
  games,
  favorites,
  cart,
  onToggleFavorite,
  onToggleCart
}) => {
  if (games.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-xl mb-4">No games found</div>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          isFavorite={favorites.includes(game.id)}
          isInCart={cart.includes(game.id)}
          onToggleFavorite={onToggleFavorite}
          onToggleCart={onToggleCart}
        />
      ))}
    </div>
  );
};

export default GameGrid;