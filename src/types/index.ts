export interface Transaction {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  sold: boolean;
  dateOfSale: string;
}

export interface Statistics {
  totalSaleAmount: number;
  totalSoldItems: number;
  totalNotSoldItems: number;
}

export interface BarChartData {
  range: string;
  count: number;
}

export interface PieChartData {
  category: string;
  count: number;
}