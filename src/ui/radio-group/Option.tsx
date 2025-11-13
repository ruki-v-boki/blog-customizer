import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { useEnterSubmit } from './hooks/useEnterSubmit';

import styles from './RadioGroup.module.scss';

type OptionProps = {
	value: OptionType['value'];
	title: OptionType['title'];
	selected: OptionType;
	groupName: string;
	onChange?: (option: OptionType) => void;
	option: OptionType;
};

export const Option = (props: OptionProps) => {
	const { value, title, selected, groupName, onChange, option } = props;

<<<<<<< HEAD
	const optionRef = useEnterSubmit({ onChange, option, selected });
=======
	const optionRef = useEnterSubmit({ onChange, option });
>>>>>>> 83f6552ec23a4ade912f8fdd8fff655a4349ac0a

	const handleChange = () => onChange?.(option);

	useEnterSubmit({ onChange, option, selected });

	const inputId = `${groupName}_radio_item_with_value__${value}`;
	const isChecked = value === selected.value;

	return (
		<div
			className={styles.item}
			key={value}
			data-checked={isChecked}
			data-testid={inputId}
			tabIndex={0}
			ref={optionRef}>
			<input
				className={styles.input}
				type='radio'
				name={groupName}
				id={inputId}
				value={value}
				onChange={handleChange}
				tabIndex={-1}
				checked={isChecked}
			/>
			<label className={styles.label} htmlFor={inputId}>
				<Text size={18} uppercase>
					{title}
				</Text>
			</label>
		</div>
	);
};
