"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  trackGithubClicked,
  trackLocaleChanged,
  trackShareEvent,
} from "@/lib/analytics/events";
import { Locale, useLocaleStore } from "@/lib/locale";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { locale, setLocale } = useLocaleStore();
  const { toast } = useToast();

  const onShareClicked = () => {
    copySitelinkToClipboard();
    trackShareEvent();
  };

  const copySitelinkToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = "quote-by-a-friend.aziznal.com";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    if (locale === "en")
      toast({
        title: "Site address copied to clipboard!",
        variant: "success",
      });

    if (locale === "tr")
      toast({
        title: "Site adresi panoya kopyalandı!",
        variant: "success",
      });

    if (locale === "de")
      toast({
        title: "Website-Adresse in die Zwischenablage kopiert!",
        variant: "success",
      });
  };

  const onChangeLocaleClicked = (newLocale: Locale) => {
    setLocale(newLocale);

    trackLocaleChanged({
      from: locale,
      to: newLocale,
    });
  };

  return (
    <main
      className="flex flex-col justify-center items-center min-h-[100vh] text-white py-24 px-12"
      style={{
        background:
          "linear-gradient(45deg, rgba(66,0,0,1) 0%, rgba(18,0,38,1) 57%, rgba(89,0,157,1) 100%)",
      }}
    >
      <div className="flex gap-3">
        <Button
          variant={locale === "en" ? "secondary" : "default"}
          onClick={() => onChangeLocaleClicked(Locale.EN)}
        >
          EN 🌎{" "}
        </Button>

        <Button
          variant={locale === "tr" ? "secondary" : "default"}
          onClick={() => onChangeLocaleClicked(Locale.TR)}
        >
          TR 🇹🇷
        </Button>

        <Button
          variant={locale === "de" ? "secondary" : "default"}
          onClick={() => onChangeLocaleClicked(Locale.DE)}
        >
          DE 🇩🇪{" "}
        </Button>
      </div>

      <div className="text-center font-bold mt-12">
        <h1 className="text-4xl lg:text-7xl rainbow-text">
          {locale === "en" &&
            "Don't deliver half-assed work that's not enough to continue nor useful to start over."}
          {locale === "tr" &&
            "Hiçbir şey vermemekle bir şey vermek arasında en iğrenç noktada iş teslim etme."}
          {locale === "de" &&
            "Mein Deutsch ist noch nicht genug um den Satz ueberzusetzen"}
        </h1>
      </div>

      <div
        className="mt-24 font-bold cursor-pointer active:text-blue-700 hover:text-blue-700 transition-all"
        onClick={onShareClicked}
      >
        {locale === "en" && <>Share the wisdom </>}
        {locale === "tr" && <>Hikmeti paylaş </>}
        {locale === "de" && <> Mittelien </>}
      </div>

      <Link
        className="mt-12 flex gap-2 items-center hover:text-blue-700 transition-all"
        href="https://github.com/aziznal/quote-by-a-friend"
        target="_blank"
        onClick={() => trackGithubClicked()}
      >
        <GithubIcon size={24} />
        <span className="text-sm font-bold">@aziznal</span>
      </Link>
    </main>
  );
}
