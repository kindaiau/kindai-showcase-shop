import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Download, FileText, Navigation, Palette, Users, Layout, Code, CheckCircle2 } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  notes: string;
}

interface ChecklistCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: ChecklistItem[];
}

const initialCategories: ChecklistCategory[] = [
  {
    id: 'navigation',
    title: 'Navigation Analysis',
    icon: <Navigation className="h-5 w-5" />,
    items: [
      { id: 'nav-1', label: 'Clear and intuitive menu structure', checked: false, notes: '' },
      { id: 'nav-2', label: 'Mobile hamburger menu works correctly', checked: false, notes: '' },
      { id: 'nav-3', label: 'All navigation links functional (no broken links)', checked: false, notes: '' },
      { id: 'nav-4', label: 'Active page indicator visible', checked: false, notes: '' },
      { id: 'nav-5', label: 'Logo links to homepage', checked: false, notes: '' },
      { id: 'nav-6', label: 'CTAs are prominent and accessible', checked: false, notes: '' },
      { id: 'nav-7', label: 'Breadcrumbs present where needed', checked: false, notes: '' },
      { id: 'nav-8', label: 'Footer navigation complete and organized', checked: false, notes: '' },
    ],
  },
  {
    id: 'design',
    title: 'Design & Visual Assessment',
    icon: <Palette className="h-5 w-5" />,
    items: [
      { id: 'design-1', label: 'Consistent color palette throughout', checked: false, notes: '' },
      { id: 'design-2', label: 'Typography hierarchy is clear (H1, H2, body)', checked: false, notes: '' },
      { id: 'design-3', label: 'Adequate spacing and white space', checked: false, notes: '' },
      { id: 'design-4', label: 'Images are high quality and optimized', checked: false, notes: '' },
      { id: 'design-5', label: 'Dark/light mode works correctly (if applicable)', checked: false, notes: '' },
      { id: 'design-6', label: 'Animations are smooth and purposeful', checked: false, notes: '' },
      { id: 'design-7', label: 'Icons are consistent in style', checked: false, notes: '' },
      { id: 'design-8', label: 'Brand identity is cohesive', checked: false, notes: '' },
      { id: 'design-9', label: 'Visual hierarchy guides user attention', checked: false, notes: '' },
    ],
  },
  {
    id: 'ux',
    title: 'User Experience (UX)',
    icon: <Users className="h-5 w-5" />,
    items: [
      { id: 'ux-1', label: 'Clear user journey from landing to conversion', checked: false, notes: '' },
      { id: 'ux-2', label: 'Forms are easy to complete with validation', checked: false, notes: '' },
      { id: 'ux-3', label: 'Loading states provide feedback', checked: false, notes: '' },
      { id: 'ux-4', label: 'Error messages are helpful and clear', checked: false, notes: '' },
      { id: 'ux-5', label: 'Success confirmations are present', checked: false, notes: '' },
      { id: 'ux-6', label: 'No friction points in key flows', checked: false, notes: '' },
      { id: 'ux-7', label: 'Content is scannable (bullets, headings)', checked: false, notes: '' },
      { id: 'ux-8', label: 'Value proposition is immediately clear', checked: false, notes: '' },
    ],
  },
  {
    id: 'accessibility',
    title: 'Accessibility & Responsiveness',
    icon: <Layout className="h-5 w-5" />,
    items: [
      { id: 'a11y-1', label: 'All images have alt text', checked: false, notes: '' },
      { id: 'a11y-2', label: 'Color contrast meets WCAG standards', checked: false, notes: '' },
      { id: 'a11y-3', label: 'Keyboard navigation works throughout', checked: false, notes: '' },
      { id: 'a11y-4', label: 'Focus indicators are visible', checked: false, notes: '' },
      { id: 'a11y-5', label: 'Mobile layout is fully functional', checked: false, notes: '' },
      { id: 'a11y-6', label: 'Tablet layout works correctly', checked: false, notes: '' },
      { id: 'a11y-7', label: 'Text is readable at all breakpoints', checked: false, notes: '' },
      { id: 'a11y-8', label: 'Touch targets are adequately sized', checked: false, notes: '' },
    ],
  },
  {
    id: 'technical',
    title: 'Technical Quality',
    icon: <Code className="h-5 w-5" />,
    items: [
      { id: 'tech-1', label: 'Page loads in under 3 seconds', checked: false, notes: '' },
      { id: 'tech-2', label: 'No console errors in browser', checked: false, notes: '' },
      { id: 'tech-3', label: 'Meta tags and SEO basics present', checked: false, notes: '' },
      { id: 'tech-4', label: 'Open Graph tags for social sharing', checked: false, notes: '' },
      { id: 'tech-5', label: 'SSL certificate is valid', checked: false, notes: '' },
      { id: 'tech-6', label: 'Favicon and app icons present', checked: false, notes: '' },
      { id: 'tech-7', label: '404 page is designed and helpful', checked: false, notes: '' },
      { id: 'tech-8', label: 'Forms have proper security measures', checked: false, notes: '' },
    ],
  },
  {
    id: 'content',
    title: 'Content Quality',
    icon: <FileText className="h-5 w-5" />,
    items: [
      { id: 'content-1', label: 'No spelling or grammar errors', checked: false, notes: '' },
      { id: 'content-2', label: 'Tone is consistent throughout', checked: false, notes: '' },
      { id: 'content-3', label: 'CTAs are compelling and action-oriented', checked: false, notes: '' },
      { id: 'content-4', label: 'Headlines are engaging and clear', checked: false, notes: '' },
      { id: 'content-5', label: 'Social proof is present (testimonials, logos)', checked: false, notes: '' },
      { id: 'content-6', label: 'Contact information is easy to find', checked: false, notes: '' },
      { id: 'content-7', label: 'Legal pages are present (Privacy, Terms)', checked: false, notes: '' },
      { id: 'content-8', label: 'FAQ addresses common questions', checked: false, notes: '' },
    ],
  },
];

