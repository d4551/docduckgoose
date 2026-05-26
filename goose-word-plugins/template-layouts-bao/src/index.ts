import type { LocaleCode } from "../../../goose-word/src/i18n/runtime.ts";

export interface DocumentTemplateRegistration {
  readonly id: string;
  readonly extensionId: string;
  readonly labelKey: string;
  readonly descriptionKey?: string;
  getInitialContent: (locale: LocaleCode) => {
    title?: string;
    body: string;
    draftStyle?: string;
  };
}

const templates: DocumentTemplateRegistration[] = [
  {
    id: "template-layouts-bao:us-letter",
    extensionId: "template-layouts-bao",
    labelKey: "template.usLetter",
    descriptionKey: "template.usLetter.desc",
    getInitialContent(locale) {
      const title = locale === "zh-Hans" ? "正式信函" : "Formal Letter";
      const body = [
        "[Your Name]",
        "[Your Address]",
        "[City, State ZIP]",
        "",
        "[Date]",
        "",
        "[Recipient Name]",
        "[Recipient Title]",
        "[Company/Organization]",
        "[Address]",
        "",
        "Dear [Recipient],",
        "",
        "I am writing to...",
        "",
        "Sincerely,",
        "",
        "[Your Name]",
      ].join("\n");
      return { title, body, draftStyle: "letter" };
    },
  },
  {
    id: "template-layouts-bao:manuscript",
    extensionId: "template-layouts-bao",
    labelKey: "template.manuscript",
    descriptionKey: "template.manuscript.desc",
    getInitialContent(locale) {
      const title = locale === "zh-Hans" ? "手稿草稿" : "Manuscript Draft";
      const body = "# Chapter 1\n\nThe opening scene unfolds...\n\n";
      return { title, body, draftStyle: "manuscript" };
    },
  },
  {
    id: "template-layouts-bao:meeting-notes",
    extensionId: "template-layouts-bao",
    labelKey: "template.meetingNotes",
    descriptionKey: "template.meetingNotes.desc",
    getInitialContent(locale) {
      const title = locale === "zh-Hans" ? "会议纪要" : "Meeting Notes";
      const body = [
        "## Attendees",
        "- ",
        "",
        "## Agenda",
        "1. ",
        "",
        "## Decisions",
        "- ",
        "",
        "## Action Items",
        "- [ ]  ",
      ].join("\n");
      return { title, body, draftStyle: "notes" };
    },
  },
];

const plugin = {
  createDocumentTemplateRegistrations() {
    return templates;
  },
};

export default plugin;
