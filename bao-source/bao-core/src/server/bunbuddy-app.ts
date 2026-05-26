/**
 * BunBuddy application factory — first-party bao-core surface.
 *
 * Provides the canonical import path for the BunBuddy Elysia application
 * factory consumed by generated BunBuddy servers and bao ecosystem tooling.
 * Generated servers produced by the `.bao archive authoring` codegen import
 * from this path to decouple from the internal bunbuddy-shared package path.
 *
 * @packageDocumentation
 */

export type { BunBuddyAppOptions } from "@baohaus/bunbuddy-shared/base-app";
export { createBunBuddyApp } from "@baohaus/bunbuddy-shared/base-app";
