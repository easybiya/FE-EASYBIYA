import DefaultTemplate from './DefaultTemplate';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  return <DefaultTemplate isNewTemplate={mode === 'new'} />;
}
