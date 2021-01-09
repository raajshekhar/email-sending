import React from 'react';
import PropTypes from 'prop-types';
import { FastField } from 'formik';
import FieldsData from '../input-fields.json';
import InputValidation from '../../../Components/InputValidation/InputValidation';

const ContactForm = (props) => {
console.log('props::: ',props);
    const { name: sectionName, form: { values, setFieldValue, setFieldTouched } } = props;

    return (
        <section>
            { values[sectionName].map((data, index)=> {

                const indexing = index;
                const addressRemove = <span onClick={()=>props.remove(index)} class="material-icons address-remove-circle mt-2">remove_circle_outline</span>;
                return (
                    <article className={`row pl-0 pr-0 ${sectionName}-article`} key={`form-index-${indexing}`}>
                    { sectionName === 'order' && <span className='radio-title desktop-button'>Will you need any plants shipping to CA or AZ?</span>}
                    { indexing ? <div className="col-12 pl-0"><h4 className="contact-title  mb-3">Address {indexing+1} {addressRemove}</h4></div> : null }

                    {FieldsData[sectionName].map((fieldInfoData) => {
                        const fieldInfo = {...fieldInfoData, id: `${fieldInfoData.id}_${indexing}`};
                        return (
                            <FastField name={`${sectionName}.${index}.${fieldInfo.name}`} key={fieldInfo.id}>
                                {({field, form}) => {

                                    const errors = (form.errors && form.errors[sectionName] && form.errors[sectionName][index] && form.errors[sectionName][index]) || {};
                                    const touchedInfo = form.touched && form.touched[sectionName] && form.touched[sectionName][index] && (form.touched[sectionName][index] || {});
                                    const errorMsg= errors[fieldInfo.name];
                                    const touched = (touchedInfo && touchedInfo[fieldInfo.name]);

                                    return (
                                        <div className={`bgs-input-element mb-4 ${fieldInfo.colLength} ${fieldInfo.id}_element`}>
                                            <InputValidation {...fieldInfo} {...field} {...{touched, errorMsg, setFieldValue, setFieldTouched}} value={fieldInfo.type === 'radio' ? fieldInfo.value : field.value} />
                                        </div>
                                    );

                                }}
                            </FastField>
                        )
                    })}
                    </article>
                )
            })}
        </section>
    );
};

ContactForm.propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    addMore: PropTypes.oneOf([PropTypes.any, PropTypes.bool]),
    push: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
}

export default ContactForm;