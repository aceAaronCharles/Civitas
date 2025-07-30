import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VoterRegistry from '../../contracts/VoterRegistry.json';

const useVoter = (provider: ethers.providers.Web3Provider, voterAddress: string) => {
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkRegistration = async () => {
            try {
                const signer = provider.getSigner();
                const voterRegistryContract = new ethers.Contract(
                    process.env.REACT_APP_VOTER_REGISTRY_ADDRESS,
                    VoterRegistry.abi,
                    signer
                );

                const registered = await voterRegistryContract.isRegistered(voterAddress);
                setIsRegistered(registered);
            } catch (error) {
                console.error("Error checking voter registration:", error);
            } finally {
                setLoading(false);
            }
        };

        if (voterAddress) {
            checkRegistration();
        } else {
            setLoading(false);
        }
    }, [provider, voterAddress]);

    return { isRegistered, loading };
};

export default useVoter;