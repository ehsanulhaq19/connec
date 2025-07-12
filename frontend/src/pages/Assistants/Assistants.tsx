import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';

interface Assistant {
  id: string;
  name: string;
  description: string;
  voiceType: string;
  language: string;
  isActive: boolean;
  specializations: string[];
}

interface AssistantFormData {
  name: string;
  description: string;
  voiceType: string;
  language: string;
  specializations: string;
}

const Assistants: React.FC = () => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAssistant, setEditingAssistant] = useState<Assistant | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssistantFormData>();

  useEffect(() => {
    // Simulate loading assistants
    setTimeout(() => {
      setAssistants([
        {
          id: '1',
          name: 'Alex',
          description: 'Professional business assistant',
          voiceType: 'Male',
          language: 'en-US',
          isActive: true,
          specializations: ['Business', 'Sales'],
        },
        {
          id: '2',
          name: 'Sarah',
          description: 'Customer service specialist',
          voiceType: 'Female',
          language: 'en-US',
          isActive: true,
          specializations: ['Customer Service', 'Support'],
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const onSubmit = (data: AssistantFormData) => {
    const newAssistant: Assistant = {
      id: editingAssistant?.id || Date.now().toString(),
      name: data.name,
      description: data.description,
      voiceType: data.voiceType,
      language: data.language,
      isActive: true,
      specializations: data.specializations.split(',').map(s => s.trim()),
    };

    if (editingAssistant) {
      setAssistants(prev => prev.map(a => a.id === editingAssistant.id ? newAssistant : a));
    } else {
      setAssistants(prev => [...prev, newAssistant]);
    }

    reset();
    setShowForm(false);
    setEditingAssistant(null);
  };

  const handleEdit = (assistant: Assistant) => {
    setEditingAssistant(assistant);
    reset({
      name: assistant.name,
      description: assistant.description,
      voiceType: assistant.voiceType,
      language: assistant.language,
      specializations: assistant.specializations.join(', '),
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this assistant?')) {
      setAssistants(prev => prev.filter(a => a.id !== id));
    }
  };

  const toggleActive = (id: string) => {
    setAssistants(prev => prev.map(a => 
      a.id === id ? { ...a, isActive: !a.isActive } : a
    ));
  };

  return (
    <div className="min-h-screen bg-background dark:bg-darkbg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Virtual Assistants
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your AI virtual assistants
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            Add Assistant
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="card mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {editingAssistant ? 'Edit Assistant' : 'Add New Assistant'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="input-field mt-1"
                    placeholder="Assistant name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Voice Type
                  </label>
                  <select
                    {...register('voiceType', { required: 'Voice type is required' })}
                    className="input-field mt-1"
                  >
                    <option value="">Select voice type</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Neutral">Neutral</option>
                  </select>
                  {errors.voiceType && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.voiceType.message}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  className="input-field mt-1"
                  rows={3}
                  placeholder="Assistant description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Language
                  </label>
                  <select
                    {...register('language', { required: 'Language is required' })}
                    className="input-field mt-1"
                  >
                    <option value="">Select language</option>
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                  </select>
                  {errors.language && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.language.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Specializations (comma-separated)
                  </label>
                  <input
                    {...register('specializations')}
                    className="input-field mt-1"
                    placeholder="Business, Sales, Support"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button type="submit">
                  {editingAssistant ? 'Update Assistant' : 'Create Assistant'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingAssistant(null);
                    reset();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Assistants Grid */}
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
            {assistants.map(assistant => (
              <div key={assistant.id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {assistant.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {assistant.voiceType} • {assistant.language}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleActive(assistant.id)}
                      className={`px-2 py-1 text-xs rounded-full ${
                        assistant.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}
                    >
                      {assistant.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {assistant.description}
                </p>
                
                {assistant.specializations.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Specializations:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {assistant.specializations.map(spec => (
                        <span
                          key={spec}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(assistant)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(assistant.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assistants; 