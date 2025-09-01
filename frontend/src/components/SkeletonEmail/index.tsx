type SkeletonEmailProps = {
  skeletonItems?: number;
  isLoading: boolean;
};

const SkeletonEmail = ({
  skeletonItems = 3,
  isLoading,
}: SkeletonEmailProps) => {
  if (!isLoading) return null;

  return Array.from({ length: skeletonItems }, (_, index) => (
    <li key={index} className="border border-border p-4 relative rounded-md">
      <div className="animate-pulse h-4 w-32 bg-gray-200 rounded" />

      <div className="animate-pulse h-5 w-64 mt-2 bg-gray-200 rounded" />

      <div className="animate-pulse w-24 h-6 mt-2 bg-gray-200 absolute right-4 top-4 rounded-full" />

      <div className="mt-5 space-y-1">
        <div className="animate-pulse h-4 w-40 bg-gray-200 rounded" />
        <div className="animate-pulse h-10 w-full bg-gray-200 rounded" />
      </div>
    </li>
  ));
};

export default SkeletonEmail;
