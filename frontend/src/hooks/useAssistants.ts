import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import { 
  fetchAssistants, 
  fetchAssistantById, 
  createAssistant, 
  updateAssistant, 
  deleteAssistant 
} from '../store/slices/assistantsSlice';
import type { CreateAssistantData, UpdateAssistantData } from '../api/assistants';

export const useAssistants = () => {
  const dispatch = useAppDispatch();
  const { assistants, loading, error, selectedAssistant } = useAppSelector(state => state.assistants);

  const getAllAssistants = async () => {
    return await dispatch(fetchAssistants());
  };

  const getAssistantById = async (id: string) => {
    return await dispatch(fetchAssistantById(id));
  };

  const createNewAssistant = async (data: CreateAssistantData) => {
    return await dispatch(createAssistant(data));
  };

  const updateExistingAssistant = async (id: string, data: UpdateAssistantData) => {
    return await dispatch(updateAssistant({ id, data }));
  };

  const deleteExistingAssistant = async (id: string) => {
    return await dispatch(deleteAssistant(id));
  };

  return {
    assistants,
    loading,
    error,
    selectedAssistant,
    getAllAssistants,
    getAssistantById,
    createAssistant: createNewAssistant,
    updateAssistant: updateExistingAssistant,
    deleteAssistant: deleteExistingAssistant,
  };
}; 