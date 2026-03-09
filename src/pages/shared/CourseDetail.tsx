import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonIcon,
  IonButton, IonRippleEffect, IonChip,
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { chevronBack, bookOutline, timeOutline, checkmarkCircle, lockClosed, playCircle } from 'ionicons/icons';
import './CourseDetail.css';

const COURSES_DATA: Record<string, {
  subject: string; icon: string; color: string; description: string;
  lessons: { id: string; title: string; duration: string; done: boolean; locked: boolean; type: string }[];
}> = {
  c1: {
    subject: 'Communication Arts (Filipino)',
    icon: '🇵🇭', color: '#1d4ed8',
    description: 'Paunlarin ang kakayahan sa pagbabasa, pagsulat, at pakikinig sa Filipino. Sumasaklaw sa wika, panitikan, at komunikasyon.',
    lessons: [
      { id: 'l1', title: 'Aralin 1: Panimula sa Filipino',          duration: '15 min', done: true,  locked: false, type: 'video' },
      { id: 'l2', title: 'Aralin 2: Mga Bahagi ng Pananalita',      duration: '20 min', done: true,  locked: false, type: 'reading' },
      { id: 'l3', title: 'Aralin 3: Pagsulat ng Talata',            duration: '25 min', done: true,  locked: false, type: 'activity' },
      { id: 'l4', title: 'Aralin 4: Pagbasa ng Maikling Kwento',    duration: '30 min', done: false, locked: false, type: 'reading' },
      { id: 'l5', title: 'Aralin 5: Pakikinig at Pagsasalita',      duration: '20 min', done: false, locked: true,  type: 'video' },
      { id: 'l6', title: 'Aralin 6: Pagsulat ng Liham',             duration: '35 min', done: false, locked: true,  type: 'activity' },
    ],
  },
  c2: {
    subject: 'Communication Arts (English)',
    icon: '🗣️', color: '#16a34a',
    description: 'Develop reading, writing, listening, and speaking skills in English through engaging activities and practical exercises.',
    lessons: [
      { id: 'l1', title: 'Unit 1: Introduction to English Communication', duration: '20 min', done: true,  locked: false, type: 'video' },
      { id: 'l2', title: 'Unit 2: Parts of Speech',                      duration: '25 min', done: true,  locked: false, type: 'reading' },
      { id: 'l3', title: 'Unit 3: Writing Simple Sentences',             duration: '20 min', done: false, locked: false, type: 'activity' },
      { id: 'l4', title: 'Unit 4: Reading Comprehension',                duration: '30 min', done: false, locked: true,  type: 'reading' },
    ],
  },
  c3: {
    subject: 'Mathematics',
    icon: '🔢', color: '#7c3aed',
    description: 'Master fundamental math concepts from counting to algebra. Build problem-solving and critical thinking skills.',
    lessons: [
      { id: 'l1', title: 'Module 1: Numbers and Operations',   duration: '20 min', done: true,  locked: false, type: 'video' },
      { id: 'l2', title: 'Module 2: Fractions and Decimals',  duration: '25 min', done: true,  locked: false, type: 'reading' },
      { id: 'l3', title: 'Module 3: Basic Algebra',            duration: '30 min', done: true,  locked: false, type: 'activity' },
      { id: 'l4', title: 'Module 4: Geometry Basics',          duration: '25 min', done: false, locked: false, type: 'video' },
    ],
  },
  c4: {
    subject: 'Science',
    icon: '🔬', color: '#d97706',
    description: 'Explore the natural world through scientific inquiry. Topics include Earth Science, Biology, Chemistry, and Physics.',
    lessons: [
      { id: 'l1', title: 'Unit 1: The Scientific Method',    duration: '15 min', done: true,  locked: false, type: 'video' },
      { id: 'l2', title: 'Unit 2: Living Things',            duration: '25 min', done: false, locked: false, type: 'reading' },
      { id: 'l3', title: 'Unit 3: Matter and Energy',        duration: '30 min', done: false, locked: true,  type: 'activity' },
    ],
  },
};

