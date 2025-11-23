export interface Restaurant {
  id: string;
  name: string;
  is_open?: boolean;
  delivery_time_minutes?: number;
  filter_ids?: string[];
  price_range?: number;
}

export interface Filter {
  id: string;
  name: string;
  image_url?: string;
}
