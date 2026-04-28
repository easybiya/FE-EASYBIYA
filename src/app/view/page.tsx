import SharedView from './SharedView';

export default async function ViewPage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids = '' } = await searchParams;
  return <SharedView ids={ids} />;
}
