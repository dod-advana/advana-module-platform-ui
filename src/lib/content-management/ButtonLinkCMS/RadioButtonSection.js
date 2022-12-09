import React from 'react';
import PropTypes from 'prop-types';
import OptionGroup from './OptionGroup';

export default function RadioButtonSection({
	handleChange,
	data,
	radioButtonState,
	componentType,
	setComponentType,
}) {
	return (
		<div style={styles.formInnerContainer} data-test-id="radio-button-section">
			<OptionGroup
				field="display_as_link"
				label="Button or Link"
				options={['button', 'link']}
				value={componentType}
				handleChange={({ payload }) => setComponentType(payload)}
				style={{ breakInside: 'avoid' }}
			/>

			{data.map((option) => {
				return (
					<OptionGroup
						field={option.field}
						label={option.label}
						options={option.options}
						value={String(radioButtonState[option.field])}
						handleChange={handleChange}
						style={styles.optionGroup}
						key={option.field}
					/>
				);
			})}
		</div>
	);
}

const styles = {
	formInnerContainer: {
		columnCount: 4,
		columnGap: 40,
	},
	optionGroup: {
		breakInside: 'avoid',
	},
};

RadioButtonSection.propTypes = {
	handleChange: PropTypes.func.isRequired,
	radioButtonState: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired,
	componentType: PropTypes.string.isRequired,
	setComponentType: PropTypes.func.isRequired,
};
