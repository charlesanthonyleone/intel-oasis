import { Link } from 'react-router-dom';
export default function PageNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      <p className="text-white/30 text-lg font-light">Page not found.</p>
      <Link to="/" className="text-[#c8a45a] hover:text-[#c8a45a] text-sm">Back to IntelOasis</Link>
    </div>
  );
}
