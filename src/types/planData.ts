export interface PlanData {
  errors?: string[];
  data: {
    attributes: {
      renews_at: string;
      status: string;
      card_brand: string;
      card_last_four: string;
      urls: {
        update_payment_method: string;
        customer_portal: string;
        customer_portal_update_subscription: string;
      };
    };
  };
}
