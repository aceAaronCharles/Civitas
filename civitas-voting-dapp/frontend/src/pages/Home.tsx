import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to CIVITAS Voting DApp</h1>
            <p className="text-lg mb-8">A secure and decentralized voting platform.</p>
            <div className="flex space-x-4">
                <Link to="/vote" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Cast Your Vote
                </Link>
                <Link to="/dashboard" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    View Dashboard
                </Link>
            </div>
        </div>
    );
};

export default Home;