/**
 * Canonical Baobox schema symbols. Single source of truth for all
 * baobox modules.
 *
 * The four constants below are globally-registered symbols (via
 * `Symbol.for`) so that any module — including third-party TypeBox
 * libraries shipping their own copy of baobox — observes the same
 * runtime identity. Used as computed-property keys throughout the
 * baobox type system (e.g. `[Kind]: string` on TSchema, `schema[Kind]
 * === "Object"` at validators).
 *
 * Symbol names match the TypeBox convention so baobox schemas remain
 * structurally compatible with Elysia's TypeBox-aware route inference.
 */

const Kind: unique symbol = Symbol.for("TypeBox.Kind");
const Hint: unique symbol = Symbol.for("TypeBox.Hint");
const OptionalKind: unique symbol = Symbol.for("TypeBox.Optional");
const ReadonlyKind: unique symbol = Symbol.for("TypeBox.Readonly");

type KindType = typeof Kind;
type HintType = typeof Hint;
type OptionalKindType = typeof OptionalKind;
type ReadonlyKindType = typeof ReadonlyKind;

export type { HintType, KindType, OptionalKindType, ReadonlyKindType };
export { Hint, Kind, OptionalKind, ReadonlyKind };
