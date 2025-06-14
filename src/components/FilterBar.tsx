import React from 'react';
import { Filter, X } from 'lucide-react';

interface FilterBarProps {
  genres: string[];
  selectedGenre: string;
  sortBy: string;
  onGenreChange: (genre: string) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  genres,
  selectedGenre,
  sortBy,
  onGenreChange,
  onSortChange,
  onClearFilters
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-8">
      <div className="flex flex-wrap items-center gap-4">
        {/* Filter Icon */}
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="text-white font-semibold">Filters</span>
        </div>

        {/* Genre Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-400 text-sm">Genre:</label>
          <select
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors duration-200"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-400 text-sm">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors duration-200"
          >
            <option value="title">Title</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
            <option value="releaseDate">Release Date</option>
          </select>
        </div>

        {/* Clear Filters */}
        {(selectedGenre !== '' || sortBy !== 'title') && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <X className="h-4 w-4" />
            <span className="text-sm">Clear</span>
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {(selectedGenre !== '' || sortBy !== 'title') && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-400 text-sm">Active filters:</span>
            {selectedGenre && (
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                Genre: {selectedGenre}
              </span>
            )}
            {sortBy !== 'title' && (
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                Sort: {sortBy}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;