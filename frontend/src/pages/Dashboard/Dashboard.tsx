import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

interface DashboardStats {
  totalAssistants: number;
  totalClients: number;
  upcomingCalls: number;
  completedCalls: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalAssistants: 0,
    totalClients: 0,
    upcomingCalls: 0,
    completedCalls: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalAssistants: 5,
        totalClients: 12,
        upcomingCalls: 3,
        completedCalls: 28,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const StatCard: React.FC<{ title: string; value: number; icon: string; color: string; link?: string }> = ({
    title,
    value,
    icon,
    color,
    link,
  }) => (
    <div className={`card bg-gradient-to-br ${color} text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-2xl font-bold">{loading ? '...' : value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      {link && (
        <Link to={link} className="mt-4 inline-block text-sm opacity-90 hover:opacity-100">
          View all →
        </Link>
      )}
    </div>
  );

  const QuickAction: React.FC<{ title: string; description: string; icon: string; link: string; color: string }> = ({
    title,
    description,
    icon,
    link,
    color,
  }) => (
    <Link
      to={link}
      className={`card hover:shadow-lg transition-shadow duration-200 border-l-4 ${color}`}
    >
      <div className="flex items-center space-x-4">
        <div className={`text-2xl ${color.replace('border-', 'text-')}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-darkbg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here's what's happening with your AI Virtual Assistant system.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Virtual Assistants"
            value={stats.totalAssistants}
            icon="🤖"
            color="from-blue-500 to-blue-600"
            link="/assistants"
          />
          <StatCard
            title="Total Clients"
            value={stats.totalClients}
            icon="👥"
            color="from-green-500 to-green-600"
            link="/clients"
          />
          <StatCard
            title="Upcoming Calls"
            value={stats.upcomingCalls}
            icon="📅"
            color="from-yellow-500 to-yellow-600"
            link="/schedule-calls"
          />
          <StatCard
            title="Completed Calls"
            value={stats.completedCalls}
            icon="✅"
            color="from-purple-500 to-purple-600"
            link="/completed-calls"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickAction
              title="Schedule a Call"
              description="Book a new AI assistant call"
              icon="📞"
              link="/schedule-calls"
              color="border-blue-500"
            />
            <QuickAction
              title="Add Assistant"
              description="Create a new virtual assistant"
              icon="➕"
              link="/assistants"
              color="border-green-500"
            />
            <QuickAction
              title="Add Client"
              description="Register a new client"
              icon="👤"
              link="/clients"
              color="border-purple-500"
            />
            <QuickAction
              title="View Appointments"
              description="Check upcoming meetings"
              icon="📋"
              link="/appointments"
              color="border-yellow-500"
            />
            <QuickAction
              title="Call History"
              description="Review completed calls"
              icon="📊"
              link="/completed-calls"
              color="border-indigo-500"
            />
            <QuickAction
              title="Settings"
              description="Manage your account"
              icon="⚙️"
              link="/settings"
              color="border-gray-500"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-green-500">✅</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Call completed with John Doe
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-blue-500">📅</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New call scheduled for tomorrow
                </p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-purple-500">👤</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New client registered: Jane Smith
                </p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 