type AlertProps = { type: 'success' | 'error'; message: string };
export default function Alert({ type, message }: AlertProps) {
  return (
    <div className={`p-2 mb-2 rounded text-sm ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
      {message}
    </div>
  );
}
