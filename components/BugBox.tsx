// components/BugBox.tsx

import { useRouter } from 'next/navigation';

interface Bug {
  id: number;
  title: string;
  description: string;
  status?: string;
  priority: string;
}

interface BugBoxProps {
  bug: Bug;
}

const BugBox = ({ bug }: BugBoxProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/bugs/${bug.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-gray-800 text-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center"
    >
      <div>
        <h2 className="font-bold text-lg">{bug.title}</h2>
        <p>{bug.description}</p>
      </div>
      <div>
        <span className={`status ${bug.status?.toLowerCase()} px-4`}>Status:{bug.status}</span>
        <span className={`priority ${bug.priority.toLowerCase()}`}>Priority: {bug.priority}</span>
      </div>
    </div>
  );
};

export default BugBox;
