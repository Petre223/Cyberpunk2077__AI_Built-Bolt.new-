import React from 'react';
import { Play, Star, Calendar } from 'lucide-react';

interface Game {
  id: number;
  title: string;
  genre: string;
  rating: number;
  image: string;
  description: string;
  releaseDate: string;
  developer: string;
}

interface HeroProps {
  featuredGame: Game;
}

const Hero: React.FC<HeroProps> = ({ featuredGame }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={featuredGame.image}
          alt={featuredGame.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Game Badge */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {featuredGame.genre}
            </span>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-white font-semibold">{featuredGame.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {featuredGame.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            {featuredGame.description}
          </p>

          {/* Game Info */}
          <div className="flex flex-wrap items-center space-x-6 mb-8 text-gray-300">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(featuredGame.releaseDate)}</span>
            </div>
            <div>
              <span className="font-semibold">Developer:</span> {featuredGame.developer}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105">
              <Play className="h-5 w-5" />
              <span>Play Now</span>
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
              Watch Trailer
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;