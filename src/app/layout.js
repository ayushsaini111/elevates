import localFont from "next/font/local";
import { Castoro_Titling ,Geist} from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";

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
