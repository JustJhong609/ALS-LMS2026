import React, { useState } from 'react';
import {
  IonContent, IonPage, IonButton, IonInput, IonItem, IonLabel,
  IonSegment, IonSegmentButton, IonIcon, IonSpinner, IonText, IonRippleEffect,
  IonInputPasswordToggle,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { person, lockClosed, chevronBack, schoolOutline, peopleOutline, shieldOutline } from 'ionicons/icons';
import { useAuth, AuthUser } from '../App';
import './Login.css';

type Role = 'student' | 'teacher' | 'admin';

/* ── Mock users for demo ── */
const MOCK_USERS: Record<Role, AuthUser> = {
  student: {
    id: 's001', name: 'Maria Santos', email: 'maria@als.edu.ph',
    role: 'student', avatar: 'MS', grade: 'Elementary Level',
  },
  teacher: {
    id: 't001', name: 'Juan Dela Cruz', email: 'juan@als.edu.ph',
    role: 'teacher', avatar: 'JD',
  },
  admin: {
    id: 'a001', name: 'Ana Reyes', email: 'ana@als.edu.ph',
    role: 'admin', avatar: 'AR',
  },
};

const ROLES: { key: Role; label: string; icon: string; color: string }[] = [
  { key: 'student', label: 'Learner',     icon: '🎓', color: '#1d4ed8' },
  { key: 'teacher', label: 'Facilitator', icon: '👨‍🏫', color: '#16a34a' },
  { key: 'admin',   label: 'Admin',       icon: '🛡️',  color: '#7c3aed' },
];

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();

  const [role,     setRole]     = useState<Role>('student');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    // Simulate async auth
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);

    // Demo: accept any non-empty credentials and use the selected role's mock user
    login(MOCK_USERS[role]);
  };

  const demoPin = (r: Role) => {
    setRole(r);
    setEmail(MOCK_USERS[r].email);
    setPassword('demo1234');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-content">

        {/* ── Top bar ── */}
        <div className="login-topbar">
          <button className="back-btn ion-activatable" onClick={() => history.push('/')}>
            <IonRippleEffect />
            <IonIcon icon={chevronBack} />
          </button>
        </div>

        {/* ── Header ── */}
        <div className="login-header">
          <div className="login-logo">📖</div>
          <h2 className="login-title">Welcome Back!</h2>
          <p className="login-sub">Sign in to continue learning</p>
        </div>

        {/* ── Role Selector ── */}
        <div className="login-body">
          <p className="field-label">I am a...</p>
          <div className="role-cards">
            {ROLES.map((r) => (
              <button
                key={r.key}
                className={`role-card ion-activatable ${role === r.key ? 'role-card--active' : ''}`}
                style={{ '--role-color': r.color } as React.CSSProperties}
                onClick={() => setRole(r.key)}
              >
                <IonRippleEffect />
                <span className="role-icon">{r.icon}</span>
                <span className="role-label">{r.label}</span>
              </button>
            ))}
          </div>

          {/* ── Email ── */}
          <div className="form-group">
            <p className="field-label">Email Address</p>
            <div className="input-wrap">
              <IonIcon icon={person} className="input-icon" />
              <IonInput
                type="email"
                placeholder="your@email.com"
                value={email}
                onIonInput={(e) => setEmail(e.detail.value ?? '')}
                className="als-field"
              />
            </div>
          </div>

          {/* ── Password ── */}
          <div className="form-group">
            <div className="field-label-row">
              <p className="field-label">Password</p>
              <button className="forgot-link">Forgot password?</button>
            </div>
            <div className="input-wrap">
              <IonIcon icon={lockClosed} className="input-icon" />
              <IonInput
                type="password"
                placeholder="••••••••"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value ?? '')}
                className="als-field"
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </div>
          </div>

          {/* ── Error ── */}
          {error && (
            <div className="error-box">
              <span>⚠️ {error}</span>
            </div>
          )}

          {/* ── Submit ── */}
          <IonButton
            expand="block"
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <IonSpinner name="crescent" /> : 'Sign In'}
          </IonButton>

          {/* ── Demo quick-login ── */}
          <div className="demo-section">
            <p className="demo-heading">Quick Demo Login</p>
            <div className="demo-pills">
              {ROLES.map((r) => (
                <button key={r.key} className="demo-pill ion-activatable" onClick={() => demoPin(r.key)}>
                  <IonRippleEffect />
                  {r.icon} {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Register link ── */}
          <p className="register-link">
            Don't have an account?{' '}
            <button className="register-btn" onClick={() => history.push('/register')}>
              Sign Up Free
            </button>
          </p>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
