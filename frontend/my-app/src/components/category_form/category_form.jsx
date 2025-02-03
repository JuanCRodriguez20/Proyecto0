import React, { useState } from 'react';
import { X } from 'lucide-react';
import './__category_form.scss';

const CategoryForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="category-form-overlay">
      <div className="category-form">
        <div className="category-form__header">
          <h2 className="category-form__title">Nueva Categoría</h2>
          <button
            className="category-form__close"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="category-form__content">
          <div className="category-form__group">
            <label htmlFor="name" className="category-form__label">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="category-form__input"
              placeholder="Nombre de la categoría"
              required
            />
          </div>

          <div className="category-form__group">
            <label htmlFor="description" className="category-form__label">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="category-form__textarea"
              placeholder="Describe el propósito de esta categoría"
              rows={4}
            />
          </div>

          <div className="category-form__actions">
            <button
              type="button"
              className="category-form_button category-form_button--secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="category-form_button category-form_button--primary"
            >
              Crear Categoría
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;