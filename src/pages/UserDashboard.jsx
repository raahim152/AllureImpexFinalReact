import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user, logout } = useAuth();

  // Mock data for user dashboard
  const userInquiries = [
    { id: 1, subject: 'Corrugated Boxes Quote', date: '2024-01-15', status: 'pending' },
    { id: 2, subject: 'Flexible Packaging Samples', date: '2024-01-10', status: 'completed' },
    { id: 3, subject: 'Custom Packaging Inquiry', date: '2024-01-05', status: 'in-progress' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-secondary-900 font-sans">
      {/* Simple Header for Dashboard */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary-500 flex items-center">
            <i className="fas fa-cubes mr-2"></i>
            Allure Impex Dashboard
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-secondary-600">Welcome, {user?.name}</span>
            <Link 
              to="/" 
              className="text-secondary-600 hover:text-primary-500 transition-colors"
            >
              <i className="fas fa-home"></i> Home
            </Link>
            <button
              onClick={logout}
              className="text-secondary-600 hover:text-red-500 transition-colors"
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-secondary-600">{user?.email}</p>
              {user?.company && (
                <p className="text-secondary-500">
                  <i className="fas fa-building mr-2"></i>
                  {user.company}
                </p>
              )}
              {user?.phone && (
                <p className="text-secondary-500">
                  <i className="fas fa-phone mr-2"></i>
                  {user.phone}
                </p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-primary-50 rounded-lg p-4">
              <p className="text-sm text-primary-700 font-medium">Total Inquiries</p>
              <p className="text-2xl font-bold text-primary-600">12</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-700 font-medium">Active Quotes</p>
              <p className="text-2xl font-bold text-blue-600">3</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-700 font-medium">Completed Orders</p>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Inquiries */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Recent Inquiries</h2>
            <div className="space-y-4">
              {userInquiries.map((inquiry) => (
                <div key={inquiry.id} className="border border-secondary-200 rounded-lg p-4 hover:bg-secondary-50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-secondary-900">{inquiry.subject}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      inquiry.status === 'completed' ? 'bg-green-100 text-green-800' :
                      inquiry.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-sm text-secondary-600 mb-2">
                    Submitted on {inquiry.date}
                  </p>
                  <button className="text-sm text-primary-500 hover:text-primary-600">
                    View Details →
                  </button>
                </div>
              ))}
            </div>
            <Link 
              to="/contact" 
              className="mt-6 block text-center bg-primary-500 text-white hover:bg-primary-600 py-2 rounded-lg transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              Submit New Inquiry
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                to="/products" 
                className="flex flex-col items-center justify-center p-4 bg-primary-50 rounded-xl border border-primary-200 text-primary-700 hover:bg-primary-100 transition-colors"
              >
                <i className="fas fa-box text-2xl mb-2"></i>
                <span className="font-medium text-sm">Browse Products</span>
              </Link>
              
              <Link 
                to="/contact" 
                className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <i className="fas fa-file-invoice text-2xl mb-2"></i>
                <span className="font-medium text-sm">Request Quote</span>
              </Link>
              
              <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-xl border border-green-200 text-green-700 hover:bg-green-100 transition-colors">
                <i className="fas fa-history text-2xl mb-2"></i>
                <span className="font-medium text-sm">Order History</span>
              </button>
              
              <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-100 transition-colors">
                <i className="fas fa-user-cog text-2xl mb-2"></i>
                <span className="font-medium text-sm">Profile Settings</span>
              </button>
            </div>
            
            {/* Recent Activity */}
            <div className="mt-8 pt-6 border-t border-secondary-200">
              <h3 className="font-medium mb-3">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  <span>Quote request submitted - Jan 15</span>
                </div>
                <div className="flex items-center text-sm">
                  <i className="fas fa-envelope text-blue-500 mr-2"></i>
                  <span>Message received from support - Jan 14</span>
                </div>
                <div className="flex items-center text-sm">
                  <i className="fas fa-shopping-cart text-primary-500 mr-2"></i>
                  <span>Order #2847 completed - Jan 10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;