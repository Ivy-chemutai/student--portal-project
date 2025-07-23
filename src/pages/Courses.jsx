import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3001/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        let data = await response.json();
        
        // Update instructor names for specific courses
        data = data.map(course => {
          if (course.id === "1") {
            return { ...course, instructor: "Dr. Abubakar Sheikh" };
          } else if (course.id === "2") {
            return { ...course, instructor: "Dr. Brian Kemeu" };
          } else if (course.id === "3") {
            return { ...course, instructor: "Prof. Emmanuel Kerich" };
          }
          return course;
        });
        
        setCourses(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
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
      <h2 className="mb-4">My Courses</h2>
      
      <div className="row">
        {courses.map(course => (
          <div className="col-md-6 col-lg-4 mb-4" key={course.id}>
            <div className="card h-100">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">{course.code}: {course.title}</h5>
              </div>
              <div className="card-body">
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Schedule:</strong> {course.schedule}</p>
                <p><strong>Credits:</strong> {course.credits}</p>
                <p className="card-text">{course.description}</p>
                <Link to={`/courses/${course.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;