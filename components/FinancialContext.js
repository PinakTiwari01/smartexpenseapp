// components/FinancialContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FinancialContext = createContext();

const STORAGE_KEY = '@financial_data';

export const FinancialProvider = ({ children }) => {
  const [incomes, setIncomes]   = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Load from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const { incomes: i, expenses: e } = JSON.parse(json);
          setIncomes(i);
          setExpenses(e);
        }
      } catch (err) {
        console.error('Failed to load data', err);
      }
    })();
  }, []);

  // Save to storage whenever incomes or expenses change
  useEffect(() => {
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ incomes, expenses })
    ).catch(err => console.error('Failed to save data', err));
  }, [incomes, expenses]);

  const addIncome = income => setIncomes(prev => [...prev, income]);
  const editIncome = updated =>
    setIncomes(prev => prev.map(i => (i.id === updated.id ? updated : i)));
  const deleteIncome = id =>
    setIncomes(prev => prev.filter(i => i.id !== id));

  const addExpense = expense => setExpenses(prev => [...prev, expense]);
  const editExpense = updated =>
    setExpenses(prev => prev.map(e => (e.id === updated.id ? updated : e)));
  const deleteExpense = id =>
    setExpenses(prev => prev.filter(e => e.id !== id));

  const totalIncome  = incomes.reduce((s,i) => s + parseFloat(i.amount), 0);
  const totalExpense = expenses.reduce((s,e) => s + parseFloat(e.amount), 0);
  const netWorth     = totalIncome - totalExpense;

  return (
    <FinancialContext.Provider value={{
      incomes, expenses,
      addIncome, editIncome, deleteIncome,
      addExpense, editExpense, deleteExpense,
      totalIncome, totalExpense, netWorth
    }}>
      {children}
    </FinancialContext.Provider>
  );
};
