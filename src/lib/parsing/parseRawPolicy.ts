export type ParsedPolicy = {
    productName: string;
    productType: string;
    lastUpdated: string;
    introduction: string;
    sections: {
      title: string;
      content: string;
    }[];
  };
  
  export function parseRawPolicy(raw: string): ParsedPolicy {
    const productNameMatch = raw.match(/PRODUCT NAME:\s*(.+)/);
    const lastUpdatedMatch = raw.match(/LAST UPDATED:\s*(.+)/);
    const introductionMatch = raw.match(/INTRODUCTION:\s*(.*?)\n\s*SECTION 1:/s);
  
    const productName = productNameMatch?.[1]?.trim() || "Untitled";
    const lastUpdated = lastUpdatedMatch?.[1]?.trim() || "";
    const introduction = introductionMatch?.[1]?.trim() || "";
  
    // Smarter productType inference
    const productTypeMatch = introduction.toLowerCase().match(/\b(app|game|website)\b/);
    const productType = productTypeMatch?.[1] ?? "app";
  
    const sectionsRaw = raw.split(/\n(?=SECTION \d+:)/g).slice(1);
  
    const sections = sectionsRaw
      .map((section) => {
        const match = section.match(/^SECTION \d+: (.*?)\n(.*)$/s);
        if (!match) return null;
        return {
          title: match[1].trim(),
          content: match[2].trim(),
        };
      })
      .filter(Boolean) as ParsedPolicy["sections"];
  
    return {
      productName,
      productType,
      lastUpdated,
      introduction,
      sections,
    };
  }
  