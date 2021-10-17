import './InputText.scss';

import PropTypes from 'prop-types';
import React from 'react';

export default function InputText({
	placeholder,
	value,
	setValue,
	onKeyPress,
}) {
	return (
		<input
			type='text'
			placeholder={placeholder}
			className='inputText'
			value={value}
			onChange={setValue}
			onKeyPress={onKeyPress}
		/>
	);
}

InputText.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	setValue: PropTypes.func,
	onKeyPress: PropTypes.any,
};
