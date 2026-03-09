import React from 'react';
import {
  IonMenu, IonHeader, IonToolbar, IonContent, IonList, IonItem,
  IonIcon, IonLabel, IonAlert, IonRippleEffect,
} from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  homeOutline, bookOutline, clipboardOutline, barChartOutline, personOutline,
  peopleOutline, createOutline, documentTextOutline, settingsOutline,
  logOutOutline, schoolOutline,
} from 'ionicons/icons';
import { useAuth } from '../App';
import './SideMenu.css';

interface NavItem {
  label: string;
  icon: string;
  href: string;
}

const STUDENT_NAV: NavItem[] = [
  { label: 'Dashboard',   icon: homeOutline,       href: '/student/dashboard' },
  { label: 'My Courses',  icon: bookOutline,        href: '/student/courses'   },
  { label: 'Assessments', icon: clipboardOutline,   href: '/student/assessment'},
  { label: 'Progress',    icon: barChartOutline,    href: '/student/progress'  },
  { label: 'Profile',     icon: personOutline,      href: '/student/profile'   },
];

const TEACHER_NAV: NavItem[] = [
  { label: 'Dashboard',   icon: homeOutline,        href: '/teacher/dashboard' },
  { label: 'Learners',    icon: peopleOutline,      href: '/teacher/learners'  },
  { label: 'Grading',     icon: createOutline,      href: '/teacher/grading'   },
  { label: 'Reports',     icon: documentTextOutline,href: '/teacher/reports'   },
  { label: 'Profile',     icon: personOutline,      href: '/teacher/profile'   },
];

const ADMIN_NAV: NavItem[] = [
  { label: 'Dashboard',   icon: homeOutline,        href: '/admin/dashboard' },
  { label: 'Users',       icon: peopleOutline,      href: '/admin/users'     },
  { label: 'Courses',     icon: bookOutline,        href: '/admin/courses'   },
  { label: 'Reports',     icon: barChartOutline,    href: '/admin/reports'   },
  { label: 'Settings',    icon: settingsOutline,    href: '/admin/settings'  },
];

const ROLE_THEME: Record<string, { color: string; label: string; gradient: string }> = {
  student: { color: '#1d4ed8', label: 'Learner',      gradient: 'linear-gradient(135deg,#1d4ed8,#1e40af)' },
  teacher: { color: '#16a34a', label: 'Facilitator',  gradient: 'linear-gradient(135deg,#16a34a,#15803d)' },
  admin:   { color: '#7c3aed', label: 'System Admin', gradient: 'linear-gradient(135deg,#7c3aed,#6d28d9)' },
};

const SideMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const location         = useLocation();
  const history          = useHistory();
  const [showLogout, setShowLogout] = React.useState(false);

  if (!user) return null;

  const theme  = ROLE_THEME[user.role] ?? ROLE_THEME['student'];
  const navItems = user.role === 'student' ? STUDENT_NAV
                 : user.role === 'teacher' ? TEACHER_NAV
                 : ADMIN_NAV;

  const navigate = (href: string) => {
    const menu = document.querySelector('ion-menu');
    (menu as any)?.close();
    history.push(href);
  };

  const handleLogout = () => {
    logout();
    history.replace('/welcome');
  };

  return (
    <>
      <IonMenu contentId="main-content" type="overlay" className="als-side-menu">
        {/* ── Header ── */}
        <IonHeader className="menu-header ion-no-border">
          <IonToolbar style={{ '--background': theme.gradient, '--color': '#fff' } as any}>
            <div className="menu-user-card">
              <div className="menu-avatar">{user.avatar}</div>
              <div className="menu-user-info">
                <p className="menu-user-name">{user.name}</p>
                <span className="menu-role-badge">{theme.label}</span>
              </div>
            </div>
            <div className="menu-logo-row">
              <IonIcon icon={schoolOutline} className="menu-logo-icon" />
              <span className="menu-logo-text">ALS · LMS 2026</span>
            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent className="menu-content">
          <IonList className="menu-list">
            {navItems.map((item) => {
              const active = location.pathname.startsWith(item.href);
              return (
                <IonItem
                  key={item.href}
                  button
                  detail={false}
                  lines="none"
                  className={`menu-item ${active ? 'menu-item-active' : ''}`}
                  style={{ '--active-color': theme.color } as any}
                  onClick={() => navigate(item.href)}
                >
                  <IonIcon icon={item.icon} slot="start" className="menu-item-icon" />
                  <IonLabel>{item.label}</IonLabel>
                </IonItem>
              );
            })}
          </IonList>

          <div className="menu-footer">
            <div className="menu-logout-btn ion-activatable" onClick={() => setShowLogout(true)}>
              <IonRippleEffect />
              <IonIcon icon={logOutOutline} />
              <span>Sign Out</span>
            </div>
            <p className="menu-version">ALS-LMS 2026 • v1.0.0</p>
          </div>
        </IonContent>
      </IonMenu>

      <IonAlert
        isOpen={showLogout}
        onDidDismiss={() => setShowLogout(false)}
        header="Sign Out"
        message="Are you sure you want to sign out of ALS-LMS?"
        buttons={[
          { text: 'Cancel', role: 'cancel' },
          { text: 'Sign Out', role: 'destructive', handler: handleLogout },
        ]}
      />
    </>
  );
};

export default SideMenu;
