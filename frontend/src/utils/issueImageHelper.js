// Example Correct Dummy Data Structure for Issues
// This shows how each issue should be structured with proper image mapping

export const exampleIssues = [
  {
    _id: '1',
    issueType: 'road',  // IMPORTANT: This determines the category
    title: 'Damaged Road',
    description: 'Large pothole on Main Street causing traffic issues',
    location: 'Main Street, Block A',
    status: 'pending',
    image: 'road-damage-001.jpg',  // If uploaded, this will be used
    // Full path will be: http://localhost:5000/uploads/issueImages/road-damage-001.jpg
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    reportedBy: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  },
  {
    _id: '2',
    issueType: 'streetlight',  // Category: streetlight
    title: 'Broken Streetlight',
    description: 'Streetlight not working for 3 days',
    location: 'Park Avenue, Near Gate 2',
    status: 'in-progress',
    image: null,  // No uploaded image - will use category default
    // Will fallback to: https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400
    createdAt: '2024-01-14T08:20:00Z',
    updatedAt: '2024-01-16T14:30:00Z',
    reportedBy: {
      name: 'Jane Smith',
      email: 'jane@example.com'
    }
  },
  {
    _id: '3',
    issueType: 'garbage',  // Category: garbage
    title: 'Garbage Overflow',
    description: 'Garbage bin overflowing for 2 days',
    location: 'Sector 5, Near Market',
    status: 'resolved',
    image: 'garbage-overflow-003.jpg',  // Uploaded image
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    reportedBy: {
      name: 'Mike Johnson',
      email: 'mike@example.com'
    }
  },
  {
    _id: '4',
    issueType: 'water',  // Category: water
    title: 'Water Leakage',
    description: 'Continuous water leakage from main pipeline',
    location: 'Residential Area, Block C',
    status: 'pending',
    image: '',  // Empty string - will use category default
    // Will fallback to: https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400
    createdAt: '2024-01-16T11:00:00Z',
    updatedAt: '2024-01-16T11:00:00Z',
    reportedBy: 'admin@example.com'  // Can be string or object
  },
  {
    _id: '5',
    issueType: 'other',  // Category: other
    title: 'Park Bench Broken',
    description: 'Park bench needs repair',
    location: 'Central Park',
    status: 'in-progress',
    image: undefined,  // Undefined - will use category default
    // Will fallback to: https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400
    createdAt: '2024-01-13T15:30:00Z',
    updatedAt: '2024-01-15T10:20:00Z',
    reportedBy: {
      name: 'Sarah Williams',
      email: 'sarah@example.com'
    }
  }
];

// Category to Default Image Mapping
export const categoryImageMap = {
  'road': 'https://images.unsplash.com/photo-1615671524827-c1fe3973b648?w=400',
  'water': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
  'streetlight': 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400',
  'garbage': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400',
  'other': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400'
};

// Image Resolution Logic (Priority Order)
export const getCorrectImage = (issue) => {
  // 1. Check if issue has uploaded image
  if (issue.image && issue.image.trim() !== '') {
    // If it's a full URL, return as is
    if (issue.image.startsWith('http')) {
      return issue.image;
    }
    // If it's a filename, construct full path
    return `http://localhost:5000/uploads/issueImages/${issue.image}`;
  }
  
  // 2. Fallback to category-based default image
  const category = (issue.issueType || issue.type || issue.category || 'other').toLowerCase();
  return categoryImageMap[category] || categoryImageMap['other'];
};
