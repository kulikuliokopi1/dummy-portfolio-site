const API_BASE_URL = "https://cwbaustralia.com/api" || "http://localhost:4000/api";

export const API_URLS = {
  USER_LOGIN: `${API_BASE_URL}/login/user`,
  ADMIN_LOGIN: `${API_BASE_URL}/admin/authenticate`,

  //TRANSACTION GATEWAY
  
  GATEWAY_STATUS: `${API_BASE_URL}/gateway/status`,
  UPDATE_GATEWAY: `${API_BASE_URL}/gateway/update`,
  UPDATE_ALERT: `${API_BASE_URL}/gateway/update-alert`,
  GATEWAY_STATUS_AND_ALERT: `${API_BASE_URL}/gateway`,

  // Manage transaction APIs
  RECENT_TRANSACTIONS: `${API_BASE_URL}/transactions/recent`,
  FILTER_TRANSACTIONS_LIFETIME: `${API_BASE_URL}/transactions/lifetime`,
  FILTER_TRANSACTIONS_24HRS: `${API_BASE_URL}/transactions/24hrs`,
  FILTER_TRANSACTIONS_3DAYS: `${API_BASE_URL}/transactions/3days`,
  FILTER_TRANSACTIONS_7DAYS: `${API_BASE_URL}/transactions/7days`,
  FILTER_TRANSACTIONS_30DAYS: `${API_BASE_URL}/transactions/30days`,
  FILTER_TRANSACTIONS_90DAYS: `${API_BASE_URL}/transactions/90days`,
  FILTER_TRANSACTIONS_CUSTOM: (startDate, endDate) =>
  `${API_BASE_URL}/transactions/custom?startDate=${startDate}&endDate=${endDate}`,


  //User Dashboard APIs
  SEARCH_USER_BY_ID_OR_EMAIL: (searchInput) => `${API_BASE_URL}/transactions/search?query=${searchInput}`,
  USER_TRANSACTIONS: `${API_BASE_URL}/transactions/user?query=`,

  //MANAGE USERS ADMIN DASHBOARD
  TOTAL_USERS: `${API_BASE_URL}/totalUsers`,
  ADMIN_FETCH_USERS: (page, perPage) =>
  `${API_BASE_URL}/userContainer?page=${page}&perPage=${perPage}}`,

  DELETE_USER: (userToDelete) => `${API_BASE_URL}/user/${userToDelete}`,
  
  //ADMIN CREATE NEW TRANSACTION
  ADMIN_CREATE_NEW_TRANSACTION: `${API_BASE_URL}/transactions/new`,

  DELETE_TXN: (txnToDelete) => `${API_BASE_URL}/transaction/${txnToDelete}`,

  //USER CREATE TRANSACTION
  USER_CREATE_NEW_TRANSACTION: `${API_BASE_URL}/User/transaction/new`,

  //AMIN CREATE USER
  ADMIN_CREATE_NEW_USER: `${API_BASE_URL}/createUser`,

  //FETCH USER DETAILS
  GET_USER_DETAILS_BY_ID: (userId) => `${API_BASE_URL}/user/${userId}`,

  //UPDATE USER DETAILS
  UPDATE_USER_DETAILS: (userId) => `${API_BASE_URL}/updateUser/${userId}`,
};