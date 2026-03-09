import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent,
  IonIcon, IonRippleEffect, IonButton, IonProgressBar,
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { chevronBack, chevronForward, bookOutline, timeOutline } from 'ionicons/icons';
import './LessonViewer.css';

/* Mock lesson content */
const LESSONS: Record<string, { title: string; subject: string; duration: string; type: string; content: string; color: string }> = {
  l1: {
    title:    'Panimula sa Filipino',
    subject:  'Communication Arts (Filipino)',
    duration: '15 min',
    type:     'reading',
    color:    '#1d4ed8',
    content: `
## Ano ang Filipino?

Ang **Filipino** ay ang pambansang wika ng Pilipinas. Ito ay batay sa **Tagalog** at may mga salita mula sa iba't ibang katutubong wika ng Pilipinas.

### Mga Katangian ng Filipino

Ang Filipino ay:
- **Mayaman** - maraming salita at ekspresyon
- **Mapagpahayag** - malinaw na nagpapahayag ng damdamin
- **Dinamiko** - patuloy na lumalago at nagbabago

### Bakit Mahalaga ang Filipino?

1. Ito ang **wikang nagbubuklod** sa lahat ng Pilipino
2. Nakakatulong sa **pagkakaisa** ng bansa
3. Nagsisilbing **tulay** sa pagitan ng iba't ibang tribong Pilipino

### Halimbawa ng Mga Salita

| Salita | Kahulugan |
|--------|-----------|
| Maganda | Beautiful |
| Mabuti  | Good      |
| Maraming Salamat | Thank you very much |

---

*"Ang hindi marunong magmahal sa sariling wika ay higit pa sa hayop at malansang isda."* — José Rizal
    `,
  },
  l4: {
    title:    'Reading Comprehension',
    subject:  'Communication Arts (English)',
    duration: '30 min',
    type:     'reading',
    color:    '#16a34a',
    content: `
## Reading Comprehension Skills

**Reading comprehension** is the ability to process text, understand its meaning, and integrate with what the reader already knows.

### Key Strategies

#### 1. Preview the Text
Before reading, scan headings, images, and key terms to get an overview.

#### 2. Ask Questions While Reading
- Who? What? When? Where? Why? How?
- This keeps your mind engaged.

#### 3. Identify the Main Idea
Every paragraph has a **main idea** — the most important point the author wants to make.

#### 4. Context Clues
Use surrounding words to figure out unfamiliar vocabulary.

### Practice Paragraph

> *Maria woke up early every morning to study. She believed that hard work was the key to success. Despite coming from a poor family, she never gave up on her dream of becoming a doctor.*

**Questions:**
1. What did Maria do every morning?
2. What did she want to become?
3. What challenges did she face?
    `,
  },
};

const DEFAULT_LESSON = LESSONS['l1'];

const LessonViewer: React.FC = () => {
  const history = useHistory();
  const { id }  = useParams<{ id: string }>();
  const lesson  = LESSONS[id] ?? DEFAULT_LESSON;

  const [scrollPct,   setScrollPct]   = useState(0);
  const [completed,   setCompleted]   = useState(false);

  const handleScroll = (e: CustomEvent) => {
    const el = e.target as HTMLIonContentElement;
    el.getScrollElement().then((scroll) => {
      const pct = scroll.scrollTop / (scroll.scrollHeight - scroll.clientHeight);
      setScrollPct(Math.min(1, pct));
      if (pct > 0.9) setCompleted(true);
    });
  };

  /* Render simple markdown-like content */
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('## '))    return <h2 key={i} className="lv-h2">{line.slice(3)}</h2>;
        if (line.startsWith('### '))   return <h3 key={i} className="lv-h3">{line.slice(4)}</h3>;
        if (line.startsWith('#### '))  return <h4 key={i} className="lv-h4">{line.slice(5)}</h4>;
        if (line.startsWith('- '))     return <li key={i} className="lv-li">{line.slice(2).replace(/\*\*(.*?)\*\*/g, '$1')}</li>;
        if (line.match(/^\d\./))       return <p key={i} className="lv-ol">{line}</p>;
        if (line.startsWith('> '))     return <blockquote key={i} className="lv-quote">{line.slice(2)}</blockquote>;
        if (line.startsWith('---'))    return <hr key={i} className="lv-hr" />;
        if (line.startsWith('*') && line.endsWith('*')) return <p key={i} className="lv-italic">{line.slice(1, -1)}</p>;
        if (line.trim() === '')        return <br key={i} />;
        return <p key={i} className="lv-p">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
      });
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="lv-toolbar" style={{ '--bar-color': lesson.color } as React.CSSProperties}>
          <button className="lv-back ion-activatable" onClick={() => history.goBack()}>
            <IonRippleEffect />
            <IonIcon icon={chevronBack} />
          </button>
          <div className="lv-toolbar-info">
            <p className="lv-subject">{lesson.subject}</p>
            <p className="lv-lesson-title">{lesson.title}</p>
          </div>
        </IonToolbar>
        <IonProgressBar value={scrollPct} color="success" />
      </IonHeader>

      <IonContent className="lv-content" onIonScroll={handleScroll} scrollEvents>

        {/* Meta row */}
        <div className="lv-meta">
          <span className="lv-meta-pill">
            <IonIcon icon={bookOutline} /> {lesson.type}
          </span>
          <span className="lv-meta-pill">
            <IonIcon icon={timeOutline} /> {lesson.duration}
          </span>
          {completed && <span className="lv-meta-pill done">✓ Completed!</span>}
        </div>

        {/* Content */}
        <div className="lv-body">
          {renderContent(lesson.content)}
        </div>

        {/* Navigation */}
        <div className="lv-nav">
          <IonButton fill="outline" className="lv-nav-btn" onClick={() => history.goBack()}>
            <IonIcon icon={chevronBack} slot="start" />
            Back
          </IonButton>
          <IonButton
            className="lv-nav-btn-next"
            disabled={!completed}
            onClick={() => history.goBack()}
          >
            {completed ? 'Mark Done ✓' : 'Read to 90%'}
            <IonIcon icon={chevronForward} slot="end" />
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default LessonViewer;
