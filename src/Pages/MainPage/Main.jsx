import React from 'react'
import videobg from '../../assets/farming.mp4'

const Main = () => {
  return (
    <div className='main'>
      * <div className='overlay'></div>
        <video src={videobg} autoPlay loop muted id='bg-video' />
        <div className='content'>
          {/* <h1>ברוכים הבאים לאתר</h1> */}
          <h1>ברוכים הבאים לאתר Farmers2U</h1> 
          <div className='subtitle'>
            <h2>האתר מהווה פלטפורמה לתקשורת ישירה בין צרכנים לחקלאים.</h2>
            <h2>בלחיצה על לוח מודעות נפרס לוח פרסום ושיווק של סחורת חקלאים מכלל רחבי הארץ,</h2>
            <h2>כאשר כל מודעה מגיעה מטעם חקלאי המשתמש באתר.</h2>
            <h2>לחיצה על פרופיל חקלאי, תוביל למידע ודרכי התקשרות עימו.</h2>
          </div>
          <div className='farmer'>
            <h2>באפשרות החקלאים להירשם ולפתוח משתמש יעודי באתר, דרכו יוכלו לפרסם את סחורתם באתר.</h2>
            <h2>במודעות שיתפרסמו באתר, החקלאי רשאי לשווק את סחורתו, תוך מילוי מספר פרטים שהינם בגדר חובה כמו:</h2>
            <h2>סוג המוצר, טווח מחירים, מקום המכירה,זמני המכירה.</h2>
          </div>
          <div className='costumer'>
            <h2>באפשרות הצרכנים להתעדכן בסחורה הנמכרת ע"י משתמשינו החקלאים, באמצעות לוח המודעות המוצג באתר.</h2>
            <h2>המידע המוצג בלוח המודעות ניתן לסינון ע"י מספר קריטריונים כגון:</h2>
            <h2>סוג המוצר, האם הוא אורגני, אפשרויות משלוח או מיקום איסוף המוצר.</h2>
            <h2>לרשות הצרכנים עומדת גם כן האפשרות של פתיחת משתמש יעודי לצרכן, והוספת תגובות על מודעות.</h2>
          </div>
            {/* <h2 className='question'>מה האתר מציע?</h2> */}

        </div>
    </div>
  )
}

export default Main