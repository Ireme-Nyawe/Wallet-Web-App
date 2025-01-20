import React from 'react'

function Button({title,isLoading}) {
  return (
    <button
    type="submit"
    className="w-full bg-accent text-primary py-3 rounded-md font-semibold hover:bg-highlight transition"
  >
    {isLoading ? (
      <span className="flex items-center justify-center">
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        Loading...
      </span>
    ) : (
      title
    )}
  </button>
  )
}

export default Button
