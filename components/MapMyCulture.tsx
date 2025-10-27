import React from 'react';
import { MapPin } from 'lucide-react';

const MapMyCulture: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold text-lg mb-2">Map My Culture</h3>
      <div className="aspect-video bg-gray-300 rounded-md flex items-center justify-center">
        <div className="text-center text-gray-500">
            <MapPin className="w-12 h-12 mx-auto" />
            <p>Interactive map coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default MapMyCulture;
