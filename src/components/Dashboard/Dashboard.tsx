import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Record from '../Record/Record';
import { Comment } from '../../interfaces/interfaces';
import { useAuth } from '../../context/AuthContext';
import { fetchComments } from '../../services/commentsService';


const Dashboard = () => {
    const [ comments, setComments ] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {logout } = useAuth();

    useEffect(() => {
        const loadComments = async () => {
          try {
            const data = await fetchComments();
            setComments(data);
          } catch (err) {
            /* setError(err.message); */
          } finally {
            setLoading(false);
          }
        };
    
        loadComments();
      }, []);

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
                <button onClick={ logout }>Logout</button>
            </div>
            <div className="records-container">
                <ul>
                    { comments.map((comment) => (
                        <li key={comment.id}>
                            <Record comment={comment} />
                        </li>
                    )) }
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;