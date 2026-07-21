const schemas: Record<string, any[]> = {};

export function setSchemas(key: string, data: any[]) {
  schemas[key] = data;
}

export function getSchemas(key: string): any[] {
  return schemas[key] || [];
}

export function clearSchemas(key: string) {
  delete schemas[key];
}
