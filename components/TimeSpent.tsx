
import React, { useEffect, useState } from 'react';

interface TimeSpentProps {
  bugId?: number;
}

const TimeSpent: React.FC<TimeSpentProps> = ({ bugId }) => {
  const [totalTime, setTotalTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (bugId) {
      setStartTime(Date.now());
    }

    return () => {
      if (startTime) {
        const endTime = Date.now();
        const timeSpent = endTime - startTime;

        // Fetch the current total time from the API or local storage
        const currentTotalTime = parseInt(localStorage.getItem('totalTimeSpent') || '0', 10);

        const newTotalTime = currentTotalTime + timeSpent;
        setTotalTime(newTotalTime);
        
        // Save the new total time to local storage or send to the API
        localStorage.setItem('totalTimeSpent', newTotalTime.toString());

        fetch('/api/timeSpent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bugId: bugId,
            timeSpent: timeSpent,
          }),
        }).catch((error) => console.error('Failed to send time spent data:', error));
      }
    };
  }, [bugId, startTime]);

  useEffect(() => {

    const currentTotalTime = parseInt(localStorage.getItem('totalTimeSpent') || '0', 10);
    setTotalTime(currentTotalTime);
  }, []);

  return (
    <div className="p-4">
      {/* <h2 className="text-xl font-bold">Total Time Spent</h2> */}
      {/* <p>{Math.floor(totalTime / 1000)} seconds</p> */}
    </div>
  );
};

export default TimeSpent;
