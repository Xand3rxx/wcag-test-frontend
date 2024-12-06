import axios from "axios";
import VueAxios from "vue-axios";

class ApiService {
  static vueInstance;

  static init(app) {
    // const baseURL = "https://wcag.backend.sixthflair.com/api";
    const baseURL = "http://127.0.0.1:9909/api";
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL = baseURL;
    // ApiService.vueInstance.axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASE_URL;
  }

  static setResponseType(type) {
    ApiService.vueInstance.axios.defaults.responseType = type;
  }

  static create() {
    ApiService.vueInstance.axios.defaults.headers.common["headers"] = [
      "Content-Type",
      "multipart/form-data",
    ];
  }

  static get(resource, slug = "") {
    let url = resource;
    if (slug !== "") {
      url += `/${slug}`;
    }
    return ApiService.vueInstance.axios.get(url);
  }

  static post(resource, params, config) {
    return ApiService.vueInstance.axios.post(`${resource}`, params, config);
  }

  static update(resource, slug, params) {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  static put(resource, params) {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  static patch(resource, params, config) {
    return ApiService.vueInstance.axios.patch(`${resource}`, params, config);
  }

  static delete(resource, params = {}) {
    return ApiService.vueInstance.axios.delete(`${resource}`, { data: params });
  }
}

export default ApiService;
