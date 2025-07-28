export type Tool = {
  name: string
}

export type Category = {
  name: string
}

export type RawService = {
  name: string;
  description: string;
  service_categories: {
    categories: Category;
  }[];
};


export type Service = {
  name: string;
  description: string;
  categories: string[]
}