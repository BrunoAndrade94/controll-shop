import { useCallback } from "react";

const urlBase = process.env.NEXT_PUBLIC_API_URL;

function getUri(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function getUrl(uri: string): string {
  return `${urlBase}${uri}`;
}

export default function useApi() {
  const httpGet = useCallback(async function (path: string) {
    const uri = getUri(path);
    const url = getUrl(uri);

    const response = await fetch(url);
    return extractData(response);
  }, []);

  const httpPost = useCallback(async function (path: string, body?: any) {
    const uri = getUri(path);
    const url = getUrl(uri);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });
    return extractData(response);
  }, []);

  async function extractData(response: Response) {
    let content: any;
    try {
      content = await response.json();
    } catch (error) {
      if (!response.ok) {
        throw new Error(
          `Ocorreu um erro inesperado com status ${response.status}.`
        );
      }
      return null;
    }
    if (!response.ok) throw content;
    return content;
  }

  return {
    httpGet,
    httpPost,
  };
}
