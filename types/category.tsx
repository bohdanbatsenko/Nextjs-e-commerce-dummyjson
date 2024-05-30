export type CategoryType = {
  slug: string;
  name: string;
  id?: number;
}
export type SelectedCategories = {
  slug: string;
  category: CategoryType;
}