const typeIcon: Record<string, string> = {
  video:    '▶',
  reading:  '📄',
  activity: '✍',
};

const CourseDetail: React.FC = () => {
  const history = useHistory();
  const { id }  = useParams<{ id: string }>();
  const course  = COURSES_DATA[id] ?? COURSES_DATA['c1'];

  const doneLessons = course.lessons.filter((l) => l.done).length;
  const progress    = Math.round((doneLessons / course.lessons.length) * 100);

  return (
    <IonPage>
      {/* ── Custom Header Hero ── */}
      <div className="cd-hero" style={{ '--course-color': course.color } as React.CSSProperties}>
        <IonHeader className="ion-no-border cd-header">
          <IonToolbar className="cd-toolbar">
            <button className="cd-back-btn ion-activatable" onClick={() => history.goBack()}>
              <IonRippleEffect />
              <IonIcon icon={chevronBack} />
            </button>
          </IonToolbar>
        </IonHeader>

        <div className="cd-hero-body">
          <div className="cd-icon-circle">{course.icon}</div>
          <h1 className="cd-title">{course.subject}</h1>
          <p className="cd-desc">{course.description}</p>

          <div className="cd-meta-row">
            <span className="cd-meta-pill">
              <IonIcon icon={bookOutline} /> {course.lessons.length} Lessons
            </span>
            <span className="cd-meta-pill">
              <IonIcon icon={timeOutline} /> ~{course.lessons.reduce((s, l) => s + parseInt(l.duration), 0)} min
            </span>
          </div>

          {/* Progress */}
          <div className="cd-progress-wrap">
            <div className="cd-progress-labels">
              <span>Progress</span>
              <span>{doneLessons}/{course.lessons.length} completed</span>
            </div>
            <div className="als-progress-track">
              <div className="als-progress-fill" style={{ width: `${progress}%`, background: course.color + 'aa' }} />
            </div>
          </div>
        </div>
      </div>

      <IonContent className="cd-content">
        <div className="cd-lessons-section">
          <p className="cd-section-title">Course Lessons</p>
          <div className="cd-lessons-list">
            {course.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className={`cd-lesson-item ion-activatable ${lesson.locked ? 'locked' : ''}`}
                onClick={() => !lesson.locked && history.push(`/student/lesson/${lesson.id}`)}
              >
                <IonRippleEffect />

                <div className="lesson-num-wrap" style={{ background: lesson.done ? '#16a34a18' : lesson.locked ? '#f1f5f9' : course.color + '18' }}>
                  {lesson.done ? (
                    <IonIcon icon={checkmarkCircle} style={{ color: '#16a34a', fontSize: 22 }} />
                  ) : lesson.locked ? (
                    <IonIcon icon={lockClosed} style={{ color: '#94a3b8', fontSize: 18 }} />
                  ) : (
                    <span style={{ color: course.color, fontWeight: 800, fontSize: 15 }}>{idx + 1}</span>
                  )}
                </div>

                <div className="lesson-info">
                  <p className="lesson-title" style={{ color: lesson.locked ? '#94a3b8' : '#1e293b' }}>
                    {lesson.title}
                  </p>
                  <div className="lesson-meta-row">
                    <span className="lesson-type-badge">
                      {typeIcon[lesson.type]} {lesson.type}
                    </span>
                    <span className="lesson-dur">
                      <IonIcon icon={timeOutline} /> {lesson.duration}
                    </span>
                  </div>
                </div>

                {!lesson.locked && !lesson.done && (
                  <IonIcon icon={playCircle} className="lesson-play" style={{ color: course.color }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Start/Continue CTA */}
        <div className="cd-cta">
          <IonButton expand="block" className="cd-cta-btn" style={{ '--btn-color': course.color } as React.CSSProperties}
            onClick={() => history.push(`/student/lesson/l${doneLessons + 1}`)}>
            {doneLessons === 0 ? '🚀 Start Course' : doneLessons === course.lessons.length ? '✅ Review Course' : '▶ Continue Learning'}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CourseDetail;
