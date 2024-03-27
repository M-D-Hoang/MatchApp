import { useTranslation } from "react-i18next";
export function MissingPage(){
  const [t, i18n] = useTranslation("global");
  return(<h1>{t("404.404")}:</h1>)
}