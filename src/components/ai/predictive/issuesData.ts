
// Possible network issues that can be detected during predictive analysis
export interface PredictedIssue {
  id: number;
  type: string;
  probability: number;
  timeFrame: 'hours' | 'days' | 'weeks' | 'month';
  confidence: 'low' | 'medium' | 'high';
}

// Collection of potential network issues that can be detected
export const possibleIssues: PredictedIssue[] = [
  {
    id: 1,
    type: 'bandwidthSaturation',
    probability: 0.75,
    timeFrame: 'days',
    confidence: 'medium',
  },
  {
    id: 2,
    type: 'securityVulnerability',
    probability: 0.89,
    timeFrame: 'hours',
    confidence: 'high',
  },
  {
    id: 3,
    type: 'deviceFailure',
    probability: 0.65,
    timeFrame: 'weeks',
    confidence: 'medium',
  },
  {
    id: 4,
    type: 'networkCongestion',
    probability: 0.55,
    timeFrame: 'days',
    confidence: 'low',
  },
  {
    id: 5,
    type: 'dnsFailure',
    probability: 0.80,
    timeFrame: 'month',
    confidence: 'medium',
  },
  {
    id: 6,
    type: 'wirelessInterference',
    probability: 0.72,
    timeFrame: 'days',
    confidence: 'high',
  }
];
