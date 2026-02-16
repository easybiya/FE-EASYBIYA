import { deleteAccount } from '@/lib/api/account';
import { useMutation } from '@tanstack/react-query';

const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
    onError: () => console.error('계정 삭제 실패'),
  });
};
export default useDeleteAccount;
