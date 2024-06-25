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


const AddNewCustomerForm = ({prop, data}) => {

	const dispatch = useDispatch()
	const [inputValue, setInputValue] = useState([]);
    const [errors, setErrors]= useState([]);
    const [isLoading, SetIsLoading]= useState(false)
	const [house, setHouse] = useState('')
	const [image, setImage] = useState(null)
	const [gender, setGender] = useState('')
	const [membership, setMembership] = useState('')
	const [payment_method, setPaymentMethod] = useState('')

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

	const payment_options = [
		{
			value: 'online_mode',
			label: 'Online Mode'
		}, {
			value: 'offline_mode',
			label: 'Offline Mode'
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
			value: "own_house",
			label: 'Own House'
		}, {
			value: "rented_house",
			label: 'Rented House'
		},
	];

	const createCustomer = (e) => {
	
		e.preventDefault();
        SetIsLoading(true)
        let errors = {};

        if (!inputValue.name) {
			errors.name = "Name is required";
		}
		
		if (!gender) {
			errors.gender = "Gender is required";
		}
		
		if (!inputValue.age) {
			errors.age = "Age is required";
		}

		
		
		if (!inputValue.address) {
			errors.address = "Address is required";
		}

		
		if (!inputValue.mobile) {
			errors.mobile = "Mobile number is required";
		} else if (!/^\d{10}$/.test(inputValue.mobile)) {
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
			...inputValue,
			image: image,
			own_house: house?.value,
			gender: gender?.value,
			membership: membership?.value,
			payment_method: payment_method?.value
		  }

		  const formData = new FormData();

		  for (const key in data) {
			  formData.append(key, data[key]);
		  }

		const apiUrl = `${API_URL}/customer/signup`;
		axios.post(apiUrl, formData)
			.then(response => {
				if (response.status === 200) {
					prop();
					Swal.fire(
						'Successfully!',
						'Your Customer has been Added.',
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
				setInputValue({...inputValue, [name]:value})
			}
		};


	return (
		<Fragment>
			<Row>
				<Col md={6}>
					<FormGroup>
						<Label for="name">Name  <span style={{color: "red"}}>*</span></Label>
						<Input name='name'
							onChange={(e) => handleChange(e, 50)}
							value={inputValue?.name}
							placeholder='Name'
							onKeyPress={handleKeyPress}
							/>
							{errors?.name && (
                        <span className='validationError'>
                            {errors?.name}
                        </span>
                    )}
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="gender">Gender  <span style={{color: "red"}}>*</span></Label>
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
						<Label for="age">Age  <span style={{color: "red"}}>*</span></Label>
						<Input
						type='number'
						name='age'
						onChange={(e) => handleChange(e, 2)}
						value={inputValue?.age}
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
						<Label for="memeber">Member Id </Label>
						<Input name='member_id' placeholder='Member Id'
							onChange={(e) => handleChange(e, 10)}
							value={inputValue?.member_id}
							/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="address">Address  <span style={{color: "red"}}>*</span></Label>
						<Input
						 type='textarea'
							onChange={(e) => handleChange(e, 200)}
							value={inputValue?.address}
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
							onChange={(e) => handleChange(e, 100)}
							value={inputValue?.land_mark}
							name='land_mark'
							placeholder='Landmark'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="email">Email </Label>
						<Input type='email'
							onChange={(e) => handleChange(e, 50)}
							value={inputValue?.email}
							name='email'
							placeholder='Email'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="location">Location</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 100)}
							value={inputValue?.location}
							name='location'
							placeholder='Location'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="mobno">Mobile No. <span style={{color: "red"}}>*</span></Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={inputValue?.mobile}
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
						<Input type='tel'
							onChange={(e) => handleChange(e, 10)}
							value={inputValue?.tel_no}
							name='tel_no'
							placeholder='Tel No'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="officeno">Office No</Label>
						<Input type='number' name='office_no' placeholder='Office No'
							onChange={(e) => handleChange(e, 10)}
							value={inputValue?.office_no}
							
							/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="alternateno">Alternate No</Label>
						<Input type='tel'
							onChange={(e) => handleChange(e, 10)}
							value={inputValue?.alternate_no}
							name='alternate_no'
							placeholder='Alternate No'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="aadharno">Aadhar No </Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 12)}
							value={inputValue?.aadhar_no}
							name='aadhar_no'
							placeholder='Aadhar No'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="occupation">Occupation</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={inputValue?.occupation}
							name='occupation'
							placeholder='Occupation'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="designation">Designation</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={inputValue?.designation}
							name='designation'
							placeholder='Designation Name'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="designation">Own house / Rented</Label>
						<SelectBox options={house_options} setSelcted={setHouse}/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="dob">Date of Birth  </Label>
						<Input 
						onChange={(e) => handleChange(e, 50)}
						value={inputValue?.dob}
						name='dob'
							type="date"/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="doa">DOA </Label>
						<Input type="date"	
						onChange={(e) => handleChange(e, 50)}
						value={inputValue?.doa}
						name='doa'
							/>
						
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="image">Image (Image jpg , jpeg , png , only)  </Label>
						<Input type="file" name="image" id="image"
							onChange={
								(e)=>(handleImageChange(e))
							}
						/>

					</FormGroup>
				</Col>
				{/* <Col md={6}>
					<FormGroup>
						<Label for="sdob">Spouse Name-1</Label>
						<Input type='text'
							onChange={
								(e) => setSpouseNames(e.target.value)
							}
							value={spouseName}
							name='sdob'
							placeholder='Spouse Name -1'/>
					</FormGroup>
				</Col> */}
				<Col md={6}>
					<FormGroup>
						<Label for="fom">Family Member</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={inputValue?.familyMember}
							name='familyMember'
							placeholder='Family Member '/>
					</FormGroup>
				</Col>
				{/* <Col md={6}>
					<FormGroup>
						<Label for="sdob">Spouse Name-2</Label>
						<Input type='text' name='sdob'
						
						onChange={
							(e) => setSpouseName1(e.target.value)
						}
						value={spouseName1}
						placeholder='Spouse Name -2'/>
					</FormGroup>
				</Col> */}
				<Col md={6}>
					<FormGroup>
						<Label for="ref">Reference By</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={inputValue?.refrence}
							name='refrence'
							placeholder='Referance By '/>
					</FormGroup>
				</Col>
				{/* <Col md={6}>
					<FormGroup>
						<Label for="sdob">Spouse Name-3</Label>
						<Input type='text' name='sdob'
						
						onChange={
							(e) => setSpouseName2(e.target.value)
						}
						value={spouseName2}
						placeholder='Spouse Name - 3'/>
					</FormGroup>
				</Col> */}
				<Col md={6}>
					<FormGroup>
						<Label for="membership">Type of Membership </Label>
						{/* <Input type='date' name='tom' placeholder='Type of Membership ' /> */}
						<SelectBox options={membershipOptions} setSelcted={setMembership} initialValue={membership}/>
					</FormGroup>
				</Col>
				<h6 className='fs-5 fw-bold py-3 px-3'>For Payment Section</h6>
				<Col md={6}>
					<FormGroup>
						<Label for="payment">Payment </Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 50)}
							value={inputValue?.payment}
							name='payment'
							placeholder='Your Payment'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="damount">Discount Amount  </Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={inputValue?.discount_amount}
							name='discount_amount'
							placeholder='Enter Discount Amount'/>
							
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="ramount">Received Amount  </Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={inputValue?.received_amount}
							name='received_amount'
							placeholder='Please Enter Received Amount'/>
							
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="bamount">Blanace Amount </Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={inputValue?.balance_amount}
							name='balance_amount'
							placeholder='Please Enter Balance Amount'/>
					
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="pamount">Payment Method </Label>
						<SelectBox options={payment_options}  setSelcted={setPaymentMethod} initialValue={payment_method}/>
					</FormGroup>
				</Col>
				{/* <Col md={6}>
					<FormGroup>
						<Label for="freeService1">Free Service - 1</Label>
						<Input type="text" id="freeService1"
							
							onChange={
								(e) => setFreeServices1(e.target.value)
							}
							value={freeServices1}
							/>
					</FormGroup>
				</Col> */}
{/* 
				<Col md={6}>
					<FormGroup>
						<Label for="freeService2">Free Service - 2</Label>
						<Input type="text" id="freeService2"
							onChange={
								(e) => setFreeServices2(e.target.value)
							}
							value={freeServices2}
							
							/>
					</FormGroup>
				</Col> */}
				<Button className='bg-primary h-fit text-blue'
					onClick={createCustomer} 
					disabled={isLoading}
					>
					Submit</Button>
			</Row>

		</Fragment>
	)
}

export default AddNewCustomerForm
