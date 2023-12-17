// fetch wrapper => 왜? 확장성
/** @typedef {Promise<{status: number, data: any}>} FetchResult */
export class Fetcher {
  static baseUrl =
    typeof window !== "undefined" ? import.meta.env.VITE_BASE_URL : "";

  static baseHeader = {
    "Content-Type": "application/json",
  };

  /**
   * @param {string} method
   * @param {string} path
   * @param {object} body
   * @returns {FetchResult}
   */
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

  /**
   *
   * @param {string} path
   * @param {any} data
   * @returns {FetchResult}
   */
  static async get(path, data) {
    return Fetcher.action("get", path, data);
  }

  /**
   *
   * @param {string} path
   * @param {any} data
   * @returns {FetchResult}
   */
  static post(path, data) {
    return Fetcher.action("post", path, data);
  }

  /**
   *
   * @param {string} path
   * @param {any} data
   * @returns {FetchResult}
   */
  static patch(path, data) {
    return Fetcher.action("patch", path, data);
  }

  /**
   *
   * @param {string} path
   * @param {any} data
   * @returns {FetchResult}
   */
  static put(path, data) {
    return Fetcher.action("put", path, data);
  }

  /**
   *
   * @param {string} path
   * @param {any} data
   * @returns {FetchResult}
   */
  static delete(path, data) {
    return Fetcher.action("delete", path, data);
  }
}
