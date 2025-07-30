import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const useWallet = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const connectWallet = async () => {
        if (window.ethereum) {
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await web3Provider.send("eth_requestAccounts", []);
            setAccount(accounts[0]);
            setProvider(web3Provider);
            setIsConnected(true);
        } else {
            console.error("Please install MetaMask!");
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
        setProvider(null);
        setIsConnected(false);
    };

    useEffect(() => {
        if (window.ethereum) {
            const handleAccountsChanged = (accounts: string[]) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setIsConnected(true);
                } else {
                    disconnectWallet();
                }
            };

            window.ethereum.on('accountsChanged', handleAccountsChanged);

            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            };
        }
    }, []);

    return { account, provider, isConnected, connectWallet, disconnectWallet };
};

export default useWallet;