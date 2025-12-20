interface HTTPInstance {
  get<T>(url: string, config?: RequestInit): Promise<T>;
  delete<T>(url: string, config?: RequestInit): Promise<T>;
  head<T>(url: string, config?: RequestInit): Promise<T>;
  options<T>(url: string, config?: RequestInit): Promise<T>;
  post<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
  put<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
  patch<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
}

class HttpService {
  public http: HTTPInstance;

  public baseURI?: string;

  public headers: Record<string, string>;

  constructor(baseURI?: string, headers?: Record<string, string>) {
    this.baseURI = baseURI;
    this.headers = {
      csrf: "token",
      "Content-Type": "application/json",
      ...headers,
    };

    this.http = {
      get: this.get.bind(this),
      delete: this.delete.bind(this),
      head: this.head.bind(this),
      options: this.options.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      patch: this.patch.bind(this),
    };
  }

  public async request<T = unknown>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestInit,
  ): Promise<T> {
    try {
      const response = await fetch(`${(this.baseURI || "") + url}`, {
        method,
        headers: {
          ...this.headers,
          ...config?.headers,
        },
        credentials: "include",
        body: data ? JSON.stringify(data) : undefined,
        ...config,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData: T = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public get<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("GET", url, undefined, config);
  }

  public delete<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("DELETE", url, undefined, config);
  }

  public head<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("HEAD", url, undefined, config);
  }

  public options<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("OPTIONS", url, undefined, config);
  }

  public post<T>(url: string, data?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>("POST", url, data, config);
  }

  public put<T>(url: string, data?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>("PUT", url, data, config);
  }

  public patch<T>(url: string, data?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>("PATCH", url, data, config);
  }
}

export default HttpService;
