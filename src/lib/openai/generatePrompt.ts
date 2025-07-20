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
    monetizationMethod:string,
    adPlatforms:string[],
    adsArePersonalized:string,
    otherMonetizationExplanation:string
  };
  
  export function generatePrivacyPrompt(data: PolicyInput): string {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  
    return `
    You are a legal AI writing assistant.
    
    Based on the structured input provided below, generate a clear, professional, and user-friendly Privacy Policy for an Indian digital product. The tone should be formal but accessible. Avoid legal jargon unless absolutely necessary.
    
    Output ONLY a JSON object with this exact structure:
    
    {
      "productName": string,
      "lastUpdated": string,
      "introduction": string,
      "sections": [
        {
          "title": string,
          "content": string
        }
        // ... more sections if applicable
      ]
    }
    
    Start the policy with the following values:
    - "productName": ${data.productName}
    - "lastUpdated": "${formattedDate}"
    - "introduction": (3–4 lines that explain this policy governs the use of ${data.productName}, users agree to it by using the product, and that it may be updated)
    
    Then include relevant sections (only if applicable) using these exact titles:
    - Information We Collect
    - Collection Methods
    - Use of Third-Party SDKs
    - Purpose of Data Collection
    - Data Storage and Security
    - Data Retention
    - Your Rights
    - Children’s Privacy
    - Monetization and Advertising
    - Contact Us
    - Changes to This Privacy Policy
    
    Use complete sentences and short paragraphs for the "content" of each section.
    
    Here is the structured input:
    
    ${JSON.stringify(data, null, 2)}
    
    Return only a valid JSON object matching this structure. Do not include Markdown formatting, code fences, or explanation.
    `.trim();
  }