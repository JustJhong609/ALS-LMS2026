import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonSearchbar,
  IonSegment, IonSegmentButton, IonLabel, IonBadge, IonIcon,
  IonAlert, IonRippleEffect,
} from '@ionic/react';
import { bookOutline, trashOutline, createOutline, addCircleOutline, chevronForward } from 'ionicons/icons';
import './AdminCourses.css';

interface Course {
  id: string;
  title: string;
  subject: string;
  level: string;
  teacher: string;
  enrolled: number;
  lessons: number;
  status: 'active' | 'draft' | 'archived';
  icon: string;
  color: string;
}

const COURSES: Course[] = [
  { id:'c1', title:'Mathematics',    subject:'Math',     level:'Elementary', teacher:'Rosa Mendoza',  enrolled:84, lessons:12, status:'active',   icon:'📐', color:'#1d4ed8' },
  { id:'c2', title:'English',        subject:'English',  level:'Junior HS',  teacher:'Carlos Robles', enrolled:72, lessons:10, status:'active',   icon:'📖', color:'#7c3aed' },
  { id:'c3', title:'Science',        subject:'Science',  level:'Junior HS',  teacher:'Rosa Mendoza',  enrolled:65, lessons:14, status:'active',   icon:'🔬', color:'#0891b2' },
  { id:'c4', title:'Filipino',       subject:'Filipino', level:'Senior HS',  teacher:'Elena Reyes',   enrolled:55, lessons:8,  status:'draft',    icon:'🇵🇭', color:'#dc2626' },
  { id:'c5', title:'Araling Panlip.', subject:'AP',     level:'Elementary', teacher:'Carlos Robles', enrolled:48, lessons:9,  status:'active',   icon:'🏛️', color:'#d97706' },
  { id:'c6', title:'EPP/TLE',        subject:'TLE',      level:'Junior HS',  teacher:'Elena Reyes',   enrolled:39, lessons:6,  status:'archived', icon:'🔧', color:'#64748b' },
];

const AdminCourses: React.FC = () => {
  const [search,  setSearch]  = useState('');
  const [segment, setSegment] = useState<'all' | 'active' | 'draft' | 'archived'>('all');
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [delId,   setDelId]   = useState<string | null>(null);

  const filtered = courses.filter((c) => {
    const matchSeg = segment === 'all' || c.status === segment;
    const matchSrc = c.title.toLowerCase().includes(search.toLowerCase()) ||
                     c.teacher.toLowerCase().includes(search.toLowerCase());
    return matchSeg && matchSrc;
  });

  const confirmDelete = () => {
    if (delId) { setCourses((prev) => prev.filter((c) => c.id !== delId)); setDelId(null); }
  };

  const statusColor: Record<string, string> = {
    active: '#16a34a', draft: '#d97706', archived: '#94a3b8',
  };

  return (
    <IonPage>
      <IonHeader className="ac-header ion-no-border">
        <IonToolbar>
          <div className="ac-toolbar-row">
            <span className="ac-toolbar-title">Course Management</span>
            <button className="ac-add-btn ion-activatable">
              <IonRippleEffect />
              <IonIcon icon={addCircleOutline} />
              <span>New</span>
            </button>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ac-content">
        <div className="ac-body">

          {/* Summary */}
          <div className="ac-summary-row">
            {(['all','active','draft','archived'] as const).map((s) => (
              <div key={s} className="ac-summary-chip">
                <span className="acsc-num" style={{ color: s === 'all' ? '#7c3aed' : statusColor[s] ?? '#7c3aed' }}>
                  {s === 'all' ? courses.length : courses.filter(c => c.status === s).length}
                </span>
                <span className="acsc-lbl">{s.charAt(0).toUpperCase() + s.slice(1)}</span>
              </div>
            ))}
          </div>

          <IonSearchbar
            className="ac-searchbar"
            placeholder="Search courses or teachers..."
            value={search}
            onIonInput={(e) => setSearch(e.detail.value ?? '')}
          />

          <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)} className="ac-segment">
            <IonSegmentButton value="all"><IonLabel>All</IonLabel></IonSegmentButton>
            <IonSegmentButton value="active"><IonLabel>Active</IonLabel></IonSegmentButton>
            <IonSegmentButton value="draft"><IonLabel>Draft</IonLabel></IonSegmentButton>
            <IonSegmentButton value="archived"><IonLabel>Archived</IonLabel></IonSegmentButton>
          </IonSegment>

          <div className="ac-list">
            {filtered.map((c) => (
              <div key={c.id} className="ac-card">
                <div className="ac-icon-wrap" style={{ background: c.color + '18', borderColor: c.color + '30' }}>
                  <span className="ac-icon">{c.icon}</span>
                </div>
                <div className="ac-info">
                  <div className="ac-title-row">
                    <span className="ac-title">{c.title}</span>
                    <IonBadge className={`ac-status-badge status-${c.status}`}>
                      {c.status}
                    </IonBadge>
                  </div>
                  <span className="ac-teacher">👩‍🏫 {c.teacher}</span>
                  <div className="ac-meta-row">
                    <span className="ac-meta">{c.level}</span>
                    <span className="ac-meta">📚 {c.lessons} lessons</span>
                    <span className="ac-meta">👥 {c.enrolled} enrolled</span>
                  </div>
                </div>
                <div className="ac-actions">
                  <button className="ac-edit-btn" title="Edit"><IonIcon icon={createOutline} /></button>
                  <button className="ac-del-btn" onClick={() => setDelId(c.id)} title="Delete"><IonIcon icon={trashOutline} /></button>
                  <IonIcon icon={chevronForward} className="ac-chevron" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <IonAlert
          isOpen={delId !== null}
          onDidDismiss={() => setDelId(null)}
          header="Delete Course"
          message="This will permanently remove the course and all its data."
          buttons={[
            { text: 'Cancel', role: 'cancel' },
            { text: 'Delete', role: 'destructive', handler: confirmDelete },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default AdminCourses;
