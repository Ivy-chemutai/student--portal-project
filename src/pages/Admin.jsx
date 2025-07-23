import { useState, useEffect } from 'react';

function Admin() {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form states
  const [newCourse, setNewCourse] = useState({
    code: '',
    title: '',
    instructor: '',
    credits: 3,
    schedule: '',
    description: ''
  });
  
  const [newAssignment, setNewAssignment] = useState({
    courseId: '',
    title: '',
    description: '',
    dueDate: '',
    maxScore: 100
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch courses
        const coursesResponse = await fetch('http://localhost:3001/courses');
        if (!coursesResponse.ok) {
          throw new Error('Failed to fetch courses');
        }
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);

        // Fetch assignments
        const assignmentsResponse = await fetch('http://localhost:3001/assignments');
        if (!assignmentsResponse.ok) {
          throw new Error('Failed to fetch assignments');
        }
        const assignmentsData = await assignmentsResponse.json();
        setAssignments(assignmentsData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCourse)
      });

      if (!response.ok) {
        throw new Error('Failed to add course');
      }

      const addedCourse = await response.json();
      setCourses([...courses, addedCourse]);
      setNewCourse({
        code: '',
        title: '',
        instructor: '',
        credits: 3,
        schedule: '',
        description: ''
      });
      alert('Course added successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAssignment)
      });

      if (!response.ok) {
        throw new Error('Failed to add assignment');
      }

      const addedAssignment = await response.json();
      setAssignments([...assignments, addedAssignment]);
      setNewAssignment({
        courseId: '',
        title: '',
        description: '',
        dueDate: '',
        maxScore: 100
      });
      alert('Assignment added successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const response = await fetch(`http://localhost:3001/courses/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      setCourses(courses.filter(course => course.id !== id));
      alert('Course deleted successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const deleteAssignment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this assignment?')) return;
    
    try {
      const response = await fetch(`http://localhost:3001/assignments/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete assignment');
      }

      setAssignments(assignments.filter(assignment => assignment.id !== id));
      alert('Assignment deleted successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Panel</h2>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            Manage Courses
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'assignments' ? 'active' : ''}`}
            onClick={() => setActiveTab('assignments')}
          >
            Manage Assignments
          </button>
        </li>
      </ul>

      {activeTab === 'courses' && (
        <div>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">Add New Course</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleCourseSubmit}>
                    <div className="mb-3">
                      <label htmlFor="courseCode" className="form-label">Course Code</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="courseCode" 
                        value={newCourse.code}
                        onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="courseTitle" className="form-label">Course Title</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="courseTitle" 
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="instructor" className="form-label">Instructor</label>
                      <select 
                        className="form-select" 
                        id="instructor"
                        value={newCourse.instructor}
                        onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                        required
                      >
                        <option value="">Select an instructor</option>
                        <option value="Dr. Abubakar Sheikh">Dr. Abubakar Sheikh</option>
                        <option value="Dr. Brian Kemeu">Dr. Brian Kemeu</option>
                        <option value="Prof. Emmanuel Kerich">Prof. Emmanuel Kerich</option>
                      </select>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="credits" className="form-label">Credits</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          id="credits" 
                          value={newCourse.credits}
                          onChange={(e) => setNewCourse({...newCourse, credits: parseInt(e.target.value)})}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="schedule" className="form-label">Schedule</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="schedule" 
                          value={newCourse.schedule}
                          onChange={(e) => setNewCourse({...newCourse, schedule: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea 
                        className="form-control" 
                        id="description" 
                        rows="3"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Course</button>
                  </form>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-info text-white">
                  <h4 className="mb-0">Existing Courses</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Title</th>
                          <th>Instructor</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map(course => (
                          <tr key={course.id}>
                            <td>{course.code}</td>
                            <td>{course.title}</td>
                            <td>{course.instructor}</td>
                            <td>
                              <button 
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteCourse(course.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'assignments' && (
        <div>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">Add New Assignment</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleAssignmentSubmit}>
                    <div className="mb-3">
                      <label htmlFor="courseId" className="form-label">Course</label>
                      <select 
                        className="form-select" 
                        id="courseId"
                        value={newAssignment.courseId}
                        onChange={(e) => setNewAssignment({...newAssignment, courseId: e.target.value})}
                        required
                      >
                        <option value="">Select a course</option>
                        {courses.map(course => (
                          <option key={course.id} value={course.id}>
                            {course.code}: {course.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="assignmentTitle" className="form-label">Assignment Title</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="assignmentTitle" 
                        value={newAssignment.title}
                        onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="dueDate" className="form-label">Due Date</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        id="dueDate" 
                        value={newAssignment.dueDate}
                        onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="maxScore" className="form-label">Max Score</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        id="maxScore" 
                        value={newAssignment.maxScore}
                        onChange={(e) => setNewAssignment({...newAssignment, maxScore: parseInt(e.target.value)})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="assignmentDescription" className="form-label">Description</label>
                      <textarea 
                        className="form-control" 
                        id="assignmentDescription" 
                        rows="3"
                        value={newAssignment.description}
                        onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Assignment</button>
                  </form>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-info text-white">
                  <h4 className="mb-0">Existing Assignments</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Course</th>
                          <th>Due Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignments.map(assignment => {
                          const course = courses.find(c => c.id === assignment.courseId);
                          return (
                            <tr key={assignment.id}>
                              <td>{assignment.title}</td>
                              <td>{course ? course.code : 'Unknown'}</td>
                              <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                              <td>
                                <button 
                                  className="btn btn-sm btn-danger"
                                  onClick={() => deleteAssignment(assignment.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;