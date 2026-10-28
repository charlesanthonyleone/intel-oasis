import SupremeWarning from './SupremeWarning';
import SupremeWarningPage from './SupremeWarningPage';

/* The single Warning page: the Supreme Warning, then the Personal Supreme Warning. */
export default function Warning() {
  return (
    <div className="warning">
      <SupremeWarning />
      <div className="max-w-3xl mx-auto px-6"><div style={{ borderTop: '1px solid var(--rule)', margin: '40px 0' }} /></div>
      <SupremeWarningPage />
    </div>
  );
}
