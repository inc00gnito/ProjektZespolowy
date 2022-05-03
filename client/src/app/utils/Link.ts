export const createCloudinaryDownLink = (link: string | undefined) => {
  if (!link) return "";
  const downloadLinkArr = link.split("/");
  const uploadIndex = downloadLinkArr.findIndex((item) => item === "upload");
  const firstHalf = downloadLinkArr.slice(0, uploadIndex + 1);
  const secondHalf = downloadLinkArr.slice(
    uploadIndex + 1,
    downloadLinkArr.length
  );
  const newDownloadLink = [...firstHalf, "fl_attachment", ...secondHalf].join(
    "/"
  );
  return newDownloadLink;
};
