// lib/tenant.js

import { headers } from "next/headers";

const DEFAULT_API = process.env.NEXT_PUBLIC_DEFAULT_API;
const DEFAULT_STORAGE = process.env.NEXT_PUBLIC_IMAGE_URL;

export async function getTenantConfig() {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  let tenant = "dusol";

  if (
    !host.startsWith("localhost") &&
    !host.startsWith("127.0.0.1")
  ) {
    tenant = host.split(".")[0];
  }

  return {
    tenant,
    apiUrl:
      host.startsWith("localhost") || host.startsWith("127.0.0.1")
        ? DEFAULT_API
        : `https://${tenant}.distanceeducationlearning.com/api/v1`,
    storageUrl:
      host.startsWith("localhost") || host.startsWith("127.0.0.1")
        ? DEFAULT_STORAGE
        : `https://${tenant}.distanceeducationlearning.com/storage`,
  };
}