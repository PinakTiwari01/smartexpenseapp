import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AssetContext = createContext();
const STORAGE_KEY = '@assets_store';

export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);

  // Load saved assets
  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) setAssets(JSON.parse(json));
    })();
  }, []);

  // Persist on change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
  }, [assets]);

  const addAsset = (asset) =>
    setAssets(prev => [...prev, { id: Date.now().toString(), ...asset }]);
  const deleteAsset = (id) =>
    setAssets(prev => prev.filter(a => a.id !== id));

  // Sum up using currentValue if provided, else value
  const totalAssets = assets.reduce(
    (sum, a) => sum + parseFloat(a.currentValue || a.value),
    0
  );

  return (
    <AssetContext.Provider value={{
      assets,
      addAsset,
      deleteAsset,
      totalAssets,
    }}>
      {children}
    </AssetContext.Provider>
  );
};
