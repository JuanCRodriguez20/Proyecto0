import React, { useState } from 'react';
import { Plus, Home, Briefcase, AlertCircle, User, PlusCircle } from 'lucide-react';
import TaskForm from '../task_form/task_form';
import CategoryForm from '../category_form/category_form';
import './__sidebar.scss';

const Sidebar = () => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);
  
  const [categories, setCategories] = useState([
    { id: 'hogar', name: 'Hogar', IconComponent: Home },
    { id: 'trabajo', name: 'Trabajo', IconComponent: Briefcase },
    { id: 'urgente', name: 'Urgente', IconComponent: AlertCircle },
    { id: 'personal', name: 'Personal', IconComponent: User }
  ]);

  const statuses = [
    { id: 'sin_empezar', name: 'Sin Empezar', color: '#FEF3C7' },
    { id: 'empezada', name: 'Empezada', color: '#DBEAFE' },
    { id: 'finalizada', name: 'Finalizada', color: '#DEF7EC' }
  ];

  const handleAddCategory = (categoryData) => {
    const newCategory = {
      id: categoryData.name.toLowerCase().replace(/\s+/g, '_'),
      name: categoryData.name,
      IconComponent: User
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const handleStatusClick = (statusId) => {
    setActiveStatus(activeStatus === statusId ? null : statusId);
  };

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar__container">
          <button 
            className="sidebar__new-task"
            onClick={() => setIsTaskFormOpen(true)}
            type="button"
          >
            <Plus size={20} />
            <span>Nueva Tarea</span>
          </button>

          <section className="sidebar__section">
            <div className="sidebar__section-header">
              <h3 className="sidebar__section-title">Categorías</h3>
              <button 
                className="sidebar__add-button"
                onClick={() => setIsCategoryFormOpen(true)}
                type="button"
                aria-label="Añadir categoría"
              >
                <PlusCircle size={16} />
              </button>
            </div>
            <div className="sidebar__section-list">
              {categories.map(({ id, name, IconComponent }) => (
                <button
                  key={id}
                  className={`sidebar__section-item ${
                    activeCategory === id ? 'sidebar__section-item--active' : ''
                  }`}
                  onClick={() => handleCategoryClick(id)}
                  type="button"
                >
                  <IconComponent size={18} />
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="sidebar__section">
            <h3 className="sidebar__section-title">Estados</h3>
            <div className="sidebar__section-list">
              {statuses.map(({ id, name, color }) => (
                <button
                  key={id}
                  className={`sidebar__section-item ${
                    activeStatus === id ? 'sidebar__section-item--active' : ''
                  }`}
                  onClick={() => handleStatusClick(id)}
                  type="button"
                >
                  <span 
                    className="sidebar__status-dot"
                    style={{ backgroundColor: color }}
                  />
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </aside>

      {isTaskFormOpen && (
        <TaskForm 
          isEditing={true}
          task={null}
          onClose={() => setIsTaskFormOpen(false)}
        />
      )}

      {isCategoryFormOpen && (
        <CategoryForm 
          onClose={() => setIsCategoryFormOpen(false)}
          onSubmit={handleAddCategory}
        />
      )}
    </>
  );
};

export default Sidebar;