
"use client";

"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import React from "react";

interface Bug {
  id: number;
  title: string;
  description: string;
  status?: string;
  priority: string;
  totalTimeSpent: number;
}

const BugDetails = () => {
  const { id } = useParams();
  const [bug, setBug] = useState<Bug | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  const fetchBug = useCallback(async () => {
    if (id) {
      try {
        const response = await fetch(`/api/bugs?id=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBug(data.bug);
      } catch (error) {
        console.error('Failed to fetch bug:', error);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchBug();
  }, [fetchBug]);

  useEffect(() => {
    if (bug && startTime === null) {
      setStartTime(Date.now());
    }
  }, [bug, startTime]);

  useEffect(() => {
    return () => {
      if (startTime !== null) {
        const endTime = Date.now();
        const timeSpent = endTime - startTime;

        fetch('/api/timeSpent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bugId: id,
            timeSpent: timeSpent,
          }),
        }).then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            setBug((prevBug) => prevBug ? { ...prevBug, totalTimeSpent: data.updatedBug.totalTimeSpent } : null);
          }
        }).catch((error) => console.error('Failed to send time spent data:', error));
      }
    };
  }, [startTime, id]);

  if (!bug) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{bug.title}</h1>
      <p><strong>Description:</strong> {bug.description}</p>
      <p><strong>Status:</strong> {bug.status}</p>
      <p><strong>Priority:</strong> {bug.priority}</p>
      <p><strong>Total Time Spent:</strong> {Math.floor(bug.totalTimeSpent / 1000)} seconds</p>
    </div>
  );
};

export default BugDetails;

