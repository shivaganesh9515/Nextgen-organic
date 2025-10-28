'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Package,
  Store
} from 'lucide-react';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import GlassyButton from '../../../components/ui/GlassyButton';
import { Accordion } from '../../../components/ui/Accordion';
import { StatusPill } from '../../../components/ui/StatusPill';

interface Dispute {
  id: string;
  orderId: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  customer: {
    name: string;
    email: string;
  };
  vendor: {
    name: string;
    id: string;
  };
  product?: {
    name: string;
    id: string;
  };
}

interface Message {
  id: string;
  sender: 'customer' | 'vendor' | 'admin';
  content: string;
  timestamp: string;
  attachments?: string[];
}

const mockDisputes: Dispute[] = [
  {
    id: 'DISP-001',
    orderId: 'ORD-78945',
    subject: 'Damaged Product Received',
    description: 'Received broken fruits in the delivery. The packaging was not adequate.',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2025-10-15T10:30:00Z',
    updatedAt: '2025-10-18T14:22:00Z',
    customer: {
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com'
    },
    vendor: {
      name: 'Fresh Mart',
      id: 'v1'
    },
    product: {
      name: 'Apple Pack (1kg)',
      id: 'p123'
    }
  },
  {
    id: 'DISP-002',
    orderId: 'ORD-78946',
    subject: 'Missing Items',
    description: '2 items were missing from my order. Please resolve this issue.',
    status: 'open',
    priority: 'medium',
    createdAt: '2025-10-18T09:15:00Z',
    updatedAt: '2025-10-18T09:15:00Z',
    customer: {
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com'
    },
    vendor: {
      name: 'Dairy Fresh',
      id: 'v3'
    },
    product: {
      name: 'Milk Pack (1L)',
      id: 'p456'
    }
  },
  {
    id: 'DISP-003',
    orderId: 'ORD-78947',
    subject: 'Late Delivery',
    description: 'Order was delivered 2 hours late without any notification.',
    status: 'resolved',
    priority: 'low',
    createdAt: '2025-10-10T11:45:00Z',
    updatedAt: '2025-10-12T16:30:00Z',
    customer: {
      name: 'Amit Patel',
      email: 'amit.patel@email.com'
    },
    vendor: {
      name: 'Baker\'s Delight',
      id: 'v2'
    }
  }
];

const mockMessages: Record<string, Message[]> = {
  'DISP-001': [
    {
      id: 'msg-1',
      sender: 'customer',
      content: 'Hi, I received my order but the apples were completely damaged. Please help.',
      timestamp: '2025-10-15T10:30:00Z'
    },
    {
      id: 'msg-2',
      sender: 'admin',
      content: 'Thank you for reporting this. I\'m looking into your case and will get back to you shortly.',
      timestamp: '2025-10-15T11:15:00Z'
    },
    {
      id: 'msg-3',
      sender: 'vendor',
      content: 'We apologize for the inconvenience. We\'ll send a replacement in the next delivery.',
      timestamp: '2025-10-16T09:30:00Z'
    }
  ],
  'DISP-002': [
    {
      id: 'msg-1',
      sender: 'customer',
      content: 'Hello, I noticed that 2 items were missing from my order. Can you please check?',
      timestamp: '2025-10-18T09:15:00Z'
    }
  ],
  'DISP-003': [
    {
      id: 'msg-1',
      sender: 'customer',
      content: 'My order was delivered very late without any prior notification.',
      timestamp: '2025-10-10T11:45:00Z'
    },
    {
      id: 'msg-2',
      sender: 'admin',
      content: 'We apologize for the inconvenience. We\'ve addressed this with the delivery partner.',
      timestamp: '2025-10-11T10:00:00Z'
    },
    {
      id: 'msg-3',
      sender: 'customer',
      content: 'Thank you for resolving this. I appreciate the follow-up.',
      timestamp: '2025-10-12T16:30:00Z'
    }
  ]
};

