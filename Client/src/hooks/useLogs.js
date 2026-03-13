import { useState, useEffect } from 'react';
import { getLogs, addLog, deleteLog } from '../api/serviceLogApi';

export function useLogs(vehicleId) {
  const [logs,    setLogs   ] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    if (!vehicleId) return;
    setLoading(true);
    try   { setLogs(await getLogs(vehicleId)); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [vehicleId]);

  const add    = async (data) => { await addLog(data);    fetch(); };
  const remove = async (id)   => { await deleteLog(id);   fetch(); };

  return { logs, loading, add, remove };
}