
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, MessageSquare } from 'lucide-react'
import './StudentSuggestions.css'

export default function StudentSuggestions() {
  const navigate = useNavigate()

  const [suggestion, setSuggestion] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!suggestion.trim()) {
      setMessage('Please write your suggestion or request.')
      return
    }

    // Demo only. Connect to backend later.
    setSuggestion('')
    setMessage(
      'Demo submission complete. Your suggestion has not yet been sent to the college.'
    )
  }

  return (
    <div className="student-suggestions-page">

      <header className="student-suggestions-header">
        <button
          type="button"
          className="student-suggestions-logo"
          onClick={() => navigate('/student/home')}
        >
          OmniCampus<span>.</span>
        </button>

        <button
          type="button"
          className="student-suggestions-back"
          onClick={() => navigate('/student/home')}
        >
          <ArrowLeft size={17} />
          Back to Home
        </button>
      </header>

      <main className="student-suggestions-main">

        <div className="student-suggestions-heading">
          <span className="student-suggestions-kicker">
            EDWARD COLLEGE OF ENGINEERING / STUDENT PORTAL
          </span>

          <h1>
            Suggestions <em>& Requests.</em>
          </h1>

          <p>
            Have an idea or request for your college?
            Share it with the Edward College team.
          </p>
        </div>

        <form
          className="student-suggestions-card"
          onSubmit={handleSubmit}
        >
          <div className="student-suggestions-icon">
            <MessageSquare size={25} />
          </div>

          <label htmlFor="student-suggestion">
            Your suggestion or request
          </label>

          <textarea
            id="student-suggestion"
            placeholder="Write your suggestion or request here..."
            value={suggestion}
            onChange={(event) => {
              setSuggestion(event.target.value)
              setMessage('')
            }}
            rows={6}
            maxLength={1000}
            required
          />

          <div className="student-suggestions-bottom">
            <span>{suggestion.length}/1000 characters</span>

            <button type="submit">
              Send Suggestion
              <Send size={17} />
            </button>
          </div>

          {message && (
            <p className="student-suggestions-message" role="status">
              {message}
            </p>
          )}
        </form>

      </main>

      <footer className="student-suggestions-footer">
        <strong>
          OmniCampus<span>.</span>
        </strong>

        <span>
          Connecting students. Creating opportunities.
        </span>

        <span>
          © {new Date().getFullYear()} OmniCampus
        </span>
      </footer>

    </div>
  )
}
