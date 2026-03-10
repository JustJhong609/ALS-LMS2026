import React from 'react';
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet,
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import {
  homeOutline, home,
  peopleOutline, people,
  folderOpenOutline, folderOpen,
  clipboardOutline, clipboard,
  personOutline, person,
} from 'ionicons/icons';

import ImplementerDashboard from './ImplementerDashboard';
import ImplementerLearners  from './ImplementerLearners';
import ImplementerResources from './ImplementerResources';
import ImplementerFLT       from './ImplementerFLT';
import ImplementerProfile   from './ImplementerProfile';

const ImplementerTabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/implementer/dashboard"  component={ImplementerDashboard} />
      <Route exact path="/implementer/learners"   component={ImplementerLearners} />
      <Route exact path="/implementer/resources"  component={ImplementerResources} />
      <Route exact path="/implementer/flt"        component={ImplementerFLT} />
      <Route exact path="/implementer/profile"    component={ImplementerProfile} />
      <Redirect exact from="/implementer" to="/implementer/dashboard" />
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="dashboard" href="/implementer/dashboard">
        <IonIcon ios={homeOutline} md={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="learners" href="/implementer/learners">
        <IonIcon ios={peopleOutline} md={people} />
        <IonLabel>Learners</IonLabel>
      </IonTabButton>
      <IonTabButton tab="resources" href="/implementer/resources">
        <IonIcon ios={folderOpenOutline} md={folderOpen} />
        <IonLabel>Resources</IonLabel>
      </IonTabButton>
      <IonTabButton tab="flt" href="/implementer/flt">
        <IonIcon ios={clipboardOutline} md={clipboard} />
        <IonLabel>FLT</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/implementer/profile">
        <IonIcon ios={personOutline} md={person} />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default ImplementerTabs;
