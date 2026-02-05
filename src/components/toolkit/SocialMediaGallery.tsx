import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Image, Square, Smartphone, ExternalLink } from "lucide-react";
import { toast } from "sonner";

// Import all Instagram assets
import post01 from "@/assets/instagram/post-01-transformation.png";
import post02 from "@/assets/instagram/post-02-stop-learning.png";
import post03 from "@/assets/instagram/post-03-three-agents.png";
import post04 from "@/assets/instagram/post-04-adhd-friendly.png";
import post05 from "@/assets/instagram/post-05-myth-bust.png";
import post06 from "@/assets/instagram/post-06-automate.png";
import post07 from "@/assets/instagram/post-07-launch-fast.png";
import post08 from "@/assets/instagram/post-08-escape.png";
import post09 from "@/assets/instagram/post-09-content.png";
import post10 from "@/assets/instagram/post-10-offer.png";
import story01 from "@/assets/instagram/story-01-swipe-up.png";
import story02 from "@/assets/instagram/story-02-check-it-out.png";
import story03 from "@/assets/instagram/story-03-link-bio.png";
import story04 from "@/assets/instagram/story-04-tap-more.png";
import story05 from "@/assets/instagram/story-05-dm-me.png";

interface SocialAsset {
  id: string;
  title: string;
  description: string;
  image: string;
  type: "post" | "story";
  caption?: string;
}

