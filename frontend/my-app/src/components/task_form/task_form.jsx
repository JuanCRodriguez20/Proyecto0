import React, { useState, useEffect } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';
import './__task_form.scss';
import Task from '../../services/tasks';

const TaskForm = ({ isEditing = false, task = null, onClose }) => {
  const [formData, setFormData] = useState({
    text_task: '',
    category_id: 1,
    state: 1,
    user_id: 1,
    end_date: ''
  });

  const taskService = new Task();

  const categories = [
    { id: 1, name: 'Hogar' },
    { id: 2, name: 'Trabajo' },
    { id: 3, name: 'Urgente' },
    { id: 4, name: 'Personal' }
  ];

  const statuses = [
    { id: 1, name: 'Sin Empezar' },
    { id: 2, name: 'En Curso' },
    { id: 3, name: 'Finalizada' }
  ];

  useEffect(() => {
    console.log('form data', formData);
  }, [isEditing, formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    taskService.createTask(formData);
    onClose();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="task-form-overlay" onClick={handleOverlayClick}>
      <div className="task-form" onClick={e => e.stopPropagation()}>
        <div className="task-form__header">
          <h2 className="task-form__title">
            {isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
          </h2>
          <button
            className="task-form__close"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form__content">
          <div className="task-form__group">
            <label htmlFor="text_task" className="task-form__label">Descripción de la Tarea</label>
            <input
              type="text"
              id="text_task"
              name="text_task"
              value={formData.text_task}
              onChange={handleInputChange}
              className="task-form__input"
              placeholder="Ingresa la tarea"
              required
            />
          </div>

          <div className="task-form__row">
            <div className="task-form__group">
              <label htmlFor="category_id" className="task-form__label">
                <div className="task-form__label-content">
                  <span>Categoría</span>
                </div>
              </label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className="task-form__select"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="task-form__group">
              <label htmlFor="state" className="task-form__label">Estado</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="task-form__select"
              >
                {statuses.map(state => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="task-form__row">
            <div className="task-form__group">
              <label htmlFor="end_date" className="task-form__label">
                <div className="task-form__label-content">
                  <Calendar size={16} />
                  <span>Fecha de vencimiento</span>
                </div>
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                className="task-form__input"
              />
            </div>
          </div>

          <div className="task-form__actions">
            <button
              type="button"
              className="task-form_button task-form_button--secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="task-form_button task-form_button--primary"
              onClick={handleSubmit}
            >
              {isEditing ? 'Guardar Cambios' : 'Crear Tarea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;