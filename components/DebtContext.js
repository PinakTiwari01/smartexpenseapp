import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DebtContext = createContext();
const STORAGE_KEY = '@debts_store';

export const DebtProvider = ({ children }) => {
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) setDebts(JSON.parse(json));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(debts));
  }, [debts]);

  const addDebt = debt =>
    setDebts(prev => [...prev, { id: Date.now().toString(), ...debt }]);
  const editDebt = updated =>
    setDebts(prev => prev.map(d => (d.id === updated.id ? updated : d)));
  const deleteDebt = id =>
    setDebts(prev => prev.filter(d => d.id !== id));

  const totalDebts = debts.reduce((sum, d) => sum + parseFloat(d.amount), 0);

  return (
    <DebtContext.Provider value={{
      debts,
      addDebt,
      editDebt,
      deleteDebt,
      totalDebts,
    }}>
      {children}
    </DebtContext.Provider>
  );
};
