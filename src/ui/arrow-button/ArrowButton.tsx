import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
import { useRef } from 'react';
import { useKeyPress } from './hooks/useKeyPress';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void

type ArrowButtonProps = {
	isOpen: boolean
	onClick: OnClick
}

export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {
    const buttonRef = useRef<HTMLDivElement>(null)

    useKeyPress(buttonRef, 'Enter', () => onClick())

    return (
        <div
            role='button'
            aria-label='Открыть/Закрыть форму параметров статьи'
            tabIndex={0}
            className={clsx(styles.container, { [styles.container_open]: isOpen })}
            onClick={onClick}
            ref={buttonRef}
        >
            <img
                src={arrow}
                alt='иконка стрелочки'
                className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
            />
        </div>
    )
}
