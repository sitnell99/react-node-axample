import {MouseEventHandler, useCallback, useEffect, useRef, useState} from "react";

export const useModal = () => {

    const modalRef = useRef(null);
    const triggerRef = useRef(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const closeOnEsc = useCallback( (target): void => {
        if (target.keyCode === 27) {
            setShowModal(false);
        }
    }, [])

    const toggleModal = (): void => setShowModal(!showModal);

    const useEventListener = (type, listener): void => {
        useEffect(() => {
            document.addEventListener(type, listener);

            return () => {
                document.removeEventListener(type, listener);
            };
        }, [listener, type]);
    };

    const tabIndexHandler = useCallback(({ target }): void => {

        const isOutsideElement = !modalRef.current || !modalRef.current.contains(target);
        const isOutsideTrigger = !triggerRef.current || !triggerRef.current.contains(target);

        if (isOutsideElement && isOutsideTrigger) {
            setShowModal(false);
        }

    }, []);

    useEventListener('keyup', closeOnEsc)
    useEventListener('mousedown', tabIndexHandler)

    return {
        setShowModal,
        showModal,
        modalRef,
        triggerRef,
        toggleModal
    }
}


