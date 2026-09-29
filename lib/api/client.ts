const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function fetchApi<T = any>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, headers, ...customConfig } = options;

  let url = `${BASE_URL}${endpoint}`;
  
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const config: RequestInit = {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    // Ensure cookies are sent with requests (crucial for our HTTP-only JWTs)
    credentials: 'include',
  };

  try {
    const response = await fetch(url, config);

    // Some endpoints might not return JSON (e.g. 204 No Content)
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      // The NestJS backend returns structured errors in JSON, e.g. { message: '...', error: '...', statusCode: 4xx }
      const errorMessage = data?.message || data?.error || 'An unexpected error occurred';
      throw new ApiError(response.status, Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage, data);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(error instanceof Error ? error.message : 'Network request failed');
  }
}
