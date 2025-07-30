import React from 'react';

const Dashboard: React.FC = () => {
    // Sample data for open elections
    const elections = [
        { id: 1, title: 'Election 2023', status: 'Open', votes: 150 },
        { id: 2, title: 'Local Referendum', status: 'Open', votes: 75 },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Open Elections</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Election Title</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Votes Cast</th>
                    </tr>
                </thead>
                <tbody>
                    {elections.map((election) => (
                        <tr key={election.id}>
                            <td className="py-2 px-4 border-b">{election.title}</td>
                            <td className="py-2 px-4 border-b">{election.status}</td>
                            <td className="py-2 px-4 border-b">{election.votes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;