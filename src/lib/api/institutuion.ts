import instance from './axiosInstance';

export const getInstitutions = async () => {
  const result = await instance.get('/api/member/institution');
  return result.data.result;
};

interface InstitutionProps {
  institutionName: string;
  institutionAddress: string;
  institutionLatitude: number;
  institutionLongitude: number;
}

export const fetchInstitution = async (body: InstitutionProps) => {
  const result = await instance.post(`/api/member/institution`, body);
  return result.data.result;
};
