import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonRefresher,
  IonRefresherContent, IonSkeletonText, IonRippleEffect, IonIcon, IonBadge,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { notificationsOutline, chevronForward, trophyOutline, timeOutline, bookOutline, checkmarkCircle } from 'ionicons/icons';
import { useAuth } from '../../App';
import './StudentDashboard.css';

/* ── Mock data ── */
const ANNOUNCEMENTS = [
  { id: 1, title: 'ALS Accreditation & Equivalency Exam', date: 'Mar 15, 2026', type: 'alert', color: '#dc2626' },
  { id: 2, title: 'New lesson modules are now available',  date: 'Mar 10, 2026', type: 'info',  color: '#1d4ed8' },
];

const ENROLLED_COURSES = [
  { id: 'c1', subject: 'Communication Arts (Filipino)', progress: 72, lessons: 18, done: 13, color: '#1d4ed8', icon: '🇵🇭' },
  { id: 'c2', subject: 'Communication Arts (English)',  progress: 55, lessons: 16, done: 9,  color: '#16a34a', icon: '🗣️' },
  { id: 'c3', subject: 'Mathematics',                   progress: 88, lessons: 20, done: 17, color: '#7c3aed', icon: '🔢' },
  { id: 'c4', subject: 'Science',                       progress: 40, lessons: 15, done: 6,  color: '#d97706', icon: '🔬' },
];

const UPCOMING = [
  { id: 'q1', title: 'Math — Fractions Quiz',        date: 'Mar 12',   type: 'quiz' },
  { id: 'q2', title: 'Science — Unit 2 Assessment',  date: 'Mar 17',   type: 'assessment' },
  { id: 'q3', title: 'English — Essay Submission',   date: 'Mar 20',   type: 'activity' },
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
    ENROLLED_COURSES.reduce((s, c) => s + c.progress, 0) / ENROLLED_COURSES.length
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
              <p className="qstat-num">{ENROLLED_COURSES.length}</p>
              <p className="qstat-lbl">Subjects</p>
            </div>
            <div className="qstat-card">
              <IonIcon icon={checkmarkCircle} className="qstat-icon" style={{ color: '#16a34a' }} />
              <p className="qstat-num">45</p>
              <p className="qstat-lbl">Lessons Done</p>
            </div>
            <div className="qstat-card">
              <IonIcon icon={trophyOutline} className="qstat-icon" style={{ color: '#d97706' }} />
              <p className="qstat-num">7</p>
              <p className="qstat-lbl">Badges</p>
            </div>
            <div className="qstat-card">
              <IonIcon icon={timeOutline} className="qstat-icon" style={{ color: '#7c3aed' }} />
              <p className="qstat-num">18h</p>
              <p className="qstat-lbl">Study Time</p>
            </div>
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

          {/* ── My Courses ── */}
          <div className="section-wrap">
            <div className="section-title-row">
              <p className="section-title">My Subjects</p>
              <button className="see-all" onClick={() => history.push('/student/courses')}>
                See All <IonIcon icon={chevronForward} />
              </button>
            </div>
            <div className="courses-list">
              {ENROLLED_COURSES.map((c) => (
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
                    <p className="course-meta">{c.done}/{c.lessons} lessons · {c.progress}%</p>
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
