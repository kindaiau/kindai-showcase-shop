// Email template utilities for Supabase Edge Functions
// Since we can't directly use React Email in Deno, we'll create HTML string templates
// that match the React Email design

// Helper function to escape HTML entities to prevent XSS
function escapeHtml(str: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

export interface PurchaseConfirmationData {
  customerEmail: string;
  productName: string;
  tier?: string;
  licenseKey?: string;
  toolkitUrl?: string;
}

export interface AccessInstructionsData {
  customerEmail: string;
  tier?: string;
  toolkitUrl?: string;
  hasAccount?: boolean;
}

export interface FollowUpData {
  customerEmail: string;
  tier?: string;
  toolkitUrl?: string;
  daysAfterPurchase?: number;
}

export function renderPurchaseConfirmationEmail(data: PurchaseConfirmationData): string {
  const {
    customerEmail,
    productName = "The Rebel Toolkit",
    tier,
    licenseKey,
    toolkitUrl = "https://kindai.io/toolkit",
  } = data;

  // Escape all dynamic content to prevent XSS
  const safeProductName = escapeHtml(productName);
  const safeTier = tier ? escapeHtml(tier) : null;
  const safeLicenseKey = licenseKey ? escapeHtml(licenseKey) : null;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #FF1B8D 0%, #FF6B35 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
            Welcome to The Rebel Toolkit! 🚀
          </h1>
        </div>
        
        <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <h2 style="font-size: 18px; margin-top: 0;">
            Hey Rebel! 👋
          </h2>
          
          <p style="font-size: 16px; line-height: 1.8;">
            Your purchase has been verified and you now have <strong>full access</strong> to ${safeProductName}!
          </p>
          
          <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 4px;">
            <h3 style="margin-top: 0; color: #10b981;">Your toolkit includes:</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 10px;">🤖 <strong>3 AI Agents</strong> - Brand Voice, Offer Crafter, Business Test</li>
              <li style="margin-bottom: 10px;">📚 <strong>Complete Guides</strong> - Step-by-step rebel playbooks</li>
              <li style="margin-bottom: 10px;">📝 <strong>Templates</strong> - Ready-to-use frameworks</li>
              <li>⚡ <strong>Lifetime Access</strong> - All future updates included</li>
            </ul>
          </div>
          
          ${safeTier ? `<p style="font-size: 16px;"><strong>Your Tier:</strong> ${safeTier}</p>` : ''}
          
          ${safeLicenseKey ? `
          <div style="background: #fef3c7; border: 2px dashed #f59e0b; padding: 20px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <p style="font-size: 14px; font-weight: 600; color: #92400e; margin: 0 0 10px 0;">Your License Key:</p>
            <p style="font-size: 18px; font-weight: bold; font-family: monospace; color: #92400e; background: #fffbeb; padding: 12px; border-radius: 4px; margin: 10px 0;">${safeLicenseKey}</p>
            <p style="font-size: 12px; color: #92400e; margin: 10px 0 0 0;">Keep this safe! You can use it to verify your purchase anytime.</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="${toolkitUrl}" style="background: linear-gradient(135deg, #FF1B8D 0%, #FF6B35 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 14px rgba(255, 27, 141, 0.3);">
              Access Your Toolkit →
            </a>
          </div>
          
          <p style="font-size: 16px;">
            If you have any questions, just reply to this email. We're here to help!
          </p>
          
          <p style="font-size: 16px; margin-bottom: 10px;">
            Stay rebellious,<br>
            <strong style="color: #FF1B8D;">The Kindai Team</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            Thank you for your purchase! Built by Rebels, for Rebels.
          </p>
        </div>
      </body>
    </html>
  `;
}

export function renderAccessInstructionsEmail(data: AccessInstructionsData): string {
  const {
    customerEmail,
    tier = "Starter",
    toolkitUrl = "https://kindai.io/toolkit",
    hasAccount = false,
  } = data;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #FF1B8D 0%, #FF6B35 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
            Let's Get You Started! 🔑
          </h1>
        </div>
        
        <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <h2 style="font-size: 18px; margin-top: 0;">
            Hey Rebel! 👋
          </h2>
          
          <p style="font-size: 16px; line-height: 1.8;">
            You're all set to start using The Rebel Toolkit. Here's how to get in:
          </p>
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; margin: 20px 0; border-radius: 8px;">
            <h3 style="margin-top: 0; margin-bottom: 12px; color: #1e293b; font-size: 18px;">
              ${hasAccount ? "Step 1: Log In" : "Step 1: Create Your Account"}
            </h3>
            <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 12px 0;">
              ${hasAccount 
                ? "Sign in with the email address you used for purchase:" 
                : "Create your free account using the email address you used for purchase:"}
            </p>
            <span style="font-size: 16px; font-weight: 600; color: #FF1B8D; font-family: monospace; background: #fef2f2; padding: 8px 12px; border-radius: 4px; display: inline-block;">
              ${customerEmail}
            </span>
          </div>
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; margin: 20px 0; border-radius: 8px;">
            <h3 style="margin-top: 0; margin-bottom: 12px; color: #1e293b; font-size: 18px;">
              Step 2: Access Your Toolkit
            </h3>
            <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 12px 0;">
              Your license is automatically linked to your account. Click the button below to access your toolkit:
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${toolkitUrl}" style="background: linear-gradient(135deg, #FF1B8D 0%, #FF6B35 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 14px rgba(255, 27, 141, 0.3);">
                Access Your Toolkit →
              </a>
            </div>
          </div>
          
          <div style="background: #fef3c7; border: 2px solid #fbbf24; padding: 20px; margin: 30px 0; border-radius: 8px;">
            <p style="font-size: 15px; line-height: 1.6; color: #92400e; margin: 0;">
              💡 <strong>Pro Tip:</strong> Start with the Brand Voice Agent to discover your unique voice, then use the Offer Crafter to create your first irresistible offer!
            </p>
          </div>
          
          <p style="font-size: 16px;">
            Need help? Just reply to this email and we'll get you sorted out.
          </p>
          
          <p style="font-size: 16px; margin-bottom: 10px;">
            Stay rebellious,<br>
            <strong style="color: #FF1B8D;">The Kindai Team</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            Built by Rebels, for Rebels. Welcome to the movement! 🚀
          </p>
        </div>
      </body>
    </html>
  `;
}

// TODO: Implement follow-up email scheduling
// This should be triggered 3 days after purchase via a scheduled job or cron function
export function renderFollowUpEmail(data: FollowUpData): string {
  const {
    customerEmail,
    tier = "Starter",
    toolkitUrl = "https://kindai.io/toolkit",
    daysAfterPurchase = 3,
  } = data;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #FF1B8D 0%, #FF6B35 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
            How's Your Rebel Journey Going? 🚀
          </h1>
        </div>
        
        <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <h2 style="font-size: 18px; margin-top: 0;">
            Hey Rebel! 👋
          </h2>
          
          <p style="font-size: 16px; line-height: 1.8;">
            It's been a few days since you joined The Rebel Toolkit, and we wanted to check in!
          </p>
          
          <p style="font-size: 16px; line-height: 1.8;">
            Have you had a chance to explore the AI agents yet? Here are some tips to get the most out of your toolkit:
          </p>
          
          <div style="background: #eff6ff; border: 2px solid #3b82f6; padding: 24px; margin: 30px 0; border-radius: 8px;">
            <h3 style="margin-top: 0; margin-bottom: 16px; color: #1e40af; font-size: 18px;">🎯 Quick Start Guide</h3>
            <ul style="margin: 12px 0; padding-left: 20px;">
              <li style="margin-bottom: 16px; font-size: 15px; line-height: 1.6; color: #1e40af;">
                <strong>Start with Brand Voice:</strong> Spend 15-20 minutes discovering your unique voice. This forms the foundation for everything else.
              </li>
              <li style="margin-bottom: 16px; font-size: 15px; line-height: 1.6; color: #1e40af;">
                <strong>Create Your First Offer:</strong> Use the Offer Crafter to turn your expertise into an irresistible offer.
              </li>
              <li style="margin-bottom: 16px; font-size: 15px; line-height: 1.6; color: #1e40af;">
                <strong>Validate Fast:</strong> Run the Business Test to make sure you're on the right track before investing more time.
              </li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="${toolkitUrl}" style="background: linear-gradient(135deg, #FF1B8D 0%, #FF6B35 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 14px rgba(255, 27, 141, 0.3);">
              Continue Building →
            </a>
          </div>
          
          <p style="font-size: 16px; line-height: 1.8;">
            Got questions or stuck on something? Just hit reply and we'll help you out. We read every email personally.
          </p>
          
          <p style="font-size: 16px; margin-bottom: 10px;">
            Keep building,<br>
            <strong style="color: #FF1B8D;">The Kindai Team</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            You're receiving this because you purchased The Rebel Toolkit ${daysAfterPurchase} days ago.<br>
            Built by Rebels, for Rebels.
          </p>
        </div>
      </body>
    </html>
  `;
}
