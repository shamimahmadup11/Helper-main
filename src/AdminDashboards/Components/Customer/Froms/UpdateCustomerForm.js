import React, {Fragment, useEffect, useState} from 'react'
import {
	Button,
	Col,
	FormGroup,
	Input,
	Label,
	Row,
} from 'reactstrap';
import SelectBox from '../../../Elements/SelectBox';
import {Formik} from 'formik';
// import { Label, FormGroup, Input, Button } from "reactstrap";
import * as ALlIcon from "react-icons/fa"
// import SelectBox from '../../../Elements/SelectBox';
import {useDispatch, useSelector} from 'react-redux';
import SeviceAddReducer from '../../../../Store/Reducers/Dashboard/ServiceAddReducer';
// import { GetAllCustomers } from '../../Store/Actions/Dashboard/Customer/CustomerActions';

import { GetAllCustomers } from '../../../../Store/Actions/Dashboard/Customer/CustomerActions';


import axios from 'axios';
import {API_URL} from '../../../../config';

import Swal from 'sweetalert2';

import ImageUploadReducer from '../../../../Store/Reducers/ImageUploadReducers';
import {ImageUploadAction} from '../../../../Store/Actions/ImageUploadAction';
import {BounceLoader} from 'react-spinners';
import zIndex from '@mui/material/styles/zIndex';
import {useAuth} from '../../../../Context/userAuthContext';


