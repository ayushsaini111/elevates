import localFont from "next/font/local";
import { Castoro_Titling ,Geist} from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
export const metadata = {
  title: "Ayansh Elevating Lives",
  description:
    "From Land Purchase to Final Home. Seamlessly Delivered by One Group",
  openGraph: {
    title: "Ayansh Elevating Lives",
    description:
      "From Land Purchase to Final Home. Seamlessly Delivered by One Group",
    url: "https://ayanshelevates.vercel.app/",
    siteName: "Ayansh Elevating Lives",
    images: [
      {
        url: "https://ayanshelevates.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Ayansh Elevating Lives",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayansh Elevating Lives",
    description:
      "From Land Purchase to Final Home. Seamlessly Delivered by One Group",
    images: ["https://ayanshelevates.vercel.app/og.png"],
  },
};
const Primary = Geist({
    subsets: ["latin"],
    variable: "--font-geist",
    display: "swap",
    weight: "400",
  });
  
  const Secondary = Castoro_Titling({
  variable: "--font-castoro-titling",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function RootLayout({ children }) {
    return (
      <html
      lang="en"
      className={`${Primary.variable} ${Secondary.variable}`}
    >
      <body >

        <Navbar/>

        {children}


      </body>
    </html>
    );
}
