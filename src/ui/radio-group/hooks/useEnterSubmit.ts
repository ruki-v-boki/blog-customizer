import { useEffect, useRef } from 'react';
import { OptionType } from 'src/constants/articleProps';

type UseEnterSubmit = {
	onChange?: (option: OptionType) => void;
	option: OptionType;
};

export const useEnterSubmit = ({ onChange, option, selected }
	: UseEnterSubmit & { selected: OptionType}) => {
	const optionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const optionHtml = optionRef.current;

		if (!optionHtml || !onChange) return;

		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (document.activeElement === optionHtml && event.key === 'Enter') {
				if (option.value !== selected.value) {
                    onChange(option);
                }
			}
		};

		optionHtml.addEventListener('keydown', handleEnterKeyDown);

		// не забываем удалять листенеры, при размонтировании компонента
		return () => {
			optionHtml.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [onChange, option, selected.value]);
	return optionRef;
};
