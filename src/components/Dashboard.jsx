// src/components/Dashboard.js

import React, { useState } from 'react';
import { Bar, Line, ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { IoIosArrowBack } from 'react-icons/io';
import { FiPlus } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import { HiOutlinePencil, HiOutlineBell } from 'react-icons/hi';
import { MdOutlineArrowDropDown } from "react-icons/md";

// --- Mock Data ---
const chartData = [
  { month: 'Jan', income: 3000, momGrowth: -50 },
  { month: 'Feb', income: 4500, momGrowth: 50 },
  { month: 'Mar', income: 6000, momGrowth: 33 },
  { month: 'Apr', income: 2800, momGrowth: -53 },
  { month: 'May', income: 4800, momGrowth: 71 },
  { month: 'Jun', income: 0, momGrowth: -100 },
];
const invoices = [
  { id: 1, clientName: 'Client Name', amount: '1,25,000', dueDate: '2024-06-15', status: 'Update Status' },
  { id: 2, clientName: 'Client Name', amount: '1,25,000', dueDate: '2024-06-15', status: 'Unpaid' },
  { id: 3, clientName: 'Income Trend', amount: '1,25,000', dueDate: '2024-06-15', status: 'Disputed' },
  { id: 4, clientName: 'Income Trend', amount: '1,25,000', dueDate: '2024-06-15', status: 'Paid' },
  { id: 5, clientName: 'Income Trend', amount: '1,25,000', dueDate: '2024-06-15', status: 'Partially Paid' },
  { id: 6, clientName: 'Income Trend', amount: '1,25,000', dueDate: '2024-06-15', status: 'Paid' },
  { id: 7, clientName: 'Income Trend', amount: '1,25,000', dueDate: '2024-06-15', status: 'Overdue' },
  { id: 8, clientName: 'Income Trend', amount: '1,25,000', dueDate: '2024-06-15', status: 'Awaited' },
  { id: 9, clientName: 'Income Trend', amount: '1,25,000', dueDate: '2024-06-15', status: 'Draft' },
  { id: 10, clientName: 'Income Trend', amount: '1,25,000', dueDate: '2024-06-15', status: 'Paid' },
];

// --- Helper Component for Status Badges ---
const InvoiceStatus = ({ status }) => {
  const baseClasses = "px-4 py-2 text-sm font-semibold rounded-full flex items-center justify-center gap-2";
  
  switch (status) {
    case 'Update Status':
      return <button className={`${baseClasses} bg-purple-600 text-white w-full sm:w-auto`}><p>Update Status</p> <MdOutlineArrowDropDown size={20}/></button>;
    case 'Unpaid':
      return <div className={`${baseClasses} bg-gray-200 text-gray-600`}>Unpaid</div>;
    case 'Disputed':
      return <div className={`${baseClasses} bg-red-100 text-red-600`}>Disputed</div>;
    case 'Paid':
      return <div className={`${baseClasses} bg-green-100 text-green-600`}>Paid</div>;
    case 'Partially Paid':
      return <div className={`${baseClasses} bg-yellow-100 text-yellow-600`}>Partially Paid</div>;
    case 'Overdue':
      return <div className={`${baseClasses} bg-red-100 text-red-600`}><p>Overdue</p> <HiOutlineBell/></div>;
    case 'Awaited':
      return <div className={`${baseClasses} bg-yellow-100 text-yellow-600`}><p>Awaited</p> <HiOutlineBell/></div>;
    case 'Draft':
      return <div className={`${baseClasses} bg-gray-200 text-gray-600`}><p>Draft</p> <HiOutlinePencil/></div>;
    default:
      return null;
  }
};

// --- Main Dashboard Component ---
const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState('3Months');

  const formatIncome = (tick) => `$${tick / 1000}k`;
  const formatGrowth = (tick) => `${tick}%`;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
            <IoIosArrowBack size={24} className="text-gray-600 cursor-pointer" />
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <img 
            src="https://i.pravatar.cc/150?img=1"
            alt="User" 
            className="w-10 h-10 rounded-full"
        />
      </header>

      <main className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <button className="bg-purple-100 text-purple-600 w-20 h-20 rounded-full mx-auto flex items-center justify-center">
                <FiPlus size={40} />
            </button>
            <h2 className="text-xl font-bold mt-4">Create New Invoice</h2>
            <p className="text-gray-500 text-sm">Start by creating and sending new invoice</p>
        </div>
        <p className="text-center text-purple-600 font-semibold cursor-pointer">
            Or Upload an existing invoice and set payment reminder
        </p>
        
        <div className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                <span className="font-semibold text-gray-500">Time Period</span>
                <span className="text-xs text-gray-400">dd:mm:yyyy - dd:mm:yyyy</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['1Month', '3Months', '1Year'].map(period => (
                    <button 
                        key={period}
                        onClick={() => setTimePeriod(period)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center justify-center gap-1 ${timePeriod === period ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}
                    >
                        {period}
                        {period === '1Year' && <FaCrown className="text-yellow-500"/>}
                    </button>
                ))}
                <button className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-500">Custom</button>
            </div>
        </div>
        
        {/* RESPONSIVE: Stacks on mobile, side-by-side on medium screens and up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm">
                <p className="text-gray-500">Total Earnings</p>
                <p className="text-3xl font-bold">$1,25,000</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm flex-1">
                    <p className="text-gray-500">Payment Awaited</p>
                    <p className="text-xl font-bold text-purple-600">$25,000</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm flex-1">
                    <p className="text-gray-500">Payment Overdue</p>
                    <p className="text-xl font-bold text-purple-600">$25,000</p>
                </div>
            </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg">Income Trend</h3>
            <p className="text-sm text-gray-500 mb-4">Your monthly income and growth for the last 6 months.</p>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{fill: '#6b7280'}} />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" tickFormatter={formatIncome} tickLine={false} axisLine={false} tick={{fill: '#6b7280'}} />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tickFormatter={formatGrowth} tickLine={false} axisLine={false} tick={{fill: '#6b7280'}} />
                        <Tooltip />
                        <Legend iconType="circle" iconSize={10} verticalAlign="bottom" />
                        <Bar dataKey="income" yAxisId="left" barSize={20} fill="#8833FF" name="income" radius={[10, 10, 0, 0]} />
                        <Line type="monotone" dataKey="momGrowth" yAxisId="right" stroke="#C70039" strokeWidth={2} name="momGrowth" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Your Invoices</h3>
                <MdOutlineArrowDropDown size={24} className="text-gray-600 cursor-pointer"/>
            </div>
            <div className="space-y-3">
              {invoices.map(invoice => (
                // RESPONSIVE: Stacks vertically on mobile, becomes a row on small screens and up
                <div key={invoice.id} className="bg-gray-50 p-3 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div>
                    <p className="font-semibold text-gray-800">{invoice.clientName}</p>
                    <p className="text-sm text-gray-500">${invoice.amount}, Due: {invoice.dueDate}</p>
                  </div>
                  <div className="w-full sm:w-auto">
                    <InvoiceStatus status={invoice.status} />
                  </div>
                </div>
              ))}
            </div>
        </div>
        
      </main>

      <footer className="text-center py-8">
        <p className="text-gray-500 font-bold">Spark<span className="text-purple-600">onomy</span></p>
        <p className="text-xs text-gray-400">sparking the creator economy</p>
      </footer>
    </div>
  );
};

export default Dashboard;