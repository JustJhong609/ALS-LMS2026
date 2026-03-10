import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonIcon, IonRippleEffect, IonFab, IonFabButton,
  IonModal, IonButton, IonInput, IonTextarea,
} from '@ionic/react';
import { addOutline, closeOutline, documentTextOutline, calendarOutline } from 'ionicons/icons';
import './ImplementerResources.css';

interface Resource {
  id: string; title: string; type: 'material' | 'schedule'; description: string;
  date: string; strand?: string;
}

const INITIAL_RESOURCES: Resource[] = [
  { id: 'r1', title: 'LS 1 — Supplementary Reading Material', type: 'material', description: 'Additional reading exercises for Filipino comprehension', date: 'Mar 8, 2026', strand: 'LS 1' },
  { id: 'r2', title: 'F2F Session — Brgy. San Miguel CLC', type: 'schedule', description: 'Face-to-face session for Math remediation. Bring modules 1-5.', date: 'Mar 13, 2026' },
  { id: 'r3', title: 'LS 3 — Practice Worksheets', type: 'material', description: 'Printable worksheets for fractions and decimals practice', date: 'Mar 5, 2026', strand: 'LS 3' },
  { id: 'r4', title: 'F2F Session — Brgy. Dicklum CLC', type: 'schedule', description: 'Group study session for English skills. All elementary learners.', date: 'Mar 20, 2026' },
];

const ImplementerResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'material' | 'schedule'>('material');
  const [newDesc, setNewDesc] = useState('');

  const handleAdd = () => {
    const newRes: Resource = {
      id: `r${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      description: newDesc.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setResources([newRes, ...resources]);
    setShowModal(false);
    setNewTitle(''); setNewDesc('');
  };

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <IonTitle className="toolbar-title-amber">Resources & Schedules</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="imp-res-content">
        <div className="imp-res-body">
          <p className="imp-res-hint">Share supplementary materials and announce F2F session schedules to your learners.</p>

          {resources.map((r) => (
            <div key={r.id} className={`imp-res-card ${r.type}`}>
              <div className="imp-res-icon">
                <IonIcon icon={r.type === 'material' ? documentTextOutline : calendarOutline} />
              </div>
              <div className="imp-res-info">
                <span className={`imp-res-type-badge ${r.type}`}>
                  {r.type === 'material' ? '📄 Material' : '📅 F2F Schedule'}
                </span>
                <p className="imp-res-title">{r.title}</p>
                <p className="imp-res-desc">{r.description}</p>
                <p className="imp-res-date">{r.date}</p>
              </div>
            </div>
          ))}
        </div>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton className="fab-amber" onClick={() => setShowModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} className="imp-res-modal">
          <IonHeader className="ion-no-border">
            <IonToolbar className="modal-toolbar">
              <IonTitle className="modal-title">Share Resource</IonTitle>
              <IonButton fill="clear" slot="end" onClick={() => setShowModal(false)}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="modal-content">
            <div className="modal-body">
              <div className="type-toggle-row">
                <button className={`type-btn ${newType === 'material' ? 'active' : ''}`} onClick={() => setNewType('material')}>📄 Material</button>
                <button className={`type-btn ${newType === 'schedule' ? 'active' : ''}`} onClick={() => setNewType('schedule')}>📅 F2F Schedule</button>
              </div>

              <div className="form-group">
                <p className="field-label">Title <span className="req">*</span></p>
                <IonInput placeholder="e.g., LS 1 Practice Worksheet" value={newTitle} onIonInput={(e) => setNewTitle(e.detail.value ?? '')} className="als-field" />
              </div>

              <div className="form-group">
                <p className="field-label">Description</p>
                <IonTextarea placeholder="Describe the resource or schedule details..." value={newDesc} onIonInput={(e) => setNewDesc(e.detail.value ?? '')} className="als-field" rows={4} />
              </div>

              <IonButton expand="block" shape="round" className="modal-save-btn" onClick={handleAdd} disabled={!newTitle.trim()}>
                ✅ Share with Learners
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ImplementerResources;
