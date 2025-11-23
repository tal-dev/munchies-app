'use client';

import { Restaurant } from '@/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const isOpen = restaurant.is_open ?? true;
  const deliveryTime = restaurant.delivery_time_minutes 
    ? `${restaurant.delivery_time_minutes} min`
    : '30 min';

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition-all relative overflow-hidden min-h-[200px]">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
            isOpen 
              ? 'bg-white text-emerald-700 border border-gray-200' 
              : 'bg-white text-gray-700 border border-gray-200'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              isOpen ? 'bg-emerald-600' : 'bg-gray-600'
            }`}></span>
            {isOpen ? 'Open' : 'Closed'}
          </span>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white text-gray-700 border border-gray-200">
            {deliveryTime}
          </span>
        </div>
        <div className="w-24 h-24 bg-gradient-to-br from-orange-200 to-orange-300 rounded-3xl flex items-center justify-center text-5xl absolute -right-3 -top-3">
          {getRestaurantEmoji(restaurant.name)}
        </div>
      </div>
      
      <h3 className="text-2xl font-normal text-gray-900 pr-20 mb-2">{restaurant.name}</h3>
      
      {!isOpen && (
        <p className="text-sm text-gray-500 mt-3 bg-gray-50 px-4 py-2 rounded-xl inline-block">
          Opens tomorrow at 12 pm
        </p>
      )}
      
      <button className="absolute bottom-6 right-6 w-12 h-12 bg-emerald-600 hover:bg-emerald-700 rounded-full flex items-center justify-center text-white transition-colors shadow-md">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

function getRestaurantEmoji(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('burger')) return '🍔';
  if (lower.includes('pizza')) return '🍕';
  if (lower.includes('taco') || lower.includes('mexican')) return '🌮';
  if (lower.includes('coffee') || lower.includes('bar')) return '☕';
  if (lower.includes('fries') || lower.includes('fry')) return '🍟';
  if (lower.includes('breakfast')) return '🍳';
  if (lower.includes('sushi')) return '🍣';
  if (lower.includes('neta')) return '🌮';
  return '🍽️';
}
