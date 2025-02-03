import React, { useState } from 'react';
import { User, Upload, ArrowLeft, Eye, EyeOff, Save } from 'lucide-react';
import './__profile.scss';

const Profile = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: 'usuario_actual',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    profileImage: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="profile-settings">
      <header className="profile-settings__header">
        <div className="profile-settings__header-content">
          <button className="profile-settings__back">
            <ArrowLeft size={20} />
            <span>Volver al Dashboard</span>
          </button>
          <h1 className="profile-settings__title">Configuración de Perfil</h1>
        </div>
      </header>

      <main className="profile-settings__main">
        <div className="profile-settings__container">
          <form onSubmit={handleSubmit} className="profile-settings__form">
            <section className="profile-settings__section">
              <h2 className="profile-settings__section-title">Foto de Perfil</h2>
              <div className="profile-settings__image-upload">
                <div className="profile-settings__image-preview">
                  {formData.profileImage ? (
                    <img 
                      src={URL.createObjectURL(formData.profileImage)} 
                      alt="Profile preview" 
                      className="profile-settings__profile-image"
                    />
                  ) : (
                    <User size={40} />
                  )}
                </div>
                <div className="profile-settings__upload-content">
                  <label htmlFor="profile-image" className="profile-settings__upload-button">
                    <Upload size={16} />
                    <span>Cambiar foto</span>
                  </label>
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="profile-settings__file-input"
                  />
                  <span className="profile-settings__upload-hint">PNG o JPG hasta 10MB</span>
                </div>
              </div>
            </section>

            <section className="profile-settings__section">
              <h2 className="profile-settings__section-title">Información de Usuario</h2>
              <div className="profile-settings__form-group">
                <label htmlFor="username" className="profile-settings__label">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="profile-settings__input"
                />
              </div>
            </section>

            <section className="profile-settings__section">
              <h2 className="profile-settings__section-title">Cambiar Contraseña</h2>
              <div className="profile-settings__form-group">
                <label htmlFor="currentPassword" className="profile-settings__label">
                  Contraseña Actual
                </label>
                <div className="profile-settings__password-input">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="profile-settings__input"
                  />
                  <button
                    type="button"
                    className="profile-settings__password-toggle"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="profile-settings__form-group">
                <label htmlFor="newPassword" className="profile-settings__label">
                  Nueva Contraseña
                </label>
                <div className="profile-settings__password-input">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="profile-settings__input"
                  />
                  <button
                    type="button"
                    className="profile-settings__password-toggle"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="profile-settings__form-group">
                <label htmlFor="confirmPassword" className="profile-settings__label">
                  Confirmar Nueva Contraseña
                </label>
                <div className="profile-settings__password-input">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="profile-settings__input"
                  />
                  <button
                    type="button"
                    className="profile-settings__password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </section>

            <div className="profile-settings__actions">
              <button type="submit" className="profile-settings__submit">
                <Save size={20} />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;