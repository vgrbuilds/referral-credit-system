export const copyToClipboard = async (text: string): Promise<void> => {
    if (!navigator.clipboard) {
        console.error('Clipboard API not supported');
        return;
    }
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        throw error;
    }
};
