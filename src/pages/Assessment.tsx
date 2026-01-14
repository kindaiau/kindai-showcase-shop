import WebsiteAssessmentChecklist from '@/components/toolkit/WebsiteAssessmentChecklist';
import { useNavigate } from 'react-router-dom';

export default function Assessment() {
  const navigate = useNavigate();

  return <WebsiteAssessmentChecklist onClose={() => navigate(-1)} />;
}
