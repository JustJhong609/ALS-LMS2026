import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonChip, IonIcon, IonRippleEffect,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { chevronForward, checkmarkCircle, timeOutline } from 'ionicons/icons';
import './StudentCourses.css';

const ALL_COURSES = [
  { id: 'c1', subject: 'Communication Arts (Filipino)', progress: 72, lessons: 18, done: 13, color: '#1d4ed8', icon: '🇵🇭', category: 'Language', status: 'in-progress' },
  { id: 'c2', subject: 'Communication Arts (English)',  progress: 55, lessons: 16, done: 9,  color: '#16a34a', icon: '🗣️', category: 'Language', status: 'in-progress' },
  { id: 'c3', subject: 'Mathematics',                   progress: 88, lessons: 20, done: 17, color: '#7c3aed', icon: '🔢', category: 'Science & Math', status: 'in-progress' },
  { id: 'c4', subject: 'Science',                       progress: 40, lessons: 15, done: 6,  color: '#d97706', icon: '🔬', category: 'Science & Math', status: 'in-progress' },
  { id: 'c5', subject: 'Araling Panlipunan',            progress: 100, lessons: 12, done: 12, color: '#0891b2', icon: '🌏', category: 'Social Studies', status: 'completed' },
  { id: 'c6', subject: 'Edukasyon sa Pagpapakatao',     progress: 60, lessons: 10, done: 6,  color: '#be185d', icon: '❤️', category: 'Values', status: 'in-progress' },
  { id: 'c7', subject: 'Career Pathways',               progress: 20, lessons: 8,  done: 2,  color: '#065f46', icon: '💼', category: 'Livelihood', status: 'not-started' },
  { id: 'c8', subject: 'Digital Skills',                progress: 0,  lessons: 10, done: 0,  color: '#1e40af', icon: '💻', category: 'Technology', status: 'not-started' },
];

const FILTERS = ['All', 'In Progress', 'Completed', 'Not Started'];

const StudentCourses: React.FC = () => {
  const history = useHistory();
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState('All');

  const filtered = ALL_COURSES.filter((c) => {
    const matchSearch = c.subject.toLowerCase().includes(search.toLowerCase());
    if (filter === 'All')         return matchSearch;
    if (filter === 'In Progress') return matchSearch && c.status === 'in-progress';
    if (filter === 'Completed')   return matchSearch && c.status === 'completed';
    if (filter === 'Not Started') return matchSearch && c.status === 'not-started';
    return matchSearch;
  });

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <IonTitle className="toolbar-title">My Subjects</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="courses-content">
        <div className="courses-top">
          <IonSearchbar
            placeholder="Search subjects..."
            value={search}
            onIonInput={(e) => setSearch(e.detail.value ?? '')}
            className="als-searchbar"
          />
          <div className="filter-chips">
            {FILTERS.map((f) => (
              <IonChip
                key={f}
                className={`filter-chip ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </IonChip>
            ))}
          </div>
        </div>

        <div className="courses-body">
          <p className="results-count">{filtered.length} subjects found</p>
          <div className="courses-grid">
            {filtered.map((c) => (
              <div
                key={c.id}
                className="course-card-full ion-activatable"
                onClick={() => history.push(`/student/course/${c.id}`)}
              >
                <IonRippleEffect />

                <div className="cf-top">
                  <div className="cf-icon-wrap" style={{ background: c.color + '18' }}>
                    <span style={{ fontSize: 28 }}>{c.icon}</span>
                  </div>
                  {c.status === 'completed' && (
                    <IonIcon icon={checkmarkCircle} className="cf-done-icon" />
                  )}
                  {c.status === 'not-started' && (
                    <span className="als-badge als-badge-amber">New</span>
                  )}
                </div>

                <p className="cf-subject">{c.subject}</p>
                <p className="cf-category">{c.category}</p>

                <div className="als-progress-track" style={{ marginTop: 10 }}>
                  <div
                    className="als-progress-fill"
                    style={{ width: `${c.progress}%`, background: c.color }}
                  />
                </div>
                <div className="cf-footer">
                  <span className="cf-lessons">
                    <IonIcon icon={timeOutline} /> {c.done}/{c.lessons} lessons
                  </span>
                  <span className="cf-pct" style={{ color: c.color }}>{c.progress}%</span>
                </div>

                <IonIcon icon={chevronForward} className="cf-arrow" />
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StudentCourses;
