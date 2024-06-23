
// "use client";

// import AppBar from '@/components/AppBar';
// import { useParams } from 'next/navigation';
// import { useEffect, useState, useCallback } from 'react';
// import React from "react";

// interface Bug {
//   id: number;
//   title: string;
//   description: string;
//   status?: string;
//   priority: string;
//   totalTimeSpent: number;
// }

// const BugDetails = () => {
//   const { id } = useParams();
//   const [bug, setBug] = useState<Bug | null>(null);
//   const [startTime, setStartTime] = useState<number | null>(null);

//   const fetchBug = useCallback(async () => {
//     if (id) {
//       try {
//         const response = await fetch(`/api/bugs?id=${id}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setBug(data.bug);
//       } catch (error) {
//         console.error('Failed to fetch bug:', error);
//       }
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchBug();
//   }, [fetchBug]);

//   useEffect(() => {
//     if (bug && startTime === null) {
//       setStartTime(Date.now());
//     }
//   }, [bug, startTime]);

//   useEffect(() => {
//     return () => {
//       if (startTime !== null) {
//         const endTime = Date.now();
//         const timeSpent = endTime - startTime;

//         fetch('/api/timeSpent', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             bugId: id,
//             timeSpent: timeSpent,
//           }),
//         }).then(async (response) => {
//           if (response.ok) {
//             const data = await response.json();
//             setBug((prevBug) => prevBug ? { ...prevBug, totalTimeSpent: data.updatedBug.totalTimeSpent } : null);
//           }
//         }).catch((error) => console.error('Failed to send time spent data:', error));
//       }
//     };
//   }, [startTime, id]);

//   if (!bug) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <AppBar/>
//         <div className="container mx-auto p-4">
//           <h1 className="text-2xl font-bold mb-4">{bug.title}</h1>
//           <p><strong>Description:</strong> {bug.description}</p>
//           <p><strong>Status:</strong> {bug.status}</p>
//           <p><strong>Priority:</strong> {bug.priority}</p>
//           <p><strong>Total Time Spent:</strong> {Math.floor(bug.totalTimeSpent / 1000)} seconds</p>
//         </div>
//     </div>
//   );
// };

// export default BugDetails;

"use client";

import AppBar from '@/components/AppBar';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import React from "react";
import EditModal from '@/components/EditModal';
import { message } from "antd";

interface Bug {
  id: number;
  title: string;
  description: string;
  project?: string;
  assignee?: string;
  dueDate?: string;
  status?: string;
  priority: string;
  totalTimeSpent: number;
}

const BugDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [bug, setBug] = useState<Bug | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Bug | null>(null);

  const fetchBug = useCallback(async () => {
    if (id) {
      try {
        const response = await fetch(`/api/bugs?id=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBug(data.bug);
        setFormData(data.bug);
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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await fetch(`/api/bugs?id=${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete task');
        }

        message.success('Task deleted successfully!');
        router.push("/bugs");
      } catch (error) {
        console.error(error);
        message.error('Failed to delete task.');
      }
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => prevData ? { ...prevData, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData) {
      try {
        const response = await fetch(`/api/bugs?id=${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const updatedBug: Bug = await response.json();
        message.success('Bug updated successfully!');
        setBug(updatedBug);
        setIsModalOpen(false);
        router.push("/bugs");
      } catch (error) {
        message.error('Failed to update bug.');
        console.error(error);
      }
    }
  };

  if (!bug) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{bug.title}</h1>
        <p><strong>Description:</strong> {bug.description}</p>
        <p><strong>Status:</strong> {bug.status}</p>
        <p><strong>Priority:</strong> {bug.priority}</p>
        <p><strong>Total Time Spent:</strong> {Math.floor(bug.totalTimeSpent / 1000)} seconds</p>
        <div className="flex space-x-2 mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {isModalOpen && formData && (
        <EditModal
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BugDetails;
