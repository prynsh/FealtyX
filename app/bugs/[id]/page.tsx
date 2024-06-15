"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import React from "react";

interface Bug {
  id: number;
  title: string;
  description: string;
  status?: string;
  priority: string;
  totalTimeSpent: number;
}

let fullTime = 0;

const BugDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const [bug, setBug] = useState<Bug | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBug = async () => {
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
      };

      fetchBug();
    }
  }, [id]);

  useEffect(() => {
    if (bug) {
      setStartTime(Date.now());
      console.log('Start Time:', Date.now());
    }

    return () => {
      if (startTime) {
        const endTime = Date.now();
        const timeSpent = endTime - startTime;
        fullTime += timeSpent;
        console.log(`Time spent on bug ${id}: ${Math.floor(timeSpent / 1000)} seconds`);
        console.log(`Total time spent across all bugs: ${Math.floor(fullTime / 1000)} seconds`);

        fetch('/api/timeSpent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bugId: id,
            timeSpent: timeSpent,
          }),
        }).catch((error) => console.error('Failed to send time spent data:', error));
      }
    };
  }, [bug, id]);

  if (!bug) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{bug.title}</h1>
      <p><strong>Description:</strong> {bug.description}</p>
      <p><strong>Status:</strong> {bug.status}</p>
      <p><strong>Priority:</strong> {bug.priority}</p>
    </div>
  );
};

export default BugDetails;