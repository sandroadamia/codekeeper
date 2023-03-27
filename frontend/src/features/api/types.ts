export interface Response {
  collection: Collection;
}

export interface Collection {
  items: Item[];
  metadata: Metadata;
  href: string;
}

export interface Metadata {
  total_hits: number;
  links: MetaDataLink[];
}

export interface MetaDataLink {
  rel: string;
  propmt: string;
  href: string;
}

export interface Item {
  href: string;
  data: Data[];
  links: Link[];
}

export interface Data {
  center: string;
  date_created: string;
  description: string;
  description_508: string;
  keywords: string[];
  location?: string;
  media_type: string;
  nasa_id: string;
  photographer?: string;
  title: string;
  album: string[];
}

export interface Link {
  href: string;
  rel: string;
  render: string;
}