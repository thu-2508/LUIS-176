import React from 'react';

interface UnderlinedTextProps {
  text: string;
  underlinedPart?: string;
  className?: string;
}

export const UnderlinedText: React.FC<UnderlinedTextProps> = ({ 
  text, 
  underlinedPart, 
  className = '' 
}) => {
  if (!text) return null;

  // Case 1: text has explicit _..._ markers (e.g. b_oo_k, _u_pload, play_ed_)
  if (text.includes('_')) {
    const parts = text.split('_');
    return (
      <span className={className}>
        {parts.map((part, index) => {
          // Odd indices are the parts between underscores
          if (index % 2 === 1) {
            return (
              <span
                key={index}
                className="text-red-600 font-extrabold underline decoration-red-600 decoration-[3px] underline-offset-[4px] mx-[1px]"
              >
                {part}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  }

  // Case 2: text doesn't have underscores, but underlinedPart is specified (e.g. "ed" in "played")
  if (underlinedPart && text.toLowerCase().includes(underlinedPart.toLowerCase())) {
    const regex = new RegExp(`(${underlinedPart})`, 'i');
    const parts = text.split(regex);
    return (
      <span className={className}>
        {parts.map((part, index) => {
          if (part.toLowerCase() === underlinedPart.toLowerCase()) {
            return (
              <span
                key={index}
                className="text-red-600 font-extrabold underline decoration-red-600 decoration-[3px] underline-offset-[4px] mx-[1px]"
              >
                {part}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  }

  return <span className={className}>{text}</span>;
};
