import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonIcon, IonRippleEffect, IonSegment, IonSegmentButton, IonLabel,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { timeOutline, checkmarkCircleOutline, alertCircleOutline, chevronForward } from 'ionicons/icons';
import './StudentAssessment.css';

/* ── FLT Data ── */
const FLT_DATA = {
  taken: true,
  classification: 'Elementary Level',
  score: 78,
  date: 'Feb 20, 2026',
  breakdown: [
    { area: 'Reading Comprehension', score: 82 },
    { area: 'Numeracy', score: 75 },
    { area: 'Writing', score: 70 },
    { area: 'Oral Communication', score: 85 },
  ],
};

const ASSESSMENTS = [
  { id: 'q1', title: 'LS 3 — Fractions Quiz',              subject: 'Mathematical & Problem-Solving', type: 'quiz',       status: 'upcoming',   date: 'Mar 12, 2026', duration: '30 min',  items: 20, score: null },
  { id: 'q2', title: 'LS 4 — Life Skills Assessment',       subject: 'Life and Career Skills',         type: 'assessment', status: 'upcoming',   date: 'Mar 17, 2026', duration: '45 min',  items: 30, score: null },
  { id: 'q3', title: 'LS 2 — Vocabulary Drill',             subject: 'Communication Skills (English)', type: 'quiz',       status: 'completed',  date: 'Mar 5, 2026',  duration: '20 min',  items: 15, score: 88 },
  { id: 'q4', title: 'LS 1 — Pagbasa at Pagsulat',          subject: 'Communication Skills (Filipino)',type: 'activity',   status: 'completed',  date: 'Mar 3, 2026',  duration: '40 min',  items: 10, score: 95 },
  { id: 'q5', title: 'LS 3 — Algebra Basics',               subject: 'Mathematical & Problem-Solving', type: 'quiz',       status: 'completed',  date: 'Feb 28, 2026', duration: '25 min',  items: 20, score: 75 },
  { id: 'q6', title: 'LS 5 — Heograpiya ng Pilipinas',      subject: 'Understanding Self & Society',   type: 'assessment', status: 'missed',     date: 'Feb 25, 2026', duration: '35 min',  items: 25, score: null },
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
  const [seg, setSeg] = useState<'flt' | 'upcoming' | 'completed'>('flt');

  const filtered = ASSESSMENTS.filter((a) =>
    seg === 'upcoming' ? a.status === 'upcoming' || a.status === 'missed' : a.status === 'completed'
  );

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <IonTitle className="toolbar-title">FLT & Assessments</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={seg} onIonChange={(e) => setSeg(e.detail.value as any)} className="seg">
            <IonSegmentButton value="flt"><IonLabel>FLT</IonLabel></IonSegmentButton>
            <IonSegmentButton value="upcoming"><IonLabel>Upcoming</IonLabel></IonSegmentButton>
            <IonSegmentButton value="completed"><IonLabel>Completed</IonLabel></IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="assess-content">
        <div className="assess-body">

          {/* ── FLT Tab ── */}
          {seg === 'flt' && (
            <>
              <div className="flt-card">
                <div className="flt-header">
                  <span style={{ fontSize: 40 }}>📋</span>
                  <h3 className="flt-title">Functional Literacy Test</h3>
                  <p className="flt-subtitle">Assess your readiness level for the ALS curriculum</p>
                </div>

                {FLT_DATA.taken ? (
                  <div className="flt-results">
                    <div className="flt-score-circle" style={{ borderColor: FLT_DATA.score >= 75 ? '#16a34a' : '#d97706' }}>
                      <span className="flt-score-num">{FLT_DATA.score}%</span>
                      <span className="flt-score-lbl">Score</span>
                    </div>
                    <div className="flt-classification">
                      <p className="flt-class-label">Classification</p>
                      <p className="flt-class-value">{FLT_DATA.classification}</p>
                      <p className="flt-class-date">Taken on {FLT_DATA.date}</p>
                    </div>

                    <div className="flt-breakdown">
                      <p className="flt-breakdown-title">Score Breakdown</p>
                      {FLT_DATA.breakdown.map((b) => (
                        <div key={b.area} className="flt-break-row">
                          <p className="flt-break-area">{b.area}</p>
                          <div className="als-progress-track" style={{ flex: 1, margin: '0 12px' }}>
                            <div className="als-progress-fill" style={{ width: `${b.score}%`, background: b.score >= 75 ? '#16a34a' : '#d97706' }} />
                          </div>
                          <span className="flt-break-pct">{b.score}%</span>
                        </div>
                      ))}
                    </div>

                    <button className="retake-flt-btn ion-activatable" onClick={() => history.push('/student/quiz/flt')}>
                      <IonRippleEffect />
                      🔄 Retake FLT
                    </button>
                  </div>
                ) : (
                  <div className="flt-not-taken">
                    <p>You have not taken the Functional Literacy Test yet.</p>
                    <p className="flt-hint">The FLT determines your readiness level and helps classify you into the appropriate ALS curriculum.</p>
                    <button className="take-flt-btn ion-activatable" onClick={() => history.push('/student/quiz/flt')}>
                      <IonRippleEffect />
                      📝 Take FLT Now
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── Upcoming/Completed Tabs ── */}
          {seg !== 'flt' && (
            <>
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
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StudentAssessment;
