import React from 'react';

type IconProps = { className?: string };

export const MicrosoftLogo: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 21 21" className={className} fill="currentColor">
    <path fill="#f25022" d="M1 1h9v9H1z"></path>
    <path fill="#00a4ef" d="M1 11h9v9H1z"></path>
    <path fill="#7fba00" d="M11 1h9v9h-9z"></path>
    <path fill="#ffb900" d="M11 11h9v9h-9z"></path>
  </svg>
);

export const PlanonLogo: React.FC<IconProps> = ({ className }) => {
    // This component renders a perfect circle with four distinct gaps.
    // It uses a single circle element with a stroke and a calculated dash pattern.
    // This is a robust and precise method to create the desired logo.
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const arcLength = circumference * 0.20; // Each arc covers 20% of the circle
    const gapLength = circumference * 0.05;  // Each gap covers 5%

    return (
        <svg viewBox="0 0 100 100" className={className}>
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="16" // Defines the thickness of the circle/arcs
                strokeDasharray={`${arcLength} ${gapLength}`}
                transform="rotate(-45 50 50)" // Rotates the circle to align the gaps vertically and horizontally
            />
        </svg>
    );
};


export const JiraLogo: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.55 2.7l6.95 6.95c.5.5.5 1.5 0 2l-4.5 4.5c-.5.5-1.5.5-2 0l-2.45-2.45c-.5-.5-.5-1.5 0-2l6.95-6.95c.5-.5 1.5-.5 2 0z" fill="#2684FF"></path>
    <path d="M11.45 21.3l-6.95-6.95c-.5-.5-.5-1.5 0-2l4.5-4.5c.5-.5 1.5-.5 2 0l2.45 2.45c.5.5.5 1.5 0 2l-6.95 6.95c-.5.5-1.5.5-2 0z" fill="#0052CC"></path>
  </svg>
);

export const ConfluenceLogo: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none">
        <path d="M13.23 2.45a2 2 0 00-2.46 0L2.45 9.77a2 2 0 000 2.46l8.32 7.32a2 2 0 002.46 0l8.32-7.32a2 2 0 000-2.46L13.23 2.45z" fill="#2684FF"></path>
        <path d="M12 14a4 4 0 01-4-4h8a4 4 0 01-4 4z" fill="#fff"></path>
    </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

export const SendIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export const WebLinkIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
);

export const FlagUSA: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" className={className}>
        <path fill="#B22234" d="M0 0h9v6H0z"/>
        <path fill="#fff" d="M0 1h9v1H0zm0 2h9v1H0zm0 2h9v1H0z"/>
        <path fill="#3C3B6E" d="M0 0h4v3H0z"/>
        <path fill="#fff" d="M.4.4L.2.8l.4-.2H0l.4.2L.6 0l.2.4L1 .2v.6L.6.6zm1 0L1.2.8l.4-.2H1l.4.2L1.6 0l.2.4L2 .2v.6l-.4-.2zm1 0L2.2.8l.4-.2H2l.4.2L2.6 0l.2.4L3 .2v.6l-.4-.2zm1 0L3.2.8l.4-.2H3l.4.2L3.6 0l.2.4L4 .2v.6l-.4-.2zM0 1.2l.2.4.2-.4L.2 1l.4.4.2-.4.2.4-.2.4.4.2H0zm1 0l.2.4.2-.4-.2-.4.4.4.2-.4.2.4-.2.4.4.2H1zm1 0l.2.4.2-.4-.2-.4.4.4.2-.4.2.4-.2.4.4.2H2zm1 0l.2.4.2-.4-.2-.4.4.4.2-.4.2.4-.2.4.4.2H3zM.4 2l.2.4.2-.4L.4 2l.4.4-.2-.4.2.4-.2.4.4.2H0l.4-.2zm1 0l.2.4.2-.4-.2-.4.4.4.2-.4.2.4-.2.4.4.2H1l-.2-.4zm1 0l.2.4.2-.4-.2-.4.4.4.2-.4.2.4-.2.4.4.2H2l-.2-.4zm1 0l.2.4.2-.4-.2-.4.4.4.2-.4.2.4-.2.4.4.2H3l-.2-.4z"/>
    </svg>
);

export const FlagNL: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" className={className}>
        <path fill="#21468B" d="M0 4h9v2H0z"/>
        <path fill="#fff" d="M0 2h9v2H0z"/>
        <path fill="#AE1C28" d="M0 0h9v2H0z"/>
    </svg>
);

export const FlagDE: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" className={className}>
        <path d="M0 0h9v6H0z"/>
        <path fill="#D00" d="M0 2h9v2H0z"/>
        <path fill="#FFCE00" d="M0 4h9v2H0z"/>
    </svg>
);

export const FlagFR: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" className={className}>
        <path fill="#fff" d="M0 0h9v6H0z"/>
        <path fill="#002654" d="M0 0h3v6H0z"/>
        <path fill="#ED2939" d="M6 0h3v6H6z"/>
    </svg>
);

export const ChevronDown: React.FC<IconProps> = ({ className }) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);