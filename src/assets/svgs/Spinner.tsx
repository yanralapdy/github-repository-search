export const Spinner = ({ className }: { className?: string }) => (
  <div className={`flex justify-center items-center p-4 ${className}`} role="status">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
  </div>
);
