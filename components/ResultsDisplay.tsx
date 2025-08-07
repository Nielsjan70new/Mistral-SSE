
import React, { useState, useMemo, useEffect } from 'react';
import type { SearchResult, SearchMode, Source } from '../types';
import { JiraLogo, ConfluenceLogo, SendIcon, WebLinkIcon } from './Icons';

interface ResultsDisplayProps {
  isLoading: boolean;
  results: SearchResult | null; // For internal search
  searchMode: SearchMode;
  conversation: SearchResult[]; // For external search
  onFollowUp: (query: string) => void;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4 p-8">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-400">Searching for answers...</p>
  </div>
);

const FollowUpBar: React.FC<{ onSend: (query: string) => void; isLoading: boolean; }> = ({ onSend, isLoading }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() && !isLoading) {
            onSend(query);
            setQuery('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 w-full">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask a follow-up question..."
                    className="w-full bg-gray-800 border-2 border-gray-700 text-white rounded-full py-3 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="absolute inset-y-0 right-0 flex items-center justify-center bg-gray-700 text-gray-300 rounded-full w-12 h-12 m-1 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none"
                >
                    <SendIcon className="h-5 w-5" />
                </button>
            </div>
        </form>
    );
};

type SourceFilter = 'all' | 'jira' | 'confluence';

const renderSourceItem = (source: Source, index: number) => {
    const icon = {
        jira: <JiraLogo className="h-6 w-6 flex-shrink-0"/>,
        confluence: <ConfluenceLogo className="h-6 w-6 flex-shrink-0" />,
        web: <WebLinkIcon className="h-6 w-6 flex-shrink-0 text-gray-400" />
    }[source.type];

    return (
        <li key={index} className="bg-gray-800 hover:bg-gray-700/80 transition-colors duration-200 rounded-lg p-3 animate-fade-in" style={{ animationDelay: `${index * 50}ms`}}>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
                {icon}
                <span className="text-blue-400 group-hover:underline text-sm sm:text-base break-all">{source.title}</span>
            </a>
        </li>
    );
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, results, searchMode, conversation, onFollowUp }) => {
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');

  useEffect(() => {
    setSourceFilter('all');
  }, [results]);

  const filteredSources = useMemo(() => {
    if (!results?.sources) return [];
    if (sourceFilter === 'all') return results.sources;
    return results.sources.filter(source => source.type === sourceFilter);
  }, [results, sourceFilter]);

  if (isLoading && searchMode === 'internal' && !results) return <LoadingSpinner />;
  if (isLoading && searchMode === 'external' && conversation.length === 0) return <LoadingSpinner />;

  if (!results && conversation.length === 0) {
    return <div className="text-center text-gray-500 mt-8">Your results will appear here.</div>;
  }
  
  if (searchMode === 'internal' && results) {
    return (
      <div className="w-full max-w-4xl bg-gray-800/50 rounded-xl p-6 sm:p-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h2 className="text-2xl font-bold text-white">Sources ({filteredSources.length})</h2>
            <div className="flex items-center bg-gray-900 rounded-full p-1 self-start sm:self-center">
                {(['all', 'jira', 'confluence'] as SourceFilter[]).map((filter) => (
                    <button 
                        key={filter}
                        onClick={() => setSourceFilter(filter)} 
                        className={`px-3 sm:px-4 py-1 text-sm font-semibold rounded-full transition-colors capitalize ${sourceFilter === filter ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
        
        <ul className="space-y-3">
            {filteredSources.length > 0 ? (
                filteredSources.map(renderSourceItem)
            ) : (
                <li className="text-gray-400 text-center py-4">No {sourceFilter} sources found.</li>
            )}
        </ul>
      </div>
    );
  }

  if (searchMode === 'external' && conversation.length > 0) {
    return (
        <div className="w-full max-w-4xl">
            {conversation.map((result, index) => (
                <div key={index} className={`bg-gray-800/50 rounded-xl p-6 sm:p-8 animate-fade-in ${index > 0 ? 'mt-6' : ''}`}>
                    {result.summary && (
                        <>
                            <h2 className="text-2xl font-bold text-white mb-4">Summary</h2>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{result.summary}</p>
                        </>
                    )}
                    {result.sources && result.sources.length > 0 && (
                        <>
                            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Sources</h2>
                            <ul className="space-y-3">
                                {result.sources.map(renderSourceItem)}
                            </ul>
                        </>
                    )}
                </div>
            ))}

            {isLoading && <LoadingSpinner />}
            
            <FollowUpBar onSend={onFollowUp} isLoading={isLoading} />
        </div>
    );
  }

  return <div className="text-center text-gray-500 mt-8">Ask a question to begin.</div>;
};

export default ResultsDisplay;