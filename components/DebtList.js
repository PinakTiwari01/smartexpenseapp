import React, { useContext } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Alert, StyleSheet
} from 'react-native';
import { DebtContext } from './DebtContext';

export default function DebtList({ navigation }) {
  const { debts, deleteDebt } = useContext(DebtContext);

  const confirmDelete = item => {
    Alert.alert(
      'Delete Debt?',
      `Remove "${item.type}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive',
          onPress: () => deleteDebt(item.id)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={debts}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.name}>{item.type}</Text>
              <Text>{item.provider}</Text>
              <Text>₹{item.amount} @ {item.interest}%</Text>
              <Text>{new Date(item.startDate).toLocaleDateString()}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => navigation.navigate('Debts', { item })}>
                <Text style={styles.edit}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmDelete(item)}>
                <Text style={styles.delete}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No debts</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, backgroundColor:'#fff' },
  item:{
    flexDirection:'row', justifyContent:'space-between',
    padding:15, backgroundColor:'#f5f5f5', borderRadius:8,
    marginBottom:12
  },
  name:{ fontSize:18, fontWeight:'600' },
  actions:{ flexDirection:'row', alignItems:'center' },
  edit:{ fontSize:18, marginRight:12 },
  delete:{ fontSize:18 },
  empty:{ textAlign:'center', color:'#888', marginTop:20 }
});
