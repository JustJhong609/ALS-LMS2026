import React from 'react';
import {
  IonContent, IonPage, IonButton, IonRippleEffect, IonIcon,
} from '@ionic/react';
import {
  bookOutline, createOutline, statsChartOutline, ribbonOutline,
  locationOutline, logInOutline, personAddOutline, schoolOutline,
  peopleOutline, checkmarkDoneOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Welcome.css';

const features = [
  { icon: bookOutline,       title: 'Interactive Lessons',     desc: 'Engaging modules for all ALS learners',  color: '#1d4ed8' },
  { icon: createOutline,     title: 'Online Assessments',      desc: 'Track mastery with real-time quizzes',   color: '#7c3aed' },
  { icon: statsChartOutline,  title: 'Progress Analytics',      desc: 'Visual reports for learners & teachers', color: '#16a34a' },
  { icon: ribbonOutline,     title: 'Certificates & Badges',   desc: 'Celebrate every achievement earned',     color: '#f59e0b' },
];

const WelcomePage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen className="welcome-content">

        {/* ── Hero Section ── */}
        <div className="hero-section">
          <div className="hero-blob blob1" />
          <div className="hero-blob blob2" />
          <div className="hero-blob blob3" />

          <div className="hero-inner">
            {/* Logo */}
            <div className="logo-wrap">
              <div className="logo-icon">
                <IonIcon icon={schoolOutline} className="logo-ion-icon" />
              </div>
            </div>

            {/* Branding */}
            <h1 className="app-title">ALS <span className="title-accent">LMS</span></h1>
            <p className="app-subtitle">Alternative Learning System</p>
            <p className="app-tagline">
              <IonIcon icon={locationOutline} className="tagline-icon" />
              Manolo Fortich District I, Bukidnon
            </p>

            {/* Stats row */}
            <div className="hero-stats">
              <div className="stat-pill">
                <IonIcon icon={peopleOutline} className="stat-icon" />
                <span className="stat-num">12K+</span>
                <span className="stat-lbl">Learners</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-pill">
                <IonIcon icon={schoolOutline} className="stat-icon" />
                <span className="stat-num">480+</span>
                <span className="stat-lbl">Facilitators</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-pill">
                <IonIcon icon={checkmarkDoneOutline} className="stat-icon" />
                <span className="stat-num">95%</span>
                <span className="stat-lbl">Pass Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature Cards ── */}
        <div className="features-section">
          <p className="features-heading">Everything you need to learn & grow</p>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card ion-activatable">
                <IonRippleEffect />
                <div className="feature-icon-wrap" style={{ background: `${f.color}18` }}>
                  <IonIcon icon={f.icon} style={{ color: f.color, fontSize: 24 }} />
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Buttons ── */}
        <div className="cta-section">
          <IonButton
            expand="block"
            shape="round"
            className="cta-primary"
            onClick={() => history.push('/login')}
          >
            <IonIcon icon={logInOutline} slot="start" />
            Sign In to My Account
          </IonButton>

          <IonButton
            expand="block"
            fill="outline"
            shape="round"
            className="cta-secondary"
            onClick={() => history.push('/register')}
          >
            <IonIcon icon={personAddOutline} slot="start" />
            Create New Account
          </IonButton>

          <p className="cta-hint">
            <IonIcon icon={locationOutline} className="hint-icon" />
            Serving barangays of <strong>Manolo Fortich District I</strong> — DepEd ALS
          </p>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
