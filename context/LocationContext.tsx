import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LocationContextType {
  locationData: { latitude: number; longitude: number; city: string } | null;
  setLocationData: (data: { latitude: number; longitude: number; city: string }) => void;
}

const LocationContext = createContext<LocationContextType | null>(null);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider = ({ children }: LocationProviderProps) => {
  const [locationData, setLocationData] = useState<{ latitude: number; longitude: number; city: string } | null>(null);

  return (
    <LocationContext.Provider value={{ locationData, setLocationData }}>
      {children}
    </LocationContext.Provider>
  );
};
