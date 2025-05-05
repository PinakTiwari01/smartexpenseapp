import React, { useContext } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { FinancialContext } from './FinancialContext';
import { CategoryContext } from './CategoryContext';

export default function Analytics() {
  const { incomes, expenses } = useContext(FinancialContext);
  const { categories } = useContext(CategoryContext);

  // --- Prepare Line Chart Data (Last 6 months) ---
  const months = [];
  const incMap = {};
  const expMap = {};
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleString('default', { month: 'short', year: '2-digit' });
    months.push(key);
    incMap[key] = 0;
    expMap[key] = 0;
  }
  incomes.forEach(i => {
    const key = new Date(i.date).toLocaleString('default', { month: 'short', year: '2-digit' });
    if (incMap[key] !== undefined) incMap[key] += parseFloat(i.amount);
  });
  expenses.forEach(e => {
    const key = new Date(e.date).toLocaleString('default', { month: 'short', year: '2-digit' });
    if (expMap[key] !== undefined) expMap[key] += parseFloat(e.amount);
  });
  const incomeData = months.map(m => incMap[m]);
  const expenseData = months.map(m => expMap[m]);

  // --- Prepare Pie Chart Data (Expenses by Category) ---
  const categoryTotals = {};
  categories.forEach(c => (categoryTotals[c.name] = 0));
  expenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + parseFloat(e.amount);
  });
  const pieData = Object.entries(categoryTotals)
    .filter(([_, v]) => v > 0)
    .map(([name, v], idx) => ({
      name,
      amount: v,
      color: ['#3498db','#2ecc71','#e74c3c','#9b59b6','#f1c40f'][idx % 5],
      legendFontColor: '#333',
      legendFontSize: 14
    }));

  const screenWidth = Dimensions.get('window').width - 32;
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(52,152,219,${opacity})`,
    labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
    strokeWidth: 2,
    propsForDots: { r: '4' },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Cash Flow (Last 6 mo.)</Text>
      <LineChart
        data={{
          labels: months,
          datasets: [
            { data: incomeData, strokeWidth: 2, color: () => '#2ecc71' },
            { data: expenseData, strokeWidth: 2, color: () => '#e74c3c' },
          ],
          legend: ['Income', 'Expenses']
        }}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.header}>Expenses by Category</Text>
      <PieChart
        data={pieData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  chart: { borderRadius: 12 },
});
