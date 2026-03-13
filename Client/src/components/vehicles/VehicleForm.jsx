import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

const EMPTY = { make: '', model: '', year: '', currentMileage: '', licensePlate: '' };

export default function VehicleForm({ isOpen, onClose, onSubmit, initialData = null }) {
  const [form,    setForm   ] = useState(EMPTY);
  const [errors,  setErrors ] = useState({});
  const [loading, setLoading] = useState(false);
  const isEdit = !!initialData;

  useEffect(() => {
    if (isOpen) {
      setForm(initialData ?? EMPTY);
      setErrors({});
    }
  }, [isOpen, initialData]);

  const field = (key) => (e) => {
    setForm(p => ({ ...p, [key]: e.target.value }));
    setErrors(p => ({ ...p, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.make.trim())    e.make  = 'Make is required';
    if (!form.model.trim())   e.model = 'Model is required';
    const yr = Number(form.year);
    if (!yr || yr < 1900 || yr > new Date().getFullYear() + 2)
                              e.year  = 'Enter a valid year (e.g. 2020)';
    if (!form.currentMileage || Number(form.currentMileage) < 0)
                              e.currentMileage = 'Enter a valid mileage';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await onSubmit({
        ...form,
        year:            Number(form.year),
        currentMileage:  Number(form.currentMileage),
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Vehicle' : 'Add a Vehicle'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-1">

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Make" id="v-make" placeholder="Toyota"
            value={form.make} onChange={field('make')}
            required error={errors.make}
          />
          <Input
            label="Model" id="v-model" placeholder="Camry"
            value={form.model} onChange={field('model')}
            required error={errors.model}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Year" id="v-year" type="number" placeholder="2021"
            value={form.year} onChange={field('year')}
            required error={errors.year}
          />
          <Input
            label="Mileage (km)" id="v-mileage" type="number" placeholder="45000"
            value={form.currentMileage} onChange={field('currentMileage')}
            required error={errors.currentMileage}
          />
        </div>

        <Input
          label="License Plate" id="v-plate" placeholder="e.g. ABC-1234"
          value={form.licensePlate} onChange={field('licensePlate')}
          hint="Optional — used for display only"
        />

        <div className="flex gap-3 pt-3">
          <Button type="button" variant="outline" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button type="submit" loading={loading} fullWidth>
            {isEdit ? 'Save Changes' : 'Add Vehicle'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}