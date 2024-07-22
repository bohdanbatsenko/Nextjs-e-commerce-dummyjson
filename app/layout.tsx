import "./index.css";

export const metadata = {
  title: "Next js Ecommerce store",
  description: "Ecommerce application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body>{children}</body>
    </html>
  );
}