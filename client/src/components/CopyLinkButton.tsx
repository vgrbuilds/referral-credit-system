import React, { useState } from 'react';
import { copyToClipboard } from '../utils/copyToClipboard';

interface CopyLinkButtonProps {
  link: string;
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        px-6 py-2.5 rounded-md font-medium transition-all duration-200
        ${copied
          ? 'bg-green-100 text-green-700'
          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow'
        }
      `}
    >
      {copied ? 'Copied!' : 'Copy Link'}
    </button>
  );
};

export default CopyLinkButton;
