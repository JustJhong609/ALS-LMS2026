import React, { useState } from 'react';
import {
  IonContent, IonPage, IonButton, IonInput, IonIcon,
  IonSpinner, IonRippleEffect, IonInputPasswordToggle,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { chevronBack, person, mail, lockClosed, callOutline, schoolOutline } from 'ionicons/icons';
import './Register.css';

type Role = 'student' | 'teacher';

const LEVELS = ['Elementary Level', 'Secondary Level (Junior HS)', 'Secondary Level (Senior HS)'];

const RegisterPage: React.FC = () => {
  const history = useHistory();

  const [role,       setRole]       = useState<Role>('student');
  const [step,       setStep]       = useState(1);
  const [firstName,  setFirstName]  = useState('');
  const [lastName,   setLastName]   = useState('');
  const [email,      setEmail]      = useState('');
  const [phone,      setPhone]      = useState('');
  const [password,   setPassword]   = useState('');
  const [confirm,    setConfirm]    = useState('');
  const [level,      setLevel]      = useState(LEVELS[0]);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');
  const [done,       setDone]       = useState(false);

  const nextStep = () => {
    setError('');
    if (step === 1) {
      if (!firstName.trim() || !lastName.trim() || !email.trim()) {
        setError('Please fill in all required fields.');
        return;
      }
    }
    if (step === 2) {
      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirm) {
        setError('Passwords do not match.');
        return;
      }
    }
    setStep((s) => s + 1);
  };

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <IonPage>
        <IonContent className="register-content">
          <div className="success-screen">
            <div className="success-icon">🎉</div>
            <h2 className="success-title">Account Created!</h2>
            <p className="success-sub">
              Welcome to ALS-LMS, <strong>{firstName}</strong>!<br />
              Your account is pending verification. You will receive a confirmation shortly.
            </p>
            <IonButton expand="block" className="success-btn" onClick={() => history.push('/login')}>
              Go to Sign In
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen className="register-content">

        {/* ── Top bar ── */}
        <div className="reg-topbar">
          <button className="back-btn ion-activatable" onClick={() => step > 1 ? setStep(s => s - 1) : history.push('/')}>
            <IonRippleEffect />
            <IonIcon icon={chevronBack} />
          </button>
          <div className="step-dots">
            {[1, 2, 3].map((s) => (
              <span key={s} className={`step-dot ${step >= s ? 'active' : ''}`} />
            ))}
          </div>
          <div style={{ width: 40 }} />
        </div>

        <div className="reg-header">
          <h2 className="reg-title">Create Account</h2>
          <p className="reg-sub">
            Step {step} of 3 — {step === 1 ? 'Personal Info' : step === 2 ? 'Set Password' : 'Learning Profile'}
          </p>
        </div>

        <div className="reg-body">

          {/* ── Role selector ── */}
          {step === 1 && (
            <>
              <p className="field-label">Register as</p>
              <div className="reg-role-row">
                <button
                  className={`reg-role-btn ion-activatable ${role === 'student' ? 'active' : ''}`}
                  onClick={() => setRole('student')}
                >
                  <IonRippleEffect />
                  🎓 Learner
                </button>
                <button
                  className={`reg-role-btn ion-activatable ${role === 'teacher' ? 'active' : ''}`}
                  onClick={() => setRole('teacher')}
                >
                  <IonRippleEffect />
                  👨‍🏫 Facilitator
                </button>
              </div>

              {/* Names */}
              <div className="reg-row">
                <div className="form-group half">
                  <p className="field-label">First Name <span className="req">*</span></p>
                  <div className="input-wrap">
                    <IonIcon icon={person} className="input-icon" />
                    <IonInput placeholder="Maria" value={firstName} onIonInput={(e) => setFirstName(e.detail.value ?? '')} className="als-field" />
                  </div>
                </div>
                <div className="form-group half">
                  <p className="field-label">Last Name <span className="req">*</span></p>
                  <div className="input-wrap">
                    <IonInput placeholder="Santos" value={lastName} onIonInput={(e) => setLastName(e.detail.value ?? '')} className="als-field" />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <p className="field-label">Email Address <span className="req">*</span></p>
                <div className="input-wrap">
                  <IonIcon icon={mail} className="input-icon" />
                  <IonInput type="email" placeholder="your@email.com" value={email} onIonInput={(e) => setEmail(e.detail.value ?? '')} className="als-field" />
                </div>
              </div>

              <div className="form-group">
                <p className="field-label">Mobile Number</p>
                <div className="input-wrap">
                  <IonIcon icon={callOutline} className="input-icon" />
                  <IonInput type="tel" placeholder="09XX XXX XXXX" value={phone} onIonInput={(e) => setPhone(e.detail.value ?? '')} className="als-field" />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <p className="field-label">Password <span className="req">*</span></p>
                <div className="input-wrap">
                  <IonIcon icon={lockClosed} className="input-icon" />
                  <IonInput type="password" placeholder="Min. 6 characters" value={password} onIonInput={(e) => setPassword(e.detail.value ?? '')} className="als-field">
                    <IonInputPasswordToggle slot="end" />
                  </IonInput>
                </div>
              </div>

              <div className="form-group">
                <p className="field-label">Confirm Password <span className="req">*</span></p>
                <div className="input-wrap">
                  <IonIcon icon={lockClosed} className="input-icon" />
                  <IonInput type="password" placeholder="Repeat password" value={confirm} onIonInput={(e) => setConfirm(e.detail.value ?? '')} className="als-field">
                    <IonInputPasswordToggle slot="end" />
                  </IonInput>
                </div>
              </div>

              {/* Password strength */}
              <div className="pw-strength">
                <p className="field-label" style={{ marginBottom: 8 }}>Password Strength</p>
                <div className="pw-bars">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`pw-bar ${password.length >= i * 2 ? 'filled' : ''}`} />
                  ))}
                </div>
                <p className="pw-hint">
                  {password.length === 0 ? 'Enter a password'
                    : password.length < 4 ? 'Weak'
                    : password.length < 7 ? 'Fair'
                    : password.length < 10 ? 'Good'
                    : 'Strong 💪'}
                </p>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              {role === 'student' && (
                <div className="form-group">
                  <p className="field-label">Learning Level</p>
                  <div className="level-list">
                    {LEVELS.map((l) => (
                      <button
                        key={l}
                        className={`level-item ion-activatable ${level === l ? 'active' : ''}`}
                        onClick={() => setLevel(l)}
                      >
                        <IonRippleEffect />
                        <IonIcon icon={schoolOutline} />
                        <span>{l}</span>
                        {level === l && <span className="level-check">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {role === 'teacher' && (
                <div className="form-group">
                  <p className="field-label">Teaching Assignment</p>
                  <div className="level-list">
                    {LEVELS.map((l) => (
                      <button
                        key={l}
                        className={`level-item ion-activatable ${level === l ? 'active' : ''}`}
                        onClick={() => setLevel(l)}
                      >
                        <IonRippleEffect />
                        <IonIcon icon={schoolOutline} />
                        <span>{l}</span>
                        {level === l && <span className="level-check">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="review-card">
                <p className="review-title">Account Summary</p>
                <div className="review-row"><span>Name</span><strong>{firstName} {lastName}</strong></div>
                <div className="review-row"><span>Email</span><strong>{email}</strong></div>
                <div className="review-row"><span>Role</span><strong>{role === 'student' ? 'Learner' : 'Facilitator'}</strong></div>
                <div className="review-row"><span>Level</span><strong>{level}</strong></div>
              </div>
            </>
          )}

          {/* ── Error ── */}
          {error && <div className="error-box">⚠️ {error}</div>}

          {/* ── Navigation ── */}
          {step < 3 ? (
            <IonButton expand="block" className="next-btn" onClick={nextStep}>
              Continue →
            </IonButton>
          ) : (
            <IonButton expand="block" className="next-btn" onClick={submit} disabled={loading}>
              {loading ? <IonSpinner name="crescent" /> : '🎉 Create My Account'}
            </IonButton>
          )}

          <p className="login-link">
            Already have an account?{' '}
            <button className="link-btn" onClick={() => history.push('/login')}>Sign In</button>
          </p>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
