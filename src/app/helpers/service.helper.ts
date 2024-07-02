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

  public static translateError(errorCode: string): string {
    const firebaseErrorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'Пользователя с такими данными не существует',
      'auth/invalid-email': 'Пользователя с такими данными не существует',
      'auth/user-not-found': 'Пользователь с таким адресом электронной почты не найден.',
      'auth/wrong-password': 'Неверный пароль.',
      'auth/weak-password': 'Пароль слишком слабый.',
      'auth/invalid-verification-code': 'Недопустимый код подтверждения.',
      'auth/invalid-verification-id': 'Недопустимый идентификатор подтверждения.',
      'auth/invalid-argument': 'Вы патаетесь добавить невалидный объект',
      'auth/invalid-credential': 'Пользователя с такими данными не существует',
    };

    return firebaseErrorMessages[errorCode] || 'Произошла неизвестная ошибка.';
  }
}
