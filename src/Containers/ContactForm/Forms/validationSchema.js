import ENUM from "../../../assests/js/enum";

export function createInitialValuesObject(fieldsData = {}){

    const initialValuesFor = Reflect.ownKeys(fieldsData);

    if(!initialValuesFor.length) return {};

    const finalValuesObject = initialValuesFor.reduce((finalField, fieldArrayName) => {
            const fieldArrayData = fieldsData[fieldArrayName].reduce((finalObject, currentObject) => {
                return ({
                            ...finalObject,
                            [`${currentObject.name}`]: currentObject.value
                        })
            }, {});
            return ({...finalField, [fieldArrayName]: [fieldArrayData]})
    }, {});

    return finalValuesObject;
}


export function yupValidationObject({fieldsData = {}, Yup}){

    const initialValuesFor = Reflect.ownKeys(fieldsData);

    if(!initialValuesFor.length) return {};

    const fields = initialValuesFor.reduce((finalObj, fieldArrayName) => {

        const fieldsInfo  = fieldsData[fieldArrayName].reduce((finalFieldObj, currentField) => {
            let { id, validations = [], validationType = 'string', value } = currentField;

            if(currentField.validationType === 'string') validations = [...validations, { type: 'trim', params: [] }];

            if(id === 'phone' && value !== '') {
                validations = [{
                'type': 'matches', 'params':[ENUM.PATTERN.BGS_PHONE, 'Please Enter Valid Phone Number']
                }]
            }

            return ([ ...finalFieldObj, {name: id, validations, validationType }]);

        },[]);

        return ({...finalObj, [fieldArrayName]: fieldsInfo});

    },{});

    const validation = initialValuesFor.reduce((finalObj, currentFieldName) => {

        const yupValidationData = fields[currentFieldName].reduce((finalYup, currentYup) => {

            const { name, validations, validationType } = currentYup;

            let field = '';
            let validator = Yup[validationType]();
            validations.forEach(validation => {
                const { params, type } = validation;
                if (!validator[type])  return;
                validator = validator[type](...params);
            });

            field = { [name]: validator };

            return { ...finalYup, ...field }

        }, {});

        const yupObjectCreation =  Yup.array().of(Yup.object().shape(yupValidationData));

        return ({...finalObj, [currentFieldName]: yupObjectCreation});

    },{});

    return  Yup.object().shape({...validation});
}


export const fieldsComponents = [{name: 'contact', title: 'Send New Email'}];

export const formSubmit = ({e, props}) => {
    const { isValid, values } = {...props};
    if(!isValid) {
        const timer = setTimeout(() => {
            clearTimeout(timer);
        }, 0);
        return Promise.reject({ success: false, message: 'Please fill the fields' });
    }

    const requestData = Object.freeze({
        ...values.contact[0]
    })
    let resolved = null;
    const res = new Promise((resolve, reject) => resolved = resolve);
    setTimeout(() => resolved && resolved({success: true, message: 'Email has been sent'}), 3000);
    return res;
}

export const bgsOrderRequest = (data) => {
    return Promise.resolve();
}