import React from 'react';
import PropTypes from 'prop-types';
import {
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';

export default function OptionGroup({
	field = '',
	label = '',
	options = [],
	value = '',
	handleChange,
	style,
}) {
	return (
		<div
			style={{ ...styles.outerContainer, ...style }}
			data-test-id="option-group"
		>
			<FormLabel component="legend" style={styles.label}>
				{label ? label : field.replaceAll('_', ' ')}
			</FormLabel>{' '}
			<RadioGroup
				data-test-id={field}
				aria-label={field}
				name={field}
				value={value}
				onChange={(event) =>
					handleChange({ field, payload: event.target.value })
				}
			>
				{options.map((option) => {
					return (
						<FormControlLabel
							value={option}
							control={<Radio />}
							label={option}
							key={field + option}
							data-test-id={field + option}
						/>
					);
				})}
			</RadioGroup>
		</div>
	);
}

const styles = {
	outerContainer: {
		marginBottom: 20,
	},
	label: {
		marginBottom: 5,
		textTransform: 'capitalize',
	},
};

OptionGroup.propTypes = {
	field: PropTypes.string,
	label: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.string),
	value: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	style: PropTypes.object,
};
