import React, { useState } from 'react';

const IssueDetails = ({ issue, onUpvote, onAddComment, currentUserId }) => {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(issue._id, comment);
      setComment('');
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': 'bg-blue-100 text-blue-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const hasUpvoted = issue.upvotes?.includes(currentUserId);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {issue.priority && (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(issue.priority)}`}>
            {issue.priority.toUpperCase()} Priority
          </span>
        )}
        {issue.tags?.map((tag, idx) => (
          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => onUpvote(issue._id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            hasUpvoted 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <i className={`fas fa-thumbs-up ${hasUpvoted ? 'text-white' : ''}`}></i>
          <span>{issue.upvotes?.length || 0}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <i className="fas fa-comment"></i>
          <span>{issue.comments?.length || 0}</span>
        </button>
      </div>

      {showComments && (
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">Comments</h4>
          
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="2"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Post Comment
            </button>
          </form>

          <div className="space-y-3">
            {issue.comments?.map((c, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700">{c.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueDetails;
