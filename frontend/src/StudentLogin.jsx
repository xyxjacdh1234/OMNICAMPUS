
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
} from "lucide-react";
import "./StudentLogin.css";

export default function StudentLogin() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    collegeCode: "",
    password: "",
  });

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
    setMessage("");
  };

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setMouse({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 12,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 12,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mode === "register") {
      if (
        !form.name.trim() ||
        !form.email.trim() ||
        !/^\d{10}$/.test(form.phone) ||
        !form.collegeCode.trim() ||
        form.password.length < 8
      ) {
        setMessage(
          "Please complete all fields. Use a 10-digit mobile number and a password of at least 8 characters."
        );
        return;
      }

      // Demo-only registration. No credentials are stored.
      // Backend registration and college-code verification come later.
      setMode("login");
      setForm((previous) => ({
        ...previous,
        password: "",
      }));
      setMessage(
        "Registration form validated. Account creation will be enabled when the backend is connected."
      );
      return;
    }

    if (!form.email.trim() || !form.password) {
      setMessage("Please enter your student credentials.");
      return;
    }

    // Demo navigation only. Not real authentication.
    navigate("/student/home");
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setShowPassword(false);
    setMessage("");
  };

  return (
    <main className="student-auth-page">
      <div className="student-auth-shell">

        {/* LEFT BRAND PANEL */}
        <section
          className="student-brand-panel"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        >
          <div className="student-brand-header">
            <span className="student-brand-name">
              OmniCampus
            </span>
            <span className="student-brand-edition">
              STUDENT NETWORK
            </span>
          </div>

          <div
            className="student-visual"
            style={{
              transform: `translate(${mouse.x}px, ${mouse.y}px)`,
            }}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 500 360"
              className="student-network"
              fill="none"
            >
              <path
                d="M48 205 L160 105 L288 165 L420 68"
                className="student-network-line"
              />
              <path
                d="M48 205 L175 280 L288 165 L445 280"
                className="student-network-line"
              />
              <path
                d="M160 105 L175 280"
                className="student-network-line student-network-secondary"
              />
              <path
                d="M288 165 L445 280 L420 68"
                className="student-network-line student-network-secondary"
              />

              {[
                [48, 205],
                [160, 105],
                [175, 280],
                [420, 68],
                [445, 280],
              ].map(([cx, cy]) => (
                <circle
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r="6"
                  className="student-node"
                />
              ))}

              <circle
                cx="288"
                cy="165"
                r="29"
                className="student-center-ring"
              />
              <circle
                cx="288"
                cy="165"
                r="7"
                className="student-center-node"
              />
            </svg>
          </div>

          <div className="student-brand-content">
            <div className="student-section-index">
              <span className="student-index-line" />
              YOUR CAMPUS. YOUR COMMUNITY.
            </div>

            <h2>
              Learn together.
              <br />
              <em>Grow beyond boundaries.</em>
            </h2>

            <p>
              Discover opportunities, connect with students
              across institutions, and build something
              extraordinary together.
            </p>
          </div>

          <div className="student-brand-footer">
            <span>DISCOVER</span>
            <span className="student-footer-dot" />
            <span>CONNECT</span>
            <span className="student-footer-dot" />
            <span>GROW</span>
          </div>
        </section>

        {/* RIGHT FORM PANEL */}
        <section className="student-form-panel">
          <div className="student-form-top">
            <button
              type="button"
              className="student-back-button"
              onClick={() => navigate("/choose-role")}
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <span className="student-secure-indicator">
              <span className="student-secure-dot" />
              STUDENT ACCESS
            </span>
          </div>

          <div className="student-form-content">
            <div className="student-form-intro">
              <div className="student-form-kicker">
                <GraduationCap size={17} />
                YOUR STUDENT WORKSPACE
              </div>

              <h1>
                {mode === "login" ? (
                  <>
                    Welcome <em>back.</em>
                  </>
                ) : (
                  <>
                    Join <em>OmniCampus.</em>
                  </>
                )}
              </h1>

              <p>
                {mode === "login"
                  ? "Sign in to explore a world of opportunities beyond your campus."
                  : "Create your student profile and connect with your college network."}
              </p>
            </div>

            <div className="student-auth-tabs">
              <button
                type="button"
                className={mode === "login" ? "active" : ""}
                onClick={() => switchMode("login")}
              >
                Sign In
              </button>

              <button
                type="button"
                className={mode === "register" ? "active" : ""}
                onClick={() => switchMode("register")}
              >
                Register
              </button>
            </div>

            <form
              className="student-login-form"
              onSubmit={handleSubmit}
            >
              {mode === "register" && (
                <div className="student-field">
                  <label htmlFor="student-name">
                    Full name
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    required
                  />
                </div>
              )}

              <div className="student-field">
                <label htmlFor="student-email">
                  Student email
                </label>
                <input
                  id="student-email"
                  type="email"
                  placeholder="student@college.edu"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  required
                />
              </div>

              {mode === "register" && (
                <>
                  <div className="student-field">
                    <label htmlFor="student-phone">
                      Mobile number
                    </label>
                    <input
                      id="student-phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(event) =>
                        updateField(
                          "phone",
                          event.target.value.replace(/\D/g, "")
                        )
                      }
                      required
                    />
                  </div>

                  <div className="student-field">
                    <label htmlFor="student-college-code">
                      College unique code
                    </label>
                    <input
                      id="student-college-code"
                      type="text"
                      placeholder="Enter your college code"
                      value={form.collegeCode}
                      onChange={(event) =>
                        updateField(
                          "collegeCode",
                          event.target.value.toUpperCase()
                        )
                      }
                      required
                    />
                    <small>
                      This code will link your account to your college.
                    </small>
                  </div>
                </>
              )}

              <div className="student-field">
                <div className="student-field-heading">
                  <label htmlFor="student-password">
                    Password
                  </label>

                  {mode === "login" && (
                    <button
                      type="button"
                      className="student-text-button"
                      onClick={() =>
                        setMessage(
                          "Password recovery will be available when authentication is connected."
                        )
                      }
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <div className="student-password-wrap">
                  <input
                    id="student-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={
                      mode === "register"
                        ? "Create a password (min. 8 characters)"
                        : "Enter your password"
                    }
                    autoComplete={
                      mode === "register"
                        ? "new-password"
                        : "current-password"
                    }
                    minLength={mode === "register" ? 8 : undefined}
                    value={form.password}
                    onChange={(event) =>
                      updateField("password", event.target.value)
                    }
                    required
                  />

                  <button
                    type="button"
                    className="student-show-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="student-signin-button"
              >
                <span>
                  {mode === "login"
                    ? "Sign in as Student"
                    : "Create Student Account"}
                </span>
                <ArrowRight size={19} />
              </button>

              {message && (
                <p className="student-form-message" role="status">
                  {message}
                </p>
              )}
            </form>

            <div className="student-register-section">
              {mode === "login" ? (
                <p>
                  New to OmniCampus?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("register")}
                  >
                    Create an account
                  </button>
                </p>
              ) : (
                <p>
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>

          <div className="student-form-footer">
            <span>
              © {new Date().getFullYear()} OmniCampus
            </span>
            <span>Built for connected students</span>
          </div>
        </section>
      </div>
    </main>
  );
}
