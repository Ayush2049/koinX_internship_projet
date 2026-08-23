export interface GainDetails {
  balance: number;
  gain: number;
}

export interface HoldingApiResponse {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: GainDetails;
  ltcg: GainDetails;
}

export interface Holding extends HoldingApiResponse {
  id: string;
}

export interface GainCategory {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  stcg: GainCategory;
  ltcg: GainCategory;
}

export interface CapitalGainsResponse {
  capitalGains: CapitalGains;
}

export interface AfterHarvestingResult {
  stcg: GainCategory;
  ltcg: GainCategory;
  stcgNet: number;
  ltcgNet: number;
  realisedCapitalGains: number;
}
