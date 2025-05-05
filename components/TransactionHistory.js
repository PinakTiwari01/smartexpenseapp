// components/TransactionHistory.js
import React, { useContext } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, Alert
} from 'react-native';
import { FinancialContext } from './FinancialContext';

export default function TransactionHistory({ navigation }) {
  const {
    incomes, expenses,
    deleteIncome, deleteExpense
  } = useContext(FinancialContext);

  const data = [
    ...incomes.map(i => ({ ...i, type: 'income' })),
    ...expenses.map(e => ({ ...e, type: 'expense' }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const confirmDelete = item => {
    Alert.alert(
      'Delete Entry?',
      `Remove this ${item.type}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive',
          onPress: () =>
            item.type === 'income'
              ? deleteIncome(item.id)
              : deleteExpense(item.id)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[
              styles.item,
              item.type === 'income' ? styles.incomeItem : styles.expenseItem
            ]}>
            <View>
              <Text style={styles.desc}>
                {item.type === 'income' ? item.source : item.category}
              </Text>
              <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.amount}>
                ₹{parseFloat(item.amount).toFixed(2)}
              </Text>
              <TouchableOpacity
                onPress={() => confirmDelete(item)}
                style={styles.delButton}
              >
                <Text style={styles.delText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// (styles omitted for brevity—use previous ones)
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  item: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  incomeItem: { backgroundColor: '#e8f8f5' },
  expenseItem: { backgroundColor: '#fdecea' },
  type: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  desc: { flex: 1, marginLeft: 10, fontSize: 16 },
  amount: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  date: { fontSize: 12, color: '#666' },
});