const UpdateCustomerForm = ({prop,updateData}) => {
	const dispatch = useDispatch()

	const [formData, setFormData] = useState({
		name: updateData?.name || '',
		gender: updateData?.gender || '',
		age: updateData?.age || '',
		member_id: updateData?.member_id || '',
		address: updateData?.address || '',
		land_mark: updateData?.land_mark || '',
		email: updateData?.email || '',
		location: updateData?.location || '',
		mobile: updateData?.mobile || '',
		tel_no: updateData?.tel_no ||'',
		office_no: updateData?.office_no || '',
		alternate_no: updateData?.alternate_no || '',
		aadhar_no: updateData?.aadhar_no || '',
		occupation: updateData?.occupation || '',
		designation:  updateData?.designation || '',
		image: updateData?.image || '',
		own_house: updateData?.own_house || null, 
		dob: updateData?.dob || '',
		doa: updateData?.doa || '',
		membership: updateData?.membership ||  '',
		familyMember: updateData?.familyMember || '',  
		reference: updateData?.reference || '',
		payment: updateData?.payment || '',
		discount_amount: updateData?.discount_amount || '',
		received_amount: updateData?.received_amount || '',
		balance_amount: updateData?.balance_amount || '',
		payment_method: updateData?.payment_method || '',
	  });

	  const [isLoading, SetIsLoading]= useState(false)
	  const [errors, setErrors]= useState([]);
	  const [gender, setGender] = useState(updateData?.gender || '');
	  const [house, setHouse] = useState(updateData.own_house || '');
	  const [image, setImage] = useState(updateData.image || null);
	  const [membership, setMembership] = useState(updateData.membership || '');
	  const [paymentMethod, setPaymentMethod] = useState(updateData.payment_method || '');
  

	const payment_options = [
		{
			value: 'online_mode',
			label: 'Online Mode'
		}, {
			value: 'offline_mode',
			label: 'Offline Mode'
		},
		{
			value: 'Cash',
			label: 'Cash'
		},
	];


	const gender_option = [
		{
			value: 'Male',
			label: 'Male'
		}, {
			value: 'Female',
			label: 'Female'
		},
		{
			value: 'other',
			label: 'Other'
		},
	];


	const membershipOptions = [
		{
			value: "already_joined",
			label: 'Existing Member'
		}, {
			value: "new_member",
			label: 'New Member'
		},
	];
	const house_options = [
		{
			value: "Own House",
			label: 'Own House'
		}, {
			value: "Rented House",
			label: 'Rented House'
		},
	];

	const UpdateCustomer = (e) => {


		e.preventDefault();
        SetIsLoading(true)
        let errors = {};

        if (!formData.name) {
			errors.name = "Name is required";
		}
		
		if (!gender) {
			errors.gender = "Gender is required";
		}
		
		if (!formData.age) {
			errors.age = "Age is required";
		}

		
		
		if (!formData.address) {
			errors.address = "Address is required";
		}

		
		if (!formData.mobile) {
			errors.mobile = "Mobile number is required";
		} else if (!/^\d{10}$/.test(formData.mobile)) {
			errors.mobile = "Mobile number should be 10 digits";
		}
	

		if (errors && Object.keys(errors).length === 0) {
			console.log("Form submitted successfully!",);
		  } else {
			// Form is invalid, display validation errors
			console.log("Validation Errors:", errors);
			setErrors(errors);
			SetIsLoading(false);
			return false;
		  }

		  const data ={
			...formData,
			image: image,
			own_house: house?.value,
			gender: gender?.value,
			membership: membership?.value,
			payment_method: paymentMethod?.value
		  }

		  const formData2 = new FormData();

		  for (const key in data) {
			formData2.append(key, data[key]);
		  }

		const apiUrl = `${API_URL}/customer/getupdate/${updateData.user_id}`;
		axios.put(apiUrl, formData2, { 'Content-Type': 'multipart/form-data'})
			.then(response => {
				if (response.status === 200) {
					prop();
					Swal.fire(
						'Updated!',
						'Your Customer has been Updated.',
						'success'
					)
					dispatch(GetAllCustomers())
				} else {
					Swal.fire({
						title: 'failed to add try again',
						icon: "error",
					})
				}

			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	const handleKeyPress = (e) => {
        const charCode = e.which || e.keyCode;
        const charStr = String.fromCharCode(charCode);
        if (!/^[a-zA-Z\s]+$/.test(charStr)) {
            e.preventDefault();
            }
        };


		const handleChange = (e, maxLength) => {
			const { name, value } = e.target;
			if (value.length <= maxLength) {
			setFormData(prevState => ({
				...prevState,
				[name]: value
			}));
			}
		};

		const handleImageChange = (event) => {
			const file = event.target.files[0];
			const allowedExtensions = ['.jpg', '.jpeg', '.png'];
			if (file) {
				const fileName = file.name;
				const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
				if (allowedExtensions.includes(fileExtension)) {
	
					setImage(file);
				} else {
					alert("Please select a valid image file (JPG, JPEG, PNG).");
					event.target.value = null;
				}
			}
		  };	

	return (
		<Fragment>
			<Row>
				<Col md={6}>
					<FormGroup>
						<Label for="name">Name <span style={{color: "red"}}>*</span></Label>
						<Input name='name'
							onChange={(e) => handleChange(e, 50)}
							onKeyPress={handleKeyPress}
							value={formData?.name}
							placeholder='Name'/>

							{errors?.name && (
                        <span className='validationError'>
                            {errors?.name}
                        </span>
                    )}
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="gender">Gender <span style={{color: "red"}}>*</span></Label>
						<SelectBox options={gender_option} setSelcted={setGender} initialValue={gender}/>
						{errors?.gender && (
                        <span className='validationError'>
                            {errors?.gender}
                        </span>
                    )}
						
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="age">Age <span style={{color: "red"}}>*</span></Label>
						<Input name='age'
							type='number'
							onChange={(e) => handleChange(e, 2)}
							value={formData?.age}
							placeholder='Enter Customer Age'/>
							{errors?.age && (
                        <span className='validationError'>
                            {errors?.age}
                        </span>
                    )}
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="memeber">Member Id</Label>
						<Input name='member_id' placeholder='Member Id'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.member_id}/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="address">Address <span style={{color: "red"}}>*</span></Label>
						<Input type='textarea'
							onChange={(e) => handleChange(e, 200)}
							value={formData?.address}
							name='address'
							placeholder='Address'/>
							{errors?.address && (
                        <span className='validationError'>
                            {errors?.address}
                        </span>
                    )}
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="landmark">Land Mark</Label>
						<Input type='type'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.land_mark}
							name='land_mark'
							placeholder='Landmark'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input type='email'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.email}
							name='email'
							placeholder='Email'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="location">Location</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.location}
							name='location'
							placeholder='Location'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="mobile">Mobile No. <span style={{color: "red"}}>*</span></Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.mobile}
							name='mobile'
							placeholder='Mobile No.'/>
							{errors?.mobile && (
                        <span className='validationError'>
                            {errors?.mobile}
                        </span>
                    )}
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="telno">Tel No.</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.tel_no}
							name='tel_no'
							placeholder='Tel No'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="officeno">Office No</Label>
						<Input type='number' name='office_no' placeholder='Office No'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.office_no}/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="alternateno">Alternate No</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.alternate_no}
							name='alternate_no'
							placeholder='Alternate No'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="aadharno">Aadhar No</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 12)}
							value={formData?.aadhar_no}
							name='aadhar_no'
							placeholder='Aadhar No'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="occupation">Occupation</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.occupation}
							name='occupation'
							placeholder='Occupation'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="designation">Designation</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.designation}
							name='designation'
							placeholder='Designation Name'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="designation">Own house / Rented</Label>
						<SelectBox options={house_options} setSelcted={setHouse} initialValue={house}/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="dob">Date of Birth</Label>
						<Input 
						onChange={(e) => handleChange(e, 50)}
							value={formData?.dob}
							name='dob'
							type="date"/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="doa">DOA</Label>
						<Input type="date"
							onChange={(e) => handleChange(e, 50)}
							value={formData?.doa}
							name='doa'
							/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="image">Image (Image jpg , jpeg , png , only)</Label>
						<Input type="file" name="image" id="image"
							onChange={handleImageChange}
						/>
					</FormGroup>
				</Col>
		
				<Col md={6}>
					<FormGroup>
						<Label for="fom">Family Member</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.familyMember}
							name='familyMember'
							placeholder='Family Member '/>
					</FormGroup>
				</Col>
				
				<Col md={6}>
					<FormGroup>
						<Label for="ref">Reference By</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.reference}
							name='reference'
							placeholder='Referance By '/>
					</FormGroup>
				</Col>
				
				<Col md={6}>
					<FormGroup>
						<Label for="membership">Type of Membership</Label>
						{/* <Input type='date' name='tom' placeholder='Type of Membership ' /> */}
						<SelectBox options={membershipOptions} setSelcted={setMembership} initialValue={membership}/>
					</FormGroup>
				</Col>
				<h6 className='fs-5 fw-bold py-3 px-3'>For Payment Section</h6>
				<Col md={6}>
					<FormGroup>
						<Label for="payment">Payment</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.payment}
							name='payment'
							placeholder='1000'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="damount">Discount Amount</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.discount_amount}
							name='discount_amount'
							placeholder='Please Enter Discount Amount'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="ramount">Received Amount</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.received_amount}
							name='received_amount'
							placeholder='Please Enter Received Amount'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="bamount">Balance Amount</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.balance_amount}
							name='balance_amount'
							placeholder='Balance Amount'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="pamount">Payment Method</Label>
						<SelectBox options={payment_options}  setSelcted={setPaymentMethod} initialValue={paymentMethod}/>
					</FormGroup>
				</Col>
				<Button className='bg-primary h-fit text-blue'
					onClick={UpdateCustomer}
					disabled={isLoading}
					>
					Update</Button>
			</Row>

		</Fragment>
	)
}

export default UpdateCustomerForm
