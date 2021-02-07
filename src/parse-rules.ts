import ClashConf from "../types/clash";

export function parseRules(rules: string[]): ClashConf.ParsedRule[] {
  // remove empty rules
  return rules
    .filter((i) => i)
    .map((i) => {
      const [type, p1, p2, p3] = i.split(",");
      let parsedRule: ClashConf.ParsedRule;

      if (type === "MATCH") {
        parsedRule = {
          type: type as ClashConf.ParsedRule.Type,
          options: p1,
          target: p2,
        };
        if (p3 === "no-resolve") parsedRule["no-resolve"] = true;
      } else {
        parsedRule = {
          type: type as ClashConf.ParsedRule.Type,
          target: p1,
        };
        if (p2 === "no-resolve") parsedRule["no-resolve"] = true;
      }

      return parsedRule;
    });
}
