import React, { useState } from 'react';
import {
  IonContent, IonPage, IonButton, IonInput, IonIcon,
  IonRippleEffect, IonInputPasswordToggle,
  IonSelect, IonSelectOption, IonLoading, IonAlert,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { person, mail, lockClosed, callOutline, schoolOutline, locationOutline, chevronBack } from 'ionicons/icons';
import './Register.css';

type Role = 'student' | 'teacher';

const LEVELS = ['Elementary Level', 'Secondary Level (Junior HS)', 'Secondary Level (Senior HS)', 'BLP (Basic Literacy Program)'];

const BARANGAYS = [
  'San Miguel',
  'Dicklum',
  'Sto. Niño',
  'Ticala',
  'Tankulan',
  'Tankulan-Gaboc',
  'Gaboc',
  'Lingion',
];

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
  const [level,      setLevel]      = useState('');
  const [barangay,   setBarangay]   = useState('');
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');
  const [done,       setDone]       = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setShowSuccess(true);
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
            <IonButton expand="block" shape="round" className="success-btn" onClick={() => history.push('/login')}>
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

        <IonLoading isOpen={loading} message="Creating your account..." spinner="crescent" cssClass="als-loading" />

        <IonAlert
          isOpen={showSuccess}
          header="Account Created! 🎉"
          message={`Welcome, ${firstName}! Your account is pending verification.`}
          buttons={[{ text: 'Go to Sign In', handler: () => { setShowSuccess(false); setDone(true); } }]}
          cssClass="als-alert"
        />

        {/* ── Top bar — step nav only ── */}
        <div className="reg-topbar">
          <button
            className="back-btn ion-activatable"
            onClick={() => step > 1 ? setStep(s => s - 1) : history.push('/')}
            aria-label="Back"
          >
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
          <p className="reg-district-badge">📍 Manolo Fortich District I</p>
        </div>

        <div className="reg-body">

          {/* ── Step 1: Personal Info ── */}
          {step === 1 && (
            <div className="step-animate">
              <p className="field-label">Register as</p>
              <div className="reg-role-row">
                <button className={`reg-role-btn ion-activatable ${role === 'student' ? 'active' : ''}`} onClick={() => setRole('student')}>
                  <IonRippleEffect /> 🎓 Learner
                </button>
                <button className={`reg-role-btn ion-activatable ${role === 'teacher' ? 'active' : ''}`} onClick={() => setRole('teacher')}>
                  <IonRippleEffect /> 👨‍🏫 Facilitator
                </button>
              </div>

              <div className="reg-row">
                <div className="form-group half">
                  <p className="field-label">First Name <span className="req">*</span></p>
                  <div className="input-wrap">
                    <IonIcon icon={person} className="input-icon" />
                    <IonInput placeholder="First name" value={firstName} onIonInput={(e) => setFirstName(e.detail.value ?? '')} className="als-field" />
                  </div>
                </div>
                <div className="form-group half">
                  <p className="field-label">Last Name <span className="req">*</span></p>
                  <div className="input-wrap">
                    <IonInput placeholder="Last name" value={lastName} onIonInput={(e) => setLastName(e.detail.value ?? '')} className="als-field" />
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

              <div className="form-group">
                <p className="field-label">Barangay <span className="req">*</span></p>
                <div className="input-wrap">
                  <IonIcon icon={locationOutline} className="input-icon" />
                  <IonSelect
                    value={barangay}
                    placeholder="Select barangay"
                    onIonChange={(e) => setBarangay(e.detail.value)}
                    className="als-field als-select"
                    interface="action-sheet"
                    interfaceOptions={{ header: 'Select Barangay — District I' }}
                  >
                    {BARANGAYS.map((b) => (
                      <IonSelectOption key={b} value={b}>{b}</IonSelectOption>
                    ))}
                  </IonSelect>
                </div>
                <p className="district-note">📍 District I — Manolo Fortich, Bukidnon</p>
              </div>
            </div>
          )}

          {/* ── Step 2: Password ── */}
          {step === 2 && (
            <div className="step-animate">
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
            </div>
          )}

          {/* ── Step 3: Profile + Review ── */}
          {step === 3 && (
            <div className="step-animate">
              <div className="form-group">
                <p className="field-label">{role === 'student' ? 'Learning Level' : 'Teaching Assignment'}</p>
                <div className="input-wrap">
                  <IonIcon icon={schoolOutline} className="input-icon" />
                  <IonSelect
                    value={level}
                    placeholder="Select level / program"
                    onIonChange={(e) => setLevel(e.detail.value)}
                    className="als-field als-select"
                    interface="action-sheet"
                    interfaceOptions={{ header: 'Select Level' }}
                  >
                    {LEVELS.map((l) => (
                      <IonSelectOption key={l} value={l}>{l}</IonSelectOption>
                    ))}
                  </IonSelect>
                </div>
              </div>

              <div className="review-card">
                <p className="review-title">Account Summary</p>
                <div className="review-row"><span>Name</span><strong>{firstName} {lastName}</strong></div>
                <div className="review-row"><span>Email</span><strong>{email}</strong></div>
                <div className="review-row"><span>Role</span><strong>{role === 'student' ? 'Learner' : 'Facilitator'}</strong></div>
                <div className="review-row"><span>Level</span><strong>{level || '—'}</strong></div>
                <div className="review-row"><span>Barangay</span><strong>{barangay || '—'}</strong></div>
                <div className="review-row"><span>District</span><strong>District I — Manolo Fortich</strong></div>
              </div>
            </div>
          )}

          {error && <div className="error-box animate-shake">⚠️ {error}</div>}

          {step < 3 ? (
            <IonButton expand="block" shape="round" className="next-btn" onClick={nextStep}>
              Continue →
            </IonButton>
          ) : (
            <IonButton expand="block" shape="round" className="next-btn" onClick={submit} disabled={loading}>
              🎉 Create My Account
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
