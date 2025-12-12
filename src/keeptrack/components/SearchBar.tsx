import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../../components/ui/input';
import { Search, X } from 'lucide-react';
import { useKeeptrackStore } from '../store';
import { useTLECatalog } from '../tle/useTLECatalog';

export const SearchBar: React.FC = () => {
  const { query, setQuery, setSelection } = useKeeptrackStore();
  const { allRecords } = useTLECatalog();
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return [];
    
    const q = query.toLowerCase();
    return allRecords
      .filter(record => 
        record.name.toLowerCase().includes(q) ||
        record.id.includes(q)
      )
      .slice(0, 8);
  }, [query, allRecords]);

  const handleSelect = (satellite: typeof allRecords[0]) => {
    setSelection({ id: satellite.id });
    setQuery(satellite.name);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSelection({});
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search satellites..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.length > 1);
          }}
          className="pl-10 pr-10 bg-black/80 border-white/30 text-white placeholder-gray-400"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 right-0 bg-black/95 backdrop-blur-xl rounded-lg border border-white/20 py-2 z-50"
          >
            {suggestions.map((satellite) => (
              <button
                key={satellite.id}
                onClick={() => handleSelect(satellite)}
                className="w-full px-4 py-2 text-left hover:bg-white/10 transition-colors"
              >
                <div className="text-white font-medium">{satellite.name}</div>
                <div className="text-gray-400 text-sm">
                  ID: {satellite.id} • {satellite.group.toUpperCase()}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};