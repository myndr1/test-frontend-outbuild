import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import './Dashboard.css';
import Record from '../Record/Record';
import Spinner from '../Spinner/Spinner';
import { Comment } from '../../interfaces/interfaces';
import { useAuth } from '../../context/AuthContext';
import { fetchComments } from '../../services/commentsService';

const Dashboard: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const { logout } = useAuth();

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments(page);
        setComments(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [page]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="navbar">
        <h1>ProDashboard</h1>
        <button className="logout-button" onClick={logout}>
          <span className="logout-icon">
            <MdLogout />
          </span>
          <text> Logout</text>
        </button>
      </div>
      <div className="records-container">
        <table className="records-table">
          <thead>
            <tr>
              <th className="id-header">ID</th>
              <th className="name-header">NAME</th>
              <th className="email-header">EMAIL</th>
              <th className="info-header">INFO</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <Record key={comment.id} comment={comment} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
                <div className="buttons-container">
                  <button
                    className="arrow-button"
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 1}
                  >
                    <span>
                      <FaChevronLeft />
                    </span>
                    <text>Previous</text>
                  </button>
                  <span className="pages">Page {page} of 10</span>
                  <button
                    className="arrow-button"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page === 10}
                  >
                    <text>Next</text>
                    <span>
                      <FaChevronRight />
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
