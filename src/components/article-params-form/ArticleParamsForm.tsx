import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import {
	defaultArticleState,
	fontFamilyOptions,
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	fontColors,
	OptionType
} from 'src/constants/articleProps';

type TFormProps = {
	state: ArticleStateType
	setState: React.Dispatch<React.SetStateAction<ArticleStateType>>
}


export const ArticleParamsForm = (props: TFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [formState, setFormState] = useState(props.state)
	const formRef = useRef<HTMLDivElement>(null)

	const hasChanges = JSON.stringify(formState) !== JSON.stringify(props.state)
	const isDefaultState = JSON.stringify(props.state) === JSON.stringify(defaultArticleState)
	const canReset = hasChanges || !isDefaultState

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef: formRef,
		onChange: setIsFormOpen
	})

	useEffect(() => {
		const handleEscape = (e:KeyboardEvent) => {
			if(e.key === "Escape" && isFormOpen) setIsFormOpen(false)
		}
		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [isFormOpen])

	const handleSetOption = (
		fieldName: keyof ArticleStateType,
		selectedOption: OptionType
	) => setFormState(prev => ({...prev, [fieldName]: selectedOption}))

	const handleResetForm = () => {
		setFormState(defaultArticleState)
		props.setState(defaultArticleState)
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		props.setState(formState)
	}

	return (
		<>
			<ArrowButton 
				isOpen={isFormOpen}
				onClick={() => setIsFormOpen(!isFormOpen)}
			/>
			<aside
				className={clsx(styles.container, {[styles.container_open]: isFormOpen})}
				ref={formRef}
			>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleResetForm}
				>

					{/* Заголовок */}
					<Text as='h2'
						size={31}
						weight={800}
						uppercase
						>Задайте параметры
					</Text>

					{/* Шрифт */}
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={selectedOption => handleSetOption('fontFamilyOption', selectedOption)}
						title='Шрифт'
					/>

					{/* Размер шрифта */}
					<RadioGroup
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={selectedOption => handleSetOption('fontSizeOption', selectedOption)}
						name='fontSize'
						title='Размер шрифта'
					/>

					{/* Цвет шрифта */}
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={selectedOption => handleSetOption('fontColor', selectedOption)}
						title='Цвет шрифта'
					/>

					{/* Разделитель */}
					<Separator />

					{/* Цвет фона */}
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={selectedOption => handleSetOption('backgroundColor', selectedOption)}
						title='Цвет фона'
					/>

					{/* Ширина контента */}
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={selectedOption => handleSetOption('contentWidth', selectedOption)}
						title='Ширина контента'
					/>

					{/* Кнопки */}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							disabled={!canReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							disabled={!hasChanges}
						/>
					</div>
				</form>
			</aside>
		</>
	)
}
