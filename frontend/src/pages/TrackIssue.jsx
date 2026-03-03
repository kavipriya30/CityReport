import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import IssueDetails from '../components/IssueDetails';
import IssueAnalytics from '../components/IssueAnalytics';
import ResolutionInfo from '../components/ResolutionInfo';

const TrackIssue = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        
        if (!token || !user) {
          setError('Please login to view your issues');
          setIssues([]);
          setFilteredIssues([]);
          setLoading(false);
          return;
        }
        
        const response = await fetch('http://localhost:5000/api/issues/my-issues', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          setIssues(data.issues);
          setFilteredIssues(data.issues);
        } else {
          setError(data.message || 'Failed to fetch issues');
          setIssues([]);
          setFilteredIssues([]);
        }
      } catch (error) {
        console.error('Error fetching issues:', error);
        setError('Network error. Please make sure the backend server is running on port 5000.');
        setIssues([]);
        setFilteredIssues([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchIssues();
  }, []);

  useEffect(() => {
    let filtered = issues;
    
    if (searchTerm) {
      filtered = filtered.filter(issue => 
        issue.issueType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }
    
    setFilteredIssues(filtered);
  }, [searchTerm, statusFilter, issues]);

  const handleViewImage = (imageUrl) => {
    const fullImageUrl = imageUrl.startsWith('http') 
      ? imageUrl 
      : `http://localhost:5000/${imageUrl}`;
    setSelectedImage(fullImageUrl);
    setIsModalOpen(true);
  };

  const handleDeleteIssue = async (issueId) => {
    if (!window.confirm('Are you sure you want to delete this issue?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/issues/${issueId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setIssues(prevIssues => prevIssues.filter(issue => issue._id !== issueId));
        setFilteredIssues(prevIssues => prevIssues.filter(issue => issue._id !== issueId));
        alert('Issue deleted successfully!');
      } else {
        throw new Error(data.message || 'Failed to delete issue');
      }
    } catch (error) {
      console.error('Error deleting issue:', error);
      alert('Failed to delete issue: ' + error.message);
    }
  };

  const handleUpvote = async (issueId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/issues/${issueId}/upvote`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setIssues(prevIssues => 
          prevIssues.map(issue => 
            issue._id === issueId 
              ? { ...issue, upvotes: data.hasUpvoted 
                  ? [...(issue.upvotes || []), user._id] 
                  : (issue.upvotes || []).filter(id => id !== user._id) 
                }
              : issue
          )
        );
      }
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleAddComment = async (issueId, text) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/issues/${issueId}/comment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });
      
      const data = await response.json();
      if (data.success) {
        setIssues(prevIssues => 
          prevIssues.map(issue => 
            issue._id === issueId 
              ? { ...issue, comments: [...(issue.comments || []), data.comment] }
              : issue
          )
        );
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const getIssueTypeIcon = (type) => {
    const icons = {
      'road': '🚧',
      'water': '💧',
      'streetlight': '💡',
      'garbage': '🗑️',
      'other': '🔧'
    };
    return icons[type?.toLowerCase()] || '📝';
  };

  const getCategoryImage = (category) => {
    const categoryImages = {
      'road': 'https://tse2.mm.bing.net/th/id/OIP.yK9h6ZAtCwWb4W686D9uvwHaE6?rs=1&pid=ImgDetMain&o=7&rm=3',
      'water': 'https://tse3.mm.bing.net/th/id/OIP.zoL6H3BzBswq02xoPh_ssQHaD5?rs=1&pid=ImgDetMain&o=7&rm=3',
      'streetlight': 'https://i2-prod.kentlive.news/incoming/article8398468.ece/ALTERNATES/s1200c/0_Faulty-streetlights.jpg',
      'garbage': 'https://c8.alamy.com/comp/RJ037K/a-pile-of-garbage-on-the-roadside-RJ037K.jpg',
      'other': 'https://media.istockphoto.com/photos/broken-chain-swing-in-playground-picture-id1203352631?k=6&m=1203352631&s=612x612&w=0&h=Lrg_3XQQOewTwviUx9dw-z_StcFbJoV2MJbS564yrXA='
    };
    return categoryImages[category?.toLowerCase()] || categoryImages['other'];
  };

  const getIssueImage = (issue) => {
    if (issue.image) {
      if (issue.image.startsWith('http')) {
        return issue.image;
      }
      return `http://localhost:5000/uploads/issueImages/${issue.image}`;
    }
    return getCategoryImage(issue.issueType);
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-red-100 text-red-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getProgressWidth = (status) => {
    const widths = {
      'pending': '25%',
      'in-progress': '60%',
      'resolved': '100%'
    };
    return widths[status] || '0%';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
            <p className="text-gray-600 text-lg">Loading your issues...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
          <i className="fas fa-search mr-2"></i>
          Track Your Issues
        </h2>
        
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <i className={`fas fa-${showAnalytics ? 'list' : 'chart-bar'}`}></i>
            {showAnalytics ? 'Show Issues' : 'Show Analytics'}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <div className="flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          </div>
        )}
        
        {showAnalytics ? (
          <IssueAnalytics issues={issues} />
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Search by issue type, description, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredIssues.length === 0 && !loading ? (
              <div className="text-center py-12">
                <i className="fas fa-clipboard-list text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-500 text-lg mb-2">
                  {issues.length === 0 ? 'No issues reported yet' : 'No issues match your search'}
                </p>
                {issues.length === 0 && (
                  <p className="text-gray-400">
                    <a href="/report" className="text-blue-600 hover:underline">
                      Report your first issue
                    </a>
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing {filteredIssues.length} of {issues.length} issues
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredIssues.map(issue => (
                    <div key={issue._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{getIssueTypeIcon(issue.issueType)}</span>
                          <h3 className="font-semibold text-gray-800 capitalize">
                            {issue.issueType.replace('-', ' ')}
                          </h3>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(issue.status)}`}>
                          {issue.status.charAt(0).toUpperCase() + issue.status.slice(1).replace('-', ' ')}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-600 text-sm mb-2">
                          <i className="fas fa-map-marker-alt mr-1"></i>
                          {issue.location}
                        </p>
                        <p className="text-gray-700 text-sm line-clamp-3">
                          {issue.description}
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <img 
                          src={getIssueImage(issue)}
                          alt={`${issue.issueType} issue`}
                          className="w-full h-40 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => handleViewImage(getIssueImage(issue))}
                          onError={(e) => {
                            e.target.src = getCategoryImage(issue.issueType);
                          }}
                        />
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{issue.status.charAt(0).toUpperCase() + issue.status.slice(1).replace('-', ' ')}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: getProgressWidth(issue.status) }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        <p>Reported: {new Date(issue.createdAt).toLocaleDateString()}</p>
                        {issue.updatedAt !== issue.createdAt && (
                          <p>Updated: {new Date(issue.updatedAt).toLocaleDateString()}</p>
                        )}
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <button 
                          onClick={() => handleDeleteIssue(issue._id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded transition-colors flex items-center justify-center"
                        >
                          <i className="fas fa-trash mr-2"></i>
                          Delete Issue
                        </button>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <ResolutionInfo issue={issue} />
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <IssueDetails 
                          issue={issue} 
                          onUpvote={handleUpvote} 
                          onAddComment={handleAddComment}
                          currentUserId={user?._id}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="Issue Image"
        >
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Issue" 
              className="w-full max-h-96 object-contain"
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default TrackIssue;
