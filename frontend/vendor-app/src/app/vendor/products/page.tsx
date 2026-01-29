"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Plus, Search, Filter, MoreHorizontal, Package, Edit2, DollarSign, Box, AlertCircle, Trash2, X, Check, Loader2 } from "lucide-react";
import { vendorApi } from "@/lib/api";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: string;
  is_active: boolean;
  category: string;
  image_url: string;
}

export default function VendorProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [editModal, setEditModal] = useState<{ type: string; product: Product | null }>({ type: "", product: null });
  const [editValue, setEditValue] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchData = async () => {
    try {
      const data = await vendorApi.getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (type: string, product: Product) => {
    setEditModal({ type, product });
    if (type === "stock") setEditValue(String(product.stock));
    else if (type === "price") setEditValue(String(product.price));
    setActiveDropdown(null);
  };

  const handleSave = async () => {
    if (!editModal.product) return;
    setSaving(true);
    
    try {
      // In a real app, call API to update
      // For now, update locally
      const updatedProducts = products.map(p => {
        if (p.id === editModal.product!.id) {
          if (editModal.type === "stock") return { ...p, stock: parseInt(editValue) || 0 };
          if (editModal.type === "price") return { ...p, price: parseFloat(editValue) || 0 };
        }
        return p;
      });
      setProducts(updatedProducts);
      setEditModal({ type: "", product: null });
    } catch (e) {
      console.error("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleAvailability = async (product: Product) => {
    setActiveDropdown(null);
    const updatedProducts = products.map(p => 
      p.id === product.id ? { ...p, is_active: !p.is_active, status: !p.is_active ? "PUBLISHED" : "DRAFT" } : p
    );
    setProducts(updatedProducts);
  };

  const handleMarkOutOfStock = async (product: Product) => {
    setActiveDropdown(null);
    const updatedProducts = products.map(p => 
      p.id === product.id ? { ...p, stock: 0 } : p
    );
    setProducts(updatedProducts);
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;
    setActiveDropdown(null);
    
    try {
      await vendorApi.deleteProduct(product.id);
      setProducts(products.filter(p => p.id !== product.id));
    } catch (e) {
      console.error("Failed to delete product");
    }
  };

  const getStatusStyle = (status: string, stock: number) => {
    if (stock === 0) return "bg-red-50 text-red-700 border-red-100";
    if (status === "PUBLISHED") return "bg-green-50 text-green-700 border-green-100";
    return "bg-orange-50 text-orange-700 border-orange-100";
  };

  const getStatusText = (status: string, stock: number) => {
    if (stock === 0) return "Out of Stock";
    if (status === "PUBLISHED") return "Active";
    return "Draft";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">My Products</h1>
          <p className="text-[#A1A1AA]">Manage your inventory and pricing.</p>
        </div>
        <Link href="/vendor/products/add" className="flex items-center gap-2 px-5 py-2.5 bg-[#BEF264] text-black rounded-full text-sm font-bold hover:bg-[#a3d654] transition-all shadow-lg">
          <Plus size={18} strokeWidth={2.5} /> Add New Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-[#18181B] border border-[#27272A] p-2 rounded-2xl">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full bg-transparent border-none outline-none text-white pl-12 pr-4 py-2 placeholder:text-[#71717A]" 
          />
        </div>
        <div className="h-6 w-px bg-[#27272A]" />
        <button className="flex items-center gap-2 px-4 py-2 text-[#A1A1AA] hover:text-white transition-colors text-sm font-medium">
          <Filter size={16} /> Status
        </button>
      </div>

      {/* Product List */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-[2rem] overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-[#71717A]">
            <Loader2 className="animate-spin mx-auto mb-2" size={24} />
            Loading products...
          </div>
        ) : products.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-[#27272A]/50 border-b border-[#27272A]">
              <tr>
                <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Product Name</th>
                <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Category</th>
                <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Price</th>
                <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Stock</th>
                <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Status</th>
                <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]">
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-[#27272A]/30 transition-colors">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#27272A] flex items-center justify-center text-[#BEF264]">
                        <Package size={20} />
                      </div>
                      <div className="font-medium text-white">{product.name}</div>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-[#A1A1AA] text-sm">{product.category}</td>
                  <td className="py-5 px-6 text-white text-sm font-medium">₹{product.price}</td>
                  <td className="py-5 px-6 text-[#A1A1AA] text-sm">{product.stock} units</td>
                  <td className="py-5 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyle(product.status, product.stock)}`}>
                      {getStatusText(product.status, product.stock)}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right relative" ref={activeDropdown === product.id ? dropdownRef : null}>
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === product.id ? null : product.id)}
                      className="p-2 hover:bg-[#27272A] rounded-lg transition-colors text-[#71717A] hover:text-white"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {activeDropdown === product.id && (
                      <div className="absolute right-6 top-12 w-48 bg-[#27272A] border border-[#3f3f46] rounded-xl shadow-xl z-50 overflow-hidden">
                        <button onClick={() => openEditModal("stock", product)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-[#3f3f46] transition-colors text-left">
                          <Box size={16} className="text-[#BEF264]" /> Edit Stock
                        </button>
                        <button onClick={() => openEditModal("price", product)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-[#3f3f46] transition-colors text-left">
                          <DollarSign size={16} className="text-[#BEF264]" /> Edit Price
                        </button>
                        <button onClick={() => handleToggleAvailability(product)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-[#3f3f46] transition-colors text-left">
                          <Edit2 size={16} className="text-blue-400" /> {product.is_active ? "Set Unavailable" : "Set Available"}
                        </button>
                        <button onClick={() => handleMarkOutOfStock(product)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-[#3f3f46] transition-colors text-left">
                          <AlertCircle size={16} className="text-orange-400" /> Mark Out of Stock
                        </button>
                        <div className="border-t border-[#3f3f46]" />
                        <button onClick={() => handleDelete(product)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left">
                          <Trash2 size={16} /> Delete Product
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center">
            <div className="w-16 h-16 bg-[#27272A] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#71717A]">
              <Package size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No Products Yet</h3>
            <p className="text-[#71717A] mb-6">Start adding your organic produce to the marketplace.</p>
            <Link href="/vendor/products/add" className="inline-flex items-center gap-2 px-6 py-3 bg-[#BEF264] text-black rounded-xl font-medium hover:bg-[#a3d654] transition-colors">
              Add First Product
            </Link>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editModal.type && editModal.product && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">
                {editModal.type === "stock" ? "Edit Stock Quantity" : "Edit Price"}
              </h3>
              <button onClick={() => setEditModal({ type: "", product: null })} className="p-2 hover:bg-[#27272A] rounded-lg text-[#71717A] hover:text-white">
                <X size={18} />
              </button>
            </div>
            
            <p className="text-[#A1A1AA] text-sm mb-4">Product: <span className="text-white">{editModal.product.name}</span></p>
            
            <div className="mb-6">
              <label className="block text-sm text-[#71717A] mb-2">
                {editModal.type === "stock" ? "Stock Quantity" : "Price (₹)"}
              </label>
              <input 
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full bg-[#27272A] border border-[#3f3f46] rounded-xl px-4 py-3 text-white outline-none focus:border-[#BEF264] transition-colors"
                placeholder={editModal.type === "stock" ? "Enter quantity" : "Enter price"}
              />
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setEditModal({ type: "", product: null })}
                className="flex-1 px-4 py-3 bg-[#27272A] text-white rounded-xl font-medium hover:bg-[#3f3f46] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex-1 px-4 py-3 bg-[#BEF264] text-black rounded-xl font-bold hover:bg-[#a3d654] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

