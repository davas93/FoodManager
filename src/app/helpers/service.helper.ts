export class ServiceHelper {
  static toPlainObject<T>(obj: T): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.toPlainObject(item));
    }

    const plainObject: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = (obj as any)[key];
        plainObject[key] = value && typeof value === 'object' && 'toPlainObject' in value
          ? (value as any).toPlainObject()
          : this.toPlainObject(value);
      }
    }

    return plainObject;
  }
}
