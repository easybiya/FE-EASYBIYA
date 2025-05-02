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
