
/**
 * أنواع المشاكل المحتملة التي يمكن اكتشافها خلال التحليل التنبؤي للشبكة
 */
export interface PredictedIssue {
  /** المعرف الفريد للمشكلة */
  id: number;
  /** نوع المشكلة - يستخدم للترجمة وتحديد المشكلة */
  type: string;
  /** نسبة احتمال حدوث المشكلة (0-1) */
  probability: number;
  /** الإطار الزمني المتوقع لحدوث المشكلة */
  timeFrame: 'hours' | 'days' | 'weeks' | 'month';
  /** مستوى الثقة في التوقع */
  confidence: 'low' | 'medium' | 'high';
  /** تاريخ اكتشاف المشكلة - يتم ملؤه تلقائيًا عند الاكتشاف */
  detectedAt?: Date;
}

/**
 * فئات المشاكل الشبكية المحتملة
 */
export enum IssueType {
  BANDWIDTH = 'bandwidthSaturation',
  SECURITY = 'securityVulnerability',
  DEVICE = 'deviceFailure',
  CONGESTION = 'networkCongestion',
  DNS = 'dnsFailure',
  WIRELESS = 'wirelessInterference',
}

/**
 * قائمة بالمشاكل الشبكية المحتملة التي يمكن اكتشافها
 * كل مشكلة لها معرف فريد ونوع واحتمالية وإطار زمني ومستوى ثقة
 */
export const possibleIssues: PredictedIssue[] = [
  {
    id: 1,
    type: IssueType.BANDWIDTH,
    probability: 0.75,
    timeFrame: 'days',
    confidence: 'medium',
  },
  {
    id: 2,
    type: IssueType.SECURITY,
    probability: 0.89,
    timeFrame: 'hours',
    confidence: 'high',
  },
  {
    id: 3,
    type: IssueType.DEVICE,
    probability: 0.65,
    timeFrame: 'weeks',
    confidence: 'medium',
  },
  {
    id: 4,
    type: IssueType.CONGESTION,
    probability: 0.55,
    timeFrame: 'days',
    confidence: 'low',
  },
  {
    id: 5,
    type: IssueType.DNS,
    probability: 0.80,
    timeFrame: 'month',
    confidence: 'medium',
  },
  {
    id: 6,
    type: IssueType.WIRELESS,
    probability: 0.72,
    timeFrame: 'days',
    confidence: 'high',
  }
];

/**
 * الحصول على مشكلة محددة حسب المعرف
 * @param id معرف المشكلة
 * @returns المشكلة إذا وجدت، وإلا null
 */
export function getIssueById(id: number): PredictedIssue | undefined {
  return possibleIssues.find(issue => issue.id === id);
}

/**
 * تصنيف خطورة المشكلة بناءً على الاحتمالية ومستوى الثقة
 * @param issue المشكلة المراد تصنيفها
 * @returns تصنيف الخطورة: high, medium, low
 */
export function getIssueSeverity(issue: PredictedIssue): 'high' | 'medium' | 'low' {
  if (issue.probability > 0.8 && issue.confidence === 'high') {
    return 'high';
  } else if (issue.probability > 0.6 || issue.confidence === 'high') {
    return 'medium';
  } else {
    return 'low';
  }
}
