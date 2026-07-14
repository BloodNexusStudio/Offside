import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Wallet, ShoppingCart, Users, PackageSearch, Activity, RotateCcw, ShoppingBag, ArrowUpRight } from 'lucide-react'

const Dashboard = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    if (!token) return;
    try {
      const [orderRes, productRes] = await Promise.all([
        axios.post(backendUrl + '/api/order/list', {}, { headers: { token } }),
        axios.get(backendUrl + '/api/product/list')
      ]);

      if (orderRes.data.success) {
        setOrders(orderRes.data.orders.reverse())
      } else {
        toast.error(orderRes.data.message)
      }

      if (productRes.data.success) {
        setProducts(productRes.data.products)
      } else {
        toast.error(productRes.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [token])

  if (loading) {
    return <div className="flex items-center justify-center h-[60vh]">Loading Dashboard...</div>
  }

  // --- KPI Calculations ---
  // Total Revenue: Sum of all order amounts (excluding cancelled/returned if we had those, but let's assume all valid)
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  
  // Unique Customers (based on distinct user IDs or emails from orders)
  const uniqueCustomers = new Set(orders.map(o => o.userId)).size;

  // Average Order Value
  const aov = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

  // --- Chart Data: Sales Overview ---
  // Group orders by date (simplified to last 7-14 days or just mapping the available data)
  const salesMap = {};
  orders.forEach(order => {
    const dateStr = new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    salesMap[dateStr] = (salesMap[dateStr] || 0) + order.amount;
  });
  
  const salesData = Object.keys(salesMap).map(date => ({
    name: date,
    Revenue: salesMap[date]
  })).reverse().slice(-14); // Last 14 days of activity

  // --- Chart Data: Order Status ---
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));

  const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444'];

  return (
    <div className="flex flex-col gap-8">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">Total Revenue</p>
            <Wallet className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-900">{currency}{totalRevenue.toLocaleString()}</p>
          <p className="mt-1 text-sm text-green-600 flex items-center"><ArrowUpRight className="h-4 w-4 mr-1"/> 12% from last month</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">Total Orders</p>
            <ShoppingCart className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-900">{totalOrders}</p>
          <p className="mt-1 text-sm text-green-600 flex items-center"><ArrowUpRight className="h-4 w-4 mr-1"/> 8% from last month</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">Total Customers</p>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-900">{uniqueCustomers}</p>
          <p className="mt-1 text-sm text-gray-500 flex items-center">— 0% from last month</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">Total Products</p>
            <PackageSearch className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-900">{totalProducts}</p>
          <p className="mt-1 text-sm text-gray-500 flex items-center">— 0% from last month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Line Chart */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-gray-900">Sales Overview</h2>
            <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-offside-black focus:ring-offside-black">
              <option>Revenue</option>
              <option>Orders</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="Revenue" stroke="#000000" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#6B7280'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: '#6B7280'}} axisLine={false} tickLine={false} tickFormatter={(val) => `${currency}${val}`} />
                <Tooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col">
          <h2 className="text-base font-bold text-gray-900 mb-6">Order Status</h2>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-gray-900">{totalOrders}</span>
              <span className="text-xs text-gray-500">Total</span>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-gray-600">{entry.name}</span>
                </div>
                <span className="font-medium text-gray-900">{entry.value} ({(entry.value/totalOrders*100).toFixed(0)}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Orders */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">Recent Orders</h2>
            <button className="text-sm font-medium text-offside-black hover:underline">View All</button>
          </div>
          <div className="p-0 overflow-x-auto flex-1">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 border-b border-gray-200">Customer</th>
                  <th className="px-6 py-4 border-b border-gray-200">Date</th>
                  <th className="px-6 py-4 border-b border-gray-200">Total</th>
                  <th className="px-6 py-4 border-b border-gray-200">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {orders.slice(0, 5).map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{order.address.firstName} {order.address.lastName}</td>
                    <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium">{currency}{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                      <PackageSearch className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                      <p>No orders found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Store Performance */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-6">Store Performance</h2>
          <div className="grid grid-cols-2 gap-4">
            
            <div className="border border-gray-100 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Conversion Rate</p>
                <Activity className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900">3.2%</p>
              <p className="text-xs text-green-600 mt-1 flex items-center"><ArrowUpRight className="h-3 w-3 mr-1"/> +0.4%</p>
            </div>

            <div className="border border-gray-100 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Avg Order Value</p>
                <ShoppingBag className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{currency}{aov}</p>
              <p className="text-xs text-green-600 mt-1 flex items-center"><ArrowUpRight className="h-3 w-3 mr-1"/> +12%</p>
            </div>

            <div className="border border-gray-100 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Refund Rate</p>
                <RotateCcw className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900">0.0%</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center">— 0%</p>
            </div>

            <div className="border border-gray-100 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cart Abandonment</p>
                <ShoppingCart className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900">24%</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center">— 0%</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Dashboard
