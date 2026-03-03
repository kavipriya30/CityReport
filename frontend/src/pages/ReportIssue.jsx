import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    issueType: '',
    description: '',
    location: '',
    image: null,
    priority: 'medium',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const issueTypes = [
    { value: 'road', label: '🚧 Road Damage' },
    { value: 'water', label: '💧 Water Leakage' },
    { value: 'streetlight', label: '💡 Streetlight Problem' },
    { value: 'garbage', label: '🗑️ Garbage Collection' },
    { value: 'other', label: '🔧 Other' }
  ];

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && formData.tags.length < 5) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setMessage('Please login to report an issue');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    
    if (formData.issueType && formData.description && formData.location) {
      setIsSubmitting(true);
      setMessage('Submitting issue...');
      
      try {
        const token = localStorage.getItem('token');
        const formDataToSend = new FormData();
        
        formDataToSend.append('issueType', formData.issueType);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('priority', formData.priority);
        formDataToSend.append('tags', JSON.stringify(formData.tags));
        
        if (formData.image) {
          formDataToSend.append('image', formData.image);
        }
        
        const response = await fetch('http://localhost:5000/api/issues', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formDataToSend
        });
        
        const data = await response.json();
        
        if (data.success) {
          setMessage('Issue reported successfully! Redirecting to track issues...');
          
          // Reset form
          setFormData({
            issueType: '',
            description: '',
            location: '',
            image: null,
            priority: 'medium',
            tags: []
          });
          setImagePreview(null);
          
          setTimeout(() => {
            navigate('/track');
          }, 2000);
        } else {
          setMessage(data.message || 'Failed to report issue');
        }
      } catch (error) {
        console.error('Error reporting issue:', error);
        setMessage('Network error. Please make sure the backend server is running on port 5000.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setMessage('Please fill in all required fields');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
              <i className="fas fa-plus-circle mr-2"></i>
              Report a Public Issue
            </h2>
            
            {message && (
              <div className={`mb-4 p-4 rounded-lg ${
                message.includes('successfully') 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : message.includes('Submitting')
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-red-100 text-red-700 border border-red-300'
              }`}>
                <div className="flex items-center">
                  <i className={`fas ${
                    message.includes('successfully') ? 'fa-check-circle' :
                    message.includes('Submitting') ? 'fa-spinner fa-spin' :
                    'fa-exclamation-circle'
                  } mr-2`}></i>
                  {message}
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <i className="fas fa-list mr-2"></i>
                  Issue Type *
                </label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  required
                >
                  <option value="">Select issue type</option>
                  {issueTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <i className="fas fa-edit mr-2"></i>
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Describe the issue in detail..."
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter the location or address"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Priority Level *
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  required
                >
                  <option value="low">🟢 Low - Minor inconvenience</option>
                  <option value="medium">🟡 Medium - Moderate issue</option>
                  <option value="high">🟠 High - Significant problem</option>
                  <option value="critical">🔴 Critical - Urgent attention needed</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <i className="fas fa-tags mr-2"></i>
                  Tags (Optional, max 5)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
                    placeholder="Add a tag..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    disabled={formData.tags.length >= 5}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    disabled={formData.tags.length >= 5}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="text-blue-700 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <i className="fas fa-camera mr-2"></i>
                  Upload Image (Optional)
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Submit Report
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Recent Issues Sidebar */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              <i className="fas fa-clock mr-2"></i>
              Recent Issues
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-semibold">🚧 Road Damage</span>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Pending</span>
                </div>
                <p className="text-xs text-gray-600">📍 Main Street</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-semibold">💧 Water Leakage</span>
                  <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">In Progress</span>
                </div>
                <p className="text-xs text-gray-600">📍 Park Avenue</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-semibold">💡 Streetlight</span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Resolved</span>
                </div>
                <p className="text-xs text-gray-600">📍 City Center</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Tips for Reporting</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Be specific about the location</li>
                <li>• Include photos if possible</li>
                <li>• Describe the severity</li>
                <li>• Mention safety concerns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;