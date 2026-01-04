import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, BookOpen, FileText, CheckSquare } from "lucide-react";
import * as Icons from "lucide-react";

interface ToolkitContentCardProps {
  id: string;
  title: string;
  description: string;
  contentType: "guide" | "template" | "checklist";
  category: string;
  icon: string;
  content: any;
  isCompleted?: boolean;
  progress?: number;
  onOpen: (id: string) => void;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "guide":
      return <BookOpen className="w-4 h-4" />;
    case "template":
      return <FileText className="w-4 h-4" />;
    case "checklist":
      return <CheckSquare className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "guide":
      return "text-kindai-blue bg-kindai-blue/10";
    case "template":
      return "text-kindai-orange bg-kindai-orange/10";
    case "checklist":
      return "text-kindai-green bg-kindai-green/10";
    default:
      return "text-muted-foreground bg-muted";
  }
};

const ToolkitContentCard = ({
  id,
  title,
  description,
  contentType,
  category,
  icon,
  content,
  isCompleted,
  progress = 0,
  onOpen,
}: ToolkitContentCardProps) => {
  const IconComponent = (Icons as any)[icon] || Icons.FileText;

  return (
    <Card 
      className="p-6 hover:shadow-card transition-smooth border-2 hover:border-primary/30 group cursor-pointer"
      onClick={() => onOpen(id)}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${getTypeColor(contentType)}`}>
          <IconComponent className="w-6 h-6" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className={`text-xs ${getTypeColor(contentType)}`}>
              {getTypeIcon(contentType)}
              <span className="ml-1 capitalize">{contentType}</span>
            </Badge>
            <Badge variant="outline" className="text-xs text-muted-foreground">
              {category}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-smooth">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          {progress > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full gradient-rebel rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 flex items-center gap-2">
          {isCompleted && (
            <div className="w-6 h-6 rounded-full bg-kindai-green/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-kindai-green" />
            </div>
          )}
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Card>
  );
};

export default ToolkitContentCard;
