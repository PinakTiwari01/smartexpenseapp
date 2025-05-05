import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CreditContext = createContext();
const STORAGE_KEY = '@credit_store';

export const CreditProvider = ({ children }) => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) setLines(JSON.parse(json));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const addLine = line =>
    setLines(prev => [...prev, { id: Date.now().toString(), ...line }]);
  const editLine = updated =>
    setLines(prev => prev.map(l => (l.id === updated.id ? updated : l)));
  const deleteLine = id =>
    setLines(prev => prev.filter(l => l.id !== id));

  const totalLimit = lines.reduce((sum, l) => sum + parseFloat(l.limit), 0);
  const totalUsed  = lines.reduce((sum, l) => sum + parseFloat(l.used), 0);
  const availableCredit = totalLimit - totalUsed;

  return (
    <CreditContext.Provider value={{
      lines,
      addLine,
      editLine,
      deleteLine,
      totalLimit,
      totalUsed,
      availableCredit,
    }}>
      {children}
    </CreditContext.Provider>
  );
};

