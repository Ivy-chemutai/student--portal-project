import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="container mt-4">
      <div className="jumbotron jumbotron-bg animate-fade-in">
        <h1 className="display-4 fw-bold">Welcome to Student Portal</h1>
        <p className="lead">
          Your one-stop platform for managing courses, assignments, and academic progress.
        </p>
        <hr className="my-4 opacity-25" />
        <p>
          Get started by navigating to your dashboard or exploring available courses.
        </p>
        <div className="mt-4">
          <Link to="/dashboard" className="btn btn-light btn-lg me-2">
            <i className="bi bi-speedometer2 me-2"></i>View Dashboard
          </Link>
          <Link to="/courses" className="btn btn-warning btn-lg">
            <i className="bi bi-book me-2"></i>Browse Courses
          </Link>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-md-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-book fs-1 text-primary mb-3"></i>
              <h3 className="card-title">Learn</h3>
              <p className="card-text">Access your course materials and resources anytime, anywhere.</p>
              <Link to="/courses" className="btn btn-outline-primary mt-3">View Courses</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-pencil-square fs-1 text-primary mb-3"></i>
              <h3 className="card-title">Submit</h3>
              <p className="card-text">Complete and submit assignments with ease and track your progress.</p>
              <Link to="/assignments" className="btn btn-outline-primary mt-3">View Assignments</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-graph-up fs-1 text-primary mb-3"></i>
              <h3 className="card-title">Track</h3>
              <p className="card-text">Monitor your academic performance and stay on top of deadlines.</p>
              <Link to="/dashboard" className="btn btn-outline-primary mt-3">Go to Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-5 animate-fade-in" style={{animationDelay: '0.4s'}}>
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Our Distinguished Faculty</h4>
            </div>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="text-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{width: '100px', height: '100px'}}>
                      <i className="bi bi-person-fill" style={{fontSize: '3rem'}}></i>
                    </div>
                    <h5>Dr. Abubakar Sheikh</h5>
                    <p className="text-muted">Computer Science</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="text-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{width: '100px', height: '100px'}}>
                      <i className="bi bi-person-fill" style={{fontSize: '3rem'}}></i>
                    </div>
                    <h5>Dr. Brian Kemeu</h5>
                    <p className="text-muted">Data Science</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{width: '100px', height: '100px'}}>
                      <i className="bi bi-person-fill" style={{fontSize: '3rem'}}></i>
                    </div>
                    <h5>Prof. Emmanuel Kerich</h5>
                    <p className="text-muted">Mathematics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-5 animate-fade-in" style={{animationDelay: '0.5s'}}>
        <div className="col-12">
          <div className="card bg-primary text-white">
            <div className="card-body text-center p-5 cta-section">
              <h2 className="mb-4">Ready to get started?</h2>
              <p className="lead mb-4">Sign in to access all features of the Student Portal</p>
              <Link to="/dashboard" className="btn btn-light btn-lg">
                <i className="bi bi-box-arrow-in-right me-2"></i>Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;