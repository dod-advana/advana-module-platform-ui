import React from 'react';
import { Tooltip } from '@material-ui/core';

export default function FavoriteIcon({ isFavorite }) {
	return (
		<Tooltip
			title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
			placement="top"
			arrow
		>
			<i
				className={isFavorite ? 'fa fa-star' : 'fa fa-star-o'}
				style={{
					color: isFavorite ? '#E9691D' : 'rgb(224, 224, 224)',
					fontSize: 26,
					alignSelf: 'center',
				}}
			></i>
		</Tooltip>
	);
}
