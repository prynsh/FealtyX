"use client"

import { useEffect, useState } from 'react';
import BugBox from '../../components/BugBox';
import TimeSpent from '../../components/TimeSpent';
import AppBar from '@/components/AppBar';

interface Bug {
  id: number;
  title: string;
  description: string;
  status?: string;
  priority: string;
  totalTimeSpent: number;
}

export default function Home() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await fetch('/api/bugs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBugs(data.bugs);
      } catch (error) {
        console.error('Failed to fetch bugs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  return (
    <div>
      <AppBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Bug Tracker</h1>
        <TimeSpent />
        <div className="bug-list-container" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            bugs.length > 0 ? (
              bugs.map((bug) => (
                <BugBox key={bug.id} bug={bug} />
              ))
            ) : (
              <p>No bugs found</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
