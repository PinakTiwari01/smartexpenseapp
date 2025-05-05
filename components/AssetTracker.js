import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AssetContext } from './AssetContext';

export default function AssetTracker({ navigation }) {
  const { addAsset } = useContext(AssetContext);
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [provider, setProvider] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (_, selected) => {
    setShowPicker(Platform.OS === 'ios');
    if (selected) setDate(selected);
  };

  const handleSave = () => {
    if (!type || !value) return alert('Enter asset type and value');
    addAsset({
      type,
      value,
      provider,
      purchaseDate: date.toISOString(),
      currentValue: value
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Asset</Text>
      <TextInput
        style={styles.input}
        placeholder="Type (e.g. Gold, Stocks)"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Value (₹)"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />
      <TextInput
        style={styles.input}
        placeholder="Provider (optional)"
        value={provider}
        onChangeText={setProvider}
      />

      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text style={styles.dateText}>📅 {date.toLocaleDateString()}</Text>
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
        <Text style={styles.buttonText}>Save Asset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, backgroundColor:'#fff' },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20 },
  input: {
    backgroundColor:'#f1f1f1', padding:15, marginBottom:15,
    borderRadius:8, fontSize:16
  },
  dateText: { fontSize:16, marginBottom:15 },
  button: {
    backgroundColor:'#9b59b6', padding:15,
    borderRadius:8, alignItems:'center'
  },
  buttonText:{ color:'#fff', fontSize:16 }
});