interface WebsiteAssessmentChecklistProps {
  onClose?: () => void;
}

export default function WebsiteAssessmentChecklist({ onClose }: WebsiteAssessmentChecklistProps) {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [assessorName, setAssessorName] = useState('');
  const [assessmentDate] = useState(new Date().toLocaleDateString());
  const [categories, setCategories] = useState<ChecklistCategory[]>(initialCategories);
  const [overallNotes, setOverallNotes] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedItems = categories.reduce(
    (acc, cat) => acc + cat.items.filter((item) => item.checked).length,
    0
  );
  const progressPercent = Math.round((checkedItems / totalItems) * 100);

  const handleItemToggle = (categoryId: string, itemId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : cat
      )
    );
  };

  const handleNotesChange = (categoryId: string, itemId: string, notes: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, notes } : item
              ),
            }
          : cat
      )
    );
  };

  const getCategoryProgress = (category: ChecklistCategory) => {
    const checked = category.items.filter((item) => item.checked).length;
    return Math.round((checked / category.items.length) * 100);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const getScoreColor = (percent: number) => {
    if (percent >= 80) return 'text-green-600';
    if (percent >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
          .no-print {
            display: none !important;
          }
          .print-break {
            page-break-before: always;
          }
          @page {
            margin: 0.5in;
          }
        }
      `}</style>

      <div id="print-area" ref={printRef} className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Website Assessment Checklist</h1>
            <p className="text-muted-foreground mt-1">Comprehensive evaluation for your website</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExportPDF} className="gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>

        {/* Print Header */}
        <div className="hidden print:block mb-8">
          <h1 className="text-3xl font-bold">Website Assessment Report</h1>
          <p className="text-gray-600">Generated by Kindai Rebel Toolkit</p>
        </div>

        {/* Meta Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Assessment Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website-url">Website URL</Label>
              <Input
                id="website-url"
                placeholder="https://example.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assessor-name">Assessor Name</Label>
              <Input
                id="assessor-name"
                placeholder="Your name"
                value={assessorName}
                onChange={(e) => setAssessorName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Assessment Date</Label>
              <Input value={assessmentDate} disabled />
            </div>
          </CardContent>
        </Card>

        {/* Overall Progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-semibold">Overall Progress</span>
              </div>
              <span className={`text-2xl font-bold ${getScoreColor(progressPercent)}`}>
                {progressPercent}%
              </span>
            </div>
            <Progress value={progressPercent} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              {checkedItems} of {totalItems} items completed
            </p>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((category) => {
            const progress = getCategoryProgress(category);
            return (
              <Card key={category.id} className="p-3">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  <span className="text-xs font-medium truncate w-full">{category.title.split(' ')[0]}</span>
                  <span className={`text-lg font-bold ${getScoreColor(progress)}`}>{progress}%</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Checklist Categories */}
        <Accordion type="multiple" defaultValue={categories.map((c) => c.id)} className="space-y-4">
          {categories.map((category, catIndex) => (
            <AccordionItem
              key={category.id}
              value={category.id}
              className={`border rounded-lg px-4 ${catIndex > 0 ? 'print-break' : ''}`}
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.items.filter((i) => i.checked).length}/{category.items.length} completed
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex flex-col gap-2 p-3 rounded-lg bg-muted/30">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={item.id}
                          checked={item.checked}
                          onCheckedChange={() => handleItemToggle(category.id, item.id)}
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor={item.id}
                          className={`flex-1 cursor-pointer ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                        >
                          {item.label}
                        </Label>
                      </div>
                      <Textarea
                        placeholder="Add notes..."
                        value={item.notes}
                        onChange={(e) => handleNotesChange(category.id, item.id, e.target.value)}
                        className="text-sm min-h-[60px] no-print"
                      />
                      {item.notes && (
                        <p className="hidden print:block text-sm text-gray-600 pl-7">
                          Notes: {item.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Overall Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Overall Assessment Notes</CardTitle>
            <CardDescription>Summary, key findings, and priority recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add your overall assessment notes, key findings, and priority recommendations here..."
              value={overallNotes}
              onChange={(e) => setOverallNotes(e.target.value)}
              className="min-h-[150px]"
            />
          </CardContent>
        </Card>

        {/* Print Footer */}
        <div className="hidden print:block mt-8 pt-4 border-t text-center text-sm text-gray-500">
          <p>Assessment generated using Kindai Rebel Toolkit</p>
          <p>https://kindai-showcase-shop.lovable.app</p>
        </div>
      </div>
    </div>
  );
}
