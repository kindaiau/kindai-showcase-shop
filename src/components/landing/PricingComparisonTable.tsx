import { Check, Minus } from "lucide-react";

const features = [
  { name: "3 AI Agents (Content, Strategy, Automation)", starter: true, growth: true, agency: true },
  { name: "Core guides & templates", starter: true, growth: true, agency: true },
  { name: "Lifetime access + updates", starter: true, growth: true, agency: true },
  { name: "50+ advanced prompt templates", starter: false, growth: true, agency: true },
  { name: "Priority email support", starter: false, growth: true, agency: true },
  { name: "Offer validation checklist", starter: false, growth: true, agency: true },
  { name: "White-label client templates", starter: false, growth: false, agency: true },
  { name: "Multi-project workflows", starter: false, growth: false, agency: true },
  { name: "Done-for-you implementation guides", starter: false, growth: false, agency: true },
];

const PricingComparisonTable = () => {
  return (
    <div className="mt-12 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-3 font-medium text-muted-foreground">Features</th>
            <th className="text-center py-4 px-3 font-semibold">
              <div className="flex flex-col items-center gap-1">
                <span>Starter</span>
                <span className="text-lg font-bold text-primary">$47</span>
              </div>
            </th>
            <th className="text-center py-4 px-3 font-semibold">
              <div className="flex flex-col items-center gap-1">
                <span>Growth</span>
                <span className="text-lg font-bold text-primary">$97</span>
              </div>
            </th>
            <th className="text-center py-4 px-3 font-semibold">
              <div className="flex flex-col items-center gap-1">
                <span>Agency</span>
                <span className="text-lg font-bold text-primary">$197</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr
              key={feature.name}
              className={index % 2 === 0 ? "bg-muted/30" : ""}
            >
              <td className="py-3 px-3 text-muted-foreground">{feature.name}</td>
              <td className="py-3 px-3 text-center">
                {feature.starter ? (
                  <Check className="w-5 h-5 text-primary mx-auto" />
                ) : (
                  <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                )}
              </td>
              <td className="py-3 px-3 text-center">
                {feature.growth ? (
                  <Check className="w-5 h-5 text-primary mx-auto" />
                ) : (
                  <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                )}
              </td>
              <td className="py-3 px-3 text-center">
                {feature.agency ? (
                  <Check className="w-5 h-5 text-primary mx-auto" />
                ) : (
                  <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PricingComparisonTable;
