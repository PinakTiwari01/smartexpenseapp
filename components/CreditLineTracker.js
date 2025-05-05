import React, { useState, useContext, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet
} from 'react-native';
import { CreditContext } from './CreditContext';

export default function CreditLineTracker({ navigation, route }) {
  const { addLine, editLine } = useContext(CreditContext);
  const editing = route.params?.item;

  const [type, setType]   = useState(editing?.type || '');
  const [name, setName]   = useState(editing?.name || '');
  const [limit, setLimit] = useState(editing?.limit || '');
  const [used, setUsed]   = useState(editing?.used || '');

  useEffect(() => {
    if (editing) {
      setType(editing.type);
      setName(editing.name);
      setLimit(editing.limit);
      setUsed(editing.used);
    }
  }, [editing]);

  const handleSave = () => {
    if (!type || !name || !limit) return alert('Enter type, name, and limit');
    const payload = {
      id: editing?.id || Date.now().toString(),
      type,
      name,
      limit,
      used: used || '0',
    };
    editing ? editLine(payload) : addLine(payload);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editing ? 'Edit' : 'Add'} Credit Line</Text>
      <TextInput style={styles.input} placeholder="Source Type (NBFC/Card)"
        value={type} onChangeText={setType} />
      <TextInput style={styles.input} placeholder="Name (e.g. HDFC Card)"
        value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Credit Limit (₹)"
        keyboardType="numeric" value={limit} onChangeText={setLimit} />
      <TextInput style={styles.input} placeholder="Used Amount (₹, optional)"
        keyboardType="numeric" value={used} onChangeText={setUsed} />

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
  button:{
    backgroundColor:'#f39c12', padding:15,
    borderRadius:8, alignItems:'center'
  },
  buttonText:{ color:'#fff', fontSize:16 }
});
