import { Lightbulb, AlertTriangle, Info, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "tip" | "warning" | "info" | "rebel";

interface CalloutProps {
  type: CalloutType;
  children: React.ReactNode;
  className?: string;
}

const calloutConfig: Record<CalloutType, {
  icon: React.ElementType;
  label: string;
  className: string;
  iconClassName: string;
}> = {
  tip: {
    icon: Lightbulb,
    label: "TIP",
    className: "bg-kindai-green/10 border-kindai-green/30",
    iconClassName: "text-kindai-green",
  },
  warning: {
    icon: AlertTriangle,
    label: "WARNING",
    className: "bg-kindai-orange/10 border-kindai-orange/30",
    iconClassName: "text-kindai-orange",
  },
  info: {
    icon: Info,
    label: "INFO",
    className: "bg-kindai-blue/10 border-kindai-blue/30",
    iconClassName: "text-kindai-blue",
  },
  rebel: {
    icon: Sparkles,
    label: "REBEL TIP",
    className: "bg-gradient-to-r from-kindai-pink/10 to-kindai-purple/10 border-kindai-pink/30",
    iconClassName: "text-kindai-pink",
  },
};

const Callout = ({ type, children, className }: CalloutProps) => {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg border-l-4 my-4",
        config.className,
        className
      )}
    >
      <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.iconClassName)} />
      <div className="flex-1">
        <span className={cn("text-xs font-bold tracking-wider block mb-1", config.iconClassName)}>
          {config.label}
        </span>
        <div className="text-sm text-foreground/90">{children}</div>
      </div>
    </div>
  );
};

export default Callout;
