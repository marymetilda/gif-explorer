type ErrorMessageProps = {
  message: string;
  onDismiss?: () => void;
  className?: string;
};

export default function ErrorMessage({ 
  message, 
  onDismiss,
  className = '' 
}: ErrorMessageProps) {
  return (
    <div 
      className={`p-4 mb-4 text-red-700 bg-red-100 rounded-lg flex flex-col items-center justify-center min-h-[60vh] ${className}`}
      role="alert"
    >
      <div className="flex flex-col items-center pb-4">
        <h3 className="font-medium">Something went wrong</h3>
        <p className="text-sm">{message}</p>
      </div>
      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="ml-4 px-2 py-1 text-sm text-red-700 hover:text-red-900 focus:outline-none border border-red-300 rounded"
          aria-label="Dismiss error"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}
