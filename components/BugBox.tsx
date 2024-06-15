
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
      <div className='flex justify-between'>
      <h2 className="text-xl font-bold">{bug.title}</h2>
      <p><strong>Total Time Spent:</strong> {Math.floor(bug.totalTimeSpent / 1000)} seconds</p>
      </div>
      <p><strong>Description:</strong> {bug.description}</p>
      <p><strong>Status:</strong> {bug.status}</p>
      <p><strong>Priority:</strong> {bug.priority}</p>
      
    </div>
  );
};

export default BugBox;
