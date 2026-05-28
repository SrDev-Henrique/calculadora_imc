import {
  type ImcFormValues,
  imcFormSchema,
  WIZARD_STEPS,
} from "@/lib/imc/schema";

export const IMC_SESSION_STORAGE_KEY = "imc-calculator-session";

const SESSION_VERSION = 1 as const;

export type ImcSessionState = {
  version: typeof SESSION_VERSION;
  formValues: ImcFormValues;
  stepIndex: number;
  showResults: boolean;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function loadImcSession(): ImcSessionState | null {
  if (!isBrowser()) return null;

  try {
    const raw = sessionStorage.getItem(IMC_SESSION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as ImcSessionState;
    if (parsed.version !== SESSION_VERSION) return null;

    const form = imcFormSchema.safeParse(parsed.formValues);
    if (!form.success) return null;

    const stepIndex = Number(parsed.stepIndex);
    if (
      !Number.isInteger(stepIndex) ||
      stepIndex < 0 ||
      stepIndex >= WIZARD_STEPS.length
    ) {
      return null;
    }

    return {
      version: SESSION_VERSION,
      formValues: form.data,
      stepIndex,
      showResults: Boolean(parsed.showResults),
    };
  } catch {
    return null;
  }
}

export function saveImcSession(state: Omit<ImcSessionState, "version">): void {
  if (!isBrowser()) return;

  try {
    const payload: ImcSessionState = { version: SESSION_VERSION, ...state };
    sessionStorage.setItem(IMC_SESSION_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // quota exceeded or private mode — ignore
  }
}

export function clearImcSession(): void {
  if (!isBrowser()) return;
  sessionStorage.removeItem(IMC_SESSION_STORAGE_KEY);
}
