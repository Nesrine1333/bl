import '../Login/Login.css'
import { Link,useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';


function SignUp() {
	const notify = () => toast.success('Compte crée avec succée !');
	const [loading, setLoading] = useState(false); // State to manage loading
	const dispatch = useDispatch();
	const navigate = useNavigate(); // Hook to perform navigation
	const [formData, setFormData] = useState({
		nom: '',
		matriculeFiscale: '',
		email: '',
		gover: '',
		phoneNumbers: '',
		fraisLivraison: '',
		password: '',
	  });
	  const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
		  ...prevFormData,
		  [name]: value,
		}));
	  };
	  
	  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			await dispatch(registerUser(formData));
			notify(); // Call notify to show the toast
			setTimeout(() => {
			  navigate('/home');
			}, 2000);
			
		  } catch (error) {
			// Handle error if needed
		  } finally {
			setLoading(false);
		  }
	  };
	
  return (
    <div className="container">
<ToastContainer/>
	<div className="card">
		<div className="card-image">	
		<img src="" alt="" />
		</div>
		<form className="card-form"  onSubmit={handleSubmit}>
			<div className="input">
				<input type="text"  name="nom" className="input-field" value={formData.nom} onChange={handleInputChange} required/>
				<label className="input-label">Nom</label>
			</div>
            <div className="input">
				<input type="text"  name="matriculeFiscale" className="input-field"  value={formData.matriculeFiscale} onChange={handleInputChange} required/>
				<label className="input-label">Matricule fiscale</label>
			</div>
            <div className="input">
				<input type="email" name="email" className="input-field" value={formData.email} onChange={handleInputChange} required/>
				<label className="input-label">Email</label>
			</div>
            <div className="input">
				<input type="text"name="gover" className="input-field" value={formData.gover } onChange={handleInputChange} required/>
				<label className="input-label">Governorat</label>
			</div>
            <div className="input">
				<input type="tel" name="phoneNumber" className="input-field" value={formData.phoneNumber} onChange={handleInputChange} required/>
				<label className="input-label">Télephone</label>
			</div>
            <div className="input">
				<input type="number" name="fraisLivraison" className="input-field" value={formData.fraisLivraison} onChange={handleInputChange} required/>
				<label className="input-label">Prix Livraison</label>
			</div>
			<div className="input">
				<input type="password" name="password" className="input-field" value={formData.password} onChange={handleInputChange} required/>
				<label className="input-label">Mot de passe</label>
			</div>
			<div className="action">
				<button className="action-button" >{loading ? <Spinner /> : 'Valider'}</button>
			</div>
		</form>
		<div className="card-info">
			<p>Vous avez un compte ?</p>
			<Link to='/login'>
            Se connecter
			</Link>

		</div>
	</div>
</div>
  )
}

export default SignUp