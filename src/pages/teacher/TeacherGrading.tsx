import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSegment, IonSegmentButton, IonLabel, IonIcon, IonRippleEffect,
} from '@ionic/react';
import { checkmarkCircle, timeOutline, alertCircleOutline } from 'ionicons/icons';
import './TeacherGrading.css';

const SUBMISSIONS = [
  { id: 'g1', learner: 'Maria Santos',   quiz: 'Math — Fractions Quiz',   submitted: 'Mar 9, 10:22am',  score: 85,  status: 'graded' },
  { id: 'g2', learner: 'Jose Reyes',     quiz: 'Math — Fractions Quiz',   submitted: 'Mar 9, 11:05am',  score: 70,  status: 'graded' },
  { id: 'g3', learner: 'Ana Dela Cruz',  quiz: 'Science Unit 2',          submitted: 'Mar 9, 9:45am',   score: null, status: 'pending' },
  { id: 'g4', learner: 'Rosa Bautista',  quiz: 'English Vocabulary',      submitted: 'Mar 8, 3:30pm',   score: null, status: 'pending' },
  { id: 'g5', learner: 'Carlos Mendoza', quiz: 'Filipino — Pagbasa',      submitted: 'Mar 7, 2:00pm',   score: 95,  status: 'graded' },
  { id: 'g6', learner: 'Ramon Torres',   quiz: 'Science Unit 2',          submitted: 'Mar 9, 8:15am',   score: null, status: 'pending' },
];

const TeacherGrading: React.FC = () => {
  const [seg, setSeg] = useState<'pending' | 'graded'>('pending');
  const [grades, setGrades] = useState<Record<string, string>>({});

  const filtered = SUBMISSIONS.filter((s) => s.status === seg);

  const handleGrade = (id: string) => {
    const val = grades[id];
    if (!val) return;
    alert(`Grade of ${val}% submitted for submission ${id}`);
  };

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <IonTitle className="toolbar-title-green">Grading Center</IonTitle>
        </IonToolbar>
        <IonToolbar style={{ '--background': 'linear-gradient(135deg, #14532d, #16a34a)' }}>
          <IonSegment value={seg} onIonChange={(e) => setSeg(e.detail.value as any)} className="seg-green">
            <IonSegmentButton value="pending"><IonLabel>Pending ({SUBMISSIONS.filter(s => s.status === 'pending').length})</IonLabel></IonSegmentButton>
            <IonSegmentButton value="graded"><IonLabel>Graded</IonLabel></IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="grading-content">
        <div className="grading-body">
          {filtered.length === 0 && (
            <div className="empty-state">
              <span style={{ fontSize: 56 }}>✅</span>
              <p>All caught up! No pending submissions.</p>
            </div>
          )}
          {filtered.map((sub) => (
            <div key={sub.id} className="grade-card">
              <div className="grade-card-top">
                <div className="grade-avatar">{sub.learner.split(' ').map(n => n[0]).join('')}</div>
                <div className="grade-info">
                  <p className="grade-learner">{sub.learner}</p>
                  <p className="grade-quiz">{sub.quiz}</p>
                  <p className="grade-time">
                    <IonIcon icon={timeOutline} /> {sub.submitted}
                  </p>
                </div>
                {sub.status === 'graded' && sub.score !== null && (
                  <div className="grade-score-badge" style={{ background: sub.score >= 75 ? '#dcfce7' : '#fee2e2', color: sub.score >= 75 ? '#16a34a' : '#dc2626' }}>
                    {sub.score}%
                  </div>
                )}
              </div>

              {sub.status === 'pending' && (
                <div className="grade-input-row">
                  <input
                    type="number"
                    placeholder="Enter score (0-100)"
                    min={0}
                    max={100}
                    className="grade-input"
                    value={grades[sub.id] ?? ''}
                    onChange={(e) => setGrades((prev) => ({ ...prev, [sub.id]: e.target.value }))}
                  />
                  <button className="grade-submit-btn ion-activatable" onClick={() => handleGrade(sub.id)}>
                    <IonRippleEffect />
                    Submit Grade
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TeacherGrading;
