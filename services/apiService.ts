// src/services/apiService.ts

import type { SearchResult, Message } from '../types';

// CORRECTED: Removed the trailing slash from the URL
const BACKEND_URL = 'http://planon-sse.eba-pbstfnbb.eu-central-1.elasticbeanstalk.com';

/**
 * A single, unified function to handle all search queries.
 * It sends the query and search mode to our secure backend.
 * @param mode - 'external' or 'internal'
 * @param query - The user's search text
 * @param history - The conversation history for external searches
 * @returns A promise that resolves to a SearchResult.
 */
export const runQuery = async (
  mode: 'external' | 'internal',
  query: string,
  history: Message[]
): Promise<SearchResult> => {
    
    // This will now correctly form the URL: http://127.0.0.1:5000/api/search
    const endpoint = `${BACKEND_URL}/api/search`;

    const payload = {
        mode: mode,
        query: query,
        history: history
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'An unknown server error occurred.' }));
            throw new Error(errorData.error || `Request failed with status ${response.status}`);
        }

        const data: SearchResult = await response.json();
        return data;

    } catch (error) {
        console.error("Error calling backend service:", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Failed to connect to the search service. Please check your connection and try again.");
    }
};