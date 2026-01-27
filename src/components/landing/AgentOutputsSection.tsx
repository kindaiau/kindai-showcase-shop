import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PenTool, 
  TrendingUp, 
  Zap,
  Copy,
  Check,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type AgentType = "content" | "strategy" | "tech";

interface AgentOutput {
  type: AgentType;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  prompt: string;
  output: string;
}

const SAMPLE_OUTPUTS: AgentOutput[] = [
  {
    type: "content",
    name: "Content Creator",
    icon: <PenTool className="w-4 h-4" />,
    color: "text-kindai-pink",
    bgColor: "bg-kindai-pink",
    prompt: "Write a LinkedIn post about overcoming imposter syndrome as a founder",
    output: `🧠 The truth about imposter syndrome nobody tells you:

It never goes away. It just changes shape.

When I started my business, I thought "Who am I to do this?"
After my first sale: "That was probably luck."
After 100 sales: "They'll figure out I'm not that special."

Here's what I've learned:

→ Every successful founder feels this way
→ The ones who win keep shipping anyway
→ Your "imposter" feeling is actually your growth edge

The question isn't "Am I qualified?"
It's "Am I willing to learn in public?"

You don't need permission to start.
You just need the courage to be bad at something new.

What's the thing you're avoiding because you feel like an imposter? 👇

#FounderLife #ImposterSyndrome #Entrepreneurship`,
  },
  {
    type: "strategy",
    name: "Business Strategist",
    icon: <TrendingUp className="w-4 h-4" />,
    color: "text-kindai-orange",
    bgColor: "bg-kindai-orange",
    prompt: "Create a pricing strategy for my $97 online course",
    output: `## Pricing Strategy: The Anchor & Ascend Model

### Recommended Structure:

**Tier 1: Self-Paced ($97)**
- Core course content
- Community access
- Best for: DIY learners with time

**Tier 2: Guided ($297)** ⭐ ANCHOR THIS
- Everything in Tier 1
- Weekly group Q&A calls
- Workbook templates
- Best for: Action-takers who want accountability

**Tier 3: VIP ($997)**
- Everything in Tier 2
- 2x 1:1 strategy calls
- Priority support
- Best for: Serious buyers who want results fast

### Psychology Tactics:
1. **Display Tier 2 first** — it becomes the mental anchor
2. **Strike-through a higher price** ($497 → $297 launch)
3. **Add urgency**: "Founding member pricing ends Friday"
4. **Risk reversal**: 30-day "try the whole thing" guarantee

### Expected Distribution:
- 60% choose Tier 1
- 30% choose Tier 2 (your profit driver)
- 10% choose Tier 3 (high-margin whales)

**Revenue projection (100 sales):**
60×$97 + 30×$297 + 10×$997 = $24,700`,
  },
  {
    type: "tech",
    name: "Automation Engineer",
    icon: <Zap className="w-4 h-4" />,
    color: "text-kindai-green",
    bgColor: "bg-kindai-green",
    prompt: "Set up an automation when someone buys my product",
    output: `## Post-Purchase Automation Workflow

### Trigger: New Gumroad/Stripe Sale

**Step 1: Instant Welcome (0 min)**
\`\`\`
→ Send welcome email via Resend/Mailgun
→ Include: Download link, login credentials, what's next
→ Add tag: "customer" + product name
\`\`\`

**Step 2: Add to CRM (0 min)**
\`\`\`
→ Create/update contact in your CRM
→ Fields: Email, Name, Product, Purchase Date, Amount
→ Assign to "New Customer" pipeline stage
\`\`\`

**Step 3: Slack Notification (0 min)**
\`\`\`
→ Post to #sales channel
→ Include: Customer name, product, amount
→ 🎉 Celebrate the win with your team
\`\`\`

**Step 4: Onboarding Sequence (Day 1-7)**
\`\`\`
Day 1: "Here's how to get started" email
Day 3: "Quick win" tutorial email
Day 7: "How's it going?" check-in + upsell hint
\`\`\`

**Step 5: Review Request (Day 14)**
\`\`\`
→ Send testimonial request email
→ Include: One-click review link
→ Offer incentive (bonus template, discount code)
\`\`\`

### Tools Needed:
Zapier/Make + Email provider + CRM (optional)
**Setup time: ~30 minutes**`,
  },
];

const AgentOutputsSection = () => {
  const [activeTab, setActiveTab] = useState<AgentType>("content");
  const [copied, setCopied] = useState(false);

  const activeOutput = SAMPLE_OUTPUTS.find(o => o.type === activeTab)!;

  const copyOutput = async () => {
    await navigator.clipboard.writeText(activeOutput.output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-kindai-pink/5 to-transparent" />
      
      <div className="container px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-4 bg-kindai-orange/10 text-kindai-orange border-kindai-orange/20">
            <Sparkles className="w-3 h-3 mr-1" />
            See It In Action
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Real outputs from real prompts
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            These aren't mockups. This is what the agents actually produce — 
            ready to use, no editing required.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AgentType)}>
            <TabsList className="grid w-full grid-cols-3 h-auto p-1 mb-8">
              {SAMPLE_OUTPUTS.map((agent) => (
                <TabsTrigger
                  key={agent.type}
                  value={agent.type}
                  className="flex items-center gap-2 py-3 data-[state=active]:bg-card"
                >
                  <div className={`${agent.bgColor} p-1.5 rounded-md text-white`}>
                    {agent.icon}
                  </div>
                  <span className="hidden sm:inline font-medium">{agent.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {SAMPLE_OUTPUTS.map((agent) => (
              <TabsContent key={agent.type} value={agent.type} className="mt-0">
                <Card className="border-2 overflow-hidden">
                  {/* Prompt */}
                  <div className="p-4 bg-muted/50 border-b border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <span className="text-primary-foreground text-sm font-bold">U</span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">User prompt:</p>
                        <p className="font-medium">{agent.prompt}</p>
                      </div>
                    </div>
                  </div>

                  {/* Output */}
                  <div className="p-4 md:p-6">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full ${agent.bgColor} flex items-center justify-center shrink-0`}>
                        <span className="text-white">{agent.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm text-muted-foreground">
                            {agent.name} output:
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyOutput}
                            className="text-xs"
                          >
                            {copied ? (
                              <Check className="w-3 h-3 mr-1" />
                            ) : (
                              <Copy className="w-3 h-3 mr-1" />
                            )}
                            Copy
                          </Button>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-4 max-h-[400px] overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                            {agent.output}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3 bg-gradient-to-r from-kindai-pink/5 via-kindai-orange/5 to-kindai-green/5 border-t border-border">
                    <p className="text-xs text-center text-muted-foreground">
                      Generated in ~15 seconds • Ready to copy and use
                    </p>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AgentOutputsSection;
