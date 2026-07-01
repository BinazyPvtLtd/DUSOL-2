
//this funtion will return the youtube thumbnail from the youtube url
export const getYoutubeThumbnail = (url) => {
  if (!url) return "";

  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regExp);

  return match
    ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
    : "";
};