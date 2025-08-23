export type Transaction = {
  id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  amount: number;
  currency: string;
  status: 'created' | 'paid' | 'failed';
  created_at: string;
};