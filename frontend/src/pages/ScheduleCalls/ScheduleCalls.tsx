import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';

interface ScheduledCall {
  id: string;
  clientId: string;
  clientName: string;
  assistantId: string;
  assistantName: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

interface CallFormData {
  clientId: string;
  assistantId: string;
  date: string;
  time: string;
  duration: number;
  notes: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
}

interface Assistant {
  id: string;
  name: string;
  voiceType: string;
}

const ScheduleCalls: React.FC = () => {
  const [scheduledCalls, setScheduledCalls] = useState<ScheduledCall[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCall, setEditingCall] = useState<ScheduledCall | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CallFormData>();

  const selectedDate = watch('date');
  const selectedTime = watch('time');

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setClients([
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
      ]);
      
      setAssistants([
        { id: '1', name: 'Alex', voiceType: 'Male' },
        { id: '2', name: 'Sarah', voiceType: 'Female' },
        { id: '3', name: 'Mike', voiceType: 'Male' },
      ]);
      
      setScheduledCalls([
        {
          id: '1',
          clientId: '1',
          clientName: 'John Doe',
          assistantId: '1',
          assistantName: 'Alex',
          date: '2024-01-25',
          time: '14:00',
          duration: 30,
          status: 'scheduled',
          notes: 'Business consultation call',
        },
        {
          id: '2',
          clientId: '2',
          clientName: 'Jane Smith',
          assistantId: '2',
          assistantName: 'Sarah',
          date: '2024-01-26',
          time: '10:00',
          duration: 45,
          status: 'scheduled',
          notes: 'Product demo session',
        },
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const onSubmit = (data: CallFormData) => {
    const client = clients.find(c => c.id === data.clientId);
    const assistant = assistants.find(a => a.id === data.assistantId);
    
    if (!client || !assistant) return;

    const newCall: ScheduledCall = {
      id: editingCall?.id || Date.now().toString(),
      clientId: data.clientId,
      clientName: client.name,
      assistantId: data.assistantId,
      assistantName: assistant.name,
      date: data.date,
      time: data.time,
      duration: data.duration,
      status: 'scheduled',
      notes: data.notes,
    };

    if (editingCall) {
      setScheduledCalls(prev => prev.map(c => c.id === editingCall.id ? newCall : c));
    } else {
      setScheduledCalls(prev => [...prev, newCall]);
    }

    reset();
    setShowForm(false);
    setEditingCall(null);
  };

  const handleEdit = (call: ScheduledCall) => {
    setEditingCall(call);
    reset({
      clientId: call.clientId,
      assistantId: call.assistantId,
      date: call.date,
      time: call.time,
      duration: call.duration,
      notes: call.notes || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this scheduled call?')) {
      setScheduledCalls(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleCancel = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this call?')) {
      setScheduledCalls(prev => prev.map(c => 
        c.id === id ? { ...c, status: 'cancelled' as const } : c
      ));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
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

  return (
    <div className="min-h-screen bg-background dark:bg-darkbg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Schedule Calls
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Schedule and manage AI assistant calls
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            Schedule New Call
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="card mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {editingCall ? 'Edit Scheduled Call' : 'Schedule New Call'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Client
                  </label>
                  <select
                    {...register('clientId', { required: 'Client is required' })}
                    className="input-field mt-1"
                  >
                    <option value="">Select a client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name} ({client.email})
                      </option>
                    ))}
                  </select>
                  {errors.clientId && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.clientId.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Assistant
                  </label>
                  <select
                    {...register('assistantId', { required: 'Assistant is required' })}
                    className="input-field mt-1"
                  >
                    <option value="">Select an assistant</option>
                    {assistants.map(assistant => (
                      <option key={assistant.id} value={assistant.id}>
                        {assistant.name} ({assistant.voiceType})
                      </option>
                    ))}
                  </select>
                  {errors.assistantId && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.assistantId.message}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date
                  </label>
                  <input
                    {...register('date', { required: 'Date is required' })}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field mt-1"
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.date.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Time
                  </label>
                  <input
                    {...register('time', { required: 'Time is required' })}
                    type="time"
                    className="input-field mt-1"
                  />
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.time.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Duration (minutes)
                  </label>
                  <select
                    {...register('duration', { required: 'Duration is required' })}
                    className="input-field mt-1"
                  >
                    <option value="">Select duration</option>
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                  </select>
                  {errors.duration && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.duration.message}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notes (Optional)
                </label>
                <textarea
                  {...register('notes')}
                  className="input-field mt-1"
                  rows={3}
                  placeholder="Add any notes about this call..."
                />
              </div>
              
              {selectedDate && selectedTime && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 px-4 py-3 rounded-lg">
                  <p className="font-medium">Scheduled for:</p>
                  <p>{formatDateTime(selectedDate, selectedTime)}</p>
                </div>
              )}
              
              <div className="flex space-x-4">
                <Button type="submit">
                  {editingCall ? 'Update Call' : 'Schedule Call'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingCall(null);
                    reset();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Scheduled Calls */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="card animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scheduledCalls.map(call => (
              <div key={call.id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {call.clientName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      with {call.assistantName}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(call.status)}`}>
                    {call.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium mr-2">📅</span>
                    {formatDateTime(call.date, call.time)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium mr-2">⏱️</span>
                    {call.duration} minutes
                  </div>
                  {call.notes && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">📝</span> {call.notes}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  {call.status === 'scheduled' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(call)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCancel(call.id)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(call.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && scheduledCalls.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📞</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No scheduled calls
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get started by scheduling your first AI assistant call
            </p>
            <Button onClick={() => setShowForm(true)}>
              Schedule Your First Call
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleCalls; 