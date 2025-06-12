'use client';

import { useEffect, useState } from 'react';
import { useSchedule } from '@/contexts/ScheduleContext';
import { getScheduleStatusColor, formatDateToLocalString } from '@/types/schedule';
import { FaEye, FaEdit, FaTrash, FaClock, FaMapMarkerAlt, FaUser, FaBuilding } from 'react-icons/fa';
import ScheduleModal from './ScheduleModal';
import { useRouter, useSearchParams } from 'next/navigation';

interface ScheduleListProps {
  openModal: () => void;
}

export default function ScheduleList({ openModal }: ScheduleListProps) {
  const { schedules, loading, error, getSchedules, deleteSchedule, setSelectedSchedule } = useSchedule();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    getSchedules();
  }, [getSchedules]);

  useEffect(() => {
    const id = searchParams.get('id');
    const action = searchParams.get('action');
    
    if (id && action === 'edit') {
      handleEdit(id);
    } else if (id && action === 'view') {
      handleView(id);
    }
  }, [searchParams]);

  const handleView = async (id: string) => {
    const schedule = schedules.find(s => s.id === id) || await getScheduleById(id);
    if (schedule) {
      setSelectedSchedule(schedule);
      setIsViewModalOpen(true);
    }
  };

  const handleEdit = async (id: string) => {
    const schedule = schedules.find(s => s.id === id) || await getScheduleById(id);
    if (schedule) {
      setSelectedSchedule(schedule);
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setScheduleToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (scheduleToDelete) {
      await deleteSchedule(scheduleToDelete);
      setIsDeleteModalOpen(false);
      setScheduleToDelete(null);
    }
  };

  const getScheduleById = async (id: string) => {
    try {
      const response = await fetch(`/api/schedules/${id}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>Error loading schedules: {error}</p>
        <button
          onClick={() => getSchedules()}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!schedules.length) {
    return (
      <div className="p-8 text-center text-gray-600">
        <p className="text-lg mb-4">No schedules found</p>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Create Schedule
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schedules.map((schedule) => (
              <tr key={schedule.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{schedule.title}</div>
                      <div className="text-sm text-gray-500">
                        {schedule.service?.name || 'No service specified'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm text-gray-900">{new Date(schedule.startDate).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <FaClock className="mr-1" size={12} />
                      {new Date(schedule.startDate).toLocaleTimeString()} - {new Date(schedule.endDate).toLocaleTimeString()}
                    </div>
                    {schedule.location && (
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <FaMapMarkerAlt className="mr-1" size={12} />
                        {schedule.location}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {schedule.client ? (
                    <div className="flex items-center">
                      <FaBuilding className="mr-2 text-gray-400" size={14} />
                      <div className="text-sm text-gray-900">{schedule.client.name}</div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">No client specified</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getScheduleStatusColor(schedule.status)}`}>
                    {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {schedule.assignedTo ? (
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-gray-400" size={14} />
                      <span>{schedule.assignedTo.name}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">Unassigned</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleView(schedule.id)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="View details"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(schedule.id)}
                      className="text-green-600 hover:text-green-900 p-1"
                      title="Edit schedule"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(schedule.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete schedule"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Schedule Modal */}
      <ScheduleModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedSchedule(null);
          router.push('/admin/schedule');
        }}
        viewOnly={true}
      />

      {/* Edit Schedule Modal */}
      <ScheduleModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedSchedule(null);
          router.push('/admin/schedule');
        }}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this schedule? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
