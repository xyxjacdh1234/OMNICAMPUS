
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserRound,
  GraduationCap,
  Mail,
  Phone,
  Save,
} from "lucide-react";
import "./StudentProfile.css";

const STORAGE_KEY = "omnicampus_student_profile";

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      name: saved?.name || "",
      college: saved?.college || "",
      email: saved?.email || "",
      phone: saved?.phone || "",
    };
  } catch {
    return {
      name: "",
      college: "",
      email: "",
      phone: "",
    };
  }
}

export default function StudentProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(loadProfile);
  const [saved, setSaved] = useState(false);

  const updateField = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
    setSaved(false);
  };

  const saveProfile = (event) => {
    event.preventDefault();

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setSaved(true);
    } catch {
      setSaved(false);
      alert("Unable to save your profile in this browser.");
    }
  };

  return (
    <div className="student-profile-page">
      <header className="student-profile-header">
        <button
          className="student-profile-logo"
          onClick={() => navigate("/student/home")}
        >
          OmniCampus<span>.</span>
        </button>

        <button
          className="student-profile-back"
          onClick={() => navigate("/student/home")}
        >
          <ArrowLeft size={17} />
          Back to Student Home
        </button>
      </header>

      <main className="student-profile-main">
        <span className="student-profile-eyebrow">
          STUDENT PORTAL / MY ACCOUNT
        </span>

        <h1>
          My <em>Account.</em>
        </h1>

        <p className="student-profile-description">
          View and update your student profile information.
        </p>

        <section className="student-profile-card">
          <div className="student-profile-card-heading">
            <div className="student-profile-avatar">
              <UserRound size={30} />
            </div>

            <div>
              <h2>Student Information</h2>
              <p>Manage your personal and college details.</p>
            </div>
          </div>

          <form onSubmit={saveProfile}>
            <div className="student-profile-fields">
              <div className="student-profile-field">
                <label htmlFor="student-profile-name">
                  <UserRound size={16} />
                  Full Name
                </label>
                <input
                  id="student-profile-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={profile.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  required
                />
              </div>

              <div className="student-profile-field">
                <label htmlFor="student-profile-college">
                  <GraduationCap size={16} />
                  College Name
                </label>
                <input
                  id="student-profile-college"
                  type="text"
                  placeholder="Enter your college name"
                  value={profile.college}
                  onChange={(event) =>
                    updateField("college", event.target.value)
                  }
                  required
                />
              </div>

              <div className="student-profile-field">
                <label htmlFor="student-profile-email">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  id="student-profile-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={profile.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  required
                />
              </div>

              <div className="student-profile-field">
                <label htmlFor="student-profile-phone">
                  <Phone size={16} />
                  Phone Number
                </label>
                <input
                  id="student-profile-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={profile.phone}
                  onChange={(event) =>
                    updateField("phone", event.target.value)
                  }
                />
              </div>
            </div>

            <div className="student-profile-actions">
              {saved && (
                <span className="student-profile-success" role="status">
                  Profile saved successfully!
                </span>
              )}

              <button type="submit" className="student-profile-save">
                <Save size={17} />
                Save Changes
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="student-profile-footer">
        <span>OmniCampus.</span>
        <span>
          © {new Date().getFullYear()} OmniCampus
        </span>
      </footer>
    </div>
  );
}
