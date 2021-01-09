import React, { useCallback, useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import ContactForm from './Forms/ContactForm';
import { createInitialValuesObject, yupValidationObject, fieldsComponents, formSubmit } from './Forms/validationSchema';
import fieldsData from './input-fields.json';

const BGSContactForm = () => {

    const [message, setMessage] = useState('');
    const [pending, setPending] = useState(false);

    const initialValues = createInitialValuesObject(fieldsData);
    const validationSchema = yupValidationObject({fieldsData, Yup});

    const submitHandler = (data) => {
        setMessage('');
        if(!data.props.dirty) return;
        setPending(true);
        formSubmit(data)
        .then((successReponse = {}) => {
            setMessage(successReponse);
            data.props.resetForm();
            setPending(false);
            const timer = setTimeout(() => {
                setMessage('');
                clearTimeout(timer)
            }, 3000);
        })
        .catch((failReponse = {}) => {
            setMessage(failReponse);
            setPending(false);
            const timer = setTimeout(() => {
                setMessage('');
                clearTimeout(timer)
            }, 3000);
        })
        // finally not works in IE
    }

    return (
        <section id="bgs-contact-form" className={pending ? 'pointer-events-none': ''}>
            <Formik initialValues={{...initialValues}} validationSchema={validationSchema}>
            {(props) => {
                const { values, handleSubmit } = {...props};
                return (
                    <Form onSubmit={handleSubmit} className="mb-3 p-3">
                        {fieldsComponents.map(({name, title}) => (
                            <div key={`FieldArray${title}${name}`}>
                            <h4 className="contact-title mb-3 mt-3 text-center">{title}</h4>
                            <FieldArray name={name} component={ContactForm} />
                            </div>
                        ))}
                        {pending ? <div class="loader"></div> : null}
                        <div className="d-flex justify-content-between">
                            <button type="submit" onClick={e => submitHandler({e, props})} className={`send-order-request pt-2 pb-2 pl-4 pr-4 btn btn-sm btn-primary d-flex align-items-center ${props.dirty && props.isValid ? 'btn-danger' : 'btn-secondary'}`}>send <span class="material-icons"> send </span></button>
                            <button type="reset" onClick={props.resetForm} className="send-order-request pt-2 pb-2 pl-4 pr-4 btn btn-sm btn-primary d-flex align-items-center">Reset <span class="material-icons"> delete </span></button>
                        </div>
                        { typeof(message) === 'object' ? <p className={`mt-2 bgs-reponse-message  ${message.success ? 'text-success' : 'text-danger'}`}>{message.message}</p> : null}
                    </Form>
                )
            }}
            </Formik>
        </section>
    );
};

export default BGSContactForm;