const instagramPosts: SocialAsset[] = [
  {
    id: "post-01",
    title: "The Transformation",
    description: "4 hours → 15 minutes hook",
    image: post01,
    type: "post",
    caption: `4 hours of struggle → 15 minutes of done.

That's not productivity porn. That's what happens when you stop figuring it out yourself.

Most entrepreneurs spend their days:
• Googling "how to write a landing page"
• Watching 47 YouTube tutorials  
• Still not launching anything

The Rebel way? Tell the AI what you need. Get it. Ship it.

Which version are you living? ⚡

🔗 Link in bio

#entrepreneur #productivity #startup #adhdbusiness #digitalmarketing`
  },
  {
    id: "post-02",
    title: "Stop Learning",
    description: "Core philosophy statement",
    image: post02,
    type: "post",
    caption: `Hot take: You don't need another course.

You need EXECUTION.

The gap between where you are and where you want to be isn't knowledge. It's action.

Every minute you spend "learning to do" is a minute you're NOT doing.

Stop preparing. Start shipping. 🚀

Save this if you needed to hear it.

#businesstips #entrepreneurmindset #motivation #startuplife #hustle`
  },
  {
    id: "post-03",
    title: "3 Agents, 1 Goal",
    description: "Product feature reveal",
    image: post03,
    type: "post",
    caption: `Meet your new team 👇

🎨 THE CONTENT CREATOR
Writes your copy. Designs your posts. Never asks for a day off.

📊 THE BUSINESS STRATEGIST  
Analyzes your market. Prices your offers. No MBA required.

⚙️ THE AUTOMATION ENGINEER
Builds your systems. Connects your tools. Zero coding.

3 agents. 1 playbook. Infinite output.

🔗 Link in bio to see them in action

#ai #artificialintelligence #businessautomation #solopreneur #techstartup`
  },
  {
    id: "post-04",
    title: "Built for ADHD",
    description: "Neurodivergent targeting",
    image: post04,
    type: "post",
    caption: `Built different? Us too. 🧠

If you've ever:
• Started 17 projects, finished 2
• Had genius ideas at 3am that disappeared by morning
• Felt overwhelmed by "simple" business tasks

This playbook was made for your brain.

No 47-step processes.
No "just be more disciplined."
No neurotypical BS.

Just: tell the AI what you want. Get it. Done.

Your brain isn't broken. Your tools were.

#adhd #neurodivergent #adhdentrepreneur #adhdtips #businessowner`
  },
  {
    id: "post-05",
    title: "Myth Busting",
    description: "Anti-course messaging",
    image: post05,
    type: "post",
    caption: `Unpopular opinion: Courses are where dreams go to die.

The industry sold you a lie:
"Learn everything → THEN take action"

Reality:
• You finish 12% of courses you buy
• You remember 5% of what you learn
• You implement 0% without support

The new way:
Skip learning. Get the output directly.

Burn the courses. Build the business. 🔥

#onlinecourses #businessadvice #entrepreneurship #realtalk #mindsetshift`
  },
  {
    id: "post-06",
    title: "Automate Everything",
    description: "Automation value prop",
    image: post06,
    type: "post",
    caption: `You shouldn't be doing manual tasks in 2025.

Every hour you spend on:
• Copying data between apps
• Sending follow-up emails
• Updating spreadsheets

Is an hour you're NOT spending on growth.

The Automation Engineer agent builds your systems:
→ Natural language to Zapier automations
→ No code required
→ Works while you sleep

Your competitors are automating everything.

Are you? ⚙️

#automation #zapier #nocode #productivity #worksmarter`
  },
  {
    id: "post-07",
    title: "Launch Fast",
    description: "Speed advantage",
    image: post07,
    type: "post",
    caption: `Launch in days. Not months. 🚀

The old way:
Month 1: "Planning"
Month 2: "Research"  
Month 3: "Learning tech"
Month 4: "Still not ready"

The Rebel way:
Day 1: Idea
Day 2: Landing page done
Day 3: Email sequence live
Day 4: Taking payments

Speed is your competitive advantage.

Every day you don't launch, someone else will.

#startup #launchday #entrepreneurlife #businessgrowth #speed`
  },
  {
    id: "post-08",
    title: "Escape the 9-5",
    description: "Freedom messaging",
    image: post08,
    type: "post",
    caption: `The 9-5 was designed to keep you comfortable.

Not free.
Not fulfilled.
Not wealthy.

Just... comfortable enough to stay.

But you already know this. That's why you're here.

The question isn't IF you'll escape.
It's WHEN.

Drop a 🔥 if you're ready to break free.

#quitthe9to5 #freedom #sidehustle #entrepreneurship #financialfreedom`
  },
  {
    id: "post-09",
    title: "Content Converts",
    description: "Content marketing value",
    image: post09,
    type: "post",
    caption: `Content that converts ≠ Content that's clever.

Stop trying to go viral.

Start creating content that:
✅ Speaks to ONE person's pain
✅ Offers ONE clear solution
✅ Has ONE obvious next step

The Content Creator agent writes for conversion, not applause.

Your content should make money. Not just likes.

Save this for your next post 📌

#contentmarketing #socialmediatips #copywriting #digitalmarketing #contentcreator`
  },
  {
    id: "post-10",
    title: "The Offer",
    description: "Direct sales CTA",
    image: post10,
    type: "post",
    caption: `$47. Lifetime access. No subscription.

Here's what you get:

🎨 Content Creator Agent
📊 Business Strategist Agent  
⚙️ Automation Engineer Agent
📚 Complete Rebel Playbook
🔄 All future updates

What you DON'T get:
❌ Monthly fees
❌ Upsells
❌ "Premium tiers"

One price. Everything included. Forever.

🔗 Link in bio before it changes

#digitalproduct #entrepreneur #investment #toolsforbusiness #limitedoffer`
  },
];

const instagramStories: SocialAsset[] = [
  {
    id: "story-01",
    title: "Swipe Up",
    description: "Drive traffic CTA",
    image: story01,
    type: "story",
  },
  {
    id: "story-02",
    title: "Check It Out",
    description: "New content promo",
    image: story02,
    type: "story",
  },
  {
    id: "story-03",
    title: "Link in Bio",
    description: "Bio link reminder",
    image: story03,
    type: "story",
  },
  {
    id: "story-04",
    title: "Tap for More",
    description: "Multi-story carousel",
    image: story04,
    type: "story",
  },
  {
    id: "story-05",
    title: "DM Me",
    description: "Conversation starter",
    image: story05,
    type: "story",
  },
];

