// components/IncomeTracker.js (similarly for ExpenseTracker.js)
import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FinancialContext } from './FinancialContext';

export default function IncomeTracker({ navigation, route }) {
  const { addIncome, editIncome } = useContext(FinancialContext);
  const editing = route.params?.item;
  const [amount, setAmount] = useState(editing?.amount || '');
  const [source, setSource] = useState(editing?.source || '');
  const [date, setDate] = useState(editing ? new Date(editing.date) : new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (_, selected) => {
    setShowPicker(Platform.OS === 'ios');
    if (selected) setDate(selected);
  };

  const handleSave = () => {
    const payload = {
      id: editing?.id || Date.now().toString(),
      amount, source, date: date.toISOString()
    };
    editing ? editIncome(payload) : addIncome(payload);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editing ? 'Edit' : 'Add'} Income</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Source"
        value={source}
        onChangeText={setSource}
      />
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text style={styles.dateText}>
          📅 {date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

// (styles same as before)


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16 },
});
