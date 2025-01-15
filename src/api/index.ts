const BASE_URL = '/api/roxiler.com/product_transaction.json';

const fetchData = async () => {
  try {
    const response = await fetch(BASE_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

let cachedData: any[] | null = null;

const getCachedData = async () => {
  if (!cachedData) {
    cachedData = await fetchData();
  }
  return cachedData;
};

export const fetchTransactions = async (month: string, page: number = 1, search: string = '') => {
  try {
    const data = await getCachedData();
    
    const filteredData = data.filter((item: any) => {
      const saleDate = new Date(item.dateOfSale);
      const matchesMonth = MONTHS[saleDate.getMonth()] === month;
      const searchLower = search.toLowerCase();
      const matchesSearch = search
        ? item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.price.toString().includes(search)
        : true;
      return matchesMonth && matchesSearch;
    });

    const perPage = 10;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedData = filteredData.slice(start, end);

    return {
      transactions: paginatedData,
      totalPages: Math.ceil(filteredData.length / perPage)
    };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return { transactions: [], totalPages: 1 };
  }
};

export const fetchStatistics = async (month: string) => {
  try {
    const data = await getCachedData();
    
    const monthData = data.filter((item: any) => {
      const saleDate = new Date(item.dateOfSale);
      return MONTHS[saleDate.getMonth()] === month;
    });

    return {
      totalSaleAmount: monthData.reduce((sum: number, item: any) => sum + item.price, 0),
      totalSoldItems: monthData.filter((item: any) => item.sold).length,
      totalNotSoldItems: monthData.filter((item: any) => !item.sold).length
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return {
      totalSaleAmount: 0,
      totalSoldItems: 0,
      totalNotSoldItems: 0
    };
  }
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];