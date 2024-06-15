// // components/BugBox.tsx

// import { useRouter } from 'next/navigation';

// interface Bug {
//   id: number;
//   title: string;
//   description: string;
//   status?: string;
//   priority: string;
// }

// interface BugBoxProps {
//   bug: Bug;
// }

// const BugBox = ({ bug }: BugBoxProps) => {
//   const router = useRouter();

//   const handleClick = () => {
//     router.push(`/bugs/${bug.id}`);
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className="cursor-pointer border text-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center"
//     >
//       <div>
//         <h2 className="font-bold text-lg">{bug.title}</h2>
//         <p>{bug.description}</p>
//       </div>
//       <div>
//         <span className={`status ${bug.status?.toLowerCase()} px-4`}>Status:{bug.status}</span>
//         <span className={`priority ${bug.priority.toLowerCase()}`}>Priority: {bug.priority}</span>
//       </div>
//     </div>
//   );
// };

// export default BugBox;
// BugBox.tsx
// BugBox.tsx
// BugBox.tsx
// components/BugBox.tsx
// components/BugBox.tsx
import React from 'react';
import { useRouter } from 'next/navigation';

interface Bug {
  id: number;
  title: string;
  description: string;
  status?: string;
  priority: string;
  totalTimeSpent: number;
}

interface BugBoxProps {
  bug: Bug;
}

const BugBox: React.FC<BugBoxProps> = ({ bug }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/bugs/${bug.id}`);
  };

  return (
    <div className="border p-4 mb-4 cursor-pointer" onClick={handleClick}>
      <h2 className="text-xl font-bold">{bug.title}</h2>
      <p><strong>Description:</strong> {bug.description}</p>
      <p><strong>Status:</strong> {bug.status}</p>
      <p><strong>Priority:</strong> {bug.priority}</p>
      <p><strong>Total Time Spent:</strong> {Math.floor(bug.totalTimeSpent / 1000)} seconds</p>
    </div>
  );
};

export default BugBox;
