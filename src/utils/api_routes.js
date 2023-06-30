export const BASE_URL = "http://localhost:8080";

const AUTH_ROUTE = `${BASE_URL}/api/v1/auth`;
const USER_ROUTE = `${BASE_URL}/api/v1/users`;
const MESSAGE_ROUTE = `${BASE_URL}/api/v1/messages`;

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;
export const CREATE_USER_ROUTE = `${AUTH_ROUTE}/create-user`;
export const GENERATE_TOKEN_USER = `${AUTH_ROUTE}/generate-token`;
export const GET_ALL_CONTACT = `${USER_ROUTE}/get-contact`;

export const ADD_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-message`;
export const GET_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/get-message`;
export const ADD_MESSAGE_IMAGE_ROUTE = `${MESSAGE_ROUTE}/add-message-image`;
export const GET_CONTACT_USER_ROUTE = `${MESSAGE_ROUTE}/get-contact-mess`;
