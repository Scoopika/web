interface FetchOptions {
  method: "GET" | "POST" | "PUT";
  headers: Record<string, string>;
  data?: Record<string, any>;
}

class API {
  source: string;

  constructor(source: string) {
    this.source = source;
  }

  async fetch<ReturnType>(
    path: string,
    options: FetchOptions,
  ): Promise<ReturnType> {
    const url = `${this.source}/${path}`;
    const secret = process.env.SECRET_KEY;

    if (!secret) {
      throw new Error("Invalid secret key");
    }

    const fetchOptions: FetchOptions = {
      method: options.method,
      headers: {
        ...options.headers,
        authorization: secret,
      },
    };

    if (options.method !== "GET" && options.data) {
      fetchOptions.data = options.data;
    }

    const res = await fetch(url, fetchOptions);
    const data = await res.json();

    return data as ReturnType;
  }

  async listAgents(userId: string) {
    const agents = await this.fetch("agents", {
      method: "GET",
      headers: {},
    });
  }
}