const SocialMediaGallery = () => {
  const [selectedAsset, setSelectedAsset] = useState<SocialAsset | null>(null);
  const [activeTab, setActiveTab] = useState("posts");

  const handleDownload = async (asset: SocialAsset) => {
    try {
      const response = await fetch(asset.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `kindai-${asset.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success(`Downloaded ${asset.title}`);
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  const handleCopyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption);
    toast.success("Caption copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Image className="w-6 h-6 text-kindai-pink" />
            Social Media Gallery
          </h2>
          <p className="text-muted-foreground">
            Ready-to-post Instagram content with captions
          </p>
        </div>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            {instagramPosts.length} Posts
          </span>
          <span className="flex items-center gap-1">
            <Smartphone className="w-4 h-4" />
            {instagramStories.length} Stories
          </span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <Square className="w-4 h-4" />
            Posts (1:1)
          </TabsTrigger>
          <TabsTrigger value="stories" className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            Stories (9:16)
          </TabsTrigger>
        </TabsList>

        {/* Posts Grid */}
        <TabsContent value="posts" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {instagramPosts.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                onSelect={() => setSelectedAsset(asset)}
                onDownload={() => handleDownload(asset)}
              />
            ))}
          </div>
        </TabsContent>

        {/* Stories Grid */}
        <TabsContent value="stories" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {instagramStories.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                onSelect={() => setSelectedAsset(asset)}
                onDownload={() => handleDownload(asset)}
                isStory
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview Modal */}
      {selectedAsset && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Preview */}
            <div className={`${selectedAsset.type === "story" ? "md:w-1/3" : "md:w-1/2"} bg-black flex items-center justify-center p-4`}>
              <img
                src={selectedAsset.image}
                alt={selectedAsset.title}
                className={`${selectedAsset.type === "story" ? "max-h-[500px]" : "max-h-[400px]"} w-auto object-contain rounded-lg`}
              />
            </div>

            {/* Details */}
            <div className={`${selectedAsset.type === "story" ? "md:w-2/3" : "md:w-1/2"} p-6 flex flex-col overflow-y-auto`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedAsset.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedAsset.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAsset(null)}
                >
                  ✕
                </Button>
              </div>

              {selectedAsset.caption && (
                <div className="flex-1 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Caption</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyCaption(selectedAsset.caption!)}
                    >
                      Copy
                    </Button>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm whitespace-pre-wrap max-h-[300px] overflow-y-auto border border-border">
                    {selectedAsset.caption}
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-auto">
                <Button
                  className="flex-1 gradient-rebel"
                  onClick={() => handleDownload(selectedAsset)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Image
                </Button>
                {selectedAsset.caption && (
                  <Button
                    variant="outline"
                    onClick={() => handleCopyCaption(selectedAsset.caption!)}
                  >
                    Copy Caption
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pro Tips */}
      <Card className="p-4 bg-muted/30 border-dashed">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-kindai-blue" />
          Pro Tips for Maximum Engagement
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Post at <strong>11am or 7pm</strong> local time (highest engagement windows)</li>
          <li>• Use <strong>5-10 hashtags</strong> per post (sweet spot for reach)</li>
          <li>• Reply to comments within <strong>1 hour</strong> to boost algorithm</li>
          <li>• Share posts to Stories with <strong>"New Post" sticker</strong></li>
          <li>• Use Stories as overlays on your own product screenshots</li>
        </ul>
      </Card>
    </div>
  );
};

interface AssetCardProps {
  asset: SocialAsset;
  onSelect: () => void;
  onDownload: () => void;
  isStory?: boolean;
}

const AssetCard = ({ asset, onSelect, onDownload, isStory }: AssetCardProps) => (
  <Card
    className="group relative overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
    onClick={onSelect}
  >
    <div className={`${isStory ? "aspect-[9/16]" : "aspect-square"} overflow-hidden`}>
      <img
        src={asset.image}
        alt={asset.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
      <p className="text-white text-sm font-medium truncate">{asset.title}</p>
      <p className="text-white/70 text-xs truncate">{asset.description}</p>
      
      <Button
        size="sm"
        variant="secondary"
        className="mt-2 w-full"
        onClick={(e) => {
          e.stopPropagation();
          onDownload();
        }}
      >
        <Download className="w-3 h-3 mr-1" />
        Download
      </Button>
    </div>
  </Card>
);

export default SocialMediaGallery;
