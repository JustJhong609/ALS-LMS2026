import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonIcon, IonRippleEffect, IonSegment, IonSegmentButton, IonLabel,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { timeOutline, checkmarkCircleOutline, alertCircleOutline, chevronForward } from 'ionicons/icons';
import './StudentAssessment.css';

const ASSESSMENTS = [
  { id: 'q1', title: 'Math — Fractions Quiz',           subject: 'Mathematics',   type: 'quiz',       status: 'upcoming',   date: 'Mar 12, 2026', duration: '30 min',  items: 20, score: null },
  { id: 'q2', title: 'Science — Unit 2 Assessment',     subject: 'Science',       type: 'assessment', status: 'upcoming',   date: 'Mar 17, 2026', duration: '45 min',  items: 30, score: null },
  { id: 'q3', title: 'English — Vocabulary Drill',      subject: 'English',       type: 'quiz',       status: 'completed',  date: 'Mar 5, 2026',  duration: '20 min',  items: 15, score: 88 },
  { id: 'q4', title: 'Filipino — Pagbasa at Pagsulat',  subject: 'Filipino',      type: 'activity',   status: 'completed',  date: 'Mar 3, 2026',  duration: '40 min',  items: 10, score: 95 },
  { id: 'q5', title: 'Math — Algebra Basics',           subject: 'Mathematics',   type: 'quiz',       status: 'completed',  date: 'Feb 28, 2026', duration: '25 min',  items: 20, score: 75 },
  { id: 'q6', title: 'AP — Heograpiya ng Pilipinas',    subject: 'Araling Panlipunan', type: 'assessment', status: 'missed', date: 'Feb 25, 2026', duration: '35 min', items: 25, score: null },
];

const typeColor: Record<string, string> = {
  quiz:       '#7c3aed',
  assessment: '#1d4ed8',
  activity:   '#16a34a',
};
const statusColor: Record<string, string> = {
  upcoming:  '#d97706',
  completed: '#16a34a',
  missed:    '#dc2626',
};

const StudentAssessment: React.FC = () => {
  const history = useHistory();
  const [seg, setSeg] = useState<'upcoming' | 'completed'>('upcoming');

  const filtered = ASSESSMENTS.filter((a) =>
    seg === 'upcoming' ? a.status === 'upcoming' || a.status === 'missed' : a.status === 'completed'
  );

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <IonTitle className="toolbar-title">Assessments</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={seg} onIonChange={(e) => setSeg(e.detail.value as any)} className="seg">
            <IonSegmentButton value="upcoming"><IonLabel>Upcoming</IonLabel></IonSegmentButton>
            <IonSegmentButton value="completed"><IonLabel>Completed</IonLabel></IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="assess-content">
        <div className="assess-body">
          {filtered.length === 0 && (
            <div className="empty-state">
              <span style={{ fontSize: 56 }}>🎉</span>
              <p>No assessments here yet!</p>
            </div>
          )}
          {filtered.map((a) => (
            <div
              key={a.id}
              className="assess-card ion-activatable"
              onClick={() => a.status !== 'missed' && history.push(`/student/quiz/${a.id}`)}
            >
              <IonRippleEffect />

              {/* Left accent bar */}
              <div className="assess-bar" style={{ background: typeColor[a.type] }} />

              <div className="assess-inner">
                <div className="assess-top">
                  <p className="assess-title">{a.title}</p>
                  <span
                    className="als-badge"
                    style={{
                      background: statusColor[a.status] + '18',
                      color: statusColor[a.status],
                    }}
                  >
                    {a.status === 'upcoming' ? '🕐 Upcoming'
                     : a.status === 'completed' ? '✓ Done'
                     : '⚠ Missed'}
                  </span>
                </div>

                <p className="assess-subject">{a.subject}</p>

                <div className="assess-meta">
                  <span className="meta-pill">
                    <IonIcon icon={timeOutline} /> {a.duration}
                  </span>
                  <span className="meta-pill">📋 {a.items} items</span>
                  <span className="meta-pill">📅 {a.date}</span>
                </div>

                {a.score !== null && (
                  <div className="score-row">
                    <div className="als-progress-track score-track">
                      <div className="als-progress-fill" style={{ width: `${a.score}%`, background: a.score >= 75 ? '#16a34a' : '#dc2626' }} />
                    </div>
                    <span className="score-pct" style={{ color: a.score >= 75 ? '#16a34a' : '#dc2626' }}>
                      {a.score}%
                    </span>
                  </div>
                )}

                {a.status === 'upcoming' && (
                  <div className="take-btn-row">
                    <button className="take-btn ion-activatable">
                      <IonRippleEffect />
                      Take Assessment <IonIcon icon={chevronForward} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StudentAssessment;
