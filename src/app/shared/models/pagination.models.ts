export interface PagedList<TItem> {
  items: TItem[];
  total_items: number;
  page_size: number;
  total_pages: number;
  page: number;
}
