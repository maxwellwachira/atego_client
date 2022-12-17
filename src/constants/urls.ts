import { getCookie } from "cookies-next";

const env = process.env.NEXT_PUBLIC_ENV as string;

export const urls = {
    baseUrl:'http://localhost:5000',
    tutorLms: 'https://mygrannyslove.com/wp-json/tutor/v1',
    zoomBaseUrl: 'https://api.zoom.us/v2'
}

export const authHeader = {
    Authorization: `Bear ${getCookie('accessToken')}`
}

export const refreshHeader = {
    Authorization: `Bear ${getCookie('refreshToken')}`
}