import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Fetch course details
        const courseResponse = await fetch(`http://localhost:3001/courses/${id}`);
        if (!courseResponse.ok) {
          throw new Error('Failed to fetch course details');
        }
        let courseData = await courseResponse.json();
        
        // Update instructor name based on course ID
        if (courseData.id === "1") {
          courseData.instructor = "Dr. Abubakar Sheikh";
        } else if (courseData.id === "2") {
          courseData.instructor = "Dr. Brian Kemeu";
        } else if (courseData.id === "3") {
          courseData.instructor = "Prof. Emmanuel Kerich";
        }
        
        setCourse(courseData);

        // Fetch assignments for this course
        const assignmentsResponse = await fetch(`http://localhost:3001/assignments?courseId=${id}`);
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

    fetchCourseDetails();
  }, [id]);

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

  if (!course) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning" role="alert">
          Course not found
        </div>
        <Link to="/courses" className="btn btn-primary">Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">{course.code}: {course.title}</h2>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <p><strong>Instructor:</strong> {course.instructor}</p>
                  <p><strong>Credits:</strong> {course.credits}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Schedule:</strong> {course.schedule}</p>
                </div>
              </div>
              <h5>Course Description</h5>
              <p>{course.description}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-info text-white">
              <h4 className="mb-0">Course Assignments</h4>
            </div>
            <div className="card-body">
              {assignments.length > 0 ? (
                <div className="list-group">
                  {assignments.map(assignment => (
                    <div key={assignment.id} className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{assignment.title}</h5>
                        <small>Due: {new Date(assignment.dueDate).toLocaleDateString()}</small>
                      </div>
                      <p className="mb-1">{assignment.description}</p>
                      <small>Max Score: {assignment.maxScore}</small>
                      <div className="mt-2">
                        <Link to={`/assignments/${assignment.id}`} className="btn btn-sm btn-primary">
                          View Assignment
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No assignments for this course yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">Resources</h4>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <i className="bi bi-file-earmark-pdf me-2"></i>
                  Course Syllabus
                </li>
                <li className="list-group-item">
                  <i className="bi bi-book me-2"></i>
                  Lecture Notes
                </li>
                <li className="list-group-item">
                  <i className="bi bi-link me-2"></i>
                  Additional Resources
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <Link to="/courses" className="btn btn-secondary">Back to Courses</Link>
      </div>
    </div>
  );
}

export default CourseDetail;