import React, { useState, useEffect } from 'react';
import { ordersAPI, productsAPI, usersAPI } from '../services/api';
import ProductEditModal from '../components/ProductEditModal';
import UserEditModal from '../components/UserEditModal';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users'); // Start with users tab to show functionality
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal states
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading admin data...');
      const [ordersRes, productsRes, usersRes] = await Promise.all([
        ordersAPI.getAll(),
        productsAPI.getAll(true), // Get all products including inactive
        usersAPI.getAll()
      ]);
      
      console.log('📊 Data loaded:', {
        orders: ordersRes.data.length,
        products: productsRes.data.length,
        users: usersRes.data.length
      });
      
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
      setUsers(usersRes.data);
      setError('');
    } catch (error) {
      console.error('❌ Error loading data:', error);
      setError('Failed to load data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await ordersAPI.updateStatus(orderId, newStatus);
      const updatedOrders = orders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status');
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        await productsAPI.update(editingProduct._id, productData);
        const updatedProducts = products.map(product =>
          product._id === editingProduct._id ? { ...product, ...productData } : product
        );
        setProducts(updatedProducts);
      } else {
        const response = await productsAPI.create(productData);
        setProducts([...products, response.data]);
      }
      setShowProductModal(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      throw error;
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.delete(productId);
        const updatedProducts = products.map(p => 
          p._id === productId ? { ...p, isActive: false } : p
        );
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('Failed to delete product');
      }
    }
  };

  const handleSaveUser = async (userData) => {
    try {
      await usersAPI.update(editingUser._id, userData);
      const updatedUsers = users.map(user =>
        user._id === editingUser._id ? { ...user, ...userData } : user
      );
      setUsers(updatedUsers);
      setShowUserModal(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await usersAPI.delete(userId);
        const updatedUsers = users.filter(u => u._id !== userId);
        setUsers(updatedUsers);
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTotalRevenue = () => {
    return orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, order) => sum + order.total, 0);
  };

  const getActiveProducts = () => products.filter(p => p.isActive).length;

  if (loading) {
    return <div className="admin-dashboard loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h2>Admin Dashboard <span style={{fontSize: '12px', color: '#666'}}>(v2.0 - Enhanced)</span></h2>

        {error && <div className="error-banner">{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{orders.length}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{getActiveProducts()}</div>
            <div className="stat-label">Active Products</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{users.filter(u => u.role === 'user').length}</div>
            <div className="stat-label">Customers</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">₹{getTotalRevenue()}</div>
            <div className="stat-label">Revenue</div>
          </div>
        </div>

        <div className="admin-tabs">
          <button 
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            Orders Management
          </button>
          <button 
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            Product Management
          </button>
          <button 
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
        </div>

        {activeTab === 'orders' && (
          <div className="admin-content">
            <h3>All Orders</h3>
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(order => (
                    <tr key={order._id}>
                      <td>#{order._id.slice(-6)}</td>
                      <td>
                        <div>{order.userName}</div>
                        <div className="small-text">{order.userPhone}</div>
                      </td>
                      <td>{order.items.length} items</td>
                      <td>₹{order.total}</td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td>
                        <span className={`status-badge ${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="status-select"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="admin-content">
            <div className="content-header">
              <h3>Product Management</h3>
              <button 
                className="add-btn"
                onClick={() => {
                  setEditingProduct(null);
                  setShowProductModal(true);
                }}
              >
                + Add Product
              </button>
            </div>
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} className={!product.isActive ? 'inactive-row' : ''}>
                      <td>
                        <div className="product-image">
                          <img 
                            src={product.imageUrl || 'https://via.placeholder.com/50x50?text=No+Image'} 
                            alt={product.name}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/50x50?text=Error';
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="product-name">{product.name}</div>
                          <div className="small-text">{product.unit}</div>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>₹{product.price}</td>
                      <td>
                        <span className={product.stock < 20 ? 'low-stock' : ''}>
                          {product.stock}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${product.isActive ? 'active' : 'inactive'}`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="edit-btn"
                          onClick={() => {
                            setEditingProduct(product);
                            setShowProductModal(true);
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-content">
            <h3>User Management</h3>
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.gender}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{formatDate(user.createdAt)}</td>
                      <td>
                        <button 
                          className="edit-btn"
                          onClick={() => {
                            setEditingUser(user);
                            setShowUserModal(true);
                          }}
                        >
                          ✏️ Edit
                        </button>
                        {user.role !== 'admin' && (
                          <button 
                            className="delete-btn"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            🗑️ Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modals */}
        {showProductModal && (
          <ProductEditModal
            product={editingProduct}
            onSave={handleSaveProduct}
            onClose={() => {
              setShowProductModal(false);
              setEditingProduct(null);
            }}
          />
        )}

        {showUserModal && (
          <UserEditModal
            user={editingUser}
            onSave={handleSaveUser}
            onClose={() => {
              setShowUserModal(false);
              setEditingUser(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;