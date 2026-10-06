import { gql, queries } from "./api";

export type SiteStatistic = {
  key: string;
  label: string;
  value: number;
  suffix: string;
  updatedAt?: string;
};

export const DEFAULT_SITE_STATISTICS: SiteStatistic[] = [
  { key: "children_helped", label: "Children Helped", value: 1250, suffix: "+" },
  { key: "districts_reached", label: "Districts Reached", value: 12, suffix: "+" },
  { key: "widows_supported", label: "Widows Supported", value: 320, suffix: "+" },
  { key: "years_impact", label: "Years of Impact", value: 5, suffix: "+" },
  { key: "active_causes", label: "Active Causes", value: 6, suffix: "" },
  { key: "impact_percent", label: "Impact Figure", value: 100, suffix: "%" },
];

export function normalizeSiteStatistics(value: any): SiteStatistic[] {
  const incoming = Array.isArray(value) ? value : [];
  return DEFAULT_SITE_STATISTICS.map((fallback) => {
    const item = incoming.find((x: any) => x?.key === fallback.key);
    return {
      ...fallback,
      ...(item
        ? {
            label: item.label || fallback.label,
            value: Number.isFinite(Number(item.value)) ? Number(item.value) : fallback.value,
            suffix: typeof item.suffix === "string" ? item.suffix : fallback.suffix,
            updatedAt: item.updatedAt,
          }
        : {}),
    };
  });
}

export function formatStatisticValue(statistic: Pick<SiteStatistic, "value" | "suffix">) {
  return statistic.value.toLocaleString("en-US") + (statistic.suffix || "");
}

export function getStatistic(statistics: SiteStatistic[], key: string) {
  return statistics.find((item) => item.key === key) || DEFAULT_SITE_STATISTICS.find((item) => item.key === key)!;
}

export async function fetchSiteStatistics(): Promise<SiteStatistic[]> {
  const result = await gql<{ statistics: SiteStatistic[] }>(queries.statistics);
  return normalizeSiteStatistics(result.statistics);
}
