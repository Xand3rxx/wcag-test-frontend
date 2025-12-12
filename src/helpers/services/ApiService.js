import axios from "axios";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://wcag.backend.sixthflair.com/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging/debugging
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "An error occurred";
    console.error("API Error:", message);
    return Promise.reject(error);
  }
);

class ApiService {
  static setResponseType(type) {
    apiClient.defaults.responseType = type;
  }

  static get(resource, slug = "") {
    const url = slug ? `${resource}/${slug}` : resource;
    return apiClient.get(url);
  }

  static post(resource, params, config = {}) {
    return apiClient.post(resource, params, config);
  }

  static update(resource, slug, params) {
    return apiClient.put(`${resource}/${slug}`, params);
  }

  static put(resource, params) {
    return apiClient.put(resource, params);
  }

  static patch(resource, params, config = {}) {
    return apiClient.patch(resource, params, config);
  }

  static delete(resource, params = {}) {
    return apiClient.delete(resource, { data: params });
  }
}

export default ApiService;
