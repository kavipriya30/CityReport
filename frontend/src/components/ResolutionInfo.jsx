import React from 'react';

const ResolutionInfo = ({ issue }) => {
  if (!issue.resolution) return null;

  const { solution, estimatedDate, resolvedDate } = issue.resolution;
  
  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
        <i className="fas fa-check-circle mr-2"></i>
        Resolution Details
      </h4>
      
      {solution && (
        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-700 mb-1">Solution:</p>
          <p className="text-sm text-gray-600">{solution}</p>
        </div>
      )}
      
      {estimatedDate && (
        <div className="mb-2">
          <p className="text-xs text-gray-600">
            <i className="fas fa-calendar-alt mr-1"></i>
            Estimated Resolution: {new Date(estimatedDate).toLocaleDateString()}
          </p>
        </div>
      )}
      
      {resolvedDate && (
        <div className="mb-2">
          <p className="text-xs text-green-700 font-semibold">
            <i className="fas fa-check mr-1"></i>
            Resolved on: {new Date(resolvedDate).toLocaleDateString()}
          </p>
        </div>
      )}
      
      {issue.status === 'in-progress' && estimatedDate && (
        <div className="mt-3 p-2 bg-yellow-50 rounded border border-yellow-200">
          <p className="text-xs text-yellow-800">
            <i className="fas fa-clock mr-1"></i>
            Work in progress - Expected completion by {new Date(estimatedDate).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResolutionInfo;
