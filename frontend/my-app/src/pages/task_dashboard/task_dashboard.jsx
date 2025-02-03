import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import TaskList from '../../components/task_list/task_list';
import './__task_dashboard.scss';

const TaskDashboard = () => {
  const handleEditTask = (task) => {
    console.log('Edit task:', task);
  };

  return (
    <div className="task-dashboard">
      <Navbar />
      <div className="task-dashboard__content">
        <div className="task-dashboard__main">
          <Sidebar />
          <TaskList onEditTask={handleEditTask} />
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;