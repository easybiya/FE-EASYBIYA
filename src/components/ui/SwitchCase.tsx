type CaseFunction<Case> = (value: Case) => JSX.Element | null;

interface Props<Case extends string | number> {
  caseBy: Partial<Record<Case, JSX.Element | null>> | CaseFunction<Case>;
  value: Case;
  defaultComponent?: JSX.Element | null;
}

export function SwitchCase<Case extends string | number>({
  value,
  caseBy,
  defaultComponent: defaultComponent = null,
}: Props<Case>) {
  if (value == null) {
    return defaultComponent;
  }

  if (value === null || value === undefined) {
    return defaultComponent;
  }

  if (typeof caseBy === 'function') {
    return caseBy(value) ?? defaultComponent;
  }

  return caseBy[value] ?? defaultComponent;
}
