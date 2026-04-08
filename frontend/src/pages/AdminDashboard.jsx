import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });
  const [filterStatus, setFilterStatus] = useState('all');

  // ✅ FIX: removed setSelectedImage
  const [selectedImage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    if (!token) {
      navigate('/login');
      return;
    }

    fetchIssues();
    // eslint-disable-next-line
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await fetch(`${API_URL}/api/issues/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch issues");
      }

      const data = await response.json();

      if (data.success) {
        setIssues(data.issues);
        calculateStats(data.issues);
      } else {
        alert(data.message || "Error fetching issues");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Server error. Please check backend connection.");
    }
  };

  const calculateStats = (issuesData) => {
    setStats({
      total: issuesData.length,
      pending: issuesData.filter(i => i.status === 'pending').length,
      inProgress: issuesData.filter(i => i.status === 'in-progress').length,
      resolved: issuesData.filter(i => i.status === 'resolved').length
    });
  };

  const handleStatusChange = async (issueId, newStatus) => {
    const solution = prompt("Enter solution description (optional):") || "";
    const estimatedDate =
      newStatus === "in-progress"
        ? prompt("Estimated date (YYYY-MM-DD):") || ""
        : "";

    try {
      const response = await fetch(
        `${API_URL}/api/issues/${issueId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            status: newStatus,
            solution,
            estimatedDate
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const data = await response.json();

      if (data.success) {
        const updatedIssues = issues.map(issue =>
          issue._id === issueId ? data.issue : issue
        );

        setIssues(updatedIssues);
        calculateStats(updatedIssues);
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("Failed to update issue");
    }
  };

  if (!user || user.role !== "admin") return null;

  const filteredIssues = issues.filter(
    issue => filterStatus === "all" || issue.status === filterStatus
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h2>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-700">
              Welcome, {user?.name || user?.email}
            </p>
            <p className="text-sm text-blue-600">Administrator</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Issues" value={stats.total} color="blue" />
          <StatCard title="Pending" value={stats.pending} color="red" />
          <StatCard title="In Progress" value={stats.inProgress} color="yellow" />
          <StatCard title="Resolved" value={stats.resolved} color="green" />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Manage Issues</h3>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {filteredIssues.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              No issues found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">Type</th>
                    <th className="px-4 py-3 text-left text-sm">Description</th>
                    <th className="px-4 py-3 text-left text-sm">Location</th>
                    <th className="px-4 py-3 text-left text-sm">Status</th>
                    <th className="px-4 py-3 text-left text-sm">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredIssues.map(issue => (
                    <tr key={issue._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 capitalize">{issue.issueType}</td>
                      <td className="px-4 py-3 max-w-xs truncate">{issue.description}</td>
                      <td className="px-4 py-3">{issue.location}</td>

                      <td className="px-4 py-3">
                        <select
                          value={issue.status}
                          onChange={(e) =>
                            handleStatusChange(issue._id, e.target.value)
                          }
                          className="px-2 py-1 border rounded"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>

                      <td className="px-4 py-3 text-sm">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Issue Image"
        >
          {selectedImage && (
            <img src={selectedImage} alt="Issue" className="w-full" />
          )}
        </Modal>
      </div>
    </div>
  );
};

/* ✅ FIXED Tailwind issue */
const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: "border-blue-500 text-blue-600",
    red: "border-red-500 text-red-600",
    yellow: "border-yellow-500 text-yellow-600",
    green: "border-green-500 text-green-600"
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${colors[color]}`}>
      <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
      <p className={`text-3xl font-bold ${colors[color]}`}>
        {value}
      </p>
    </div>
  );
};

export default AdminDashboard;