import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import RichTextRenderer from "./RichTextRenderer";

interface ContentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    id: string;
    title: string;
    description: string;
    content_type: "guide" | "template" | "checklist";
    content: any;
    category: string;
  } | null;
  completedSteps: string[];
  onStepToggle: (stepId: string) => void;
}

const ContentViewer = ({ 
  isOpen, 
  onClose, 
  content, 
  completedSteps,
  onStepToggle 
}: ContentViewerProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!content) return null;

  const renderGuide = () => {
    const steps = content.content?.steps || [];
    const step = steps[currentStep];
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-kindai-blue">
            Step {currentStep + 1} of {steps.length}
          </Badge>
          <div className="flex gap-1">
            {steps.map((_: any, idx: number) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentStep 
                    ? "bg-kindai-pink w-4" 
                    : idx < currentStep 
                      ? "bg-kindai-green" 
                      : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {step && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{step.title}</h3>
            <RichTextRenderer content={step.content || ""} />
            
            <div className="flex items-center gap-2 pt-4">
              <Checkbox 
                id={`step-${currentStep}`}
                checked={completedSteps.includes(`step-${currentStep}`)}
                onCheckedChange={() => onStepToggle(`step-${currentStep}`)}
              />
              <label htmlFor={`step-${currentStep}`} className="text-sm cursor-pointer">
                Mark as completed
              </label>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStep === steps.length - 1}
            className="gradient-rebel"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  const renderTemplate = () => {
    const template = content.content;
    
    return (
      <div className="space-y-6">
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2">Template Type</h4>
          <Badge>{template?.template_type || "General"}</Badge>
        </div>

        {template?.components && (
          <div className="space-y-3">
            <h4 className="font-semibold">Components</h4>
            <div className="grid gap-2">
              {template.components.map((comp: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <Sparkles className="w-4 h-4 text-kindai-orange" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {template?.variables && (
          <div className="space-y-3">
            <h4 className="font-semibold">Variables to Customize</h4>
            <div className="flex flex-wrap gap-2">
              {template.variables.map((variable: string, idx: number) => (
                <Badge key={idx} variant="outline" className="text-kindai-purple">
                  {variable}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4">
          <Button className="w-full gradient-rebel">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate with AI
          </Button>
        </div>
      </div>
    );
  };

  const renderChecklist = () => {
    const items = content.content?.items || [];
    const categories = [...new Set(items.map((item: any) => item.category))];
    
    return (
      <div className="space-y-6">
        {categories.map((category: string) => (
          <div key={category} className="space-y-3">
            <h4 className="font-semibold text-lg">{category}</h4>
            <div className="space-y-2">
              {items
                .filter((item: any) => item.category === category)
                .map((item: any, idx: number) => {
                  const stepId = `${category}-${idx}`;
                  const isChecked = completedSteps.includes(stepId);
                  
                  return (
                    <div 
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                        isChecked ? "bg-kindai-green/10" : "bg-muted/30 hover:bg-muted/50"
                      }`}
                      onClick={() => onStepToggle(stepId)}
                    >
                      <Checkbox checked={isChecked} />
                      <span className={isChecked ? "line-through text-muted-foreground" : ""}>
                        {item.task}
                      </span>
                      {isChecked && <Check className="w-4 h-4 text-kindai-green ml-auto" />}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="font-semibold">
              {completedSteps.length} / {items.length}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full gradient-rebel rounded-full transition-all"
              style={{ width: `${(completedSteps.length / items.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl">{content.title}</DialogTitle>
          <p className="text-muted-foreground">{content.description}</p>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          {content.content_type === "guide" && renderGuide()}
          {content.content_type === "template" && renderTemplate()}
          {content.content_type === "checklist" && renderChecklist()}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ContentViewer;
