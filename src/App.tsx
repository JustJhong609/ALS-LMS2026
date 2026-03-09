import React, { createContext, useContext, useState } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

import WelcomePage       from './pages/Welcome';
import LoginPage         from './pages/Login';
import RegisterPage      from './pages/Register';
import StudentTabs       from './pages/student/StudentTabs';
import TeacherTabs       from './pages/teacher/TeacherTabs';
import AdminTabs         from './pages/admin/AdminTabs';
import SideMenu          from './components/SideMenu';

setupIonicReact();

/* ── Auth Context (frontend mock) ── */
export interface AuthUser {
  id:     string;
  name:   string;
  email:  string;
  role:   'student' | 'teacher' | 'admin';
  avatar: string;
  grade?: string;
}

interface AuthCtx {
  user: AuthUser | null;
  login:  (u: AuthUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthCtx>({
  user: null,
  login:  () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const App: React.FC = () => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login  = (u: AuthUser) => setUser(u);
  const logout = ()            => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <IonApp>
        <IonReactHashRouter>
          {user ? (
            <IonSplitPane contentId="main-content">
              <SideMenu />
              <IonRouterOutlet id="main-content">
                <Switch>
                  {user.role === 'student' && (
                    <Route path="/student" render={() => <StudentTabs />} />
                  )}
                  {user.role === 'teacher' && (
                    <Route path="/teacher" render={() => <TeacherTabs />} />
                  )}
                  {user.role === 'admin' && (
                    <Route path="/admin" render={() => <AdminTabs />} />
                  )}
                  <Redirect
                    exact
                    from="/"
                    to={
                      user.role === 'student' ? '/student/dashboard'
                      : user.role === 'teacher' ? '/teacher/dashboard'
                      : '/admin/dashboard'
                    }
                  />
                  <Redirect to={user.role === 'student' ? '/student/dashboard' : user.role === 'teacher' ? '/teacher/dashboard' : '/admin/dashboard'} />
                </Switch>
              </IonRouterOutlet>
            </IonSplitPane>
          ) : (
            <IonRouterOutlet>
              <Route exact path="/"        component={WelcomePage} />
              <Route exact path="/login"   component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Redirect to="/" />
            </IonRouterOutlet>
          )}
        </IonReactHashRouter>
      </IonApp>
    </AuthContext.Provider>
  );
};

export default App;
