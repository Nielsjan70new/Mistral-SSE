import React, { useState, useCallback } from 'react';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ResultsDisplay from './components/ResultsDisplay';
import { runQuery } from './services/apiService';
import type { SearchMode, SearchResult, Message } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchMode, setSearchMode] = useState<SearchMode>('internal');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Unified state to hold the results for the ResultsDisplay component
  const [currentResult, setCurrentResult] = useState<SearchResult | null>(null);
  const [conversation, setConversation] = useState<SearchResult[]>([]);
  const [history, setHistory] = useState<Message[]>([]);

  const handleLogin = () => setIsLoggedIn(true);

  // This function resets the state before a new search or mode switch
  const clearState = () => {
    setError(null);
    setCurrentResult(null);
    setConversation([]);
    setHistory([]);
  };

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    console.log(`Starting search in '${searchMode}' mode with query: "${query}"`); // Debugging log

    setIsLoading(true);
    clearState(); // Reset everything for a clean slate

    try {
      const result = await runQuery(searchMode, query, []); // Initial search has empty history
      
      console.log("Received result from backend:", result); // Debugging log

      setCurrentResult(result); // Set the result for both modes

      if (searchMode === 'external') {
        // For external mode, also start the conversation history
        const newHistory: Message[] = [
          { role: 'user', content: query },
          { role: 'assistant', content: result.summary },
        ];
        setHistory(newHistory);
        setConversation([result]);
      }

    } catch (e) {
      console.error("Search failed:", e);
      if (e instanceof Error) setError(e.message);
      else setError("An unknown error occurred.");
    } finally {
      setIsLoading(false);
      console.log("Search finished."); // Debugging log
    }
  }, [searchMode]); // The dependency is correct

  const handleFollowUp = useCallback(async (query: string) => {
    if (!query.trim() || searchMode !== 'external') return;

    console.log(`Starting follow-up with query: "${query}"`); // Debugging log

    setIsLoading(true);
    setError(null);

    try {
      const result = await runQuery(searchMode, query, history); // Pass the existing history
      
      console.log("Received follow-up result from backend:", result); // Debugging log

      const newHistory: Message[] = [
        ...history,
        { role: 'user', content: query },
        { role: 'assistant', content: result.summary },
      ];
      setHistory(newHistory);
      setConversation(prev => [...prev, result]); // Add to the conversation

    } catch (e) {
      console.error("Follow-up failed:", e);
      if (e instanceof Error) setError(e.message);
      else setError("An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [searchMode, history]); // Dependencies are correct

  const toggleSearchMode = (mode: SearchMode) => {
    setSearchMode(mode);
    clearState();
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header searchMode={searchMode} />
      <main className="flex-grow flex flex-col items-center p-4 sm:p-6 md:p-8 w-full">
        <div className="w-full max-w-4xl flex flex-col items-center">
            
          <div className="flex items-center bg-gray-800 rounded-full p-1 mb-8">
            <button
              onClick={() => toggleSearchMode('internal')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                searchMode === 'internal' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              Internal Search
            </button>
            <button
              onClick={() => toggleSearchMode('external')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                searchMode === 'external' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              External Search
            </button>
          </div>

          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          
          <ResultsDisplay 
            isLoading={isLoading} 
            // The logic for displaying results is now cleaner
            results={searchMode === 'internal' ? currentResult : null} 
            conversation={searchMode === 'external' ? conversation : []}
            searchMode={searchMode}
            onFollowUp={handleFollowUp}
            error={error} 
          />
        </div>
      </main>
    </div>
  );
};

export default App;