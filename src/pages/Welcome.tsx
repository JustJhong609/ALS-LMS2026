import React from 'react';
import {
  IonContent, IonPage, IonButton, IonImg, IonRippleEffect,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Welcome.css';

const features = [
  { icon: '📚', title: 'Interactive Lessons',     desc: 'Engaging modules for all ALS learners' },
  { icon: '📝', title: 'Online Assessments',      desc: 'Track mastery with real-time quizzes' },
  { icon: '📊', title: 'Progress Analytics',      desc: 'Visual reports for learners & teachers' },
  { icon: '🏆', title: 'Certificates & Badges',   desc: 'Celebrate every achievement earned' },
];

const WelcomePage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false} className="welcome-content">

        {/* ── Hero Section ── */}
        <div className="hero-section">
          <div className="hero-blob blob1" />
          <div className="hero-blob blob2" />
          <div className="hero-blob blob3" />

          <div className="hero-inner">
            {/* Logo */}
            <div className="logo-wrap">
              <div className="logo-icon">
                <span>📖</span>
              </div>
            </div>

            {/* Branding */}
            <h1 className="app-title">ALS <span className="title-accent">LMS</span></h1>
            <p className="app-subtitle">Alternative Learning System</p>
            <p className="app-tagline">
              Empowering every Filipino learner — anytime, anywhere.
            </p>

            {/* Stats row */}
            <div className="hero-stats">
              <div className="stat-pill">
                <span className="stat-num">12K+</span>
                <span className="stat-lbl">Learners</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-pill">
                <span className="stat-num">480+</span>
                <span className="stat-lbl">Facilitators</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-pill">
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
                <span className="feature-icon">{f.icon}</span>
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
            className="cta-primary"
            onClick={() => history.push('/login')}
          >
            Sign In to My Account
          </IonButton>

          <IonButton
            expand="block"
            fill="outline"
            className="cta-secondary"
            onClick={() => history.push('/register')}
          >
            Create New Account
          </IonButton>

          <p className="cta-hint">
            Part of the <strong>DepEd Alternative Learning System</strong> digital initiative
          </p>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
