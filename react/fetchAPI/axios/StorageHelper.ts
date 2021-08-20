/**
 * localStorage ~5MB, saved for infinity or until the user manually deletes it.
 * sessionStorage ~5MB, saved for the life of the CURRENT TAB
 */

 import { Cookies } from "react-cookie";

 const cookies = new Cookies();
 
 const cookieOption = {
   path: "/",
 };
 
 const StorageHelper = {
   setCookie: function (name: string, value: any, options = {}) {
     cookies.set(name, value, {
       ...cookieOption,
       ...options,
     });
   },
 
   getCookie: function (name: string) {
     return cookies.get(name);
   },
 
   removeCookie: async function (name: string, options = {}) {
     await cookies.remove(name, { ...cookieOption, ...options });
   },
 
   setLocalItem: function (name: string, value: any) {
     localStorage.setItem(name, value);
   },
 
   setLocalObject: function (name: string, obj: any) {
     StorageHelper.setLocalItem(name, JSON.stringify(obj));
   },
 
   getLocalItem: function (name: string) {
     return localStorage.getItem(name);
   },
 
   getLocalObject: (name: string) => {
       const response: any = StorageHelper.getLocalItem(name);
    return JSON.parse(response);
   },
 
   removeLocalItem: function (name: string) {
     localStorage.removeItem(name);
   },
 
   setSessionItem: function (name: string, value: any) {
     sessionStorage.setItem(name, value);
   },
 
   setSessionObject: function (name: string, obj: any) {
     StorageHelper.setSessionItem(name, JSON.stringify(obj));
   },
 
   getSessionItem: function (name: string) {
     return sessionStorage.getItem(name);
   },
 
   getSessionObject: function (name: string) {
       const response: any = StorageHelper.getSessionItem(name); 
    return JSON.parse(response);
   },
 
   removeSessionItem: function (name: string) {
     sessionStorage.removeItem(name);
   },
 };
 
 export default StorageHelper;
 