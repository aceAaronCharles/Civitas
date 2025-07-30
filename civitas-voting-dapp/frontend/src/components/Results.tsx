import React, { useEffect, useState } from 'react';
import { fetchElectionResults } from '../utils/helpers';

const Results: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getResults = async () => {
            const data = await fetchElectionResults();
            setResults(data);
            setLoading(false);
        };

        getResults();
    }, []);

    if (loading) {
        return <div>Loading results...</div>;
    }

    return (
        <div className="results-container">
            <h2>Election Results</h2>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        <h3>{result.candidate}</h3>
                        <p>Votes: {result.votes}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Results;