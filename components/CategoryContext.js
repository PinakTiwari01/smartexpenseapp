import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CategoryContext = createContext();
const STORAGE_KEY = '@categories';

const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Food', icon: '🍔' },
  { id: '2', name: 'Travel', icon: '✈️' },
  { id: '3', name: 'Salary', icon: '💼' },
  { id: '4', name: 'Entertainment', icon: '🎬' },
  { id: '5', name: 'Bills', icon: '🧾' },
];

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  // Load or initialize categories
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          setCategories(JSON.parse(json));
        } else {
          setCategories(DEFAULT_CATEGORIES);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CATEGORIES));
        }
      } catch (e) {
        console.error('Category load error', e);
      }
    })();
  }, []);

  // Persist on change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(categories)).catch(console.error);
  }, [categories]);

  const addCategory = ({ name, icon }) => {
    const newCat = { id: Date.now().toString(), name, icon };
    setCategories(prev => [...prev, newCat]);
  };

  const deleteCategory = id => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return (
    <CategoryContext.Provider value={{
      categories,
      addCategory,
      deleteCategory,
    }}>
      {children}
    </CategoryContext.Provider>
  );
};
