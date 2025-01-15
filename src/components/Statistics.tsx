import React from 'react';
import { DollarSign, Package, PackageX } from 'lucide-react';
import { Statistics as StatsType } from '../types';

interface Props {
  statistics: StatsType;
  loading: boolean;
}

export default function Statistics({ statistics, loading }: Props) {
  const stats = [
    {
      title: 'Total Sales',
      value: `$${statistics.totalSaleAmount.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Sold Items',
      value: statistics.totalSoldItems,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Not Sold',
      value: statistics.totalNotSoldItems,
      icon: PackageX,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 bg-gray-100 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-lg shadow-md p-6 flex items-center"
        >
          <div className={`${stat.bgColor} p-3 rounded-full mr-4`}>
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
          </div>
          <div>
            <p className="text-sm text-gray-600">{stat.title}</p>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}