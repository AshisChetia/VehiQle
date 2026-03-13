import { useState, useEffect } from 'react';
import { getAlerts, completeAlert, snoozeAlert } from '../api/alertApi';

export function useAlerts() {
  const [alerts,  setAlerts ] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try   { setAlerts(await getAlerts()); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const complete = async (id) => { await completeAlert(id); fetch(); };
  const snooze   = async (id) => { await snoozeAlert(id);   fetch(); };

  return { alerts, loading, complete, snooze };
}