import { ProviderContextLocal } from "@/data/contexts/local/context-local";

export default function Layout(props: any) {
  return <ProviderContextLocal>{props.children}</ProviderContextLocal>;
}
