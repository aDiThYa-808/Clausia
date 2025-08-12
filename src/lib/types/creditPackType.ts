export type CreditPack = {
    id: number;
    amount: number; // in rupees
    credits: number;
  };
  
  export const creditPacks: Record<number, CreditPack> = {
    1: { id: 1, amount: 49, credits: 5000 },
    2: { id: 2, amount: 149, credits: 20000 },
  };