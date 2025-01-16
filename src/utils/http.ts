export type Config = RequestInit & { query?: Record<string, string | number> };

const baseHttp = async <T = any>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", body?: any, config?: Config): Promise<T> => {
  try {
    let requestUrl = url;

    // Handle query parameters (params)
    if (config?.query) {
      const queryParams = new URLSearchParams();
      for (const key in config.query) {
        if (config.query.hasOwnProperty(key)) {
          queryParams.append(key, String(config.query[key]));
        }
      }
      requestUrl += `?${queryParams.toString()}`;
    }

    const isFormData = body instanceof FormData;
    const headers = isFormData ? config?.headers || {} : { "Content-Type": "application/json", ...(config?.headers || {}) };

    const response = await fetch(requestUrl, {
      ...config,
      method,
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw errorResponse;
    }

    return response.json();
  } catch (error: any) {
    throw error;
  }
};

export const http = {
  get: async <T = any>(url: string, config?: Config): Promise<T> => baseHttp(url, "GET", undefined, config),

  post: async <T = any>(url: string, body?: any, config?: Config): Promise<T> => baseHttp(url, "POST", body, config),

  put: async <T = any>(url: string, body?: any, config?: Config): Promise<T> => baseHttp(url, "PUT", body, config),

  delete: async <T = any>(url: string, config?: Config): Promise<T> => baseHttp(url, "DELETE", undefined, config),
};
