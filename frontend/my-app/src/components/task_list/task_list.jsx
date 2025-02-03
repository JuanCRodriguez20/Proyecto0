import React, { useState } from 'react';
import { MoreVertical, Calendar, Clock } from 'lucide-react';
import './__task_list.scss';

const TaskList = ({ onEditTask }) => {
  const [tasks] = useState([
    {
      id: 1,
      title: 'Actualizar documentación del proyecto',
      description: 'Revisar y actualizar la documentación técnica del proyecto actual',
      category: 'Trabajo',
      status: 'Sin Empezar',
      createdAt: '2025-02-01',
      dueDate: '2025-02-15',
      priority: 'Alta'
    },
    {
      id: 2,
      title: 'Comprar víveres semanales',
      description: 'Hacer la compra semanal de productos básicos',
      category: 'Hogar',
      status: 'Empezada',
      createdAt: '2025-02-01',
      dueDate: '2025-02-02',
      priority: 'Media'
    }
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusStyle = (status) => {
    const styles = {
      'Sin Empezar': 'task-list__item-tag--pending',
      'Empezada': 'task-list__item-tag--progress',
      'Finalizada': 'task-list__item-tag--completed'
    };
    return styles[status] || '';
  };

  return (
    <div className="task-list">
      <div className="task-list__header">
        <div className="task-list__header-content">
          <h2>Todas las Tareas</h2>
          <span className="task-list__header-counter">{tasks.length} tareas</span>
        </div>
      </div>

      <div className="task-list__items">
        {tasks.map((task) => (
            <article key={task.id} className="task-list__item" onClick={() => onEditTask(task)}>
                <div className="task-list__item-content">
                    <div className="task-list__item-main">
                        <h3 className="task-list__item-title">{task.title}</h3>
                        <p className="task-list__item-description">{task.description}</p>
                        
                        <div className="task-list__item-meta">
                        <span className="task-list__item-tag task-list__item-tag--category">
                            {task.category}
                        </span>
                        <span className={`task-list__item-tag ${getStatusStyle(task.status)}`}>
                            {task.status}
                        </span>
                        <div className="task-list__item-dates">
                            <span className="task-list__item-date">
                            <Calendar size={14} />
                            <span>Creado: {formatDate(task.createdAt)}</span>
                            </span>
                            <span className="task-list__item-date">
                            <Clock size={14} />
                            <span>Vence: {formatDate(task.dueDate)}</span>
                            </span>
                        </div>
                        </div>
                    </div>

                    <div className="task-list__item-actions">
                        <button className="task-list__item-more">
                        <MoreVertical size={20} />
                        </button>
                    </div>
                </div>
            </article>
        ))}
      </div>
    </div>
  );
};

export default TaskList;