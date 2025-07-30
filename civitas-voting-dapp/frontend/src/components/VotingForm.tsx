import React, { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useVoter } from '../hooks/useVoter';

const VotingForm: React.FC = () => {
    const { connectWallet, walletAddress } = useWallet();
    const { submitVote, isEligible } = useVoter();
    const [candidateId, setCandidateId] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const handleVoteSubmission = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEligible) {
            setError('You are not eligible to vote.');
            return;
        }
        try {
            await submitVote(candidateId);
            setSuccess(true);
            setError('');
        } catch (err) {
            setError('Failed to submit vote. Please try again.');
        }
    };

    return (
        <div className="voting-form">
            <h2 className="text-lg font-bold">Cast Your Vote</h2>
            {success && <p className="text-green-500">Vote submitted successfully!</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleVoteSubmission}>
                <div>
                    <label htmlFor="candidateId" className="block">Candidate ID:</label>
                    <input
                        type="text"
                        id="candidateId"
                        value={candidateId}
                        onChange={(e) => setCandidateId(e.target.value)}
                        required
                        className="border rounded p-2"
                    />
                </div>
                <button type="submit" className="mt-2 bg-blue-500 text-white rounded p-2">
                    Submit Vote
                </button>
            </form>
            {!walletAddress && (
                <button onClick={connectWallet} className="mt-4 bg-green-500 text-white rounded p-2">
                    Connect Wallet
                </button>
            )}
        </div>
    );
};

export default VotingForm;