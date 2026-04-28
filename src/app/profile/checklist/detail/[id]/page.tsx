import ChecklistDetail from './ChecklistDetail';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const { id } = await params;
  const { mode } = await searchParams;
  return <ChecklistDetail templateId={id} isNewTemplate={mode === 'new'} />;
}
