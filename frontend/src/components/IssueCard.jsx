import React from 'react';
import StatusBadge from './StatusBadge';

// Category-based default images mapping
const getCategoryImage = (category) => {
  const categoryImages = {
    'road': 'https://tse2.mm.bing.net/th/id/OIP.yK9h6ZAtCwWb4W686D9uvwHaE6?rs=1&pid=ImgDetMain&o=7&rhttps://tse3.mm.bing.net/th/id/OIP.zoL6H3BzBswq02xoPh_ssQHaD5?rs=1&pid=ImgDetMain&o=7&rm=3m=3',
    'water': '',
    'streetlight': 'https://i2-prod.kentlive.news/incoming/article8398468.ece/ALTERNATES/s1200c/0_Faulty-streetlights.jpg',
    'garbage': 'https://c8.alamy.com/comp/RJ037K/a-pile-of-garbage-on-the-roadside-RJ037K.jpg',
    'other': 'https://media.istockphoto.com/photos/broken-chain-swing-in-playground-picture-id1203352631?k=6&m=1203352631&s=612x612&w=0&h=Lrg_3XQQOewTwviUx9dw-z_StcFbJoV2MJbS564yrXA='
  };
  return categoryImages[category?.toLowerCase()] || categoryImages['other'];
};

const IssueCard = ({ issue, showActions = false, onStatusChange, onViewImage }) => {
  // Determine the correct image to display
  const getIssueImage = () => {
    console.log('Issue data:', issue);
    console.log('Issue type:', issue.issueType);
    console.log('Issue image:', issue.image);
    
    // Priority 1: Use uploaded image if exists
    if (issue.image) {
      // Check if it's a full URL or relative path
      if (issue.image.startsWith('http')) {
        console.log('Using full URL:', issue.image);
        return issue.image;
      }
      // Handle relative paths from backend
      const fullPath = `http://localhost:5000/uploads/issueImages/${issue.image}`;
      console.log('Using backend path:', fullPath);
      return fullPath;
    }
    
    // Priority 2: Use category-based default image
    const category = issue.issueType || issue.type || issue.category;
    const defaultImg = getCategoryImage(category);
    console.log('Using category default for', category, ':', defaultImg);
    return defaultImg;
  };

  const displayImage = getIssueImage();
  const issueType = issue.issueType || issue.type || 'Other';
  
  console.log('Final display image:', displayImage);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold capitalize">{issueType.replace('-', ' ')}</h3>
        <StatusBadge status={issue.status} />
      </div>
      
      <p className="text-gray-600 mb-3">{issue.description}</p>
      
      <div className="text-sm text-gray-500 mb-4">
        <p><strong>Location:</strong> {issue.location}</p>
        <p><strong>Reported:</strong> {new Date(issue.createdAt).toLocaleDateString()}</p>
        {issue.reportedBy && <p><strong>By:</strong> {typeof issue.reportedBy === 'string' ? issue.reportedBy : issue.reportedBy.name || issue.reportedBy.email}</p>}
      </div>

      {/* Display Image */}
      <div className="mb-4">
        <img 
          src={displayImage}
          alt={`${issueType} issue`}
          className="w-full h-48 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onViewImage && onViewImage(displayImage)}
          onError={(e) => {
            // Fallback to category default if image fails to load
            e.target.src = getCategoryImage(issueType);
          }}
        />
      </div>

      {issue.remarks && (
        <div className="bg-gray-50 p-3 rounded mb-4">
          <p className="text-sm"><strong>Remarks:</strong> {issue.remarks}</p>
        </div>
      )}

      {showActions && (
        <div className="flex space-x-2">
          <select 
            value={issue.status}
            onChange={(e) => onStatusChange && onStatusChange(issue._id || issue.id, e.target.value)}
            className="px-3 py-1 border rounded text-sm"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default IssueCard;
