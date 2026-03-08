// src/libs/microcms.ts
import { createClient } from "microcms-js-sdk";

const client = createClient({
    serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: import.meta.env.MICROCMS_API_KEY,
});

export default client;
