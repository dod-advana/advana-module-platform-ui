import React from 'react';
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ allowFunction, component: Component,  ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				allowFunction(props) ? (
					<Component {...rest} {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/unauthorized"
						}}
					/>
				)
			}
		/>
	)
};

export default PrivateRoute;