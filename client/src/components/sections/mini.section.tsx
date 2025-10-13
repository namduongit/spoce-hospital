import type { JSX } from "react";

type MiniSection = {
    icon: JSX.Element;
    title: string;
    detail: string;
};


const MiniSection = (props: MiniSection) => {
    const { icon, title, detail } = props;
    
    return (
        <div className="mini-hero-section px-4 py-4 bg-white rounded-xl shadow-2xl">
            <div className="mini-hero-section__wrap flex flex-col">
                <div className="mini-hero-section__icon text-blue-600 text-2xl mb-3
                first:bg-blue-300 first:w-fit first:p-3 first:rounded-full">
                    {icon}
                </div>
                <div className="mini-hero-section-description">
                    <h3 className="mb-2 font-bold text-xl">{title}</h3>
                    <p className="text-gray-500">{detail}</p>
                </div>
            </div>
        </div>
    )
}

export default MiniSection;