export interface EditorJSEmits {
  (e: 'update:contents', contents: string): void;
}

export interface CategoricalEmits {
  (e: 'update:data', data: string): void;
}
