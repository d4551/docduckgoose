/**
 * UI component validation for HTMX templates and partials.
 *
 * Provides validation for template structure, naming conventions, prop
 * definitions, accessibility compliance, and performance best practices. This
 * module helps enforce component standards and catch common issues during
 * development.
 *
 * @shared/validation/ui
 *
 * @remarks
 * This validator checks for:
 * - Component naming conventions (PascalCase)
 * - Prop naming conventions (camelCase) and type definitions
 * - Accessibility issues (alt text, labels, heading hierarchy)
 * - Performance concerns (inline styles, prop count)
 *
 * The validator returns warnings for best practice violations and errors for
 * critical issues that would prevent component functionality.
 *
 * @example Basic component validation
 * ```typescript
 * const component = {
 *   name: 'UserProfile',
 *   type: 'component',
 *   props: {
 *     userId: { type: String, required: true },
 *     showAvatar: { type: Boolean, default: true }
 *   },
 *   template: '<div><img alt="User avatar" /></div>'
 * };
 *
 * const log = createLogger('ui-validation');
 * const result = await validateUI(component);
 * if (!result.valid) {
 *   log.error('Validation errors:', result.errors);
 * }
 * if (result.warnings.length > 0) {
 *   log.warn('Best practice warnings:', result.warnings);
 * }
 * ```
 *
 * @example Accessibility-focused validation
 * ```typescript
 * const result = await validateUI(componentData, {
 *   checkAccessibility: true,
 *   checkPerformance: false
 * });
 * ```
 */

import type {
  ValidationError,
  ValidationResult,
  ValidationWarning,
} from "@baohaus/bao-types/validation";
import { createLogger } from "../logger/browser";

const PASCAL_CASE_RE: RegExp = /^[A-Z][a-zA-Z0-9]*$/;
const CAMEL_CASE_RE: RegExp = /^[a-z][a-zA-Z0-9]*$/;
const MAX_COMPONENT_PROPS = 20;

const logger: ReturnType<typeof createLogger> = createLogger("UIValidator");

/**
 * Options for configuring UI validation behavior.
 *
 * ValidationOptions
 * {boolean} [checkAccessibility=true] - Enable accessibility validation checks
 * {boolean} [checkPerformance=true] - Enable performance best practice checks
 */
interface UiValidationOptions {
  checkAccessibility?: boolean;
  checkPerformance?: boolean;
}

/**
 * Template component data structure for validation.
 *
 * ComponentData
 * {string} [name] - Component name (should be PascalCase)
 * {string} [type] - Component type identifier
 * {Record<string, unknown>} [props] - Component props definition
 * {string} [template] - Component template HTML string
 */
interface ComponentData {
  name?: string;
  type?: string;
  props?: Record<string, unknown>;
  template?: string;
}

/**
 * UI validation result structure.
 *
 * ValidationResult
 * {boolean} valid - Whether validation passed without errors
 * {ValidationError[]} errors - Array of critical validation errors
 * {ValidationWarning[]} warnings - Array of best practice warnings
 * {Object} [data] - Additional validation metadata
 * {string} data.componentType - Detected component type
 * {boolean} data.hasProps - Whether component defines props
 * {number} data.propCount - Number of props defined
 */
type UiValidationData = { componentType: string; hasProps: boolean; propCount: number };

