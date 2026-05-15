export const HEADERS_WITH_JSON = {
  "Content-Type": "application/json",
};

export const HEADERS_WITH_TOKEN = (token?: string) => ({
  Authorization: token ? `Bearer ${token}` : "",
});

export const HEADERS_WITH_TOKEN_AND_JSON = (token?: string) => ({
  "Content-Type": "application/json",
  Authorization: token ? `Bearer ${token}` : "",
});

// ⚠️ Some backends need multipart set manually
export const HEADERS_WITH_TOKEN_AND_FORMDATA = (token?: string) => ({
  "Content-Type": "multipart/form-data",
  Authorization: token ? `Bearer ${token}` : "",
});

export const HEADERS_WITH_FORMDATA = {
  "Content-Type": "multipart/form-data",
};
