// "use client"
// import { useEffect, useState } from 'react';
// import BugBox from '../../components/BugBox';

// interface Bug {
//   id: number;
//   title: string;
//   description: string;
//   status?: string;
//   priority: string;
//   timeSpent: number;
// }

// export default function Home() {
//   const [bugs, setBugs] = useState<Bug[]>([]);

//   useEffect(() => {
//     const fetchBugs = async () => {
//       try {
//         const response = await fetch('/api/bugs');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setBugs(data.bugs);
//       } catch (error) {
//         console.error('Failed to fetch bugs:', error);
//       }
//     };

//     fetchBugs();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Bug Tracker</h1>
//       {bugs.length > 0 ? (
//         bugs.map((bug) => (
//           <BugBox key={bug.id} bug={bug}/>
         
          
//         ))
//       ) : (
//         <p>No bugs found</p>

//       )}
//     </div>
//   );
// }
// Home.tsx
// Home.tsx
"use client";

import { useEffect, useState } from 'react';
import BugBox from '../../components/BugBox';
import TimeSpent from '../../components/TimeSpent';

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
      }
    };

    fetchBugs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bug Tracker</h1>
      <TimeSpent />
      {bugs.length > 0 ? (
        bugs.map((bug) => (
          <BugBox key={bug.id} bug={bug} />
        ))
      ) : (
        <p>No bugs found</p>
      )}
    </div>
  );
}

