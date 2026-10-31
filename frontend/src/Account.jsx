
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  MapPin,
  Pencil,
  Save,
  X,
  LayoutDashboard,
  Boxes,
  Handshake,
  ShieldCheck,
  GraduationCap,
  UserRound,
  Mail,
} from "lucide-react";
import "./Account.css";

const defaultCollege = {
  name: "Edward College of Engineering",
  code: "ECE-001",
  type: "Engineering College",
  university: "University of Mumbai",
  location: "Parel, Mumbai, Maharashtra",
  address: "Parel, Mumbai, Maharashtra, India",
  email: "admin@example.edu",
  phone: "+91 90000 00000",
  website: "https://example.edu",
  representative: "College Administrator",
  designation: "Institution Coordinator",
};

const profileFields = [
  { key: "name", label: "College Name", type: "text" },
  { key: "code", label: "Institution Code", type: "text" },
  { key: "type", label: "Institution Type", type: "text" },
  { key: "university", label: "University Affiliation", type: "text" },
  { key: "location", label: "Location", type: "text" },
  { key: "address", label: "Official Address", type: "text" },
  { key: "email", label: "Official Email", type: "email" },
  { key: "phone", label: "Contact Number", type: "tel" },
  { key: "website", label: "Official Website", type: "url" },
  {
    key: "representative",
    label: "Authorized Representative",
    type: "text",
  },
  {
    key: "designation",
    label: "Representative Designation",
    type: "text",
  },
];

function loadCollege() {
  try {
    const saved = localStorage.getItem("omnicampus-college-profile");

    if (!saved) {
      return { ...defaultCollege };
    }

    const parsed = JSON.parse(saved);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ...defaultCollege };
    }

    return { ...defaultCollege, ...parsed };
  } catch {
    return { ...defaultCollege };
  }
}