/**
 * Validates UI component structure, naming, props, and best practices.
 *
 * @param componentData - Component data object to validate
 * @param [options] - Validation configuration options
 * @returns Validation result with errors and warnings
 *
 * @description
 * Performs comprehensive validation of template component definitions including:
 *
 * 1. Structural validation:
 *    - Component data is a valid object
 *    - Required fields are present and properly typed
 *
 * 2. Naming convention validation:
 *    - Component name uses PascalCase (e.g., UserProfile, not userProfile)
 *    - Prop names use camelCase (e.g., userId, not user_id)
 *
 * 3. Props validation:
 *    - Props have type definitions
 *    - Prop names follow naming conventions
 *
 * 4. Accessibility checks (when enabled):
 *    - Images have alt attributes
 *    - Form inputs have associated labels
 *    - Heading hierarchy is logical (h1, h2, h3 in order)
 *
 * 5. Performance checks (when enabled):
 *    - Component doesn't have excessive props (>20)
 *    - Templates avoid inline styles
 *
 * @example Component naming validation
 * ```typescript
 * // Invalid: lowercase name
 * await validateUI({ name: 'userCard' });
 * // Returns: { valid: false, errors: [{ code: 'INVALID_COMPONENT_NAME', ... }] }
 *
 * // Valid: PascalCase name
 * await validateUI({ name: 'UserCard' });
 * // Returns: { valid: true, errors: [], warnings: [] }
 * ```
 *
 * @example Props validation
 * ```typescript
 * const component = {
 *   name: 'UserProfile',
 *   props: {
 *     user_id: { type: String }, // Warning: should be camelCase
 *     userName: String            // Warning: missing type definition object
 *   }
 * };
 *
 * const result = await validateUI(component);
 * // result.warnings includes camelCase and type definition suggestions
 * ```
 *
 * @example Accessibility validation
 * ```typescript
 * const component = {
 *   name: 'ImageGallery',
 *   template: '<div><img src="photo.jpg" /></div>'
 * };
 *
 * const result = await validateUI(component, { checkAccessibility: true });
 * // result.warnings includes missing alt text suggestion
 * ```
 */

/**
 * Runtime guard for ComponentData shape.
 *
 * Verifies the value is a non-null object, which is sufficient for the
 * optional-property ComponentData interface.
 *
 * @param value - Candidate value.
 * @returns True when value conforms to ComponentData.
 */
function isComponentData(value: unknown): value is ComponentData {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Validate that the component name follows PascalCase convention.
 *
 * @param component - Component data to validate
 * @param errors - Mutable errors array to append to
 */
function validateComponentName(component: ComponentData, errors: ValidationError[]): void {
  if (component.name && !PASCAL_CASE_RE.test(component.name)) {
    errors.push({
      field: "name",
      message: "Component name should be PascalCase",
      code: "INVALID_COMPONENT_NAME",
    });
  }
}

/**
 * Validate component props for naming conventions and type definitions.
 *
 * @param component - Component data to validate
 * @param errors - Mutable errors array to append to
 * @param warnings - Mutable warnings array to append to
 */
function validateComponentProps(
  component: ComponentData,
  _errors: ValidationError[],
  warnings: ValidationWarning[],
): void {
  if (!component.props) {
    return;
  }
  for (const [propertyName, propDef] of Object.entries(component.props)) {
    if (!CAMEL_CASE_RE.test(propertyName)) {
      warnings.push({
        field: `props.${propertyName}`,
        message: "Prop names should be camelCase",
        suggestion: "Use camelCase for prop names",
      });
    }
    if (typeof propDef === "object" && propDef !== null && !("type" in propDef)) {
      warnings.push({
        field: `props.${propertyName}`,
        message: "Props should specify a type",
        suggestion: "Add type definition to prop",
      });
    }
  }
}

function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (error === null || error === undefined) {
    return "Unknown error";
  }
  return String(error);
}

function captureResult<T>(
  operation: () => T | Promise<T>,
): Promise<{ ok: true; value: T } | { ok: false; error: unknown }> {
  return Promise.resolve()
    .then(operation)
    .then(
      (value) => ({ ok: true as const, value }),
      (error) => ({ ok: false as const, error }),
    );
}
/**
 * Validate a template component payload for structure, conventions, accessibility, and
 * performance guidance, returning a deterministic result envelope.
 *
 * @param componentData - Component-like payload to validate.
 * @param options - Validation options controlling optional rule groups.
 * @returns Validation result envelope with errors, warnings, and metadata.
 */
export async function validateUI(
  componentData: unknown,
  options: UiValidationOptions = {},
): Promise<ValidationResult<UiValidationData>> {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  const result = await captureResult(() => {
    if (!isComponentData(componentData)) {
      errors.push({
        message: "Component data must be an object",
        code: "INVALID_COMPONENT_DATA",
      });
      return {
        valid: false,
        errors,
        warnings,
        data: { componentType: "component", hasProps: false, propCount: 0 },
      };
    }

    const component: ComponentData = componentData;

    validateComponentName(component, errors);
    validateComponentProps(component, errors, warnings);

    // Check for accessibility issues
    if (options.checkAccessibility !== false) {
      const accessibilityIssues = checkAccessibility(component);
      warnings.push(...accessibilityIssues);
    }

    // Check for performance issues
    if (options.checkPerformance !== false) {
      const performanceIssues = checkPerformance(component);
      warnings.push(...performanceIssues);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      data: {
        componentType: component.type ?? "component",
        hasProps: Boolean(component.props),
        propCount: component.props ? Object.keys(component.props).length : 0,
      },
    };
  });

  if (!result.ok) {
    const message = formatErrorMessage(result.error);
    logger.error("UI validation error", { error: message });
    return {
      valid: false,
      errors: [
        {
          message,
          code: "VALIDATION_ERROR",
        },
      ],
      warnings: [],
    };
  }
  return result.value;
}

