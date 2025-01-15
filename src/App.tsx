import React, { useState, useEffect } from 'react';
import {
  fetchTransactions,
  fetchStatistics,
  fetchBarChartData,
  fetchPieChartData,
} from './api';
import TransactionTable from './components/TransactionTable';
import Statistics from './components/Statistics';
import { Transaction, Statistics as StatsType } from './types';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function App() {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statistics, setStatistics] = useState<StatsType>({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setStatsLoading(true);
      
      try {
        const [transactionsData, statsData] = await Promise.all([
          fetchTransactions(selectedMonth, currentPage, searchQuery),
          fetchStatistics(selectedMonth),
        ]);

        setTransactions(transactionsData.transactions);
        setTotalPages(transactionsData.totalPages);
        setStatistics(statsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        setStatsLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, currentPage, searchQuery]);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Transaction Dashboard</h1>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {MONTHS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <Statistics statistics={statistics} loading={statsLoading} />

        <TransactionTable
          transactions={transactions}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onSearch={handleSearch}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;