'use client';

import { useState, useEffect } from 'react';
import { Restaurant, Filter } from '@/types';
import RestaurantCard from '@/components/RestaurantCard';
import FilterChip from '@/components/FilterChip';

const DELIVERY_TIMES = [
  { id: '0-10', label: '0-10 min', min: 0, max: 10 },
  { id: '10-30', label: '10-30 min', min: 10, max: 30 },
  { id: '30-60', label: '30-60 min', min: 30, max: 60 },
  { id: '60+', label: '1 hour+', min: 60, max: 999 },
];

const PRICE_RANGES = [
  { id: '1', label: '$', value: 1 },
  { id: '2', label: '$$', value: 2 },
  { id: '3', label: '$$$', value: 3 },
  { id: '4', label: '$$$$', value: 4 },
];

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [restaurantsRes, filtersRes] = await Promise.all([
          fetch('/api/restaurants'),
          fetch('/api/filters')
        ]);

        if (!restaurantsRes.ok || !filtersRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const restaurantsData = await restaurantsRes.json();
        const filtersData = await filtersRes.json();

        setRestaurants(Array.isArray(restaurantsData) ? restaurantsData : restaurantsData.restaurants || []);
        setFilters(Array.isArray(filtersData) ? filtersData : filtersData.filters || []);
      } catch (err) {
        setError('Failed to load restaurants. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (selectedCategory && restaurant.filter_ids) {
      if (!restaurant.filter_ids.includes(selectedCategory)) {
        return false;
      }
    }

    if (selectedDeliveryTime && restaurant.delivery_time_minutes) {
      const timeRange = DELIVERY_TIMES.find(t => t.id === selectedDeliveryTime);
      if (timeRange) {
        const time = restaurant.delivery_time_minutes;
        if (time < timeRange.min || time > timeRange.max) {
          return false;
        }
      }
    }

    if (selectedPriceRange && restaurant.price_range) {
      if (restaurant.price_range.toString() !== selectedPriceRange) {
        return false;
      }
    }

    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white sticky top-0 z-10 border-b border-gray-200">
        <div className="px-6 lg:px-12 pt-6 pb-4 lg:pb-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl lg:text-4xl">☕</span>
            <h1 className="text-3xl lg:text-4xl font-normal tracking-tight">Munchies</h1>
          </div>
        </div>
      </header>

      <div className="lg:flex">
        <aside className="hidden lg:block lg:w-64 border-r border-gray-200 min-h-screen p-6">
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-6">Filter</h3>
            
            <div className="mb-8">
              <h4 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wide">Food Category</h4>
              <div className="flex flex-col items-start gap-2">
                {filters.slice(0, 8).map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedCategory(selectedCategory === filter.id ? '' : filter.id)}
                    className={`inline-block px-5 py-3 rounded-full text-sm transition-all cursor-pointer border ${
                      selectedCategory === filter.id
                        ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                        : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wide">Delivery Time</h4>
              <div className="flex flex-wrap gap-2">
                {DELIVERY_TIMES.map(time => (
                  <button
                    key={time.id}
                    onClick={() => setSelectedDeliveryTime(selectedDeliveryTime === time.id ? '' : time.id)}
                    className={`px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                      selectedDeliveryTime === time.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {time.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wide">Price Range</h4>
              <div className="flex gap-2">
                {PRICE_RANGES.map(price => (
                  <button
                    key={price.id}
                    onClick={() => setSelectedPriceRange(selectedPriceRange === price.id ? '' : price.id)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                      selectedPriceRange === price.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {price.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          {/* Desktop horizontal category scroller */}
          <div className="hidden lg:block px-12 py-6 border-b border-gray-100">
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {filters.slice(0, 8).map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedCategory(selectedCategory === filter.id ? '' : filter.id)}
                  className={`flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border transition-all whitespace-nowrap flex-shrink-0 cursor-pointer ${
                    selectedCategory === filter.id
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <span className="text-4xl">{getEmojiForFilter(filter.name)}</span>
                  <span className={`text-sm font-normal ${
                    selectedCategory === filter.id ? 'text-emerald-900' : 'text-gray-900'
                  }`}>{filter.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile filters */}
          <div className="lg:hidden px-6 py-4">
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide font-medium">Delivery Time</p>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {DELIVERY_TIMES.map(time => (
                  <FilterChip
                    key={time.id}
                    label={time.label}
                    selected={selectedDeliveryTime === time.id}
                    onClick={() => setSelectedDeliveryTime(selectedDeliveryTime === time.id ? '' : time.id)}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {filters.slice(0, 6).map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedCategory(selectedCategory === filter.id ? '' : filter.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === filter.id
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className={`text-base font-normal ${
                    selectedCategory === filter.id ? 'text-emerald-900' : 'text-gray-900'
                  }`}>{filter.name}</span>
                  <span className="text-3xl">{getEmojiForFilter(filter.name)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 lg:px-12 py-6 lg:py-8">
            <h2 className="text-2xl lg:text-3xl font-normal mb-6 lg:mb-8">Restaurant's</h2>
            
            {filteredRestaurants.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No restaurants found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {filteredRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function getEmojiForFilter(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('burger') || lower.includes('hamburger')) return '🍔';
  if (lower.includes('pizza')) return '🍕';
  if (lower.includes('taco') || lower.includes('mexican')) return '🌮';
  if (lower.includes('coffee')) return '☕';
  if (lower.includes('fries') || lower.includes('fry')) return '🍟';
  if (lower.includes('breakfast')) return '🍳';
  if (lower.includes('sushi')) return '🍣';
  if (lower.includes('dessert') || lower.includes('ice cream')) return '🍨';
  return '🍽️';
}
