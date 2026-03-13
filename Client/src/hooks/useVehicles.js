import { useState, useEffect } from 'react';
import { getVehicles, addVehicle, updateVehicle, deleteVehicle } from '../api/vehicleApi';

export function useVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading,  setLoading ] = useState(true);
  const [error,    setError   ] = useState(null);

  const fetch = async () => {
    setLoading(true);
    try   { setVehicles(await getVehicles()); }
    catch (e) { setError(e.message); }
    finally   { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const add    = async (data)      => { await addVehicle(data);        fetch(); };
  const update = async (id, data)  => { await updateVehicle(id, data); fetch(); };
  const remove = async (id)        => { await deleteVehicle(id);       fetch(); };

  return { vehicles, loading, error, add, update, remove, refetch: fetch };
}