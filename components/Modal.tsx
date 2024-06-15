import React from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  formData: {
    id: number;
    title: string;
    description: string;
    project: string;
    assignee: string;
    dueDate: string;
    priority: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ formData, handleChange, handleSubmit, closeModal }) => {
  const router = useRouter();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e); // Assuming handleSubmit handles form submission logic
    router.push('/bugs'); // Redirect to "/bugs" after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create/Edit Task</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-white">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Project</label>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Assignee</label>
            <input
              type="text"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
