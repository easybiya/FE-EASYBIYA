import { ChecklistTemplate } from '@/types/checklist';
import instance from './axiosInstance';
import axiosInstance from './axiosInstance';

export const getTemplateById = async (templateId: string) => {
  const res = await axiosInstance.get(`/api/template/${templateId}`);
  return res.data.result;
};

export const fetchTemplates = async (page: number) => {
  const res = await fetch(`http://localhost:8080/api/template?page=${page}`);
  const data = await res.json();
  return data.result;
};

export const postTemplate = async (template: ChecklistTemplate) => {
  const res = await instance.post('/api/template', template);
  return res.data;
};

export const editTemplate = async (templateId: string, template: ChecklistTemplate) => {
  const result = await instance.put(`/api/template/${templateId}`, template);
  return result.data;
};
