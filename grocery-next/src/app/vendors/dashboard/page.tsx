'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { BulkImportExport } from '../../../components/vendors/BulkImportExport';

export default function VendorDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader 
          title="Vendor Dashboard"
          subtitle="Manage your products, orders, and store settings"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Stats Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Total Products', value: '124', change: '+12%' },
              { title: 'Pending Orders', value: '8', change: '-3%' },
              { title: 'This Month Earnings', value: '₹42,560', change: '+18%' },
              { title: 'Store Rating', value: '4.7', change: '+0.2' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="ml-2 text-sm font-medium text-green-600">{stat.change}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Bulk Import/Export Section */}
          <div className="lg:col-span-3">
            <BulkImportExport />
          </div>
        </div>
      </motion.div>
    </div>
  );
}