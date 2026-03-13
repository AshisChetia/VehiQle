export const APP_NAME = 'VehiQle';

export const ROUTES = {
  HOME:           '/',
  LOGIN:          '/login',
  REGISTER:       '/register',
  DASHBOARD:      '/dashboard',
  VEHICLES:       '/vehicles',
  VEHICLE_DETAIL: '/vehicles/:id',
  CHAT:           '/chat',
  NOT_FOUND:      '*',
};

export const URGENCY = {
  CRITICAL: 'critical',
  HIGH:     'high',
  MEDIUM:   'medium',
  LOW:      'low',
};

export const URGENCY_THRESHOLDS = {
  CRITICAL: 500,
  HIGH:     1500,
  MEDIUM:   3000,
};

export const SERVICE_TYPES = [
  'Oil Change', 'Brake Service', 'Tire Rotation', 'Air Filter',
  'Spark Plugs', 'Battery', 'Transmission', 'Coolant Flush',
  'Wheel Alignment', 'AC Service', 'Other',
];

export const SUGGESTED_PROMPTS = [
  'Why is my check engine light on?',
  'When should I change my brake pads?',
  'How often should I rotate my tires?',
  'What does a transmission flush include?',
];