import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import productService from '../services/productService';
import uploadService from '../services/uploadService';
import { Link } from 'react-router-dom';
import userService from '../services/userService';
import messageService from '../services/messageService';
import FileUpload from '../components/FileUpload';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // Dynamic Stats State
  const [stats, setStats] = useState({
    totalRevenue: 0,
    newOrders: 0,
    customers: 0,
    pendingMessages: 0,
    totalProducts: 0
  });

  // Recent Data
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  // Products State for Management
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    features: [''],
    specifications: {}
  });

  // File Upload State
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch users
      const usersResponse = await userService.getUsers();
      const usersData = usersResponse.data || [];
      setUsers(usersData);
      setRecentUsers(usersData.slice(0, 5)); // Get 5 most recent users

      // Fetch products
      const productsResponse = await productService.getProducts();
      const productsData = productsResponse.data || [];
      setProducts(productsData);
      setRecentProducts(productsData.slice(0, 5)); // Get 5 most recent products

      // Fetch messages
      const messagesResponse = await messageService.getMessages();
      const messagesData = messagesResponse.data || [];
      setMessages(messagesData);

      // Calculate stats
      const customersCount = usersData.filter(u => u.role !== 'admin').length;
      const totalProducts = productsData.length;
      const pendingMessages = messagesData.filter(m => !m.isRead).length;

      setStats({
        totalRevenue: 0, // No order system yet
        newOrders: 0, // No order system yet
        customers: customersCount,
        pendingMessages: pendingMessages,
        totalProducts: totalProducts
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch users (for customers tab)
  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      const response = await userService.getUsers();
      setUsers(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setUsersLoading(false);
    }
  };

  // Function to fetch products (for products tab)
  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      const response = await productService.getProducts();
      setProducts(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setProductsLoading(false);
    }
  };

  // Function to fetch messages
  const fetchMessages = async () => {
    try {
      setMessagesLoading(true);
      const response = await messageService.getMessages();
      setMessages(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch messages');
    } finally {
      setMessagesLoading(false);
    }
  };

  // Fetch data on component mount and when switching to dashboard
  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchDashboardData();
    }
  }, [activeTab]);

  // Call fetchUsers when users tab is active
  useEffect(() => {
    if (activeTab === 'customers') {
      fetchUsers();
    }
  }, [activeTab]);

  // Call fetchProducts when products tab is active
  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    }
  }, [activeTab]);

  // Call fetchMessages when messages tab is active
  useEffect(() => {
    if (activeTab === 'messages') {
      fetchMessages();
    }
  }, [activeTab]);

  // Handle Product Creation
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    // Validate
    if (!newProduct.name || !newProduct.description || !newProduct.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      // Prepare product data
      const productData = {
        name: newProduct.name,
        description: newProduct.description,
        category: newProduct.category,
        subcategory: newProduct.subcategory || '',
        features: newProduct.features.filter(f => f.trim() !== ''),
        images: newProduct.images || [],
        specifications: newProduct.specifications || {}
      };

      const response = await productService.createProduct(productData);
      toast.success('Product created successfully!');

      // Refresh products list and dashboard data
      fetchProducts();
      if (activeTab === 'dashboard') {
        fetchDashboardData();
      }

      // Reset form
      setNewProduct({
        name: '',
        description: '',
        category: '',
        subcategory: '',
        features: [''],
        images: [],
        specifications: {}
      });
    } catch (error) {
      toast.error(error.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  // Handle File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const response = await uploadService.uploadFile(file);
      setUploadedFiles([...uploadedFiles, response.data]);
      toast.success('File uploaded successfully!');
    } catch (error) {
      toast.error(error.message || 'File upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get activity icon
  const getActivityIcon = (type) => {
    switch(type) {
      case 'user': return 'fas fa-user';
      case 'product': return 'fas fa-box';
      case 'order': return 'fas fa-shopping-cart';
      case 'message': return 'fas fa-envelope';
      default: return 'fas fa-info-circle';
    }
  };

  // Generate recent activities from recent users and products
  const getRecentActivities = () => {
    const activities = [];

    // Add recent users
    recentUsers.slice(0, 3).forEach(user => {
      activities.push({
        type: 'user',
        title: `New user registered`,
        description: `${user.name} joined the platform`,
        time: new Date(user.createdAt).toLocaleDateString(),
        icon: 'user'
      });
    });

    // Add recent products
    recentProducts.slice(0, 3).forEach(product => {
      activities.push({
        type: 'product',
        title: `New product added`,
        description: `${product.name} was added to catalog`,
        time: new Date(product.createdAt).toLocaleDateString(),
        icon: 'product'
      });
    });

    // Sort by time (most recent first) and limit to 6
    return activities
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 6);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-secondary-900 font-sans flex">
      {/* Sidebar */}
      <div className="sidebar w-64 bg-white shadow-lg border-r border-secondary-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-secondary-200">
          <div className="flex items-center space-x-3">
            <Link to="/" className="text-xl font-bold text-primary-500 flex items-center">
              <i className="fas fa-cubes mr-2"></i>
              Allure Impex
            </Link>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">Admin</span>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-secondary-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="font-semibold text-secondary-900">{user?.name || 'Admin User'}</p>
              <p className="text-sm text-secondary-500">{user?.role || 'Administrator'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`nav-item flex items-center space-x-3 px-4 py-3 rounded-lg border-l-4 transition-all w-full text-left ${
                activeTab === 'dashboard'
                  ? 'border-primary-500 text-primary-700 bg-primary-50'
                  : 'border-transparent text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50'
              }`}
            >
              <i className="fas fa-chart-line w-5 text-center"></i>
              <span className="font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`nav-item flex items-center space-x-3 px-4 py-3 rounded-lg border-l-4 transition-all w-full text-left ${
                activeTab === 'products'
                  ? 'border-primary-500 text-primary-700 bg-primary-50'
                  : 'border-transparent text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50'
              }`}
            >
              <i className="fas fa-box w-5 text-center"></i>
              <span className="font-medium">Products</span>
              <span className="ml-auto bg-primary-500 text-white text-xs px-2 py-1 rounded-full">{stats.totalProducts}</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`nav-item flex items-center space-x-3 px-4 py-3 rounded-lg border-l-4 transition-all w-full text-left ${
                activeTab === 'orders'
                  ? 'border-primary-500 text-primary-700 bg-primary-50'
                  : 'border-transparent text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50'
              }`}
            >
              <i className="fas fa-shopping-cart w-5 text-center"></i>
              <span className="font-medium">Orders</span>
              <span className="ml-auto bg-primary-500 text-white text-xs px-2 py-1 rounded-full">{stats.newOrders}</span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`nav-item flex items-center space-x-3 px-4 py-3 rounded-lg border-l-4 transition-all w-full text-left ${
                activeTab === 'customers'
                  ? 'border-primary-500 text-primary-700 bg-primary-50'
                  : 'border-transparent text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50'
              }`}
            >
              <i className="fas fa-users w-5 text-center"></i>
              <span className="font-medium">Customers</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`nav-item flex items-center space-x-3 px-4 py-3 rounded-lg border-l-4 transition-all w-full text-left ${
                activeTab === 'messages'
                  ? 'border-primary-500 text-primary-700 bg-primary-50'
                  : 'border-transparent text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50'
              }`}
            >
              <i className="fas fa-envelope w-5 text-center"></i>
              <span className="font-medium">Messages</span>
              {stats.pendingMessages > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">{stats.pendingMessages}</span>
              )}
            </button>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-secondary-200">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-secondary-700 hover:text-primary-500 hover:bg-primary-50 transition-colors"
          >
            <i className="fas fa-globe w-5 text-center"></i>
            <span className="font-medium">View Website</span>
          </Link>

          <button
            onClick={logout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-secondary-700 hover:text-red-500 hover:bg-red-50 transition-colors w-full mt-2"
          >
            <i className="fas fa-sign-out-alt w-5 text-center"></i>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-secondary-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">
                {activeTab === 'dashboard' ? 'Dashboard' :
                 activeTab === 'products' ? 'Product Management' :
                 activeTab === 'orders' ? 'Orders' :
                 activeTab === 'customers' ? 'Customers' :
                 activeTab === 'messages' ? 'Messages' :
                 activeTab === 'analytics' ? 'Analytics' : 'Settings'}
              </h1>
              <p className="text-secondary-500">
                {activeTab === 'dashboard' ? 'Welcome back, Admin! Here\'s what\'s happening today.' :
                 activeTab === 'products' ? 'Manage your product catalog' :
                 activeTab === 'orders' ? 'View and manage customer orders' :
                 activeTab === 'customers' ? 'Customer management and insights' :
                 activeTab === 'messages' ? 'Customer inquiries and messages' :
                 activeTab === 'analytics' ? 'Business analytics and reports' : 'System settings and configuration'}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors">
                <i className="fas fa-bell"></i>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"></i>
              </div>

              {/* Date */}
              <div className="text-sm text-secondary-500">
                <span>{new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-secondary-50">

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="stat-card bg-white rounded-2xl p-6 shadow-md border border-secondary-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-secondary-500">Total Revenue</p>
                      <p className="text-2xl font-bold text-secondary-900">{stats.totalRevenue.toLocaleString()} Pkr</p>
                      <p className="text-sm text-green-500 flex items-center">
                        <i className="fas fa-arrow-up mr-1"></i>
                        <span>0%</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                      <i className="fas fa-dollar-sign text-xl"></i>
                    </div>
                  </div>
                </div>

                <div className="stat-card bg-white rounded-2xl p-6 shadow-md border border-secondary-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-secondary-500">New Orders</p>
                      <p className="text-2xl font-bold text-secondary-900">{stats.newOrders}</p>
                      <p className="text-sm text-blue-500 flex items-center">
                        <i className="fas fa-arrow-up mr-1"></i>
                        <span>0%</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      <i className="fas fa-shopping-cart text-xl"></i>
                    </div>
                  </div>
                </div>

                <div className="stat-card bg-white rounded-2xl p-6 shadow-md border border-secondary-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-secondary-500">Customers</p>
                      <p className="text-2xl font-bold text-secondary-900">{stats.customers}</p>
                      <p className="text-sm text-purple-500 flex items-center">
                        <i className="fas fa-arrow-up mr-1"></i>
                        <span>Active</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                      <i className="fas fa-users text-xl"></i>
                    </div>
                  </div>
                </div>

                <div className="stat-card bg-white rounded-2xl p-6 shadow-md border border-secondary-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-secondary-500">Pending Messages</p>
                      <p className="text-2xl font-bold text-secondary-900">{stats.pendingMessages}</p>
                      <p className="text-sm text-orange-500 flex items-center">
                        <i className="fas fa-clock mr-1"></i>
                        <span>Need attention</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                      <i className="fas fa-envelope text-xl"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts and Tables Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Revenue Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-secondary-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-secondary-900">Revenue Overview</h3>
                    <select className="text-sm border border-secondary-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                    </select>
                  </div>
                  <div className="h-64 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center">
                    <div className="text-center text-secondary-500">
                      <i className="fas fa-chart-line text-4xl mb-4 text-primary-500"></i>
                      <p>Revenue Chart Visualization</p>
                      <p className="text-sm">Interactive chart would appear here</p>
                      <p className="text-xs text-secondary-400 mt-2">No order data available yet</p>
                    </div>
                  </div>
                </div>

                {/* Recent Products */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-secondary-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-secondary-900">Recent Products</h3>
                    <button
                      onClick={() => setActiveTab('products')}
                      className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {loading ? (
                      <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                      </div>
                    ) : recentProducts.length === 0 ? (
                      <div className="text-center py-4 text-secondary-500">
                        <i className="fas fa-box text-2xl mb-2"></i>
                        <p className="text-sm">No products yet</p>
                      </div>
                    ) : (
                      recentProducts.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                          <div>
                            <p className="font-medium text-secondary-900">{product.name}</p>
                            <p className="text-sm text-secondary-500">{product.category}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              product.isFeatured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {product.isFeatured ? 'Featured' : 'Regular'}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-secondary-100">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-6">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setActiveTab('products')}
                      className="flex flex-col items-center justify-center p-4 bg-primary-50 rounded-xl border border-primary-200 text-primary-700 hover:bg-primary-100 transition-colors"
                    >
                      <i className="fas fa-plus-circle text-2xl mb-2"></i>
                      <span className="font-medium text-sm">Add Product</span>
                    </button>

                    <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors">
                      <i className="fas fa-file-invoice text-2xl mb-2"></i>
                      <span className="font-medium text-sm">Create Invoice</span>
                    </button>

                    <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-xl border border-green-200 text-green-700 hover:bg-green-100 transition-colors">
                      <i className="fas fa-chart-bar text-2xl mb-2"></i>
                      <span className="font-medium text-sm">View Reports</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('settings')}
                      className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-100 transition-colors"
                    >
                      <i className="fas fa-cog text-2xl mb-2"></i>
                      <span className="font-medium text-sm">Settings</span>
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-secondary-100">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {loading ? (
                      <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                      </div>
                    ) : getRecentActivities().length === 0 ? (
                      <div className="text-center py-4 text-secondary-500">
                        <i className="fas fa-info-circle text-2xl mb-2"></i>
                        <p className="text-sm">No recent activity</p>
                      </div>
                    ) : (
                      getRecentActivities().map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                            activity.type === 'product' ? 'bg-green-100 text-green-600' :
                            'bg-orange-100 text-orange-600'
                          }`}>
                            <i className={`${getActivityIcon(activity.type)} text-xs`}></i>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-secondary-900">{activity.title}</p>
                            <p className="text-xs text-secondary-500">{activity.description}</p>
                            <p className="text-xs text-secondary-400">{activity.time}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-2xl shadow-md border border-secondary-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-secondary-900">Product Management</h2>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="bg-primary-500 text-white hover:bg-primary-600 px-4 py-2 rounded-lg transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>

              {/* Product List */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Existing Products ({products.length})</h3>
                {productsLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-8 text-secondary-500">
                    <i className="fas fa-box-open text-4xl mb-4"></i>
                    <p>No products found. Add your first product!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product, index) => (
                      <div key={product._id || index} className="border border-secondary-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-secondary-900">{product.name}</h4>
                          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                            {product.category}
                          </span>
                        </div>
                        <p className="text-sm text-secondary-600 mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-secondary-500">
                            {product.features?.length || 0} features
                          </span>
                          <div className="space-x-2">
                            <button className="text-xs text-blue-600 hover:text-blue-800">Edit</button>
                            <button className="text-xs text-red-600 hover:text-red-800">Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add New Product Form */}
              <div className="border-t border-secondary-200 pt-8">
                <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
                <form onSubmit={handleCreateProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="e.g., Corrugated Boxes"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="corrugated">Corrugated Packaging</option>
                        <option value="flexible">Flexible Packaging</option>
                        <option value="paper-core">Paper Core</option>
                        <option value="biomass">Biomass Solutions</option>
                        <option value="plastics">Plastics</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      rows="3"
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Describe the product..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Features (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newProduct.features.join(', ')}
                      onChange={(e) => setNewProduct({...newProduct, features: e.target.value.split(', ')})}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Custom Sizes, Eco-Friendly, Durable"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="featured"
                        className="h-4 w-4 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <label htmlFor="featured" className="ml-2 text-sm text-secondary-700">
                        Mark as Featured Product
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-primary-500 text-white hover:bg-primary-600 px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Adding...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-plus mr-2"></i>
                          Add Product
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>


{/* File Upload Section */}
<div className="border-t border-secondary-200 pt-8 mt-8">
  <h3 className="text-lg font-semibold mb-4">Upload Product Images</h3>
  <FileUpload
    multiple={true}
    maxFiles={10}
    onUploadComplete={(files) => {
      // Add uploaded files to product images
      const imageData = files.map(file => ({
        url: file.url,
        public_id: file.public_id,
        alt: file.originalname
      }));

      setNewProduct(prev => ({
        ...prev,
        images: [...(prev.images || []), ...imageData]
      }));

      toast.success(`${files.length} image(s) uploaded successfully`);
    }}
    label="Drag & drop product images here"
    showPreview={true}
  />

  {/* Show attached images for new product */}
  {newProduct.images && newProduct.images.length > 0 && (
    <div className="mt-6">
      <h4 className="font-medium text-secondary-700 mb-2">
        Attached Images ({newProduct.images.length})
      </h4>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {newProduct.images.map((image, index) => (
          <div key={index} className="relative border border-secondary-200 rounded-lg overflow-hidden group">
            <img
              src={uploadService.getThumbnailUrl(image.url)}
              alt={image.alt}
              className="w-full h-20 object-cover"
            />
            <button
              onClick={() => {
                // Remove image from product
                const newImages = [...newProduct.images];
                newImages.splice(index, 1);
                setNewProduct({...newProduct, images: newImages});
              }}
              className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              title="Remove image"
            >
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
            </div>
          )}

          {/* Other Tabs - Placeholders */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-md border border-secondary-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900">Orders Management</h2>
                  <p className="text-secondary-600">Manage customer orders and transactions</p>
                </div>
                <button className="bg-primary-500 text-white hover:bg-primary-600 px-4 py-2 rounded-lg transition-colors">
                  <i className="fas fa-plus mr-2"></i>
                  New Order
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900">Total Orders</h3>
                  <p className="text-2xl font-bold text-blue-600">0</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900">Completed</h3>
                  <p className="text-2xl font-bold text-green-600">0</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-900">Pending</h3>
                  <p className="text-2xl font-bold text-yellow-600">0</p>
                </div>
              </div>

              <div className="text-center py-12">
                <i className="fas fa-shopping-cart text-6xl text-secondary-300 mb-4"></i>
                <h3 className="text-lg font-semibold text-secondary-600 mb-2">No Orders Yet</h3>
                <p className="text-secondary-500">Order management system will be implemented soon.</p>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
  <div className="bg-white rounded-2xl shadow-md border border-secondary-100 p-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold text-secondary-900">Customer Management</h2>
        <p className="text-secondary-600">Manage user accounts and permissions</p>
      </div>
      <button
        onClick={fetchUsers}
        className="bg-primary-500 text-white hover:bg-primary-600 px-4 py-2 rounded-lg transition-colors flex items-center"
      >
        <i className="fas fa-sync-alt mr-2"></i>
        Refresh
      </button>
    </div>

    {/* Create Admin Button (Development Only) */}
    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-yellow-800">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Admin Creation (Development Only)
          </h3>
          <p className="text-sm text-yellow-600 mt-1">
            Create an admin account for testing. Remove this in production!
          </p>
        </div>
        <button
          onClick={async () => {
            if (window.confirm('Create default admin account?\n\nEmail: admin@allureimpex.com\nPassword: admin123')) {
              try {
                await userService.createAdmin({
                  name: 'Admin User',
                  email: 'admin@allureimpex.com',
                  password: 'admin123'
                });
                toast.success('Admin user created!');
                fetchUsers();
                if (activeTab === 'dashboard') {
                  fetchDashboardData();
                }
              } catch (error) {
                toast.error(error.message);
              }
            }
          }}
          className="bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded-lg text-sm"
        >
          Create Admin
        </button>
      </div>
    </div>

    {/* Users Table */}
    {usersLoading ? (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-secondary-200">
          <thead>
            <tr className="bg-secondary-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-secondary-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-secondary-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="font-medium text-secondary-900">{user.name}</div>
                      <div className="text-sm text-secondary-500">{user.company || 'No company'}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-secondary-900">{user.email}</div>
                  <div className="text-sm text-secondary-500">{user.phone || 'No phone'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role === 'admin' ? 'Administrator' : 'Customer'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {user.role !== 'admin' && (
                      <button
                        onClick={async () => {
                          if (window.confirm(`Make ${user.name} an admin?`)) {
                            try {
                              await userService.updateUser(user._id, { role: 'admin' });
                              toast.success('User promoted to admin');
                              fetchUsers();
                              if (activeTab === 'dashboard') {
                                fetchDashboardData();
                              }
                            } catch (error) {
                              toast.error('Failed to update user role');
                            }
                          }
                        }}
                        className="text-purple-600 hover:text-purple-900"
                        title="Make Admin"
                      >
                        <i className="fas fa-user-shield"></i>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        // View user details
                        toast.info(`Viewing ${user.name}'s profile`);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                      title="View Details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm(`Deactivate ${user.name}?`)) {
                          try {
                            await userService.updateUser(user._id, { isActive: false });
                            toast.success('User deactivated');
                            fetchUsers();
                            if (activeTab === 'dashboard') {
                              fetchDashboardData();
                            }
                          } catch (error) {
                            toast.error('Failed to deactivate user');
                          }
                        }
                      }}
                      className="text-yellow-600 hover:text-yellow-900"
                      title="Deactivate"
                    >
                      <i className="fas fa-ban"></i>
                    </button>
                    {user._id !== user?._id && (
                      <button
                        onClick={async () => {
                          if (window.confirm(`Delete user ${user.name} permanently?`)) {
                            try {
                              await userService.deleteUser(user._id);
                              toast.success('User deleted');
                              fetchUsers();
                              if (activeTab === 'dashboard') {
                                fetchDashboardData();
                              }
                            } catch (error) {
                              toast.error('Failed to delete user');
                            }
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-8 text-secondary-500">
            <i className="fas fa-users text-4xl mb-4"></i>
            <p>No users found</p>
          </div>
        )}
      </div>
    )}

    {/* User Stats */}
    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-secondary-50 rounded-lg p-4">
        <p className="text-sm text-secondary-600">Total Users</p>
        <p className="text-2xl font-bold">{users.length}</p>
      </div>
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-sm text-blue-600">Admins</p>
        <p className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
      </div>
      <div className="bg-green-50 rounded-lg p-4">
        <p className="text-sm text-green-600">Active</p>
        <p className="text-2xl font-bold">{users.filter(u => u.isActive).length}</p>
      </div>
      <div className="bg-purple-50 rounded-lg p-4">
        <p className="text-sm text-purple-600">New (Last 7 days)</p>
        <p className="text-2xl font-bold">
          {users.filter(u => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return new Date(u.createdAt) > weekAgo;
          }).length}
        </p>
      </div>
    </div>
  </div>
)}

          {activeTab === 'messages' && (
            <div className="bg-white rounded-2xl shadow-md border border-secondary-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900">Messages & Inquiries</h2>
                  <p className="text-secondary-600">Manage customer messages and support tickets</p>
                </div>
                <button
                  onClick={fetchMessages}
                  className="bg-primary-500 text-white hover:bg-primary-600 px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <i className="fas fa-sync-alt mr-2"></i>
                  Refresh
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900">Total Messages</h3>
                  <p className="text-2xl font-bold text-blue-600">{messages.length}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900">Unread</h3>
                  <p className="text-2xl font-bold text-red-600">{messages.filter(m => !m.isRead).length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900">Read</h3>
                  <p className="text-2xl font-bold text-green-600">{messages.filter(m => m.isRead).length}</p>
                </div>
              </div>

              {messagesLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <i className="fas fa-envelope text-6xl text-secondary-300 mb-4"></i>
                  <h3 className="text-lg font-semibold text-secondary-600 mb-2">No Messages Yet</h3>
                  <p className="text-secondary-500">Customer inquiries will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message._id} className={`border rounded-lg p-4 ${!message.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-secondary-900">{message.name}</h4>
                          <p className="text-sm text-secondary-600">{message.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!message.isRead && (
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                          )}
                          <span className="text-xs text-secondary-500">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="font-medium text-secondary-800 mb-1">{message.subject}</p>
                      <p className="text-sm text-secondary-600 mb-3 line-clamp-2">{message.message}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-secondary-500">
                          {message.company && <span>Company: {message.company}</span>}
                          {message.phone && <span className="ml-4">Phone: {message.phone}</span>}
                        </div>
                        <div className="flex space-x-2">
                          {!message.isRead && (
                            <button
                              onClick={async () => {
                                try {
                                  await messageService.markAsRead(message._id);
                                  toast.success('Marked as read');
                                  fetchMessages();
                                  if (activeTab === 'dashboard') {
                                    fetchDashboardData();
                                  }
                                } catch (error) {
                                  toast.error('Failed to mark as read');
                                }
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <i className="fas fa-check mr-1"></i>
                              Mark Read
                            </button>
                          )}
                          <button
                            onClick={async () => {
                              if (window.confirm('Delete this message?')) {
                                try {
                                  await messageService.deleteMessage(message._id);
                                  toast.success('Message deleted');
                                  fetchMessages();
                                  if (activeTab === 'dashboard') {
                                    fetchDashboardData();
                                  }
                                } catch (error) {
                                  toast.error('Failed to delete message');
                                }
                              }
                            }}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            <i className="fas fa-trash mr-1"></i>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white rounded-2xl shadow-md border border-secondary-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900">Analytics Dashboard</h2>
                  <p className="text-secondary-600">Business insights and performance metrics</p>
                </div>
                <select className="border border-secondary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Users</p>
                      <p className="text-2xl font-bold">{users.length}</p>
                    </div>
                    <i className="fas fa-users text-3xl text-blue-200"></i>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Total Products</p>
                      <p className="text-2xl font-bold">{products.length}</p>
                    </div>
                    <i className="fas fa-box text-3xl text-green-200"></i>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Total Messages</p>
                      <p className="text-2xl font-bold">{messages.length}</p>
                    </div>
                    <i className="fas fa-envelope text-3xl text-purple-200"></i>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Active Users</p>
                      <p className="text-2xl font-bold">{users.filter(u => u.isActive).length}</p>
                    </div>
                    <i className="fas fa-user-check text-3xl text-orange-200"></i>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-secondary-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">User Growth</h3>
                  <div className="h-48 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <i className="fas fa-chart-line text-4xl text-primary-500 mb-2"></i>
                      <p className="text-secondary-600">Growth Chart</p>
                      <p className="text-sm text-secondary-500">Interactive chart coming soon</p>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">Product Categories</h3>
                  <div className="space-y-3">
                    {['corrugated', 'flexible', 'paper-core', 'biomass', 'plastics', 'other'].map(category => {
                      const count = products.filter(p => p.category === category).length;
                      const percentage = products.length > 0 ? Math.round((count / products.length) * 100) : 0;
                      return (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">{category.replace('-', ' ')}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-secondary-200 rounded-full h-2">
                              <div
                                className="bg-primary-500 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-secondary-600 w-8">{count}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl shadow-md border border-secondary-100 p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-secondary-900 mb-2">System Settings</h2>
                <p className="text-secondary-600">Configure system preferences and settings</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="border border-secondary-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Site Title
                        </label>
                        <input
                          type="text"
                          defaultValue="Allure Impex"
                          className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Admin Email
                        </label>
                        <input
                          type="email"
                          defaultValue="admin@allureimpex.com"
                          className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="maintenance"
                          className="h-4 w-4 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <label htmlFor="maintenance" className="ml-2 text-sm text-secondary-700">
                          Enable maintenance mode
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border border-secondary-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4">Email Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          SMTP Host
                        </label>
                        <input
                          type="text"
                          placeholder="smtp.gmail.com"
                          className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          SMTP Port
                        </label>
                        <input
                          type="number"
                          placeholder="587"
                          className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border border-secondary-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4">System Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-secondary-600">Version:</span>
                        <span className="text-sm font-medium">1.0.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-secondary-600">Node.js:</span>
                        <span className="text-sm font-medium">v16+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-secondary-600">Database:</span>
                        <span className="text-sm font-medium">MongoDB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-secondary-600">Last Backup:</span>
                        <span className="text-sm font-medium">Never</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-secondary-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors text-sm">
                        <i className="fas fa-download mr-2"></i>
                        Export Data
                      </button>
                      <button className="w-full bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg transition-colors text-sm">
                        <i className="fas fa-save mr-2"></i>
                        Backup Database
                      </button>
                      <button className="w-full bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg transition-colors text-sm">
                        <i className="fas fa-trash mr-2"></i>
                        Clear Cache
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button className="bg-secondary-500 text-white hover:bg-secondary-600 px-6 py-2 rounded-lg transition-colors">
                  Reset to Defaults
                </button>
                <button className="bg-primary-500 text-white hover:bg-primary-600 px-6 py-2 rounded-lg transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;