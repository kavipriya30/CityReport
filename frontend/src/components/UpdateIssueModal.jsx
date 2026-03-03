import React, { useState } from 'react';

const UpdateIssueModal = ({ isOpen, onClose, issue, onUpdate }) => {
  const [formData, setFormData] = useState({
    status: issue?.status || 'pending',
    solution: issue?.resolution?.solution || '',
    estimatedDate: issue?.resolution?.estimatedDate 
      ? new Date(issue.resolution.estimatedDate).toISOString().split('T')[0] 
      : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(issue._id, formData);
    onClose();
  };

  if (!isOpen || !issue) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4">Update Issue Status</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Solution Description</label>
            <textarea
              value={formData.solution}
              onChange={(e) => setFormData({...formData, solution: e.target.value})}
              placeholder="Describe the solution or action taken..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="3"
            />
          </div>

          {formData.status === 'in-progress' && (
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Estimated Resolution Date</label>
              <input
                type="date"
                value={formData.estimatedDate}
                onChange={(e) => setFormData({...formData, estimatedDate: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateIssueModal;
