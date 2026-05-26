import type { TSchema } from "./base-types.js";
import type { TTuple } from "./containers-types.js";
import type { TRest } from "./string-action-types.js";

export type UnionToIntersection<T> = (T extends unknown ? (value: T) => void : never) extends (
  value: infer I,
) => void
  ? I
  : never;

export type ExpandTupleRest<TItems extends TSchema[]> = TItems extends [
  infer Head extends TSchema,
  ...infer Tail extends TSchema[],
]
  ? Head extends TRest<infer Item extends TSchema>
    ? Item extends TTuple<infer RestItems>
      ? [...ExpandTupleRest<RestItems>, ...ExpandTupleRest<Tail>]
      : [Head, ...ExpandTupleRest<Tail>]
    : [Head, ...ExpandTupleRest<Tail>]
  : [];