export default function DisputeCenterPage() {
  const [disputes] = useState<Dispute[]>(mockDisputes);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const handleSelectDispute = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setMessages(mockMessages[dispute.id] || []);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedDispute) {
      const message: Message = {
        id: `msg-${Date.now()}`,
        sender: 'customer',
        content: newMessage,
        timestamp: new Date().toISOString()
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Update the dispute's updated time
      const updatedDisputes = disputes.map(d => 
        d.id === selectedDispute.id 
          ? { ...d, updatedAt: new Date().toISOString() } 
          : d
      );
      
      // In a real app, we would update the state with updatedDisputes
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'open': return 'danger';
      case 'in-progress': return 'warning';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = dispute.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dispute.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dispute.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || dispute.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || dispute.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader 
        title="Dispute Center"
        subtitle="Manage your disputes and communicate with our support team"
      />
      
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Disputes List */}
        <div className="lg:w-1/3">
          <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Disputes</h2>
              <GlassyButton className="flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                New Dispute
              </GlassyButton>
            </div>
            
            {/* Search and Filters */}
            <div className="mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search disputes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search disputes"
                />
              </div>
              
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                aria-expanded={isFilterOpen ? "true" : "false"}
                aria-label="Toggle filters"
              >
                <Filter className="h-4 w-4 mr-1" />
                Filters
                {isFilterOpen ? 
                  <ChevronUp className="h-4 w-4 ml-1" /> : 
                  <ChevronDown className="h-4 w-4 ml-1" />
                }
              </button>
              
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      aria-label="Filter by status"
                    >
                      <option value="all">All Statuses</option>
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      aria-label="Filter by priority"
                    >
                      <option value="all">All Priorities</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Disputes List */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {filteredDisputes.length > 0 ? (
                filteredDisputes.map((dispute) => (
                  <motion.div
                    key={dispute.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedDispute?.id === dispute.id 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                    onClick={() => handleSelectDispute(dispute)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2 }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSelectDispute(dispute);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900">#{dispute.id}</h3>
                          <StatusPill 
                            status={dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                            variant={getStatusVariant(dispute.status)} 
                            className="ml-2 text-xs"
                          />
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{dispute.subject}</p>
                      </div>
                      <StatusPill 
                        status={dispute.priority.charAt(0).toUpperCase() + dispute.priority.slice(1)}
                        variant={getPriorityVariant(dispute.priority)} 
                        className="text-xs"
                      />
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <span>Order: {dispute.orderId}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(dispute.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No disputes found</h3>
                  <p className="mt-1 text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Dispute Detail */}
        <div className="lg:w-2/3">
          {selectedDispute ? (
            <motion.div
              className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Dispute #{selectedDispute.id}</h2>
                  <div className="flex items-center mt-2">
                    <StatusPill 
                      status={selectedDispute.status.charAt(0).toUpperCase() + selectedDispute.status.slice(1)}
                      variant={getStatusVariant(selectedDispute.status)}
                    />
                    <StatusPill 
                      status={`${selectedDispute.priority.charAt(0).toUpperCase() + selectedDispute.priority.slice(1)} Priority`}
                      variant={getPriorityVariant(selectedDispute.priority)} 
                      className="ml-2"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Order ID: {selectedDispute.orderId}</p>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(selectedDispute.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card p-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <h3 className="font-medium text-gray-900">Customer</h3>
                  </div>
                  <p className="mt-2 text-sm">{selectedDispute.customer.name}</p>
                  <p className="text-xs text-gray-500">{selectedDispute.customer.email}</p>
                </div>
                
                <div className="card p-4">
                  <div className="flex items-center">
                    <Store className="h-5 w-5 text-gray-400 mr-2" />
                    <h3 className="font-medium text-gray-900">Vendor</h3>
                  </div>
                  <p className="mt-2 text-sm">{selectedDispute.vendor.name}</p>
                </div>
                
                {selectedDispute.product && (
                  <div className="card p-4">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-gray-400 mr-2" />
                      <h3 className="font-medium text-gray-900">Product</h3>
                    </div>
                    <p className="mt-2 text-sm">{selectedDispute.product.name}</p>
                  </div>
                )}
              </div>
              
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{selectedDispute.description}</p>
              </div>
              
              {/* Conversation Thread */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Conversation
                </h3>
                
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, x: message.sender === 'customer' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.sender === 'customer'
                            ? 'bg-primary-100 text-gray-900'
                            : message.sender === 'vendor'
                            ? 'bg-green-100 text-gray-900'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="flex items-center mb-1">
                          <span className="text-xs font-medium">
                            {message.sender === 'customer'
                              ? 'You'
                              : message.sender === 'vendor'
                              ? selectedDispute.vendor.name
                              : 'Support Team'}
                          </span>
                          <span className="mx-2 text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Reply Form */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-900 mb-4">Add a Reply</h3>
                <div className="flex">
                  <textarea
                    rows={3}
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    aria-label="Type your message"
                  />
                  <GlassyButton 
                    className="ml-4 self-end h-fit"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    Send
                  </GlassyButton>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white/80 backdrop-blur-lg rounded-xl p-12 shadow-lg border border-white/20 text-center">
              <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Select a Dispute</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Choose a dispute from the list to view details and communicate with our support team.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Floating Help Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <GlassyButton 
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          aria-label="Open help chat"
        >
          <MessageCircle className="h-6 w-6" />
        </GlassyButton>
      </motion.div>
    </div>
  );
}