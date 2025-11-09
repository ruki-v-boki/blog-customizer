import { Text } from 'src/ui/text';

import styles from './Button.module.scss';
import { clsx } from 'clsx';

export const Button = ({
	title,
	onClick,
	htmlType,
	type,
	disabled,
}: {
	title: string;
	onClick?: () => void;
	htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	type: 'apply' | 'clear';
	disabled?: boolean
}) => {
	return (
		<button
			className={clsx(
				styles.button,
				{ [styles.button_apply]: type === 'apply' },
				{ [styles.button_clear]: type === 'clear' },
				{ [styles.button_disabled]: disabled }
			)}
			type={htmlType}
			onClick={onClick}
			disabled={disabled}
			>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
