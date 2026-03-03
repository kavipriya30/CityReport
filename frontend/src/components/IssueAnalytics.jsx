import React from 'react';

const IssueAnalytics = ({ issues }) => {
  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === 'pending').length,
    inProgress: issues.filter(i => i.status === 'in-progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
    critical: issues.filter(i => i.priority === 'critical').length,
    high: issues.filter(i => i.priority === 'high').length,
    mostUpvoted: issues.sort((a, b) => (b.upvotes?.length || 0) - (a.upvotes?.length || 0))[0]
  };

  const typeStats = {
    road: issues.filter(i => i.issueType === 'road').length,
    water: issues.filter(i => i.issueType === 'water').length,
    streetlight: issues.filter(i => i.issueType === 'streetlight').length,
    garbage: issues.filter(i => i.issueType === 'garbage').length,
    other: issues.filter(i => i.issueType === 'other').length
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        <i className="fas fa-chart-bar mr-2"></i>
        Issue Analytics
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Issues</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-red-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-yellow-600">{stats.inProgress}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-green-600">{stats.resolved}</div>
          <div className="text-sm text-gray-600">Resolved</div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-gray-700">Priority Distribution</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded">
            <span className="text-sm">Critical</span>
            <span className="font-bold text-red-600">{stats.critical}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
            <span className="text-sm">High</span>
            <span className="font-bold text-orange-600">{stats.high}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-gray-700">Issue Types</h4>
        <div className="space-y-2">
          {Object.entries(typeStats).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between">
              <span className="text-sm capitalize">{type}</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(count / stats.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold w-8">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {stats.mostUpvoted && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-700">
            <i className="fas fa-fire mr-2 text-orange-500"></i>
            Most Supported Issue
          </h4>
          <p className="text-sm text-gray-700 mb-1">{stats.mostUpvoted.description?.substring(0, 60)}...</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-blue-600 font-semibold">
              <i className="fas fa-thumbs-up mr-1"></i>
              {stats.mostUpvoted.upvotes?.length || 0} upvotes
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueAnalytics;
