// components/Dashboard.js
import React, { useContext } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { FinancialContext } from './FinancialContext';
import { DebtContext }      from './DebtContext';
import { CreditContext }    from './CreditContext';

export default function Dashboard({ navigation }) {
  const { totalIncome, totalExpense } = useContext(FinancialContext);
  const { totalDebts }                = useContext(DebtContext);
  const { availableCredit }           = useContext(CreditContext);

  const netBalance   = totalIncome - totalExpense;
  const debtRatio    = totalIncome > 0 ? (totalDebts / totalIncome) * 100 : 0;
  const savedSurplus = netBalance;

  let ratioLabel = 'Safe', ratioColor = '#2ecc71';
  if (debtRatio >= 50) { ratioLabel = 'High risk'; ratioColor = '#e74c3c'; }
  else if (debtRatio >= 30) { ratioLabel = 'Caution'; ratioColor = '#f1c40f'; }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Smart Insight: Debt-to-Income */}
      <View style={[styles.insight, { backgroundColor: ratioColor }]}>
        <Text style={styles.insightText}>
          Debt‑to‑Income: {debtRatio.toFixed(0)}% – {ratioLabel}
        </Text>
      </View>

      {/* Smart Insight: Surplus Tip */}
      {savedSurplus > 0 && (
        <TouchableOpacity
          style={styles.surplus}
          onPress={() => Alert.alert(
            'Invest Tip',
            `You saved ₹${savedSurplus.toFixed(2)} this month — consider investing!`
          )}
        >
          <Text style={styles.surplusText}>
            You saved ₹{savedSurplus.toFixed(2)} this month — consider investing!
          </Text>
        </TouchableOpacity>
      )}

      {/* Summary Cards */}
      {[
        ['Total Income',    totalIncome],
        ['Total Expenses',  totalExpense],
        ['Total Debts',     totalDebts],
        ['Available Credit',availableCredit],
        ['Net Balance',     netBalance],
      ].map(([label, value]) => (
        <View key={label} style={styles.card}>
          <Text style={styles.title}>{label}</Text>
          <Text
            style={[
              styles.amount,
              label === 'Net Balance' && { color: value >= 0 ? '#2ecc71' : '#e74c3c' }
            ]}
          >
            ₹{value.toFixed(2)}
          </Text>
        </View>
      ))}

      {/* ---- Primary "Add" Actions ---- */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#2ecc71' }]}
        onPress={() => navigation.navigate('Income')}
      >
        <Text style={styles.btnText}>Add Income</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#e74c3c' }]}
        onPress={() => navigation.navigate('Expense')}
      >
        <Text style={styles.btnText}>Add Expense</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#e67e22' }]}
        onPress={() => navigation.navigate('Debts')}
      >
        <Text style={styles.btnText}>Add Debt</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#f39c12' }]}
        onPress={() => navigation.navigate('Credit')}
      >
        <Text style={styles.btnText}>Add Credit Line</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* ---- View Lists ---- */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#3498db' }]}
        onPress={() => navigation.navigate('Transactions')}
      >
        <Text style={styles.btnText}>View Transactions</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#d35400' }]}
        onPress={() => navigation.navigate('DebtList')}
      >
        <Text style={styles.btnText}>View Debts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#f39c12' }]}
        onPress={() => navigation.navigate('CreditList')}
      >
        <Text style={styles.btnText}>View Credit Lines</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* ---- Secondary Actions ---- */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#9b59b6' }]}
        onPress={() => navigation.navigate('Categories')}
      >
        <Text style={styles.btnText}>Manage Categories</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#f1c40f' }]}
        onPress={() => navigation.navigate('Analytics')}
      >
        <Text style={styles.btnText}>View Analytics</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* ---- Settings ---- */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#34495e' }]}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.btnText}>Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'stretch'
  },
  insight: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16
  },
  insightText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center'
  },
  surplus: {
    backgroundColor: '#dff0d8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16
  },
  surplusText: {
    color: '#3c763d',
    fontWeight: '600',
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  amount: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 8
  },
  btn: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16
  }
});


