import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [studentData, setStudentData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student data
        const studentResponse = await fetch('http://localhost:3001/students/1');
        if (!studentResponse.ok) {
          throw new Error('Failed to fetch student data');
        }
        const studentData = await studentResponse.json();
        setStudentData(studentData);
        
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
        
        // Calculate stats
        const today = new Date();
        const upcomingAssignments = assignmentsData.filter(assignment => {
          const dueDate = new Date(assignment.dueDate);
          return dueDate >= today;
        });
        
        setStats({
          coursesEnrolled: coursesData.length,
          assignmentsPending: upcomingAssignments.length,
          upcomingDeadlines: upcomingAssignments.length,
          attendanceRate: 92 // Hardcoded for demo
        });
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

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
      <h2 className="mb-4 fw-bold text-primary animate-fade-in">Student Dashboard</h2>
      
      <div className="row mt-4">
        <div className="col-md-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-primary text-white p-3 me-3">
                  <i className="bi bi-person-circle fs-4"></i>
                </div>
                <h5 className="card-title mb-0">Student Profile</h5>
              </div>
              {studentData && (
                <>
                  <p><strong>Name:</strong> {studentData.name}</p>
                  <p><strong>ID:</strong> {studentData.studentId}</p>
                  <p><strong>Program:</strong> {studentData.program}</p>
                  <p><strong>Year:</strong> {studentData.year}</p>
                  <p><strong>GPA:</strong> <span className="badge bg-primary">{studentData.gpa}</span></p>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6 mb-3 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Courses Enrolled</h5>
                    <i className="bi bi-book fs-1 opacity-50"></i>
                  </div>
                  <h2>{stats?.coursesEnrolled || 0}</h2>
                  <Link to="/courses" className="btn btn-sm btn-light mt-2">View Courses</Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-3 animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="card bg-warning text-dark">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Pending Assignments</h5>
                    <i className="bi bi-clipboard-check fs-1 opacity-50"></i>
                  </div>
                  <h2>{stats?.assignmentsPending || 0}</h2>
                  <Link to="/assignments" className="btn btn-sm btn-dark mt-2">View Assignments</Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-3 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="card bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Attendance Rate</h5>
                    <i className="bi bi-calendar-check fs-1 opacity-50"></i>
                  </div>
                  <h2>{stats?.attendanceRate || 0}%</h2>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-3 animate-fade-in" style={{animationDelay: '0.5s'}}>
              <div className="card bg-info text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Upcoming Deadlines</h5>
                    <i className="bi bi-alarm fs-1 opacity-50"></i>
                  </div>
                  <h2>{stats?.upcomingDeadlines || 0}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4 animate-fade-in" style={{animationDelay: '0.6s'}}>
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Recent Courses</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Title</th>
                      <th>Instructor</th>
                      <th>Schedule</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.slice(0, 3).map(course => {
                      // Ensure correct instructor names
                      let instructor = course.instructor;
                      if (course.id === "1") instructor = "Dr. Abubakar Sheikh";
                      if (course.id === "2") instructor = "Dr. Brian Kemeu";
                      if (course.id === "3") instructor = "Prof. Emmanuel Kerich";
                      
                      return (
                      <tr key={course.id}>
                        <td>{course.code}</td>
                        <td>{course.title}</td>
                        <td>{instructor}</td>
                        <td>{course.schedule}</td>
                        <td>
                          <Link to={`/courses/${course.id}`} className="btn btn-sm btn-primary">
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-3">
                <Link to="/courses" className="btn btn-primary">View All Courses</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;