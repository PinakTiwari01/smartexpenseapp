import React, { useContext } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Alert, StyleSheet
} from 'react-native';
import { CreditContext } from './CreditContext';

export default function CreditList({ navigation }) {
  const { lines, deleteLine } = useContext(CreditContext);

  const confirmDelete = item => {
    Alert.alert(
      'Delete Credit Line?',
      `Remove "${item.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive',
          onPress: () => deleteLine(item.id)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lines}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.type}</Text>
              <Text>Limit: ₹{item.limit}</Text>
              <Text>Used: ₹{item.used}</Text>
              <Text>Avail: ₹{(item.limit - item.used).toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => navigation.navigate('Credit', { item })}>
                <Text style={styles.edit}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmDelete(item)}>
                <Text style={styles.delete}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No credit lines</Text>}
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
