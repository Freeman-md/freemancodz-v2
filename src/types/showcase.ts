export type Tool = {
  name: string;
  order_index?: number;
}

export type Module = {
  name: string
}

export type Category = {
  name: string
}

export type RawService = {
  id?: string;
  name: string;
  description: string;
  service_category: {
    categories: Category;
  }[];
};


export type Service = Omit<RawService, "service_category"> & {
  categories: string[];
}