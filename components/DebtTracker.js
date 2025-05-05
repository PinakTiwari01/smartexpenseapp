import React, { useState, useContext, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DebtContext } from './DebtContext';

export default function DebtTracker({ navigation, route }) {
  const { addDebt, editDebt } = useContext(DebtContext);
  const editing = route.params?.item;

  const [type, setType]         = useState(editing?.type || '');
  const [provider, setProvider] = useState(editing?.provider || '');
  const [amount, setAmount]     = useState(editing?.amount || '');
  const [interest, setInterest] = useState(editing?.interest || '');
  const [date, setDate]         = useState(editing ? new Date(editing.startDate) : new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (editing) setDate(new Date(editing.startDate));
  }, [editing]);

  const onChange = (_, selected) => {
    setShowPicker(Platform.OS === 'ios');
    if (selected) setDate(selected);
  };

  const handleSave = () => {
    if (!type || !amount) return alert('Enter loan type and amount');
    const payload = {
      id: editing?.id || Date.now().toString(),
      type,
      provider,
      amount,
      interest,
      startDate: date.toISOString(),
    };
    editing ? editDebt(payload) : addDebt(payload);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editing ? 'Edit' : 'Add'} Debt / Loan</Text>
      <TextInput style={styles.input} placeholder="Type (e.g. Home Loan)"
        value={type} onChangeText={setType} />
      <TextInput style={styles.input} placeholder="Provider (Bank / NBFC)"
        value={provider} onChangeText={setProvider} />
      <TextInput style={styles.input} placeholder="Outstanding Amount (₹)"
        keyboardType="numeric" value={amount} onChangeText={setAmount} />
      <TextInput style={styles.input} placeholder="Interest Rate (%)"
        keyboardType="numeric" value={interest} onChangeText={setInterest} />

      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text style={styles.dateText}>📅 {date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={onChange} />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, backgroundColor:'#fff' },
  title:{ fontSize:24, fontWeight:'bold', marginBottom:20 },
  input:{
    backgroundColor:'#f1f1f1', padding:15,
    marginBottom:15, borderRadius:8, fontSize:16
  },
  dateText:{ fontSize:16, marginBottom:15 },
  button:{
    backgroundColor:'#e67e22', padding:15,
    borderRadius:8, alignItems:'center'
  },
  buttonText:{ color:'#fff', fontSize:16 }
});
