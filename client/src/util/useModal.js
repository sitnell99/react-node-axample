import {useCallback, useEffect, useRef, useState} from "react";

export const useModal = () => {

    const modalRef = useRef(null);
    const triggerRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    const closeOnEsc = useCallback( (target) => {
        if (target.keyCode === 27) {
            setShowModal(false);
        }
    }, [])

    const toggleModal = () => {
        if (showModal) {
            setShowModal(false);
        } else {
            setShowModal(true)
        }
    }

    const useEventListener = (type, listener) => {
        useEffect(() => {
            document.addEventListener(type, listener);

            return () => {
                document.removeEventListener(type, listener);
            };
        }, [listener, type]);
    };

    const tabIndexHandler = useCallback(({ target }) => {

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
        toggleModal
    }
}


