import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const InputFieldPopover = ({errorMsg, ...popoverData}) => {

    const [ reactStrapComponents, setReactStrapComponents ] = useState({Popover: null, PopoverBody: null});

    useEffect(() => {
            import('reactstrap').then(res => {
                const { Popover, PopoverBody } = res || {};
                setReactStrapComponents({ Popover, PopoverBody });
            })
            return () => {};
    }, []);

    const { Popover, PopoverBody } = reactStrapComponents;
    const allcomponentsAvaialble = [Popover, PopoverBody].every(Boolean);
    if(!allcomponentsAvaialble) return null;

    return (
        <div>
            <Popover {...popoverData}>
                <PopoverBody className="errorInfoMessage" dangerouslySetInnerHTML={{ __html: errorMsg }} />
            </Popover>
        </div>
    )
};

InputFieldPopover.propTypes = {
    errorMsg: PropTypes.string,
    popoverData: PropTypes.objectOf({
        isOpen: PropTypes.bool.isRequired,
        placement: PropTypes.string.isRequired,
        target: PropTypes.string.isRequired,
        flip: PropTypes.bool
    })
}

export default React.memo(InputFieldPopover);