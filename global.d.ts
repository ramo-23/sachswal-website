declare global {
  // Used by app/api/contact/route.ts for in-memory rate limiting and idempotency.
  var __contact_rate__: Map<string, any> | undefined;
  var __contact_cache__: Map<string, number> | undefined;
}

export {};
