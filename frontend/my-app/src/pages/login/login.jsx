import React, { useState } from 'react';
import { User, Upload, Eye, EyeOff } from 'lucide-react';
import './__login.scss';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <h1 className="login__title">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h1>
          <p className="login__subtitle">
            {isLogin 
              ? 'Ingresa tus credenciales para continuar' 
              : 'Completa tu información para registrarte'}
          </p>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="login__image-upload">
              <div className="login__image-preview">
                {formData.profileImage ? (
                  <img 
                    src={URL.createObjectURL(formData.profileImage)} 
                    alt="Profile preview" 
                    className="login__profile-image"
                  />
                ) : (
                  <User size={32} />
                )}
              </div>
              <div className="login__upload-content">
                <label htmlFor="profile-image" className="login__upload-button">
                  <Upload size={16} />
                  <span>Subir foto de perfil</span>
                </label>
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="login__file-input"
                />
                <span className="login__upload-hint">PNG o JPG hasta 10MB</span>
              </div>
            </div>
          )}

          <div className="login__form-group">
            <label htmlFor="username" className="login__label">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="login__input"
              required
            />
          </div>

          <div className="login__form-group">
            <label htmlFor="password" className="login__label">Contraseña</label>
            <div className="login__password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="login__input"
                required
              />
              <button
                type="button"
                className="login__password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login__submit">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="login__footer">
          <button
            type="button"
            className="login__toggle"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin 
              ? '¿No tienes cuenta? Regístrate' 
              : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;