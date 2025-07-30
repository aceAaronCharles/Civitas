import React, { useEffect, useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useVoter } from '../hooks/useVoter';
import VotingForm from '../components/VotingForm';

const Vote: React.FC = () => {
    const { walletConnected } = useWallet();
    const { isEligible, checkEligibility } = useVoter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyEligibility = async () => {
            if (walletConnected) {
                await checkEligibility();
            }
            setLoading(false);
        };
        verifyEligibility();
    }, [walletConnected, checkEligibility]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="vote-page">
            {isEligible ? (
                <VotingForm />
            ) : (
                <div>You are not eligible to vote. Please check your registration status.</div>
            )}
        </div>
    );
};

export default Vote;