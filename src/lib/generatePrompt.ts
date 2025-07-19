export type PolicyInput = {
    productName: string;
    productType: string;
    productDescription: string;
    ageGroup: string;
    contactEmail: string;
    contactMethods: string[];
    collectsData: string;
    collectedDataTypes: string[];
    dataCollectionMethods: string[];
    usesSDKs: string;
    thirdPartySDKs: string[];
    otherthirdPartySDKs: string;
    dataStorageRegion: string;
    supportsDeletion: string;
  };
  
  export function generatePrivacyPrompt(data: PolicyInput): string {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  
    return`
    You are a legal AI writing assistant.
    
    Write a clear, professional, and user-friendly Privacy Policy for an Indian digital product. The tone should be formal but accessible. Avoid legal jargon unless absolutely necessary. Do not include any formatting (no Markdown, bullets, or HTML) — output only plain text.
    
    ---
    
    Start the policy with this structure:
    
    1. Heading: Privacy Policy  
    2. A line below it: Last updated on ${formattedDate}  
    3. A short introduction that:
       - States this policy governs the use of ${data.productName}
       - States users agree to the policy by using the product
       - Mentions that the policy may be updated and users should review it periodically
    
    ---
    
    Then follow this exact section order. Include only the sections that apply, based on the input data. Use proper section titles exactly as shown:
    
    1. Information We Collect  
    2. Collection Methods  
    3. Use of Third-Party SDKs  
    4. Purpose of Data Collection  
    5. Data Storage and Security  
    6. Data Retention  
    7. Your Rights  
    8. Children’s Privacy  
    9. Contact Us  
    10. Changes to This Privacy Policy
    
    Write full sentences in plain text. List items should be written as individual lines or short paragraphs, not bullets.
    
    ---
    
    Here is the structured data:
    
    ${JSON.stringify(data, null, 2)}
    
    Do not mention that you were given structured input.  
    Do not include any explanation, formatting, or extra notes.  
    Only return the complete privacy policy text, in plain language.
    `.trim();
    }