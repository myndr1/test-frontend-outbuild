import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Dashboard.css";
import Record from "../Record/Record";
import { Comment } from "../../interfaces/interfaces";
import { useAuth } from "../../context/AuthContext";
import { fetchComments } from "../../services/commentsService";

const Dashboard = () => {
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
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="sidebar">
        <h1>ProDashboard</h1>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="records-container">
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <Record comment={comment} />
            </li>
          ))}
        </ul>
      </div>
      <div className="buttons-container">
        <button
          className="arrow-button"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          <FaChevronLeft />
        </button>
        <button
          className="arrow-button"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === 10}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
