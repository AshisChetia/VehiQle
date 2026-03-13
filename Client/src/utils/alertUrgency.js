import { URGENCY, URGENCY_THRESHOLDS } from '../constants';

export function getAlertUrgency(kmRemaining) {
  if (kmRemaining <= URGENCY_THRESHOLDS.CRITICAL) return URGENCY.CRITICAL;
  if (kmRemaining <= URGENCY_THRESHOLDS.HIGH)     return URGENCY.HIGH;
  if (kmRemaining <= URGENCY_THRESHOLDS.MEDIUM)   return URGENCY.MEDIUM;
  return URGENCY.LOW;
}