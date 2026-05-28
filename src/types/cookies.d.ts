// Type definitions for js-cookie
declare module 'js-cookie' {
  interface CookieAttributes {
    expires?: number | Date | undefined;
    path?: string | undefined;
    domain?: string | undefined;
    secure?: boolean | undefined;
    sameSite?: 'Strict' | 'Lax' | 'None' | undefined;
    [key: string]: any;
  }

  interface CookiesStatic {
    get(name: string): string | undefined;
    get(): {
      [key: string]: string;
    };
    set(name: string, value: string, options?: CookieAttributes): string;
    remove(name: string, options?: CookieAttributes): void;
  }

  const Cookies: CookiesStatic;
  export default Cookies;
}
