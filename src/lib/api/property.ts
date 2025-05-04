import instance from "./axiosInstance";

export const postProperty = async (formData: FormData) => {
  const res = await fetch('http://localhost:8080/api/property', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('매물 등록 실패');
  }

  return await res.json();
};

export const updatePropertyImages = async (propertyId: number, formData: FormData) => {
  const res = await instance.put(`/api/property/${propertyId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!res.data) throw new Error('이미지 수정 실패');
  return res.data;
};