/**
 * Checks component template for common accessibility violations.
 *
 * @param componentData - Component data with template to analyze
 * @returns Array of accessibility warnings with suggestions
 *
 * @description
 * Performs static analysis of component template HTML to detect common
 * accessibility issues including:
 *
 * - Images without alt text: All <img> elements should have alt attributes
 * - Form inputs without labels: Input elements should have associated label elements
 * - Improper heading hierarchy: Headings should follow logical order (h1, h2, h3, etc.)
 *
 * This is a basic string-based analysis and may produce false positives if
 * templates use dynamic attribute binding or conditional rendering. For
 * comprehensive accessibility testing, use dedicated tools like axe-core.
 *
 * @example
 * ```typescript
 * const warnings = checkAccessibility({
 *   template: '<div><img src="photo.jpg" /><input type="text" /></div>'
 * });
 * // Returns warnings for missing alt text and missing label
 * ```
 */
function checkAccessibility(componentData: ComponentData): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  // Check for missing alt text on images
  if (componentData.template) {
    const template = componentData.template.toLowerCase();
    if (template.includes("<img") && !template.includes("alt=")) {
      warnings.push({
        message: "Images should have alt text for accessibility",
        suggestion: "Add alt attributes to img elements",
      });
    }

    // Check for missing labels on form elements
    if (template.includes("<input") && !template.includes("label")) {
      warnings.push({
        message: "Form inputs should have associated labels",
        suggestion: "Add labels or aria-labels to form elements",
      });
    }

    // Check for proper heading hierarchy
    const headingMatches = template.match(/<h([1-6])/g);
    if (headingMatches && headingMatches.length > 1) {
      const levels = headingMatches
        .map((h) => {
          const digit = h[2];
          return digit ? parseInt(digit, 10) : null;
        })
        .filter((level): level is number => typeof level === "number" && Number.isFinite(level));
      const sorted = [...levels].sort((a, b) => a - b);
      if (JSON.stringify(levels) !== JSON.stringify(sorted)) {
        warnings.push({
          message: "Heading levels should follow proper hierarchy",
          suggestion: "Use h1, h2, h3, etc. in logical order",
        });
      }
    }
  }

  return warnings;
}

/**
 * Checks component definition for common performance anti-patterns.
 *
 * @param componentData - Component data to analyze
 * @returns Array of performance warnings with optimization suggestions
 *
 * @description
 * Analyzes component structure and template for performance concerns including:
 *
 * - Excessive props (>20): Components with many props are harder to maintain
 *   and may indicate need for refactoring into smaller components or using
 *   composition patterns
 *
 * - Inline styles: Inline styles prevent CSS optimization and should be
 *   replaced with CSS classes for better performance and maintainability
 *
 * These checks identify potential performance issues but require developer
 * judgment to determine if they apply to the specific use case.
 *
 * @example
 * ```typescript
 * const warnings = checkPerformance({
 *   // Imagine a component with many props (e.g. 25+)
 *   props: { propA: true, propB: false } as Record<string, unknown>,
 *   template: '<div style="color: red">Content</div>'
 * });
 * // Returns warnings for prop count and inline styles
 * ```
 */
function checkPerformance(componentData: ComponentData): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  // Check for large number of props
  if (componentData.props && Object.keys(componentData.props).length > MAX_COMPONENT_PROPS) {
    warnings.push({
      message: "Component has many props, consider refactoring",
      suggestion: "Group related props into objects or use composition",
    });
  }

  // Check for inline styles in template
  if (componentData.template?.includes("style=")) {
    warnings.push({
      message: "Inline styles detected in template",
      suggestion: "Use CSS classes instead of inline styles",
    });
  }

  return warnings;
}
