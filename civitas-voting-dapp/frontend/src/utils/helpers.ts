export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const calculateVotePercentage = (votes: number, totalVotes: number): number => {
    if (totalVotes === 0) return 0;
    return ((votes / totalVotes) * 100);
};

export const truncateAddress = (address: string, chars: number = 4): string => {
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
};