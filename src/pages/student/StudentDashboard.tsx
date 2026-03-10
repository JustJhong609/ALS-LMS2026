import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonRefresher,
  IonRefresherContent, IonSkeletonText, IonRippleEffect, IonIcon, IonBadge,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { notificationsOutline, chevronForward, trophyOutline, timeOutline, bookOutline, checkmarkCircle, clipboardOutline } from 'ionicons/icons';
import { useAuth } from '../../App';
import './StudentDashboard.css';

/* ── Mock data ── */
const ANNOUNCEMENTS = [
  { id: 1, title: 'ALS A&E Exam Schedule — District I, Manolo Fortich', date: 'Mar 15, 2026', type: 'alert', color: '#dc2626' },
  { id: 2, title: 'New LS 3 (Math) modules available for self-study',    date: 'Mar 10, 2026', type: 'info',  color: '#1d4ed8' },
  { id: 3, title: 'Face-to-Face session at Brgy. San Miguel CLC',        date: 'Mar 13, 2026', type: 'info',  color: '#16a34a' },
];

const LEARNING_STRANDS = [
  { id: 'ls1', subject: 'LS 1 — Communication Skills (Filipino)', progress: 72, lessons: 18, done: 13, color: '#1d4ed8', icon: '🇵🇭' },
  { id: 'ls2', subject: 'LS 2 — Communication Skills (English)',  progress: 55, lessons: 16, done: 9,  color: '#16a34a', icon: '🗣️' },
  { id: 'ls3', subject: 'LS 3 — Mathematical & Problem-Solving',  progress: 88, lessons: 20, done: 17, color: '#7c3aed', icon: '🔢' },
  { id: 'ls4', subject: 'LS 4 — Life and Career Skills',          progress: 40, lessons: 15, done: 6,  color: '#d97706', icon: '💼' },
  { id: 'ls5', subject: 'LS 5 — Understanding Self & Society',    progress: 60, lessons: 12, done: 7,  color: '#0891b2', icon: '🌏' },
  { id: 'ls6', subject: 'LS 6 — Digital Citizenship',             progress: 20, lessons: 10, done: 2,  color: '#be185d', icon: '💻' },
];

const FLT_STATUS = {
  taken: true,
  classification: 'Elementary Level',
  score: 78,
  date: 'Feb 20, 2026',
};

const UPCOMING = [
  { id: 'q1', title: 'LS 3 — Fractions Quiz',            date: 'Mar 12',   type: 'quiz' },
  { id: 'q2', title: 'LS 4 — Life Skills Assessment',    date: 'Mar 17',   type: 'assessment' },
  { id: 'q3', title: 'LS 2 — Essay Submission',          date: 'Mar 20',   type: 'activity' },
];

