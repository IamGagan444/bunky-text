'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function SuggestionPage() {
  const [suggestion, setSuggestion] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSuggestClick = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/suggest-message')
      const data = await response.json()
      setSuggestion(data.suggestion)
    } catch (error) {
      console.error('Error fetching suggestion:', error)
      setSuggestion('Failed to fetch suggestion. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Human Behavior Suggestions</h1>
      <Button 
        onClick={handleSuggestClick} 
        disabled={isLoading}
        className="mb-4"
      >
        {isLoading ? 'Suggesting...' : 'Suggest Message'}
      </Button>
      {suggestion && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md max-w-md">
          <h2 className="font-semibold mb-2">Suggestion:</h2>
          <p className='text-black'>{suggestion}</p>
        </div>
      )}
    </div>
  )
}