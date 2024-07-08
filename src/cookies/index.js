import { createApp } from 'vue';
import VueCookies from 'vue-cookies';

const app = createApp({});

app.use(VueCookies, { expires: '30min' });

export function setCookie(name, value, expireTime) {
  app.config.globalProperties.$cookies.set(name, value, expireTime);
}

export function getCookie(name) {
  return app.config.globalProperties.$cookies.get(name);
}

export function removeCookie(name) {
  app.config.globalProperties.$cookies.remove(name);
}