import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { FinancialProvider } from './components/FinancialContext';
import { DebtProvider }      from './components/DebtContext';
import { CreditProvider }    from './components/CreditContext';
import { CategoryProvider }  from './components/CategoryContext';

import Dashboard          from './components/Dashboard';
import IncomeTracker      from './components/IncomeTracker';
import ExpenseTracker     from './components/ExpenseTracker';
import TransactionHistory from './components/TransactionHistory';
import CategoryManagement from './components/CategoryManagement';
import Analytics          from './components/Analytics';
import DebtTracker        from './components/DebtTracker';
import CreditLineTracker  from './components/CreditLineTracker';
import DebtList           from './components/DebtList';
import CreditList         from './components/CreditList';
import Settings           from './components/Settings';

const Stack = createStackNavigator();

export default function App() {
  return (
    <FinancialProvider>
      <DebtProvider>
        <CreditProvider>
          <CategoryProvider>
            <NavigationContainer>
              <SafeAreaView style={styles.container}>
                <Stack.Navigator initialRouteName="Dashboard">
                  <Stack.Screen name="Dashboard"      component={Dashboard} />
                  <Stack.Screen name="Income"         component={IncomeTracker} />
                  <Stack.Screen name="Expense"        component={ExpenseTracker} />
                  <Stack.Screen name="Transactions"   component={TransactionHistory} />
                  <Stack.Screen name="DebtList"       component={DebtList} />
                  <Stack.Screen name="Debts"          component={DebtTracker} />
                  <Stack.Screen name="CreditList"     component={CreditList} />
                  <Stack.Screen name="Credit"         component={CreditLineTracker} />
                  <Stack.Screen name="Categories"     component={CategoryManagement} />
                  <Stack.Screen name="Analytics"      component={Analytics} />
                  <Stack.Screen name="Settings"       component={Settings} />
                </Stack.Navigator>
              </SafeAreaView>
            </NavigationContainer>
          </CategoryProvider>
        </CreditProvider>
      </DebtProvider>
    </FinancialProvider>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#f9f9f9' }
});

