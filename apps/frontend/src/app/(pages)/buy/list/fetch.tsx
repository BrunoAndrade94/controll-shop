import Page from "./page";

export default async function BuysPage() {
  const res = await fetch("http://localhost:4000/buys/get/all");
  const data = await res.json();

  return <Page buysData={data} />;
}
