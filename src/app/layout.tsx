import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DottedMap } from "@/components/ui/dotted-map";
import type { Marker } from "@/components/ui/dotted-map";

type CountryMarker = Marker & {
  overlay: {
    countryCode: string;
    label: string;
  };
};

const SINGAPORE_MARKER: CountryMarker = {
  lat: 1.3521,
  lng: 103.8198,
  size: 1.5,
  pulse: true,
  overlay: { countryCode: "sg", label: "Singapore" },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
              <div className="flex h-full w-[200%] -translate-x-[3.47%] md:-translate-x-[14.36%]">
                {[0, 1].map((copy) => (
                  <DottedMap<CountryMarker>
                    key={copy}
                    className="h-full shrink-0 text-muted-foreground/50"
                    viewBox="0 33 150 19"
                    preserveAspectRatio="xMaxYMid slice"
                    markers={[SINGAPORE_MARKER]}
                    markerColor="#FF6900"
                    renderMarkerOverlay={({ marker, x, y, r, index }) => {
                      const { countryCode, label } = marker.overlay;
                      const href = `https://flagcdn.com/w80/${countryCode}.webp`;
                      const clipId = `sg-flag-clip-${copy}-${index}`;
                      const imgR = r * 0.75;
                      const fontSize = r * 0.9;
                      const pillH = r * 1.5;
                      const pillW = label.length * (fontSize * 0.62) + r * 1.4;
                      const pillX = x + r + r * 0.6;
                      const pillY = y - pillH / 2;

                      return (
                        <g style={{ pointerEvents: "none" }}>
                          <clipPath id={clipId}>
                            <circle cx={x} cy={y} r={imgR} />
                          </clipPath>
                          <image
                            href={href}
                            x={x - imgR}
                            y={y - imgR}
                            width={imgR * 2}
                            height={imgR * 2}
                            preserveAspectRatio="xMinYMid slice"
                            clipPath={`url(#${clipId})`}
                          />
                          <rect
                            x={pillX}
                            y={pillY}
                            width={pillW}
                            height={pillH}
                            rx={pillH / 2}
                            fill="rgba(0,0,0,0.55)"
                          />
                          <text
                            x={pillX + r * 0.7}
                            y={y + fontSize * 0.35}
                            fontSize={fontSize}
                            fill="white"
                          >
                            {label}
                          </text>
                        </g>
                      );
                    }}
                    style={{
                      width: "50%",
                      height: "100%",
                      maskImage:
                        "linear-gradient(to bottom, black, black 60%, transparent)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, black, black 60%, transparent)",
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
              {children}
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
