import React, { useState } from 'react';
import {
  IonContent, IonPage, IonButton, IonInput, IonIcon,
  IonInputPasswordToggle, IonLoading, IonAlert, IonSelect, IonSelectOption, IonRippleEffect,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  person, lockClosed, schoolOutline, peopleOutline,
  shieldOutline, locationOutline, bookOutline, caretDownOutline,
} from 'ionicons/icons';
import { useAuth, AuthUser } from '../App';
import './Login.css';

type Role = 'student' | 'teacher' | 'admin';

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
  { key: 'student', label: 'Learner',     icon: schoolOutline,  color: '#1d4ed8' },
  { key: 'teacher', label: 'Facilitator', icon: peopleOutline,  color: '#16a34a' },
  { key: 'admin',   label: 'Admin',       icon: shieldOutline,  color: '#7c3aed' },
];

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();

  const [role,     setRole]     = useState<Role>('student');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      setShowError(true);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    login(MOCK_USERS[role]);
    const dest =
      role === 'student' ? '/student/dashboard' :
      role === 'teacher' ? '/teacher/dashboard' :
      '/admin/dashboard';
    history.replace(dest);
  };

  const demoPin = (r: Role) => {
    setRole(r);
    setEmail(MOCK_USERS[r].email);
    setPassword('demo1234');
    // auto-login immediately
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(MOCK_USERS[r]);
      const dest =
        r === 'student' ? '/student/dashboard' :
        r === 'teacher' ? '/teacher/dashboard' :
        '/admin/dashboard';
      history.replace(dest);
    }, 800);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-content">

        <IonLoading isOpen={loading} message="Signing in..." spinner="crescent" cssClass="als-loading" />

        <IonAlert
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          header="Sign In Error"
          message={error}
          buttons={['OK']}
          cssClass="als-alert"
        />

        {/* ── Header ── */}
        <div className="login-header">
          <div className="login-logo">
            <IonIcon icon={bookOutline} className="logo-ion-icon" />
          </div>
          <h2 className="login-title">Welcome Back!</h2>
          <p className="login-sub">
            <IonIcon icon={locationOutline} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Manolo Fortich District I — Sign in to continue
          </p>
        </div>

        {/* ── Body ── */}
        <div className="login-body">

          {/* ── Role Dropdown ── */}
          <div className="form-group">
            <p className="field-label">I am a...</p>
            <div className="input-wrap role-select-wrap">
              <IonIcon icon={ROLES.find(r => r.key === role)?.icon ?? schoolOutline} className="input-icon" style={{ color: ROLES.find(r => r.key === role)?.color }} />
              <IonSelect
                value={role}
                onIonChange={(e) => setRole(e.detail.value as Role)}
                interface="action-sheet"
                placeholder="Select your role"
                className="als-field als-select"
              >
                {ROLES.map((r) => (
                  <IonSelectOption key={r.key} value={r.key}>{r.label}</IonSelectOption>
                ))}
              </IonSelect>
              <IonIcon icon={caretDownOutline} className="select-caret" />
            </div>
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

          {/* ── Submit ── */}
          <IonButton
            expand="block"
            shape="round"
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            Sign In
          </IonButton>

          {/* ── Demo quick-login ── */}
          <div className="demo-section">
            <p className="demo-heading">Quick Demo Login</p>
            <div className="demo-pills">
              {ROLES.map((r) => (
                <button key={r.key} className="demo-pill ion-activatable" onClick={() => demoPin(r.key)}>
                  <IonRippleEffect />
                  <IonIcon icon={r.icon} style={{ color: r.color, fontSize: 15, verticalAlign: 'middle', marginRight: 4 }} />
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <p className="register-link">
            Don't have an account?{' '}
            <button className="register-btn" onClick={() => history.push('/register')}>
              Sign Up Free
            </button>
            &nbsp;·&nbsp;
            <button className="register-btn" onClick={() => history.push('/')}>
              Home
            </button>
          </p>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
