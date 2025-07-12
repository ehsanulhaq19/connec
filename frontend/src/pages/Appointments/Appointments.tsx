import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';

interface Appointment {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  assistantId: string;
  assistantName: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  type: 'consultation' | 'demo' | 'follow-up' | 'training';
  notes?: string;
  location?: string;
}

interface AppointmentFormData {
  title: string;
  clientId: string;
  assistantId: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  notes: string;
  location: string;
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

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [statusFilter, setStatusFilter] = useState<'all' | 'scheduled' | 'confirmed' | 'completed' | 'cancelled'>('all');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AppointmentFormData>();

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
      
      setAppointments([
        {
          id: '1',
          title: 'Business Strategy Consultation',
          clientId: '1',
          clientName: 'John Doe',
          assistantId: '1',
          assistantName: 'Alex',
          date: '2024-01-25',
          time: '14:00',
          duration: 60,
          status: 'confirmed',
          type: 'consultation',
          notes: 'Discuss Q1 business strategy and growth plans',
          location: 'Virtual Meeting',
        },
        {
          id: '2',
          title: 'Product Demo Session',
          clientId: '2',
          clientName: 'Jane Smith',
          assistantId: '2',
          assistantName: 'Sarah',
          date: '2024-01-26',
          time: '10:00',
          duration: 45,
          status: 'scheduled',
          type: 'demo',
          notes: 'Showcase new AI features and capabilities',
          location: 'Virtual Meeting',
        },
        {
          id: '3',
          title: 'Follow-up Meeting',
          clientId: '3',
          clientName: 'Bob Johnson',
          assistantId: '1',
          assistantName: 'Alex',
          date: '2024-01-27',
          time: '16:00',
          duration: 30,
          status: 'scheduled',
          type: 'follow-up',
          notes: 'Review previous action items and next steps',
          location: 'Virtual Meeting',
        },
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const onSubmit = (data: AppointmentFormData) => {
    const client = clients.find(c => c.id === data.clientId);
    const assistant = assistants.find(a => a.id === data.assistantId);
    
    if (!client || !assistant) return;

    const newAppointment: Appointment = {
      id: editingAppointment?.id || Date.now().toString(),
      title: data.title,
      clientId: data.clientId,
      clientName: client.name,
      assistantId: data.assistantId,
      assistantName: assistant.name,
      date: data.date,
      time: data.time,
      duration: data.duration,
      status: 'scheduled',
      type: data.type as 'consultation' | 'demo' | 'follow-up' | 'training',
      notes: data.notes,
      location: data.location,
    };

    if (editingAppointment) {
      setAppointments(prev => prev.map(a => a.id === editingAppointment.id ? newAppointment : a));
    } else {
      setAppointments(prev => [...prev, newAppointment]);
    }

    reset();
    setShowForm(false);
    setEditingAppointment(null);
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    reset({
      title: appointment.title,
      clientId: appointment.clientId,
      assistantId: appointment.assistantId,
      date: appointment.date,
      time: appointment.time,
      duration: appointment.duration,
      type: appointment.type,
      notes: appointment.notes || '',
      location: appointment.location || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(prev => prev.filter(a => a.id !== id));
    }
  };

  const updateStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => 
      a.id === id ? { ...a, status } : a
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      case 'demo':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'follow-up':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'training':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200';
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

  const filteredAppointments = appointments.filter(appointment => 
    statusFilter === 'all' || appointment.status === statusFilter
  );

  return (
    <div className="min-h-screen bg-background dark:bg-darkbg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Appointments
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your appointments and meetings
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            New Appointment
          </Button>
        </div>

        {/* Filters and View Toggle */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="input-field"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                Calendar View
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="card mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {editingAppointment ? 'Edit Appointment' : 'New Appointment'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </label>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    className="input-field mt-1"
                    placeholder="Appointment title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type
                  </label>
                  <select
                    {...register('type', { required: 'Type is required' })}
                    className="input-field mt-1"
                  >
                    <option value="">Select type</option>
                    <option value="consultation">Consultation</option>
                    <option value="demo">Demo</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="training">Training</option>
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.type.message}
                    </p>
                  )}
                </div>
              </div>
              
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location
                  </label>
                  <input
                    {...register('location')}
                    className="input-field mt-1"
                    placeholder="Virtual Meeting, Office, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Notes
                  </label>
                  <textarea
                    {...register('notes')}
                    className="input-field mt-1"
                    rows={3}
                    placeholder="Add any notes about this appointment..."
                  />
                </div>
              </div>
              
              {selectedDate && selectedTime && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 px-4 py-3 rounded-lg">
                  <p className="font-medium">Scheduled for:</p>
                  <p>{formatDateTime(selectedDate, selectedTime)}</p>
                </div>
              )}
              
              <div className="flex space-x-4">
                <Button type="submit">
                  {editingAppointment ? 'Update Appointment' : 'Create Appointment'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingAppointment(null);
                    reset();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Appointments List */}
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
            {filteredAppointments.map(appointment => (
              <div key={appointment.id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {appointment.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {appointment.clientName} with {appointment.assistantName}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(appointment.type)}`}>
                      {appointment.type}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium mr-2">📅</span>
                    {formatDateTime(appointment.date, appointment.time)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium mr-2">⏱️</span>
                    {appointment.duration} minutes
                  </div>
                  {appointment.location && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium mr-2">📍</span>
                      {appointment.location}
                    </div>
                  )}
                  {appointment.notes && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">📝</span> {appointment.notes}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(appointment)}
                  >
                    Edit
                  </Button>
                  {appointment.status === 'scheduled' && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => updateStatus(appointment.id, 'confirmed')}
                    >
                      Confirm
                    </Button>
                  )}
                  {appointment.status === 'confirmed' && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => updateStatus(appointment.id, 'completed')}
                    >
                      Complete
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No appointments found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {statusFilter === 'all' 
                ? 'Get started by creating your first appointment'
                : `No appointments with status "${statusFilter}"`
              }
            </p>
            {statusFilter === 'all' && (
              <Button onClick={() => setShowForm(true)}>
                Create Your First Appointment
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments; 