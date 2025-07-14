import { object, string } from 'yup';

export const formSchema = object({
    firstName: string().required('First name is required'),
    lastName: string(),
    company: string().required('Company is required'),
    email: string().email('Invalid email format').required('Email is required'),
    message: string().required('Message is required').min(10, 'Message must be at least 10 characters long'),
});