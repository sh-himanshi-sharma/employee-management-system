import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-vh-100 bg-dark text-light d-flex flex-column">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark dashboard-nav py-3 px-4 shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center gap-2 fw-bold text-white fs-4" href="#!">
            <i className="bi bi-people-fill text-primary"></i>
            <span>EMS Portal</span>
          </a>
          
          <div className="d-flex align-items-center gap-3 ms-auto">
            <div className="d-flex align-items-center gap-2 bg-secondary bg-opacity-25 px-3 py-1.5 rounded-pill border border-secondary border-opacity-25">
              <i className="bi bi-person-circle text-info"></i>
              <span className="fw-semibold text-light">
                {user?.username ? user.username : 'Admin'}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-bold"
            >
              <i className="bi bi-box-arrow-right"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container my-auto py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card-custom p-4 p-md-5 text-dark">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4 pb-3 border-bottom">
                <div>
                  <h1 className="h2 fw-bold text-dark mb-1">
                    Welcome Admin 👋
                  </h1>
                  <p className="text-muted mb-0">
                    Employee Management System Dashboard
                  </p>
                </div>
                <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill fs-6 fw-semibold">
                  <i className="bi bi-shield-check me-1"></i> Session Active
                </span>
              </div>

              {/* Status Cards */}
              <div className="row g-4 mb-4">
                <div className="col-sm-6">
                  <div className="p-3 rounded-3 bg-light border">
                    <div className="text-uppercase text-muted small fw-bold mb-1">Logged In User</div>
                    <div className="fs-5 fw-bold text-primary">{user?.username}</div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-3 rounded-3 bg-light border">
                    <div className="text-uppercase text-muted small fw-bold mb-1">Auth Type</div>
                    <div className="fs-5 fw-bold text-success">JWT Bearer Token</div>
                  </div>
                </div>
              </div>

              {/* Token Info Box */}
              <div className="bg-dark text-light p-4 rounded-3 mb-4 font-monospace">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-warning fw-bold">CURRENT JWT TOKEN (EXPIRES IN 1 HOUR):</small>
                  <span className="badge bg-secondary">Stored in LocalStorage</span>
                </div>
                <div className="text-truncate text-white-50 small bg-black bg-opacity-50 p-2 rounded border border-secondary border-opacity-25">
                  {token || 'No active token'}
                </div>
              </div>

              {/* Quick Actions / System overview */}
              <div className="alert alert-info d-flex align-items-start gap-3 mb-0" role="alert">
                <i className="bi bi-info-circle-fill fs-4 text-info mt-1"></i>
                <div>
                  <h6 className="fw-bold mb-1">Authentication System Operational</h6>
                  <p className="mb-0 small">
                    You have successfully logged into the Employee Management System admin dashboard. 
                    Protected endpoints and persistent state verification are active.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-3 text-center text-white-50 border-top border-secondary border-opacity-25 small">
        &copy; {new Date().getFullYear()} Employee Management System - MERN Auth Foundation
      </footer>
    </div>
  );
};

export default Dashboard;
