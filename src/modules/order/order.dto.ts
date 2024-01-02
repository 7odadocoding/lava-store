export interface OrderItemDTO {
   id: string;
   qty: number;
   total_price: number;
}

export interface OrderDTO {
   products: OrderItemDTO[];
   user_id: string;
   email: string;
   phone: string;
   goverenorate: string;
   city: string;
   street: string;
   nearest_landmark: string;
   state: 'under_review' | 'confirmed' | 'out_for_delivery' | 'recieved';
   orderTotalPrice: number;
}
