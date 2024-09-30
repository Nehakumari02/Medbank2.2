import React from "react";
import { useModal } from "@/contexts/ModalContext";

const Toast = () => {
    const { modal, hideModal } = useModal();
    if (!modal.visible) return null;
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-[10px]`}
        >
            <div className="min-w-[50%] max-w-[70%] rounded border-[2px] bg-white p-4 px-[40px] py-[24px] shadow-lg">
                <div className="flex flex-col items-start gap-1">
                    <span className="font-sf-pro-display text-[24px] font-semibold text-[#B52426]">
                        {modal.title}
                    </span>
                    <span className="font-sf-pro-display text-[16px] font-semibold text-black">
                        {modal.body}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Toast;
