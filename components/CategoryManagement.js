import React, { useContext, useState } from 'react';
import {
  View, Text, FlatList, TextInput,
  TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { CategoryContext } from './CategoryContext';

export default function CategoryManagement() {
  const { categories, addCategory, deleteCategory } = useContext(CategoryContext);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');

  const handleAdd = () => {
    if (!name.trim() || !icon.trim()) {
      Alert.alert('Error', 'Enter both name and icon (emoji)');
      return;
    }
    addCategory({ name: name.trim(), icon: icon.trim() });
    setName('');
    setIcon('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Categories</Text>

      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.catText}>{item.icon} {item.name}</Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Delete Category?',
                  `Remove "${item.name}"?`,
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', style: 'destructive', onPress: () => deleteCategory(item.id) }
                  ]
                )
              }
            >
              <Text style={styles.del}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No categories.</Text>}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, styles.iconInput]}
          placeholder="Icon (emoji)"
          value={icon}
          onChangeText={setIcon}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addTxt}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8,
    marginBottom: 10
  },
  catText: { fontSize: 18 },
  del: { fontSize: 18 },
  empty: { textAlign: 'center', color: '#888', marginTop: 20 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 20
  },
  input: {
    flex: 1, backgroundColor: '#f1f1f1',
    padding: 12, borderRadius: 8, marginRight: 10, fontSize: 16
  },
  iconInput: { flex: 0.4, textAlign: 'center' },
  addBtn: {
    backgroundColor: '#2ecc71', padding: 12,
    borderRadius: 8, justifyContent: 'center'
  },
  addTxt: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});
