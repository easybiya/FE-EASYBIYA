import EditPageClient from './EditPageClient';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ propertyId?: string }>;
}) {
  const { propertyId = '' } = await searchParams;
  return <EditPageClient propertyId={propertyId} />;
}
