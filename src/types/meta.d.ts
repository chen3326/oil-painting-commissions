interface FacebookPixel {
  (
    action: "init",
    pixelId: string,
    options?: { autoConfig?: boolean; debug?: boolean }
  ): void;
  (action: "track", eventName: string, parameters?: object): void;
  (action: "trackCustom", eventName: string, parameters?: object): void;
}

interface Window {
  fbq: FacebookPixel;
  _fbq: FacebookPixel;
}
