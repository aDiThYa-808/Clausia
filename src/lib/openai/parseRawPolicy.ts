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

function extractRequired(raw: string, regex: RegExp, fieldName: string): string {
  const match = raw.match(regex);
  const value = match?.[1]?.trim();

  if (!value) {
    throw new Error(`Missing required field: ${fieldName}`);
  }

  return value;
}

export function parseRawPolicy(raw: string): ParsedPolicy {
  const productName = extractRequired(
    raw,
    /PRODUCT NAME:[ \t]*\r?\n?[ \t]*(.+)/,
    "PRODUCT NAME"
  );
  const productType = extractRequired(
    raw,
    /PRODUCT TYPE:[ \t]*\r?\n?[ \t]*(.+)/,
    "PRODUCT TYPE"
  );
  const lastUpdated = extractRequired(
    raw,
    /LAST UPDATED:[ \t]*\r?\n?[ \t]*(.+)/,
    "LAST UPDATED"
  );
  const introduction = extractRequired(
    raw,
    /INTRODUCTION:[ \t]*\r?\n?(.*?)\n[ \t]*SECTION 1:/s,
    "INTRODUCTION"
  );

  const sectionsRaw = raw.split(/\n(?=SECTION \d+:)/g).slice(1);

  if (sectionsRaw.length === 0) {
    throw new Error("No sections found in raw policy text");
  }

  const sections = sectionsRaw.map((section, index) => {
    const match = section.match(/^SECTION \d+: (.*?)\n(.*)$/s);

    if (!match) {
      throw new Error(`Malformed section at position ${index + 1}: could not parse title/content`);
    }

    const title = match[1].trim();
    const content = match[2].trim();

    if (!title || !content) {
      throw new Error(`Section ${index + 1} is missing a title or content`);
    }

    return { title, content };
  });

  return {
    productName,
    productType,
    lastUpdated,
    introduction,
    sections,
  };
}