
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  MessageSquare,
  Inbox,
  CalendarDays,
  CheckCircle2
} from 'lucide-react'

import './CollegeSuggestions.css'

const STORAGE_KEY = 'omnicampus_student_suggestions'

export default function CollegeSuggestions() {
  const navigate = useNavigate()
  const [suggestions, setSuggestions] = useState([])

  const loadSuggestions = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]'
      )

      setSuggestions(Array.isArray(saved) ? saved : [])
    } catch {
      setSuggestions([])
    }
  }

  useEffect(() => {
    loadSuggestions()

    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY) {
        loadSuggestions()
      }
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const updateStatus = (id, status) => {
    const updated = suggestions.map((item) =>
      item.id === id ? { ...item, status } : item
    )

    setSuggestions(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const newCount = suggestions.filter(
    (item) => (item.status || 'New') === 'New'
  ).length

  const reviewedCount = suggestions.filter(
    (item) => item.status === 'Reviewed'
  ).length

  const resolvedCount = suggestions.filter(
    (item) => item.status === 'Resolved'
  ).length

  return (
    <div className="college-suggestions-page">
      <header className="college-suggestions-header">
        <button
          type="button"
          className="college-suggestions-logo"
          onClick={() => navigate('/home')}
        >
          OmniCampus<span>.</span>
        </button>

        <button
          type="button"
          className="college-suggestions-back"
          onClick={() => navigate('/home')}
        >
          <ArrowLeft size={17} />
          Back to Home
        </button>
      </header>

      <main className="college-suggestions-main">
        <div className="college-suggestions-heading">
          <span className="college-suggestions-kicker">
            EDWARD COLLEGE OF ENGINEERING / COLLEGE PORTAL
          </span>

          <h1>
            Student <em>Suggestions.</em>
          </h1>

          <p>
            Review suggestions and requests submitted by
            students of your institution.
          </p>
        </div>

        <div className="college-suggestions-stats">
          <div className="college-suggestions-stat">
            <MessageSquare size={22} />
            <strong>{suggestions.length}</strong>
            <span>Total Suggestions</span>
          </div>

          <div className="college-suggestions-stat">
            <Inbox size={22} />
            <strong>{newCount}</strong>
            <span>New</span>
          </div>

          <div className="college-suggestions-stat">
            <CalendarDays size={22} />
            <strong>{reviewedCount}</strong>
            <span>Reviewed</span>
          </div>

          <div className="college-suggestions-stat">
            <CheckCircle2 size={22} />
            <strong>{resolvedCount}</strong>
            <span>Resolved</span>
          </div>
        </div>

        <section className="college-suggestions-section">
          <div className="college-suggestions-section-heading">
            <h2>Received Suggestions</h2>
            <span>{suggestions.length} submissions</span>
          </div>

          {suggestions.length === 0 ? (
            <div className="college-suggestions-empty">
              <Inbox size={38} />
              <h3>No suggestions received yet</h3>
              <p>
                Student suggestions will appear here when
                submissions are saved from the student portal.
              </p>
            </div>
          ) : (
            <div className="college-suggestions-list">
              {suggestions.map((item) => (
                <article
                  key={item.id}
                  className="college-suggestions-card"
                >
                  <div className="college-suggestions-card-top">
                    <span className="college-suggestions-id">
                      Suggestion #{item.id}
                    </span>

                    <span className="college-suggestions-status">
                      {item.status || 'New'}
                    </span>
                  </div>

                  <p className="college-suggestions-text">
                    {item.text}
                  </p>

                  <div className="college-suggestions-card-bottom">
                    <span className="college-suggestions-date">
                      <CalendarDays size={15} />
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString('en-IN')
                        : 'Date unavailable'}
                    </span>

                    <select
                      aria-label={`Status for suggestion ${item.id}`}
                      value={item.status || 'New'}
                      onChange={(event) =>
                        updateStatus(item.id, event.target.value)
                      }
                    >
                      <option value="New">New</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="college-suggestions-footer">
        <strong>OmniCampus<span>.</span></strong>
        <span>Connecting institutions. Creating opportunities.</span>
        <span>© {new Date().getFullYear()} OmniCampus</span>
      </footer>
    </div>
  )
}
