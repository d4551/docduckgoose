# Context7 RPA Reference

> Use Context7 MCP tools to fetch up-to-date documentation when implementing RPA features.

## Workflow

1. **resolve-library-id** — Resolve package name to Context7 library ID (query + libraryName).
2. **query-docs** — Retrieve snippets (libraryId + query). Max 3 calls per question.

## Library Quick Reference

| Use Case | Library ID | Example Query |
|----------|------------|---------------|
| Android UiAutomator selectors | `/websites/developer_android` | "BySelector textContains descContains" |
| Android testing patterns | `/android/testing-samples` | "UiAutomator findObject BySelector resourceId text" |
| Android Appium / W3C | `/appium/appium-uiautomator2-driver` | "element location strategy id accessibilityId xpath" |
| Android UiAutomation hierarchy | `/websites/developer_android` | "UiAutomation getRootInActiveWindow bounds center click" |
| iOS go-ios / WDA | `/danielpaulus/go-ios` | "runwda WebDriverAgent REST API screenshot" |
| iOS Appium XCUITest | `/websites/appium_github_io_appium-xcuitest-driver` | "find element accessibility id tap" |

## When to Use

- Adding new FlowCommands or extending CommandTarget
- Implementing platform drivers (AndroidUiAutomatorDriver, IosXcTestDriver)
- Extending SelectorPriorityResolver with new BySelector variants
- Debugging element selection or hierarchy parsing
- Integrating go-ios or WebDriverAgent for iOS automation

## Related

- [.cursor/rules/context7-docs.mdc](../.cursor/rules/context7-docs.mdc) — Cursor rule for Context7 usage
- [.cursor/skills/bao-edge-automation/SKILL.md](../.cursor/skills/bao-edge-automation/SKILL.md) — Bao Edge automation skill
