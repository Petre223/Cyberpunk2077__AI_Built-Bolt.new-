import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import GameGrid from './components/GameGrid';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';

// Import JSON data
import gamesData from './data/games.json';
import newsData from './data/news.json';

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
  featured: boolean;
  tags: string[];
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [favorites, setFavorites] = useLocalStorage<number[]>('gamehub-favorites', []);
  const [cart, setCart] = useLocalStorage<number[]>('gamehub-cart', []);

  // Get featured game for hero section
  const featuredGame = gamesData.find((game: Game) => game.featured) || gamesData[0];

  // Get unique genres for filter
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(gamesData.map((game: Game) => game.genre))];
    return uniqueGenres.sort();
  }, []);

  // Filter and sort games
  const filteredGames = useMemo(() => {
    let filtered = gamesData.filter((game: Game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesGenre = selectedGenre === '' || game.genre === selectedGenre;
      
      return matchesSearch && matchesGenre;
    });

    // Sort games
    filtered.sort((a: Game, b: Game) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.price - b.price;
        case 'releaseDate':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [searchQuery, selectedGenre, sortBy]);

  // Handle favorites
  const handleToggleFavorite = (gameId: number) => {
    setFavorites(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  // Handle cart
  const handleToggleCart = (gameId: number) => {
    setCart(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  // Clear filters
  const handleClearFilters = () => {
    setSelectedGenre('');
    setSortBy('title');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <Header
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        cartCount={cart.length}
        favoritesCount={favorites.length}
      />

      {/* Hero Section */}
      <Hero featuredGame={featuredGame} />

      {/* Games Section */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Game Library</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover your next favorite game from our extensive collection
            </p>
          </div>

          {/* Filter Bar */}
          <FilterBar
            genres={genres}
            selectedGenre={selectedGenre}
            sortBy={sortBy}
            onGenreChange={setSelectedGenre}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
          />

          {/* Results Info */}
          <div className="mb-6">
            <p className="text-gray-400">
              Showing {filteredGames.length} of {gamesData.length} games
              {searchQuery && (
                <span className="text-blue-400"> for "{searchQuery}"</span>
              )}
            </p>
          </div>

          {/* Game Grid */}
          <GameGrid
            games={filteredGames}
            favorites={favorites}
            cart={cart}
            onToggleFavorite={handleToggleFavorite}
            onToggleCart={handleToggleCart}
          />
        </div>
      </section>

      {/* News Section */}
      <NewsSection news={newsData} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;