import React, { useState, useEffect } from 'react';
import {
  View, Text, Switch, TouchableOpacity,
  StyleSheet, Alert, Linking, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const STORAGE_KEY = '@settings';

export default function Settings() {
  const [darkMode, setDarkMode]   = useState(false);
  const [currency, setCurrency]   = useState('INR');

  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        const s = JSON.parse(json);
        setDarkMode(s.darkMode);
        setCurrency(s.currency);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ darkMode, currency }));
  }, [darkMode, currency]);

  const resetAll = () => {
    Alert.alert(
      'Reset All Data',
      'This will clear all stored data. Continue?',
      [
        { text:'Cancel', style:'cancel' },
        { text:'Reset', style:'destructive', onPress: async () => {
            await AsyncStorage.clear();
            Alert.alert('Done', 'All data cleared. Restart the app.');
          }
        }
      ]
    );
  };

  const openEmail = () => {
    Linking.openURL('mailto:pinakofficial44@gmail.com');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, darkMode && styles.dark]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>Settings</Text>

      <View style={styles.row}>
        <Text style={[styles.label, darkMode && styles.darkText]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <Text style={[styles.label, darkMode && styles.darkText]}>Currency</Text>
      <Picker
        selectedValue={currency}
        onValueChange={setCurrency}
        style={[styles.picker, darkMode && styles.darkPicker]}
      >
        <Picker.Item label="₹ Indian Rupee" value="INR" />
        <Picker.Item label="$ US Dollar" value="USD" />
        <Picker.Item label="€ Euro"        value="EUR" />
      </Picker>

      <TouchableOpacity style={styles.resetBtn} onPress={resetAll}>
        <Text style={styles.resetText}>Reset All Data</Text>
      </TouchableOpacity>

      {/* Version */}
      <View style={styles.about}>
        <Text style={[styles.label, darkMode && styles.darkText]}>
          Version: 1.0.0
        </Text>
      </View>

      {/* About Me Section */}
      <View style={styles.aboutMe}>
        <Text style={[styles.subTitle, darkMode && styles.darkText]}>About Me</Text>
        <Text style={[styles.aboutText, darkMode && styles.darkText]}>
          Hi, I’m <Text style={styles.bold}>Pinak Tiwari</Text>. I’m a Data Analyst, AI/ML enthusiast and Web/App Developer. Focused on solving real-world challenges with data and intelligent algorithms. Let’s connect and explore how we can collaborate!
        </Text>
        <TouchableOpacity onPress={openEmail}>
          <Text style={styles.email}>✉️ pinakofficial44@gmail.com</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{ flexGrow:1, padding:20, backgroundColor:'#fff' },
  dark:{ backgroundColor:'#333' },
  title:{ fontSize:24, fontWeight:'bold', marginBottom:20, color:'#333' },
  darkText:{ color:'#fff' },
  row:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20 },
  label:{ fontSize:18, color:'#333' },
  picker:{ marginBottom:20 },
  darkPicker:{ backgroundColor:'#555', color:'#fff' },
  resetBtn:{ backgroundColor:'#e74c3c', padding:15, borderRadius:8, alignItems:'center', marginBottom:20 },
  resetText:{ color:'#fff', fontSize:16 },
  about:{ marginBottom:30, alignItems:'center' },
  aboutMe:{ marginTop:10, padding:15, backgroundColor:'#f5f5f5', borderRadius:8 },
  subTitle:{ fontSize:20, fontWeight:'600', marginBottom:10, color:'#333' },
  aboutText:{ fontSize:16, lineHeight:22, color:'#555' },
  bold:{ fontWeight:'bold', color:'#333' },
  email:{ marginTop:10, fontSize:16, color:'#3498db', fontWeight:'600' }
});

