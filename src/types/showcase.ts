export type Tool = {
  name: string
}

export type Category = {
  name: string
}

export type RawService = {
  id?: string;
  name: string;
  description: string;
  service_categories: {
    categories: Category;
  }[];
};


export type Service = {
  id?: string;
  name: string;
  description: string;
  categories: string[]
}