import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Alert } from '@mui/material';

export default function Feedback({ feedback, setFeedback }) {
	const handleClose = (i) => () => {
		setFeedback((prevState) => {
			return prevState.filter((_feedbackMessage, j) => j !== i);
		});
	};

	if (Array.isArray(feedback)) {
		return (
			<div data-test-id="feedback">
				{feedback.map((feedbackEntry, i) => {
					return feedbackEntry === 'success' ? (
						<Alert
							data-test-id="feedback-alert-saved"
							severity="success"
							key={uuidv4()}
							style={styles.alert}
							onClose={handleClose(i)}
						>
							Saved
						</Alert>
					) : (
						<Alert
							data-test-id="feedback-alert-feedbackentry"
							severity="error"
							key={uuidv4()}
							style={styles.alert}
							onClose={handleClose(i)}
						>
							{feedbackEntry}
						</Alert>
					);
				})}
			</div>
		);
	}

	return null;
}

const styles = {
	alert: {
		marginBottom: 10,
	},
};
