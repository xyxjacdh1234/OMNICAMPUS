
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Home from './Home.jsx'
import Dashboard from './Dashboard.jsx'
import Resources from './Resources.jsx'
import ResourceDetails from './ResourceDetails.jsx'
import Account from './Account.jsx'

import './App.css'

function App() {
  const navigate = useNavigate()

  const [showIntro, setShowIntro] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [message, setMessage] = useState('')
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()

    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    setMouse({ x: x * 12, y: y * 12 })
  }

  const handleLogin = (event) => {
    event.preventDefault()

    if (!form.email.trim() || !form.password) {
      setMessage('Please enter your institutional credentials.')
      return
    }

    // Temporary navigation until backend authentication is added.
    navigate('/home')
  }

  return (
    <Routes>
      {/* HOME PAGE */}
      <Route path="/home" element={<Home />} />

      {/* DASHBOARD PAGE */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* RESOURCES PAGE */}
      <Route path="/resources" element={<Resources />} />

      {/* RESOURCE DETAILS PAGE */}
      <Route
        path="/resources/:id"
        element={<ResourceDetails />}
      />

      {/* MY ACCOUNT - COLLEGE PROFILE */}
      <Route
        path="/account"
        element={<Account />}
      />

      {/* ORIGINAL INTRO AND LOGIN */}
      <Route
        path="/"
        element={
          <>
            {showIntro ? (
              <div className="intro-screen">
                <div className="intro-brand">
                  <h1 className="intro-title">
                    Omn
                    <span className="intro-letter-i">
                      ı
                      <span
                        className="flying-book"
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 40 32"
                          width="40"
                          height="32"
                          fill="none"
                        >
                          <path
                            d="M20 7 C14 2 7 3 2 5 V25 C9 23 15 24 20 28 Z"
                            fill="white"
                            stroke="#94A3B8"
                            strokeWidth="1.2"
                          />
                          <path
                            d="M20 7 C26 2 33 3 38 5 V25 C31 23 25 24 20 28 Z"
                            fill="#E2E8F0"
                            stroke="#94A3B8"
                            strokeWidth="1.2"
                          />
                          <path
                            d="M20 7 V28"
                            stroke="#0B1D3A"
                            strokeWidth="1.2"
                          />
                        </svg>
                      </span>
                    </span>
                    Campus
                  </h1>
                </div>
              </div>
            ) : (
              <main className="oc-login-page">
                <div className="oc-login-shell">

                  {/* LEFT BRAND PANEL */}
                  <section
                    className="oc-brand-panel"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() =>
                      setMouse({ x: 0, y: 0 })
                    }
                  >
                    <div className="oc-brand-header">
                      <span className="oc-brand-name">
                        OmniCampus
                      </span>

                      <span className="oc-brand-edition">
                        INSTITUTIONAL NETWORK
                      </span>
                    </div>

                    <div
                      className="oc-visual"
                      style={{
                        transform: `translate(${mouse.x}px, ${mouse.y}px)`
                      }}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 500 360"
                        className="oc-network"
                        fill="none"
                      >
                        <path
                          d="M48 205 L160 105 L288 165 L420 68"
                          className="oc-network-line"
                        />
                        <path
                          d="M48 205 L175 280 L288 165 L445 280"
                          className="oc-network-line"
                        />
                        <path
                          d="M160 105 L175 280"
                          className="oc-network-line oc-network-secondary"
                        />
                        <path
                          d="M288 165 L445 280 L420 68"
                          className="oc-network-line oc-network-secondary"
                        />

                        <circle
                          cx="48"
                          cy="205"
                          r="6"
                          className="oc-node"
                        />
                        <circle
                          cx="160"
                          cy="105"
                          r="6"
                          className="oc-node"
                        />
                        <circle
                          cx="175"
                          cy="280"
                          r="6"
                          className="oc-node"
                        />
                        <circle
                          cx="420"
                          cy="68"
                          r="6"
                          className="oc-node"
                        />
                        <circle
                          cx="445"
                          cy="280"
                          r="6"
                          className="oc-node"
                        />

                        <circle
                          cx="288"
                          cy="165"
                          r="22"
                          className="oc-center-ring"
                        />

                        <circle
                          cx="288"
                          cy="165"
                          r="7"
                          className="oc-center-node"
                        />
                      </svg>
                    </div>

                    <div className="oc-brand-content">
                      <div className="oc-section-index">
                        <span className="oc-index-line" />
                        ONE CONNECTED PLATFORM
                      </div>

                      <h2>
                        Better connections.
                        <br />
                        <em>Greater possibilities.</em>
                      </h2>

                      <p>
                        Bringing institutions together to share
                        resources, collaborate on ideas, and
                        create meaningful opportunities.
                      </p>
                    </div>

                    <div className="oc-brand-footer">
                      <span>CONNECT</span>
                      <span className="oc-footer-dot" />
                      <span>SHARE</span>
                      <span className="oc-footer-dot" />
                      <span>GROW</span>
                    </div>
                  </section>

                  {/* RIGHT LOGIN PANEL */}
                  <section className="oc-form-panel">
                    <div className="oc-form-top">
                      <span>OMNICAMPUS PORTAL</span>

                      <span className="oc-secure-indicator">
                        <span className="oc-secure-dot" />
                        INSTITUTIONAL ACCESS
                      </span>
                    </div>

                    <div className="oc-form-content">
                      <div className="oc-form-intro">
                        <span className="oc-form-kicker">
                          YOUR INSTITUTIONAL WORKSPACE
                        </span>

                        <h1>
                          Welcome <em>back.</em>
                        </h1>

                        <p>
                          Sign in to continue connecting with
                          your institutional network.
                        </p>
                      </div>

                      <form
                        onSubmit={handleLogin}
                        className="oc-login-form"
                      >
                        <div className="oc-field">
                          <label htmlFor="oc-email">
                            Institutional email
                          </label>

                          <div className="oc-input-container">
                            <input
                              id="oc-email"
                              type="email"
                              placeholder="name@institution.edu"
                              autoComplete="email"
                              value={form.email}
                              onChange={(event) => {
                                setForm({
                                  ...form,
                                  email: event.target.value
                                })
                                setMessage('')
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="oc-field">
                          <div className="oc-field-heading">
                            <label htmlFor="oc-password">
                              Password
                            </label>

                            <button
                              type="button"
                              className="oc-text-button"
                              onClick={() =>
                                setMessage(
                                  'Password recovery will be added when authentication is connected.'
                                )
                              }
                            >
                              Forgot password?
                            </button>
                          </div>

                          <div className="oc-input-container">
                            <input
                              id="oc-password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter your password"
                              autoComplete="current-password"
                              value={form.password}
                              onChange={(event) => {
                                setForm({
                                  ...form,
                                  password: event.target.value
                                })
                                setMessage('')
                              }}
                              required
                            />

                            <button
                              type="button"
                              className="oc-show-password"
                              onClick={() =>
                                setShowPassword(!showPassword)
                              }
                              aria-label={
                                showPassword
                                  ? 'Hide password'
                                  : 'Show password'
                              }
                            >
                              {showPassword ? 'Hide' : 'Show'}
                            </button>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="oc-signin-button"
                        >
                          <span>Sign in to OmniCampus</span>
                          <span className="oc-button-arrow">→</span>
                        </button>

                        {message && (
                          <p
                            className="oc-form-message"
                            role="status"
                          >
                            {message}
                          </p>
                        )}
                      </form>

                      <div className="oc-register-section">
                        <p>
                          Your institution isn't registered yet?
                        </p>

                        <button
                          type="button"
                          className="oc-register-link"
                          onClick={() =>
                            setMessage(
                              'Institution registration will be available soon.'
                            )
                          }
                        >
                          Register your institution
                          <span>↗</span>
                        </button>
                      </div>
                    </div>

                    <div className="oc-form-footer">
                      <span>
                        © {new Date().getFullYear()} OmniCampus
                      </span>
                      <span>
                        Built for connected institutions
                      </span>
                    </div>
                  </section>
                </div>
              </main>
            )}
          </>
        }
      />
    </Routes>
  )
}

export default App
