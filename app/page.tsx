import { useEffect, useState } from 'react';

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [daysPassed, setDaysPassed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchProgress = async () => {
      const res = await fetch('/api/progress');
      const data = await res.json();
      
      setProgress(data.percentage);
      setDaysPassed(data.daysPassed);
      setIsComplete(data.isComplete);
      setEndDate(data.endDate);
      setCurrentDate(data.currentDate);
    };

    fetchProgress();
    
    const interval = setInterval(fetchProgress, 86400000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>365 Gün Sayacı</h1>
      <h3>Başlangıç Tarihi: {currentDate}</h3>
      <h3>Bitiş Tarihi: {endDate}</h3>
      
      <div style={{ marginTop: '20px', width: '300px', margin: '0 auto' }}>
        <progress value={progress} max="100" style={{ width: '100%' }} />
        <div>{progress.toFixed(2)}%</div>
      </div>

      {isComplete && <h2>365 Gün Tamamlandı!</h2>}
      {!isComplete && (
        <div>
          <h3>{daysPassed} Gün Geçti</h3>
          <h3>Geriye Kalan: {365 - daysPassed} Gün</h3>
        </div>
      )}
    </div>
  );
}
