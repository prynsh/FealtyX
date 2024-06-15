"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Modal from '../../components/Modal';

interface Task {
  id: number;
  title: string;
  description: string;
  project: string;
  assignee: string;
  dueDate: string;
  priority: string;
}

const BugsPage = () => {
  const [formData, setFormData] = useState<Task>({
    id: 0,
    title: '',
    description: '',
    project: '',
    assignee: '',
    dueDate: '',
    priority: 'Medium'
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/bugs');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data.bugs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (selectedPriority === 'All') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task => task.priority === selectedPriority);
      setFilteredTasks(filtered);
    }
  }, [tasks, selectedPriority]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/bugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const bugData: Task = await response.json();
      alert('Bug created successfully!');
      setTasks([...tasks, bugData]);
      setFormData({
        id: 0,
        title: '',
        description: '',
        project: '',
        assignee: '',
        dueDate: '',
        priority: 'Medium'
      });
      setIsModalOpen(false);
      router.push("/bugs")
    } catch (error) {
      alert('Failed to create bug.');
      console.error(error);
    }
  };

  const handleEdit = (task: Task) => {
    setFormData(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await fetch(`/api/bugs?id=${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete task');
        }

        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);

        alert('Task deleted successfully!');
        router.push("/bugs")
      } catch (error) {
        console.error(error);
        alert('Failed to delete task.');
      }
    }
  };

  const handleViewDetails = (id: number) => {
    router.push(`/bugs/${id}`);
  };

  return (
    <div className="min-h-screen flex bg-black text-white">
      <div className="w-full p-6 space-y-4 rounded-md shadow-md">
        <div className='flex justify-between items-center'>
          <h1 className="text-2xl font-bold mb-4 text-white text-center">All Tasks</h1>
          
          <div className="flex items-center space-x-4">
          <select
              className="p-2 rounded-md text-white bg-black"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <div
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center bg-gray-800 p-4 rounded-full cursor-pointer"
            >
              New Task
            </div>
            
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTasks.map((task, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg cursor-pointer"
              onClick={() => handleViewDetails(task.id)}
            >
              <h2 className="text-xl font-bold">{task.title}</h2>
              <p>{task.description}</p>
              <p>Project: {task.project}</p>
              <p>Assignee: {task.assignee}</p>
              <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Priority: {task.priority}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  className="bg-black text-white px-4 py-2 rounded-md"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BugsPage;
