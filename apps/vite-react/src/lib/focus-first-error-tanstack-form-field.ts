type ErrorObj = Record<string, unknown>;

function isObject(v: unknown): v is ErrorObj {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

export function findFirstErrorName(errors: unknown): string | null {
  if (!errors) return null;

  if (typeof errors === "string") return "";

  if (Array.isArray(errors)) {
    for (let i = 0; i < errors.length; i++) {
      const child = errors[i];
      if (!child) continue;
      if (typeof child === "string") return String(i);
      const sub = findFirstErrorName(child);
      if (sub !== null) return sub ? `${i}.${sub}` : String(i);
    }
    return null;
  }

  if (isObject(errors)) {
    for (const key of Object.keys(errors)) {
      const child = errors[key];
      if (!child) continue;
      if (typeof child === "string") return key;
      const sub = findFirstErrorName(child);
      if (sub !== null) return sub ? `${key}.${sub}` : key;
    }
  }

  return null;
}

function focusEl(el: HTMLElement) {
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.focus?.();
  return true;
}

export function focusByFieldName(fieldName: string) {
  if (!fieldName) return false;

  // 1) native input류: name으로 바로 찾기
  const byName = document.querySelector<HTMLElement>(`[name="${fieldName}"]`);
  if (byName) return focusEl(byName);

  // 2) basecn FieldControl이 자동 주입한 data-field-name으로 찾기
  const byData = document.querySelector<HTMLElement>(`[data-field-name="${fieldName}"]`);
  if (byData) return focusEl(byData);

  // 3) fallback: aria-invalid=true 중에서 "가까운 포커스 가능 요소" 찾기
  const invalid = document.querySelector<HTMLElement>(`[aria-invalid="true"]`);
  if (invalid) return focusEl(invalid);

  return false;
}

export function focusFirstError(errors: unknown) {
  const name = findFirstErrorName(errors);
  if (!name) return false;
  return focusByFieldName(name);
}
