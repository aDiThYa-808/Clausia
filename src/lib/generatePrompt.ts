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
  
  Write a clear, professional, and user-friendly Privacy Policy for an Indian digital product. The tone should be formal but accessible. Avoid legal jargon unless absolutely necessary. Output only plain text. Do not use any formatting (no Markdown, bullets, or HTML).
  
  ---
  
  Start the policy with this header:
  
  Product Name with first letter capitalized
  Privacy Policy
  Last updated on ${formattedDate}
  
  Follow this with a short introduction (3–4 lines) that:
  - States this policy governs the use of ${data.productName}
  - Confirms that users agree to this policy by using the product
  - Notes the policy may be updated and users should check it periodically
  
  ---
  
  Then include the following **sections**, but only if relevant based on the data provided. Start each section with the exact section title below. Use complete sentences and short paragraphs only (no lists or headings inside sections).
  
  1. Information We Collect  
  2. Collection Methods  
  3. Use of Third-Party SDKs  
  4. Purpose of Data Collection  
  5. Data Storage and Security  
  6. Data Retention  
  7. Your Rights  
  8. Children’s Privacy  
  9. Monetization and Advertising  
  10. Contact Us  
  11. Changes to This Privacy Policy
  
  ---
  
  Here is the structured input:
  
  ${JSON.stringify(data, null, 2)}
  
  Only return the full Privacy Policy text. Do not include any explanation, commentary, or extra output.
  `.trim();
  }