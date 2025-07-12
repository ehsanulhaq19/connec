import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';

interface CompletedCall {
  id: string;
  clientName: string;
  assistantName: string;
  date: string;
  time: string;
  duration: number;
  actualDuration: number;
  status: 'completed' | 'no-show' | 'cancelled';
  satisfaction: number;
  notes?: string;
}

const CompletedCalls: React.FC = () => {
  const [completedCalls, setCompletedCalls] = useState<CompletedCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'no-show' | 'cancelled'>('all');

  useEffect(() => {
    setTimeout(() => {
      setCompletedCalls([
        {
          id: '1',
          clientName: 'John Doe',
          assistantName: 'Alex',
          date: '2024-01-20',
          time: '14:00',
          duration: 30,
          actualDuration: 28,
          status: 'completed',
          satisfaction: 5,
          notes: 'Great discussion about business strategy.',
        },
        {
          id: '2',
          clientName: 'Jane Smith',
          assistantName: 'Sarah',
          date: '2024-01-19',
          time: '10:00',
          duration: 45,
          actualDuration: 42,
          status: 'completed',
          satisfaction: 4,
          notes: 'Product demo went well.',
        },
        {
          id: '3',
          clientName: 'Bob Johnson',
          assistantName: 'Alex',
          date: '2024-01-18',
          time: '16:00',
          duration: 30,
          actualDuration: 0,
          status: 'no-show',
          satisfaction: 0,
          notes: 'Client did not show up.',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'no-show':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'cancelled':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
      >
        ★
      </span>
    ));
  };

  const filteredCalls = completedCalls.filter(call => 
    statusFilter === 'all' || call.status === statusFilter
  );

  const stats = {
    total: completedCalls.length,
    completed: completedCalls.filter(c => c.status === 'completed').length,
    noShow: completedCalls.filter(c => c.status === 'no-show').length,
    avgSatisfaction: completedCalls.filter(c => c.satisfaction > 0).length > 0
      ? (completedCalls.filter(c => c.satisfaction > 0).reduce((sum, c) => sum + c.satisfaction, 0) / 
         completedCalls.filter(c => c.satisfaction > 0).length).toFixed(1)
      : '0.0',
  };

  return (
    <div className="min-h-screen bg-background dark:bg-darkbg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Completed Calls
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Review your call history and analytics
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Calls</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.noShow}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">No Shows</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.avgSatisfaction}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
          </div>
        </div>

        {/* Filter */}
        <div className="card mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="input-field"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="no-show">No Show</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Calls List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="card animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCalls.map(call => (
              <div key={call.id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {call.clientName} with {call.assistantName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDateTime(call.date, call.time)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(call.status)}`}>
                      {call.status}
                    </span>
                    {call.satisfaction > 0 && (
                      <div className="flex items-center space-x-1">
                        {renderStars(call.satisfaction)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Scheduled:</span> {call.duration} min
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Actual:</span> {call.actualDuration} min
                  </div>
                  {call.satisfaction > 0 && (
                    <div className="text-sm">
                      <span className="font-medium">Rating:</span> {call.satisfaction}/5
                    </div>
                  )}
                </div>
                
                {call.notes && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">📝</span> {call.notes}
                    </p>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="ghost">
                    🎵 Recording
                  </Button>
                  <Button size="sm" variant="ghost">
                    📄 Transcript
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && filteredCalls.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No completed calls found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Complete your first call to see it here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedCalls; 