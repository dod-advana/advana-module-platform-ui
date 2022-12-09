import React from 'react';
import { Typography, Paper } from '@material-ui/core';

import LockImg from '../images/Lock.svg';

const UnauthorizedPage = () => {
	const styles = {
		container: {
			width: '100%',
			height: '100vh',
			display: 'flex',
			marginTop: '70px'
		},
		paper: {
			width: 700,
			margin: 'auto',
			textAlign: 'center',
			display: 'block',
			padding: 70
		},
		img: {
			width: 150
		}
	};

	return (
		<div style={{...styles.container}} data-test-id="unauthorized-page">
			<Paper style={styles.paper}>
				<img src={LockImg} alt="lock" style={styles.img} />

				<Typography variant="h1" style={{ marginTop: 10 }}>Oops!</Typography>

				<Typography variant="body1" style={{ marginTop: 10 }}>You do not have permission to view the page.</Typography>
				<Typography variant="body1" style={{ marginTop: 10 }}>Request access from Help Desk, and you will receive an email notifying that your access has been granted.</Typography>

			</Paper>
		</div>
	);
};

export default UnauthorizedPage;
