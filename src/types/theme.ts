export interface Item {
  category: string
  color: string
}

export interface Theme {
  backgroundColor: string
  color: string
  items: Map<string, Item>
}
