export class Fetcher {
  static baseUrl =
    typeof window !== "undefined" ? import.meta.env.VITE_BASE_URL : "";

  static baseHeader = {
    "Content-Type": "application/json",
  };

  static action = async (method, path, body) => {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: this.baseHeader,
      body: JSON.stringify(body),
    }).catch((error) => {
      return error;
    });

    const data = await response.json();

    return {
      status: response.status,
      data,
    };
  };

  static async get(path, data) {
    return Fetcher.action("get", path, data);
  }

  static post(path, data) {
    return Fetcher.action("post", path, data);
  }

  static patch(path, data) {
    return Fetcher.action("patch", path, data);
  }

  static put(path, data) {
    return Fetcher.action("put", path, data);
  }

  static delete(path, data) {
    return Fetcher.action("delete", path, data);
  }
}
