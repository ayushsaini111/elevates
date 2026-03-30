import "./globals.css";
import { Castoro_Titling, Geist, Antonio,Cinzel_Decorative,Geo } from "next/font/google";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Ayansh Elevating Lives",
  description:
    "From Land Purchase to Final Home. Seamlessly Delivered by One Group",
};

const Primary = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: "400",

});

const Secondary = Castoro_Titling({
  variable: "--font-castoro-titling",
  subsets: ["latin"],
  weight: "400",

});
const tertiary = Antonio({
  subsets: ["latin"],
  variable: "--font-antonio",
  weight: ["400", "500", "700"], // optional but recommended
});
const quaternary = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-cinzel_decorative",
   weight: ["400", "700", "900"], // optional but recommended
});
const polinary = Geo({
  subsets: ["latin"],
  variable: "--font-geo",
   weight: ["400"], // optional but recommended
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` ${Primary.variable} ${Secondary.variable} ${tertiary.variable} ${quaternary.variable} ${polinary.variable}`}
    >
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}