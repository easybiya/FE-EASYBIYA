import Header from '@/components/Layout/Header';
import { useDefaultTemplate } from '@/hooks/checklist/useDefaultTemplate';
import { useRouter } from 'next/router';

export default function ChecklistDetail() {
  const router = useRouter();
  const { id } = router.query;
  const propertyId = typeof id === 'string' ? id : undefined;

  const defaultTemplate = useDefaultTemplate();
  console.log(defaultTemplate);

  return (
    <div>
      <Header title={defaultTemplate?.name ?? ''} type={4} />
    </div>
  );
}
