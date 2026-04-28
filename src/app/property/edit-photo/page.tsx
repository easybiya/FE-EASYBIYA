import EditPhotoClient from './EditPhotoClient';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ propertyId?: string }>;
}) {
  const { propertyId = '' } = await searchParams;
  return <EditPhotoClient propertyId={propertyId} />;
}
