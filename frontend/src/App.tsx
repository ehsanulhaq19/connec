import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './theme/ThemeContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Assistants from './pages/Assistants';
import Clients from './pages/Clients';
import ScheduleCalls from './pages/ScheduleCalls';
import Appointments from './pages/Appointments';
import CompletedCalls from './pages/CompletedCalls';
import Settings from './pages/Settings';

// Components
import Layout from './components/Layout';
import Loading from './components/Loading';

// Hooks
import { useAuth } from './hooks/useAuth';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading fullScreen text="Loading..." />;
  }

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  return <>{children}</>;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading fullScreen text="Loading..." />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Layout showHeader={false}>
                      <Login />
                    </Layout>
                  </PublicRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <PublicRoute>
                    <Layout showHeader={false}>
                      <Register />
                    </Layout>
                  </PublicRoute>
                } 
              />

              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/assistants" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Assistants />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/clients" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Clients />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/schedule-calls" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ScheduleCalls />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/appointments" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Appointments />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/completed-calls" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CompletedCalls />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Settings />
                    </Layout>
                  </ProtectedRoute>
                } 
              />

              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* 404 Route */}
              <Route 
                path="*" 
                element={
                  <Layout>
                    <div className="min-h-screen bg-background dark:bg-darkbg flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                          Page not found
                        </p>
                        <button 
                          onClick={() => window.history.back()}
                          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                        >
                          Go Back
                        </button>
                      </div>
                    </div>
                  </Layout>
                } 
              />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
