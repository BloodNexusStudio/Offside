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
    return <div className="flex items-center justify-center h-[60vh] text-white">Loading Dashboard...</div>
  }

  // --- KPI Calculations ---
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const uniqueCustomers = new Set(orders.map(o => o.userId)).size;
  const aov = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

  // --- Chart Data: Sales Overview ---
  const salesMap = {};
  orders.forEach(order => {
    const dateStr = new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    salesMap[dateStr] = (salesMap[dateStr] || 0) + order.amount;
  });
  
  const salesData = Object.keys(salesMap).map(date => ({
    name: date,
    Revenue: salesMap[date]
  })).reverse().slice(-14);

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
    <div className="flex flex-col gap-8 text-white">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-sm hover:border-white/30 transition-all cursor-pointer">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Total Revenue</p>
            <Wallet className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-4 text-3xl font-black">{currency}{totalRevenue.toLocaleString()}</p>
          <p className="mt-1 text-xs text-green-400 flex items-center"><ArrowUpRight className="h-4 w-4 mr-1"/> 12% from last month</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-sm hover:border-white/30 transition-all cursor-pointer">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Total Orders</p>
            <ShoppingCart className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-4 text-3xl font-black">{totalOrders}</p>
          <p className="mt-1 text-xs text-green-400 flex items-center"><ArrowUpRight className="h-4 w-4 mr-1"/> 8% from last month</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-sm hover:border-white/30 transition-all cursor-pointer">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Customers</p>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-4 text-3xl font-black">{uniqueCustomers}</p>
          <p className="mt-1 text-xs text-gray-500 flex items-center">— 0% from last month</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-sm hover:border-white/30 transition-all cursor-pointer">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Products</p>
            <PackageSearch className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-4 text-3xl font-black">{totalProducts}</p>
          <p className="mt-1 text-xs text-gray-500 flex items-center">— 0% from last month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Line Chart */}
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider">Sales Overview</h2>
            <select className="text-xs bg-transparent border border-white/20 rounded-md shadow-sm text-white focus:border-white focus:ring-white outline-none">
              <option className="bg-[#111]">Revenue</option>
              <option className="bg-[#111]">Orders</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="Revenue" stroke="#ffffff" strokeWidth={3} dot={{ r: 4, fill: '#0a0a0a', stroke: '#fff' }} activeDot={{ r: 8, fill: '#fff' }} />
                <CartesianGrid stroke="#333" strokeDasharray="5 5" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#9CA3AF'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: '#9CA3AF'}} axisLine={false} tickLine={false} tickFormatter={(val) => `${currency}${val}`} />
                <Tooltip cursor={{strokeDasharray: '3 3', stroke: '#555'}} contentStyle={{backgroundColor: '#0a0a0a', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)'}} itemStyle={{color: '#fff'}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-sm flex flex-col">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-6">Order Status</h2>
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
                <Tooltip contentStyle={{backgroundColor: '#0a0a0a', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)'}} itemStyle={{color: '#fff'}}/>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black">{totalOrders}</span>
              <span className="text-[10px] tracking-widest text-gray-400 uppercase">Total</span>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-xs font-bold tracking-wider uppercase">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-gray-300">{entry.name}</span>
                </div>
                <span>{entry.value} ({(entry.value/totalOrders*100).toFixed(0)}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Orders & Store Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Orders */}
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider">Recent Orders</h2>
            <button className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider transition-colors">View All</button>
          </div>
          <div className="p-0 overflow-x-auto flex-1">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                <tr>
                  <th className="px-6 py-4 border-b border-white/10">Customer</th>
                  <th className="px-6 py-4 border-b border-white/10">Date</th>
                  <th className="px-6 py-4 border-b border-white/10">Total</th>
                  <th className="px-6 py-4 border-b border-white/10">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {orders.slice(0, 5).map((order, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">{order.address.firstName} {order.address.lastName}</td>
                    <td className="px-6 py-4 text-xs">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-bold">{currency}{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'Delivered' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                      <PackageSearch className="mx-auto h-8 w-8 text-gray-600 mb-3" />
                      <p className="text-xs uppercase tracking-widest font-bold">No orders found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Store Performance */}
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-6">Store Performance</h2>
          <div className="grid grid-cols-2 gap-4">
            
            <div className="border border-white/10 bg-white/5 rounded-lg p-4 hover:border-white/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Conversion</p>
                <Activity className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-black">3.2%</p>
              <p className="text-xs text-green-400 mt-1 flex items-center"><ArrowUpRight className="h-3 w-3 mr-1"/> +0.4%</p>
            </div>

            <div className="border border-white/10 bg-white/5 rounded-lg p-4 hover:border-white/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">AOV</p>
                <ShoppingBag className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-black">{currency}{aov}</p>
              <p className="text-xs text-green-400 mt-1 flex items-center"><ArrowUpRight className="h-3 w-3 mr-1"/> +12%</p>
            </div>

            <div className="border border-white/10 bg-white/5 rounded-lg p-4 hover:border-white/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Refund Rate</p>
                <RotateCcw className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-black">0.0%</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center">— 0%</p>
            </div>

            <div className="border border-white/10 bg-white/5 rounded-lg p-4 hover:border-white/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Abandonment</p>
                <ShoppingCart className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-black">24%</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center">— 0%</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Dashboard
