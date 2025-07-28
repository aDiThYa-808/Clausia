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

    Based on the structured input provided below, write a clear, professional, and user-friendly Privacy Policy for an Indian digital product. The tone should be formal but accessible. Avoid legal jargon unless absolutely necessary.
    
    You must follow this **strict plain text format**, without any Markdown, bullet points, code blocks, or explanation. Do not use quotes, curly braces, or JSON formatting.
    
    Return the policy in the following structure and **do not deviate** from it:
    
    PRODUCT NAME:
    <Insert product name>

    PRODUCT TYPE:
    <Insert product type>
    
    LAST UPDATED:
    ${formattedDate}
    
    INTRODUCTION:
    <Write a 3–4 line introduction that explains this Privacy Policy governs the use of the product, users agree to it by using the product, and that it may be updated periodically.>
    
    SECTION 1: Information We Collect
    <Short paragraph explaining what user data is collected.>
    
    SECTION 2: Collection Methods
    <Short paragraph explaining how the data is collected (e.g., user input, device data, etc.).>
    
    SECTION 3: Use of Third-Party SDKs
    <Short paragraph about third-party SDKs, if used, and their data implications.>
    
    SECTION 4: Purpose of Data Collection
    <Why data is collected – e.g., to provide core functionality, improve experience, etc.>
    
    SECTION 5: Data Storage and Security
    <How the data is stored, what measures are taken to keep it secure.>
    
    SECTION 6: Data Retention
    <How long data is kept and how it is deleted or archived.>
    
    SECTION 7: Your Rights
    <Explain what rights users have over their data – access, deletion, etc.>
    
    SECTION 8: Children’s Privacy
    <Whether the product is for children, and protections in place if applicable.>
    
    SECTION 9: Monetization and Advertising
    <Mention if the product is monetized or uses advertising SDKs.>
    
    SECTION 10: Contact Us
    <Provide the contact email or method for users to raise privacy concerns.>
    
    SECTION 11: Changes to This Privacy Policy
    <Explain that the policy may change and how users will be notified.>
    
    ---
    
    IMPORTANT:
    - **Include all 11 sections in order**, even if some are empty or say "Not applicable".
    - Each section must provide detailed explanations relevant to the provided product details — do not keep things vague or overly generic.
    - Do not output anything else except the policy in this format.
    - Do not include JSON, Markdown, quotation marks, or code blocks.
    
    Structured input:
    ${JSON.stringify(data, null, 2)}
    
    `.trim();
  }