export interface IFaviconFiles {
  favicon: Blob;
  icons: Blob[];
  appleIcons: Blob[];
}

export async function convertImageToFaviconFiles(
  imageFile: File
): Promise<IFaviconFiles> {
  const favicon = dataUrlToBlob(await getFaviconIco(imageFile));
  const icons = (await getIcons(imageFile)).map((dataUrl) =>
    dataUrlToBlob(dataUrl)
  );
  const appleIcons = (await getAppleIcons(imageFile)).map((dataUrl) =>
    dataUrlToBlob(dataUrl)
  );
  return { favicon, icons, appleIcons };
}

function dataUrlToBlob(dataUrl: string): Blob {
  const base64 = dataUrl.split(",")[1];
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: "image/png" });
}

async function createImageDataUrl(
  imageFile: File,
  size: number
): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      resolve("");
      return;
    }
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);
      resolve(canvas.toDataURL("image/png"));
    };
  });
}

async function getFaviconIco(imageFile: File): Promise<string> {
  return createImageDataUrl(imageFile, 16);
}

async function getIcons(imageFile: File): Promise<string[]> {
  return [
    await createImageDataUrl(imageFile, 16),
    await createImageDataUrl(imageFile, 32),
    await createImageDataUrl(imageFile, 96),
  ];
}

async function getAppleIcons(imageFile: File): Promise<string[]> {
  return [
    await createImageDataUrl(imageFile, 57),
    await createImageDataUrl(imageFile, 60),
    await createImageDataUrl(imageFile, 72),
    await createImageDataUrl(imageFile, 114),
    await createImageDataUrl(imageFile, 120),
    await createImageDataUrl(imageFile, 144),
    await createImageDataUrl(imageFile, 152),
    await createImageDataUrl(imageFile, 180),
  ];
}
