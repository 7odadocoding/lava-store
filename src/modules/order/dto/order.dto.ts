import { CartItem } from 'src/common/interfaces/cartItem.interface';

export interface OrderData {
   products: CartItem[];
   user_id: string;
   email: string;
   phone: string;
   goverenorate: string;
   city: string;
   street: string;
   nearest_landmark?: string;
   state: 'under_review' | 'confirmed' | 'out_for_delivery' | 'recieved';
   orderTotalPrice: number;
}

export class CreateOrderDTO {
   products: CartItem[];
   user_id: string;
   email: string;
   phone: string;
   goverenorate: string;
   city: string;
   street: string;
   nearest_landmark?: string;
   state: 'under_review' | 'confirmed' | 'out_for_delivery' | 'recieved';
   orderTotalPrice: number;
}