export default function Account() {
  const navigate = useNavigate();

  const [college, setCollege] = useState(loadCollege);
  const [draft, setDraft] = useState(() => ({ ...college }));
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const startEditing = () => {
    setDraft({ ...college });
    setMessage("");
    setEditing(true);
  };

  const cancelEditing = () => {
    setDraft({ ...college });
    setEditing(false);
  };

  const updateField = (key, value) => {
    setDraft((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const saveProfile = (event) => {
    event.preventDefault();

    const updated = Object.fromEntries(
      Object.entries(draft).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    );

    try {
      localStorage.setItem(
        "omnicampus-college-profile",
        JSON.stringify(updated)
      );

      setCollege(updated);
      setDraft(updated);
      setEditing(false);
      setMessage("College profile saved successfully.");
    } catch {
      setMessage("Unable to save changes in this browser.");
    }
  };

  const sections = [
    {
      title: "Institution Information",
      icon: Building2,
      details: [
        ["College Name", college.name],
        ["Institution Code", college.code],
        ["Institution Type", college.type],
        ["University Affiliation", college.university],
      ],
    },
    {
      title: "Contact Information",
      icon: Mail,
      details: [
        ["Location", college.location],
        ["Official Address", college.address],
        ["Official Email", college.email],
        ["Contact Number", college.phone],
        ["Official Website", college.website],
      ],
    },
    {
      title: "Authorized Representative",
      icon: UserRound,
      details: [
        ["Representative", college.representative],
        ["Designation", college.designation],
      ],
    },
  ];

  return (
    <div className="oca-page">
      {/* HEADER */}
      <header className="oca-header">
        <div className="oca-header-inner">
          <button
            type="button"
            className="oca-logo"
            onClick={() => navigate("/home")}
          >
            Omni<span>Campus</span>.
          </button>

          <button
            type="button"
            className="oca-back"
            onClick={() => navigate("/home")}
          >
            <ArrowLeft size={17} />
            Back to Home
          </button>
        </div>
      </header>

      <main className="oca-main">
        {/* PAGE HEADING */}
        <div className="oca-heading">
          <div>
            <span className="oca-eyebrow">
              INSTITUTIONAL ACCOUNT
            </span>

            <h1>My Account</h1>

            <p>
              Manage your college profile, institutional information,
              and resource network.
            </p>
          </div>

          {!editing && (
            <button
              type="button"
              className="oca-primary"
              onClick={startEditing}
            >
              <Pencil size={17} />
              Edit Profile
            </button>
          )}
        </div>

        {/* COLLEGE PROFILE */}
        <section className="oca-profile-card">
          <div className="oca-avatar">
            <Building2 size={35} strokeWidth={1.6} />
          </div>

          <div className="oca-profile-info">
            <span className="oca-profile-label">
              REGISTERED INSTITUTION · DEMO
            </span>

            <h2>{college.name}</h2>

            <p>
              <MapPin size={15} />
              {college.location}
            </p>
          </div>

          <span className="oca-status">
            <span className="oca-status-dot" />
            Demo Account
          </span>
        </section>

        {/* SAVE MESSAGE */}
        {message && (
          <div className="oca-success" role="status">
            <ShieldCheck size={18} />
            {message}
          </div>
        )}

        {/* EDIT FORM */}
        {editing ? (
          <form
            className="oca-edit-card"
            onSubmit={saveProfile}
          >
            <div className="oca-card-heading">
              <h2>Edit Institution Details</h2>
            </div>

            <div className="oca-form-grid">
              {profileFields.map((field) => (
                <label
                  key={field.key}
                  className="oca-field"
                >
                  <span>{field.label}</span>

                  <input
                    type={field.type}
                    value={draft[field.key] ?? ""}
                    onChange={(event) =>
                      updateField(
                        field.key,
                        event.target.value
                      )
                    }
                    required={
                      field.key === "name" ||
                      field.key === "email"
                    }
                  />
                </label>
              ))}
            </div>

            <div className="oca-form-actions">
              <button
                type="button"
                className="oca-secondary"
                onClick={cancelEditing}
              >
                <X size={17} />
                Cancel
              </button>

              <button
                type="submit"
                className="oca-primary"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          /* PROFILE DETAILS */
          <div className="oca-details-grid">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <section
                  className="oca-info-card"
                  key={section.title}
                >
                  <div className="oca-card-heading">
                    <div className="oca-card-icon">
                      <Icon size={21} />
                    </div>

                    <h2>{section.title}</h2>
                  </div>

                  <div className="oca-detail-list">
                    {section.details.map(([label, value]) => (
                      <div
                        className="oca-detail-row"
                        key={label}
                      >
                        <span>{label}</span>
                        <strong>
                          {value || "Not provided"}
                        </strong>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* COLLEGE WORKSPACE */}
        <section className="oca-shortcuts">
          <div className="oca-shortcuts-heading">
            <span className="oca-eyebrow">
              COLLEGE WORKSPACE
            </span>

            <h2>Manage Your Institution</h2>

            <p>
              Access the tools your college needs to share
              resources and collaborate with other institutions.
            </p>
          </div>

          <div className="oca-shortcut-grid">
            <button
              type="button"
              className="oca-shortcut"
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard size={25} />

              <strong>College Dashboard</strong>

              <span>
                Manage resources and incoming requests.
              </span>

              <ArrowUpRight
                size={18}
                className="oca-shortcut-arrow"
              />
            </button>

            <button
              type="button"
              className="oca-shortcut"
              onClick={() => navigate("/resources")}
            >
              <Boxes size={25} />

              <strong>Explore Resources</strong>

              <span>
                Discover resources listed by other colleges.
              </span>

              <ArrowUpRight
                size={18}
                className="oca-shortcut-arrow"
              />
            </button>

            <button
              type="button"
              className="oca-shortcut"
              onClick={() => navigate("/events")}
            >
              <Handshake size={25} />

              <strong>Collaborations</strong>

              <span>
                Explore inter-college events and partnerships.
              </span>

              <ArrowUpRight
                size={18}
                className="oca-shortcut-arrow"
              />
            </button>
          </div>
        </section>

        {/* DEMO NOTICE */}
        <div className="oca-demo-note">
          <GraduationCap size={18} />

          <span>
            This is a demonstration college account.
            Profile changes are stored in this browser
            until backend integration is implemented.
          </span>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="oca-footer">
        <strong>OmniCampus.</strong>

        <span>
          Connecting institutions. Creating opportunities.
        </span>

        <span>
          © {new Date().getFullYear()} OmniCampus
        </span>
      </footer>
    </div>
  );
}
