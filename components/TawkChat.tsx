import Script from "next/script";

const safeId = /^[a-zA-Z0-9_-]+$/;

export default function TawkChat() {
  const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID?.trim();
  const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID?.trim();

  if (!propertyId || !widgetId || !safeId.test(propertyId) || !safeId.test(widgetId)) return null;

  return (
    <>
      <Script id="tawk-api-init" strategy="afterInteractive">
        {`window.Tawk_API=window.Tawk_API||{};
window.Tawk_API.customStyle={
  zIndex:"20 !important",
  visibility:{
    desktop:{position:"br",xOffset:20,yOffset:20},
    mobile:{position:"br",xOffset:16,yOffset:16}
  }
};
window.Tawk_LoadStart=new Date();`}
      </Script>
      <Script
        id="tawk-widget"
        src={`https://embed.tawk.to/${propertyId}/${widgetId}`}
        strategy="afterInteractive"
        charSet="UTF-8"
        crossOrigin="anonymous"
      />
    </>
  );
}
