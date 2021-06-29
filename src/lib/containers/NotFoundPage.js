import React, { useState, useEffect } from 'react';

import MagnifyIcon from '../images/magnify.png';
import LoadingIndicator from '../loading/LoadingIndicator';

const NotFoundPage = () => {

	const [show, setShow] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setShow(true), 1500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div style={{ height: '100%' }}>
			{show &&
				<div style={styles.container}>
					<div><img style={styles.magnifyIcon} src={MagnifyIcon} alt="Magnifying glass" /></div>
					<div style={styles.errorCode}>404</div>
					<div style={styles.subhead}>Page not found</div>
					<div>We can't seem to find the page you're looking for.</div>
					<div>E-mail the Help Desk or head back <a style={styles.link} href="#/">home.</a></div>
				</div>
			}

			{!show &&
				<LoadingIndicator />
			}
		</div>
	)
}

const styles = {
	container: {
		backgroundColor: 'white',
		border: `2px solid grey`,
		width: 500,
		fontFamily: 'Roboto',
		textAlign: 'center',
		margin: '50px auto',
		padding: '45px 0',
	},
	magnifyIcon: {
		marginBottom: 30,
		width: 100
	},
	link: {
		color: '#00838F'
	},
	subhead: {
		fontSize: '1.5em',
		marginBottom: 15
	},
	errorCode: {
		fontSize: '5em',
		fontWeight: 'bold',
		marginBottom: 40,
	}
};

export default NotFoundPage;
