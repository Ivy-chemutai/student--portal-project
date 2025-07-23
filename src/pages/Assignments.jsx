import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function Assignments() {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submission, setSubmission] = useState({
    assignmentId: '',
    studentId: 1, // Hardcoded for demo
    submissionText: '',
    submissionDate: '',
    status: 'submitted'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all assignments
        const assignmentsResponse = await fetch('http://localhost:3001/assignments');
        if (!assignmentsResponse.ok) {
          throw new Error('Failed to fetch assignments');
        }
        const assignmentsData = await assignmentsResponse.json();
        setAssignments(assignmentsData);

        // Fetch all courses for reference
        const coursesResponse = await fetch('http://localhost:3001/courses');
        if (!coursesResponse.ok) {
          throw new Error('Failed to fetch courses');
        }
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);

        // If there's an ID in the URL, fetch that specific assignment
        if (id) {
          const assignment = assignmentsData.find(a => a.id === id);
          if (assignment) {
            setSelectedAssignment(assignment);
            setSubmission(prev => ({ ...prev, assignmentId: assignment.id }));
          }
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getCourseTitle = (courseId) => {
    const course = courses.find(c => c.id === courseId.toString());
    return course ? course.title : 'Unknown Course';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submissionData = {
        ...submission,
        submissionDate: new Date().toISOString().split('T')[0]
      };

      const response = await fetch('http://localhost:3001/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit assignment');
      }

      alert('Assignment submitted successfully!');
      setSubmission({
        assignmentId: selectedAssignment ? selectedAssignment.id : '',
        studentId: 1,
        submissionText: '',
        submissionDate: '',
        status: 'submitted'
      });
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
      <h2 className="mb-4">Assignments</h2>

      <div className="row">
        <div className="col-md-8">
          {selectedAssignment ? (
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">{selectedAssignment.title}</h4>
              </div>
              <div className="card-body">
                <p><strong>Course:</strong> {getCourseTitle(selectedAssignment.courseId)}</p>
                <p><strong>Due Date:</strong> {new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>
                <p><strong>Max Score:</strong> {selectedAssignment.maxScore}</p>
                <p>{selectedAssignment.description}</p>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-3">
                    <label htmlFor="submissionText" className="form-label">Your Submission</label>
                    <textarea 
                      className="form-control" 
                      id="submissionText" 
                      rows="5" 
                      value={submission.submissionText}
                      onChange={(e) => setSubmission({...submission, submissionText: e.target.value})}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Attachment (Optional)</label>
                    <input type="file" className="form-control" />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit Assignment</button>
                </form>
              </div>
            </div>
          ) : (
            <div className="alert alert-info">
              Select an assignment from the list to view details and submit your work.
            </div>
          )}
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Assignment List</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {assignments.map(assignment => {
                  const dueDate = new Date(assignment.dueDate);
                  const today = new Date();
                  const isPastDue = dueDate < today;
                  
                  return (
                    <button 
                      key={assignment.id}
                      className={`list-group-item list-group-item-action ${selectedAssignment && selectedAssignment.id === assignment.id ? 'active' : ''}`}
                      onClick={() => setSelectedAssignment(assignment)}
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{assignment.title}</h6>
                        {isPastDue ? (
                          <span className="badge bg-danger">Past Due</span>
                        ) : (
                          <span className="badge bg-success">Open</span>
                        )}
                      </div>
                      <small>{getCourseTitle(assignment.courseId)}</small>
                      <br />
                      <small>Due: {dueDate.toLocaleDateString()}</small>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assignments;