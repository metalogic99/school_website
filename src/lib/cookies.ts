export const setCookie = (name: string, value: string, hours: number) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + hours * 60 * 60 * 1000);

  const cookieValue = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieValue;
};

export const getCookie = (name: string): string | null => {
  const cookieName = `${encodeURIComponent(name)}=`;
  const cookieArray = document.cookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return decodeURIComponent(
        cookie.substring(cookieName.length, cookie.length),
      );
    }
  }
  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${encodeURIComponent(
    name,
  )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};
