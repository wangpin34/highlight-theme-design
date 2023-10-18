export interface Item {
  key: string
  type: 'general' | 'language'
  color: string
}

export interface Theme {
  backgroundColor: string
  color: string
  items: Record<string, Item>
}