const typeColor: Record<string, string> = {
  quiz:       '#7c3aed',
  assessment: '#dc2626',
  activity:   '#16a34a',
};

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const history  = useHistory();
  const [loading, setLoading] = useState(false);

  const overall = Math.round(
    LEARNING_STRANDS.reduce((s, c) => s + c.progress, 0) / LEARNING_STRANDS.length
  );

  const doRefresh = async (e: CustomEvent) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    (e.target as HTMLIonRefresherElement).complete();
  };

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <div className="dash-toolbar">
            <div className="dash-greet">
              <p className="greet-label">Good morning 👋</p>
              <h1 className="greet-name">{user?.name}</h1>
              <span className="greet-badge">{user?.grade ?? 'Alternative Learning System'}</span>
            </div>
            <div className="dash-actions">
              <button className="notif-btn ion-activatable" onClick={() => {}}>
                <IonRippleEffect />
                <IonIcon icon={notificationsOutline} />
                <IonBadge color="danger" className="notif-badge">3</IonBadge>
              </button>
              <div className="dash-avatar">{user?.avatar}</div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="dash-content">
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <div className="dash-body">

          {/* ── Overall Progress Card ── */}
          <div className="overall-card">
            <div className="overall-left">
              <p className="overall-label">Overall Progress</p>
              <p className="overall-pct">{overall}%</p>
              <p className="overall-sub">Keep it up! You're doing great.</p>
            </div>
            <div className="overall-ring">
              <svg viewBox="0 0 80 80" width="80" height="80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                <circle
                  cx="40" cy="40" r="34"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 34 * overall / 100} ${2 * Math.PI * 34 * (1 - overall / 100)}`}
                  strokeLinecap="round"
                  strokeDashoffset={2 * Math.PI * 34 * 0.25}
                />
                <text x="40" y="46" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">{overall}%</text>
              </svg>
            </div>
          </div>

          {/* ── Quick Stats ── */}
          <div className="quick-stats">
            <div className="qstat-card">
              <IonIcon icon={bookOutline} className="qstat-icon" style={{ color: '#1d4ed8' }} />
              <p className="qstat-num">{LEARNING_STRANDS.length}</p>
              <p className="qstat-lbl">Learning Strands</p>
            </div>
            <div className="qstat-card">
              <IonIcon icon={checkmarkCircle} className="qstat-icon" style={{ color: '#16a34a' }} />
              <p className="qstat-num">54</p>
              <p className="qstat-lbl">Modules Done</p>
            </div>
            <div className="qstat-card">
              <IonIcon icon={clipboardOutline} className="qstat-icon" style={{ color: '#d97706' }} />
              <p className="qstat-num">{FLT_STATUS.classification.split(' ')[0]}</p>
              <p className="qstat-lbl">FLT Level</p>
            </div>
            <div className="qstat-card">
              <IonIcon icon={timeOutline} className="qstat-icon" style={{ color: '#7c3aed' }} />
              <p className="qstat-num">18h</p>
              <p className="qstat-lbl">Study Time</p>
            </div>
          </div>

          {/* ── FLT Status Card ── */}
          <div className="section-wrap">
            <div className="section-title-row">
              <p className="section-title">Functional Literacy Test</p>
              <button className="see-all" onClick={() => history.push('/student/assessment')}>
                {FLT_STATUS.taken ? 'View Results' : 'Take FLT'} <IonIcon icon={chevronForward} />
              </button>
            </div>
            <div className="flt-status-card" style={{ borderLeft: `4px solid ${FLT_STATUS.taken ? '#16a34a' : '#d97706'}` }}>
              <div className="flt-info">
                <p className="flt-label">{FLT_STATUS.taken ? '✅ FLT Completed' : '⏳ FLT Not Yet Taken'}</p>
                {FLT_STATUS.taken && (
                  <>
                    <p className="flt-class">Classification: <strong>{FLT_STATUS.classification}</strong></p>
                    <p className="flt-date">Score: {FLT_STATUS.score}% · Taken {FLT_STATUS.date}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── Learning Pathway Toggle ── */}
          <div className="section-wrap">
            <p className="section-title">Learning Pathway</p>
            <div className="pathway-toggle">
              <button className="pathway-btn pathway-active">📖 Guided Learning</button>
              <button className="pathway-btn">🎯 Challenge Mode</button>
            </div>
            <p className="pathway-desc">Guided mode: step-by-step mastery of each learning strand module.</p>
          </div>

          {/* ── Announcements ── */}
          <div className="section-wrap">
            <div className="section-title-row">
              <p className="section-title">Announcements</p>
            </div>
            <div className="ann-list">
              {ANNOUNCEMENTS.map((a) => (
                <div key={a.id} className="ann-item" style={{ '--ann-color': a.color } as React.CSSProperties}>
                  <div className="ann-dot" />
                  <div className="ann-body">
                    <p className="ann-title">{a.title}</p>
                    <p className="ann-date">{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── My Learning Strands ── */}
          <div className="section-wrap">
            <div className="section-title-row">
              <p className="section-title">My Learning Strands</p>
              <button className="see-all" onClick={() => history.push('/student/courses')}>
                See All <IonIcon icon={chevronForward} />
              </button>
            </div>
            <div className="courses-list">
              {LEARNING_STRANDS.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  className="course-card ion-activatable"
                  onClick={() => history.push(`/student/course/${c.id}`)}
                >
                  <IonRippleEffect />
                  <div className="course-icon-wrap" style={{ background: c.color + '18' }}>
                    <span style={{ fontSize: 24 }}>{c.icon}</span>
                  </div>
                  <div className="course-info">
                    <p className="course-name">{c.subject}</p>
                    <div className="als-progress-track" style={{ marginTop: 6 }}>
                      <div className="als-progress-fill" style={{ width: `${c.progress}%`, background: c.color }} />
                    </div>
                    <p className="course-meta">{c.done}/{c.lessons} modules · {c.progress}%</p>
                  </div>
                  <IonIcon icon={chevronForward} className="course-arrow" />
                </div>
              ))}
            </div>
          </div>

          {/* ── Upcoming ── */}
          <div className="section-wrap">
            <p className="section-title">Upcoming Activities</p>
            <div className="upcoming-list">
              {UPCOMING.map((u) => (
                <div key={u.id} className="upcoming-item">
                  <div className="upcoming-type-dot" style={{ background: typeColor[u.type] }} />
                  <div className="upcoming-info">
                    <p className="upcoming-title">{u.title}</p>
                    <span className="als-badge als-badge-blue">{u.type}</span>
                  </div>
                  <p className="upcoming-date">{u.date}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default StudentDashboard;
